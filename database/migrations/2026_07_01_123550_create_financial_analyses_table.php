<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('financial_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_id')->constrained()->cascadeOnDelete();
            $table->json('patrimonio');
            $table->decimal('patrimonio_total', 15, 2)->default(0);
            $table->string('perfil_investimento');
            $table->unsignedTinyInteger('pontuacao_perfil');
            $table->json('respostas_perfil');
            $table->string('objetivo_patrimonial');
            $table->decimal('valor_objetivo', 15, 2)->nullable();
            $table->string('prazo_objetivo')->nullable();
            $table->decimal('aporte_mensal', 15, 2)->nullable();
            $table->string('preferencia_contato')->nullable();
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_analyses');
    }
};
