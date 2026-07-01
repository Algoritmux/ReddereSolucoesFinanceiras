<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\FinancialAnalysis;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinancialAnalysisTest extends TestCase
{
    use RefreshDatabase;

    public function test_financial_analysis_submission_creates_contact_and_analysis(): void
    {
        $response = $this->post('/raiox-financeiro', [
            'nome' => 'Cliente RaioX',
            'email' => 'cliente.raiox@example.com',
            'telefone' => '+55 11 99999-9999',
            'patrimonio' => [
                'reserva_liquidez' => 50000,
                'renda_fixa' => 100000,
                'renda_variavel' => 0,
            ],
            'objetivo_patrimonial' => 'Aposentadoria ou independencia financeira',
            'valor_objetivo' => 1000000,
            'prazo_objetivo' => '10 anos',
            'aporte_mensal' => 5000,
            'perfil_investimento' => 'Moderado',
            'pontuacao_perfil' => 10,
            'respostas_perfil' => [
                ['pergunta' => 'Horizonte', 'resposta' => 'Entre 2 e 7 anos'],
                ['pergunta' => 'Oscilacao', 'resposta' => 'Reavalio, mas mantenho parte da estrategia'],
                ['pergunta' => 'Experiencia', 'resposta' => 'Conheco renda fixa, fundos e previdencia'],
                ['pergunta' => 'Liquidez', 'resposta' => 'Uma parte, desde que bem planejada'],
                ['pergunta' => 'Prioridade', 'resposta' => 'Equilibrar seguranca e crescimento'],
            ],
            'preferencia_contato' => 'WhatsApp em horario comercial',
            'observacoes' => 'Deseja revisar previdencia existente.',
        ]);

        $response->assertRedirect();

        $contact = Contact::where('email', 'cliente.raiox@example.com')->first();
        $this->assertNotNull($contact);
        $this->assertSame('RaioX financeiro', $contact->origem);

        $analysis = FinancialAnalysis::whereBelongsTo($contact)->first();
        $this->assertNotNull($analysis);
        $this->assertSame('Moderado', $analysis->perfil_investimento);
        $this->assertEquals(150000, (float) $analysis->patrimonio_total);
        $this->assertSame('Aposentadoria ou independencia financeira', $analysis->objetivo_patrimonial);
    }
}
