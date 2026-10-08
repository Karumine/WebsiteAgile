export interface BannerSettings {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
}

export interface InterestRate {
    id: string;
    product: string;
    rate: number;
    term: string;
    featured: boolean;
    description: string;
}

export interface NewsItem {
    id: string;
    title: string;
    title_en: string;
    excerpt: string;
    excerpt_en: string;
    content: string;
    content_en: string;
    date: string;
    pinned: boolean;
    category: string;
    image?: string;
}

export interface CustomField {
    id: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'boolean' | 'url';
    value: string;
    campaign: string;
}

export interface ImpactStats {
    factoriesServed: string;
    totalCreditValueMB: string;
    totalContractsCount: string;
    customerSatisfactionPct?: string;
}

export interface UsedMachineryItem {
    id: string;
    title: string;
    title_en?: string;
    category: string;
    price: string;
    year: string;
    condition: string;
    description: string;
    image: string;
    status: 'available' | 'reserved' | 'sold';
}

export interface FaqItem {
    id: string;
    question: string;
    question_en?: string;
    answer: string;
    answer_en?: string;
    category: string;
}

export interface CompanyInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    lineId?: string;
    facebook?: string;
    mapUrl?: string;
    operatingHours?: string;
}

export interface ThemeSettings {
    primaryColor: string;
    gradientStart: string;
    gradientEnd: string;
    buttonTextColor: string;
    buttonRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
    buttonStyle: 'gradient' | 'solid' | 'glow';
    accentColor: string;
}

export interface PageSectionItem {
    id: string;
    title: string;
    titleEn?: string;
    subTitle?: string;
    subTitleEn?: string;
    description: string;
    descEn?: string;
    badge?: string;
    icon?: string;
    image?: string;
    link?: string;
    quote?: string;
    quoteEn?: string;
    btnText?: string;
    btnTextEn?: string;
}

export interface PageCustomContent {
    id: string;
    pageName: string;
    titleTh: string;
    titleEn?: string;
    sectionTitleTh?: string;
    sectionTitleEn?: string;
    sectionSubtitleTh?: string;
    sectionSubtitleEn?: string;
    metaTitle?: string;
    metaDescription?: string;
    heroBadgeTh?: string;
    heroBadgeEn?: string;
    heroTitleTh: string;
    heroTitleEn?: string;
    heroSubtitleTh: string;
    heroSubtitleEn?: string;
    heroImage?: string;
    ctaTextTh?: string;
    ctaTextEn?: string;
    ctaLink?: string;
    contentTh?: string;
    contentEn?: string;
    items?: PageSectionItem[];

    // Section 3: Industry Solutions (ServicesRangeSection)
    solutionsBadgeTh?: string;
    solutionsBadgeEn?: string;
    solutionsTitleTh?: string;
    solutionsTitleEn?: string;
    solutionsSubtitleTh?: string;
    solutionsSubtitleEn?: string;
    solutionsItems?: PageSectionItem[];

    // Section 4: Key Machinery Services (KeyFinancingServicesSection)
    machineryBadgeTh?: string;
    machineryBadgeEn?: string;
    machineryTitleTh?: string;
    machineryTitleEn?: string;
    machinerySubtitleTh?: string;
    machinerySubtitleEn?: string;
    machineryItems?: PageSectionItem[];

    // Section 5: What We Do (WhatWeDoSection)
    whatWeDoBadgeTh?: string;
    whatWeDoBadgeEn?: string;
    whatWeDoTitleTh?: string;
    whatWeDoTitleEn?: string;
    whatWeDoSubtitleTh?: string;
    whatWeDoSubtitleEn?: string;
    whatWeDoImage?: string;
    whatWeDoItems?: PageSectionItem[];

    sections?: Record<string, PageSectionContent>;
    /** Page-builder blocks, used by admin-created pages (`page-*`). */
    blocks?: PageBlock[];

    lastUpdated?: string;
}

export type SectionListItem = Record<string, string>;

export interface PageSectionContent {
    hidden?: boolean;
    fields?: Record<string, string>;
    items?: SectionListItem[];
}

export interface PageBlock extends PageSectionContent {
    id: string;
    type: string;
}

export interface CustomPageItem {
    id: string;
    groupId: string;
    nameTh: string;
    nameEn: string;
    path: string;
    createdAt?: string;
}

export interface SiteSettings {
    banner: BannerSettings;
    interestRates: InterestRate[];
    news: NewsItem[];
    customFields: CustomField[];
    companyInfo: CompanyInfo;
    impactStats: ImpactStats;
    usedMachinery: UsedMachineryItem[];
    faqs: FaqItem[];
    themeSettings?: ThemeSettings;
    pageContents?: Record<string, PageCustomContent>;
    customPages?: CustomPageItem[];
    lastUpdated: string;
}

export interface User {
    id?: string | number;
    username: string;
    role: 'admin';
    fullName?: string;
    email?: string;
    /** Set by the backend for accounts still on a temporary password. */
    mustChangePassword?: boolean;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

export interface LoginResponseData {
    user: User;
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}

export interface JobApplicationCreate {
    fullName: string;
    email: string;
    phone: string;
    positionId?: string;
    positionTitle?: string;
    experienceYears?: string;
    expectedSalary?: string;
    resumeUrl?: string;
    coverLetter?: string;
}

export interface JobApplication extends JobApplicationCreate {
    id: string;
    status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
    createdAt: string;
    notes?: string;
}

export interface PagedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}

export type LoginOutcome =
    | { ok: true }
    | { ok: false; reason: 'invalid' | 'locked' | 'unavailable'; retryAfterSec?: number };

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    /** True when signed in with a backend JWT (changes are published to the live site). */
    isServerSession: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<LoginOutcome>;
    logout: () => void;
}

