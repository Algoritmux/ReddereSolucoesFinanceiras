import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const DEFAULT_SOLUTIONS = [
    { id: 'consultoria', title: 'Consultoria de investimentos personalizada', category: 'Investimentos', kicker: 'PERSONALIZAÇÃO', desc: 'Construímos uma carteira alinhada ao seu perfil de risco.', bullets: ['Análise de perfil', 'Alocação estratégica', 'Revisões periódicas'], active: true },
    { id: 'planejamento', title: 'Planejamento financeiro e patrimonial', category: 'Planejamento', kicker: 'LONGO PRAZO', desc: 'Organizamos suas finanças com visão de futuro.', bullets: ['Mapeamento de metas', 'Fluxo de caixa', 'Eficiência tributária'], active: true },
    { id: 'sucessorio', title: 'Planejamento sucessório', category: 'Proteção', kicker: 'SUCESSÃO', desc: 'Transmissão eficiente do patrimônio entre gerações.', bullets: ['Holding familiar', 'Testamento e doações', 'Redução de ITCMD'], active: true },
    { id: 'seguro-vida', title: 'Seguro de vida', category: 'Seguros', kicker: 'PROTEÇÃO', desc: 'Proteção financeira para quem você ama.', bullets: ['Cobertura por morte', 'Ferramenta sucessória', 'Liquidez imediata'], active: true },
];

const MOCK_CONTACTS = [
    { id: 'c1', nome: 'Marcelo Andrade', email: 'marcelo@email.com', telefone: '(11) 99999-9999', assunto: 'Consultoria de investimentos', createdAt: '2025-06-20T14:30:00Z', origem: 'Formulário de contato' },
    { id: 'c2', nome: 'Fernanda Costa', email: 'fernanda@email.com', telefone: '(11) 98888-8888', assunto: 'Planejamento financeiro', createdAt: '2025-06-19T10:15:00Z', origem: 'Formulário de contato' },
    { id: 'c3', nome: 'Ricardo Tavares', email: 'ricardo@email.com', telefone: '(21) 97777-7777', assunto: 'Seguro de vida', createdAt: '2025-06-18T16:45:00Z', origem: 'Consultor On-line' },
];

const MOCK_CHATS = [
    { id: 'ch1', perfil: 'Conservador', solucoes: ['Renda fixa', 'Previdência'], createdAt: '2025-06-21T09:00:00Z' },
    { id: 'ch2', perfil: 'Moderado', solucoes: ['Consultoria', 'Internacional'], createdAt: '2025-06-20T11:30:00Z' },
];

