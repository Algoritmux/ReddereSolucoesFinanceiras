<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'category', 'kicker', 'desc', 'bullets', 'active'])]
class Solution extends Model
{
    protected function casts(): array
    {
        return [
            'bullets' => 'array',
            'active' => 'boolean',
        ];
    }
}
