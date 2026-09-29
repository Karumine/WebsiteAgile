import { useState, useMemo, useEffect, useRef } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PageCustomContent, PageSectionItem, CustomPageItem } from '@/types';
import { DEFAULT_PAGE_CONTENTS } from '@/data/defaultPageContents';
import { 
    FileEdit, Save, RotateCcw, ExternalLink, Plus, Trash2, 
    Search, Layers, Sparkles, CheckCircle, Image as ImageIcon,
    Globe, Dices, ArrowUp, ArrowDown, Copy, Droplets, Wheat,
    Factory, Flame, Sun, Box, ArrowRight,
    Home, Wrench, TrendingUp, Newspaper, Users, ShoppingBag,
    ChevronDown, ChevronRight, X, FolderPlus
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export interface NavGroupConfig {
    id: string;
    labelTh: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    descriptionTh: string;
    badgeColor: string;
    parentId?: string;
    parentLabelTh?: string;
    parentLabelEn?: string;
}

export const NAV_GROUPS: NavGroupConfig[] = [
    {
        id: 'home',
        labelTh: 'หน้าแรก',
        labelEn: 'Home',
        icon: Home,
        descriptionTh: 'หน้าแรกและภาพรวมเว็บไซต์',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
        id: 'leasing-industry',
        labelTh: 'Industry Solutions',
        labelEn: 'Industry Solutions',
        parentId: 'leasing',
        parentLabelTh: 'สินเชื่อเครื่องจักรและอุปกรณ์',
        parentLabelEn: 'Equipment Financing',
        icon: Factory,
        descriptionTh: 'โซลูชันโรงงานผลิตน้ำดื่ม ฟาร์ม อาหาร ไบโอแก๊ส และโซลาร์',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
        id: 'leasing-equipment',
        labelTh: 'Industrial Equipment',
        labelEn: 'Industrial Equipment',
        parentId: 'leasing',
        parentLabelTh: 'สินเชื่อเครื่องจักรและอุปกรณ์',
        parentLabelEn: 'Equipment Financing',
        icon: Box,
        descriptionTh: 'เครื่องทำความเย็น ชิลเลอร์ ฉีดพลาสติก เครื่องกำเนิดไฟฟ้า และเครื่องมือสินเชื่อ',
        badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
    {
        id: 'investor',
        labelTh: 'นักลงทุนสัมพันธ์',
        labelEn: 'Investor Relations',
        icon: TrendingUp,
        descriptionTh: 'ข้อมูลนักลงทุน ธรรมาภิบาล และความยั่งยืน ESG',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
        id: 'news',
        labelTh: 'ศูนย์ข่าวสาร',
        labelEn: 'News & Knowledge',
        icon: Newspaper,
        descriptionTh: 'ข่าวสาร บทความ โครงการ และจดหมายข่าว',
        badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
        id: 'about',
        labelTh: 'เกี่ยวกับเรา',
        labelEn: 'About Us',
        icon: Users,
        descriptionTh: 'ข้อมูลองค์กร ร่วมงาน คำถามที่พบบ่อย และติดต่อเรา',
        badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
        id: 'assets-sale',
        labelTh: 'ทรัพย์เพื่อการขาย',
        labelEn: 'Assets for Sale',
        icon: ShoppingBag,
        descriptionTh: 'เครื่องจักรมือสองและทรัพย์รอการขาย',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
];

// ── Custom Select Component ─────────────────────────────────────────────────
interface SelectOption {
    value: string;
    label: string;
    emoji?: string;
    description?: string;
    badgeColor?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

function CustomSelect({
    value,
    onChange,
    options,
    placeholder = 'เลือก...',
    className = '',
}: {
    value: string;
    onChange: (val: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
        <div ref={ref} className={cn('relative', className)}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl',
                    'bg-navy-light border border-border text-foreground text-xs',
                    'hover:border-primary/50 hover:bg-white/5 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50',
                    open && 'border-primary/60 ring-2 ring-primary/30 bg-white/5'
                )}
            >
                <span className="flex items-center gap-2 min-w-0">
                    {selected?.emoji && <span className="text-sm">{selected.emoji}</span>}
                    {selected?.icon && (() => { const Icon = selected.icon!; return <Icon className="w-3.5 h-3.5 shrink-0" />; })()}
                    <span className="truncate font-medium">{selected ? selected.label : <span className="text-muted-foreground">{placeholder}</span>}</span>
                </span>
                <ChevronDown
                    className={cn(
                        'w-3.5 h-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
                        open && 'rotate-180 text-primary'
                    )}
                />
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div
                    className={cn(
                        'absolute z-[200] mt-1.5 w-full min-w-[220px]',
                        'glass rounded-2xl border border-border/80 shadow-2xl shadow-black/40',
                        'overflow-hidden',
                        'animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150'
                    )}
                >
                    <div className="p-1.5 max-h-72 overflow-y-auto custom-scrollbar">
                        {options.map((opt) => {
                            const isActive = opt.value === value;
                            const Icon = opt.icon;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => { onChange(opt.value); setOpen(false); }}
                                    className={cn(
                                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-150',
                                        'hover:bg-primary/10 hover:text-primary',
                                        isActive
                                            ? 'bg-primary/15 text-primary font-semibold'
                                            : 'text-foreground'
                                    )}
                                >
                                    {opt.emoji && <span className="text-base leading-none shrink-0">{opt.emoji}</span>}
                                    {Icon && <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />}
                                    {opt.badgeColor && (
                                        <span className={cn('w-5 h-5 rounded-md flex items-center justify-center border shrink-0', opt.badgeColor)}>
                                            {Icon && <Icon className="w-3 h-3" />}
                                        </span>
                                    )}
                                    <span className="min-w-0">
                                        <span className="block text-xs font-medium truncate">{opt.label}</span>
                                        {opt.description && (
                                            <span className="block text-[10px] text-muted-foreground mt-0.5 truncate">{opt.description}</span>
                                        )}
                                    </span>
                                    {isActive && (
                                        <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
// ────────────────────────────────────────────────────────────────────────────

interface PageDefinition {
    id: string;
    groupId: string;
    category: string;
    nameTh: string;
    nameEn: string;
    path: string;
    isCustom?: boolean;
    defaultHeroTitleTh: string;
    defaultHeroTitleEn: string;
    defaultHeroSubtitleTh: string;
    defaultHeroSubtitleEn: string;
    defaultBadgeTh: string;
    defaultBadgeEn: string;
    defaultImage: string;
    defaultCtaTextTh?: string;
    defaultCtaTextEn?: string;
    defaultCtaLink?: string;
    defaultItems?: PageSectionItem[];
}

const getPageDef = (
    id: string,
    groupId: string,
    fallbackNameTh: string,
    nameEn: string,
    path: string,
    isCustom?: boolean
): PageDefinition => {
    const master = DEFAULT_PAGE_CONTENTS[id];
    const group = NAV_GROUPS.find((g) => g.id === groupId);
    const groupName = group ? (group.parentLabelTh ? `${group.parentLabelTh} > ${group.labelTh}` : group.labelTh) : 'ทั่วไป';
    return {
        id,
        groupId,
        category: groupName,
        nameTh: master?.pageName || fallbackNameTh,
        nameEn,
        path,
        isCustom: !!isCustom,
        defaultHeroTitleTh: master?.heroTitleTh || fallbackNameTh,
        defaultHeroTitleEn: master?.heroTitleEn || nameEn,
        defaultHeroSubtitleTh: master?.heroSubtitleTh || '',
        defaultHeroSubtitleEn: master?.heroSubtitleEn || '',
        defaultBadgeTh: master?.heroBadgeTh || group?.labelTh || '',
        defaultBadgeEn: master?.heroBadgeEn || group?.labelEn || '',
        defaultImage: master?.heroImage || '/assets/Hero-Banner-Website-3-scaled.png',
        defaultCtaTextTh: master?.ctaTextTh || 'ขอสินเชื่อกับเรา',
        defaultCtaTextEn: master?.ctaTextEn || 'Financing with Us',
        defaultCtaLink: master?.ctaLink || '/leasing-application',
        defaultItems: master?.items || [],
    };
};

const BASE_PAGES_LIST: PageDefinition[] = [
    // 1. หน้าแรก (Home)
    getPageDef('home', 'home', 'หน้าแรก (Home Page)', 'Home Page', '/'),

    // 2. สินเชื่อเครื่องจักรและอุปกรณ์ (Equipment Financing)
    // 2.1 โซลูชันตามอุตสาหกรรม (Industry Solutions - 5 หน้า)
    getPageDef('drinking-water', 'leasing-industry', 'โรงงานผลิตน้ำดื่ม (Drinking Water)', 'Drinking Water Production', '/drinking-water-production'),
    getPageDef('livestock-farm', 'leasing-industry', 'ฟาร์มปศุสัตว์ (Livestock Farm)', 'Livestock Farm Equipment', '/livestock-farm'),
    getPageDef('food-processing', 'leasing-industry', 'โรงงานแปรรูปอาหาร (Food Processing)', 'Food Processing Plant', '/food-processing'),
    getPageDef('biogas-production', 'leasing-industry', 'โรงไฟฟ้าก๊าซชีวภาพ (Biogas Production)', 'Biogas Power Generation', '/biogas-production'),
    getPageDef('solar-power', 'leasing-industry', 'พลังงานแสงอาทิตย์ (Solar Rooftop)', 'Solar Power Generation', '/solar-power-generation'),

    // 2.2 เครื่องจักรอุตสาหกรรมและเครื่องมือ (Industrial Equipment & Tools - 6 หน้า)
    getPageDef('chiller', 'leasing-equipment', 'เครื่องทำความเย็น (Industrial Chiller)', 'Industrial Chiller', '/chiller'),
    getPageDef('injection-molding', 'leasing-equipment', 'เครื่องฉีดพลาสติก (Injection Molding)', 'Injection Molding Machine', '/injection-molding-machine'),
    getPageDef('generator-set', 'leasing-equipment', 'เครื่องกำเนิดไฟฟ้า (Generator Set)', 'Industrial Generator Set', '/generator-set'),
    getPageDef('leasing-application', 'leasing-equipment', 'ยื่นขอสินเชื่อออนไลน์ (Online Application)', 'Financing Application', '/leasing-application'),
    getPageDef('calculator', 'leasing-equipment', 'คำนวณสินเชื่อ (Financing Calculator)', 'Loan Calculator', '/calculator'),
    getPageDef('interest-rate', 'leasing-equipment', 'แปลงอัตราดอกเบี้ย (Interest Rate Conversion)', 'Interest Rate Converter', '/interest-rate-conversion'),

    // 3. นักลงทุนสัมพันธ์ (Investor Relations)
    getPageDef('investor-relations', 'investor', 'นักลงทุนสัมพันธ์ (Investor Relations)', 'Investor Relations', '/investor-relations'),
    getPageDef('sustainability', 'investor', 'ความยั่งยืน & ESG (Sustainability)', 'Sustainability & ESG', '/sustainability'),

    // 4. ศูนย์ข่าวสาร (News & Knowledge)
    getPageDef('projects', 'news', 'โครงการ & กิจกรรม (Projects & Activity)', 'Projects & Activity', '/project'),
    getPageDef('news', 'news', 'ข่าวสารและอัปเดต (News & Articles)', 'News & Updates', '/news-update'),
    getPageDef('knowledge', 'news', 'คลังความรู้ & บทความ (Knowledge)', 'Knowledge & Articles', '/knowledge'),
    getPageDef('newsletter', 'news', 'จดหมายข่าว (Newsletter)', 'Newsletter', '/newsletter'),

    // 5. เกี่ยวกับเรา (About Us)
    getPageDef('about', 'about', 'เกี่ยวกับเรา (About Us)', 'About Us', '/about'),
    getPageDef('work-for-us', 'about', 'ร่วมงานกับเรา (Work for Us)', 'Work For Us', '/work-for-us'),
    getPageDef('faq', 'about', 'คำถามที่พบบ่อย (FAQ)', 'FAQ & Help', '/faq'),
    getPageDef('contact', 'about', 'ติดต่อเรา (Contact Us)', 'Contact Us', '/contact'),
    getPageDef('nc-nda', 'about', 'สัญญา NC-NDA (Non-Disclosure Agreement)', 'NC-NDA Agreement', '/nc-nda'),
    getPageDef('cookie-policy', 'about', 'นโยบายคุกกี้ (Cookie & Privacy Policy)', 'Cookie Policy', '/cookie-policy'),

    // 6. ทรัพย์เพื่อการขาย (Assets for Sale)
    getPageDef('used-machine', 'assets-sale', 'เครื่องจักรมือสองและทรัพย์รอการขาย (Assets for Sale)', 'Assets for Sale', '/used-machine'),
];

// Helper to render solution icon
const renderSolutionIcon = (iconKey?: string) => {
    switch (iconKey?.toLowerCase()) {
        case 'factory': return Factory;
        case 'flame': return Flame;
        case 'sun': return Sun;
        case 'droplets': return Droplets;
        case 'wheat': return Wheat;
        case 'box': return Box;
        default: return Sparkles;
    }
};

// Rich Pool of realistic industry solutions for samples & randomizer
const SAMPLE_INDUSTRY_POOL: PageSectionItem[] = [
    {
        id: 'sol-sample-1',
        title: 'โรงงานผลิตน้ำดื่มและเครื่องดื่ม',
        titleEn: 'Drinking Water & Beverage Production',
        subTitle: 'Turnkey Bottling Line & RO Filtration',
        subTitleEn: 'Turnkey Bottling Line & RO Filtration',
        description: 'สินเชื่อเช่าซื้อเครื่องจักรโรงงานน้ำดื่ม: เครื่องกรอง RO อุตสาหกรรม, เครื่องเป่าขวด PET, เครื่องบรรจุอัตโนมัติ และสายแพ็คเกจจิ้งความเร็วสูง',
        descEn: 'Turnkey financing for industrial RO filtration, high-speed PET blow molding, automated bottling lines, and robotic packaging.',
        image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=900&q=80',
        link: '/drinking-water-production',
        badge: 'ระบบกรองและบรรจุขวด',
        icon: 'droplets',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-2',
        title: 'ฟาร์มปศุสัตว์อัจฉริยะ',
        titleEn: 'Smart Livestock & Agro-Industrial Farm',
        subTitle: 'Evaporative Cooling Barns & Automated Silos',
        subTitleEn: 'Evaporative Cooling Barns & Automated Silos',
        description: 'สินเชื่อระบบโรงเรือน Evaporative (Evap), ไซโลอาหาร, สายพานลำเลียงอัตโนมัติ และระบบควบคุมอุณหภูมิและความชื้นด้วย IoT',
        descEn: 'Specialized financing for closed Evap cooling barns, automated feeding silos, and IoT climate automation systems.',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&q=80',
        link: '/livestock-farm',
        badge: 'โรงเรือน Evap & ไซโล',
        icon: 'wheat',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-3',
        title: 'อุตสาหกรรมแปรรูปอาหารและห้องเย็น',
        titleEn: 'Food Processing & Cold Chain Solutions',
        subTitle: 'HACCP/GMP Processing Lines & IQF Freezers',
        subTitleEn: 'HACCP/GMP Processing Lines & IQF Freezers',
        description: 'สินเชื่อเครื่องจักรแปรรูปอาหาร: ตู้แช่เยือกแข็ง IQF Spiral, หม้อต้มฆ่าเชื้อ Retort, สายพานตัดแต่ง และเครื่องบรรจุสุญญากาศมาตรฐานสากล',
        descEn: 'Turnkey machinery financing for IQF spiral freezers, retort sterilizers, stainless steel processing lines, and vacuum packaging.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
        link: '/food-processing',
        badge: 'เครื่องจักรแปรรูปอาหาร',
        icon: 'factory',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-4',
        title: 'โรงไฟฟ้าก๊าซชีวภาพและพลังงานชีวมวล',
        titleEn: 'Biogas & Waste-to-Energy Power Generation',
        subTitle: 'CSTR Digesters & Biogas Gen-Sets',
        subTitleEn: 'CSTR Digesters & Biogas Gen-Sets',
        description: 'สินเชื่อระบบบำบัดน้ำเสีย บ่อหมักก๊าซชีวภาพ CSTR/Lagoon และเครื่องกำเนิดไฟฟ้าก๊าซชีวภาพแบบ CHP สำหรับโรงงานและฟาร์ม',
        descEn: 'Turnkey funding for anaerobic digesters, covered lagoons, biological scrubbers, and biogas CHP generators.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80',
        link: '/biogas-production',
        badge: 'พลังงานทดแทน ESG',
        icon: 'flame',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-5',
        title: 'ผลิตไฟฟ้าพลังงานแสงอาทิตย์โซลาร์รูฟท็อป',
        titleEn: 'Commercial & Industrial Solar Power',
        subTitle: 'Turnkey Solar Rooftop & Battery Energy Storage',
        subTitleEn: 'Turnkey Solar Rooftop & Battery Energy Storage',
        description: 'สินเชื่อ Solar Rooftop โรงงาน, Solar Farm และ Solar Floating พร้อมอินเวอร์เตอร์มาตรฐานสูงและระบบกักเก็บพลังงาน BESS',
        descEn: 'Turnkey commercial solar rooftop installations, high-efficiency inverters, and battery energy storage (BESS).',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&q=80',
        link: '/solar-power-generation',
        badge: 'Solar Rooftop & Farm',
        icon: 'sun',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-6',
        title: 'โรงงานรีไซเคิลและแปรรูปพลาสติก',
        titleEn: 'Plastic Recycling & Pelletizing Plant',
        subTitle: 'Washing Lines, Shredders & Pellet Extruders',
        subTitleEn: 'Washing Lines, Shredders & Pellet Extruders',
        description: 'สินเชื่อสายการผลิตเม็ดพลาสติกรีไซเคิล rPET, เครื่องบดพลาสติก, ถังล้างลอยน้ำ และเครื่องรีดเม็ดพลาสติกแบบสูญญากาศ',
        descEn: 'Machinery financing for rPET recycling lines, industrial shredders, friction washers, and double-vented degassing extruders.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
        link: '/injection-molding-machine',
        badge: 'รีไซเคิลหมุนเวียน Circular',
        icon: 'factory',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-7',
        title: 'อุตสาหกรรมผลิตชิ้นส่วนยานยนต์และโลหะ',
        titleEn: 'Automotive Precision Parts & Metal Stamping',
        subTitle: 'High-Precision CNC & Stamping Presses',
        subTitleEn: 'High-Precision CNC & Stamping Presses',
        description: 'สินเชื่อเครื่องปั๊มขึ้นรูปโลหะไฮดรอลิก, เครื่องตัดไฟเบอร์เลเซอร์ และศูนย์กัดกลึงซีเอ็นซี 5 แกน สำหรับชิ้นส่วนยานยนต์',
        descEn: 'Turnkey financing for progressive stamping presses, high-power fiber laser cutters, and 5-axis CNC machining centers.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80',
        link: '/generator-set',
        badge: 'ชิ้นส่วนยานยนต์ & แม่พิมพ์',
        icon: 'factory',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-8',
        title: 'คลังสินค้าอัตโนมัติและระบบโลจิสติกส์',
        titleEn: 'Automated Smart Warehouse & Logistics',
        subTitle: 'AS/RS Stacker Cranes & Autonomous AGVs',
        subTitleEn: 'AS/RS Stacker Cranes & Autonomous AGVs',
        description: 'สินเชื่อระบบจัดเก็บสินค้าแนวสูงอัตโนมัติ (AS/RS), รถลำเลียงสินค้าไร้คนขับ (AGV/AMR) และสายพานคัดแยกพัสดุความเร็วสูง',
        descEn: 'Automated storage & retrieval systems (AS/RS), autonomous mobile robots (AMR), and high-speed parcel sorting systems.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
        link: '/leasing-application',
        badge: 'Smart Logistics & AS/RS',
        icon: 'box',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-9',
        title: 'โรงงานผลิตยาและอุปกรณ์การแพทย์',
        titleEn: 'Pharmaceutical & Medical Device Production',
        subTitle: 'Cleanroom Machinery & Sterile Packaging',
        subTitleEn: 'Cleanroom Machinery & Sterile Packaging',
        description: 'สินเชื่อเครื่องตอกเม็ดอัตโนมัติ, เครื่องบรรจุบลิสเตอร์แพ็คในห้องคลีนรูม และระบบน้ำบริสุทธิ์เกรดการแพทย์ตามมาตรฐาน PIC/S GMP',
        descEn: 'Rotary tablet presses, blister packing machines, cleanroom sterilization autoclaves, and purified water generation systems.',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=80',
        link: '/leasing-application',
        badge: 'มาตรฐาน PIC/S GMP',
        icon: 'factory',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
    {
        id: 'sol-sample-10',
        title: 'อุตสาหกรรมบรรจุภัณฑ์กระดาษและกล่องลูกฟูก',
        titleEn: 'Corrugated Box & Packaging Automation',
        subTitle: 'High-Speed Corrugators & Flexo Folder Gluers',
        subTitleEn: 'High-Speed Corrugators & Flexo Folder Gluers',
        description: 'สินเชื่อเครื่องผลิตแผ่นลูกฟูกความเร็วสูง, เครื่องพิมพ์เฟล็กโซกล่องกระดาษ และเครื่องปั๊มไดคัทอัตโนมัติสำหรับธุรกิจบรรจุภัณฑ์',
        descEn: 'High-speed corrugating lines, computerized flexo folder-gluers, and automatic die-cutting machines for sustainable paper packaging.',
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=900&q=80',
        link: '/leasing-application',
        badge: 'บรรจุภัณฑ์กระดาษ',
        icon: 'box',
        btnText: 'อ่านเพิ่มเติม',
        btnTextEn: 'Read More',
    },
];

// Rich Pool of realistic machinery for samples & randomizer
const SAMPLE_MACHINERY_POOL: PageSectionItem[] = [
    {
        id: 'mac-sample-1',
        title: 'Blow Moulding Machine',
        titleEn: 'Blow Moulding Machine',
        subTitle: 'เครื่องเป่าขวดพลาสติก PET อัตโนมัติความเร็วสูง',
        subTitleEn: 'Automated High-Speed PET Bottle Blowing Machine',
        description: 'สินเชื่อเช่าซื้อเครื่องเป่าขวดพลาสติกความเร็วสูงพร้อมชุดแม่พิมพ์ รองรับการผลิตขวดน้ำดื่มและน้ำผลไม้',
        descEn: 'High-speed automated stretch blow molding systems with precision servo drive and custom tooling.',
        image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Blowing-Machine-Agile-Assets-1024x683.jpg',
        link: '/drinking-water-production',
        badge: 'เครื่องเป่าขวด',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-2',
        title: 'Injection Machine',
        titleEn: 'Injection Molding Machine',
        subTitle: 'เครื่องฉีดพลาสติกแรงหนีบสูงระบบเซอร์โวไฮดรอลิก',
        subTitleEn: 'High-Precision Servo-Hydraulic Injection Molding Machine',
        description: 'สินเชื่อเช่าซื้อเครื่องฉีดพลาสติกแรงหนีบสูง สำหรับฝาขวดน้ำ ชิ้นส่วนยานยนต์ และเครื่องใช้ไฟฟ้า',
        descEn: 'Precision servo-hydraulic and all-electric injection molding machines with rapid cycle times.',
        image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Injection-Machine-Agile-Assets-1024x683.jpg',
        link: '/injection-molding-machine',
        badge: 'เครื่องฉีดพลาสติก',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-3',
        title: 'Industrial Chiller System',
        titleEn: 'Industrial Water Chiller',
        subTitle: 'ชิลเลอร์ระบบทำความเย็นประหยัดพลังงานสำหรับโรงงาน',
        subTitleEn: 'High-Efficiency Screw & Magnetic Bearing Water Chiller',
        description: 'ระบบชิลเลอร์ทำความเย็นประสิทธิภาพสูง ควบคุมอุณหภูมิแม่นยำ ประหยัดค่าไฟในสายการผลิตต่อเนื่อง',
        descEn: 'High-efficiency magnetic bearing & screw chillers for industrial cooling and HVAC systems.',
        image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Chiller-Agile-Assets-1024x683.jpg',
        link: '/chiller',
        badge: 'เครื่องทำความเย็น',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-4',
        title: 'Industrial Generator Set',
        titleEn: 'Industrial Diesel Generator Set',
        subTitle: 'เครื่องกำเนิดไฟฟ้าอุตสาหกรรมและระบบจ่ายไฟฉุกเฉิน',
        subTitleEn: 'Heavy-Duty Prime & Standby Power Gen-Set',
        description: 'เครื่องกำเนิดไฟฟ้าดีเซลและก๊าซธรรมชาติสำหรับโรงงานอุตสาหกรรม ฟาร์มปศุสัตว์ และศูนย์ข้อมูล',
        descEn: 'Heavy-duty continuous and standby prime power diesel/gas gen-sets with soundproof acoustic enclosure.',
        image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Generator-Agile-Assets-1024x683.jpg',
        link: '/generator-set',
        badge: 'เครื่องกำเนิดไฟฟ้า',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-5',
        title: 'Solar Rooftop & Inverter System',
        titleEn: 'Commercial Solar Rooftop System',
        subTitle: 'ระบบแผงโซลาร์เซลล์โรงงาน Tier-1 พร้อมอินเวอร์เตอร์',
        subTitleEn: 'Tier-1 High-Efficiency Industrial Solar Photovoltaic System',
        description: 'ระบบโซลาร์เซลล์ติดตั้งบนหลังคาโรงงาน ช่วยลดต้นทุนค่าไฟฟ้าพีคโหลดและเพิ่มแต้ม ESG คืนทุนไว',
        descEn: 'Complete turnkey commercial & industrial solar rooftop engineering, smart monitoring, and leasing.',
        image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2021/11/Solar-Rooftop-Agile-Assets-1-1024x683.jpg',
        link: '/solar-power-generation',
        badge: 'โซลาร์เซลล์',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-6',
        title: 'CNC 5-Axis Machining Center',
        titleEn: 'CNC 5-Axis Machining Center',
        subTitle: 'ศูนย์กัดกลึงซีเอ็นซี 5 แกนความเร็วสูงระดับไมครอน',
        subTitleEn: 'High-Precision 5-Axis Vertical Machining Center',
        description: 'เครื่องกัดซีเอ็นซีความแม่นยำสูง สำหรับแม่พิมพ์ อากาศยาน ชิ้นส่วนการแพทย์ และยานยนต์',
        descEn: 'High-precision 5-axis simultaneous CNC vertical machining center with high-torque spindle.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80',
        link: '/leasing-application',
        badge: 'CNC 5 แกน',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-7',
        title: 'Automated Palletizing Robot',
        titleEn: 'Automated Palletizing Robot System',
        subTitle: 'หุ่นยนต์แขนกลจัดเรียงสินค้าบนพาเลทอัตโนมัติ',
        subTitleEn: 'Industrial 4-Axis Articulated Palletizing Robot',
        description: 'หุ่นยนต์จัดเรียงกล่องและกระสอบบนพาเลท เพิ่มความเร็วในสายการผลิตและลดความเมื่อยล้าของพนักงาน',
        descEn: 'Industrial articulated robot system for automated end-of-line carton and bag palletizing.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80',
        link: '/leasing-application',
        badge: 'หุ่นยนต์อุตสาหกรรม',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
    {
        id: 'mac-sample-8',
        title: 'Fiber Laser Cutting Machine',
        titleEn: 'High-Power Fiber Laser Cutter',
        subTitle: 'เครื่องตัดไฟเบอร์เลเซอร์แผ่นโลหะกำลังสูง 12kW-20kW',
        subTitleEn: 'Heavy-Duty 12kW Fiber Laser Sheet Metal Cutter',
        description: 'เครื่องตัดเลเซอร์ความแม่นยำสูง ตัดเหล็ก สแตนเลส และอลูมิเนียมความหนาสูงได้อย่างรวดเร็วและเรียบเนียน',
        descEn: 'High-power CNC fiber laser cutting machine with dual shuttle exchange table and auto nesting.',
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=900&q=80',
        link: '/leasing-application',
        badge: 'เลเซอร์ไฟเบอร์',
        btnText: 'ดูรายละเอียด',
        btnTextEn: 'View Details',
    },
];

export function PageContentEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();

    const [selectedPageId, setSelectedPageId] = useState<string>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        home: true,
        'leasing-industry': true,
        'leasing-equipment': true,
        investor: true,
        news: true,
        about: true,
        'assets-sale': true,
    });

    // Add New Page Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newPageGroupId, setNewPageGroupId] = useState('home');
    const [newPageNameTh, setNewPageNameTh] = useState('');
    const [newPageNameEn, setNewPageNameEn] = useState('');
    const [newPagePath, setNewPagePath] = useState('');

    const allPages = useMemo<PageDefinition[]>(() => {
        const customList: PageDefinition[] = (settings.customPages || []).map((cp) => {
            const mappedGroupId = cp.groupId === 'leasing' ? 'leasing-industry' : cp.groupId;
            return getPageDef(cp.id, mappedGroupId, cp.nameTh, cp.nameEn, cp.path, true);
        });
        return [...BASE_PAGES_LIST, ...customList];
    }, [settings.customPages]);

    const activePageDef = useMemo(() => {
        return allPages.find((p) => p.id === selectedPageId) || allPages[0];
    }, [allPages, selectedPageId]);

    const activeNavGroup = useMemo(() => {
        return NAV_GROUPS.find((g) => g.id === activePageDef.groupId) || NAV_GROUPS[0];
    }, [activePageDef]);

    const getInitialContent = (pageId: string, def: PageDefinition): PageCustomContent => {
        const saved = settings.pageContents?.[pageId];
        const master = DEFAULT_PAGE_CONTENTS[pageId];

        // Sync banner settings if pageId is home and not explicitly customized in pageContents
        const bannerHeadline = pageId === 'home' && settings.banner?.headline ? settings.banner.headline : undefined;
        const bannerSubheadline = pageId === 'home' && settings.banner?.subheadline ? settings.banner.subheadline : undefined;
        const bannerCtaText = pageId === 'home' && settings.banner?.ctaText ? settings.banner.ctaText : undefined;
        const bannerCtaLink = pageId === 'home' && settings.banner?.ctaLink ? settings.banner.ctaLink : undefined;

        // Items (Section 2 - Features / Story)
        const defaultItems = (master?.items && master.items.length > 0) ? master.items : (def.defaultItems || []);
        const resolvedItems = (saved?.items && saved.items.length > 0) ? saved.items : defaultItems;

        // Section 3: Industry Solutions (Home page)
        const defaultSolutions = DEFAULT_PAGE_CONTENTS['home']?.solutionsItems || [];
        const isSolutionsDummy = !saved?.solutionsItems || saved.solutionsItems.length === 0 ||
            (saved.solutionsItems.length === 1 && (saved.solutionsItems[0].title === 'กลุ่มอุตสาหกรรมใหม่' || saved.solutionsItems[0].title.includes('กลุ่มอุตสาหกรรมใหม่')));
        const resolvedSolutions = (pageId === 'home')
            ? (!isSolutionsDummy ? saved!.solutionsItems! : defaultSolutions)
            : (saved?.solutionsItems || []);

        // Section 4: Machinery (Home page)
        const defaultMachinery = DEFAULT_PAGE_CONTENTS['home']?.machineryItems || [];
        const isMachineryDummy = !saved?.machineryItems || saved.machineryItems.length === 0 ||
            (saved.machineryItems.length === 1 && (saved.machineryItems[0].title === 'เครื่องจักรอุตสาหกรรมใหม่' || saved.machineryItems[0].title.includes('เครื่องจักรอุตสาหกรรมใหม่')));
        const resolvedMachinery = (pageId === 'home')
            ? (!isMachineryDummy ? saved!.machineryItems! : defaultMachinery)
            : (saved?.machineryItems || []);

        return {
            id: def.id,
            pageName: def.nameTh,
            titleTh: saved?.titleTh || bannerHeadline || master?.titleTh || def.defaultHeroTitleTh,
            titleEn: saved?.titleEn || bannerHeadline || master?.titleEn || def.defaultHeroTitleEn,
            sectionTitleTh: saved?.sectionTitleTh || master?.sectionTitleTh || (pageId === 'home' ? 'เรื่องราวของเรา' : undefined),
            sectionTitleEn: saved?.sectionTitleEn || master?.sectionTitleEn || (pageId === 'home' ? 'Our Story' : undefined),
            sectionSubtitleTh: saved?.sectionSubtitleTh || master?.sectionSubtitleTh || (pageId === 'home' ? 'สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างยั่งยืนของภาคธุรกิจไทย' : undefined),
            sectionSubtitleEn: saved?.sectionSubtitleEn || master?.sectionSubtitleEn || (pageId === 'home' ? 'Bridging financial opportunities towards sustainable growth for Thai businesses.' : undefined),
            metaTitle: saved?.metaTitle || master?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: saved?.metaDescription || master?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: saved?.heroBadgeTh || master?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: saved?.heroBadgeEn || master?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: saved?.heroTitleTh || bannerHeadline || master?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: saved?.heroTitleEn || bannerHeadline || master?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: saved?.heroSubtitleTh || bannerSubheadline || master?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: saved?.heroSubtitleEn || bannerSubheadline || master?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: saved?.heroImage || master?.heroImage || def.defaultImage,
            ctaTextTh: saved?.ctaTextTh || bannerCtaText || master?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อกับเรา',
            ctaTextEn: saved?.ctaTextEn || bannerCtaText || master?.ctaTextEn || def.defaultCtaTextEn || 'Financing with Us',
            ctaLink: saved?.ctaLink || bannerCtaLink || master?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: saved?.contentTh || master?.contentTh || '',
            contentEn: saved?.contentEn || master?.contentEn || '',
            items: resolvedItems,

            // Section 3: Industry Solutions (ServicesRangeSection)
            solutionsBadgeTh: saved?.solutionsBadgeTh || master?.solutionsBadgeTh || (pageId === 'home' ? 'OUR FINANCING SERVICES' : undefined),
            solutionsBadgeEn: saved?.solutionsBadgeEn || master?.solutionsBadgeEn || (pageId === 'home' ? 'OUR FINANCING SERVICES' : undefined),
            solutionsTitleTh: saved?.solutionsTitleTh || master?.solutionsTitleTh || (pageId === 'home' ? 'โซลูชั่นทางการเงินของเราในอุตสาหกรรม' : undefined),
            solutionsTitleEn: saved?.solutionsTitleEn || master?.solutionsTitleEn || (pageId === 'home' ? 'Our Industry Financing Solutions' : undefined),
            solutionsSubtitleTh: saved?.solutionsSubtitleTh || master?.solutionsSubtitleTh || (pageId === 'home' ? 'โซลูชันสินเชื่อเช่าซื้อเครื่องจักรและอุปกรณ์ที่ปรับแต่งตามโครงสร้างธุรกิจ 5 กลุ่มอุตสาหกรรมหลัก' : undefined),
            solutionsSubtitleEn: saved?.solutionsSubtitleEn || master?.solutionsSubtitleEn || (pageId === 'home' ? 'Tailored machinery leasing and capital financing structures covering 5 essential industrial sectors.' : undefined),
            solutionsItems: resolvedSolutions,

            // Section 4: Key Machinery Services (KeyFinancingServicesSection)
            machineryBadgeTh: saved?.machineryBadgeTh || master?.machineryBadgeTh || (pageId === 'home' ? 'KEY FINANCING SERVICES' : undefined),
            machineryBadgeEn: saved?.machineryBadgeEn || master?.machineryBadgeEn || (pageId === 'home' ? 'KEY FINANCING SERVICES' : undefined),
            machineryTitleTh: saved?.machineryTitleTh || master?.machineryTitleTh || (pageId === 'home' ? 'บริการเครื่องจักรทางการเงินหลัก' : undefined),
            machineryTitleEn: saved?.machineryTitleEn || master?.machineryTitleEn || (pageId === 'home' ? 'Key Machinery Financing Services' : undefined),
            machinerySubtitleTh: saved?.machinerySubtitleTh || master?.machinerySubtitleTh || (pageId === 'home' ? 'สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรมเฉพาะทางสำหรับโรงงานและสายการผลิตชั้นนำ' : undefined),
            machinerySubtitleEn: saved?.machinerySubtitleEn || master?.machinerySubtitleEn || (pageId === 'home' ? 'Specialized industrial equipment leasing for premier manufacturing operations.' : undefined),
            machineryItems: resolvedMachinery,
        };
    };

    // Current page content state (saved or fallback to master default)
    const [editContent, setEditContent] = useState<PageCustomContent>(() => {
        const homeDef = BASE_PAGES_LIST.find((p) => p.id === 'home') || BASE_PAGES_LIST[0];
        return getInitialContent('home', homeDef);
    });

    const [savedSnapshot, setSavedSnapshot] = useState<string>(() => {
        const homeDef = BASE_PAGES_LIST.find((p) => p.id === 'home') || BASE_PAGES_LIST[0];
        return JSON.stringify(getInitialContent('home', homeDef));
    });

    // Ensure editContent is synchronized with defaults whenever page changes or if sections are missing or dummy
    useEffect(() => {
        setEditContent((prev) => {
            if (prev.id !== selectedPageId) {
                const initial = getInitialContent(selectedPageId, activePageDef);
                setSavedSnapshot(JSON.stringify(initial));
                return initial;
            }
            let changed = false;
            const updated = { ...prev };
            if (selectedPageId === 'home') {
                const isSolutionsDummy = !updated.solutionsItems || updated.solutionsItems.length === 0 ||
                    (updated.solutionsItems.length === 1 && (updated.solutionsItems[0].title === 'กลุ่มอุตสาหกรรมใหม่' || updated.solutionsItems[0].title.includes('กลุ่มอุตสาหกรรมใหม่')));
                if (isSolutionsDummy) {
                    updated.solutionsItems = DEFAULT_PAGE_CONTENTS['home']?.solutionsItems || [];
                    changed = true;
                }
                const isMachineryDummy = !updated.machineryItems || updated.machineryItems.length === 0 ||
                    (updated.machineryItems.length === 1 && (updated.machineryItems[0].title === 'เครื่องจักรอุตสาหกรรมใหม่' || updated.machineryItems[0].title.includes('เครื่องจักรอุตสาหกรรมใหม่')));
                if (isMachineryDummy) {
                    updated.machineryItems = DEFAULT_PAGE_CONTENTS['home']?.machineryItems || [];
                    changed = true;
                }
            }
            const master = DEFAULT_PAGE_CONTENTS[selectedPageId];
            if ((!updated.items || updated.items.length === 0) && master?.items && master.items.length > 0) {
                updated.items = master.items;
                changed = true;
            }
            return changed ? updated : prev;
        });
    }, [selectedPageId, activePageDef]);

    // When selectedPageId changes, reload form
    const handleSelectPage = (pageId: string) => {
        setSelectedPageId(pageId);
        const def = allPages.find((p) => p.id === pageId) || allPages[0];
        const initial = getInitialContent(pageId, def);
        setEditContent(initial);
        setSavedSnapshot(JSON.stringify(initial));
    };

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }));
    };

    const openAddModal = (presetGroupId?: string) => {
        setNewPageGroupId(presetGroupId || (activePageDef.groupId || 'home'));
        setNewPageNameTh('');
        setNewPageNameEn('');
        setNewPagePath('');
        setIsAddModalOpen(true);
    };

    const handleCreatePage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPageNameTh.trim()) {
            toast.error(lang === 'th' ? 'กรุณาระบุชื่อหน้าภาษาไทย' : 'Please enter Thai page name');
            return;
        }

        let rawPath = newPagePath.trim();
        if (!rawPath) {
            rawPath = '/' + newPageNameTh.trim().toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        }
        if (!rawPath.startsWith('/')) {
            rawPath = '/' + rawPath;
        }

        const generatedId = `page-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
        const groupDef = NAV_GROUPS.find((g) => g.id === newPageGroupId) || NAV_GROUPS[0];

        const newCustomItem: CustomPageItem = {
            id: generatedId,
            groupId: newPageGroupId,
            nameTh: newPageNameTh.trim(),
            nameEn: newPageNameEn.trim() || newPageNameTh.trim(),
            path: rawPath,
            createdAt: new Date().toISOString(),
        };

        const initialNewContent: PageCustomContent = {
            id: generatedId,
            pageName: newPageNameTh.trim(),
            titleTh: newPageNameTh.trim(),
            titleEn: newPageNameEn.trim() || newPageNameTh.trim(),
            heroBadgeTh: groupDef.labelTh,
            heroBadgeEn: groupDef.labelEn,
            heroTitleTh: newPageNameTh.trim(),
            heroTitleEn: newPageNameEn.trim() || newPageNameTh.trim(),
            heroSubtitleTh: `รายละเอียดและข้อมูลบริการ ${newPageNameTh.trim()}`,
            heroSubtitleEn: `Information and services for ${newPageNameEn.trim() || newPageNameTh.trim()}`,
            heroImage: '/assets/Hero-Banner-Website-3-scaled.png',
            ctaTextTh: 'ขอสินเชื่อกับเรา',
            ctaTextEn: 'Financing with Us',
            ctaLink: '/leasing-application',
            metaTitle: `${newPageNameTh.trim()} | Agile Assets`,
            metaDescription: `ข้อมูล ${newPageNameTh.trim()}`,
            items: [],
            lastUpdated: new Date().toISOString(),
        };

        const updatedCustomPages = [...(settings.customPages || []), newCustomItem];
        const updatedPageContents = {
            ...(settings.pageContents || {}),
            [generatedId]: initialNewContent,
        };

        updateSettings({
            customPages: updatedCustomPages,
            pageContents: updatedPageContents,
        });

        // Expand target group
        setExpandedGroups((prev) => ({ ...prev, [newPageGroupId]: true }));
        setSelectedPageId(generatedId);
        setEditContent(initialNewContent);
        setSavedSnapshot(JSON.stringify(initialNewContent));
        setIsAddModalOpen(false);

        toast.success(
            lang === 'th'
                ? `สร้างหน้าใหม่ "${newCustomItem.nameTh}" ในหัวข้อ "${groupDef.labelTh}" เรียบร้อยแล้ว!`
                : `Created new page "${newCustomItem.nameEn}" successfully!`
        );
    };

    const handleDeleteCustomPage = (pageId: string, pageName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm(lang === 'th' ? `คุณต้องการลบหน้า "${pageName}" ใช่หรือไม่?` : `Delete page "${pageName}"?`)) {
            return;
        }
        const updatedCustom = (settings.customPages || []).filter((p) => p.id !== pageId);
        const updatedContents = { ...(settings.pageContents || {}) };
        delete updatedContents[pageId];

        updateSettings({
            customPages: updatedCustom,
            pageContents: updatedContents,
        });

        if (selectedPageId === pageId) {
            setSelectedPageId('home');
        }

        toast.success(lang === 'th' ? `ลบหน้า "${pageName}" เรียบร้อยแล้ว` : `Deleted page "${pageName}"`);
    };

    // Detect unsaved changes (dirty check)
    const isDirty = useMemo(() => {
        try {
            if (!savedSnapshot) return false;
            const currentClean = { ...editContent, lastUpdated: undefined };
            const savedObj = JSON.parse(savedSnapshot);
            const savedClean = { ...savedObj, lastUpdated: undefined };
            return JSON.stringify(currentClean) !== JSON.stringify(savedClean);
        } catch {
            return false;
        }
    }, [editContent, savedSnapshot]);

    const updateField = <K extends keyof PageCustomContent>(key: K, value: PageCustomContent[K]) => {
        setEditContent((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Load defaults helpers
    const loadDefaultStoryItems = () => {
        const defaultItems = (DEFAULT_PAGE_CONTENTS[selectedPageId]?.items && DEFAULT_PAGE_CONTENTS[selectedPageId].items.length > 0)
            ? DEFAULT_PAGE_CONTENTS[selectedPageId].items
            : (activePageDef.defaultItems || []);
        setEditContent((prev) => ({
            ...prev,
            items: defaultItems,
        }));
        toast.success(lang === 'th' ? 'ใส่ข้อมูลตัวอย่างเริ่มต้นเรียบร้อยแล้ว' : 'Loaded default items successfully');
    };

    const loadDefaultSolutions = () => {
        const defaults = DEFAULT_PAGE_CONTENTS['home']?.solutionsItems || [];
        setEditContent((prev) => ({
            ...prev,
            solutionsItems: defaults,
        }));
        toast.success(lang === 'th' ? 'ใส่ข้อมูล 5 กลุ่มอุตสาหกรรมเริ่มต้นเรียบร้อยแล้ว' : 'Loaded 5 default industry solutions');
    };

    const loadDefaultMachinery = () => {
        const defaults = DEFAULT_PAGE_CONTENTS['home']?.machineryItems || [];
        setEditContent((prev) => ({
            ...prev,
            machineryItems: defaults,
        }));
        toast.success(lang === 'th' ? 'ใส่ข้อมูล 5 เครื่องจักรเริ่มต้นเรียบร้อยแล้ว' : 'Loaded 5 default machines');
    };

    // Randomize 5 items helpers
    const randomizeFiveSolutions = () => {
        const shuffled = [...SAMPLE_INDUSTRY_POOL].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5).map((item, idx) => ({
            ...item,
            id: `sol-rnd-${Date.now()}-${idx + 1}`,
        }));
        setEditContent((prev) => ({
            ...prev,
            solutionsItems: selected,
        }));
        toast.success(
            lang === 'th'
                ? '🎲 สุ่มข้อมูลตัวอย่าง 5 กลุ่มอุตสาหกรรมให้เรียบร้อยแล้ว!'
                : '🎲 Successfully randomized 5 industry solution samples!'
        );
    };

    const randomizeFiveMachinery = () => {
        const shuffled = [...SAMPLE_MACHINERY_POOL].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5).map((item, idx) => ({
            ...item,
            id: `mac-rnd-${Date.now()}-${idx + 1}`,
        }));
        setEditContent((prev) => ({
            ...prev,
            machineryItems: selected,
        }));
        toast.success(
            lang === 'th'
                ? '🎲 สุ่มข้อมูลตัวอย่าง 5 เครื่องจักรให้เรียบร้อยแล้ว!'
                : '🎲 Successfully randomized 5 machinery samples!'
        );
    };

    // Equipment / Feature Items manipulation
    const addItem = () => {
        const newItem: PageSectionItem = {
            id: `item-${Date.now()}`,
            title: 'เครื่องจักร / ฟีเจอร์ใหม่',
            titleEn: 'New Equipment / Feature',
            description: 'รายละเอียดคุณสมบัติ ประสิทธิภาพ และประโยชน์ที่ลูกค้าจะได้รับ',
            descEn: 'Specification details, operating efficiency, and commercial benefits.',
            badge: 'คุณสมบัติเด่น',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
            link: '/leasing-application',
        };
        setEditContent((prev) => ({
            ...prev,
            items: [...(prev.items || []), newItem],
        }));
    };

    const removeItem = (id: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).filter((item) => item.id !== id),
        }));
    };

    const updateItemField = (id: string, field: keyof PageSectionItem, value: string) => {
        setEditContent((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    // Section 3: Industry Solutions manipulation - picks next real sample industry
    const addSolutionItem = () => {
        const currentTitles = new Set((editContent.solutionsItems || []).map((s) => s.title));
        const available = SAMPLE_INDUSTRY_POOL.find((s) => !currentTitles.has(s.title)) || SAMPLE_INDUSTRY_POOL[Math.floor(Math.random() * SAMPLE_INDUSTRY_POOL.length)];
        const newItem: PageSectionItem = {
            ...available,
            id: `sol-${Date.now()}`,
        };
        setEditContent((prev) => ({
            ...prev,
            solutionsItems: [...(prev.solutionsItems || []), newItem],
        }));
        toast.success(
            lang === 'th'
                ? `เพิ่มกลุ่มอุตสาหกรรม: "${newItem.title}"`
                : `Added industry: "${newItem.titleEn || newItem.title}"`
        );
    };

    const removeSolutionItem = (id: string) => {
        setEditContent((prev) => ({
            ...prev,
            solutionsItems: (prev.solutionsItems || []).filter((item) => item.id !== id),
        }));
    };

    const updateSolutionField = (id: string, field: keyof PageSectionItem, value: string) => {
        setEditContent((prev) => ({
            ...prev,
            solutionsItems: (prev.solutionsItems || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const moveSolutionItem = (index: number, direction: 'up' | 'down') => {
        setEditContent((prev) => {
            const list = [...(prev.solutionsItems || [])];
            const target = direction === 'up' ? index - 1 : index + 1;
            if (target < 0 || target >= list.length) return prev;
            const temp = list[index];
            list[index] = list[target];
            list[target] = temp;
            return { ...prev, solutionsItems: list };
        });
    };

    const duplicateSolutionItem = (id: string) => {
        setEditContent((prev) => {
            const list = prev.solutionsItems || [];
            const item = list.find((s) => s.id === id);
            if (!item) return prev;
            const copy: PageSectionItem = {
                ...item,
                id: `sol-${Date.now()}`,
                title: `${item.title} (สำเนา)`,
                titleEn: item.titleEn ? `${item.titleEn} (Copy)` : undefined,
            };
            return {
                ...prev,
                solutionsItems: [...list, copy],
            };
        });
        toast.success(lang === 'th' ? 'คัดลอกการ์ดเรียบร้อยแล้ว' : 'Duplicated card successfully');
    };

    // Section 4: Key Machinery manipulation - picks next real sample machine
    const addMachineryItem = () => {
        const currentTitles = new Set((editContent.machineryItems || []).map((m) => m.title));
        const available = SAMPLE_MACHINERY_POOL.find((m) => !currentTitles.has(m.title)) || SAMPLE_MACHINERY_POOL[Math.floor(Math.random() * SAMPLE_MACHINERY_POOL.length)];
        const newItem: PageSectionItem = {
            ...available,
            id: `mac-${Date.now()}`,
        };
        setEditContent((prev) => ({
            ...prev,
            machineryItems: [...(prev.machineryItems || []), newItem],
        }));
        toast.success(
            lang === 'th'
                ? `เพิ่มเครื่องจักร: "${newItem.title}"`
                : `Added machine: "${newItem.titleEn || newItem.title}"`
        );
    };

    const removeMachineryItem = (id: string) => {
        setEditContent((prev) => ({
            ...prev,
            machineryItems: (prev.machineryItems || []).filter((item) => item.id !== id),
        }));
    };

    const updateMachineryField = (id: string, field: keyof PageSectionItem, value: string) => {
        setEditContent((prev) => ({
            ...prev,
            machineryItems: (prev.machineryItems || []).map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const moveMachineryItem = (index: number, direction: 'up' | 'down') => {
        setEditContent((prev) => {
            const list = [...(prev.machineryItems || [])];
            const target = direction === 'up' ? index - 1 : index + 1;
            if (target < 0 || target >= list.length) return prev;
            const temp = list[index];
            list[index] = list[target];
            list[target] = temp;
            return { ...prev, machineryItems: list };
        });
    };

    const handleSave = () => {
        const existing = settings.pageContents || {};
        const updatedPages = {
            ...existing,
            [selectedPageId]: {
                ...editContent,
                lastUpdated: new Date().toISOString(),
            },
        };

        const partialUpdate: Partial<typeof settings> = { pageContents: updatedPages };

        // When saving home page, sync to banner settings as well
        if (selectedPageId === 'home') {
            partialUpdate.banner = {
                headline: editContent.heroTitleTh || editContent.heroTitleEn || settings.banner?.headline || 'Growth – Good Capital',
                subheadline: editContent.heroSubtitleTh || editContent.heroSubtitleEn || settings.banner?.subheadline || '',
                ctaText: editContent.ctaTextTh || editContent.ctaTextEn || settings.banner?.ctaText || 'Financing with Us',
                ctaLink: editContent.ctaLink || settings.banner?.ctaLink || '/leasing-application',
            };
        }

        updateSettings(partialUpdate);
        setSavedSnapshot(JSON.stringify({
            ...editContent,
            lastUpdated: new Date().toISOString(),
        }));
        toast.success(
            lang === 'th'
                ? `บันทึกเนื้อหาหน้า "${activePageDef.nameTh}" เรียบร้อยแล้ว!`
                : `Page "${activePageDef.nameEn}" content saved successfully!`
        );
    };

    const handleReset = () => {
        const def = activePageDef;
        const master = DEFAULT_PAGE_CONTENTS[selectedPageId];
        const freshDefault: PageCustomContent = {
            id: def.id,
            pageName: def.nameTh,
            titleTh: master?.titleTh || def.defaultHeroTitleTh,
            titleEn: master?.titleEn || def.defaultHeroTitleEn,
            sectionTitleTh: master?.sectionTitleTh || (selectedPageId === 'home' ? 'เรื่องราวของเรา' : undefined),
            sectionTitleEn: master?.sectionTitleEn || (selectedPageId === 'home' ? 'Our Story' : undefined),
            sectionSubtitleTh: master?.sectionSubtitleTh || (selectedPageId === 'home' ? 'สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างยั่งยืนของภาคธุรกิจไทย' : undefined),
            sectionSubtitleEn: master?.sectionSubtitleEn || (selectedPageId === 'home' ? 'Bridging financial opportunities towards sustainable growth for Thai businesses.' : undefined),
            metaTitle: master?.metaTitle || `${def.nameTh} | Agile Assets`,
            metaDescription: master?.metaDescription || def.defaultHeroSubtitleTh,
            heroBadgeTh: master?.heroBadgeTh || def.defaultBadgeTh,
            heroBadgeEn: master?.heroBadgeEn || def.defaultBadgeEn,
            heroTitleTh: master?.heroTitleTh || def.defaultHeroTitleTh,
            heroTitleEn: master?.heroTitleEn || def.defaultHeroTitleEn,
            heroSubtitleTh: master?.heroSubtitleTh || def.defaultHeroSubtitleTh,
            heroSubtitleEn: master?.heroSubtitleEn || def.defaultHeroSubtitleEn,
            heroImage: master?.heroImage || def.defaultImage,
            ctaTextTh: master?.ctaTextTh || def.defaultCtaTextTh || 'ขอสินเชื่อกับเรา',
            ctaTextEn: master?.ctaTextEn || def.defaultCtaTextEn || 'Financing with Us',
            ctaLink: master?.ctaLink || def.defaultCtaLink || '/leasing-application',
            contentTh: master?.contentTh || '',
            contentEn: master?.contentEn || '',
            items: master?.items || def.defaultItems || [],

            // Section 3: Industry Solutions (ServicesRangeSection)
            solutionsBadgeTh: master?.solutionsBadgeTh || (selectedPageId === 'home' ? 'OUR FINANCING SERVICES' : undefined),
            solutionsBadgeEn: master?.solutionsBadgeEn || (selectedPageId === 'home' ? 'OUR FINANCING SERVICES' : undefined),
            solutionsTitleTh: master?.solutionsTitleTh || (selectedPageId === 'home' ? 'โซลูชั่นทางการเงินของเราในอุตสาหกรรม' : undefined),
            solutionsTitleEn: master?.solutionsTitleEn || (selectedPageId === 'home' ? 'Our Industry Financing Solutions' : undefined),
            solutionsSubtitleTh: master?.solutionsSubtitleTh || (selectedPageId === 'home' ? 'โซลูชันสินเชื่อเช่าซื้อเครื่องจักรและอุปกรณ์ที่ปรับแต่งตามโครงสร้างธุรกิจ 5 กลุ่มอุตสาหกรรมหลัก' : undefined),
            solutionsSubtitleEn: master?.solutionsSubtitleEn || (selectedPageId === 'home' ? 'Tailored machinery leasing and capital financing structures covering 5 essential industrial sectors.' : undefined),
            solutionsItems: master?.solutionsItems || [],

            // Section 4: Key Machinery Services (KeyFinancingServicesSection)
            machineryBadgeTh: master?.machineryBadgeTh || (selectedPageId === 'home' ? 'KEY FINANCING SERVICES' : undefined),
            machineryBadgeEn: master?.machineryBadgeEn || (selectedPageId === 'home' ? 'KEY FINANCING SERVICES' : undefined),
            machineryTitleTh: master?.machineryTitleTh || (selectedPageId === 'home' ? 'บริการเครื่องจักรทางการเงินหลัก' : undefined),
            machineryTitleEn: master?.machineryTitleEn || (selectedPageId === 'home' ? 'Key Machinery Financing Services' : undefined),
            machinerySubtitleTh: master?.machinerySubtitleTh || (selectedPageId === 'home' ? 'สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรมเฉพาะทางสำหรับโรงงานและสายการผลิตชั้นนำ' : undefined),
            machinerySubtitleEn: master?.machinerySubtitleEn || (selectedPageId === 'home' ? 'Specialized industrial equipment leasing for premier manufacturing operations.' : undefined),
            machineryItems: master?.machineryItems || [],
        };

        setEditContent(freshDefault);

        const existing = { ...(settings.pageContents || {}) };
        delete existing[selectedPageId];
        updateSettings({ pageContents: existing });
        setSavedSnapshot(JSON.stringify(freshDefault));

        toast.success(
            lang === 'th'
                ? `รีเซ็ตเนื้อหาหน้า "${def.nameTh}" กลับเป็นค่าเริ่มต้นแล้ว`
                : `Reset "${def.nameEn}" to system defaults.`
        );
    };

    // Filter pages list
    const filteredPages = useMemo(() => {
        return allPages.filter((p) => {
            const matchesSearch =
                p.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.path.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGroup =
                selectedGroupFilter === 'all'
                    ? true
                    : selectedGroupFilter === 'leasing'
                    ? (p.groupId === 'leasing-industry' || p.groupId === 'leasing-equipment' || p.groupId === 'leasing')
                    : p.groupId === selectedGroupFilter;
            return matchesSearch && matchesGroup;
        });
    }, [allPages, searchQuery, selectedGroupFilter]);

    const groupedPages = useMemo(() => {
        const map: Record<string, PageDefinition[]> = {};
        NAV_GROUPS.forEach((g) => {
            map[g.id] = [];
        });
        filteredPages.forEach((p) => {
            const targetGroupId = p.groupId === 'leasing' ? 'leasing-industry' : p.groupId;
            if (!map[targetGroupId]) {
                map[targetGroupId] = [];
            }
            map[targetGroupId].push(p);
        });
        return map;
    }, [filteredPages]);

    const isPageCustomized = !!settings.pageContents?.[selectedPageId];

    return (
        <div className="space-y-8 w-full pb-28">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'ระบบจัดการเนื้อหาทุกหน้า' : 'Universal Page Content Editor'}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {lang === 'th' ? 'จัดการเนื้อหาทุกหน้าของเว็บไซต์' : 'Edit Content Across All Pages'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {lang === 'th'
                            ? 'เลือกหน้าที่ต้องการแก้ไข จัดแบ่งตามหมวดหมู่หลักของ Navbar (แบ่ง 2 หมวดหมู่ย่อยของสินเชื่อฯ) และเพิ่มหน้าเพจใหม่ได้สะดวก'
                            : 'Select any page to customize headlines, descriptions, equipment cards, images, and SEO metadata.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => openAddModal()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? '+ เพิ่มหน้าเพจใหม่' : '+ Add New Page'}</span>
                    </button>
                    <a
                        href={activePageDef.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-colors shadow-sm"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'ดูหน้าเว็บจริง' : 'View Live Page'}</span>
                    </a>
                </div>
            </div>

            {/* Layout: Left Page Selector (4 cols) & Right Editor Form (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Page Navigator */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="glass rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                                    {lang === 'th' ? 'เลือกหน้าที่ต้องการแก้ไข' : 'Select Page'}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    {filteredPages.length} {lang === 'th' ? 'หน้าทั้งหมด' : 'pages total'}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => openAddModal()}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[11px] font-semibold transition-colors"
                                title={lang === 'th' ? 'สร้างหน้าเพจใหม่' : 'Add new page'}
                            >
                                <Plus className="w-3 h-3" />
                                <span>{lang === 'th' ? 'เพิ่มหน้า' : 'Add Page'}</span>
                            </button>
                        </div>

                        {/* Search input */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={lang === 'th' ? 'ค้นหาชื่อหน้า หรือ URL...' : 'Search page or url...'}
                                className="w-full pl-8 pr-7 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Group Filter Tabs */}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                            <button
                                type="button"
                                onClick={() => setSelectedGroupFilter('all')}
                                className={cn(
                                    'px-2 py-1 rounded-lg text-[10px] font-semibold transition-all',
                                    selectedGroupFilter === 'all'
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-white/5 text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {lang === 'th' ? 'ทั้งหมด' : 'All'}
                            </button>
                            {/* Combined Financing Filter Pill */}
                            {(() => {
                                const count = (groupedPages['leasing-industry'] || []).length + (groupedPages['leasing-equipment'] || []).length;
                                return (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedGroupFilter('leasing')}
                                        className={cn(
                                            'px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1',
                                            selectedGroupFilter === 'leasing'
                                                ? 'bg-amber-500 text-white shadow-sm'
                                                : 'bg-white/5 text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        <Wrench className="w-3 h-3" />
                                        <span>{lang === 'th' ? 'สินเชื่อฯ ทั้งหมด' : 'Financing (All)'}</span>
                                        <span className="opacity-70 text-[9px]">({count})</span>
                                    </button>
                                );
                            })()}
                            {NAV_GROUPS.map((g) => {
                                const count = (groupedPages[g.id] || []).length;
                                return (
                                    <button
                                        key={g.id}
                                        type="button"
                                        onClick={() => setSelectedGroupFilter(g.id)}
                                        className={cn(
                                            'px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1',
                                            selectedGroupFilter === g.id
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'bg-white/5 text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        <span>{lang === 'th' ? g.labelTh : g.labelEn}</span>
                                        <span className="opacity-70 text-[9px]">({count})</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Grouped Accordion List */}
                        <div className="max-h-[620px] overflow-y-auto space-y-2 pr-1 pt-1">
                            {NAV_GROUPS.filter(g => 
                                selectedGroupFilter === 'all' 
                                || selectedGroupFilter === g.id 
                                || (selectedGroupFilter === 'leasing' && (g.id === 'leasing-industry' || g.id === 'leasing-equipment'))
                            ).map((group) => {
                                const pagesInGroup = groupedPages[group.id] || [];
                                const isExpanded = searchQuery.trim().length > 0 ? true : (expandedGroups[group.id] ?? true);
                                const GroupIcon = group.icon;
                                const isFirstLeasing = group.id === 'leasing-industry' && (selectedGroupFilter === 'all' || selectedGroupFilter === 'leasing');

                                return (
                                    <div key={group.id} className="space-y-1.5">
                                        {/* Visual Section Header for Equipment Financing */}
                                        {isFirstLeasing && (
                                            <div className="pt-2 pb-0.5 px-1 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                                                    <Wrench className="w-3.5 h-3.5" />
                                                    <span>{lang === 'th' ? 'สินเชื่อเครื่องจักรและอุปกรณ์' : 'Equipment Financing'}</span>
                                                </div>
                                                <span className="text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-medium">
                                                    {lang === 'th' ? 'แบ่งเป็น 2 หมวดหมู่ตาม Navbar' : '2 Sub-Categories'}
                                                </span>
                                            </div>
                                        )}

                                        <div className="rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-200">
                                            {/* Group Header */}
                                            <div
                                                className="flex items-center justify-between p-2.5 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer transition-colors select-none"
                                                onClick={() => toggleGroup(group.id)}
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border", group.badgeColor)}>
                                                        <GroupIcon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className="text-xs font-bold text-foreground block truncate">
                                                            {lang === 'th' ? group.labelTh : group.labelEn}
                                                        </span>
                                                        {group.parentId && (
                                                            <span className="text-[9px] text-muted-foreground block truncate">
                                                                {lang === 'th' ? group.parentLabelTh : group.parentLabelEn}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-muted-foreground font-mono">
                                                        {pagesInGroup.length}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => openAddModal(group.id)}
                                                        title={lang === 'th' ? `เพิ่มหน้าในหัวข้อ ${group.labelTh}` : `Add page to ${group.labelEn}`}
                                                        className="p-1 rounded-md text-muted-foreground hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleGroup(group.id)}
                                                        className="p-1 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronDown className="w-3.5 h-3.5" />
                                                        ) : (
                                                            <ChevronRight className="w-3.5 h-3.5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Group Pages List */}
                                            {isExpanded && (
                                                <div className="p-1.5 pt-0.5 space-y-1 border-t border-border/40">
                                                    {pagesInGroup.length === 0 ? (
                                                        <div className="p-3 text-center text-xs text-muted-foreground/70 italic">
                                                            {searchQuery
                                                                ? (lang === 'th' ? 'ไม่พบหน้าที่ค้นหาในกลุ่มนี้' : 'No matching pages')
                                                                : (lang === 'th' ? 'ยังไม่มีหน้าในหัวข้อนี้' : 'No pages yet')}
                                                        </div>
                                                    ) : (
                                                        pagesInGroup.map((page, pIdx) => {
                                                            const isSelected = page.id === selectedPageId;
                                                            const hasCustom = !!settings.pageContents?.[page.id];

                                                            return (
                                                                <div key={page.id}>
                                                                    {group.id === 'leasing-equipment' && pIdx === 3 && (
                                                                        <div className="pt-2 pb-1 px-2 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-t border-border/40 mt-1.5 mb-1">
                                                                            <Wrench className="w-3 h-3 text-sky-400" />
                                                                            <span>{lang === 'th' ? 'แบบฟอร์ม & เครื่องมือคำนวณสินเชื่อ' : 'Financing Tools & Applications'}</span>
                                                                        </div>
                                                                    )}
                                                                    <div
                                                                        onClick={() => handleSelectPage(page.id)}
                                                                        className={cn(
                                                                            'w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 group cursor-pointer',
                                                                            isSelected
                                                                                ? 'border-primary bg-primary/15 shadow-sm shadow-primary/10'
                                                                                : 'border-transparent hover:border-border/60 hover:bg-white/5'
                                                                        )}
                                                                    >
                                                                        <div className="min-w-0 flex-1">
                                                                            <div className="flex items-center gap-1.5">
                                                                                <p className={cn(
                                                                                    'text-xs font-semibold truncate',
                                                                                    isSelected ? 'text-primary' : 'text-foreground'
                                                                                )}>
                                                                                    {lang === 'th' ? page.nameTh : page.nameEn}
                                                                                </p>
                                                                                {page.isCustom && (
                                                                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                                                                                        New
                                                                                    </span>
                                                                                )}
                                                                                {hasCustom && !page.isCustom && (
                                                                                    <span
                                                                                        className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                                                                                        title="มีข้อมูลปรับแต่งพิเศษ"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            <p className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                                                                                {page.path}
                                                                            </p>
                                                                        </div>

                                                                        <div className="flex items-center gap-1 shrink-0">
                                                                            {page.isCustom && (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={(e) => handleDeleteCustomPage(page.id, page.nameTh, e)}
                                                                                    title={lang === 'th' ? 'ลบหน้านี้' : 'Delete page'}
                                                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-500/20 text-muted-foreground hover:text-rose-400 transition-all"
                                                                                >
                                                                                    <Trash2 className="w-3 h-3" />
                                                                                </button>
                                                                            )}
                                                                            <ChevronRight className={cn(
                                                                                "w-3.5 h-3.5 transition-transform",
                                                                                isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                                                                            )} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    )}

                                                    {/* Bottom Quick Add in this group */}
                                                    <button
                                                        type="button"
                                                        onClick={() => openAddModal(group.id)}
                                                        className="w-full py-1.5 px-2 rounded-lg border border-dashed border-border/60 hover:border-sky-500/50 hover:bg-sky-500/5 text-muted-foreground hover:text-sky-400 text-[11px] font-medium flex items-center justify-center gap-1 transition-all mt-1"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        <span>{lang === 'th' ? `+ เพิ่มหน้าในหัวข้อนี้` : `+ Add page in this group`}</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Form Editor */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Page Active Banner */}
                    <div className="glass rounded-2xl p-5 flex items-center justify-between gap-4 border-l-4 border-l-primary">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-base font-bold text-foreground truncate">
                                    {lang === 'th' ? activePageDef.nameTh : activePageDef.nameEn}
                                </h2>
                                <span className={cn(
                                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                                    activeNavGroup.badgeColor
                                )}>
                                    <span>
                                        {lang === 'th'
                                            ? (activeNavGroup.parentLabelTh ? `หัวข้อหลัก: ${activeNavGroup.parentLabelTh} > ${activeNavGroup.labelTh}` : `หัวข้อหลัก: ${activeNavGroup.labelTh}`)
                                            : (activeNavGroup.parentLabelEn ? `Nav: ${activeNavGroup.parentLabelEn} > ${activeNavGroup.labelEn}` : `Nav: ${activeNavGroup.labelEn}`)}
                                    </span>
                                </span>
                                {activePageDef.isCustom ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-semibold">
                                        <span>{lang === 'th' ? 'หน้าสร้างใหม่ (Custom)' : 'User Created'}</span>
                                    </span>
                                ) : isPageCustomized ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                                        <CheckCircle className="w-3 h-3" />
                                        <span>{lang === 'th' ? 'กำหนดเอง (Customized)' : 'Customized'}</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-semibold">
                                        <span>{lang === 'th' ? 'ค่าเริ่มต้น (Default)' : 'Default'}</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-mono text-muted-foreground mt-1">
                                URL Path: <a href={activePageDef.path} target="_blank" rel="noreferrer" className="text-primary hover:underline">{activePageDef.path}</a>
                            </p>
                        </div>

                        <a
                            href={activePageDef.path}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 p-2 rounded-xl bg-navy-light hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                            title={lang === 'th' ? 'เปิดดูหน้าจริง' : 'View live page'}
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Section 1: Hero Banner Text (TH / EN) */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {lang === 'th' ? '1. ส่วนหัวและแบนเนอร์หลัก (Hero Section)' : '1. Hero Section'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge ป้ายกำกับ (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeTh || ''}
                                    onChange={(e) => updateField('heroBadgeTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น SMART INDUSTRY"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Badge Label (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroBadgeEn || ''}
                                    onChange={(e) => updateField('heroBadgeEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. SMART INDUSTRY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    พาดหัวหลัก Hero Title (TH) *
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleTh || ''}
                                    onChange={(e) => updateField('heroTitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความพาดหัวหลักของหน้าภาษาไทย"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Hero Title (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.heroTitleEn || ''}
                                    onChange={(e) => updateField('heroTitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Hero headline in English"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    คำบรรยายรอง Subtitle (TH)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleTh || ''}
                                    onChange={(e) => updateField('heroSubtitleTh', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="ข้อความบรรยายรายละเอียดใต้พาดหัว"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    Subtitle (EN)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editContent.heroSubtitleEn || ''}
                                    onChange={(e) => updateField('heroSubtitleEn', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="Intro description in English"
                                />
                            </div>
                        </div>

                        {/* Hero Image URL */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                URL รูปภาพประกอบหลัก (Hero Image URL)
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <ImageIcon className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={editContent.heroImage || ''}
                                        onChange={(e) => updateField('heroImage', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                        placeholder="https://... หรือ /assets/..."
                                    />
                                </div>
                                {editContent.heroImage && (
                                    <img
                                        src={editContent.heroImage}
                                        alt="Preview"
                                        className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ข้อความปุ่ม CTA (TH)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextTh || ''}
                                    onChange={(e) => updateField('ctaTextTh', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น ขอสินเชื่อด่วน"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    CTA Button Text (EN)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaTextEn || ''}
                                    onChange={(e) => updateField('ctaTextEn', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. Apply Now"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    ลิงก์ปลายทาง (Link URL)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.ctaLink || ''}
                                    onChange={(e) => updateField('ctaLink', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary font-mono"
                                    placeholder="/leasing-application"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Section / Equipment Items */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-sky-400" />
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                    {selectedPageId === 'home'
                                        ? (lang === 'th' ? '2. การ์ดเรื่องราวและไฮไลต์หน้าแรก (Our Story Cards - 3 เสาหลัก)' : '2. Our Story Cards & Highlights')
                                        : (lang === 'th' ? '2. รายการเครื่องจักร & ไฮไลต์ (Section Items)' : '2. Highlighted Items')}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={loadDefaultStoryItems}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                                    title="โหลดข้อมูลตัวอย่างเดิมที่เป็นค่าเริ่มต้น"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>{lang === 'th' ? 'ใส่ข้อมูลตัวอย่างเริ่มต้น' : 'Load Defaults'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>{lang === 'th' ? 'เพิ่มรายการ' : 'Add Item'}</span>
                                </button>
                            </div>
                        </div>

                        {selectedPageId === 'home' && (
                            <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/20 space-y-3">
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                                    {lang === 'th' ? 'หัวข้อหลักและคำบรรยายของส่วนเรื่องราว (Section Header)' : 'Section Header Settings'}
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            หัวข้อใหญ่ (Section Title TH)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.sectionTitleTh || ''}
                                            onChange={(e) => updateField('sectionTitleTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="เรื่องราวของเรา"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            Section Title (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.sectionTitleEn || ''}
                                            onChange={(e) => updateField('sectionTitleEn', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="Our Story"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            คำบรรยายรอง (Section Subtitle TH)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.sectionSubtitleTh || ''}
                                            onChange={(e) => updateField('sectionSubtitleTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างยั่งยืนของภาคธุรกิจไทย"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            Section Subtitle (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.sectionSubtitleEn || ''}
                                            onChange={(e) => updateField('sectionSubtitleEn', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="Bridging financial opportunities towards sustainable growth for Thai businesses."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(!editContent.items || editContent.items.length === 0) ? (
                            <div className="text-center py-6 border border-dashed border-border rounded-xl space-y-3">
                                <p className="text-xs text-muted-foreground">
                                    {lang === 'th'
                                        ? 'ยังไม่มีรายการเครื่องจักรที่กำหนดเอง (ระบบจะใช้รายการพื้นฐานของหน้านี้)'
                                        : 'No custom section items added. Default template items will be used.'}
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={loadDefaultStoryItems}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'โหลดข้อมูลตัวอย่างเริ่มต้น' : 'Load Default Cards'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-border text-xs font-semibold transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'เพิ่มรายการเปล่า' : 'Add Empty Item'}</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {editContent.items.map((item, index) => (
                                    <div key={item.id} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary">
                                                #{index + 1} {item.title || 'รายการใหม่'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive p-1"
                                                title="ลบรายการนี้"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ชื่อเครื่องจักร / หัวข้อ (TH)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateItemField(item.id, 'title', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Title (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.titleEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'titleEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Highlight Quote Accent */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    คำพูดไฮไลต์ / โควทขีดเส้นฟ้า (TH)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.quote || ''}
                                                    onChange={(e) => updateItemField(item.id, 'quote', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="เช่น ธุรกิจไทยจำนวนมาก 'ไปต่อได้' แต่ติดอยู่ที่เงินทุนและเครื่องจักร"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Quote Accent (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.quoteEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'quoteEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="e.g. Many Thai enterprises have great potential..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    คำอธิบาย (TH)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.description}
                                                    onChange={(e) => updateItemField(item.id, 'description', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Description (EN)
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={item.descEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'descEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    URL รูปภาพ
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.image || ''}
                                                    onChange={(e) => updateItemField(item.id, 'image', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ป้ายกำกับ (Badge Tag)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.badge || ''}
                                                    onChange={(e) => updateItemField(item.id, 'badge', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="เช่น มาตรฐานสากล หรือ จุดเริ่มต้นของเรา"
                                                />
                                            </div>
                                        </div>

                                        {/* Button Text & Link */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ข้อความปุ่ม (TH)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.btnText || ''}
                                                    onChange={(e) => updateItemField(item.id, 'btnText', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="เช่น อ่านเรื่องราวของเรา"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    Button Text (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.btnTextEn || ''}
                                                    onChange={(e) => updateItemField(item.id, 'btnTextEn', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    placeholder="e.g. Read Our Story"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                    ลิงก์ปลายทาง (Link / Action)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.link || ''}
                                                    onChange={(e) => updateItemField(item.id, 'link', e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary font-mono"
                                                    placeholder="เช่น /about-us หรือ #newsletter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Section 3 (เฉพาะหน้าแรก): โซลูชั่นทางการเงินในอุตสาหกรรม (Industry Financing Solutions Carousel) */}
                    {selectedPageId === 'home' && (
                        <div className="glass rounded-2xl p-6 space-y-4 border-l-4 border-l-sky-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-sky-400" />
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                            {lang === 'th' ? '3. โซลูชั่นทางการเงินในอุตสาหกรรม (Our Financing Services Carousel)' : '3. Industry Solutions Carousel'}
                                        </h3>
                                        <p className="text-[11px] text-sky-400/80 font-medium">
                                            📍 {lang === 'th' ? 'ตำแหน่งบนหน้าแรก: อยู่ถัดจาก "เรื่องราวของเรา" (Our Story) ด้านบนของหน้าเว็บ' : 'Position: Next to Our Story, upper part of home page'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={randomizeFiveSolutions}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all shadow-sm"
                                        title="สุ่มข้อมูลตัวอย่างกลุ่มอุตสาหกรรม 5 รายการจากคลังอุตสาหกรรมจริง"
                                    >
                                        <Dices className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'สุ่มตัวอย่าง 5 อย่าง' : 'Randomize 5 Samples'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={loadDefaultSolutions}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                                        title="โหลด 5 กลุ่มอุตสาหกรรมเริ่มต้น (โรงงานน้ำดื่ม, ปศุสัตว์, แปรรูปอาหาร, ก๊าซชีวภาพ, โซลาร์เซลล์)"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'ใส่ข้อมูลเริ่มต้น (5 กลุ่มเดิม)' : 'Load Default (5 Sectors)'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addSolutionItem}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'เพิ่มกลุ่มอุตสาหกรรม' : 'Add Solution Card'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Section 3 Header Settings */}
                            <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/20 space-y-3">
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                                    {lang === 'th' ? 'หัวข้อหลักและคำบรรยายของสไลเดอร์กลุ่มอุตสาหกรรม' : 'Industry Solutions Header'}
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            Badge ป้ายกำกับ (TH/EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.solutionsBadgeTh || ''}
                                            onChange={(e) => updateField('solutionsBadgeTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="OUR FINANCING SERVICES"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            หัวข้อใหญ่ (Section Title TH)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.solutionsTitleTh || ''}
                                            onChange={(e) => updateField('solutionsTitleTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="โซลูชั่นทางการเงินของเราในอุตสาหกรรม"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            Section Title (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.solutionsTitleEn || ''}
                                            onChange={(e) => updateField('solutionsTitleEn', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="Our Industry Financing Solutions"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            คำบรรยายรอง (Section Subtitle TH)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.solutionsSubtitleTh || ''}
                                            onChange={(e) => updateField('solutionsSubtitleTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="โซลูชันสินเชื่อเช่าซื้อเครื่องจักรและอุปกรณ์ที่ปรับแต่งตามโครงสร้างธุรกิจ 5 กลุ่มอุตสาหกรรมหลัก"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 Solutions Cards */}
                            {(!editContent.solutionsItems || editContent.solutionsItems.length === 0) ? (
                                <div className="text-center py-6 border border-dashed border-border rounded-xl space-y-3">
                                    <p className="text-xs text-muted-foreground">
                                        {lang === 'th' ? 'ยังไม่มีการ์ดกลุ่มอุตสาหกรรมในรายการแก้ไข' : 'No custom solutions in editor list.'}
                                    </p>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={randomizeFiveSolutions}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                                        >
                                            <Dices className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'สุ่มตัวอย่าง 5 อย่าง' : 'Randomize 5 Samples'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={loadDefaultSolutions}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'ใส่ข้อมูลเริ่มต้น (5 กลุ่มเดิม)' : 'Load Default Cards'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addSolutionItem}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-border text-xs font-semibold transition-all"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'เพิ่มการ์ดใหม่' : 'Add Empty Card'}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {editContent.solutionsItems.map((item, index) => (
                                        <div key={item.id} className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/75 shadow-sm space-y-4 hover:border-sky-500/40 transition-all">
                                            {/* Card Top Action Bar */}
                                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/60">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="text-sm font-bold text-foreground">
                                                        {item.title || 'กลุ่มอุตสาหกรรม'}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-semibold">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveSolutionItem(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                        title="เลื่อนขึ้น"
                                                    >
                                                        <ArrowUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveSolutionItem(index, 'down')}
                                                        disabled={index === (editContent.solutionsItems?.length || 0) - 1}
                                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                        title="เลื่อนลง"
                                                    >
                                                        <ArrowDown className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => duplicateSolutionItem(item.id)}
                                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-sky-400 transition-all"
                                                        title="คัดลอกการ์ดนี้"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSolutionItem(item.id)}
                                                        className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 transition-all"
                                                        title="ลบการ์ดนี้"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Two Columns: Live Mini Preview (Left) + Form Inputs (Right) */}
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                                                {/* Visual Mini Preview (identical to website card) */}
                                                <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-border/80 bg-slate-900 shadow-md flex flex-col">
                                                    <div className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase px-3 py-1.5 bg-black/40 border-b border-white/5 flex items-center justify-between">
                                                        <span>ตัวอย่างการ์ดจริง (Live Preview)</span>
                                                        <span className="text-sky-400">หน้าแรก</span>
                                                    </div>

                                                    {/* Image Box */}
                                                    <div className="relative h-36 bg-slate-950 overflow-hidden">
                                                        <img
                                                            src={item.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80'}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                                                        {/* Top-Left Icon */}
                                                        <div className="absolute top-2.5 left-2.5 p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-sky-400">
                                                            {(() => {
                                                                const IconCmp = renderSolutionIcon(item.icon);
                                                                return <IconCmp className="w-4 h-4" />;
                                                            })()}
                                                        </div>

                                                        {/* Top-Right Badge */}
                                                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-sky-500/90 text-white text-[9px] font-bold tracking-wide backdrop-blur-md shadow-sm max-w-[150px] truncate">
                                                            {item.badge || 'ป้ายกำกับ'}
                                                        </div>
                                                    </div>

                                                    {/* Text Body */}
                                                    <div className="p-3.5 bg-card flex flex-col justify-between flex-1 gap-2.5">
                                                        <div>
                                                            <h4 className="text-xs font-bold text-foreground line-clamp-1">
                                                                {item.title || 'ชื่อกลุ่มอุตสาหกรรม'}
                                                            </h4>
                                                            <p className="text-[11px] text-sky-500 font-semibold line-clamp-1">
                                                                {item.subTitle || 'SubTitle ภาษาอังกฤษ'}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                                                {item.description || 'รายละเอียดเนื้อหาบริการสินเชื่อ...'}
                                                            </p>
                                                        </div>
                                                        <div className="w-full py-1.5 px-3 rounded-lg bg-sky-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm">
                                                            <span>{item.btnText || 'อ่านเพิ่มเติม'}</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Form Inputs (Right 8 Columns) */}
                                                <div className="lg:col-span-8 space-y-3">
                                                    {/* Row 1: Icon Selector & Tag Badge */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ไอคอนบนรูปภาพ (Icon)
                                                            </label>
                                                            <CustomSelect
                                                                value={item.icon || 'factory'}
                                                                onChange={(val) => updateSolutionField(item.id, 'icon', val)}
                                                                options={[
                                                                    { value: 'factory',  emoji: '🏭', label: 'โรงงาน / แปรรูปอาหาร',    description: 'Factory / Industrial' },
                                                                    { value: 'flame',    emoji: '🔥', label: 'ก๊าซชีวภาพ / พลังงาน',    description: 'Biogas / Flame' },
                                                                    { value: 'sun',      emoji: '☀️', label: 'โซลาร์เซลล์ / แสงอาทิตย์', description: 'Solar / Sun' },
                                                                    { value: 'droplets', emoji: '💧', label: 'น้ำดื่ม / ของเหลว',         description: 'Water / Droplets' },
                                                                    { value: 'wheat',    emoji: '🌾', label: 'ฟาร์มปศุสัตว์ / เกษตร',   description: 'Farm / Wheat' },
                                                                    { value: 'box',      emoji: '📦', label: 'คลังสินค้า / บรรจุภัณฑ์', description: 'Box / Logistics' },
                                                                    { value: 'sparkles', emoji: '✨', label: 'โซลูชันทั่วไป',           description: 'General / Sparkles' },
                                                                ]}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ป้ายกำกับมุมขวาบนรูป (Tag / Badge)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.badge || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'badge', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                                placeholder="เช่น เครื่องจักรอุตสาหกรรมอาหาร, พลังงานทดแทน ESG"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Row 2: Title TH & EN */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ชื่อกลุ่มอุตสาหกรรม (TH)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => updateSolutionField(item.id, 'title', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs font-semibold focus:ring-1 focus:ring-primary"
                                                                placeholder="เช่น อุตสาหกรรมแปรรูปอาหาร"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ชื่อกลุ่มอุตสาหกรรม (EN)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.titleEn || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'titleEn', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                                placeholder="Food Processing Plant"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Row 3: Subtitle (Blue text under title) & Link */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                คำบรรยายภาษาอังกฤษสีฟ้า (SubTitle EN)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.subTitle || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'subTitle', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-sky-400 text-xs focus:ring-1 focus:ring-primary"
                                                                placeholder="เช่น Food Processing & Packaging Lines"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ลิงก์ปลายทาง (Link URL)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.link || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'link', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs font-mono focus:ring-1 focus:ring-primary"
                                                                placeholder="/food-processing"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Row 4: Description TH & EN */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                คำอธิบายบริการ (TH)
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                value={item.description}
                                                                onChange={(e) => updateSolutionField(item.id, 'description', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary leading-relaxed"
                                                                placeholder="สินเชื่อเครื่องจักรแปรรูปอาหาร: เครื่องแช่เยือกแข็ง IQF, หม้อต้ม Retort..."
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                Description (EN)
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                value={item.descEn || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'descEn', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary leading-relaxed"
                                                                placeholder="Turnkey machinery financing for IQF spiral freezers..."
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Row 5: Image URL & Button text */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                URL รูปภาพ (Image URL)
                                                            </label>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={item.image || ''}
                                                                    onChange={(e) => updateSolutionField(item.id, 'image', e.target.value)}
                                                                    className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                                    placeholder="https://images.unsplash.com/..."
                                                                />
                                                                {item.image && (
                                                                    <img
                                                                        src={item.image}
                                                                        alt="Thumb"
                                                                        className="w-8 h-8 rounded-lg object-cover border border-border flex-shrink-0"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                                ข้อความปุ่ม (Button Text)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.btnText || ''}
                                                                onChange={(e) => updateSolutionField(item.id, 'btnText', e.target.value)}
                                                                className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                                placeholder="อ่านเพิ่มเติม"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Section 4 (เฉพาะหน้าแรก): บริการเครื่องจักรทางการเงินหลัก (Key Machinery Services Carousel) */}
                    {selectedPageId === 'home' && (
                        <div className="glass rounded-2xl p-6 space-y-4 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-blue-400" />
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                            {lang === 'th' ? '4. เครื่องจักรและบริการทางการเงินหลัก (Key Machinery Carousel)' : '4. Key Machinery Carousel'}
                                        </h3>
                                        <p className="text-[11px] text-blue-400/80 font-medium">
                                            📍 {lang === 'th' ? 'ตำแหน่งบนหน้าแรก: อยู่ถัดจาก "สิ่งที่เราทำ" (What We Do) ช่วงกลาง-ล่างของหน้าเว็บ' : 'Position: Below What We Do, lower-middle section of home page'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={randomizeFiveMachinery}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all shadow-sm"
                                        title="สุ่มเครื่องจักรอุตสาหกรรม 5 รายการจากคลังเครื่องจักรจริง"
                                    >
                                        <Dices className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'สุ่มเครื่องจักร 5 อย่าง' : 'Randomize 5 Machines'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={loadDefaultMachinery}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
                                        title="โหลด 5 เครื่องจักรเริ่มต้น (เครื่องเป่าขวด, เครื่องฉีดพลาสติก, ชิลเลอร์, เครื่องกำเนิดไฟฟ้า, โซลาร์รูฟท็อป)"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'ใส่ข้อมูลเริ่มต้น (5 เครื่องเดิม)' : 'Load Default (5 Machines)'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addMachineryItem}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>{lang === 'th' ? 'เพิ่มเครื่องจักร' : 'Add Machine Card'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Section 4 Header Settings */}
                            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            Badge ป้ายกำกับ
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.machineryBadgeTh || ''}
                                            onChange={(e) => updateField('machineryBadgeTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="KEY FINANCING SERVICES"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                            หัวข้อใหญ่ (Section Title TH)
                                        </label>
                                        <input
                                            type="text"
                                            value={editContent.machineryTitleTh || ''}
                                            onChange={(e) => updateField('machineryTitleTh', e.target.value)}
                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                            placeholder="บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 Machines List */}
                            {(!editContent.machineryItems || editContent.machineryItems.length === 0) ? (
                                <div className="text-center py-6 border border-dashed border-border rounded-xl space-y-3">
                                    <p className="text-xs text-muted-foreground">
                                        {lang === 'th' ? 'ยังไม่มีเครื่องจักรในรายการแก้ไข' : 'No custom machines in editor list.'}
                                    </p>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={randomizeFiveMachinery}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                                        >
                                            <Dices className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'สุ่มเครื่องจักร 5 อย่าง' : 'Randomize 5 Machines'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={loadDefaultMachinery}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'ใส่ข้อมูลเริ่มต้น (5 เครื่องเดิม)' : 'Load Default Machines'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addMachineryItem}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-border text-xs font-semibold transition-all"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>{lang === 'th' ? 'เพิ่มเครื่องจักรใหม่' : 'Add Empty Machine'}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {editContent.machineryItems.map((item, index) => (
                                        <div key={item.id} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-blue-400">
                                                    #{index + 1} {item.title || 'เครื่องจักรใหม่'}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveMachineryItem(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                        title="เลื่อนขึ้น"
                                                    >
                                                        <ArrowUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveMachineryItem(index, 'down')}
                                                        disabled={index === (editContent.machineryItems?.length || 0) - 1}
                                                        className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                        title="เลื่อนลง"
                                                    >
                                                        <ArrowDown className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMachineryItem(item.id)}
                                                        className="p-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 transition-all"
                                                        title="ลบเครื่องจักรนี้"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                        ชื่อเครื่องจักร (Title)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => updateMachineryField(item.id, 'title', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                        คำบรรยายย่อย (SubTitle)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.subTitle || ''}
                                                        onChange={(e) => updateMachineryField(item.id, 'subTitle', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                        URL รูปภาพ
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={item.image || ''}
                                                            onChange={(e) => updateMachineryField(item.id, 'image', e.target.value.trim())}
                                                            placeholder="https://images.unsplash.com/..."
                                                            className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                                        />
                                                        {item.image && (
                                                            <div
                                                                className="relative w-9 h-9 rounded-lg overflow-hidden border border-border bg-slate-900 flex-shrink-0 flex items-center justify-center group/thumb"
                                                                title={lang === 'th' ? 'คลิกดูภาพตัวอย่างขนาดเต็ม' : 'Click to preview full image'}
                                                            >
                                                                <a href={item.image} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                                                                    <img
                                                                        src={item.image}
                                                                        alt="Thumb"
                                                                        className="w-full h-full object-cover"
                                                                        referrerPolicy="no-referrer"
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                                        ลิงก์ปลายทาง (Link URL)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.link || ''}
                                                        onChange={(e) => updateMachineryField(item.id, 'link', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Section 5: SEO Metadata */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-sky-400" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                {selectedPageId === 'home'
                                    ? (lang === 'th' ? '5. ข้อมูล SEO & Search Engines' : '5. SEO & Metadata')
                                    : (lang === 'th' ? '3. ข้อมูล SEO & Search Engines' : '3. SEO & Metadata')}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Title (ชื่อที่จะปรากฏบนแถบเบราว์เซอร์และผลการค้นหา Google)
                                </label>
                                <input
                                    type="text"
                                    value={editContent.metaTitle || ''}
                                    onChange={(e) => updateField('metaTitle', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="เช่น สินเชื่อโรงงานผลิตน้ำดื่ม | Agile Assets"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    SEO Meta Description (คำอธิบายย่อสำหรับการค้นหา)
                                </label>
                                <textarea
                                    rows={2}
                                    value={editContent.metaDescription || ''}
                                    onChange={(e) => updateField('metaDescription', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary"
                                    placeholder="คำอธิบายสรุปความยาวประมาณ 120-160 ตัวอักษร"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Save Action Bar (Always visible at all times across all scroll positions) */}
            <div className={`fixed bottom-0 left-0 lg:left-64 right-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-xl border-t flex items-center justify-between gap-4 transition-colors duration-300 ${
                isDirty 
                    ? 'bg-amber-50/95 dark:bg-slate-950/95 border-amber-500/50 shadow-[0_-4px_25px_rgba(245,158,11,0.15)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)]' 
                    : 'bg-white/95 dark:bg-slate-950/95 border-slate-200/90 dark:border-border shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)]'
            }`}>
                <div className="flex items-center gap-3 min-w-0">
                    {isDirty ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold shrink-0 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>{lang === 'th' ? '⚠️ มีการแก้ไขที่ยังไม่ได้บันทึก' : '⚠️ Unsaved Changes'}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-700 dark:text-sky-400 text-xs font-semibold shrink-0">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{lang === 'th' ? `กำลังแก้ไข: ${activePageDef.nameTh}` : `Editing: ${activePageDef.nameEn}`}</span>
                        </div>
                    )}
                    <span className="hidden md:inline text-xs truncate font-medium text-slate-600 dark:text-slate-300">
                        {isDirty
                            ? (lang === 'th'
                                ? 'กรุณากดปุ่ม "บันทึกข้อมูลหน้านี้" (ด้านขวา) เพื่อให้รูปภาพและข้อมูลขึ้นบนหน้าเว็บหลักทันที'
                                : 'Please click "Save Changes" on the right to apply your image and edits to the live site.')
                            : (lang === 'th'
                                ? 'ข้อมูลหน้านี้เป็นเวอร์ชันล่าสุดแล้ว'
                                : 'Current page content is synchronized with the live website.')}
                    </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-border text-xs font-semibold text-slate-700 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
                        title="คืนค่าเป็นค่าเริ่มต้นของหน้านี้"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? 'รีเซ็ตหน้านี้' : 'Reset Page'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className={`btn-dynamic-theme inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
                            isDirty
                                ? 'shadow-xl ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-950 animate-pulse hover:scale-105'
                                : 'shadow-lg hover:scale-105'
                        }`}
                    >
                        <Save className="w-4 h-4" />
                        <span>{lang === 'th' ? 'บันทึกข้อมูลหน้านี้' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Modal: เพิ่มหน้าเพจใหม่ */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
                    <div className="glass rounded-3xl border border-sky-500/30 bg-card/95 p-6 w-full max-w-lg shadow-2xl space-y-5 animate-scale-up">
                        <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                                    <FolderPlus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-foreground">
                                        {lang === 'th' ? 'เพิ่มหน้าเพจใหม่' : 'Add New Page'}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {lang === 'th'
                                            ? 'กำหนดชื่อ URL และจัดเข้าหมวดหมู่หลักของ Navbar (เช่น Industry Solutions หรือ Industrial Equipment)'
                                            : 'Configure page details and assign to Navbar categories'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-1.5 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePage} className="space-y-4">
                            {/* Field: เลือกหัวข้อหลัก */}
                            <div>
                                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                                    <span>{lang === 'th' ? 'เลือกหัวข้อหลักใน Navbar *' : 'Assign to Main Nav Group *'}</span>
                                </label>
                                <CustomSelect
                                    value={newPageGroupId}
                                    onChange={setNewPageGroupId}
                                    options={NAV_GROUPS.map((g) => ({
                                        value: g.id,
                                        label: lang === 'th'
                                            ? (g.parentLabelTh ? `${g.parentLabelTh} → ${g.labelTh}` : g.labelTh)
                                            : (g.parentLabelEn ? `${g.parentLabelEn} → ${g.labelEn}` : g.labelEn),
                                        description: g.descriptionTh,
                                        badgeColor: g.badgeColor,
                                        icon: g.icon,
                                    }))}
                                />
                            </div>

                            {/* Field: ชื่อหน้าภาษาไทย */}
                            <div>
                                <label className="block text-xs font-bold text-foreground mb-1.5">
                                    {lang === 'th' ? 'ชื่อหน้า (ภาษาไทย) *' : 'Page Name (Thai) *'}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newPageNameTh}
                                    onChange={(e) => {
                                        setNewPageNameTh(e.target.value);
                                        if (!newPagePath) {
                                            const slug = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
                                            if (slug) {
                                                setNewPagePath(`/${slug}`);
                                            }
                                        }
                                    }}
                                    placeholder={lang === 'th' ? 'เช่น สินเชื่อโซลาร์ลอยน้ำ หรือ ข้อมูลโปรโมชัน' : 'e.g. Solar Floating or Promotion'}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {/* Field: ชื่อหน้าภาษาอังกฤษ */}
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                    {lang === 'th' ? 'ชื่อหน้า (English / ภาษาอังกฤษ)' : 'Page Name (English)'}
                                </label>
                                <input
                                    type="text"
                                    value={newPageNameEn}
                                    onChange={(e) => {
                                        setNewPageNameEn(e.target.value);
                                        if (!newPagePath && e.target.value) {
                                            const slug = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
                                            setNewPagePath(`/${slug}`);
                                        }
                                    }}
                                    placeholder="e.g. Floating Solar Farm"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {/* Field: URL Path */}
                            <div>
                                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center justify-between">
                                    <span>{lang === 'th' ? 'URL Path (เส้นทางหน้าเว็บ) *' : 'URL Path *'}</span>
                                    <span className="text-[10px] text-muted-foreground font-normal">
                                        {lang === 'th' ? 'ต้องขึ้นต้นด้วย /' : 'must start with /'}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newPagePath}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if (val && !val.startsWith('/')) {
                                            val = '/' + val;
                                        }
                                        setNewPagePath(val);
                                    }}
                                    placeholder="/floating-solar"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                                >
                                    {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'บันทึกและสร้างหน้า' : 'Create Page'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
