<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'contact_id',
    'patrimonio',
    'patrimonio_total',
    'perfil_investimento',
    'pontuacao_perfil',
    'respostas_perfil',
    'objetivo_patrimonial',
    'valor_objetivo',
    'prazo_objetivo',
    'aporte_mensal',
    'preferencia_contato',
    'observacoes',
])]
class FinancialAnalysis extends Model
{
    protected function casts(): array
    {
        return [
            'patrimonio' => 'array',
            'patrimonio_total' => 'decimal:2',
            'pontuacao_perfil' => 'integer',
            'respostas_perfil' => 'array',
            'valor_objetivo' => 'decimal:2',
            'aporte_mensal' => 'decimal:2',
        ];
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }
}
