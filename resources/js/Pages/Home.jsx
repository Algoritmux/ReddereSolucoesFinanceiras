import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SOLUTIONS = [
    {
        id: 'consultoria',
        kicker: 'PERSONALIZAÇÃO',
        category: 'Investimentos',
        title: 'Consultoria de investimentos personalizada',
        desc: 'Construímos uma carteira alinhada ao seu perfil de risco, horizonte e objetivos. Nada de produto de prateleira.',
        short: 'Consultoria',
        image: '/images/Consultoria.png',
        icon: 'chart',
    },
    {
        id: 'planejamento',
        kicker: 'LONGO PRAZO',
        category: 'Planejamento',
        title: 'Planejamento financeiro e patrimonial',
        desc: 'Organizamos suas finanças com visão de futuro, conectando metas de curto, médio e longo prazo a um plano executável.',
        short: 'Planejamento',
        image: '/images/Planejamento.png',
        icon: 'map',
    },
    {
        id: 'sucessorio',
        kicker: 'SUCESSÃO',
        category: 'Proteção',
        title: 'Planejamento sucessório',
        desc: 'Estruturas que garantem a transmissão eficiente do patrimônio entre gerações, reduzindo custos, impostos e conflitos.',
        short: 'Sucessório',
        image: '/images/Sucessorio.png',
        icon: 'tree',
    },
    {
        id: 'seguro-vida',
        kicker: 'PROTEÇÃO',
        category: 'Seguros',
        title: 'Seguro de vida',
        desc: 'Proteção financeira para quem você ama. Garantimos liquidez imediata para a família e preservamos o patrimônio.',
        short: 'Seg. Vida',
        image: '/images/Seguro de vida.png',
        icon: 'heart',
    },
    {
        id: 'previdencia',
        kicker: 'APOSENTADORIA',
        category: 'Previdência',
        title: 'Previdência privada',
        desc: 'Planejamento de aposentadoria com os veículos certos, escolha tributária adequada e horizonte bem definido.',
        short: 'Previdência',
        image: '/images/Previdencia.png',
        icon: 'clock',
    },
    {
        id: 'renda',
        kicker: 'ALOCAÇÃO',
        category: 'Investimentos',
        title: 'Renda fixa e renda variável',
        desc: 'Equilíbrio entre a previsibilidade da renda fixa e o potencial da renda variável, com gestão de risco rigorosa.',
        short: 'Renda',
        image: '/images/Renda.png',
        icon: 'coins',
    },
    {
        id: 'seguro-social',
        kicker: 'PREVIDÊNCIA',
        category: 'Previdência',
        title: 'Seguro social e planejamento previdenciário',
        desc: 'Análise da sua situação junto ao INSS e estratégias para otimizar benefícios e o melhor momento de se aposentar.',
        short: 'Seg. Social',
        image: '/images/Seguro Social.png',
        icon: 'shield',
    },
];

const STATS = [
    { value: '+R$ 2bi', label: 'Patrimônio sob consultoria' },
    { value: '500+', label: 'Famílias atendidas' },
    { value: '15 anos', label: 'de experiência no mercado' },
    { value: '98%', label: 'Taxa de satisfação dos clientes' },
];

const HERO_STATS = [
    { value: '+R$ 2bi', label: 'Sob consultoria' },
    { value: '500+', label: 'Famílias atendidas' },
    { value: '98%', label: 'Satisfação' },
];

const TESTIMONIALS = [
    {
        quote: 'A Reddere transformou a forma como enxergo meu patrimônio. Pela primeira vez tenho um plano claro para os próximos 20 anos.',
        name: 'Marcelo Andrade',
        role: 'Empresário',
        initials: 'MA',
    },
    {
        quote: 'O planejamento sucessório que fizemos nos deu paz de espírito. Sabemos que nossa família está protegida independente do que aconteça.',
        name: 'Fernanda Costa',
        role: 'Médica',
        initials: 'FC',
    },
    {
        quote: 'Atendimento próximo e honesto. Nunca senti que estavam empurrando produto — o foco sempre foi no que era melhor para mim.',
        name: 'Ricardo Tavares',
        role: 'Engenheiro',
        initials: 'RT',
    },
];

