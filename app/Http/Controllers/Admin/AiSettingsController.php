<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Services\AiConsultorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class AiSettingsController extends Controller
{
    public function update(Request $request, AiConsultorService $consultor): RedirectResponse
    {
        $validated = $request->validate([
            'ai_api_key' => ['nullable', 'string', 'max:1000'],
            'clear_ai_api_key' => ['nullable', 'boolean'],
            'ai_model' => ['required', 'string', 'max:120'],
            'ai_system_prompt' => ['nullable', 'string', 'max:5000'],
        ]);

        AppSetting::setValue('ai_model', $validated['ai_model']);
        AppSetting::setValue('ai_system_prompt', $validated['ai_system_prompt'] ?: $consultor->systemPrompt());

        if ($request->boolean('clear_ai_api_key')) {
            AppSetting::setValue('ai_api_key', null);
        } elseif (filled($validated['ai_api_key'] ?? null)) {
            AppSetting::setValue('ai_api_key', Crypt::encryptString($validated['ai_api_key']));
        }

        return back()->with('success', 'Configurações de IA atualizadas.');
    }
}
