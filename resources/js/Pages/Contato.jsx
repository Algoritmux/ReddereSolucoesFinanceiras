import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SUBJECTS = [
    'Consultoria de investimentos',
    'Planejamento financeiro',
    'Planejamento sucessório',
    'Seguro de vida',
    'Previdência privada',
    'Câmbio e internacional',
    'Outro assunto',
];

const CONTACT_ITEMS = [
    { label: 'E-mail', value: 'contato@reddere.com.br' },
    { label: 'Telefone', value: '+55 (11) 9000-0000' },
    { label: 'WhatsApp', value: '+55 (11) 9000-0000' },
    { label: 'Endereço', value: 'Av. Paulista, 1000 — Bela Vista, São Paulo, SP' },
    { label: 'Horário', value: 'Seg–Sex, 9h–18h' },
];

export default function Contato() {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contato', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const inputClass = 'w-full bg-rd-primary border border-rd-gold/25 text-rd-cream text-[14.5px] px-4 py-3 rounded focus:outline-none focus:border-rd-gold transition-colors';

    return (
        <MainLayout>
            <Head title="Contato" />

            {/* HERO */}
            <section className="relative pt-[160px] pb-16 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[1240px] mx-auto relative">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">CONTATO</div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,56px)] leading-tight tracking-tight max-w-[700px] animate-rd-rise">
                        A primeira conversa é sem compromisso.
                    </h1>
                    <p className="text-[18px] leading-relaxed text-rd-cream/75 mt-5 max-w-[540px]">
                        Entendemos o seu cenário e mostramos, com honestidade, o que faz sentido para você.
                    </p>
                </div>
            </section>

            {/* CONTEÚDO */}
            <section className="bg-rd-primary px-5 md:px-8 pb-24">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

                    {/* FORMULÁRIO */}
                    <div>
                        {submitted ? (
                            <div className="bg-rd-teal/30 border border-rd-green/40 rounded p-6 md:p-8 text-center animate-rd-pop">
                                <div className="w-12 h-12 bg-rd-green/20 border border-rd-green/40 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-rd-green text-xl font-bold">✓</span>
                                </div>
                                <h3 className="font-kanit font-bold text-xl text-rd-cream mb-2">Mensagem enviada!</h3>
                                <p className="text-rd-cream/70 text-[15px]">
                                    Nossa equipe entrará em contato em até 1 dia útil.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-rd-gold text-sm font-semibold hover:text-rd-gold-light transition-colors"
                                >
                                    Enviar outra mensagem →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[12.5px] font-semibold text-rd-cream/75 mb-2">Nome *</label>
                                        <input
                                            type="text"
                                            value={data.nome}
                                            onChange={(e) => setData('nome', e.target.value)}
                                            placeholder="Seu nome completo"
                                            className={inputClass}
                                            required
                                        />
                                        {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[12.5px] font-semibold text-rd-cream/75 mb-2">E-mail *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="seu@email.com"
                                            className={inputClass}
                                            required
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[12.5px] font-semibold text-rd-cream/75 mb-2">Telefone</label>
                                        <input
                                            type="tel"
                                            value={data.telefone}
                                            onChange={(e) => setData('telefone', e.target.value)}
                                            placeholder="+55 (11) 00000-0000"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[12.5px] font-semibold text-rd-cream/75 mb-2">Assunto</label>
                                        <select
                                            value={data.assunto}
                                            onChange={(e) => setData('assunto', e.target.value)}
                                            className={`${inputClass} cursor-pointer`}
                                        >
                                            <option value="">Selecione...</option>
                                            {SUBJECTS.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[12.5px] font-semibold text-rd-cream/75 mb-2">Mensagem</label>
                                    <textarea
                                        value={data.mensagem}
                                        onChange={(e) => setData('mensagem', e.target.value)}
                                        rows={5}
                                        placeholder="Conte um pouco sobre o que você precisa..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-rd-gold text-rd-primary font-bold text-[15px] py-4 px-5 md:px-8 rounded-sm transition-all hover:bg-rd-gold-light disabled:opacity-60 cursor-pointer"
                                >
                                    {processing ? 'Enviando...' : 'Enviar mensagem →'}
                                </button>

                                <p className="text-xs text-rd-cream/35">
                                    Ao enviar, você concorda com nossa política de privacidade. Não compartilhamos seus dados.
                                </p>
                            </form>
                        )}
                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-rd-dark border border-rd-gold/18 rounded p-6 md:p-8">
                            <div className="text-xs tracking-[2px] font-bold text-rd-gold mb-6">INFORMAÇÕES DE CONTATO</div>
                            <div className="flex flex-col gap-5">
                                {CONTACT_ITEMS.map((item) => (
                                    <div key={item.label} className="flex flex-col gap-1">
                                        <span className="text-[11px] tracking-[1px] font-bold text-rd-cream/45">{item.label.toUpperCase()}</span>
                                        <span className="text-[14.5px] text-rd-cream">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[rgba(15,85,100,.35)] border border-rd-gold/18 rounded p-6 md:p-7">
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="w-2 h-2 bg-rd-green rounded-full shadow-[0_0_8px_#5fb98c]" />
                                <span className="text-xs tracking-[1.5px] font-semibold text-rd-gold">RESPOSTA RÁPIDA</span>
                            </div>
                            <p className="text-[14.5px] text-rd-cream/80 leading-relaxed">
                                Normalmente respondemos em até <span className="text-rd-gold font-semibold">4 horas</span> em dias úteis. Para urgências, ligue ou envie mensagem pelo WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
