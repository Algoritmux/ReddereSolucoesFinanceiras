import { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const PATRIMONY_TYPES = [
    { key: 'reserva_liquidez', label: 'Reserva e conta corrente', hint: 'Caixa, CDB liquido, Tesouro Selic' },
    { key: 'renda_fixa', label: 'Renda fixa', hint: 'Titulos publicos, CDB, LCI, LCA, credito privado' },
    { key: 'renda_variavel', label: 'Renda variavel', hint: 'Acoes, ETFs, FIIs e fundos listados' },
    { key: 'fundos', label: 'Fundos de investimento', hint: 'Multimercados, acoes, credito, exclusivos' },
    { key: 'previdencia', label: 'Previdencia privada', hint: 'PGBL, VGBL e planos corporativos' },
    { key: 'imoveis', label: 'Imoveis', hint: 'Residenciais, comerciais, terrenos' },
    { key: 'exterior', label: 'Exterior e moedas', hint: 'Conta internacional, dolar, euro, ativos globais' },
    { key: 'participacoes', label: 'Empresas e participacoes', hint: 'Sociedades, quotas e negocios proprios' },
    { key: 'cripto', label: 'Criptoativos', hint: 'Bitcoin, stablecoins e demais ativos digitais' },
    { key: 'outros', label: 'Outros ativos', hint: 'Veiculos, recebiveis, joias, obras, outros bens' },
];

const PROFILE_QUESTIONS = [
    {
        id: 'horizonte',
        question: 'Por quanto tempo voce pretende manter a maior parte dos investimentos?',
        options: [
            { label: 'Ate 2 anos', score: 1 },
            { label: 'Entre 2 e 7 anos', score: 2 },
            { label: 'Acima de 7 anos', score: 3 },
        ],
    },
    {
        id: 'oscilacao',
        question: 'Como voce reage a uma queda temporaria relevante na carteira?',
        options: [
            { label: 'Prefiro reduzir risco imediatamente', score: 1 },
            { label: 'Reavalio, mas mantenho parte da estrategia', score: 2 },
            { label: 'Entendo os ciclos e posso aumentar posicao', score: 3 },
        ],
    },
    {
        id: 'experiencia',
        question: 'Qual e sua experiencia com produtos de investimento?',
        options: [
            { label: 'Pouca experiencia', score: 1 },
            { label: 'Conheco renda fixa, fundos e previdencia', score: 2 },
            { label: 'Invisto em renda variavel, exterior ou alternativos', score: 3 },
        ],
    },
    {
        id: 'liquidez',
        question: 'Quanto desse patrimonio pode ficar sem liquidez imediata?',
        options: [
            { label: 'Quase nada, preciso de acesso rapido', score: 1 },
            { label: 'Uma parte, desde que bem planejada', score: 2 },
            { label: 'Boa parte, se o potencial compensar', score: 3 },
        ],
    },
    {
        id: 'prioridade',
        question: 'O que pesa mais na sua decisao hoje?',
        options: [
            { label: 'Preservar capital', score: 1 },
            { label: 'Equilibrar seguranca e crescimento', score: 2 },
            { label: 'Buscar crescimento de longo prazo', score: 3 },
        ],
    },
];

const GOALS = [
    'Construir uma reserva mais robusta',
    'Aposentadoria ou independencia financeira',
    'Comprar um imovel ou realizar um objetivo especifico',
    'Proteger a familia e o patrimonio',
    'Planejamento sucessorio',
    'Diversificar internacionalmente',
    'Outro objetivo',
];

const CONTACT_PREFERENCES = [
    'WhatsApp em horario comercial',
    'Ligacao em horario comercial',
    'E-mail com proposta de proximos passos',
    'Prefiro combinar depois',
];

const PROFILE_COPY = {
    Conservador: 'Prioriza preservacao, liquidez e previsibilidade. O plano deve controlar volatilidade antes de buscar retornos maiores.',
    Moderado: 'Aceita alguma oscilacao para capturar crescimento, mantendo equilibrio entre seguranca, liquidez e diversificacao.',
    Arrojado: 'Tolera ciclos de mercado e menor liquidez quando a estrategia e o horizonte justificam maior potencial de retorno.',
};

const PROFILE_PLANS = {
    Conservador: {
        annualRate: 0.075,
        rateLabel: '7,5% ao ano',
        allocation: [
            { label: 'Reserva e liquidez', pct: 18 },
            { label: 'Renda fixa pos-fixada', pct: 34 },
            { label: 'Renda fixa inflacao', pct: 24 },
            { label: 'Fundos defensivos', pct: 12 },
            { label: 'Previdencia privada', pct: 12 },
        ],
        steps: [
            'Separar reserva de emergencia e caixa de curto prazo antes de buscar retorno.',
            'Montar uma base de renda fixa diversificada por vencimentos e emissores.',
            'Revisar previdencia, seguros e sucessao para proteger o plano familiar.',
        ],
    },
    Moderado: {
        annualRate: 0.095,
        rateLabel: '9,5% ao ano',
        allocation: [
            { label: 'Reserva e liquidez', pct: 10 },
            { label: 'Renda fixa estrategica', pct: 32 },
            { label: 'Fundos multimercado', pct: 16 },
            { label: 'Renda variavel', pct: 18 },
            { label: 'Exterior e moedas', pct: 12 },
            { label: 'Previdencia privada', pct: 12 },
        ],
        steps: [
            'Definir uma carteira base com equilibrio entre previsibilidade e crescimento.',
            'Aumentar diversificacao em fundos, renda variavel e exterior de forma gradual.',
            'Rebalancear periodicamente para manter o risco coerente com o objetivo.',
        ],
    },
    Arrojado: {
        annualRate: 0.115,
        rateLabel: '11,5% ao ano',
        allocation: [
            { label: 'Reserva e liquidez', pct: 6 },
            { label: 'Renda fixa de suporte', pct: 20 },
            { label: 'Renda variavel', pct: 28 },
            { label: 'Exterior e moedas', pct: 20 },
            { label: 'Alternativos e tematicos', pct: 12 },
            { label: 'Previdencia privada', pct: 14 },
        ],
        steps: [
            'Preservar uma reserva enxuta para evitar venda forçada em momentos ruins.',
            'Construir exposicao a crescimento com diversificacao por classes e geografias.',
            'Usar rebalanceamento e limites por classe para controlar concentracao de risco.',
        ],
    },
};

const emptyPatrimony = PATRIMONY_TYPES.reduce((acc, item) => ({ ...acc, [item.key]: '' }), {});

function currency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    });
}

