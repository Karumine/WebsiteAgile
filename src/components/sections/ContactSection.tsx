import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ContactSection() {
    const { settings } = useSiteSettings();
    const { companyInfo } = settings;
    const { t, lang } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        productType: 'Industrial Machinery',
        amount: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        // Simulation delay for security & submission
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setIsVerifying(false);
        setSubmitted(true);
        setFormData({
            name: '',
            company: '',
            phone: '',
            email: '',
            productType: 'Industrial Machinery',
            amount: '',
            message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section id="contact" className="py-16 lg:py-20 relative overflow-hidden bg-background">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-400/20 text-xs font-semibold text-sky-400 mb-4">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t('contact.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4 font-sans">
                            {t('contact.title')}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {t('contact.subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Contact Info & Headquarters */}
                    <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 space-y-6">
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-500/20 space-y-6">
                            <h3 className="text-xl font-bold text-foreground font-sans">
                                {t('contact.info')}
                            </h3>

                            <div className="space-y-4">
                                <a
                                    href={`tel:${companyInfo.phone}`}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 hover:bg-sky-500/15 border border-sky-500/15 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                                            {t('contact.phone')}
                                        </p>
                                        <p className="text-sm font-bold text-foreground mt-0.5 group-hover:text-sky-400 transition-colors">
                                            {companyInfo.phone}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${companyInfo.email}`}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 hover:bg-sky-500/15 border border-sky-500/15 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                                            {t('contact.email')}
                                        </p>
                                        <p className="text-sm font-bold text-foreground mt-0.5 group-hover:text-sky-400 transition-colors">
                                            {companyInfo.email}
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/15">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                                            {t('contact.address')}
                                        </p>
                                        <p className="text-xs text-foreground/90 font-medium mt-0.5 leading-relaxed">
                                            {companyInfo.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border/80">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-sky-400" />
                                <h4 className="text-base font-bold text-foreground font-sans">
                                    {t('contact.hours')}
                                </h4>
                            </div>
                            <div className="space-y-2 text-xs text-muted-foreground">
                                <p className="flex justify-between">
                                    <span>{t('contact.hours.weekday')}</span>
                                    <span className="font-semibold text-emerald-400">Open</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>{t('contact.hours.saturday')}</span>
                                    <span>Closed</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>{t('contact.hours.sunday')}</span>
                                    <span>Closed</span>
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Comprehensive Application Form */}
                    <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7">
                        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-500/25 shadow-2xl">
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 font-sans">
                                {t('contact.form.title')}
                            </h3>

                            {submitted && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 animate-fade-in">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                    <span>{t('contact.form.success')}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.name')} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            placeholder={t('contact.form.namePlaceholder')}
                                            disabled={isVerifying}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.phone')} *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            placeholder="081-234-5678"
                                            disabled={isVerifying}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.email')} *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            placeholder="yourname@company.com"
                                            disabled={isVerifying}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.company')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            placeholder={t('contact.form.companyPlaceholder')}
                                            disabled={isVerifying}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.productType')}
                                        </label>
                                        <select
                                            name="productType"
                                            value={formData.productType}
                                            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            disabled={isVerifying}
                                        >
                                            <option value="Industrial Machinery">{lang === 'th' ? 'สินเชื่อเครื่องจักรอุตสาหกรรม' : 'Industrial Machinery'}</option>
                                            <option value="Commercial Fleet">{lang === 'th' ? 'สินเชื่อยานพาหนะเชิงพาณิชย์' : 'Commercial Fleet'}</option>
                                            <option value="Medical Equipment">{lang === 'th' ? 'สินเชื่อเครื่องมือแพทย์' : 'Medical Equipment'}</option>
                                            <option value="Clean Energy & Solar">{lang === 'th' ? 'สินเชื่อพลังงานสะอาด & Solar' : 'Clean Energy & Solar'}</option>
                                            <option value="Factoring">{lang === 'th' ? 'สินเชื่อหมุนเวียนธุรกิจ (Factoring)' : 'Factoring'}</option>
                                            <option value="Other">{lang === 'th' ? 'ปรึกษาการเงินรูปแบบอื่น' : 'Other'}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            {t('contact.form.amount')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                                            placeholder="e.g. 5,000,000"
                                            disabled={isVerifying}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                        {t('contact.form.message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all resize-none"
                                        placeholder={t('contact.form.messagePlaceholder')}
                                        disabled={isVerifying}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all duration-200 glow-cyan"
                                >
                                    {isVerifying ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            <span>กำลังส่งข้อมูล...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{t('contact.form.submit')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
