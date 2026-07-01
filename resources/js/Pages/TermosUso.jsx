import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SECTIONS = [
    {
        title: '1. Aceitação dos termos',
        body: [
            'Ao acessar ou utilizar o site da Reddere Soluções Financeiras, você declara ter lido, compreendido e concordado com estes Termos de Uso e com a Política de Privacidade.',
            'Caso não concorde com estes termos, recomendamos que interrompa a navegação e não utilize os formulários, ferramentas ou conteúdos disponíveis no site.',
        ],
    },
    {
        title: '2. Natureza das informações',
        body: [
            'Os conteúdos do site, artigos, simuladores, páginas de soluções, Consultor On-line e RaioX financeiro têm finalidade informativa, educacional e de relacionamento comercial.',
            'Nenhuma informação exibida no site deve ser interpretada como recomendação individual de investimento, promessa de rentabilidade, oferta pública de valores mobiliários, consultoria jurídica, tributária ou sucessória personalizada.',
        ],
    },
    {
        title: '3. Uso do Consultor On-line e do RaioX financeiro',
        body: [
            'As respostas do Consultor On-line e os resultados do RaioX financeiro dependem das informações fornecidas pelo usuário e podem conter estimativas, classificações simplificadas e orientações gerais.',
            'Decisões financeiras devem considerar análise individual, documentação, perfil completo, objetivos, riscos, legislação aplicável e conversa com profissional qualificado.',
        ],
    },
    {
        title: '4. Responsabilidades do usuário',
        body: [
            'O usuário se compromete a fornecer informações verdadeiras, atualizadas e compatíveis com a finalidade dos formulários, além de não utilizar o site para fins ilícitos, abusivos, fraudulentos ou que possam prejudicar a Reddere, terceiros ou a disponibilidade dos sistemas.',
            'É proibido tentar acessar áreas restritas sem autorização, interferir no funcionamento do site, inserir códigos maliciosos, copiar conteúdo de forma indevida ou usar marcas, imagens e materiais da Reddere sem permissão.',
        ],
    },
    {
        title: '5. Propriedade intelectual',
        body: [
            'Textos, imagens, marcas, identidade visual, layout, códigos, conteúdos, materiais e demais elementos do site pertencem à Reddere ou a terceiros licenciantes, quando aplicável.',
            'O acesso ao site não concede licença para reprodução, distribuição, modificação, exploração comercial ou uso de qualquer material sem autorização prévia e expressa.',
        ],
    },
    {
        title: '6. Links e serviços de terceiros',
        body: [
            'O site pode conter links, integrações ou ferramentas de terceiros. A Reddere não controla esses ambientes externos e não se responsabiliza por seus conteúdos, políticas, disponibilidade ou práticas de segurança.',
            'Ao acessar serviços de terceiros, o usuário deve consultar os termos e políticas correspondentes.',
        ],
    },
    {
        title: '7. Limitação de responsabilidade',
        body: [
            'A Reddere emprega esforços para manter as informações atualizadas e o site disponível, mas não garante ausência de erros, interrupções, falhas técnicas, indisponibilidades temporárias ou inadequação do conteúdo a uma situação específica do usuário.',
            'A utilização das informações do site ocorre por conta do usuário, que deve buscar avaliação profissional antes de tomar decisões financeiras, patrimoniais, sucessórias, tributárias ou de investimento.',
        ],
    },
    {
        title: '8. Alterações nos termos',
        body: [
            'A Reddere poderá atualizar estes Termos de Uso a qualquer momento para refletir mudanças no site, nos serviços, em requisitos legais ou em práticas operacionais. A versão vigente será publicada nesta página.',
        ],
    },
    {
        title: '9. Contato',
        body: [
            'Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail contato@reddere.com.br ou pelos canais indicados no site.',
        ],
    },
];

function LegalSection({ title, body }) {
    return (
        <section className="border-b border-rd-gold/12 pb-7 last:border-b-0 last:pb-0">
            <h2 className="font-kanit font-semibold text-[24px] text-rd-cream leading-snug">{title}</h2>
            <div className="mt-3 flex flex-col gap-3">
                {body.map((paragraph) => (
                    <p key={paragraph} className="text-[15.5px] leading-relaxed text-rd-cream/72">{paragraph}</p>
                ))}
            </div>
        </section>
    );
}

export default function TermosUso() {
    return (
        <MainLayout>
            <Head title="Termos do Usuário" />

            <section className="relative pt-[160px] pb-16 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[900px] mx-auto relative">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">TERMOS</div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,56px)] leading-tight tracking-tight animate-rd-rise">
                        Termos do Usuário
                    </h1>
                    <p className="text-[17px] leading-relaxed text-rd-cream/72 mt-5 max-w-[680px]">
                        Estes termos definem as condições de acesso e uso do site, conteúdos, ferramentas e canais digitais da Reddere Soluções Financeiras.
                    </p>
                    <p className="text-[12.5px] text-rd-cream/45 mt-4">Última atualização: 01 de julho de 2026</p>
                </div>
            </section>

            <section className="bg-rd-primary px-5 md:px-8 pb-20">
                <div className="max-w-[900px] mx-auto bg-rd-dark border border-rd-gold/16 rounded p-5 md:p-9 flex flex-col gap-7">
                    {SECTIONS.map((section) => (
                        <LegalSection key={section.title} {...section} />
                    ))}

                    <div className="pt-2">
                        <Link href="/contato" className="inline-flex bg-rd-gold text-rd-primary font-bold text-[14px] px-6 py-3 rounded-sm transition-all hover:bg-rd-gold-light">
                            Falar com a Reddere
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
