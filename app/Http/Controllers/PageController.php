<?php

namespace App\Http\Controllers;

use App\Models\AiKnowledgeEntry;
use App\Models\Article;
use App\Models\ChatConversation;
use App\Models\Contact;
use App\Models\FinancialAnalysis;
use App\Models\Solution;
use App\Services\AiConsultorService;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home', [
            'articles' => Article::where('published', true)
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }

    public function solucoes(): Response
    {
        return Inertia::render('Solucoes');
    }

    public function consultor(AiConsultorService $consultor): Response
    {
        return Inertia::render('Consultor', [
            'aiEnabled' => $consultor->isConfigured(),
        ]);
    }

    public function time(): Response
    {
        return Inertia::render('Time');
    }

    public function contato(): Response
    {
        return Inertia::render('Contato');
    }

    public function raioXFinanceiro(): Response
    {
        return Inertia::render('RaioXFinanceiro');
    }

    public function politicaPrivacidade(): Response
    {
        return Inertia::render('PoliticaPrivacidade');
    }

    public function termosUso(): Response
    {
        return Inertia::render('TermosUso');
    }

    public function admin(AiConsultorService $consultor): Response
    {
        return Inertia::render('Admin', [
            'solutions' => Solution::orderBy('created_at')->get(),
            'contacts' => Contact::latest()->get(),
            'chats' => ChatConversation::latest()->get(),
            'financialAnalyses' => FinancialAnalysis::with('contact')->latest()->get(),
            'articles' => Article::latest()->get(),
            'aiSettings' => $consultor->publicSettings(),
            'aiKnowledgeEntries' => AiKnowledgeEntry::latest()->get(),
        ]);
    }
}
