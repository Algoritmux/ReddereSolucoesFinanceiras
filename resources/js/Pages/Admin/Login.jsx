import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    const inpClass = 'w-full bg-rd-primary/60 border border-rd-gold/25 text-rd-cream text-[13.5px] px-3.5 py-2.5 rounded focus:outline-none focus:border-rd-gold transition-colors';

    return (
        <>
            <Head title="Login" />
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: '#0B1A22', color: '#EBE6E6', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-8">
                        <Link href="/" className="flex items-center gap-2.5">
                            <span className="font-kanit font-bold text-lg tracking-widest text-rd-cream">REDDERE</span>
                        </Link>
                    </div>

                    <div className="bg-rd-dark border border-rd-gold/16 rounded p-6 sm:p-7">
                        <h1 className="font-kanit font-semibold text-[20px] text-rd-cream mb-1">Painel do proprietário</h1>
                        <p className="text-[13.5px] text-rd-cream/60 mb-6">Entre com suas credenciais para continuar.</p>

                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">E-mail</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={inpClass}
                                    placeholder="seu@email.com"
                                    autoFocus
                                />
                                {errors.email && <p className="text-[12px] text-red-400 mt-1.5">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-[12px] font-semibold text-rd-cream/70 mb-2">Senha</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={inpClass}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-[12px] text-red-400 mt-1.5">{errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-2 text-[13px] text-rd-cream/60 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="accent-rd-gold"
                                />
                                Lembrar de mim
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-rd-gold text-rd-primary font-bold text-[14px] px-5 py-2.5 rounded border-none cursor-pointer hover:bg-rd-gold-light transition-colors disabled:opacity-60 mt-1"
                            >
                                {processing ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <Link href="/" className="text-[13px] text-rd-cream/50 font-medium hover:text-rd-gold transition-colors">
                            ← Voltar ao site
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
