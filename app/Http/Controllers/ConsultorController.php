<?php

namespace App\Http\Controllers;

use App\Models\ChatConversation;
use App\Services\AiConsultorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Throwable;

class ConsultorController extends Controller
{
    public function reply(Request $request, AiConsultorService $consultor): JsonResponse
    {
        $validated = $request->validate([
            'messages' => ['required', 'array', 'min:1'],
            'messages.*.role' => ['required', 'string', 'in:user,assistant,bot'],
            'messages.*.text' => ['required', 'string', 'max:4000'],
        ]);

        try {
            $reply = $consultor->generateReply($validated['messages']);
        } catch (Throwable $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        $conversation = [
            ...$validated['messages'],
            ['role' => 'assistant', 'text' => $reply],
        ];

        $chatConversation = ChatConversation::find($request->session()->get('consultor_ai_conversation_id'));

        if (! $chatConversation) {
            $chatConversation = new ChatConversation([
                'perfil' => 'Consultor IA',
                'solucoes' => [],
            ]);
        }

        $chatConversation->fill([
            'perfil' => 'Consultor IA',
            'respostas' => collect($conversation)->map(fn (array $message) => [
                'pergunta' => $message['role'] === 'user' ? 'Usuário' : 'Consultor IA',
                'resposta' => $message['text'],
            ])->all(),
            'solucoes' => [],
        ])->save();

        $request->session()->put('consultor_ai_conversation_id', $chatConversation->id);

        return response()->json([
            'reply' => $reply,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'perfil' => ['nullable', 'string', 'max:255'],
            'respostas' => ['nullable', 'array'],
            'respostas.*.pergunta' => ['required_with:respostas', 'string'],
            'respostas.*.resposta' => ['required_with:respostas', 'string'],
            'solucoes' => ['nullable', 'array'],
            'solucoes.*' => ['string', 'max:255'],
        ]);

        ChatConversation::create($validated);

        return redirect()->back();
    }
}
