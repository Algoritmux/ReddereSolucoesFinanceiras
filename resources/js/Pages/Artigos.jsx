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

function ArticleCard({ article }) {
    const image = articleImage(article);

    return (
        <Link
            href={`/artigos/${article.slug}`}
            className="group flex flex-col bg-rd-dark border border-rd-gold/16 rounded overflow-hidden hover:border-rd-gold/45 transition-all"
        >
            <div className="relative aspect-[16/10] bg-[rgba(15,85,100,.35)] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-gold-sm" />
                        <div className="relative w-12 h-12 border-[1.5px] border-rd-gold flex items-center justify-center rounded">
                            <div className="w-5 h-5 bg-rd-gold" style={{ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }} />
                        </div>
                    </div>
                )}
                {article.category && (
                    <span className="absolute top-3 left-3 text-[10.5px] font-bold text-rd-gold bg-rd-dark/85 border border-rd-gold/30 px-2.5 py-1 rounded-sm tracking-wide">
                        {article.category.toUpperCase()}
                    </span>
                )}
            </div>
            <div className="flex-1 flex flex-col p-5">
                <h3 className="font-kanit font-semibold text-[18px] text-rd-cream leading-snug group-hover:text-rd-gold transition-colors">
                    {article.title}
                </h3>
                {article.excerpt && (
                    <p className="text-[13.5px] text-rd-cream/60 leading-relaxed mt-2.5 line-clamp-3">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-2.5 mt-auto pt-4 text-[12px] text-rd-cream/40">
                    {article.author && <span>{article.author}</span>}
                    {article.author && article.published_at && <span>·</span>}
                    {article.published_at && <span>{fmtDate(article.published_at)}</span>}
                </div>
            </div>
        </Link>
    );
}

export default function Artigos({ articles = [] }) {
    return (
        <MainLayout>
            <Head title="Artigos" />

            {/* HERO */}
            <section className="relative pt-[160px] pb-16 px-5 md:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold pointer-events-none" />
                <div className="max-w-[1240px] mx-auto relative">
                    <div className="text-xs tracking-[2.5px] font-bold text-rd-gold mb-4">ARTIGOS &amp; INSIGHTS</div>
                    <h1 className="font-kanit font-bold text-[clamp(34px,5vw,56px)] leading-[1.05] tracking-tight max-w-[780px] animate-rd-rise">
                        Conteúdo para decidir com mais clareza.
                    </h1>
                    <p className="text-[18px] leading-relaxed text-rd-cream/75 mt-5 max-w-[600px]">
                        Análises, tendências e reflexões sobre investimentos, planejamento e proteção patrimonial.
                    </p>
                </div>
            </section>

            {/* LISTA */}
            <section className="bg-rd-primary px-5 md:px-8 pb-20">
                <div className="max-w-[1240px] mx-auto">
                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 text-rd-cream/35 text-[15px]">
                            Em breve, novos artigos por aqui.
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