const CERTS = [
    { sigla: 'CVM', nome: 'Comissão de Valores Mobiliários' },
    { sigla: 'ANBIMA', nome: 'Associação Brasileira das Entidades dos Mercados Financeiro e de Capitais' },
    { sigla: 'CFP®', nome: 'Certified Financial Planner' },
    { sigla: 'CPA-20', nome: 'Certificação Profissional ANBIMA' },
    { sigla: 'CEA', nome: 'Certificação de Especialista em Investimentos ANBIMA' },
    { sigla: 'CGA', nome: 'Certificação de Gestores ANBIMA' },
];

function GlyphIcon() {
    return (
        <div className="w-6 h-6 bg-rd-gold" style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />
    );
}

function SolutionIcon({ type }) {
    const iconProps = { className: 'w-5 h-5 text-rd-gold' };

    switch(type) {
        case 'chart':
            return (
                <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            );
        case 'map':
            return (
                <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6 3m-6-3v-13m6 3l5.447-2.724A1 1 0 0121 5.618v10.764a1 1 0 01-1.447.894L15 20m0-13v13" />
                </svg>
            );
        case 'tree':
            return (
                <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15h4v2h-4zm0-5h4v2h-4zm0-5h4v2h-4z" />
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={2} />
                </svg>
            );
        case 'heart':
            return (
                <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            );
        case 'clock':
            return (
                <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'coins':
            return (
                <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth={2} />
                    <path d="M12 6v6m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8" cy="16" r="2" fill="currentColor" />
                    <circle cx="16" cy="18" r="2" fill="currentColor" />
                </svg>
            );
        case 'shield':
            return (
                <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        default:
            return <GlyphIcon />;
    }
}

function articleImage(article) {
    if (!article?.cover_image) return null;
    return article.cover_image.startsWith('/') ? article.cover_image : `/storage/${article.cover_image}`;
}

function fmtArticleDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '');
}

