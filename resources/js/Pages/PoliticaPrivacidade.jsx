import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const SECTIONS = [
    {
        title: '1. Dados que coletamos',
        body: [
            'Podemos coletar dados fornecidos diretamente por você, como nome, e-mail, telefone, assunto, mensagem, respostas ao Consultor On-line, informações preenchidas no RaioX financeiro, objetivo patrimonial, perfil de investimento e demais dados enviados por formulários do site.',
            'Também podemos coletar dados técnicos básicos de navegação, como data e hora de acesso, páginas visitadas, endereço IP, tipo de dispositivo, navegador e registros necessários para segurança, prevenção de abuso e melhoria do funcionamento do site.',
        ],
    },
    {
        title: '2. Finalidades de uso',
        body: [
            'Usamos seus dados para responder solicitações, organizar contatos comerciais, preparar atendimento consultivo, registrar interações feitas no site, operar o Consultor On-line, analisar informações enviadas no RaioX financeiro e melhorar nossos conteúdos, serviços e canais digitais.',
            'As informações financeiras ou patrimoniais enviadas pelo usuário são usadas para contextualizar um possível contato futuro. Elas não substituem uma reunião individual, análise documental ou recomendação formal feita por profissional habilitado.',
        ],
    },
    {
        title: '3. Base legal e consentimento',
        body: [
            'O tratamento dos dados pode ocorrer com base no consentimento do usuário, na execução de procedimentos preliminares relacionados a atendimento solicitado, no legítimo interesse da Reddere em responder contatos e proteger seus canais, ou no cumprimento de obrigações legais e regulatórias aplicáveis.',
            'Quando o tratamento depender de consentimento, você poderá revogá-lo pelos canais de contato indicados nesta política, observadas as hipóteses legais de retenção de dados.',
        ],
    },
    {
        title: '4. Compartilhamento de dados',
        body: [
            'A Reddere não vende dados pessoais. Podemos compartilhar informações com prestadores de tecnologia, hospedagem, segurança, ferramentas de CRM, comunicação, análise de dados e outros fornecedores necessários para operar o site e prestar atendimento.',
            'Também poderemos compartilhar dados quando necessário para cumprir obrigações legais, ordens de autoridades competentes, proteção de direitos, prevenção de fraude ou segurança dos usuários e da empresa.',
        ],
    },
    {
        title: '5. Segurança e retenção',
        body: [
            'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acessos não autorizados, perda, alteração, divulgação indevida ou uso incompatível com as finalidades informadas.',
            'Os dados são mantidos pelo tempo necessário ao atendimento das finalidades descritas, cumprimento de obrigações legais ou defesa de direitos. Quando não forem mais necessários, poderão ser eliminados, anonimizados ou mantidos conforme permitido pela legislação.',
        ],
    },
    {
        title: '6. Direitos do titular',
        body: [
            'Nos termos da legislação aplicável, você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informações sobre compartilhamento, revogação de consentimento e revisão de decisões automatizadas, quando cabível.',
            'As solicitações serão avaliadas conforme a natureza do pedido, a identidade do solicitante e as obrigações legais ou regulatórias aplicáveis.',
        ],
    },
    {
        title: '7. Cookies e tecnologias semelhantes',
        body: [
            'Podemos usar cookies e tecnologias semelhantes para funcionamento básico do site, segurança, preferências, medição de desempenho e melhoria da experiência. Você pode gerenciar cookies nas configurações do seu navegador, ciente de que alguns recursos podem ser afetados.',
        ],
    },
    {
        title: '8. Contato',
        body: [
            'Para dúvidas, solicitações sobre dados pessoais ou exercício de direitos, entre em contato pelo e-mail contato@reddere.com.br ou pelos canais indicados no site.',
        ],
    },
    {
        title: '9. Atualizações desta política',
        body: [
            'Esta Política de Privacidade poderá ser atualizada para refletir mudanças legais, regulatórias, técnicas ou operacionais. A versão vigente será sempre publicada nesta página.',
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

export default function PoliticaPrivacidade() {
    return (
        <MainLayout>
            <Head title="Política de Privacidade" />

            <section className="relative pt-[160px] pb-16 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[900px] mx-auto relative">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">PRIVACIDADE</div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,56px)] leading-tight tracking-tight animate-rd-rise">
                        Política de Privacidade
                    </h1>
                    <p className="text-[17px] leading-relaxed text-rd-cream/72 mt-5 max-w-[680px]">
                        Esta política explica como a Reddere Soluções Financeiras coleta, usa, armazena e protege dados pessoais enviados por usuários em seus canais digitais.
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
