import { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function ContactSection() {
    const { settings } = useSiteSettings();
    const { companyInfo } = settings;
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {t('contact.title')}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-6">{t('contact.info')}</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Phone, label: t('contact.phone'), value: companyInfo.phone },
                                    { icon: Mail, label: t('contact.email'), value: companyInfo.email },
                                    { icon: MapPin, label: t('contact.address'), value: companyInfo.address },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4 glass rounded-xl p-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                                            <p className="text-sm text-foreground font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass rounded-xl p-6">
                            <h4 className="text-sm font-semibold text-foreground mb-2">{t('contact.hours')}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>{t('contact.hours.weekday')}</p>
                                <p>{t('contact.hours.saturday')}</p>
                                <p>{t('contact.hours.sunday')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-foreground mb-6">{t('contact.form.title')}</h3>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                {t('contact.form.success')}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">{t('contact.form.name')}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder={t('contact.form.namePlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">{t('contact.form.email')}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder={t('contact.form.emailPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">{t('contact.form.message')}</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    placeholder={t('contact.form.messagePlaceholder')}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                <Send className="w-4 h-4" />
                                {t('contact.form.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
