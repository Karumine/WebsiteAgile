import { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export function ContactSection() {
    const { settings } = useSiteSettings();
    const { companyInfo } = settings;
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
                        Get in Touch
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ready to explore your financial options? Our team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Phone, label: 'Phone', value: companyInfo.phone },
                                    { icon: Mail, label: 'Email', value: companyInfo.email },
                                    { icon: MapPin, label: 'Address', value: companyInfo.address },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4 glass rounded-xl p-4">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-gold" />
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
                            <h4 className="text-sm font-semibold text-foreground mb-2">Business Hours</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Monday – Friday: 8:00 AM – 6:00 PM EST</p>
                                <p>Saturday: 9:00 AM – 1:00 PM EST</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h3>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-gold text-white font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
