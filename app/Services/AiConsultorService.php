<?php

namespace App\Services;

use App\Models\AiKnowledgeEntry;
use App\Models\AppSetting;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use RuntimeException;
use Throwable;

class AiConsultorService
{
    public function isConfigured(): bool
    {
        return filled(AppSetting::getValue('ai_api_key'));
    }

    public function model(): string
    {
        return AppSetting::getValue('ai_model', 'gpt-5.5') ?: 'gpt-5.5';
    }

    public function systemPrompt(): string
    {
        return AppSetting::getValue('ai_system_prompt', $this->defaultSystemPrompt()) ?: $this->defaultSystemPrompt();
    }

    public function generateReply(array $messages): string
    {
        $apiKey = $this->apiKey();

        if (! $apiKey) {
            throw new RuntimeException('Chave de IA não configurada.');
        }

        $response = Http::withToken($apiKey)
            ->acceptJson()
            ->asJson()
            ->timeout(35)
            ->post('https://api.openai.com/v1/responses', [
                'model' => $this->model(),
                'instructions' => $this->instructions(),
                'input' => $this->formatMessages($messages),
                'max_output_tokens' => 700,
            ]);

        if ($response->failed()) {
            $message = $response->json('error.message') ?: 'Não foi possível gerar a resposta da IA.';

            throw new RuntimeException($message);
        }

        $text = $response->json('output_text') ?: $this->extractOutputText($response->json('output', []));

        if (! $text) {
            throw new RuntimeException('A IA não retornou uma resposta em texto.');
        }

        return trim($text);
    }

    public function publicSettings(): array
    {
        return [
            'api_key_configured' => $this->isConfigured(),
            'ai_model' => $this->model(),
            'ai_system_prompt' => $this->systemPrompt(),
        ];
    }

    private function apiKey(): ?string
    {
        $encrypted = AppSetting::getValue('ai_api_key');

        if (! $encrypted) {
            return null;
        }

        try {
            return Crypt::decryptString($encrypted);
        } catch (Throwable) {
            return null;
        }
    }

    private function instructions(): string
    {
        $knowledge = AiKnowledgeEntry::where('active', true)
            ->orderBy('title')
            ->get()
            ->map(fn (AiKnowledgeEntry $entry) => "### {$entry->title}\n{$entry->content}")
            ->implode("\n\n");

        return implode("\n\n", array_filter([
            $this->systemPrompt(),
            'Base de conhecimento cadastrada pelo administrador:',
            $knowledge ?: 'Nenhum conteúdo adicional foi cadastrado ainda.',
        ]));
    }

    private function formatMessages(array $messages): array
    {
        return collect($messages)
            ->take(-12)
            ->map(function (array $message): array {
                $role = ($message['role'] ?? 'user') === 'assistant' || ($message['role'] ?? null) === 'bot'
                    ? 'assistant'
                    : 'user';

                return [
                    'role' => $role,
                    'content' => (string) ($message['text'] ?? ''),
                ];
            })
            ->filter(fn (array $message) => filled($message['content']))
            ->values()
            ->all();
    }

    private function extractOutputText(array $output): ?string
    {
        $chunks = [];

        foreach ($output as $item) {
            foreach (($item['content'] ?? []) as $content) {
                if (($content['type'] ?? null) === 'output_text' && filled($content['text'] ?? null)) {
                    $chunks[] = $content['text'];
                }
            }
        }

        return $chunks ? implode("\n", $chunks) : null;
    }

    private function defaultSystemPrompt(): string
    {
        return 'Você é o Consultor IA da Reddere Soluções Financeiras. Responda em português do Brasil, com tom consultivo, claro e responsável. Use apenas informações da conversa e da base de conhecimento cadastrada. Não prometa rentabilidade, não dê recomendação individual definitiva e não trate a resposta como consultoria regulada. Quando necessário, explique que a resposta é informativa e convide o usuário a falar com um especialista da Reddere.';
    }
}
