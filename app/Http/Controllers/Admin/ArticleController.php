<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);
        $validated['slug'] = Article::uniqueSlug($validated['title']);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('articles', 'public');
        }

        $validated['published_at'] = $validated['published'] ? now() : null;

        Article::create($validated);

        return back()->with('success', 'Artigo criado com sucesso.');
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $this->validated($request);

        if ($validated['title'] !== $article->title) {
            $validated['slug'] = Article::uniqueSlug($validated['title'], $article->id);
        }

        if ($request->hasFile('cover_image')) {
            if ($article->cover_image) {
                Storage::disk('public')->delete($article->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('articles', 'public');
        }

        if ($validated['published'] && ! $article->published) {
            $validated['published_at'] = now();
        } elseif (! $validated['published']) {
            $validated['published_at'] = null;
        }

        $article->update($validated);

        return back()->with('success', 'Artigo atualizado.');
    }

    public function togglePublished(Article $article): RedirectResponse
    {
        $published = ! $article->published;

        $article->update([
            'published' => $published,
            'published_at' => $published ? ($article->published_at ?? now()) : null,
        ]);

        return back()->with('success', 'Artigo atualizado.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        if ($article->cover_image) {
            Storage::disk('public')->delete($article->cover_image);
        }

        $article->delete();

        return back()->with('success', 'Artigo removido.');
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'published' => ['nullable', 'boolean'],
        ]);

        $validated['published'] = $request->boolean('published', true);

        return $validated;
    }
}
