<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['perfil', 'respostas', 'solucoes'])]
class ChatConversation extends Model
{
    protected function casts(): array
    {
        return [
            'respostas' => 'array',
            'solucoes' => 'array',
        ];
    }
}
