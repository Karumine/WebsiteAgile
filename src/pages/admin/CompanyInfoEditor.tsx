import { useState } from 'react';
import { Save, Building2, BarChart3 } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import { CustomerEligibilitySection } from '@/components/sections/CustomerEligibilitySection';
import type { CompanyInfo, ImpactStats } from '@/types';
import toast from 'react-hot-toast';

export function CompanyInfoEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [info, setInfo] = useState<CompanyInfo>(settings.companyInfo || {
        name: 'Agile Assets Co., Ltd.',
        phone: '02-123-4567',
        email: 'contact@agileassets.co.th',
        address: 'กรุงเทพมหานคร',
        description: 'ผู้ให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม',
        lineId: '@agileassets',
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
            actionButtons={
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'th' ? 'บันทึกข้อมูล' : 'Save Info'}</span>
                </button>
            }
            preview={<CustomerEligibilitySection />}
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
