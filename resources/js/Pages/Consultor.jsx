import { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SOLUTIONS_MAP = {
    consultoria: 'Consultoria de investimentos personalizada',
    planejamento: 'Planejamento financeiro e patrimonial',
    sucessorio: 'Planejamento sucessório',
    'seguro-vida': 'Seguro de vida',
    'seguro-social': 'Seguro social e planejamento previdenciário',
    previdencia: 'Previdência privada',
    renda: 'Renda fixa e renda variável',
    internacional: 'Câmbio e investimentos internacionais',
};

const FLOW = [
    {
        id: 'welcome',
        text: 'Olá! Sou o consultor virtual da Reddere. Vou te ajudar a descobrir quais soluções fazem sentido para o seu momento financeiro. Pronto para começar?',
        options: [{ label: 'Vamos lá!', next: 'objetivo' }],
    },
    {
        id: 'objetivo',
        text: 'Qual é o seu principal objetivo financeiro agora?',
        options: [
            { label: 'Fazer meu dinheiro crescer', next: 'patrimonio', tags: ['consultoria', 'renda'] },
            { label: 'Me proteger e proteger minha família', next: 'patrimonio', tags: ['seguro-vida', 'seguros'] },
            { label: 'Planejar minha aposentadoria', next: 'patrimonio', tags: ['previdencia', 'seguro-social'] },
            { label: 'Organizar e transferir meu patrimônio', next: 'patrimonio', tags: ['planejamento', 'sucessorio'] },
        ],
    },
    {
        id: 'patrimonio',
        text: 'Qual é aproximadamente o seu patrimônio financeiro atual?',
        options: [
            { label: 'Até R$ 100 mil', next: 'horizonte' },
            { label: 'Entre R$ 100 mil e R$ 500 mil', next: 'horizonte' },
            { label: 'Entre R$ 500 mil e R$ 2 milhões', next: 'horizonte' },
            { label: 'Acima de R$ 2 milhões', next: 'horizonte', tags: ['sucessorio', 'internacional'] },
        ],
    },
    {
        id: 'horizonte',
        text: 'Em quanto tempo você precisa usar esse dinheiro?',
        options: [
            { label: 'Em menos de 2 anos', next: 'perfil', tags: ['renda'] },
            { label: 'Entre 2 e 5 anos', next: 'perfil' },
            { label: 'Entre 5 e 15 anos', next: 'perfil', tags: ['previdencia'] },
            { label: 'Mais de 15 anos', next: 'perfil', tags: ['previdencia', 'sucessorio'] },
        ],
    },
    {
        id: 'perfil',
        text: 'Como você reage quando seus investimentos caem momentaneamente?',
        options: [
            { label: 'Fico preocupado e prefiro segurança', next: 'result', tags: ['renda'] },
            { label: 'Aceito pequenas variações', next: 'result' },
            { label: 'Entendo os ciclos e mantenho a estratégia', next: 'result', tags: ['consultoria'] },
            { label: 'Aproveito para investir mais', next: 'result', tags: ['consultoria', 'internacional'] },
        ],
    },
];

function TypingDots() {
    return (
        <div className="flex gap-1 items-center h-5">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-2 h-2 bg-rd-gold rounded-full animate-rd-blink"
                    style={{ animationDelay: `${i * 0.16}s` }}
                />
            ))}
        </div>
    );
}

