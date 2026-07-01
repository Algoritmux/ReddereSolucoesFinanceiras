import { useState, useRef, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

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
                className={`max-w-[88%] sm:max-w-[75%] break-words px-4 py-3 rounded-xl text-sm leading-relaxed animate-rd-pop ${
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

function AiChatWindow({ configured }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: configured
                ? 'Olá! Sou o Consultor IA da Reddere. Conte seu objetivo financeiro, patrimônio aproximado, prazo e principais dúvidas para eu orientar os próximos passos.'
                : 'Olá! O Consultor IA ainda precisa de uma chave configurada no painel administrativo para responder com inteligência artificial.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async (event) => {
        event.preventDefault();

        const text = input.trim();
        if (!text || isTyping) return;

        const nextMessages = [...messages, { role: 'user', text }];
        setMessages(nextMessages);
        setInput('');
        setError('');
        setIsTyping(true);

        try {
            const response = await fetch('/consultor/ia/responder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify({ messages: nextMessages }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message || 'Não foi possível gerar a resposta da IA. Confira a chave configurada no painel administrativo.');
            }

            setMessages((current) => [...current, { role: 'assistant', text: payload.reply }]);
        } catch (err) {
            setError(err.message || 'Não foi possível gerar a resposta da IA.');
            setMessages((current) => current.slice(0, -1));
            setInput(text);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="bg-rd-dark border border-rd-gold/22 rounded-xl overflow-hidden flex flex-col shadow-[0_24px_60px_rgba(0,0,0,.35)]" style={{ height: 'min(620px, calc(100vh - 170px))', minHeight: 430 }}>
            <div className="flex items-center gap-3.5 px-4 sm:px-5 py-4 border-b border-rd-gold/16 bg-rd-primary shrink-0">
                <div className="w-[42px] h-[42px] rounded-full bg-rd-teal border border-rd-gold/40 flex items-center justify-center font-kanit font-bold text-rd-gold text-[17px]">
                    R
                </div>
                <div>
                    <div className="font-semibold text-[14.5px] text-rd-cream">Consultor IA Reddere</div>
                    <div className="flex items-center gap-1.5 text-xs text-rd-cream/55">
                        <span className={`w-1.5 h-1.5 rounded-full ${configured ? 'bg-rd-green' : 'bg-rd-gold'}`} />
                        {configured ? 'IA conectada à base de conhecimento' : 'Aguardando configuração da IA'}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
                {messages.map((msg, i) => (
                    <Message key={i} role={msg.role === 'assistant' ? 'bot' : 'user'} text={msg.text} />
                ))}
                {isTyping && <Message role="bot" isTyping />}
                <div ref={bottomRef} />
            </div>

            {error && (
                <div className="mx-4 mb-3 bg-red-500/10 border border-red-400/30 text-red-200 text-[12.5px] px-3 py-2 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={sendMessage} className="border-t border-rd-gold/16 p-4 bg-rd-primary/60 shrink-0">
                <div className="flex flex-col sm:flex-row gap-2.5">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={2}
                        className="flex-1 min-w-0 bg-rd-dark border border-rd-gold/25 text-rd-cream text-[14px] px-3.5 py-3 rounded-lg resize-none focus:outline-none focus:border-rd-gold transition-colors"
                        placeholder="Ex.: Tenho R$ 300 mil, quero aposentadoria em 15 anos e aceito risco moderado..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isTyping || !input.trim()}
                        className="w-full sm:w-auto bg-rd-gold text-rd-primary font-bold text-[14px] px-5 py-3 sm:py-0 rounded-lg transition-all hover:bg-rd-gold-light disabled:opacity-50 cursor-pointer"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Consultor() {
    const { aiEnabled = false } = usePage().props;

    return (
        <MainLayout>
            <Head title="Consultor On-line" />

            <section className="relative pt-[112px] sm:pt-[120px] pb-16 px-5 md:px-6 overflow-hidden min-h-screen">
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

                    <AiChatWindow configured={aiEnabled} />

                    <p className="text-center text-xs text-rd-cream/35 mt-4">
                        As orientações fornecidas pelo consultor virtual são de caráter informativo e não constituem recomendação de investimento.
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
