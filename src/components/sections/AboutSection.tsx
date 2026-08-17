import { Zap, HeartHandshake, Award, Leaf, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AboutSection() {
    const { t, lang } = useLanguage();

    const values = [
        {
            icon: Zap,
            titleKey: 'about.precision',
            descKey: 'about.precision.desc',
        },
        {
            icon: HeartHandshake,
            titleKey: 'about.clientFirst',
            descKey: 'about.clientFirst.desc',
        },
        {
            icon: Award,
            titleKey: 'about.excellence',
            descKey: 'about.excellence.desc',
        },
        {
            icon: Leaf,
            titleKey: 'about.innovation',
            descKey: 'about.innovation.desc',
        },
    ];

    const milestones = [
        { year: '2010', title: lang === 'th' ? 'ก่อตั้งบริษัท' : 'Founded', desc: lang === 'th' ? 'เริ่มต้นให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม' : 'Pioneered tailored industrial machinery leasing' },
        { year: '2016', title: lang === 'th' ? 'ขยายสู่การแพทย์ & โลจิสติกส์' : 'Expanded Sectors', desc: lang === 'th' ? 'เปิดสายสินเชื่ออุปกรณ์การแพทย์และยานพาหนะเชิงพาณิชย์' : 'Launched medical tech & commercial fleet financing' },
        { year: '2022', title: lang === 'th' ? 'ริเริ่ม Green Financing' : 'Green Loan Launch', desc: lang === 'th' ? 'สนับสนุนโครงการพลังงานสะอาดและโซลาร์เซลล์โรงงาน' : 'Incentivized solar energy & sustainable projects' },
        { year: '2026', title: lang === 'th' ? 'สินทรัพย์กว่า 2.5 หมื่นล้านบาท' : '฿25B+ Assets', desc: lang === 'th' ? 'ก้าวสู่ผู้นำด้านสินเชื่อและโซลูชันเงินทุนระดับสากล' : 'Trusted nationwide by over 5,000 corporate clients' },
    ];

    return (
        <section id="about" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t('about.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('about.title')} <span className="text-gradient-cyan">Agile Assets</span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('about.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Values 4-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-14">
                    {values.map((value, index) => (
                        <ScrollReveal
                            key={value.titleKey}
                            animation="fade-up"
                            delay={index * 100}
                            className="flex flex-col h-full"
                        >
                            <div className="group glass-card rounded-3xl p-6 sm:p-8 text-center border border-border/80 hover:border-sky-400/40 transition-all duration-300 flex flex-col items-center justify-between h-full">
                                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 text-sky-400 shadow-md">
                                    <value.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2.5 font-sans">
                                    {t(value.titleKey)}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t(value.descKey)}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Timeline / Heritage Story */}
                <ScrollReveal animation="zoom-in" delay={150}>
                    <div className="glass-card rounded-3xl p-8 sm:p-12 border border-sky-500/20 shadow-2xl">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-extrabold text-foreground font-sans">
                                {lang === 'th' ? 'เส้นทางการเติบโตและพัฒนาการ (2010 – 2026)' : 'Our Journey & Milestones (2010 – 2026)'}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-2">
                                {lang === 'th' ? 'กว่า 16 ปีแห่งความเชี่ยวชาญทางการเงินและวิศวกรรมเครื่องจักร' : 'Over 16 years of financial engineering & equipment expertise'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {milestones.map((m) => (
                                <div key={m.year} className="relative p-5 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                    <span className="text-2xl font-extrabold text-sky-400 font-sans block mb-1">
                                        {m.year}
                                    </span>
                                    <h4 className="text-sm font-bold text-foreground mt-2 mb-1">
                                        {m.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {m.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