function profileFromAnswers(answers) {
    const selected = Object.values(answers);
    const score = selected.reduce((total, item) => total + Number(item?.score || 0), 0);

    if (!selected.length) {
        return { label: 'Moderado', score: 10 };
    }

    if (score <= 7) {
        return { label: 'Conservador', score };
    }

    if (score <= 11) {
        return { label: 'Moderado', score };
    }

    return { label: 'Arrojado', score };
}

function yearsFromText(text, profileLabel) {
    const fallback = profileLabel === 'Conservador' ? 5 : profileLabel === 'Arrojado' ? 15 : 10;
    const match = String(text || '').match(/\d+/);
    const years = match ? Number(match[0]) : fallback;

    return Math.max(years || fallback, 1);
}

function projectCapital(initial, monthly, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    const futureInitial = initial * Math.pow(1 + monthlyRate, months);
    const futureMonthly = monthly > 0
        ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : 0;

    return futureInitial + futureMonthly;
}

function buildAnalysisResult({ data, profile, patrimonioTotal }) {
    const plan = PROFILE_PLANS[profile.label];
    const monthly = Number(data.aporte_mensal || 0);
    const targetYears = yearsFromText(data.prazo_objetivo, profile.label);
    const targetValue = Number(data.valor_objetivo || 0);
    const milestoneYears = [...new Set([Math.min(5, targetYears), targetYears, targetYears + 5])]
        .filter((year) => year > 0)
        .sort((a, b) => a - b);

    const milestones = milestoneYears.map((year) => {
        const projected = projectCapital(patrimonioTotal, monthly, plan.annualRate, year);
        const invested = patrimonioTotal + monthly * year * 12;

        return {
            year,
            projected,
            invested,
            growth: projected - invested,
        };
    });

    const targetProjection = projectCapital(patrimonioTotal, monthly, plan.annualRate, targetYears);

    return {
        profile,
        plan,
        patrimonioTotal,
        monthly,
        targetYears,
        targetValue,
        targetProjection,
        targetGap: Math.max(targetValue - targetProjection, 0),
        objective: data.objetivo_patrimonial,
        milestones,
        allocation: plan.allocation.map((item) => ({
            ...item,
            amount: patrimonioTotal * (item.pct / 100),
        })),
    };
}

