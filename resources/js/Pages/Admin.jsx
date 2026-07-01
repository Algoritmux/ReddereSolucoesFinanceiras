import { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

const PATRIMONY_LABELS = {
    reserva_liquidez: 'Reserva e conta corrente',
    renda_fixa: 'Renda fixa',
    renda_variavel: 'Renda variável',
    fundos: 'Fundos de investimento',
    previdencia: 'Previdência privada',
    imoveis: 'Imóveis',
    exterior: 'Exterior e moedas',
    participacoes: 'Empresas e participações',
    cripto: 'Criptoativos',
    outros: 'Outros ativos',
};

function articleImage(article) {
    if (!article?.cover_image) return null;
    return article.cover_image.startsWith('/') ? article.cover_image : `/storage/${article.cover_image}`;
}

function SidebarTab({ active, onClick, label, dot, count }) {
    return (
        <button
            onClick={onClick}
            className={`w-max lg:w-full shrink-0 flex items-center gap-3 px-3 py-3 rounded text-[13.5px] font-medium text-left whitespace-nowrap lg:whitespace-normal cursor-pointer transition-all ${
                active
                    ? 'bg-rd-gold/15 text-rd-cream border-b-2 lg:border-b-0 lg:border-l-2 border-rd-gold'
                    : 'text-rd-cream/60 hover:bg-rd-cream/5 hover:text-rd-cream border-b-2 lg:border-b-0 lg:border-l-2 border-transparent'
            }`}
        >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
            <span className="flex-1 min-w-0">{label}</span>
            {count != null && <span className="text-xs font-bold text-rd-cream/40">{count}</span>}
        </button>
    );
}

function SolucaoEditor({ sol, onSave, onCancel, isNew, processing }) {
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
            <div className="flex flex-wrap gap-3 mt-5">
                <button
                    disabled={processing}
                    onClick={() => onSave({ ...form, bullets: form.bullets.split('\n').map((b) => b.trim()).filter(Boolean) })}
                    className="bg-rd-gold text-rd-primary font-bold text-[13.5px] px-5 py-2.5 rounded cursor-pointer hover:bg-rd-gold-light transition-colors disabled:opacity-60"
                >
                    {processing ? 'Salvando...' : 'Salvar'}
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

function ArtigoEditor({ article, onCancel, onSaved }) {
    const isNew = !article?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        title: article?.title || '',
        category: article?.category || '',
        author: article?.author || '',
        excerpt: article?.excerpt || '',
        content: article?.content || '',
        cover_image: null,
        published: article?.published ?? true ? 1 : 0,
    });

    const inpClass = 'w-full bg-rd-primary/60 border border-rd-gold/25 text-rd-cream text-[13.5px] px-3.5 py-2.5 rounded focus:outline-none focus:border-rd-gold transition-colors';

    const submit = () => {
        const options = { forceFormData: true, preserveScroll: true, onSuccess: onSaved };
        if (isNew) {
            post('/admin/artigos', options);
        } else {
            put(`/admin/artigos/${article.id}`, options);
        }
    };

    return (
        <div className="bg-rd-primary border border-rd-gold/30 rounded p-6 mb-6 animate-rd-pop">
            <h2 className="font-kanit font-semibold text-[19px] text-rd-gold mb-5">
                {isNew ? 'Novo artigo' : 'Editar artigo'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Título *</label>
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} className={inpClass} placeholder="Ex.: Como proteger seu patrimônio em 2026" />
                    {errors.title && <p className="text-[12px] text-red-400 mt-1.5">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Categoria</label>
                    <input value={data.category} onChange={(e) => setData('category', e.target.value)} className={inpClass} placeholder="Ex.: Investimentos" />
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Autor</label>
                    <input value={data.author} onChange={(e) => setData('author', e.target.value)} className={inpClass} placeholder="Ex.: Equipe Reddere" />
                </div>
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Resumo</label>
                    <textarea value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} rows={2} className={`${inpClass} resize-none`} placeholder="Resumo curto exibido na listagem" />
                </div>
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Conteúdo *</label>
                    <textarea value={data.content} onChange={(e) => setData('content', e.target.value)} rows={10} className={`${inpClass} resize-none`} placeholder="Separe parágrafos com uma linha em branco" />
                    {errors.content && <p className="text-[12px] text-red-400 mt-1.5">{errors.content}</p>}
                </div>
                <div className="col-span-full">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Imagem de capa</label>
                    <input type="file" accept="image/*" onChange={(e) => setData('cover_image', e.target.files[0] || null)} className={`${inpClass} py-2`} />
                    {errors.cover_image && <p className="text-[12px] text-red-400 mt-1.5">{errors.cover_image}</p>}
                    {article?.cover_image && (
                        <img src={articleImage(article)} alt="Capa atual" className="h-20 w-auto rounded mt-2.5 border border-rd-gold/20" />
                    )}
                </div>
                <div className="col-span-full">
                    <label className="flex items-center gap-2 text-[13px] text-rd-cream/70 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={!!data.published}
                            onChange={(e) => setData('published', e.target.checked ? 1 : 0)}
                            className="accent-rd-gold"
                        />
                        Publicado
                    </label>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
                <button
                    disabled={processing}
                    onClick={submit}
                    className="bg-rd-gold text-rd-primary font-bold text-[13.5px] px-5 py-2.5 rounded cursor-pointer hover:bg-rd-gold-light transition-colors disabled:opacity-60"
                >
                    {processing ? 'Salvando...' : 'Salvar'}
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

function AiSettingsPanel({ settings }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        ai_api_key: '',
        clear_ai_api_key: 0,
        ai_model: settings?.ai_model || 'gpt-5.5',
        ai_system_prompt: settings?.ai_system_prompt || '',
    });

    const inpClass = 'w-full bg-rd-primary/60 border border-rd-gold/25 text-rd-cream text-[13.5px] px-3.5 py-2.5 rounded focus:outline-none focus:border-rd-gold transition-colors';

    const submit = (event) => {
        event.preventDefault();
        patch('/admin/configuracoes/ia', {
            preserveScroll: true,
            onSuccess: () => setData('ai_api_key', ''),
        });
    };

    return (
        <form onSubmit={submit} className="bg-rd-dark border border-rd-gold/16 rounded p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                <div>
                    <h2 className="font-kanit font-semibold text-[22px] text-rd-cream">Configurações do Consultor IA</h2>
                    <p className="text-[13.5px] text-rd-cream/55 mt-1.5">
                        A chave fica criptografada no banco e não é exibida de volta no painel.
                    </p>
                </div>
                <span className={`text-[11.5px] font-bold px-2.5 py-1 rounded-sm border ${
                    settings?.api_key_configured
                        ? 'text-rd-green bg-rd-green/10 border-rd-green/30'
                        : 'text-rd-cream/45 bg-rd-cream/5 border-rd-cream/15'
                }`}>
                    {settings?.api_key_configured ? 'CHAVE CONFIGURADA' : 'SEM CHAVE'}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Chave da OpenAI</label>
                    <input
                        type="password"
                        value={data.ai_api_key}
                        onChange={(e) => setData('ai_api_key', e.target.value)}
                        className={inpClass}
                        placeholder={settings?.api_key_configured ? 'Digite uma nova chave para substituir' : 'sk-...'}
                        autoComplete="off"
                    />
                    {errors.ai_api_key && <p className="text-[12px] text-red-400 mt-1.5">{errors.ai_api_key}</p>}
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Modelo</label>
                    <select
                        value={data.ai_model}
                        onChange={(e) => setData('ai_model', e.target.value)}
                        className={inpClass}
                    >
                        <option value="">Selecione um modelo</option>
                        <optgroup label="OpenAI">
                            <option value="gpt-4-turbo">GPT-4 Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        </optgroup>
                        <optgroup label="Claude (Anthropic)">
                            <option value="claude-3-opus">Claude 3 Opus</option>
                            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                            <option value="claude-3-haiku">Claude 3 Haiku</option>
                        </optgroup>
                    </select>
                    {errors.ai_model && <p className="text-[12px] text-red-400 mt-1.5">{errors.ai_model}</p>}
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Instrução base da IA</label>
                    <textarea
                        value={data.ai_system_prompt}
                        onChange={(e) => setData('ai_system_prompt', e.target.value)}
                        rows={6}
                        className={`${inpClass} resize-none`}
                        placeholder="Defina o comportamento, tom e limites do consultor."
                    />
                    {errors.ai_system_prompt && <p className="text-[12px] text-red-400 mt-1.5">{errors.ai_system_prompt}</p>}
                </div>
                {settings?.api_key_configured && (
                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-[13px] text-rd-cream/70 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={!!data.clear_ai_api_key}
                                onChange={(e) => setData('clear_ai_api_key', e.target.checked ? 1 : 0)}
                                className="accent-rd-gold"
                            />
                            Remover chave atual
                        </label>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5">
                <button
                    disabled={processing}
                    type="submit"
                    className="bg-rd-gold text-rd-primary font-bold text-[13.5px] px-5 py-2.5 rounded cursor-pointer hover:bg-rd-gold-light transition-colors disabled:opacity-60"
                >
                    {processing ? 'Salvando...' : 'Salvar configurações'}
                </button>
                {recentlySuccessful && <span className="text-[12px] text-rd-green">Configurações salvas.</span>}
            </div>
        </form>
    );
}

function AiKnowledgeEditor({ entry, onCancel, onSaved }) {
    const isNew = !entry?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        title: entry?.title || '',
        content: entry?.content || '',
        active: entry?.active ?? true ? 1 : 0,
    });

    const inpClass = 'w-full bg-rd-primary/60 border border-rd-gold/25 text-rd-cream text-[13.5px] px-3.5 py-2.5 rounded focus:outline-none focus:border-rd-gold transition-colors';

    const submit = () => {
        const options = { preserveScroll: true, onSuccess: onSaved };
        if (isNew) {
            post('/admin/conhecimento-ia', options);
        } else {
            put(`/admin/conhecimento-ia/${entry.id}`, options);
        }
    };

    return (
        <div className="bg-rd-primary border border-rd-gold/30 rounded p-6 mb-6 animate-rd-pop">
            <h2 className="font-kanit font-semibold text-[19px] text-rd-gold mb-5">
                {isNew ? 'Novo conhecimento da IA' : 'Editar conhecimento da IA'}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Título *</label>
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} className={inpClass} placeholder="Ex.: Política de atendimento" />
                    {errors.title && <p className="text-[12px] text-red-400 mt-1.5">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Conteúdo para a IA usar *</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={7}
                        className={`${inpClass} resize-none`}
                        placeholder="Cole aqui informações sobre serviços, abordagem, limites, perguntas frequentes, produtos e regras de resposta."
                    />
                    {errors.content && <p className="text-[12px] text-red-400 mt-1.5">{errors.content}</p>}
                </div>
                <label className="flex items-center gap-2 text-[13px] text-rd-cream/70 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!data.active}
                        onChange={(e) => setData('active', e.target.checked ? 1 : 0)}
                        className="accent-rd-gold"
                    />
                    Ativo na base de conhecimento
                </label>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
                <button
                    disabled={processing}
                    onClick={submit}
                    className="bg-rd-gold text-rd-primary font-bold text-[13.5px] px-5 py-2.5 rounded cursor-pointer hover:bg-rd-gold-light transition-colors disabled:opacity-60"
                >
                    {processing ? 'Salvando...' : 'Salvar'}
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
    const { solutions, contacts, chats, financialAnalyses = [], articles = [], aiSettings = {}, aiKnowledgeEntries = [] } = usePage().props;
    const [tab, setTab] = useState('solucoes');
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [editingKnowledge, setEditingKnowledge] = useState(null);

    const closeEditor = () => {
        setEditing(null);
        setIsNew(false);
        setProcessing(false);
    };

    const handleSave = (form) => {
        setProcessing(true);
        const options = {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: closeEditor,
        };

        if (isNew) {
            router.post('/admin/solucoes', form, options);
        } else {
            router.put(`/admin/solucoes/${editing.id}`, form, options);
        }
    };

    const handleToggleActive = (id) => {
        router.patch(`/admin/solucoes/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteSolution = (id) => {
        if (!confirm('Remover esta solução?')) return;
        router.delete(`/admin/solucoes/${id}`, { preserveScroll: true });
    };

    const handleDeleteContact = (id) => {
        if (!confirm('Remover este contato?')) return;
        router.delete(`/admin/contatos/${id}`, { preserveScroll: true });
    };

    const handleDeleteChat = (id) => {
        if (!confirm('Remover esta conversa?')) return;
        router.delete(`/admin/conversas/${id}`, { preserveScroll: true });
    };

    const handleDeleteFinancialAnalysis = (id) => {
        if (!confirm('Remover este RaioX financeiro?')) return;
        router.delete(`/admin/raiox-financeiro/${id}`, { preserveScroll: true });
    };

    const closeArticleEditor = () => {
        setEditingArticle(null);
    };

    const handleToggleArticlePublished = (id) => {
        router.patch(`/admin/artigos/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteArticle = (id) => {
        if (!confirm('Remover este artigo?')) return;
        router.delete(`/admin/artigos/${id}`, { preserveScroll: true });
    };

    const closeKnowledgeEditor = () => {
        setEditingKnowledge(null);
    };

    const handleToggleKnowledgeActive = (id) => {
        router.patch(`/admin/conhecimento-ia/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteKnowledge = (id) => {
        if (!confirm('Remover este conhecimento da IA?')) return;
        router.delete(`/admin/conhecimento-ia/${id}`, { preserveScroll: true });
    };

    const TABS = [
        { id: 'solucoes', label: 'Soluções', dot: '#B99673', count: solutions.length },
        { id: 'artigos', label: 'Artigos', dot: '#7D6E5D', count: articles.length },
        { id: 'contatos', label: 'Contatos (CRM)', dot: '#5fb98c', count: contacts.length },
        { id: 'raiox', label: 'RaioX financeiro', dot: '#cda884', count: financialAnalyses.length },
        { id: 'conversas', label: 'Conversas IA', dot: '#0F5564', count: chats.length },
        { id: 'configuracoes', label: 'Configurações', dot: '#EBE6E6' },
    ];

    const fmtDate = (iso) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const fmtCurrency = (value) => Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    const assetRows = (patrimonio = {}) => Object.entries(patrimonio)
        .map(([key, value]) => ({ key, label: PATRIMONY_LABELS[key] || key, value: Number(value || 0) }))
        .filter((item) => item.value > 0)
        .sort((a, b) => b.value - a.value);

    return (
        <>
            <Head title="Admin" />
            <div className="grid min-h-screen lg:grid-cols-[240px_1fr]" style={{ background: '#0B1A22', color: '#EBE6E6', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

                {/* SIDEBAR */}
                <aside className="bg-rd-dark border-b lg:border-b-0 lg:border-r border-rd-gold/16 flex flex-col p-4 lg:p-5 gap-3 lg:gap-1.5 overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                    <Link href="/" className="flex items-center gap-2.5 mb-1 lg:mb-6 px-2">
                        <span className="font-kanit font-bold text-lg tracking-widest text-rd-cream">REDDERE</span>
                    </Link>
                    <div className="text-[10.5px] tracking-[1.5px] text-rd-cream/40 font-bold px-3 pb-1 lg:pb-2">PAINEL ADMINISTRATIVO</div>
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
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
                    </div>
                    <div className="mt-2 lg:mt-auto pt-4 border-t border-rd-cream/8 flex flex-row lg:flex-col gap-3 lg:gap-2.5">
                        <Link href="/" className="text-[13px] text-rd-cream/50 font-medium hover:text-rd-gold transition-colors">
                            ← Voltar ao site
                        </Link>
                        <button
                            onClick={() => router.post('/admin/logout')}
                            className="text-[13px] text-rd-cream/50 font-medium text-left hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none p-0"
                        >
                            Sair
                        </button>
                    </div>
                </aside>

                {/* CONTEÚDO */}
                <main className="w-full min-w-0 p-5 sm:p-7 lg:p-10 lg:max-w-[1100px]">

                    {/* SOLUÇÕES */}
                    {tab === 'solucoes' && (
                        <div className="animate-rd-pop">
                            <div className="flex justify-between items-end flex-wrap gap-4 mb-7">
                                <div>
                                    <h1 className="font-kanit font-bold text-[30px] tracking-tight">Cadastro de soluções</h1>
                                    <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Soluções cadastradas aqui ficam disponíveis para consulta no painel administrativo.</p>
                                </div>
                                <div className="flex gap-2.5">
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
                                    onCancel={closeEditor}
                                    isNew={isNew}
                                    processing={processing}
                                />
                            )}

                            <div className="flex flex-col gap-3">
                                {solutions.map((sol) => (
                                    <div key={sol.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded border transition-all ${sol.active ? 'bg-[rgba(15,85,100,.2)] border-rd-gold/18' : 'bg-rd-dark/50 border-rd-cream/8 opacity-60'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-[14.5px] text-rd-cream truncate">{sol.title}</span>
                                                <span className="text-[10.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm shrink-0">{sol.kicker}</span>
                                                <span className="text-[11px] text-rd-cream/45 shrink-0">{sol.category}</span>
                                            </div>
                                            <p className="text-[13px] text-rd-cream/55 mt-1 truncate">{sol.desc}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
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
                                                onClick={() => handleDeleteSolution(sol.id)}
                                                className="text-[12px] font-medium text-rd-cream/40 hover:text-red-400 transition-colors px-2 py-1.5 cursor-pointer"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {solutions.length === 0 && (
                                    <div className="text-center py-16 text-rd-cream/30 text-[15px]">Nenhuma solução cadastrada.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ARTIGOS */}
                    {tab === 'artigos' && (
                        <div className="animate-rd-pop">
                            <div className="flex justify-between items-end flex-wrap gap-4 mb-7">
                                <div>
                                    <h1 className="font-kanit font-bold text-[30px] tracking-tight">Artigos &amp; Insights</h1>
                                    <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Artigos publicados aparecem em /artigos no site.</p>
                                </div>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={() => setEditingArticle({})}
                                        className="bg-rd-gold text-rd-primary text-[14px] font-bold px-5 py-2.5 rounded border-none cursor-pointer hover:bg-rd-gold-light transition-colors"
                                    >
                                        + Novo artigo
                                    </button>
                                </div>
                            </div>

                            {editingArticle !== null && (
                                <ArtigoEditor
                                    article={editingArticle}
                                    onCancel={closeArticleEditor}
                                    onSaved={closeArticleEditor}
                                />
                            )}

                            <div className="flex flex-col gap-3">
                                {articles.map((article) => (
                                    <div key={article.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded border transition-all ${article.published ? 'bg-[rgba(15,85,100,.2)] border-rd-gold/18' : 'bg-rd-dark/50 border-rd-cream/8 opacity-60'}`}>
                                        {articleImage(article) ? (
                                            <img src={articleImage(article)} alt={article.title} className="w-16 h-16 object-cover rounded shrink-0" />
                                        ) : (
                                            <div className="w-16 h-16 shrink-0 rounded bg-rd-primary/60 border border-rd-gold/15" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-[14.5px] text-rd-cream truncate">{article.title}</span>
                                                {article.category && <span className="text-[10.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm shrink-0">{article.category}</span>}
                                            </div>
                                            <p className="text-[13px] text-rd-cream/55 mt-1 truncate">{article.excerpt}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                                            <button
                                                onClick={() => handleToggleArticlePublished(article.id)}
                                                className={`text-[11.5px] font-semibold px-3 py-1.5 rounded border cursor-pointer transition-colors ${article.published ? 'bg-rd-green/15 text-rd-green border-rd-green/30 hover:bg-rd-green/25' : 'bg-rd-cream/5 text-rd-cream/40 border-rd-cream/15 hover:border-rd-cream/30'}`}
                                            >
                                                {article.published ? 'Publicado' : 'Rascunho'}
                                            </button>
                                            <button
                                                onClick={() => setEditingArticle(article)}
                                                className="text-[12px] font-medium text-rd-cream/60 hover:text-rd-gold transition-colors px-2 py-1.5 cursor-pointer"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteArticle(article.id)}
                                                className="text-[12px] font-medium text-rd-cream/40 hover:text-red-400 transition-colors px-2 py-1.5 cursor-pointer"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {articles.length === 0 && (
                                    <div className="text-center py-16 text-rd-cream/30 text-[15px]">Nenhum artigo cadastrado.</div>
                                )}
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
                                                    <span className="text-[13px] text-rd-cream/60 break-all">{c.email}</span>
                                                    <span className="text-[13px] text-rd-cream/60">{c.telefone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {c.assunto && <span className="text-[11.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm">{c.assunto}</span>}
                                                    <span className="text-[11px] text-rd-cream/40">{c.origem}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end gap-2">
                                                <span className="text-[12px] text-rd-cream/40">{fmtDate(c.created_at)}</span>
                                                <button
                                                    onClick={() => handleDeleteContact(c.id)}
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

                    {/* RAIOX FINANCEIRO */}
                    {tab === 'raiox' && (
                        <div className="animate-rd-pop">
                            <div className="mb-7">
                                <h1 className="font-kanit font-bold text-[30px] tracking-tight">RaioX financeiro</h1>
                                <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Leads com patrimonio informado, objetivo financeiro e perfil de investimento.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {financialAnalyses.map((analysis) => {
                                    const rows = assetRows(analysis.patrimonio);

                                    return (
                                        <div key={analysis.id} className="bg-rd-dark border border-rd-gold/16 rounded p-5">
                                            <div className="flex justify-between items-start gap-4 flex-wrap border-b border-rd-cream/8 pb-4 mb-4">
                                                <div>
                                                    <div className="font-semibold text-[16px] text-rd-cream">{analysis.contact?.nome || 'Contato removido'}</div>
                                                    <div className="flex gap-4 mt-1 flex-wrap">
                                                        {analysis.contact?.email && <span className="text-[13px] text-rd-cream/60 break-all">{analysis.contact.email}</span>}
                                                        {analysis.contact?.telefone && <span className="text-[13px] text-rd-cream/60">{analysis.contact.telefone}</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                        <span className="text-[11.5px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2 py-0.5 rounded-sm">{analysis.perfil_investimento}</span>
                                                        <span className="text-[11.5px] text-rd-cream/45">Pontuação {analysis.pontuacao_perfil}/15</span>
                                                        {analysis.preferencia_contato && <span className="text-[11.5px] text-rd-cream/45">{analysis.preferencia_contato}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                                                    <span className="text-[12px] text-rd-cream/40">{fmtDate(analysis.created_at)}</span>
                                                    <button
                                                        onClick={() => handleDeleteFinancialAnalysis(analysis.id)}
                                                        className="text-[12px] text-rd-cream/40 hover:text-red-400 transition-colors cursor-pointer"
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
                                                <div className="bg-rd-primary/55 border border-rd-gold/12 rounded p-4">
                                                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">PATRIMÔNIO TOTAL</div>
                                                    <div className="font-kanit font-bold text-[28px] text-rd-gold leading-none">{fmtCurrency(analysis.patrimonio_total)}</div>
                                                    <div className="mt-4 pt-4 border-t border-rd-cream/10">
                                                        <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">OBJETIVO</div>
                                                        <div className="text-[13.5px] text-rd-cream font-semibold leading-snug">{analysis.objetivo_patrimonial}</div>
                                                        {analysis.valor_objetivo && (
                                                            <div className="text-[12.5px] text-rd-cream/55 mt-2">Meta: {fmtCurrency(analysis.valor_objetivo)}</div>
                                                        )}
                                                        {analysis.prazo_objetivo && (
                                                            <div className="text-[12.5px] text-rd-cream/55 mt-1">Prazo: {analysis.prazo_objetivo}</div>
                                                        )}
                                                        {analysis.aporte_mensal && (
                                                            <div className="text-[12.5px] text-rd-cream/55 mt-1">Aporte: {fmtCurrency(analysis.aporte_mensal)}/mês</div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-rd-primary/35 border border-rd-gold/12 rounded p-4">
                                                        <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-3">DISTRIBUIÇÃO PATRIMONIAL</div>
                                                        <div className="flex flex-col gap-2.5">
                                                            {rows.map((row) => {
                                                                const width = Number(analysis.patrimonio_total || 0) > 0
                                                                    ? Math.max((row.value / Number(analysis.patrimonio_total)) * 100, 4)
                                                                    : 0;

                                                                return (
                                                                    <div key={row.key}>
                                                                        <div className="flex justify-between gap-3 text-[12px] mb-1">
                                                                            <span className="text-rd-cream/68">{row.label}</span>
                                                                            <span className="text-rd-gold font-semibold">{fmtCurrency(row.value)}</span>
                                                                        </div>
                                                                        <div className="h-1.5 bg-rd-dark rounded overflow-hidden">
                                                                            <div className="h-full bg-rd-gold" style={{ width: `${width}%` }} />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                            {rows.length === 0 && <div className="text-[13px] text-rd-cream/35">Nenhum valor patrimonial detalhado.</div>}
                                                        </div>
                                                    </div>

                                                    <div className="bg-rd-primary/35 border border-rd-gold/12 rounded p-4">
                                                        <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-3">RESPOSTAS DO PERFIL</div>
                                                        <div className="flex flex-col gap-3">
                                                            {(analysis.respostas_perfil || []).map((answer, i) => (
                                                                <div key={`${answer.pergunta}-${i}`} className="border-b border-rd-cream/8 last:border-b-0 pb-2 last:pb-0">
                                                                    <div className="text-[12px] text-rd-cream/45 leading-snug">{answer.pergunta}</div>
                                                                    <div className="text-[13px] text-rd-cream font-semibold mt-1">{answer.resposta}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {analysis.observacoes && (
                                                <div className="mt-4 pt-4 border-t border-rd-cream/8">
                                                    <div className="text-[11px] tracking-[1.4px] font-bold text-rd-cream/45 mb-2">OBSERVAÇÕES</div>
                                                    <p className="text-[13.5px] text-rd-cream/68 leading-relaxed">{analysis.observacoes}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {financialAnalyses.length === 0 && (
                                    <div className="text-center py-16 text-rd-cream/30 text-[15px]">Nenhum RaioX financeiro recebido.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* CONFIGURAÇÕES */}
                    {tab === 'configuracoes' && (
                        <div className="animate-rd-pop">
                            <div className="mb-7">
                                <h1 className="font-kanit font-bold text-[30px] tracking-tight">Configurações</h1>
                                <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Defina a chave e o comportamento do Consultor IA.</p>
                            </div>
                            <AiSettingsPanel settings={aiSettings} />
                        </div>
                    )}

                    {/* CONVERSAS */}
                    {tab === 'conversas' && (
                        <div className="animate-rd-pop">
                            <div className="mb-7">
                                <h1 className="font-kanit font-bold text-[30px] tracking-tight">Conversas · Consultor IA</h1>
                                <p className="text-[14.5px] text-rd-cream/60 mt-1.5">Histórico das interações e conteúdos usados como conhecimento pela IA.</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex justify-between items-end flex-wrap gap-4 mb-4">
                                    <div>
                                        <h2 className="font-kanit font-semibold text-[22px] text-rd-cream">Base de conhecimento da IA</h2>
                                        <p className="text-[13.5px] text-rd-cream/55 mt-1.5">Textos ativos aqui entram no contexto das respostas do consultor.</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingKnowledge({})}
                                        className="bg-rd-gold text-rd-primary text-[14px] font-bold px-5 py-2.5 rounded border-none cursor-pointer hover:bg-rd-gold-light transition-colors"
                                    >
                                        + Novo conhecimento
                                    </button>
                                </div>

                                {editingKnowledge !== null && (
                                    <AiKnowledgeEditor
                                        entry={editingKnowledge}
                                        onCancel={closeKnowledgeEditor}
                                        onSaved={closeKnowledgeEditor}
                                    />
                                )}

                                <div className="flex flex-col gap-3">
                                    {aiKnowledgeEntries.map((entry) => (
                                        <div key={entry.id} className={`p-4 rounded border transition-all ${entry.active ? 'bg-[rgba(15,85,100,.2)] border-rd-gold/18' : 'bg-rd-dark/50 border-rd-cream/8 opacity-60'}`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-semibold text-[14.5px] text-rd-cream">{entry.title}</span>
                                                        <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-sm border ${entry.active ? 'text-rd-green bg-rd-green/10 border-rd-green/25' : 'text-rd-cream/40 bg-rd-cream/5 border-rd-cream/15'}`}>
                                                            {entry.active ? 'ATIVO' : 'INATIVO'}
                                                        </span>
                                                    </div>
                                                    <p className="text-[13px] text-rd-cream/55 mt-1 line-clamp-2">{entry.content}</p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                                                    <button
                                                        onClick={() => handleToggleKnowledgeActive(entry.id)}
                                                        className="text-[12px] font-medium text-rd-cream/60 hover:text-rd-gold transition-colors px-2 py-1.5 cursor-pointer"
                                                    >
                                                        {entry.active ? 'Desativar' : 'Ativar'}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingKnowledge(entry)}
                                                        className="text-[12px] font-medium text-rd-cream/60 hover:text-rd-gold transition-colors px-2 py-1.5 cursor-pointer"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteKnowledge(entry.id)}
                                                        className="text-[12px] font-medium text-rd-cream/40 hover:text-red-400 transition-colors px-2 py-1.5 cursor-pointer"
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {aiKnowledgeEntries.length === 0 && (
                                        <div className="text-center py-10 text-rd-cream/30 text-[15px] border border-rd-cream/8 rounded">
                                            Nenhum conhecimento cadastrado.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h2 className="font-kanit font-semibold text-[22px] text-rd-cream">Histórico de conversas</h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                {chats.map((chat) => (
                                    <div key={chat.id} className="bg-rd-dark border border-rd-gold/16 rounded p-5">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                            <div>
                                                {chat.perfil && (
                                                    <div className="font-semibold text-[14.5px] text-rd-cream mb-1">Perfil: <span className="text-rd-gold">{chat.perfil}</span></div>
                                                )}
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {(chat.solucoes || []).map((s) => (
                                                        <span key={s} className="text-[11px] font-semibold text-rd-gold bg-rd-gold/10 border border-rd-gold/20 px-2 py-0.5 rounded-sm">{s}</span>
                                                    ))}
                                                </div>
                                                {(chat.respostas || []).length > 0 && (
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        {(chat.respostas || []).slice(-4).map((answer, i) => (
                                                            <div key={`${chat.id}-${i}`} className="bg-rd-primary/45 border border-rd-gold/10 rounded p-3">
                                                                <div className="text-[11px] text-rd-cream/40 mb-1">{answer.pergunta}</div>
                                                                <div className="text-[13px] text-rd-cream/68 leading-relaxed">{answer.resposta}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                                                <span className="text-[12px] text-rd-cream/40">{fmtDate(chat.created_at)}</span>
                                                <button
                                                    onClick={() => handleDeleteChat(chat.id)}
                                                    className="text-[12px] text-rd-cream/40 hover:text-red-400 transition-colors cursor-pointer"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {chats.length === 0 && (
                                    <div className="text-center py-16 text-rd-cream/30 text-[15px]">Nenhuma conversa registrada.</div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
