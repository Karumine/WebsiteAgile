import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Save } from 'lucide-react';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import toast from 'react-hot-toast';

export function BannerEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();
    const [banner, setBanner] = useState({ ...settings.banner });

    const updateField = (field: string, value: string) => {
        const updated = { ...banner, [field]: value };
        setBanner(updated);
        // Live update context so preview updates dynamically in real-time
        updateSettings({ banner: updated });
    };

    const validate = (): boolean => {
        if (!banner.headline.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอก Headline' : 'Headline is required.');
            return false;
        }
        if (!banner.subheadline.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอก Subheadline' : 'Subheadline is required.');
            return false;
        }
        if (!banner.ctaText.trim()) {
            toast.error(lang === 'th' ? 'กรุณากรอกข้อความปุ่ม CTA' : 'CTA button text is required.');
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;
        updateSettings({ banner });
        toast.success(lang === 'th' ? 'บันทึกข้อมูลแบนเนอร์เรียบร้อยแล้ว!' : 'Banner settings saved successfully!');
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการ Hero Banner (40/60 Live)' : 'Hero Banner Editor (40/60 Split)'}
            description={lang === 'th' ? 'ปรับเปลี่ยนสโลแกน ข้อความ และปุ่มกดหน้าแรก โดยเห็นผลลัพธ์บนแบนเนอร์จริงทันที' : 'Edit homepage hero banner slogan and CTA with instant live preview.'}
            actionButtons={
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'th' ? 'บันทึกข้อมูล' : 'Save Changes'}</span>
                </button>
            }
            preview={<HeroBanner />}
        >
            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Headline (ข้อความพาดหัวหลัก) *
                    </label>
                    <input
                        type="text"
                        value={banner.headline}
                        onChange={(e) => updateField('headline', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="เช่น Invest with Confidence"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{banner.headline.length} ตัวอักษร</p>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Subheadline (ข้อความบรรยายรอง) *
                    </label>
                    <textarea
                        value={banner.subheadline}
                        onChange={(e) => updateField('subheadline', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="ข้อความเสริมความมั่นใจใต้สโลแกนหลัก"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                            ข้อความปุ่ม CTA *
                        </label>
                        <input
                            type="text"
                            value={banner.ctaText}
                            onChange={(e) => updateField('ctaText', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="เช่น ขอสินเชื่อออนไลน์"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                            ลิงก์ปุ่ม CTA
                        </label>
                        <input
                            type="text"
                            value={banner.ctaLink}
                            onChange={(e) => updateField('ctaLink', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="เช่น /leasing-application หรือ #contact"
                        />
                    </div>
                </div>
            </div>
        </SplitPreviewContainer>
    );
}