function ResultPanel({ result, saved, saving, onEdit }) {
    const finalMilestone = result.milestones[result.milestones.length - 1];

    return (
        <div id="resultado-raiox" className="bg-rd-dark border border-rd-gold/22 rounded p-5 md:p-9 animate-rd-pop">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 border-b border-rd-cream/10 pb-7 mb-7">
                <div>
                    <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-3">RESULTADO DO RAIOX</div>
                    <h2 className="font-kanit font-bold text-[clamp(30px,4vw,46px)] leading-tight text-rd-cream">
                        Seu perfil estimado e {result.profile.label}.
                    </h2>
                    <p className="text-[15px] leading-relaxed text-rd-cream/68 mt-4 max-w-[680px]">
                        {PROFILE_COPY[result.profile.label]} A simulacao abaixo e ilustrativa e serve para orientar a conversa com um especialista.
                    </p>
                </div>
                <div className="bg-rd-primary/65 border border-rd-gold/16 rounded p-4 w-full sm:w-auto sm:min-w-[230px]">
                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">STATUS</div>
                    <div className="text-[13px] text-rd-cream/70">
                        {saved ? 'Dados registrados para contato futuro.' : saving ? 'Registrando dados no painel...' : 'Analise gerada na pagina.'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                <div className="bg-rd-primary/55 border border-rd-gold/12 rounded p-5">
                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">PATRIMONIO ATUAL</div>
                    <div className="font-kanit font-bold text-[26px] sm:text-[30px] text-rd-gold leading-none break-words">{currency(result.patrimonioTotal)}</div>
                </div>
                <div className="bg-rd-primary/55 border border-rd-gold/12 rounded p-5">
                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">PROJECAO EM {result.targetYears} ANOS</div>
                    <div className="font-kanit font-bold text-[26px] sm:text-[30px] text-rd-gold leading-none break-words">{currency(result.targetProjection)}</div>
                    <div className="text-[12px] text-rd-cream/45 mt-2">Premissa: {result.plan.rateLabel}</div>
                </div>
                <div className="bg-rd-primary/55 border border-rd-gold/12 rounded p-5">
                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">OBJETIVO</div>
                    <div className="text-[15px] font-semibold text-rd-cream leading-snug">{result.objective}</div>
                    {result.targetValue > 0 && (
                        <div className="text-[12px] text-rd-cream/50 mt-2">
                            Meta: {currency(result.targetValue)}
                            {result.targetGap > 0 ? ` · lacuna estimada: ${currency(result.targetGap)}` : ' · meta coberta pela projecao'}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-rd-primary/35 border border-rd-gold/12 rounded p-5">
                    <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-4">PREVISAO DE CRESCIMENTO</div>
                    <div className="flex flex-col gap-4">
                        {result.milestones.map((item) => (
                            <div key={item.year}>
                                <div className="flex justify-between gap-4 mb-1.5">
                                    <span className="text-[13px] font-semibold text-rd-cream">Em {item.year} anos</span>
                                    <span className="text-[13px] font-bold text-rd-gold">{currency(item.projected)}</span>
                                </div>
                                <div className="h-2 bg-rd-dark rounded overflow-hidden">
                                    <div
                                        className="h-full bg-rd-gold"
                                        style={{ width: `${Math.min((item.projected / finalMilestone.projected) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="text-[12px] text-rd-cream/45 mt-1.5">
                                    Capital aplicado: {currency(item.invested)} · ganho estimado: {currency(Math.max(item.growth, 0))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-rd-primary/35 border border-rd-gold/12 rounded p-5">
                    <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-4">CONSTRUCAO DA CARTEIRA</div>
                    <div className="flex flex-col gap-3.5">
                        {result.allocation.map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between gap-4 mb-1.5">
                                    <span className="text-[13px] text-rd-cream/74">{item.label}</span>
                                    <span className="text-[13px] font-bold text-rd-gold">{item.pct}% · {currency(item.amount)}</span>
                                </div>
                                <div className="h-2 bg-rd-dark rounded overflow-hidden">
                                    <div className="h-full bg-rd-gold" style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="mt-6 bg-rd-primary/35 border border-rd-gold/12 rounded p-5">
                <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-4">PROXIMOS PASSOS</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.plan.steps.map((step, index) => (
                        <div key={step} className="border border-rd-cream/10 rounded p-4">
                            <div className="font-kanit font-bold text-rd-gold text-[22px] leading-none mb-3">0{index + 1}</div>
                            <p className="text-[13.5px] text-rd-cream/70 leading-relaxed">{step}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex flex-wrap gap-3 mt-7">
                <Link
                    href="/contato"
                    className="bg-rd-gold text-rd-primary font-bold text-[14px] px-6 py-3 rounded-sm transition-all hover:bg-rd-gold-light"
                >
                    Falar com especialista
                </Link>
                <button
                    type="button"
                    onClick={onEdit}
                    className="bg-transparent text-rd-cream/70 font-semibold text-[14px] px-6 py-3 rounded-sm border border-rd-cream/20 transition-all hover:border-rd-gold hover:text-rd-gold cursor-pointer"
                >
                    Editar informacoes
                </button>
            </div>
        </div>
    );
}

export default function RaioXFinanceiro() {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisSaved, setAnalysisSaved] = useState(false);
    const [profileAnswers, setProfileAnswers] = useState({});
    const [profileError, setProfileError] = useState('');
    const [patrimonyError, setPatrimonyError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        email: '',
        telefone: '',
        patrimonio: emptyPatrimony,
        objetivo_patrimonial: '',
        valor_objetivo: '',
        prazo_objetivo: '',
        aporte_mensal: '',
        perfil_investimento: 'Moderado',
        pontuacao_perfil: 10,
        respostas_perfil: [],
        preferencia_contato: '',
        observacoes: '',
    });

    const patrimonioTotal = useMemo(
        () => PATRIMONY_TYPES.reduce((total, item) => total + Number(data.patrimonio[item.key] || 0), 0),
        [data.patrimonio],
    );

    const topAssets = useMemo(
        () => PATRIMONY_TYPES
            .map((item) => ({ ...item, value: Number(data.patrimonio[item.key] || 0) }))
            .filter((item) => item.value > 0)
            .sort((a, b) => b.value - a.value)
            .slice(0, 4),
        [data.patrimonio],
    );

    const profile = profileFromAnswers(profileAnswers);
    const missingGoal = Math.max(Number(data.valor_objetivo || 0) - patrimonioTotal, 0);
    const answeredCount = Object.keys(profileAnswers).length;

    const updatePatrimony = (key, value) => {
        setPatrimonyError('');
        setData('patrimonio', {
            ...data.patrimonio,
            [key]: value,
        });
    };

    const updateProfile = (question, option) => {
        const nextAnswers = {
            ...profileAnswers,
            [question.id]: {
                pergunta: question.question,
                resposta: option.label,
                score: option.score,
            },
        };

        const nextProfile = profileFromAnswers(nextAnswers);
        const respostas = PROFILE_QUESTIONS
            .filter((q) => nextAnswers[q.id])
            .map((q) => ({
                pergunta: q.question,
                resposta: nextAnswers[q.id].resposta,
            }));

        setProfileAnswers(nextAnswers);
        setProfileError('');
        setData({
            ...data,
            perfil_investimento: nextProfile.label,
            pontuacao_perfil: nextProfile.score,
            respostas_perfil: respostas,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (answeredCount < PROFILE_QUESTIONS.length) {
            setProfileError('Responda todas as perguntas do perfil de investimento.');
            return;
        }

        if (patrimonioTotal <= 0) {
            setPatrimonyError('Informe ao menos um valor de patrimonio.');
            return;
        }

        const result = buildAnalysisResult({ data, profile, patrimonioTotal });
        setAnalysisResult(result);
        setAnalysisSaved(false);

        setTimeout(() => {
            document.getElementById('resultado-raiox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);

        post('/raiox-financeiro', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setAnalysisSaved(true);
            },
            onError: () => {
                setAnalysisResult(null);
                setAnalysisSaved(false);
                setTimeout(() => {
                    document.getElementById('form-raiox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            },
        });
    };

    const inputClass = 'w-full bg-rd-primary border border-rd-gold/25 text-rd-cream text-[14px] px-4 py-3 rounded focus:outline-none focus:border-rd-gold transition-colors';
    const labelClass = 'block text-[12px] font-semibold text-rd-cream/72 mb-2';

    return (
        <MainLayout>
            <Head title="RaioX financeiro" />

            <section className="relative pt-[150px] pb-16 px-5 md:px-8 overflow-hidden bg-rd-primary">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none opacity-70" />
                <div className="max-w-[1240px] mx-auto relative grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-rd-gold/40 px-4 py-[7px] rounded-sm mb-6">
                            <span className="w-1.5 h-1.5 bg-rd-green rounded-full shadow-[0_0_8px_#5fb98c]" />
                            <span className="text-xs tracking-[2px] font-semibold text-rd-gold">DIAGNOSTICO PATRIMONIAL</span>
                        </div>
                        <h1 className="font-kanit font-bold text-[clamp(36px,5vw,62px)] leading-[1.03] tracking-tight text-rd-cream animate-rd-rise">
                            RaioX financeiro para entender seu patrimonio com clareza.
                        </h1>
                        <p className="text-[17px] leading-relaxed text-rd-cream/75 mt-5 max-w-[620px]">
                            Preencha seus dados, separe o patrimonio por tipo de ativo e responda uma analise de perfil. A equipe da Reddere usa essas informacoes para preparar um contato mais objetivo.
                        </p>
                        <div className="flex flex-wrap gap-3.5 mt-8">
                            <a
                                href="#form-raiox"
                                className="inline-flex w-full sm:w-auto justify-center text-center items-center gap-2.5 bg-rd-gold text-rd-primary font-bold text-[15px] px-6 sm:px-7 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                            >
                                Comecar meu RaioX <span className="text-lg">→</span>
                            </a>
                            <Link
                                href="/contato"
                                className="inline-flex w-full sm:w-auto justify-center text-center items-center gap-2.5 bg-transparent text-rd-cream font-semibold text-[15px] px-6 sm:px-7 py-4 border border-rd-cream/30 rounded-sm transition-all hover:border-rd-gold hover:text-rd-gold"
                            >
                                Falar direto com especialista
                            </Link>
                        </div>
                    </div>

                    <div className="bg-rd-dark border border-rd-gold/22 rounded p-6 shadow-[0_24px_60px_rgba(0,0,0,.3)]">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="text-[11px] tracking-[1.8px] font-bold text-rd-gold">PREVIA DO DIAGNOSTICO</div>
                                <div className="text-[13px] text-rd-cream/55 mt-1">Atualizada em tempo real</div>
                            </div>
                            <div className="w-12 h-12 border border-rd-gold/45 rounded flex items-center justify-center">
                                <div className="w-5 h-5 bg-rd-gold" style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />
                            </div>
                        </div>
                        <div className="border-y border-rd-gold/16 py-5">
                            <div className="text-[12px] text-rd-cream/50 mb-1">Patrimonio informado</div>
                            <div className="font-kanit font-bold text-[30px] sm:text-[36px] leading-none text-rd-gold break-words">{currency(patrimonioTotal)}</div>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center justify-between gap-4 mb-3">
                                <span className="text-[12px] font-semibold text-rd-cream/55">Perfil estimado</span>
                                <span className="text-[12px] text-rd-cream/40">{answeredCount}/{PROFILE_QUESTIONS.length} respostas</span>
                            </div>
                            <div className="bg-rd-primary/70 border border-rd-gold/16 rounded p-4">
                                <div className="font-kanit font-semibold text-[22px] text-rd-cream">{profile.label}</div>
                                <p className="text-[13px] leading-relaxed text-rd-cream/62 mt-2">{PROFILE_COPY[profile.label]}</p>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            {topAssets.length === 0 ? (
                                <div className="text-[13px] text-rd-cream/38 py-4 border border-rd-cream/10 rounded text-center">
                                    Os principais ativos aparecem aqui conforme o preenchimento.
                                </div>
                            ) : topAssets.map((asset) => {
                                const width = patrimonioTotal > 0 ? Math.max((asset.value / patrimonioTotal) * 100, 4) : 0;

                                return (
                                    <div key={asset.key}>
                                        <div className="flex justify-between gap-3 text-[12px] mb-1.5">
                                            <span className="text-rd-cream/70">{asset.label}</span>
                                            <span className="text-rd-gold font-semibold">{currency(asset.value)}</span>
                                        </div>
                                        <div className="h-2 bg-rd-primary rounded overflow-hidden">
                                            <div className="h-full bg-rd-gold" style={{ width: `${width}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="form-raiox" className="bg-rd-primary px-5 md:px-8 pb-24">
                <div className="max-w-[1240px] mx-auto">
                    {analysisResult ? (
                        <ResultPanel
                            result={analysisResult}
                            saved={analysisSaved}
                            saving={processing}
                            onEdit={() => {
                                setAnalysisResult(null);
                                setAnalysisSaved(false);
                                setTimeout(() => {
                                    document.getElementById('form-raiox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }, 50);
                            }}
                        />
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
                            <div className="flex flex-col gap-7">
                                <section className="bg-rd-dark border border-rd-gold/18 rounded p-5 md:p-7">
                                    <div className="mb-6">
                                        <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-2">1. CONTATO</div>
                                        <h2 className="font-kanit font-semibold text-[24px] text-rd-cream">Dados para retorno</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className={labelClass}>Nome *</label>
                                            <input
                                                type="text"
                                                value={data.nome}
                                                onChange={(e) => setData('nome', e.target.value)}
                                                className={inputClass}
                                                placeholder="Seu nome"
                                                required
                                            />
                                            {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>E-mail *</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className={inputClass}
                                                placeholder="seu@email.com"
                                                required
                                            />
                                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Telefone/WhatsApp *</label>
                                            <input
                                                type="tel"
                                                value={data.telefone}
                                                onChange={(e) => setData('telefone', e.target.value)}
                                                className={inputClass}
                                                placeholder="+55 (11) 00000-0000"
                                                required
                                            />
                                            {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone}</p>}
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-rd-dark border border-rd-gold/18 rounded p-5 md:p-7">
                                    <div className="mb-6">
                                        <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-2">2. PATRIMONIO</div>
                                        <h2 className="font-kanit font-semibold text-[24px] text-rd-cream">Separe seus ativos por tipo</h2>
                                        <p className="text-[14px] text-rd-cream/58 mt-2">Informe valores aproximados. Use zero ou deixe em branco quando nao houver valor naquele tipo.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {PATRIMONY_TYPES.map((item) => (
                                            <div key={item.key} className="bg-rd-primary/55 border border-rd-gold/12 rounded p-4">
                                                <label className={labelClass}>{item.label}</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    inputMode="decimal"
                                                    value={data.patrimonio[item.key]}
                                                    onChange={(e) => updatePatrimony(item.key, e.target.value)}
                                                    className={inputClass}
                                                    placeholder="R$ 0"
                                                />
                                                <p className="text-[11.5px] text-rd-cream/40 mt-2 leading-snug">{item.hint}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {(patrimonyError || errors.patrimonio) && (
                                        <p className="text-red-400 text-xs mt-4">{patrimonyError || errors.patrimonio}</p>
                                    )}
                                </section>

                                <section className="bg-rd-dark border border-rd-gold/18 rounded p-5 md:p-7">
                                    <div className="mb-6">
                                        <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-2">3. PERFIL DE INVESTIMENTO</div>
                                        <h2 className="font-kanit font-semibold text-[24px] text-rd-cream">Analise de tolerancia e horizonte</h2>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        {PROFILE_QUESTIONS.map((question, index) => (
                                            <div key={question.id} className="border-b border-rd-cream/8 last:border-b-0 pb-5 last:pb-0">
                                                <div className="text-[14px] font-semibold text-rd-cream mb-3">
                                                    {index + 1}. {question.question}
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                                    {question.options.map((option) => {
                                                        const active = profileAnswers[question.id]?.resposta === option.label;

                                                        return (
                                                            <button
                                                                type="button"
                                                                key={option.label}
                                                                onClick={() => updateProfile(question, option)}
                                                                className={`text-left min-h-[72px] px-3.5 py-3 rounded border text-[13px] font-medium transition-all cursor-pointer ${
                                                                    active
                                                                        ? 'bg-rd-gold text-rd-primary border-rd-gold'
                                                                        : 'bg-rd-primary/55 text-rd-cream/72 border-rd-gold/16 hover:border-rd-gold/45 hover:text-rd-cream'
                                                                }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {(profileError || errors.respostas_perfil) && (
                                        <p className="text-red-400 text-xs mt-4">{profileError || errors.respostas_perfil}</p>
                                    )}
                                </section>

                                <section className="bg-rd-dark border border-rd-gold/18 rounded p-5 md:p-7">
                                    <div className="mb-6">
                                        <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-2">4. OBJETIVO</div>
                                        <h2 className="font-kanit font-semibold text-[24px] text-rd-cream">Qual patrimonio voce quer construir?</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Objetivo patrimonial *</label>
                                            <select
                                                value={data.objetivo_patrimonial}
                                                onChange={(e) => setData('objetivo_patrimonial', e.target.value)}
                                                className={`${inputClass} cursor-pointer`}
                                                required
                                            >
                                                <option value="">Selecione...</option>
                                                {GOALS.map((goal) => (
                                                    <option key={goal} value={goal}>{goal}</option>
                                                ))}
                                            </select>
                                            {errors.objetivo_patrimonial && <p className="text-red-400 text-xs mt-1">{errors.objetivo_patrimonial}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Valor objetivo</label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                inputMode="decimal"
                                                value={data.valor_objetivo}
                                                onChange={(e) => setData('valor_objetivo', e.target.value)}
                                                className={inputClass}
                                                placeholder="R$ 0"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Prazo para o objetivo</label>
                                            <input
                                                type="text"
                                                value={data.prazo_objetivo}
                                                onChange={(e) => setData('prazo_objetivo', e.target.value)}
                                                className={inputClass}
                                                placeholder="Ex.: 10 anos"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Aporte mensal previsto</label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                inputMode="decimal"
                                                value={data.aporte_mensal}
                                                onChange={(e) => setData('aporte_mensal', e.target.value)}
                                                className={inputClass}
                                                placeholder="R$ 0"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Preferencia de contato</label>
                                            <select
                                                value={data.preferencia_contato}
                                                onChange={(e) => setData('preferencia_contato', e.target.value)}
                                                className={`${inputClass} cursor-pointer`}
                                            >
                                                <option value="">Selecione...</option>
                                                {CONTACT_PREFERENCES.map((preference) => (
                                                    <option key={preference} value={preference}>{preference}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Observacoes</label>
                                            <textarea
                                                value={data.observacoes}
                                                onChange={(e) => setData('observacoes', e.target.value)}
                                                rows={4}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Conte algo importante sobre sua situacao, restricoes ou prioridades."
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="bg-rd-teal/30 border border-rd-gold/22 rounded p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                    <div>
                                        <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-2">CONCLUIR RAIOX</div>
                                        <p className="text-[14px] text-rd-cream/70 leading-relaxed max-w-[520px]">
                                            Revise os dados principais e envie seu RaioX financeiro para a equipe preparar o contato.
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-rd-gold text-rd-primary font-bold text-[14.5px] py-4 px-6 sm:px-7 rounded-sm transition-all hover:bg-rd-gold-light disabled:opacity-60 cursor-pointer shrink-0"
                                    >
                                        {processing ? 'Gerando...' : 'Concluir e ver analise ->'}
                                    </button>
                                </div>
                            </div>

                            <aside className="lg:sticky lg:top-[130px] bg-rd-dark border border-rd-gold/22 rounded p-6">
                                <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-4">RESUMO</div>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <div className="text-[12px] text-rd-cream/50 mb-1">Patrimonio atual</div>
                                        <div className="font-kanit font-bold text-[28px] sm:text-[31px] text-rd-gold leading-none break-words">{currency(patrimonioTotal)}</div>
                                    </div>
                                    <div className="border-t border-rd-gold/14 pt-4">
                                        <div className="text-[12px] text-rd-cream/50 mb-1">Perfil estimado</div>
                                        <div className="font-kanit font-semibold text-[22px] text-rd-cream">{profile.label}</div>
                                        <p className="text-[12.5px] text-rd-cream/58 leading-relaxed mt-2">{PROFILE_COPY[profile.label]}</p>
                                    </div>
                                    <div className="border-t border-rd-gold/14 pt-4">
                                        <div className="text-[12px] text-rd-cream/50 mb-1">Objetivo</div>
                                        <div className="text-[14px] text-rd-cream font-semibold">{data.objetivo_patrimonial || 'Ainda nao informado'}</div>
                                        {Number(data.valor_objetivo || 0) > 0 && (
                                            <p className="text-[12.5px] text-rd-cream/58 mt-2">
                                                Falta aproximada: <span className="text-rd-gold font-semibold">{currency(missingGoal)}</span>
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-rd-gold text-rd-primary font-bold text-[14.5px] py-4 px-5 rounded-sm transition-all hover:bg-rd-gold-light disabled:opacity-60 cursor-pointer"
                                    >
                                        {processing ? 'Gerando...' : 'Concluir e ver analise →'}
                                    </button>
                                    <p className="text-[11.5px] text-rd-cream/38 leading-relaxed">
                                        As informacoes enviadas servem para contato consultivo futuro. A analise nao constitui recomendacao individual de investimento.
                                    </p>
                                </div>
                            </aside>
                        </form>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
