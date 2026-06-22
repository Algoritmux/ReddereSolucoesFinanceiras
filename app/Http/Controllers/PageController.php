<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function solucoes(): Response
    {
        return Inertia::render('Solucoes');
    }

    public function consultor(): Response
    {
        return Inertia::render('Consultor');
    }

    public function time(): Response
    {
        return Inertia::render('Time');
    }

    public function contato(): Response
    {
        return Inertia::render('Contato');
    }

    public function admin(): Response
    {
        return Inertia::render('Admin');
    }
}
