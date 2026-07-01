<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Artigos', [
            'articles' => Article::where('published', true)
                ->orderByDesc('published_at')
                ->get(),
        ]);
    }

    public function show(Article $article): Response
    {
        abort_unless($article->published, 404);

        $related = Article::where('published', true)
            ->where('id', '!=', $article->id)
            ->when($article->category, fn ($q) => $q->where('category', $article->category))
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('ArtigoShow', [
            'article' => $article,
            'related' => $related,
        ]);
    }
}
