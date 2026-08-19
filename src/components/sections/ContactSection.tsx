import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ContactSection() {
    const { lang } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        // Simulation delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setIsVerifying(false);
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

    return (
        <section id="contact" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Background Image with Dark Blue Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
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
                            BUSINESS PARTNERSHIP INQUIRIES
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                            {lang === 'th'
                                ? 'ติดต่อเราเพื่อปรึกษาการลงทุน โซลูชันทางการเงิน และสินเชื่อเครื่องจักรสำหรับธุรกิจคุณ'
                                : 'Contact our financial specialists for bespoke equipment financing and strategic enterprise capital solutions.'}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Form Card */}
                <ScrollReveal animation="zoom-in" delay={100}>
                    <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 border border-white/15 shadow-2xl">
                        {submitted && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm flex items-center justify-center gap-3 animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <span>{lang === 'th' ? 'ส่งข้อความเรียบรธ์แล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด' : 'Thank you! Your message has been sent successfully.'}</span>
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
                                        placeholder={lang === 'th' ? 'ชื่อ - นามสกุล *' : 'Full Name *'}
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
                                        placeholder={lang === 'th' ? 'อีเมล *' : 'Email Address *'}
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
                                        placeholder={lang === 'th' ? 'เบอร์โทรศัพท์ *' : 'Phone Number *'}
                                        disabled={isVerifying}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-white/30 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                                        placeholder={lang === 'th' ? 'ชื่อบริษัท / องค์กร' : 'Company Name'}
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
                                    placeholder={lang === 'th' ? 'ข้อความ หรือรายละเอียดโครงการที่ต้องการปรึกษา...' : 'Project details or consultation message...'}
                                    disabled={isVerifying}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-sky-400/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all min-w-[200px]"
                                >
                                    {isVerifying ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                                            <span>{lang === 'th' ? 'กำลังส่งข้อมูล...' : 'Sending...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{lang === 'th' ? 'ส่งข้อความ' : 'Send Message'}</span>
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
