<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ContatoController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'telefone' => 'nullable|string|max:30',
            'assunto'  => 'nullable|string|max:255',
            'mensagem' => 'nullable|string|max:5000',
        ]);

        Contact::create($validated + ['origem' => 'Formulário de contato']);

        return redirect()->back()->with('success', 'Mensagem enviada com sucesso!');
    }
}
