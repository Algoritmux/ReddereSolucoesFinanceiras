import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const TEAM = [
    {
        name: 'Ricardo Mendes',
        role: 'CEO & Fundador',
        certs: ['CFP®', 'CEA'],
        bio: 'Mais de 20 anos de mercado financeiro. Especialista em planejamento patrimonial e gestão de grandes fortunas.',
        initials: 'RM',
    },
    {
        name: 'Ana Carvalho',
        role: 'Diretora de Investimentos',
        certs: ['CGA', 'CFA'],
        bio: 'Gestora experiente com passagem por grandes bancos de investimento. Foco em alocação estratégica e risco.',
        initials: 'AC',
    },
    {
        name: 'Bruno Ferreira',
        role: 'Especialista em Previdência',
        certs: ['CFP®', 'CPA-20'],
        bio: 'Especialista em planejamento de aposentadoria, PGBL/VGBL e integração com INSS.',
        initials: 'BF',
    },
    {
        name: 'Juliana Rocha',
        role: 'Consultora de Seguros',
        certs: ['SUSEP'],
        bio: 'Consultora especializada em seguros de vida, previdência e proteção patrimonial para famílias e empresários.',
        initials: 'JR',
    },
    {
        name: 'Marcos Oliveira',
        role: 'Especialista em Sucessão',
        certs: ['OAB', 'CFP®'],
        bio: 'Advogado e planejador financeiro. Estruturação de holdings familiares, testamentos e planejamento sucessório.',
        initials: 'MO',
    },
    {
        name: 'Patrícia Lima',
        role: 'Consultora Internacional',
        certs: ['CFP®', 'Series 7'],
        bio: 'Especialista em diversificação internacional, câmbio e investimentos fora do Brasil.',
        initials: 'PL',
    },
];

const VALUES = [
    {
        title: 'Lealdade',
        desc: 'Nosso único compromisso é com o seu interesse. Atuamos como fiduciários — sem conflitos de comissão ou produto empurrado.',
    },
    {
        title: 'Disciplina',
        desc: 'Estratégias consistentes, revisadas periodicamente. Não reagimos a ruídos de mercado — seguimos o plano.',
    },
    {
        title: 'Transparência',
        desc: 'Você sabe exatamente o que está investindo, por quê e quanto estamos ganhando. Sem letra miúda.',
    },
    {
        title: 'Excelência',
        desc: 'Equipe certificada, atualizada e comprometida com as melhores práticas do mercado financeiro nacional e internacional.',
    },
];

export default function Time() {
    return (
        <MainLayout>
            <Head title="Time" />

            {/* HERO */}
            <section className="relative pt-[160px] pb-20 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[1240px] mx-auto relative text-center">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">NOSSO TIME</div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,60px)] leading-tight tracking-tight max-w-[820px] mx-auto animate-rd-rise">
                        Profissionais dedicados ao seu patrimônio.
                    </h1>
                    <p className="text-[18px] leading-relaxed text-rd-cream/75 mt-5 max-w-[620px] mx-auto">
                        Cada membro do nosso time foi escolhido pela competência técnica e, acima de tudo, pelo alinhamento com os valores que nos definem.
                    </p>
                </div>
            </section>

            {/* NOSSOS VALORES */}
            <section className="bg-rd-dark py-20 px-5 md:px-8 border-y border-rd-gold/16">
                <div className="max-w-[1240px] mx-auto">
                    <div className="text-center mb-12">
                        <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">O QUE NOS GUIA</div>
                        <h2 className="font-kanit font-bold text-[clamp(28px,3.2vw,40px)] leading-tight text-rd-cream tracking-tight">
                            Nossos valores em prática
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {VALUES.map((v) => (
                            <div key={v.title} className="bg-[rgba(15,85,100,.25)] border border-rd-gold/18 rounded p-6 md:p-8">
                                <div className="w-10 h-10 border border-rd-gold/50 rounded flex items-center justify-center mb-4">
                                    <div className="w-4 h-4 bg-rd-gold" style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />
                                </div>
                                <h3 className="font-kanit font-semibold text-xl text-rd-cream mb-2">{v.title}</h3>
                                <p className="text-[15px] leading-relaxed text-rd-cream/68">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIME */}
            <section className="bg-rd-primary py-24 px-5 md:px-8">
                <div className="max-w-[1240px] mx-auto">
                    <div className="text-center mb-14">
                        <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-3">ESPECIALISTAS</div>
                        <h2 className="font-kanit font-bold text-[clamp(28px,3.2vw,40px)] leading-tight text-rd-cream tracking-tight">
                            Quem cuida do seu patrimônio
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEAM.map((member) => (
                            <div key={member.name} className="bg-[rgba(15,85,100,.3)] border border-rd-gold/16 rounded p-6 md:p-7 transition-all hover:border-rd-gold/40 hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-full bg-rd-teal border-2 border-rd-gold/50 flex items-center justify-center font-kanit font-bold text-rd-gold text-xl shrink-0">
                                        {member.initials}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[15px] text-rd-cream">{member.name}</div>
                                        <div className="text-[12.5px] text-rd-gold mt-0.5">{member.role}</div>
                                    </div>
                                </div>
                                <p className="text-[14px] leading-relaxed text-rd-cream/68 mb-4">{member.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.certs.map((cert) => (
                                        <span key={cert} className="text-[11px] font-bold text-rd-gold bg-rd-gold/10 border border-rd-gold/25 px-2.5 py-1 rounded-sm">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-rd-teal py-20 px-5 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[680px] mx-auto text-center relative">
                    <h2 className="font-kanit font-bold text-[clamp(28px,3.6vw,42px)] leading-tight text-rd-cream tracking-tight">
                        Fale com um de nossos especialistas
                    </h2>
                    <p className="text-[17px] text-rd-cream/78 mt-4">
                        A primeira conversa é sem compromisso. Entendemos o seu cenário e mostramos o que faz sentido para você.
                    </p>
                    <Link
                        href="/contato"
                        className="inline-flex items-center gap-2.5 mt-8 bg-rd-gold text-rd-primary font-bold text-[16px] px-5 md:px-8 py-4 rounded-sm transition-all hover:bg-rd-gold-light hover:-translate-y-0.5"
                    >
                        Agendar uma conversa →
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
