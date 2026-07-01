import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-rd-black border-t border-rd-gold/16 py-14 px-5 md:px-8">
            <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="sm:col-span-2 lg:col-span-1">
                    <img
                        src="/images/footer-logo.png"
                        alt="Reddere Soluções Financeiras"
                        className="h-32 md:h-36 w-auto mb-4"
                    />
                    <p className="text-sm text-rd-cream/55 leading-relaxed max-w-[220px]">
                        Vencer com Lealdade. Soluções financeiras completas para proteger e multiplicar seu patrimônio.
                    </p>
                </div>

                <div>
                    <div className="text-[11px] tracking-[2px] font-bold text-rd-gold mb-5">NAVEGAÇÃO</div>
                    <ul className="flex flex-col gap-3">
                        {[
                            { href: '/#sobre', label: 'Sobre' },
                            { href: '/solucoes', label: 'Soluções' },
                            { href: '/consultor', label: 'Consultor On-line' },
                            { href: '/raiox-financeiro', label: 'RaioX Financeiro' },
                            { href: '/artigos', label: 'Artigos' },
                            { href: '/time', label: 'Time' },
                            { href: '/contato', label: 'Contato' },
                        ].map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="text-sm text-rd-cream/60 hover:text-rd-gold transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="text-[11px] tracking-[2px] font-bold text-rd-gold mb-5">SOLUÇÕES</div>
                    <ul className="flex flex-col gap-3">
                        {[
                            'Consultoria de Investimentos',
                            'Planejamento Financeiro',
                            'Planejamento Sucessório',
                            'Seguro de Vida',
                            'Previdência Privada',
                            'Câmbio e Internacional',
                        ].map((s) => (
                            <li key={s}>
                                <Link href="/solucoes" className="text-sm text-rd-cream/60 hover:text-rd-gold transition-colors">
                                    {s}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="text-[11px] tracking-[2px] font-bold text-rd-gold mb-5">CONTATO</div>
                    <ul className="flex flex-col gap-3 text-sm text-rd-cream/60">
                        <li>contato@reddere.com.br</li>
                        <li>+55 (11) 9000-0000</li>
                        <li>São Paulo, SP</li>
                        <li className="pt-2 border-t border-rd-cream/8">
                            <Link href="/politica-de-privacidade" className="hover:text-rd-gold transition-colors">
                                Política de Privacidade
                            </Link>
                        </li>
                        <li>
                            <Link href="/termos-do-usuario" className="hover:text-rd-gold transition-colors">
                                Termos do Usuário
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto mt-10 pt-6 border-t border-rd-cream/8 flex flex-col md:flex-row md:flex-wrap justify-between items-start md:items-center gap-4">
                <p className="text-xs text-rd-cream/35">
                    © {new Date().getFullYear()} Reddere Soluções Financeiras. Todos os direitos reservados.
                </p>
                <p className="text-xs text-rd-cream/35">
                    Regulada e supervisionada pela CVM · ANBIMA · CFP®
                </p>
                <Link href="/admin" className="text-xs text-rd-cream/35 hover:text-rd-gold transition-colors">
                    Área administrativa
                </Link>
            </div>
        </footer>
    );
}
