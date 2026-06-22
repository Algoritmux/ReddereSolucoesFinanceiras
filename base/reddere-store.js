/* ============================================================
   Reddere · Store compartilhado (localStorage)
   Centraliza soluções, contatos (CRM), conversas com a IA e
   análises de perfil. Usado por todas as páginas via
   window.ReddereStore.
   ============================================================ */
(function () {
  var KEYS = {
    sol: 'reddere_solucoes_v1',
    con: 'reddere_contatos_v1',
    chat: 'reddere_conversas_v1',
    perfil: 'reddere_perfis_v1',
  };

  // -------- Soluções padrão (catálogo de fábrica) --------
  var DEFAULT_SOLUCOES = [
    {
      id: 'consultoria',
      title: 'Consultoria de investimentos personalizada',
      kicker: 'PERSONALIZAÇÃO',
      category: 'Investimentos',
      glyph: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
      desc: 'Construímos uma carteira alinhada ao seu perfil de risco, horizonte e objetivos. Nada de produto de prateleira: cada recomendação tem propósito.',
      bullets: ['Análise de perfil e objetivos de vida', 'Alocação estratégica e rebalanceamento ativo', 'Acompanhamento próximo e revisões periódicas'],
      active: true,
    },
    {
      id: 'planejamento',
      title: 'Planejamento financeiro e patrimonial',
      kicker: 'LONGO PRAZO',
      category: 'Planejamento',
      glyph: 'circle(50%)',
      desc: 'Organizamos suas finanças com visão de futuro, conectando metas de curto, médio e longo prazo a um plano executável e revisável.',
      bullets: ['Mapeamento de metas e fluxo de caixa', 'Estratégia de acumulação e reserva', 'Eficiência tributária na construção patrimonial'],
      active: true,
    },
    {
      id: 'sucessorio',
      title: 'Planejamento sucessório',
      kicker: 'SUCESSÃO',
      category: 'Proteção',
      glyph: 'polygon(0 0,100% 0,50% 100%)',
      desc: 'Estruturas que garantem a transmissão eficiente do patrimônio entre gerações, reduzindo custos, impostos e conflitos familiares.',
      bullets: ['Holding familiar e governança patrimonial', 'Testamento, doações e usufruto', 'Redução de ITCMD e custos de inventário'],
      active: true,
    },
    {
      id: 'seguro-vida',
      title: 'Seguro de vida',
      kicker: 'PROTEÇÃO',
      category: 'Seguros',
      glyph: 'polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%)',
      desc: 'Proteção financeira para quem você ama. Garantimos liquidez imediata para a família e preservamos o patrimônio em momentos difíceis.',
      bullets: ['Cobertura por morte e invalidez', 'Seguro como ferramenta sucessória', 'Liquidez livre de inventário para herdeiros'],
      active: true,
    },
    {
      id: 'seguro-social',
      title: 'Seguro social e planejamento previdenciário',
      kicker: 'PREVIDÊNCIA',
      category: 'Previdência',
      glyph: 'polygon(50% 0,100% 100%,0 100%)',
      desc: 'Análise da sua situação junto ao INSS e estratégias para otimizar benefícios, contribuições e o melhor momento de se aposentar.',
      bullets: ['Diagnóstico de contribuições ao INSS', 'Melhor estratégia de aposentadoria', 'Integração com previdência privada'],
      active: true,
    },
    {
      id: 'previdencia',
      title: 'Previdência privada',
      kicker: 'APOSENTADORIA',
      category: 'Previdência',
      glyph: 'circle(50% at 50% 50%)',
      desc: 'Planejamento de aposentadoria com os veículos certos, escolha tributária adequada e horizonte bem definido para a tranquilidade futura.',
      bullets: ['PGBL e VGBL conforme seu perfil tributário', 'Estratégia de acumulação e desacumulação', 'Portabilidade e revisão de planos existentes'],
      active: true,
    },
    {
      id: 'renda',
      title: 'Renda fixa e renda variável',
      kicker: 'ALOCAÇÃO',
      category: 'Investimentos',
      glyph: 'polygon(0 0,100% 0,100% 100%)',
      desc: 'Equilíbrio entre a previsibilidade da renda fixa e o potencial da renda variável, com gestão de risco rigorosa em cada ciclo de mercado.',
      bullets: ['Crédito privado, títulos públicos e fundos', 'Ações, ETFs e fundos imobiliários', 'Gestão de risco e diversificação inteligente'],
      active: true,
    },
    {
      id: 'internacional',
      title: 'Câmbio e investimentos internacionais',
      kicker: 'GLOBAL',
      category: 'Investimentos',
      glyph: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
      desc: 'Diversificação geográfica e exposição a moedas fortes para reduzir risco e capturar oportunidades fora do Brasil.',
      bullets: ['Exposição a dólar, euro e ativos globais', 'Contas e investimentos no exterior', 'Operações de câmbio com atendimento dedicado'],
      active: true,
    },
  ];

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  var Store = {
    KEYS: KEYS,
    DEFAULT_SOLUCOES: DEFAULT_SOLUCOES,

    // ---- Soluções ----
    getSolucoes: function () {
      var s = read(KEYS.sol, null);
      if (!s || !Array.isArray(s) || s.length === 0) {
        write(KEYS.sol, DEFAULT_SOLUCOES);
        return DEFAULT_SOLUCOES.slice();
      }
      return s;
    },
    getSolucoesAtivas: function () {
      return this.getSolucoes().filter(function (x) { return x.active !== false; });
    },
    saveSolucoes: function (arr) { write(KEYS.sol, arr); return arr; },
    upsertSolucao: function (sol) {
      var list = this.getSolucoes();
      if (!sol.id) sol.id = uid('sol');
      var idx = list.findIndex(function (x) { return x.id === sol.id; });
      if (idx >= 0) list[idx] = sol; else list.push(sol);
      write(KEYS.sol, list);
      return list;
    },
    removeSolucao: function (id) {
      var list = this.getSolucoes().filter(function (x) { return x.id !== id; });
      write(KEYS.sol, list);
      return list;
    },
    resetSolucoes: function () { write(KEYS.sol, DEFAULT_SOLUCOES); return DEFAULT_SOLUCOES.slice(); },

    // ---- Contatos (CRM) ----
    getContatos: function () { return read(KEYS.con, []); },
    addContato: function (obj) {
      var list = read(KEYS.con, []);
      var rec = Object.assign({ id: uid('con'), createdAt: new Date().toISOString(), origem: 'Formulário de contato' }, obj);
      list.unshift(rec);
      write(KEYS.con, list);
      return rec;
    },
    removeContato: function (id) {
      var list = read(KEYS.con, []).filter(function (x) { return x.id !== id; });
      write(KEYS.con, list);
      return list;
    },

    // ---- Conversas com a IA ----
    getConversas: function () { return read(KEYS.chat, []); },
    saveConversa: function (conv) {
      var list = read(KEYS.chat, []);
      if (!conv.id) conv.id = uid('chat');
      var idx = list.findIndex(function (x) { return x.id === conv.id; });
      conv.updatedAt = new Date().toISOString();
      if (idx >= 0) list[idx] = conv;
      else { conv.createdAt = new Date().toISOString(); list.unshift(conv); }
      write(KEYS.chat, list);
      return conv;
    },
    removeConversa: function (id) {
      var list = read(KEYS.chat, []).filter(function (x) { return x.id !== id; });
      write(KEYS.chat, list);
      return list;
    },

    // ---- Perfis de investidor ----
    getPerfis: function () { return read(KEYS.perfil, []); },
    addPerfil: function (obj) {
      var list = read(KEYS.perfil, []);
      var rec = Object.assign({ id: uid('perfil'), createdAt: new Date().toISOString() }, obj);
      list.unshift(rec);
      write(KEYS.perfil, list);
      return rec;
    },
  };

  window.ReddereStore = Store;
})();
