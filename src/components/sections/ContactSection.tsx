import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { usePageContent } from '@/lib/usePageContent';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { formService } from '@/services/formService';
import { useSections } from '@/lib/pageSections';
import { homeContactSections } from '@/data/pageSections/homeContact';

export function ContactSection() {
    const { content } = usePageContent('home', DEFAULT_PAGE_CONTENTS['home']);
    const section = useSections(content, homeContactSections);
    const contactCta = section('contact-cta');

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const { send, guardFields } = useLeadSubmit();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        const result = await send((meta) =>
            formService.submitInquiry({
                source: 'home-contact',
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                company: formData.company,
                message: formData.message,
            }, meta)
        );
        setIsVerifying(false);
        if (!result) return;
        setSubmitted(true);
        setFormData({
            name: '',
            company: '',
            phone: '',
            email: '',
            message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
    };

    if (contactCta.hidden) return null;
    return (
        <section id="contact" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Background Image with Dark Blue Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={contactCta.t('img01')}
                    alt="Business Inquiries"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#091b35]/90 via-[#07172e]/95 to-[#040e1e]/98" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wider font-sans uppercase mb-3">
                            {contactCta.t('t02')}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                            {contactCta.t('t03')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Form Card */}
                <ScrollReveal animation="zoom-in" delay={100}>
                    <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 border border-white/15 shadow-2xl">
                        {submitted && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm flex items-center justify-center gap-3 animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <span>{contactCta.t('t04')}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            {/* Row 1: Name & Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                        aria-label={contactCta.t('t05')}
                                        placeholder={contactCta.t('t05')}
                                        disabled={isVerifying}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                        aria-label={contactCta.t('t06')}
                                        placeholder={contactCta.t('t06')}
                                        disabled={isVerifying}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone & Company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                        aria-label={contactCta.t('t07')}
                                        placeholder={contactCta.t('t07')}
                                        disabled={isVerifying}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                        aria-label={contactCta.t('t08')}
                                        placeholder={contactCta.t('t08')}
                                        disabled={isVerifying}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Message */}
                            <div>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all resize-none"
                                    aria-label={contactCta.t('t09')}
                                    placeholder={contactCta.t('t09')}
                                    disabled={isVerifying}
                                />
                            </div>

                            {guardFields}

                            {/* Submit Button */}
                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all min-w-[200px] btn-dynamic-theme"
                                >
                                    {isVerifying ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                                            <span>{contactCta.t('t10')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{contactCta.t('t11')}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
