<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nome', 'email', 'telefone', 'assunto', 'mensagem', 'origem'])]
class Contact extends Model
{
    public function financialAnalyses(): HasMany
    {
        return $this->hasMany(FinancialAnalysis::class);
    }
}
