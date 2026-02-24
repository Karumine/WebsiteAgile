import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { InterestRates } from '@/components/sections/InterestRates';
import { NewsFeed } from '@/components/sections/NewsFeed';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <HeroBanner />
                <InterestRates />
                <NewsFeed />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
