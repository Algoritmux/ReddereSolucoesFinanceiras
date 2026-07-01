import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SOLUTIONS = [
    {
        id: 'consultoria',
        kicker: 'PERSONALIZAÇÃO',
        category: 'Investimentos',
        title: 'Consultoria de investimentos personalizada',
        desc: 'Construímos uma carteira alinhada ao seu perfil de risco, horizonte e objetivos. Nada de produto de prateleira: cada recomendação tem propósito.',
        bullets: ['Análise de perfil e objetivos de vida', 'Alocação estratégica e rebalanceamento ativo', 'Acompanhamento próximo e revisões periódicas'],
        image: '/images/Consultoria.png',
    },
    {
        id: 'planejamento',
        kicker: 'LONGO PRAZO',
        category: 'Planejamento',
        title: 'Planejamento financeiro e patrimonial',
        desc: 'Organizamos suas finanças com visão de futuro, conectando metas de curto, médio e longo prazo a um plano executável e revisável.',
        bullets: ['Mapeamento de metas e fluxo de caixa', 'Estratégia de acumulação e reserva', 'Eficiência tributária na construção patrimonial'],
        image: '/images/Planejamento.png',
    },
    {
        id: 'sucessorio',
        kicker: 'SUCESSÃO',
        category: 'Proteção',
        title: 'Planejamento sucessório',
        desc: 'Estruturas que garantem a transmissão eficiente do patrimônio entre gerações, reduzindo custos, impostos e conflitos familiares.',
        bullets: ['Holding familiar e governança patrimonial', 'Testamento, doações e usufruto', 'Redução de ITCMD e custos de inventário'],
        image: '/images/Sucessorio.png',
    },
    {
        id: 'seguro-vida',
        kicker: 'PROTEÇÃO',
        category: 'Seguros',
        title: 'Seguro de vida',
        desc: 'Proteção financeira para quem você ama. Garantimos liquidez imediata para a família e preservamos o patrimônio em momentos difíceis.',
        bullets: ['Cobertura por morte e invalidez', 'Seguro como ferramenta sucessória', 'Liquidez livre de inventário para herdeiros'],
        image: '/images/Seguro de vida.png',
    },
    {
        id: 'seguro-social',
        kicker: 'PREVIDÊNCIA',
        category: 'Previdência',
        title: 'Seguro social e planejamento previdenciário',
        desc: 'Análise da sua situação junto ao INSS e estratégias para otimizar benefícios, contribuições e o melhor momento de se aposentar.',
        bullets: ['Diagnóstico de contribuições ao INSS', 'Melhor estratégia de aposentadoria', 'Integração com previdência privada'],
        image: '/images/Seguro Social.png',
    },
    {
        id: 'previdencia',
        kicker: 'APOSENTADORIA',
        category: 'Previdência',
        title: 'Previdência privada',
        desc: 'Planejamento de aposentadoria com os veículos certos, escolha tributária adequada e horizonte bem definido para a tranquilidade futura.',
        bullets: ['PGBL e VGBL conforme seu perfil tributário', 'Estratégia de acumulação e desacumulação', 'Portabilidade e revisão de planos existentes'],
        image: '/images/Previdencia.png',
    },
    {
        id: 'renda',
        kicker: 'ALOCAÇÃO',
        category: 'Investimentos',
        title: 'Renda fixa e renda variável',
        desc: 'Equilíbrio entre a previsibilidade da renda fixa e o potencial da renda variável, com gestão de risco rigorosa em cada ciclo de mercado.',
        bullets: ['Crédito privado, títulos públicos e fundos', 'Ações, ETFs e fundos imobiliários', 'Gestão de risco e diversificação inteligente'],
        image: '/images/Renda.png',
    },
    {
        id: 'internacional',
        kicker: 'GLOBAL',
        category: 'Investimentos',
        title: 'Câmbio e investimentos internacionais',
        desc: 'Diversificação geográfica e exposição a moedas fortes para reduzir risco e capturar oportunidades fora do Brasil.',
        bullets: ['Exposição a dólar, euro e ativos globais', 'Contas e investimentos no exterior', 'Operações de câmbio com atendimento dedicado'],
        image: '/images/Cambio-Internacional.png',
    },
];

const CATEGORIES = ['Todos', 'Investimentos', 'Planejamento', 'Proteção', 'Previdência', 'Seguros'];