function SidebarTab({ active, onClick, label, dot, count }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded text-[13.5px] font-medium text-left cursor-pointer transition-all ${
                active
                    ? 'bg-rd-gold/15 text-rd-cream border-l-2 border-rd-gold'
                    : 'text-rd-cream/60 hover:bg-rd-cream/5 hover:text-rd-cream border-l-2 border-transparent'
            }`}
        >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
            <span className="flex-1">{label}</span>
            {count != null && <span className="text-xs font-bold text-rd-cream/40">{count}</span>}
        </button>
    );
}

function SolucaoEditor({ sol, onSave, onCancel, isNew }) {
    const [form, setForm] = useState({
        title: sol?.title || '',
        category: sol?.category || '',
        kicker: sol?.kicker || '',
        desc: sol?.desc || '',
        bullets: sol?.bullets?.join('\n') || '',
    });

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const inpClass = 'w-full bg-rd-primary/60 border border-rd-gold/25 text-rd-cream text-[13.5px] px-3.5 py-2.5 rounded focus:outline-none focus:border-rd-gold transition-colors';

    return (
        <div className="bg-rd-primary border border-rd-gold/30 rounded p-6 mb-6 animate-rd-pop">
            <h2 className="font-kanit font-semibold text-[19px] text-rd-gold mb-5">
                {isNew ? 'Nova solução' : 'Editar solução'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Título *</label>
                    <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inpClass} placeholder="Ex.: Seguro de vida" />
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Categoria</label>
                    <input value={form.category} onChange={(e) => set('category', e.target.value)} className={inpClass} placeholder="Ex.: Seguros" />
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Selo (kicker)</label>
                    <input value={form.kicker} onChange={(e) => set('kicker', e.target.value)} className={inpClass} placeholder="Ex.: PROTEÇÃO" />
                </div>
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Descrição *</label>
                    <textarea value={form.desc} onChange={(e) => set('desc', e.target.value)} rows={3} className={`${inpClass} resize-none`} placeholder="Resumo da solução" />
                </div>
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Destaques (um por linha)</label>
                    <textarea value={form.bullets} onChange={(e) => set('bullets', e.target.value)} rows={3} className={`${inpClass} resize-none`} placeholder={'Cobertura por morte e invalidez\nFerramenta sucessória'} />
                </div>
            </div>
            <div className="flex gap-3 mt-5">
                <button
                    onClick={() => onSave({ ...sol, ...form, bullets: form.bullets.split('\n').filter(Boolean) })}
                    className="bg-rd-gold text-rd-primary font-bold text-[13.5px] px-5 py-2.5 rounded cursor-pointer hover:bg-rd-gold-light transition-colors"
                >
                    Salvar
                </button>
                <button
                    onClick={onCancel}
                    className="bg-transparent text-rd-cream/60 font-medium text-[13.5px] px-5 py-2.5 rounded border border-rd-cream/20 cursor-pointer hover:border-rd-gold hover:text-rd-cream transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default function Admin() {
    const [tab, setTab] = useState('solucoes');
    const [solutions, setSolutions] = useState(DEFAULT_SOLUTIONS);
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [contacts, setContacts] = useState(MOCK_CONTACTS);

    const handleSave = (updated) => {
        if (isNew) {
            const newSol = { ...updated, id: 'sol_' + Date.now(), active: true };
            setSolutions((prev) => [...prev, newSol]);
        } else {
            setSolutions((prev) => prev.map((s) => s.id === updated.id ? updated : s));
        }
        setEditing(null);
        setIsNew(false);
    };

    const handleToggleActive = (id) => {
        setSolutions((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    };

    const handleDelete = (id) => {
        setSolutions((prev) => prev.filter((s) => s.id !== id));
    };

    const TABS = [
        { id: 'solucoes', label: 'Soluções', dot: '#B99673', count: solutions.length },
        { id: 'contatos', label: 'Contatos (CRM)', dot: '#5fb98c', count: contacts.length },
        { id: 'conversas', label: 'Conversas IA', dot: '#0F5564', count: MOCK_CHATS.length },
    ];

    const fmtDate = (iso) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <Head title="Admin" />
            <div className="grid min-h-screen" style={{ gridTemplateColumns: '240px 1fr', background: '#0B1A22', color: '#EBE6E6', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

                {/* SIDEBAR */}
                <aside className="sticky top-0 h-screen bg-rd-dark border-r border-rd-gold/16 flex flex-col p-5 gap-1.5 overflow-y-auto">
                    <Link href="/" className="flex items-center gap-2.5 mb-6 px-2">
                        <span className="font-kanit font-bold text-lg tracking-widest text-rd-cream">REDDERE</span>
                    </Link>
                    <div className="text-[10.5px] tracking-[1.5px] text-rd-cream/40 font-bold px-3 pb-2">PAINEL ADMINISTRATIVO</div>
                    {TABS.map((t) => (
                        <SidebarTab
                            key={t.id}
                            active={tab === t.id}
                            onClick={() => setTab(t.id)}
                            label={t.label}
                            dot={t.dot}
                            count={t.count}
                        />
                    ))}
                    <div className="mt-auto pt-4 border-t border-rd-cream/8">
                        <Link href="/" className="text-[13px] text-rd-cream/50 font-medium hover:text-rd-gold transition-colors">
                            ← Voltar ao site
                        </Link>
                    </div>
                </aside>

                {/* CONTEÚDO */}
                <main className="p-10 max-w-[1100px]">

                    {/* SOLUÇÕES */}
                    {tab === 'solucoes' && (
                        <div className="animate-rd-pop">
                            <div className="flex justify-between items-end flex-wrap gap-4 mb-7">
                                <div>
                                    <h1 className="font-kanit font-bold text-[30px] tracking-tight">Cadastro de soluções</h1>
                                    <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Soluções ativas aparecem na Home e na página de Soluções.</p>
                                </div>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={() => setSolutions(DEFAULT_SOLUTIONS)}
                                        className="bg-transparent border border-rd-cream/20 text-rd-cream/70 text-[13px] font-semibold px-4 py-2.5 rounded cursor-pointer hover:border-rd-gold hover:text-rd-gold transition-colors"
                                    >
                                        Restaurar padrão
                                    </button>
                                    <button
                                        onClick={() => { setIsNew(true); setEditing({}); }}
                                        className="bg-rd-gold text-rd-primary text-[14px] font-bold px-5 py-2.5 rounded border-none cursor-pointer hover:bg-rd-gold-light transition-colors"
                                    >
                                        + Nova solução
                                    </button>
                                </div>
                            </div>

                            {editing !== null && (
                                <SolucaoEditor
                                    sol={editing}
                                    onSave={handleSave}
                                    onCancel={() => { setEditing(null); setIsNew(false); }}
                                    isNew={isNew}
                                />
                            )}

                            <div className="flex flex-col gap-3">
                                {solutions.map((sol) => (
                                    <div key={sol.id} className={`flex items-center gap-4 p-4 rounded border transition-all ${sol.active ? 'bg-[rgba(15,85,100,.2)] border-rd-gold/18' : 'bg-rd-dark/50 border-rd-cream/8 opacity-60'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-[14.5px] text-rd-cream truncate">{sol.title}</span>
                                                <span className="text-[10.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm shrink-0">{sol.kicker}</span>
                                                <span className="text-[11px] text-rd-cream/45 shrink-0">{sol.category}</span>
                                            </div>
                                            <p className="text-[13px] text-rd-cream/55 mt-1 truncate">{sol.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => handleToggleActive(sol.id)}
                                                className={`text-[11.5px] font-semibold px-3 py-1.5 rounded border cursor-pointer transition-colors ${sol.active ? 'bg-rd-green/15 text-rd-green border-rd-green/30 hover:bg-rd-green/25' : 'bg-rd-cream/5 text-rd-cream/40 border-rd-cream/15 hover:border-rd-cream/30'}`}
                                            >
                                                {sol.active ? 'Ativo' : 'Inativo'}
                                            </button>
                                            <button
                                                onClick={() => { setEditing(sol); setIsNew(false); }}
                                                className="text-[12px] font-medium text-rd-cream/60 hover:text-rd-gold transition-colors px-2 py-1.5 cursor-pointer"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(sol.id)}
                                                className="text-[12px] font-medium text-rd-cream/40 hover:text-red-400 transition-colors px-2 py-1.5 cursor-pointer"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CONTATOS */}
                    {tab === 'contatos' && (
                        <div className="animate-rd-pop">
                            <div className="mb-7">
                                <h1 className="font-kanit font-bold text-[30px] tracking-tight">CRM · Contatos</h1>
                                <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Leads recebidos pelo formulário de contato e pelo Consultor On-line.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {contacts.map((c) => (
                                    <div key={c.id} className="bg-rd-dark border border-rd-gold/16 rounded p-5">
                                        <div className="flex justify-between items-start gap-4 flex-wrap">
                                            <div>
                                                <div className="font-semibold text-[15px] text-rd-cream">{c.nome}</div>
                                                <div className="flex gap-4 mt-1 flex-wrap">
                                                    <span className="text-[13px] text-rd-cream/60">{c.email}</span>
                                                    <span className="text-[13px] text-rd-cream/60">{c.telefone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[11.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm">{c.assunto}</span>
                                                    <span className="text-[11px] text-rd-cream/40">{c.origem}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-[12px] text-rd-cream/40">{fmtDate(c.createdAt)}</span>
                                                <button
                                                    onClick={() => setContacts((prev) => prev.filter((x) => x.id !== c.id))}
                                                    className="text-[12px] text-rd-cream/40 hover:text-red-400 transition-colors cursor-pointer"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {contacts.length === 0 && (
                                    <div className="text-center py-16 text-rd-cream/30 text-[15px]">Nenhum contato cadastrado.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* CONVERSAS */}
                    {tab === 'conversas' && (
                        <div className="animate-rd-pop">
                            <div className="mb-7">
                                <h1 className="font-kanit font-bold text-[30px] tracking-tight">Conversas · Consultor IA</h1>
                                <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Histórico das interações com o consultor virtual.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {MOCK_CHATS.map((chat) => (
                                    <div key={chat.id} className="bg-rd-dark border border-rd-gold/16 rounded p-5">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <div className="font-semibold text-[14.5px] text-rd-cream mb-1">Perfil: <span className="text-rd-gold">{chat.perfil}</span></div>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {chat.solucoes.map((s) => (
                                                        <span key={s} className="text-[11px] font-semibold text-rd-gold bg-rd-gold/10 border border-rd-gold/20 px-2 py-0.5 rounded-sm">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-[12px] text-rd-cream/40 shrink-0">{fmtDate(chat.createdAt)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
