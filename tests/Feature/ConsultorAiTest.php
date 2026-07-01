<?php

namespace Tests\Feature;

use App\Models\AiKnowledgeEntry;
use App\Models\AppSetting;
use App\Models\ChatConversation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ConsultorAiTest extends TestCase
{
    use RefreshDatabase;

    public function test_consultor_uses_admin_ai_configuration_and_knowledge(): void
    {
        AppSetting::setValue('ai_api_key', Crypt::encryptString('sk-test-key'));
        AppSetting::setValue('ai_model', 'gpt-test-model');
        AppSetting::setValue('ai_system_prompt', 'Prompt administrativo da Reddere.');

        AiKnowledgeEntry::create([
            'title' => 'Atendimento',
            'content' => 'Use a base de conhecimento cadastrada no painel.',
            'active' => true,
        ]);

        Http::fake([
            'api.openai.com/v1/responses' => Http::sequence()
                ->push(['output_text' => 'Resposta gerada pela IA configurada.'])
                ->push(['output_text' => 'Segunda resposta da mesma conversa.']),
        ]);

        $response = $this->postJson('/consultor/ia/responder', [
            'messages' => [
                ['role' => 'user', 'text' => 'Quero planejar minha aposentadoria.'],
            ],
        ]);

        $response->assertOk()->assertJson([
            'reply' => 'Resposta gerada pela IA configurada.',
        ]);

        Http::assertSent(function ($request) {
            return $request->hasHeader('Authorization', 'Bearer sk-test-key')
                && $request['model'] === 'gpt-test-model'
                && str_contains($request['instructions'], 'Prompt administrativo da Reddere.')
                && str_contains($request['instructions'], 'Use a base de conhecimento cadastrada no painel.')
                && $request['input'][0]['role'] === 'user'
                && $request['input'][0]['content'] === 'Quero planejar minha aposentadoria.';
        });

        $this->assertDatabaseHas('chat_conversations', [
            'perfil' => 'Consultor IA',
        ]);

        $secondResponse = $this->postJson('/consultor/ia/responder', [
            'messages' => [
                ['role' => 'assistant', 'text' => 'Olá! Sou o Consultor IA da Reddere.'],
                ['role' => 'user', 'text' => 'Quero planejar minha aposentadoria.'],
                ['role' => 'assistant', 'text' => 'Resposta gerada pela IA configurada.'],
                ['role' => 'user', 'text' => 'Como devo pensar no prazo?'],
            ],
        ]);

        $secondResponse->assertOk()->assertJson([
            'reply' => 'Segunda resposta da mesma conversa.',
        ]);

        $this->assertSame(1, ChatConversation::count());
        $this->assertCount(5, ChatConversation::first()->respostas);
    }

    public function test_consultor_returns_clear_error_without_ai_key(): void
    {
        $response = $this->postJson('/consultor/ia/responder', [
            'messages' => [
                ['role' => 'user', 'text' => 'Teste sem chave configurada.'],
            ],
        ]);

        $response->assertStatus(422)->assertJson([
            'message' => 'Chave de IA não configurada.',
        ]);
    }
}
