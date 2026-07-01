import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

function fmtDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function articleImage(article) {
    if (!article?.cover_image) return null;
    return article.cover_image.startsWith('/') ? article.cover_image : `/storage/${article.cover_image}`;
}

export default function ArtigoShow({ article, related = [] }) {
    const paragraphs = (article.content || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const image = articleImage(article);

    return (
        <MainLayout>
            <Head title={article.title} />

            {/* HERO */}
            <section className="relative pt-[160px] pb-12 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[820px] mx-auto relative">
                    <Link href="/artigos" className="text-[13px] font-semibold text-rd-gold hover:text-rd-gold-light transition-colors">
                        ← Todos os artigos
                    </Link>
                    {article.category && (
                        <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mt-5 mb-3">{article.category.toUpperCase()}</div>
                    )}
                    <h1 className="font-kanit font-bold text-[clamp(28px,4.2vw,44px)] leading-[1.12] tracking-tight animate-rd-rise">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-2.5 mt-5 text-[13.5px] text-rd-cream/55">
                        {article.author && <span className="font-medium text-rd-cream/75">{article.author}</span>}
                        {article.author && article.published_at && <span>·</span>}
                        {article.published_at && <span>{fmtDate(article.published_at)}</span>}
                    </div>
                </div>
            </section>

            {image && (
                <section className="px-5 md:px-8">
                    <div className="max-w-[980px] mx-auto rounded overflow-hidden border border-rd-gold/16">
                        <img src={image} alt={article.title} className="w-full h-auto object-cover" />
                    </div>
                </section>
            )}

            {/* CONTEÚDO */}
            <section className="bg-rd-primary px-5 md:px-8 py-14">
                <div className="max-w-[780px] mx-auto flex flex-col gap-5">
                    {paragraphs.map((p, i) => (
                        <p key={i} className="text-[17px] leading-relaxed text-rd-cream/82">{p}</p>
                    ))}
                </div>
            </section>

            {/* RELACIONADOS */}
            {related.length > 0 && (
                <section className="bg-rd-dark border-t border-rd-gold/16 px-5 md:px-8 py-16">
                    <div className="max-w-[980px] mx-auto">
                        <div className="text-[11px] tracking-[2px] font-bold text-rd-gold mb-6">LEIA TAMBÉM</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link
                                    key={r.id}
                                    href={`/artigos/${r.slug}`}
                                    className="group block bg-rd-primary border border-rd-gold/16 rounded p-5 hover:border-rd-gold/45 transition-all"
                                >
                                    <h4 className="font-kanit font-semibold text-[15.5px] text-rd-cream leading-snug group-hover:text-rd-gold transition-colors">
                                        {r.title}
                                    </h4>
                                    {r.published_at && (
                                        <div className="text-[12px] text-rd-cream/40 mt-3">{fmtDate(r.published_at)}</div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-rd-teal py-16 px-5 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[680px] mx-auto text-center relative">
                    <h2 className="font-kanit font-bold text-[clamp(24px,3.2vw,36px)] leading-tight text-rd-cream tracking-tight">
                        Quer uma orientação para o seu momento?
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center mt-7">
                        <Link
                            href="/contato"
                            className="bg-rd-gold text-rd-primary font-bold text-[14px] px-7 py-3.5 rounded-sm transition-all hover:bg-rd-gold-light"
                        >
                            Fale com um especialista
                        </Link>
                        <Link
                            href="/artigos"
                            className="bg-transparent text-rd-cream font-semibold text-[14px] px-7 py-3.5 rounded-sm border border-rd-cream/30 transition-all hover:border-rd-cream/60"
                        >
                            Ver mais artigos
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
