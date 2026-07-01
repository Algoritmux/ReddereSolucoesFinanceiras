<?php

namespace Database\Seeders;

use App\Models\AiKnowledgeEntry;
use App\Models\AppSetting;
use App\Models\Article;
use App\Models\Solution;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'agenciaalgoritmux@gmail.com'],
            [
                'name' => 'Proprietário',
                'password' => 'K4wad.my8',
            ]
        );

        $defaultSolutions = [
            ['title' => 'Consultoria de investimentos personalizada', 'category' => 'Investimentos', 'kicker' => 'PERSONALIZAÇÃO', 'desc' => 'Construímos uma carteira alinhada ao seu perfil de risco.', 'bullets' => ['Análise de perfil', 'Alocação estratégica', 'Revisões periódicas']],
            ['title' => 'Planejamento financeiro e patrimonial', 'category' => 'Planejamento', 'kicker' => 'LONGO PRAZO', 'desc' => 'Organizamos suas finanças com visão de futuro.', 'bullets' => ['Mapeamento de metas', 'Fluxo de caixa', 'Eficiência tributária']],
            ['title' => 'Planejamento sucessório', 'category' => 'Proteção', 'kicker' => 'SUCESSÃO', 'desc' => 'Transmissão eficiente do patrimônio entre gerações.', 'bullets' => ['Holding familiar', 'Testamento e doações', 'Redução de ITCMD']],
            ['title' => 'Seguro de vida', 'category' => 'Seguros', 'kicker' => 'PROTEÇÃO', 'desc' => 'Proteção financeira para quem você ama.', 'bullets' => ['Cobertura por morte', 'Ferramenta sucessória', 'Liquidez imediata']],
        ];

        foreach ($defaultSolutions as $solution) {
            Solution::updateOrCreate(['title' => $solution['title']], $solution);
        }

        $articles = [
            [
                'title' => 'Como construir uma carteira de investimentos alinhada aos seus objetivos',
                'slug' => 'como-construir-uma-carteira-de-investimentos-alinhada-aos-seus-objetivos',
                'category' => 'Investimentos',
                'author' => 'Equipe Reddere',
                'excerpt' => 'Uma carteira eficiente começa antes da escolha de produtos: ela nasce do entendimento do patrimônio, do horizonte, da liquidez e do perfil de risco.',
                'cover_image' => '/images/articles/carteira-investimentos.png',
                'published_at' => now()->subDays(2),
                'content' => implode("\n\n", [
                    'Construir uma carteira de investimentos não é escolher os produtos que mais renderam no passado. O ponto de partida é entender o papel de cada recurso dentro do patrimônio: reserva, liquidez, crescimento, proteção e sucessão.',
                    'Uma boa alocação combina classes de ativos com funções diferentes. A renda fixa pode trazer previsibilidade e estabilidade; a renda variável amplia o potencial de crescimento; ativos internacionais reduzem dependência de um único país; previdência e seguros podem cumprir papéis tributários, sucessórios e de proteção familiar.',
                    'O erro mais comum é montar a carteira olhando apenas para rentabilidade. Sem uma estratégia clara, o investidor troca de posição em momentos ruins, concentra risco sem perceber ou mantém recursos importantes em ativos incompatíveis com o prazo do objetivo.',
                    'Na prática, a carteira precisa responder a três perguntas: quanto precisa estar disponível no curto prazo, quanto pode buscar crescimento no longo prazo e quais riscos não podem comprometer a vida financeira da família.',
                    'O trabalho consultivo da Reddere organiza essas respostas em uma política de investimento coerente, revisável e conectada aos objetivos reais do cliente. A carteira deixa de ser uma coleção de produtos e passa a ser uma ferramenta de planejamento patrimonial.',
                ]),
            ],
            [
                'title' => 'Planejamento sucessório: proteção patrimonial começa antes da urgência',
                'slug' => 'planejamento-sucessorio-protecao-patrimonial-comeca-antes-da-urgencia',
                'category' => 'Sucessão',
                'author' => 'Equipe Reddere',
                'excerpt' => 'Organizar a sucessão em vida reduz custos, evita conflitos e ajuda a preservar o patrimônio construído ao longo de anos.',
                'cover_image' => '/images/articles/sucessao-patrimonial.png',
                'published_at' => now()->subDays(8),
                'content' => implode("\n\n", [
                    'Planejamento sucessório não deve ser tratado como um tema distante. Para famílias, empresários e investidores, ele é uma etapa essencial da proteção patrimonial e da continuidade dos planos construídos ao longo do tempo.',
                    'Quando a sucessão não é organizada, decisões importantes podem ficar sujeitas a inventário, custos elevados, prazos longos e desalinhamento entre herdeiros. Isso pode comprometer liquidez, gerar disputas e pressionar a venda de ativos em momentos inadequados.',
                    'Existem diferentes instrumentos que podem fazer parte desse planejamento, como seguros, previdência privada, testamento, doações, acordos familiares, holdings e estruturas de governança. A escolha depende da composição patrimonial, do regime familiar, dos objetivos e do nível de complexidade da família.',
                    'Um bom plano sucessório não busca apenas eficiência tributária. Ele também precisa garantir clareza, preservar relações, proteger dependentes e manter liquidez para atravessar momentos difíceis sem desorganizar o patrimônio.',
                    'A Reddere atua conectando sucessão, investimentos, seguros e planejamento financeiro para que cada decisão faça sentido no conjunto. O objetivo é que o patrimônio tenha continuidade, propósito e proteção.',
                ]),
            ],
            [
                'title' => 'Previdência privada e renda futura: como transformar patrimônio em tranquilidade',
                'slug' => 'previdencia-privada-e-renda-futura-como-transformar-patrimonio-em-tranquilidade',
                'category' => 'Previdência',
                'author' => 'Equipe Reddere',
                'excerpt' => 'Previdência privada pode ser mais do que aposentadoria: quando bem estruturada, ajuda no planejamento tributário, sucessório e na geração de renda futura.',
                'cover_image' => '/images/articles/previdencia-renda-futura.png',
                'published_at' => now()->subDays(15),
                'content' => implode("\n\n", [
                    'A previdência privada costuma ser lembrada apenas como um investimento para aposentadoria, mas seu papel pode ser mais amplo. Ela pode ajudar na disciplina de longo prazo, no planejamento tributário, na sucessão e na organização da fase de renda.',
                    'A escolha entre PGBL e VGBL, tabela progressiva ou regressiva, fundos internos e regime de contribuição deve considerar a declaração de imposto, o horizonte de investimento e a estratégia patrimonial da família.',
                    'Outro ponto importante é o momento de transformar acumulação em renda. Muitas pessoas chegam à aposentadoria com patrimônio, mas sem uma política clara de retiradas. Isso pode levar a consumo excessivo, exposição inadequada a risco ou perda de eficiência tributária.',
                    'Uma estratégia bem desenhada separa reservas de curto prazo, ativos de crescimento e veículos voltados à renda futura. A previdência pode ocupar uma parte relevante desse desenho, desde que esteja integrada ao restante da carteira.',
                    'Na Reddere, a previdência é analisada dentro do plano financeiro completo. O foco é entender quando o cliente pretende usar o patrimônio, qual renda deseja construir e quais instrumentos oferecem a melhor relação entre segurança, flexibilidade e eficiência.',
                ]),
            ],
        ];

        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['slug' => $article['slug']],
                $article + ['published' => true]
            );
        }

        AppSetting::firstOrCreate(
            ['key' => 'ai_model'],
            ['value' => 'gpt-5.5']
        );

        AppSetting::firstOrCreate(
            ['key' => 'ai_system_prompt'],
            ['value' => 'Você é o Consultor IA da Reddere Soluções Financeiras. Responda em português do Brasil, com tom consultivo, claro e responsável. Use apenas informações da conversa e da base de conhecimento cadastrada. Não prometa rentabilidade, não dê recomendação individual definitiva e não trate a resposta como consultoria regulada. Quando necessário, explique que a resposta é informativa e convide o usuário a falar com um especialista da Reddere.']
        );

        $knowledgeEntries = [
            [
                'title' => 'Posicionamento da Reddere',
                'content' => 'A Reddere Soluções Financeiras trabalha com o princípio "Vencer com Lealdade". A abordagem é consultiva, com foco em entender objetivos, perfil de risco, horizonte, liquidez, proteção familiar e construção patrimonial antes de falar em produtos.',
            ],
            [
                'title' => 'Soluções oferecidas',
                'content' => 'As principais soluções são: consultoria de investimentos personalizada, planejamento financeiro e patrimonial, planejamento sucessório, seguro de vida, seguro social e planejamento previdenciário, previdência privada, renda fixa e renda variável, câmbio e investimentos internacionais.',
            ],
            [
                'title' => 'Regras de resposta do consultor',
                'content' => 'O consultor deve explicar caminhos possíveis sem prometer resultado. Deve pedir mais contexto quando faltarem dados relevantes, como objetivo, prazo, patrimônio aproximado, necessidade de liquidez e tolerância a risco. Sempre que o assunto envolver decisão individual de investimento, deve recomendar conversa com especialista da Reddere.',
            ],
        ];

        foreach ($knowledgeEntries as $entry) {
            AiKnowledgeEntry::firstOrCreate(
                ['title' => $entry['title']],
                $entry + ['active' => true]
            );
        }
    }
}
