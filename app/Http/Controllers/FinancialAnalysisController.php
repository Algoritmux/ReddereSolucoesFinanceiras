<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\FinancialAnalysis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FinancialAnalysisController extends Controller
{
    private const PATRIMONY_KEYS = [
        'reserva_liquidez',
        'renda_fixa',
        'renda_variavel',
        'fundos',
        'previdencia',
        'imoveis',
        'exterior',
        'participacoes',
        'cripto',
        'outros',
    ];

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telefone' => ['required', 'string', 'max:30'],
            'patrimonio' => ['required', 'array'],
            'patrimonio.*' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            'objetivo_patrimonial' => ['required', 'string', 'max:255'],
            'valor_objetivo' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            'prazo_objetivo' => ['nullable', 'string', 'max:255'],
            'aporte_mensal' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            'perfil_investimento' => ['required', 'string', 'in:Conservador,Moderado,Arrojado'],
            'pontuacao_perfil' => ['required', 'integer', 'min:5', 'max:15'],
            'respostas_perfil' => ['required', 'array', 'size:5'],
            'respostas_perfil.*.pergunta' => ['required_with:respostas_perfil', 'string', 'max:500'],
            'respostas_perfil.*.resposta' => ['required_with:respostas_perfil', 'string', 'max:255'],
            'preferencia_contato' => ['nullable', 'string', 'max:255'],
            'observacoes' => ['nullable', 'string', 'max:5000'],
        ]);

        $patrimonio = collect(self::PATRIMONY_KEYS)
            ->mapWithKeys(fn (string $key) => [$key => (float) ($validated['patrimonio'][$key] ?? 0)])
            ->all();

        $patrimonioTotal = array_sum($patrimonio);

        if ($patrimonioTotal <= 0) {
            throw ValidationException::withMessages([
                'patrimonio' => 'Informe ao menos um valor de patrimônio.',
            ]);
        }

        DB::transaction(function () use ($validated, $patrimonio, $patrimonioTotal): void {
            $contact = Contact::create([
                'nome' => $validated['nome'],
                'email' => $validated['email'],
                'telefone' => $validated['telefone'],
                'assunto' => 'RaioX financeiro',
                'mensagem' => $this->summaryMessage($validated, $patrimonioTotal),
                'origem' => 'RaioX financeiro',
            ]);

            FinancialAnalysis::create([
                'contact_id' => $contact->id,
                'patrimonio' => $patrimonio,
                'patrimonio_total' => $patrimonioTotal,
                'perfil_investimento' => $validated['perfil_investimento'],
                'pontuacao_perfil' => $validated['pontuacao_perfil'],
                'respostas_perfil' => $validated['respostas_perfil'],
                'objetivo_patrimonial' => $validated['objetivo_patrimonial'],
                'valor_objetivo' => $validated['valor_objetivo'] ?? null,
                'prazo_objetivo' => $validated['prazo_objetivo'] ?? null,
                'aporte_mensal' => $validated['aporte_mensal'] ?? null,
                'preferencia_contato' => $validated['preferencia_contato'] ?? null,
                'observacoes' => $validated['observacoes'] ?? null,
            ]);
        });

        return redirect()->back()->with('success', 'RaioX financeiro enviado com sucesso.');
    }

    private function summaryMessage(array $validated, float $patrimonioTotal): string
    {
        $total = number_format($patrimonioTotal, 2, ',', '.');
        $goalValue = isset($validated['valor_objetivo']) && $validated['valor_objetivo'] !== null
            ? ' Valor objetivo: R$ '.number_format((float) $validated['valor_objetivo'], 2, ',', '.').'.'
            : '';

        return sprintf(
            'RaioX financeiro recebido. Patrimônio total: R$ %s. Perfil: %s. Objetivo: %s.%s',
            $total,
            $validated['perfil_investimento'],
            $validated['objetivo_patrimonial'],
            $goalValue
        );
    }
}
