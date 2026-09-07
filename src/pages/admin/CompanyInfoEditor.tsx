import { useState } from 'react';
import { Save, Building2, BarChart3, Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import type { CompanyInfo, ImpactStats } from '@/types';
import toast from 'react-hot-toast';

function CompanyContactLivePreview({ info, stats }: { info: CompanyInfo; stats: ImpactStats }) {
    return (
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-2xl space-y-10 transition-colors selection:bg-sky-500 selection:text-white">
            {/* Section 1: Contact Page Preview */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>การแสดงผลบนหน้าติดต่อเรา (/contact)</span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        (อัปเดตสดตามฟอร์ม)
                    </span>
                </div>

                {/* 3 Large Contact Cards - Exactly matching ContactPage.tsx */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Tel Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                        <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-3">
                            Tel.
                        </h3>
                        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                            <p>
                                <span className="hover:text-sky-600 font-semibold text-slate-900 dark:text-slate-100">
                                    {info.phone || '02-0009392'}
                                </span>
                                {info.operatingHours && (
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        เวลาทำการ: {info.operatingHours}
                                    </span>
                                )}
                            </p>
                            <p>02-0051599</p>
                            <p>098-2837700, 083-9466561</p>
                            <p>091-5505999, 092-2797699</p>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                        <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-3">
                            E-Mail
                        </h3>
                        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                            <p className="font-semibold text-slate-900 dark:text-slate-100 break-all">
                                {info.email || 'rattinun@agileassets.co.th'}
                            </p>
                            <p className="break-all">worathep@agileassets.co.th</p>
                            {info.lineId && (
                                <p className="text-sky-600 dark:text-sky-400 font-bold text-xs pt-1">
                                    LINE: {info.lineId}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Head Office Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all text-center flex flex-col items-center group">
                        <div className="w-14 h-14 rounded-full bg-blue-900 dark:bg-sky-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-3">
                            Head Office
                        </h3>
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            <p>{info.address || 'เลขที่ 20 หมู่ 1 ถ.สุขุมวิท ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Home Page Impact Statistics Preview */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>การแสดงผลสถิติผลงานบนหน้าแรก (Home Page Impact Stats)</span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        (ส่วนเกณฑ์ลูกค้า & ผลงาน)
                    </span>
                </div>

                <div className="rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
                        <div className="text-center pt-2 sm:pt-0 sm:px-2">
                            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-sans mb-1">
                                {stats.factoriesServed || '40+'}
                            </div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                โรงงานที่ดูแล
                            </div>
                        </div>
                        <div className="text-center pt-3 sm:pt-0 sm:px-2">
                            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-sans mb-1">
                                {stats.totalContractsCount || '50+'}
                            </div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                จำนวนสัญญา
                            </div>
                        </div>
                        <div className="text-center pt-3 sm:pt-0 sm:px-2">
                            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-sans mb-1">
                                {stats.totalCreditValueMB ? `${stats.totalCreditValueMB} MB` : '400+ MB'}
                            </div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                มูลค่าสินเชื่อ
                            </div>
                        </div>
                        <div className="text-center pt-3 sm:pt-0 sm:px-2">
                            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans mb-1">
                                {stats.customerSatisfactionPct || '98%'}
                            </div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                ความพึงพอใจ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CompanyInfoEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [info, setInfo] = useState<CompanyInfo>(settings.companyInfo || {
        name: 'Agile Assets Co., Ltd.',
        phone: '02-0009392',
        email: 'rattinun@agileassets.co.th',
        address: 'เลขที่ 20 หมู่ 1 ถ.สุขุมวิท ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270',
        description: 'ผู้ให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม ยานพาหนะเชิงพาณิชย์ เครื่องมือแพทย์ และโซลูชันเงินทุนเพื่อการเติบโตอย่างยั่งยืน',
        lineId: '@884ukedb',
        facebook: 'https://facebook.com/agileassetsth',
        operatingHours: 'จันทร์ - ศุกร์: 08:30 - 17:30 น.',
    });

    const [stats, setStats] = useState<ImpactStats>(settings.impactStats || {
        factoriesServed: '40+',
        totalCreditValueMB: '400+',
        totalContractsCount: '50+',
        customerSatisfactionPct: '98%',
    });

    const updateInfoField = (field: keyof CompanyInfo, val: string) => {
        const updatedInfo = { ...info, [field]: val };
        setInfo(updatedInfo);
        updateSettings({ companyInfo: updatedInfo });
    };

    const updateStatsField = (field: keyof ImpactStats, val: string) => {
        const updatedStats = { ...stats, [field]: val };
        setStats(updatedStats);
        updateSettings({ impactStats: updatedStats });
    };

    const handleSave = () => {
        updateSettings({
            companyInfo: info,
            impactStats: stats,
        });
        toast.success(lang === 'th' ? 'บันทึกข้อมูลบริษัทและสถิติเรียบร้อย' : 'Company info & stats saved');
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการข้อมูลบริษัท & สถิติ (40/60 Live)' : 'Company Info & Stats (40/60 Split)'}
            description={lang === 'th' ? 'ปรับเบอร์โทร อีเมล ที่อยู่ สถิติผลงานโรงงาน โดยเห็นผลลัพธ์พรีวิวทันที' : 'Edit company contact details and stats with real-time live preview.'}
            liveUrl="/contact"
            actionButtons={
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'th' ? 'บันทึกข้อมูล' : 'Save Info'}</span>
                </button>
            }
            preview={<CompanyContactLivePreview info={info} stats={stats} />}
        >
            <div className="space-y-6">
                {/* Impact Stats Block */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-border text-sky-400">
                        <BarChart3 className="w-4 h-4" />
                        <h2 className="text-sm font-bold text-foreground">
                            {lang === 'th' ? 'สถิติผลงานองค์กร (Impact Statistics)' : 'Impact Stats'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">จำนวนโรงงาน</label>
                            <input
                                type="text"
                                value={stats.factoriesServed || ''}
                                onChange={(e) => updateStatsField('factoriesServed', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">ยอดอนุมัติ (ล้านบาท)</label>
                            <input
                                type="text"
                                value={stats.totalCreditValueMB || ''}
                                onChange={(e) => updateStatsField('totalCreditValueMB', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">จำนวนสัญญา</label>
                            <input
                                type="text"
                                value={stats.totalContractsCount || ''}
                                onChange={(e) => updateStatsField('totalContractsCount', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">ความพึงพอใจ (%)</label>
                            <input
                                type="text"
                                value={stats.customerSatisfactionPct || ''}
                                onChange={(e) => updateStatsField('customerSatisfactionPct', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Company Info Block */}
                <div className="space-y-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2 pb-2 border-b border-border text-sky-400">
                        <Building2 className="w-4 h-4" />
                        <h2 className="text-sm font-bold text-foreground">
                            {lang === 'th' ? 'ข้อมูลติดต่อบริษัท' : 'Company Contact Info'}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">ชื่อบริษัท</label>
                            <input
                                type="text"
                                value={info.name || ''}
                                onChange={(e) => updateInfoField('name', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    type="text"
                                    value={info.phone || ''}
                                    onChange={(e) => updateInfoField('phone', e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">อีเมล</label>
                                <input
                                    type="text"
                                    value={info.email || ''}
                                    onChange={(e) => updateInfoField('email', e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">ที่อยู่บริษัท</label>
                            <textarea
                                rows={2}
                                value={info.address || ''}
                                onChange={(e) => updateInfoField('address', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SplitPreviewContainer>
    );
}
