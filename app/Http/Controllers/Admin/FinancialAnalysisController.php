<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FinancialAnalysis;
use Illuminate\Http\RedirectResponse;

class FinancialAnalysisController extends Controller
{
    public function destroy(FinancialAnalysis $financialAnalysis): RedirectResponse
    {
        $financialAnalysis->delete();

        return back()->with('success', 'RaioX financeiro removido.');
    }
}