function SolutionCard({ sol, index }) {
    const isEven = index % 2 === 0;
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-10 md:py-14 border-b border-rd-gold/10 last:border-b-0 ${!isEven ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div>
                <div className="inline-flex items-center gap-2 border border-rd-gold/40 px-3.5 py-1.5 rounded-sm mb-4">
                    <span className="text-[10px] tracking-[2px] font-bold text-rd-gold">{sol.kicker}</span>
                    <span className="text-rd-cream/30">·</span>
                    <span className="text-[10px] tracking-[1px] text-rd-cream/55">{sol.category}</span>
                </div>
                <h2 className="font-kanit font-bold text-[clamp(24px,2.8vw,36px)] leading-snug text-rd-cream tracking-tight">
                    {sol.title}
                </h2>
                <p className="text-[16px] leading-relaxed text-rd-cream/72 mt-4">{sol.desc}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                    {sol.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14.5px] text-rd-cream/80">
                            <span className="mt-1 w-1.5 h-1.5 shrink-0 bg-rd-gold rounded-full" />
                            {b}
                        </li>
                    ))}
                </ul>
                <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 mt-7 font-semibold text-rd-gold text-[14px] hover:text-rd-gold-light transition-colors"
                >
                    Quero saber mais →
                </Link>
            </div>
            <div
                className="relative aspect-[5/4] bg-[rgba(15,85,100,.35)] border border-rd-gold/18 rounded overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15, 85, 100, 0.2) 0%, rgba(10, 38, 50, 0.4) 100%), url('${sol.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-grid-gold-sm opacity-20" />
                <div className="absolute left-5 bottom-5 right-5">
                    <div className="inline-flex items-center gap-2 bg-rd-dark/80 border border-rd-gold/25 px-3 py-2 rounded-sm backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-rd-gold rounded-full" />
                        <span className="text-[11px] tracking-[1.5px] font-bold text-rd-gold">{sol.category.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Solucoes() {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const filtered = activeCategory === 'Todos'
        ? SOLUTIONS
        : SOLUTIONS.filter((s) => s.category === activeCategory);

    return (
        <MainLayout>
            <Head title="Soluções" />

            {/* HERO */}
            <section className="relative pt-[160px] pb-20 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[1240px] mx-auto relative">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">SOLUÇÕES</div>
                    <div className="inline-flex items-center gap-2 border border-rd-gold/40 px-4 py-[7px] rounded-sm mb-5">
                        <span className="w-1.5 h-1.5 bg-rd-gold rounded-full" />
                        <span className="text-xs tracking-[3px] font-bold text-rd-gold">VENCER COM LEALDADE</span>
                    </div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,60px)] leading-[1.05] tracking-tight max-w-[820px] animate-rd-rise">
                        Um portfólio completo para construir, multiplicar e proteger seu patrimônio.
                    </h1>
                    <p className="text-[18px] leading-relaxed text-rd-cream/75 mt-5 max-w-[620px]">
                        Cada solução é desenhada a partir do seu perfil e dos seus objetivos. Sem fórmulas prontas — apenas estratégia, disciplina e acompanhamento próximo.
                    </p>
                </div>
            </section>

            {/* FILTROS */}
            <div className="bg-rd-dark border-y border-rd-gold/16 px-5 md:px-8 py-5 sticky top-9 z-50">
                <div className="max-w-[1240px] mx-auto flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`shrink-0 text-[13px] font-semibold px-4 py-2 rounded-sm border transition-all cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-rd-gold text-rd-primary border-rd-gold'
                                    : 'bg-transparent text-rd-cream/65 border-rd-gold/25 hover:border-rd-gold/50 hover:text-rd-cream'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* LISTA DE SOLUÇÕES */}
            <section className="bg-rd-primary px-5 md:px-8 py-10">
                <div className="max-w-[1240px] mx-auto">
                    {filtered.map((sol, i) => (
                        <SolutionCard key={sol.id} sol={sol} index={i} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-rd-teal py-20 px-5 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[780px] mx-auto text-center relative">
                    <h2 className="font-kanit font-bold text-[clamp(28px,3.6vw,44px)] leading-tight text-rd-cream tracking-tight">
                        Não sabe por onde começar?
                    </h2>
                    <p className="text-[17px] text-rd-cream/80 mt-4 max-w-[500px] mx-auto">
                        Nosso consultor on-line identifica as soluções certas para o seu perfil em poucos minutos.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center mt-8">
                        <Link
                            href="/consultor"
                            className="inline-flex justify-center text-center items-center gap-2 bg-rd-gold text-rd-primary font-bold text-[15px] px-6 sm:px-7 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                        >
                            Usar o Consultor On-line →
                        </Link>
                        <Link
                            href="/contato"
                            className="inline-flex justify-center text-center items-center gap-2 bg-transparent text-rd-cream font-semibold text-[15px] px-6 sm:px-7 py-4 border border-rd-cream/30 rounded-sm transition-all hover:border-rd-gold hover:text-rd-gold"
                        >
                            Falar com um especialista
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
