<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ContatoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/solucoes', [PageController::class, 'solucoes'])->name('solucoes');
Route::get('/consultor', [PageController::class, 'consultor'])->name('consultor');
Route::get('/time', [PageController::class, 'time'])->name('time');
Route::get('/contato', [PageController::class, 'contato'])->name('contato');
Route::get('/admin', [PageController::class, 'admin'])->name('admin');

Route::post('/contato', [ContatoController::class, 'store'])->name('contato.store');