function Simulator() {
    const [valorInicial, setValorInicial] = useState(50000);
    const [aporteMensal, setAporteMensal] = useState(2000);
    const [prazoAnos, setPrazo] = useState(10);
    const [taxa, setTaxa] = useState(10);

    const total = (() => {
        const r = taxa / 100 / 12;
        const n = prazoAnos * 12;
        const futureInitial = valorInicial * Math.pow(1 + r, n);
        const futureMonthly = aporteMensal * ((Math.pow(1 + r, n) - 1) / r);
        return futureInitial + futureMonthly;
    })();

    const investido = valorInicial + aporteMensal * prazoAnos * 12;
    const rendimento = total - investido;

    const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

    return (
        <section id="simulador" className="bg-rd-primary py-24 px-5 md:px-8 relative overflow-hidden">
            <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(185,150,115,.14),transparent_70%)] pointer-events-none" />
            <div className="max-w-[1080px] mx-auto relative">
                <div className="text-center mb-12">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">SIMULADOR</div>
                    <h2 className="font-kanit font-bold text-[clamp(30px,3.6vw,46px)] leading-tight text-rd-cream tracking-tight">
                        Projete o crescimento do seu capital
                    </h2>
                    <p className="text-rd-cream/70 mt-3 max-w-lg mx-auto">
                        Uma estimativa simples com juros compostos. Resultados ilustrativos — sua estratégia real é construída sob medida.
                    </p>
                </div>

                <div className="bg-rd-dark border border-rd-gold/22 rounded p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="flex flex-col gap-6">
                        {[
                            { label: 'Aporte inicial', value: valorInicial, fmt: fmt(valorInicial), min: 0, max: 2000000, step: 5000, setter: setValorInicial },
                            { label: 'Aporte mensal', value: aporteMensal, fmt: fmt(aporteMensal), min: 0, max: 50000, step: 500, setter: setAporteMensal },
                        ].map(({ label, value, fmt: fmtVal, min, max, step, setter }) => (
                            <div key={label}>
                                <label className="flex justify-between text-[13.5px] font-semibold text-rd-cream/85 mb-2">
                                    {label}<span className="text-rd-gold">{fmtVal}</span>
                                </label>
                                <input
                                    type="range" min={min} max={max} step={step} value={value}
                                    onChange={(e) => setter(Number(e.target.value))}
                                    className="w-full accent-[#B99673] cursor-pointer"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="flex justify-between text-[13.5px] font-semibold text-rd-cream/85 mb-2">
                                Prazo<span className="text-rd-gold">{prazoAnos} anos</span>
                            </label>
                            <input type="range" min={1} max={30} step={1} value={prazoAnos}
                                onChange={(e) => setPrazo(Number(e.target.value))}
                                className="w-full accent-[#B99673] cursor-pointer" />
                        </div>
                        <div>
                            <label className="flex justify-between text-[13.5px] font-semibold text-rd-cream/85 mb-2">
                                Rentabilidade estimada<span className="text-rd-gold">{taxa}% a.a.</span>
                            </label>
                            <input type="range" min={2} max={20} step={0.5} value={taxa}
                                onChange={(e) => setTaxa(Number(e.target.value))}
                                className="w-full accent-[#B99673] cursor-pointer" />
                        </div>
                    </div>

                    <div className="text-center md:border-l border-rd-gold/20 md:pl-12">
                        <div className="text-[13px] tracking-[1.5px] text-rd-cream/60 font-semibold">PATRIMÔNIO PROJETADO</div>
                        <div className="font-kanit font-bold text-[clamp(34px,4.4vw,52px)] text-rd-gold leading-tight my-4 animate-rd-fade">
                            {fmt(total)}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-around gap-4 mt-7 pt-6 border-t border-rd-cream/12">
                            <div>
                                <div className="text-xs text-rd-cream/60 mb-1">Total investido</div>
                                <div className="font-kanit font-semibold text-xl text-rd-cream">{fmt(investido)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-rd-cream/60 mb-1">Rendimento</div>
                                <div className="font-kanit font-semibold text-xl text-rd-cream">{fmt(rendimento)}</div>
                            </div>
                        </div>
                        <Link
                            href="/contato"
                            className="inline-block mt-7 bg-rd-gold text-rd-primary font-bold text-[14.5px] px-6 py-3 rounded-sm transition-all hover:bg-rd-gold-light"
                        >
                            Conversar com um especialista
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home({ articles = [] }) {
    const [featuredIdx, setFeaturedIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setFeaturedIdx((i) => (i + 1) % SOLUTIONS.length), 4000);
        return () => clearInterval(t);
    }, []);

    const featured = SOLUTIONS[featuredIdx];

    return (
        <MainLayout>
            <Head title="Soluções Financeiras Completas" />

            {/* HERO */}
            <section className="relative pt-[150px] pb-[70px] px-5 md:px-8 bg-rd-primary overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="absolute top-[-200px] right-[-120px] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(15,85,100,.5),transparent_68%)] pointer-events-none" />

                <div className="max-w-[1240px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2.5 border border-rd-gold/45 px-4 py-2 rounded-sm mb-7 animate-rd-fade">
                            <span className="w-1.5 h-1.5 bg-rd-gold rounded-full" />
                            <span className="text-xs tracking-[3px] font-bold text-rd-gold">VENCER COM LEALDADE</span>
                        </div>
                        <h1 className="font-kanit font-bold text-[clamp(36px,5vw,64px)] leading-[1.03] tracking-tight text-rd-cream animate-rd-rise">
                            Toda a sua vida financeira,{' '}
                            <span className="text-rd-gold">protegida e em movimento</span>.
                        </h1>
                        <p className="text-[clamp(16px,1.6vw,19px)] leading-relaxed text-rd-cream/78 mt-6 max-w-[540px]" style={{ animationDelay: '.2s' }}>
                            De investimentos a sucessão, seguros e previdência: uma carteira completa de soluções conduzida com estratégia, disciplina e lealdade ao seu interesse.
                        </p>
                        <div className="flex flex-wrap gap-3.5 mt-9">
                            <Link
                                href="/contato"
                                className="inline-flex items-center gap-2.5 bg-rd-gold text-rd-primary font-bold text-[15.5px] px-7 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                            >
                                Agende uma conversa <span className="text-lg">→</span>
                            </Link>
                            <Link
                                href="/consultor"
                                className="inline-flex items-center gap-2.5 bg-transparent text-rd-cream font-semibold text-[15.5px] px-7 py-4 border border-rd-cream/32 rounded-sm transition-all hover:border-rd-gold hover:text-rd-gold"
                            >
                                <span className="w-2 h-2 rounded-full bg-rd-green shadow-[0_0_8px_#5fb98c]" />
                                Descubra o que você precisa!
                            </Link>
                        </div>
                        <div className="flex gap-6 sm:gap-8 mt-10 flex-wrap">
                            {HERO_STATS.map((s) => (
                                <div key={s.label}>
                                    <div className="font-kanit font-bold text-2xl text-rd-gold leading-none">{s.value}</div>
                                    <div className="text-[12.5px] text-rd-cream/62 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SHOWCASE */}
                    <div className="relative max-w-[460px] w-full mx-auto animate-rd-fade">
                        <div className="absolute -top-6 -right-6 w-[150px] h-[150px] border border-dashed border-rd-gold/30 rounded-full animate-rd-spin pointer-events-none" />
                        <div className="relative bg-gradient-to-br from-[rgba(15,85,100,.55)] to-[rgba(10,38,50,.85)] border border-rd-gold/28 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-[0_30px_70px_rgba(0,0,0,.4)] overflow-hidden">
                            <div className="flex justify-between items-center mb-5 relative z-10">
                                <span className="text-[11px] tracking-[2px] font-bold text-rd-gold">CARTEIRA DE SOLUÇÕES</span>
                                <span className="text-xs font-mono text-rd-cream/55">{featuredIdx + 1}/{SOLUTIONS.length}</span>
                            </div>
                            <div
                                className="relative bg-cover bg-center border border-rd-gold/25 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between min-h-[360px] sm:h-[420px] p-5 sm:p-7"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, rgba(15, 85, 100, 0.65) 0%, rgba(10, 38, 50, 0.75) 100%), url('${featured.image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center right',
                                }}
                                key={featured.id}
                            >
                                {/* Header do card */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 border-[1.5px] border-rd-gold flex items-center justify-center shrink-0 rounded bg-rd-primary/60 backdrop-blur-sm">
                                            <GlyphIcon />
                                        </div>
                                        <div>
                                            <div className="text-[10.5px] tracking-[1.5px] font-bold text-rd-gold">{featured.kicker}</div>
                                            <div className="text-xs text-rd-cream/70 mt-0.5">{featured.category}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Conteúdo principal - posicionado no final */}
                                <div className="relative z-10 flex flex-col gap-3">
                                    <h3 className="font-kanit font-semibold text-[20px] leading-snug text-rd-cream">{featured.title}</h3>
                                    <p className="text-sm leading-relaxed text-rd-cream/85 line-clamp-2">{featured.desc}</p>
                                    <Link href="/solucoes" className="inline-flex items-center gap-1.5 font-semibold text-rd-gold text-[13.5px] hover:text-rd-gold-light transition-colors mt-auto">
                                        Conhecer solução →
                                    </Link>
                                </div>
                            </div>

                            {/* Botões de navegação */}
                            <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                                {SOLUTIONS.map((s, i) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setFeaturedIdx(i)}
                                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                                            i === featuredIdx
                                                ? 'bg-rd-gold text-rd-primary border-rd-gold'
                                                : 'bg-transparent text-rd-cream/60 border-rd-gold/25 hover:border-rd-gold/50'
                                        }`}
                                    >
                                        {s.short}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NÚMEROS */}
            <section className="bg-rd-teal">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <div key={i} className="px-5 md:px-8 py-9 sm:py-11 border-b sm:border-b-0 sm:border-r border-rd-cream/10 last:border-b-0 last:border-r-0 text-center">
                            <div className="font-kanit font-bold text-[clamp(30px,3.4vw,44px)] text-rd-gold leading-none">{s.value}</div>
                            <div className="text-[13.5px] text-rd-cream/82 mt-2 tracking-[.3px]">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOBRE */}
            <section id="sobre" className="bg-rd-warm text-[#2a2620] py-24 px-5 md:px-8">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[70px] items-center">
                    <div>
                        <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">SOBRE A REDDERE</div>
                        <h2 className="font-kanit font-bold text-[clamp(30px,3.6vw,46px)] leading-tight text-rd-primary tracking-tight">
                            Vencer com Lealdade não é só um lema. É o nosso método.
                        </h2>
                        <p className="text-[16.5px] leading-relaxed text-[#5b5346] mt-6">
                            A Reddere nasceu da convicção de que soluções financeiras de qualidade são, antes de tudo, uma relação de confiança de longo prazo. Vencer, para nós, é fazer o seu patrimônio prosperar; e lealdade é colocar o seu interesse acima de tudo, sempre.
                        </p>
                        <p className="text-[16.5px] leading-relaxed text-[#5b5346] mt-4">
                            Transformamos objetivos em uma estratégia clara e executável — com independência para recomendar o que faz sentido, pragmatismo na execução e solidez em cada decisão.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-7">
                            {['Lealdade', 'Disciplina', 'Proteção de capital', 'Visão de longo prazo'].map((tag) => (
                                <span key={tag} className="text-[13px] font-semibold text-rd-primary bg-rd-gold/18 px-4 py-2 rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        className="relative aspect-[4/5] bg-rd-primary rounded overflow-hidden flex items-center justify-center bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.35) 100%), url('/images/Lealdade.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-grid-gold-sm opacity-30" />
                    </div>
                </div>
            </section>

            {/* SOLUÇÕES PREVIEW */}
            <section className="bg-rd-primary py-24 px-5 md:px-8 relative">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none opacity-70" />
                <div className="max-w-[1240px] mx-auto relative">
                    <div className="flex justify-between items-end flex-wrap gap-5 mb-12">
                        <div>
                            <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">SOLUÇÕES</div>
                            <h2 className="font-kanit font-bold text-[clamp(30px,3.6vw,46px)] leading-tight text-rd-cream tracking-tight max-w-[560px]">
                                Tudo o que seu patrimônio precisa, em um só lugar
                            </h2>
                        </div>
                        <Link href="/solucoes" className="font-semibold text-rd-gold text-[15px] whitespace-nowrap hover:text-rd-gold-light">
                            Ver todas as soluções →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
                        {SOLUTIONS.slice(0, 6).map((sol) => (
                            <div
                                key={sol.id}
                                className="bg-[rgba(15,85,100,.35)] border border-rd-gold/18 p-6 md:p-8 rounded transition-all duration-200 hover:border-rd-gold hover:bg-[rgba(15,85,100,.6)] hover:-translate-y-1"
                            >
                                <div className="w-11 h-11 border-[1.5px] border-rd-gold flex items-center justify-center mb-5">
                                    <SolutionIcon type={sol.icon} />
                                </div>
                                <h3 className="font-kanit font-semibold text-[19px] text-rd-cream leading-snug">{sol.title}</h3>
                                <p className="text-[14.5px] leading-relaxed text-rd-cream/66 mt-3">{sol.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONSULTOR CTA */}
            <section className="bg-rd-teal py-20 px-5 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(185,150,115,.06)_0_1px,transparent_1px_24px)] pointer-events-none" />
                <div className="max-w-[1080px] mx-auto relative flex flex-col items-center text-center gap-6">
                    <div className="inline-flex items-center gap-2 border border-rd-gold/40 px-4 py-[7px] rounded-sm">
                        <span className="w-1.5 h-1.5 bg-rd-green rounded-full shadow-[0_0_8px_#5fb98c]" />
                        <span className="text-xs tracking-[2px] font-semibold text-rd-gold">CONSULTOR ON-LINE</span>
                    </div>
                    <h2 className="font-kanit font-bold text-[clamp(28px,3.6vw,44px)] leading-tight text-rd-cream tracking-tight max-w-[680px]">
                        Não sabe do que precisa? Converse e descubra em minutos.
                    </h2>
                    <p className="text-[17px] text-rd-cream/80 max-w-[560px]">
                        Nosso consultor virtual faz as perguntas certas e indica quais soluções da Reddere combinam com o seu momento — sem compromisso.
                    </p>
                    <Link
                        href="/consultor"
                        className="inline-flex items-center gap-2.5 bg-rd-gold text-rd-primary font-bold text-[16px] px-5 md:px-8 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                    >
                        Descubra o que você precisa! <span className="text-lg">→</span>
                    </Link>
                </div>
            </section>

            {/* SIMULADOR */}
            <Simulator />

            {/* INSIGHTS */}
            <section id="insights" className="bg-rd-warm text-[#2a2620] py-24 px-5 md:px-8">
                <div className="max-w-[1240px] mx-auto">
                    <div className="flex justify-between items-end flex-wrap gap-5 mb-12">
                        <div>
                            <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">CONTEÚDO & INSIGHTS</div>
                            <h2 className="font-kanit font-bold text-[clamp(30px,3.6vw,46px)] leading-tight text-rd-primary tracking-tight">
                                Análises para decidir com clareza
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/artigos/${article.slug}`}
                                className="bg-white border border-[rgba(125,110,93,.18)] rounded overflow-hidden block transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,50,65,.13)]"
                            >
                                <div className="aspect-video bg-rd-primary relative flex items-center justify-center">
                                    {articleImage(article) ? (
                                        <img
                                            src={articleImage(article)}
                                            alt={article.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-grid-gold-sm" />
                                            <span className="relative font-mono text-[11px] text-rd-gold/65">[ imagem ]</span>
                                        </>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-2.5 items-center text-xs text-rd-gold font-semibold mb-3">
                                        {article.category && <span>{article.category}</span>}
                                        {article.category && article.published_at && <span className="text-[#bdb3a5]">·</span>}
                                        {article.published_at && <span className="text-rd-brown">{fmtArticleDate(article.published_at)}</span>}
                                    </div>
                                    <h3 className="font-kanit font-semibold text-[19px] text-rd-primary leading-snug">{article.title}</h3>
                                    <p className="text-sm leading-relaxed text-rd-brown mt-2.5">{article.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {articles.length === 0 && (
                        <div className="text-center py-14 text-rd-brown/70 text-[15px]">
                            Em breve, novos artigos por aqui.
                        </div>
                    )}
                </div>
            </section>

            {/* DEPOIMENTOS */}
            <section className="bg-rd-primary py-24 px-5 md:px-8">
                <div className="max-w-[1240px] mx-auto">
                    <div className="text-center mb-14">
                        <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">QUEM CONFIA NA REDDERE</div>
                        <h2 className="font-kanit font-bold text-[clamp(30px,3.6vw,46px)] leading-tight text-rd-cream tracking-tight">
                            Relações construídas para durar
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="bg-[rgba(15,85,100,.3)] border border-rd-gold/16 rounded p-6 md:p-8">
                                <div className="font-kanit text-[46px] text-rd-gold leading-[.6] h-6">"</div>
                                <p className="text-[16px] leading-relaxed text-rd-cream/88 mt-2">{t.quote}</p>
                                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-rd-cream/10">
                                    <div className="w-[42px] h-[42px] rounded-full bg-rd-teal flex items-center justify-center font-kanit font-bold text-rd-gold text-[16px]">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[14.5px] text-rd-cream">{t.name}</div>
                                        <div className="text-[12.5px] text-rd-cream/60">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="bg-rd-teal py-[90px] px-5 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[780px] mx-auto text-center relative">
                    <h2 className="font-kanit font-bold text-[clamp(30px,4vw,50px)] leading-[1.08] text-rd-cream tracking-tight">
                        Pronto para vencer com lealdade ao seu lado?
                    </h2>
                    <p className="text-[17px] text-rd-cream/78 mt-4">
                        Converse com um de nossos especialistas. A primeira conversa é sem compromisso.
                    </p>
                    <Link
                        href="/contato"
                        className="inline-flex items-center gap-2.5 mt-8 bg-rd-gold text-rd-primary font-bold text-[16px] px-9 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                    >
                        Fale com um especialista <span className="text-lg">→</span>
                    </Link>
                </div>
            </section>

            {/* CERTIFICAÇÕES */}
            <section className="bg-rd-dark py-16 px-5 md:px-8 border-t border-rd-gold/16">
                <div className="max-w-[1240px] mx-auto text-center">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">CERTIFICAÇÕES & CONFORMIDADE</div>
                    <h2 className="font-kanit font-bold text-[clamp(24px,2.8vw,34px)] leading-tight text-rd-cream tracking-tight max-w-[640px] mx-auto">
                        Atuação regulada e equipe certificada
                    </h2>
                    <p className="text-[15px] text-rd-cream/65 mt-3 max-w-[560px] mx-auto">
                        Operamos em conformidade com as normas do mercado e contamos com profissionais certificados pelas principais entidades do setor.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3.5 mt-8">
                        {CERTS.map((c) => (
                            <div
                                key={c.sigla}
                                className="flex flex-col items-center gap-1.5 min-w-[120px] px-5 py-5 border border-rd-gold/22 rounded bg-[rgba(15,85,100,.18)] hover:border-rd-gold transition-colors"
                            >
                                <span className="font-kanit font-bold text-xl text-rd-cream tracking-[.5px]">{c.sigla}</span>
                                <span className="text-[11px] text-rd-cream/55 text-center leading-snug">{c.nome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
