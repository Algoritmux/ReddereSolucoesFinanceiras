<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);

        Solution::create($validated);

        return back()->with('success', 'Solução criada com sucesso.');
    }

    public function update(Request $request, Solution $solution): RedirectResponse
    {
        $solution->update($this->validated($request));

        return back()->with('success', 'Solução atualizada.');
    }

    public function toggleActive(Solution $solution): RedirectResponse
    {
        $solution->update(['active' => ! $solution->active]);

        return back()->with('success', 'Solução atualizada.');
    }

    public function destroy(Solution $solution): RedirectResponse
    {
        $solution->delete();

        return back()->with('success', 'Solução removida.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'kicker' => ['nullable', 'string', 'max:255'],
            'desc' => ['required', 'string', 'max:5000'],
            'bullets' => ['nullable', 'array'],
            'bullets.*' => ['string', 'max:255'],
            'active' => ['nullable', 'boolean'],
        ]);
    }
}
