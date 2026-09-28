import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Save } from 'lucide-react';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import toast from 'react-hot-toast';
import logoCmyk from '@/assets/Logo_Agile Assets_CMYK.png';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';

// ─── Lightweight Navbar Stub ─────────────────────────────────────────────────
// Renders the real navbar's visual shell (logo + nav links + lang toggle) so the
// preview looks exactly like the real homepage. Uses inline styles so it works
// correctly inside the IFramePreview portal where Tailwind classes may not apply.
function NavbarPreviewStub() {
    return (
        <header
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 65%, transparent 100%)',
            }}
        >
            <div
                style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                    height: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                {/* Brand Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
                    <img
                        src={logoCmyk}
                        alt="Agile Assets"
                        style={{ height: '2.5rem', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: '1.0625rem',
                                color: '#ffffff',
                                fontFamily: '"Plus Jakarta Sans", "Noto Sans Thai", sans-serif',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Agile Assets
                        </span>
                    </div>
                </div>

                {/* Nav links */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flexWrap: 'nowrap' }}>
                    {['สินเชื่อเครื่องจักร', 'ทรัพย์สินเพื่อขาย', 'นักลงทุนสัมพันธ์', 'ข่าวสาร', 'เกี่ยวกับเรา'].map(
                        (label) => (
                            <span
                                key={label}
                                style={{
                                    padding: '0.375rem 0.625rem',
                                    fontSize: '0.73rem',
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.85)',
                                    borderRadius: '0.625rem',
                                    fontFamily: '"Noto Sans Thai", "Plus Jakarta Sans", sans-serif',
                                    whiteSpace: 'nowrap',
                                    cursor: 'default',
                                }}
                            >
                                {label}
                            </span>
                        )
                    )}
                    {/* Language toggle badge */}
                    <span
                        style={{
                            marginLeft: '0.375rem',
                            padding: '0.25rem 0.6rem',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.75)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: '0.5rem',
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        TH | EN
                    </span>
                </nav>
            </div>
        </header>
    );
}

// ─── Preview wrapper ─────────────────────────────────────────────────────────
// Places NavbarPreviewStub absolutely over HeroBanner so the layout matches the
// real page exactly, including the top padding HeroBanner needs for the navbar.
function BannerPreview() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <NavbarPreviewStub />
            <HeroBanner />
        </div>
    );
}

// ─── Main Editor ─────────────────────────────────────────────────────────────
export function BannerEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();
    const [banner, setBanner] = useState({ ...settings.banner });

    const updateField = (field: string, value: string) => {
        const updated = { ...banner, [field]: value };
        setBanner(updated);
        // Live update context and sync to home page content so both editors remain in 100% sync
        const existingHome = settings.pageContents?.['home'] || DEFAULT_PAGE_CONTENTS['home'];
        const updatedHome = {
            ...existingHome,
            ...(field === 'headline' ? { heroTitleTh: value, heroTitleEn: value } : {}),
            ...(field === 'subheadline' ? { heroSubtitleTh: value, heroSubtitleEn: value } : {}),
            ...(field === 'ctaText' ? { ctaTextTh: value, ctaTextEn: value } : {}),
            ...(field === 'ctaLink' ? { ctaLink: value } : {}),
            lastUpdated: new Date().toISOString(),
        };
        updateSettings({
            banner: updated,
            pageContents: {
                ...(settings.pageContents || {}),
                home: updatedHome,
            },
        });
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
        const existingHome = settings.pageContents?.['home'] || DEFAULT_PAGE_CONTENTS['home'];
        const updatedHome = {
            ...existingHome,
            heroTitleTh: banner.headline,
            heroTitleEn: banner.headline,
            heroSubtitleTh: banner.subheadline,
            heroSubtitleEn: banner.subheadline,
            ctaTextTh: banner.ctaText,
            ctaTextEn: banner.ctaText,
            ctaLink: banner.ctaLink,
            lastUpdated: new Date().toISOString(),
        };
        updateSettings({
            banner,
            pageContents: {
                ...(settings.pageContents || {}),
                home: updatedHome,
            },
        });
        toast.success(lang === 'th' ? 'บันทึกข้อมูลแบนเนอร์เรียบร้อยแล้ว!' : 'Banner settings saved successfully!');
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการ Hero Banner (40/60 Live)' : 'Hero Banner Editor (40/60 Split)'}
            description={lang === 'th' ? 'ปรับเปลี่ยนสโลแกน ข้อความ และปุ่มกดหน้าแรก โดยเห็นผลลัพธ์บนแบนเนอร์จริงทันที' : 'Edit homepage hero banner slogan and CTA with instant live preview.'}
            liveUrl="/"
            actionButtons={
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'th' ? 'บันทึกข้อมูล' : 'Save Changes'}</span>
                </button>
            }
            preview={<BannerPreview />}
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
