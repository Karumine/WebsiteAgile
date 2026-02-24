import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Save, AlertCircle, CheckCircle, Eye } from 'lucide-react';

export function BannerEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const [banner, setBanner] = useState({ ...settings.banner });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const updateField = (field: string, value: string) => {
        setBanner({ ...banner, [field]: value });
    };

    const validate = (): boolean => {
        if (!banner.headline.trim()) {
            setError('Headline is required.');
            return false;
        }
        if (!banner.subheadline.trim()) {
            setError('Subheadline is required.');
            return false;
        }
        if (!banner.ctaText.trim()) {
            setError('CTA button text is required.');
            return false;
        }
        return true;
    };

    const handleSave = () => {
        setError('');
        setSuccess('');
        if (!validate()) return;
        updateSettings({ banner });
        setSuccess('Banner settings saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Hero Banner</h1>
                    <p className="text-sm text-muted-foreground mt-1">Edit the homepage hero banner content.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <Eye className="w-4 h-4" />
                        {showPreview ? 'Hide Preview' : 'Preview'}
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-white font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {success}
                </div>
            )}

            {/* Preview */}
            {showPreview && (
                <div className="glass rounded-2xl p-8 overflow-hidden relative">
                    <div className="absolute inset-0 gradient-hero opacity-50" />
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{banner.headline || 'Headline...'}</h2>
                        <p className="text-lg text-muted-foreground mb-6">{banner.subheadline || 'Subheadline...'}</p>
                        <span className="inline-flex items-center px-6 py-3 rounded-xl gradient-gold text-white font-semibold text-sm">
                            {banner.ctaText || 'CTA Text...'}
                        </span>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="glass rounded-xl p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Headline *
                    </label>
                    <input
                        type="text"
                        value={banner.headline}
                        onChange={(e) => updateField('headline', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="e.g. Invest with Confidence"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{banner.headline.length} characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Subheadline *
                    </label>
                    <textarea
                        value={banner.subheadline}
                        onChange={(e) => updateField('subheadline', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Supporting text under the main headline"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            CTA Button Text *
                        </label>
                        <input
                            type="text"
                            value={banner.ctaText}
                            onChange={(e) => updateField('ctaText', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="e.g. Get Started"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            CTA Link
                        </label>
                        <input
                            type="text"
                            value={banner.ctaLink}
                            onChange={(e) => updateField('ctaLink', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="e.g. #rates or /contact"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
