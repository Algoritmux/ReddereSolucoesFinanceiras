import QuotesTicker from '@/Components/QuotesTicker';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-rd-primary overflow-x-hidden">
            <QuotesTicker />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
