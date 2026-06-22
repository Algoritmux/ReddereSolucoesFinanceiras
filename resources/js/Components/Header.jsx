import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const NAV_LINKS = [
    { href: '/#sobre', label: 'Sobre' },
    { href: '/solucoes', label: 'Soluções' },
    { href: '/consultor', label: 'Consultor On-line' },
    { href: '/time', label: 'Time' },
];

export default function Header() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const headerClass = scrolled
        ? 'bg-rd-black/95 backdrop-blur-md shadow-lg border-b border-rd-gold/10'
        : 'bg-transparent';

    return (
        <header className={`fixed top-9 left-0 right-0 z-[110] transition-all duration-300 ${headerClass}`}>
            <div className="max-w-[1240px] mx-auto px-8 h-[76px] flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/reddere-mark.png"
                        alt="Reddere Investimentos"
                        className="h-10 w-auto block"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '<span class="font-kanit font-bold text-xl text-rd-cream tracking-widest">REDDERE</span>';
                        }}
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-[30px]">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[14.5px] font-medium transition-colors duration-200 hover:text-rd-gold ${
                                url === link.href ? 'text-rd-gold' : 'text-rd-cream/85'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contato"
                        className="text-[14px] font-semibold text-rd-primary bg-rd-gold px-5 py-[11px] rounded-sm transition-all duration-200 hover:bg-rd-gold-light hover:-translate-y-px"
                    >
                        Fale com um especialista
                    </Link>
                </nav>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 bg-transparent border-none cursor-pointer"
                    aria-label="Menu"
                >
                    <div className="w-6 h-0.5 bg-rd-cream my-[5px]" />
                    <div className="w-6 h-0.5 bg-rd-cream my-[5px]" />
                    <div className="w-6 h-0.5 bg-rd-cream my-[5px]" />
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-rd-dark border-t border-rd-gold/20 px-8 py-[18px] flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-[11px] font-medium border-b border-rd-cream/7 text-rd-cream/85"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contato"
                        onClick={() => setMenuOpen(false)}
                        className="py-[11px] font-medium text-rd-gold"
                    >
                        Fale com um especialista →
                    </Link>
                </div>
            )}
        </header>
    );
}
