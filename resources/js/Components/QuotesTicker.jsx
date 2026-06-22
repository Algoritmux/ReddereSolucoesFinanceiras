const QUOTES = [
    { label: 'IBOV', value: '134.820', change: '+1,42%' },
    { label: 'CDI', value: '10,65%', change: 'a.a.' },
    { label: 'IPCA', value: '4,83%', change: 'a.a.' },
    { label: 'USD/BRL', value: 'R$ 5,22', change: '+0,31%' },
    { label: 'EUR/BRL', value: 'R$ 5,69', change: '-0,12%' },
    { label: 'SELIC', value: '10,75%', change: 'a.a.' },
    { label: 'SMLL11', value: '2.318', change: '+0,87%' },
    { label: 'OURO', value: 'R$ 432', change: '+0,54%' },
    { label: 'S&P500', value: '5.871', change: '+0,22%' },
    { label: 'BOVA11', value: '134,82', change: '+1,42%' },
    { label: 'IFIX', value: '3.412', change: '+0,19%' },
    { label: 'BTC/USD', value: '95.400', change: '+2,11%' },
];

const DOUBLED = [...QUOTES, ...QUOTES];

export default function QuotesTicker() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[120] h-9 bg-rd-black border-b border-rd-gold/20 flex items-center overflow-hidden">
            <div className="flex-1 overflow-hidden h-full flex items-center mask-fade-x">
                <div className="inline-flex gap-[34px] whitespace-nowrap pl-[34px] animate-rd-marquee">
                    {DOUBLED.map((q, i) => (
                        <span key={i} className="inline-flex items-center gap-2 font-mono text-xs">
                            <span className="text-rd-cream/50 font-semibold tracking-[.5px]">{q.label}</span>
                            <span className="text-rd-cream font-semibold">{q.value}</span>
                            <span className="text-rd-gold font-bold">{q.change}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