function Message({ role, text, isTyping }) {
    const isBot = role === 'bot';
    return (
        <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
            {isBot && (
                <div className="w-9 h-9 shrink-0 rounded-full bg-rd-teal border border-rd-gold/40 flex items-center justify-center font-kanit font-bold text-rd-gold text-base">
                    R
                </div>
            )}
            <div
                className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed animate-rd-pop ${
                    isBot
                        ? 'bg-rd-primary border border-rd-gold/20 text-rd-cream rounded-tl-sm'
                        : 'bg-rd-gold text-rd-primary font-semibold rounded-tr-sm'
                }`}
            >
                {isTyping ? <TypingDots /> : text}
            </div>
        </div>
    );
}

function ResultPanel({ tags }) {
    const unique = [...new Set(tags)];
    const recommended = unique.slice(0, 3);

    return (
        <div className="flex flex-col gap-4 animate-rd-pop">
            <div className="bg-rd-primary border border-rd-gold/25 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-rd-green rounded-full shadow-[0_0_8px_#5fb98c]" />
                    <span className="text-xs tracking-[1.5px] font-bold text-rd-gold">SOLUÇÕES RECOMENDADAS PARA VOCÊ</span>
                </div>
                <div className="flex flex-col gap-2.5">
                    {recommended.map((id) => (
                        <div key={id} className="flex items-center gap-3 p-3 bg-rd-teal/20 border border-rd-gold/15 rounded-lg">
                            <div className="w-2 h-2 bg-rd-gold rounded-full shrink-0" />
                            <span className="text-[14px] text-rd-cream font-medium">{SOLUTIONS_MAP[id] || id}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-rd-gold/15 flex flex-col gap-2.5">
                    <Link
                        href="/contato"
                        className="w-full text-center bg-rd-gold text-rd-primary font-bold text-[14px] py-3 rounded-lg transition-all hover:bg-rd-gold-light"
                    >
                        Falar com um especialista →
                    </Link>
                    <Link
                        href="/solucoes"
                        className="w-full text-center bg-transparent text-rd-cream/70 font-medium text-[13px] py-2.5 rounded-lg border border-rd-cream/20 transition-all hover:border-rd-gold hover:text-rd-gold"
                    >
                        Ver todas as soluções
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Consultor() {
    const [messages, setMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [collectedTags, setCollectedTags] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [started, setStarted] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const addBotMessage = (text, delay = 800) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages((m) => [...m, { role: 'bot', text }]);
        }, delay);
    };

    const startChat = () => {
        setStarted(true);
        addBotMessage(FLOW[0].text, 600);
    };

    const handleOption = (option) => {
        setMessages((m) => [...m, { role: 'user', text: option.label }]);
        const newTags = [...collectedTags, ...(option.tags || [])];
        setCollectedTags(newTags);

        const nextStep = FLOW.findIndex((s) => s.id === option.next);
        if (nextStep === -1 || option.next === 'result') {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages((m) => [...m, { role: 'bot', text: 'Ótimo! Com base no que você me contou, identifiquei as soluções mais adequadas para o seu perfil:' }]);
                setTimeout(() => setShowResult(true), 300);
            }, 900);
        } else {
            setCurrentStep(nextStep);
            addBotMessage(FLOW[nextStep].text);
        }
    };

    const currentFlow = FLOW[currentStep];

    return (
        <MainLayout>
            <Head title="Consultor On-line" />

            <section className="relative pt-[120px] pb-16 px-6 overflow-hidden min-h-screen">
                <div className="absolute inset-0 bg-grid-gold opacity-50 pointer-events-none" />

                <div className="max-w-[860px] mx-auto relative">
                    <div className="text-center mb-7">
                        <div className="inline-flex items-center gap-2 border border-rd-gold/40 px-4 py-[7px] rounded-sm mb-5">
                            <span className="w-1.5 h-1.5 bg-rd-green rounded-full shadow-[0_0_8px_#5fb98c]" />
                            <span className="text-xs tracking-[2px] font-semibold text-rd-gold">CONSULTOR ON-LINE · DISPONÍVEL AGORA</span>
                        </div>
                        <h1 className="font-kanit font-bold text-[clamp(28px,4vw,46px)] leading-tight tracking-tight animate-rd-rise">
                            Não sabe por onde começar? Descubra conversando.
                        </h1>
                        <p className="text-[16px] leading-relaxed text-rd-cream/72 mt-3.5 max-w-[560px] mx-auto">
                            Responda algumas perguntas e receba uma orientação sobre quais soluções da Reddere fazem sentido para o seu momento.
                        </p>
                    </div>

                    {/* JANELA DE CHAT */}
                    <div className="bg-rd-dark border border-rd-gold/22 rounded-xl overflow-hidden flex flex-col shadow-[0_24px_60px_rgba(0,0,0,.35)]" style={{ height: 560 }}>
                        {/* HEADER */}
                        <div className="flex items-center gap-3.5 px-5 py-4 border-b border-rd-gold/16 bg-rd-primary shrink-0">
                            <div className="w-[42px] h-[42px] rounded-full bg-rd-teal border border-rd-gold/40 flex items-center justify-center font-kanit font-bold text-rd-gold text-[17px]">
                                R
                            </div>
                            <div>
                                <div className="font-semibold text-[14.5px] text-rd-cream">Consultor Reddere</div>
                                <div className="flex items-center gap-1.5 text-xs text-rd-cream/55">
                                    <span className="w-1.5 h-1.5 bg-rd-green rounded-full" />
                                    Online agora
                                </div>
                            </div>
                        </div>

                        {/* MENSAGENS */}
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                            {!started ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4">
                                    <div className="w-16 h-16 rounded-full bg-rd-teal/40 border border-rd-gold/30 flex items-center justify-center">
                                        <div className="w-6 h-6 bg-rd-gold" style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />
                                    </div>
                                    <div>
                                        <div className="font-kanit font-semibold text-xl text-rd-cream mb-2">Consultor Virtual Reddere</div>
                                        <p className="text-sm text-rd-cream/60 max-w-[320px]">
                                            Responda algumas perguntas e descubra quais soluções combinam com o seu perfil.
                                        </p>
                                    </div>
                                    <button
                                        onClick={startChat}
                                        className="bg-rd-gold text-rd-primary font-bold text-[14px] px-7 py-3 rounded-lg transition-all hover:bg-rd-gold-light cursor-pointer"
                                    >
                                        Iniciar conversa →
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, i) => (
                                        <Message key={i} role={msg.role} text={msg.text} />
                                    ))}
                                    {isTyping && <Message role="bot" isTyping />}
                                    {showResult && <ResultPanel tags={collectedTags.length ? collectedTags : ['consultoria', 'planejamento']} />}
                                    <div ref={bottomRef} />
                                </>
                            )}
                        </div>

                        {/* OPÇÕES */}
                        {started && !showResult && !isTyping && messages.length > 0 && (
                            <div className="border-t border-rd-gold/16 px-4 py-4 bg-rd-primary/60 shrink-0">
                                <div className="flex flex-wrap gap-2">
                                    {currentFlow?.options?.map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => handleOption(opt)}
                                            className="text-[13px] font-medium text-rd-cream bg-rd-teal/30 border border-rd-gold/25 px-3.5 py-2 rounded-lg transition-all hover:border-rd-gold hover:bg-rd-teal/50 cursor-pointer"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-center text-xs text-rd-cream/35 mt-4">
                        As orientações fornecidas pelo consultor virtual são de caráter informativo e não constituem recomendação de investimento.
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
