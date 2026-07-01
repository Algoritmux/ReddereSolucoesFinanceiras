<?php

use App\Http\Controllers\Admin\AiKnowledgeController;
use App\Http\Controllers\Admin\AiSettingsController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\ChatConversationController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\FinancialAnalysisController as AdminFinancialAnalysisController;
use App\Http\Controllers\Admin\SolutionController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ConsultorController;
use App\Http\Controllers\ContatoController;
use App\Http\Controllers\FinancialAnalysisController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/solucoes', [PageController::class, 'solucoes'])->name('solucoes');
Route::get('/consultor', [PageController::class, 'consultor'])->name('consultor');
Route::get('/raiox-financeiro', [PageController::class, 'raioXFinanceiro'])->name('raiox-financeiro');
Route::get('/time', [PageController::class, 'time'])->name('time');
Route::get('/contato', [PageController::class, 'contato'])->name('contato');
Route::get('/politica-de-privacidade', [PageController::class, 'politicaPrivacidade'])->name('politica.privacidade');
Route::get('/termos-do-usuario', [PageController::class, 'termosUso'])->name('termos.usuario');
Route::get('/artigos', [ArticleController::class, 'index'])->name('artigos');
Route::get('/artigos/{article:slug}', [ArticleController::class, 'show'])->name('artigos.show');

Route::post('/contato', [ContatoController::class, 'store'])->name('contato.store');
Route::post('/consultor/conversas', [ConsultorController::class, 'store'])->name('consultor.conversas.store');
Route::post('/consultor/ia/responder', [ConsultorController::class, 'reply'])
    ->middleware('throttle:20,1')
    ->name('consultor.ia.reply');
Route::post('/raiox-financeiro', [FinancialAnalysisController::class, 'store'])->name('raiox-financeiro.store');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'store'])->name('admin.login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/admin', [PageController::class, 'admin'])->name('admin');
    Route::post('/admin/logout', [AuthController::class, 'destroy'])->name('admin.logout');

    Route::post('/admin/solucoes', [SolutionController::class, 'store'])->name('admin.solucoes.store');
    Route::put('/admin/solucoes/{solution}', [SolutionController::class, 'update'])->name('admin.solucoes.update');
    Route::patch('/admin/solucoes/{solution}/toggle', [SolutionController::class, 'toggleActive'])->name('admin.solucoes.toggle');
    Route::delete('/admin/solucoes/{solution}', [SolutionController::class, 'destroy'])->name('admin.solucoes.destroy');

    Route::delete('/admin/contatos/{contact}', [ContactController::class, 'destroy'])->name('admin.contatos.destroy');
    Route::delete('/admin/conversas/{chatConversation}', [ChatConversationController::class, 'destroy'])->name('admin.conversas.destroy');
    Route::delete('/admin/raiox-financeiro/{financialAnalysis}', [AdminFinancialAnalysisController::class, 'destroy'])->name('admin.raiox-financeiro.destroy');

    Route::post('/admin/artigos', [AdminArticleController::class, 'store'])->name('admin.artigos.store');
    Route::put('/admin/artigos/{article:id}', [AdminArticleController::class, 'update'])->name('admin.artigos.update');
    Route::patch('/admin/artigos/{article:id}/toggle', [AdminArticleController::class, 'togglePublished'])->name('admin.artigos.toggle');
    Route::delete('/admin/artigos/{article:id}', [AdminArticleController::class, 'destroy'])->name('admin.artigos.destroy');

    Route::patch('/admin/configuracoes/ia', [AiSettingsController::class, 'update'])->name('admin.configuracoes.ia.update');
    Route::post('/admin/conhecimento-ia', [AiKnowledgeController::class, 'store'])->name('admin.conhecimento-ia.store');
    Route::put('/admin/conhecimento-ia/{aiKnowledgeEntry}', [AiKnowledgeController::class, 'update'])->name('admin.conhecimento-ia.update');
    Route::patch('/admin/conhecimento-ia/{aiKnowledgeEntry}/toggle', [AiKnowledgeController::class, 'toggleActive'])->name('admin.conhecimento-ia.toggle');
    Route::delete('/admin/conhecimento-ia/{aiKnowledgeEntry}', [AiKnowledgeController::class, 'destroy'])->name('admin.conhecimento-ia.destroy');
});
