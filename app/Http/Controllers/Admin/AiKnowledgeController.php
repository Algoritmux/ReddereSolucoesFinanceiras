<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiKnowledgeEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AiKnowledgeController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        AiKnowledgeEntry::create($this->validated($request));

        return back()->with('success', 'Conhecimento da IA criado.');
    }

    public function update(Request $request, AiKnowledgeEntry $aiKnowledgeEntry): RedirectResponse
    {
        $aiKnowledgeEntry->update($this->validated($request));

        return back()->with('success', 'Conhecimento da IA atualizado.');
    }

    public function toggleActive(AiKnowledgeEntry $aiKnowledgeEntry): RedirectResponse
    {
        $aiKnowledgeEntry->update(['active' => ! $aiKnowledgeEntry->active]);

        return back()->with('success', 'Conhecimento da IA atualizado.');
    }

    public function destroy(AiKnowledgeEntry $aiKnowledgeEntry): RedirectResponse
    {
        $aiKnowledgeEntry->delete();

        return back()->with('success', 'Conhecimento da IA removido.');
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:20000'],
            'active' => ['nullable', 'boolean'],
        ]);

        $validated['active'] = $request->boolean('active', true);

        return $validated;
    }
}
