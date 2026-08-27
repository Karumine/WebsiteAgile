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
    customerSatisfactionPct: string;
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

export interface SiteSettings {
    banner: BannerSettings;
    interestRates: InterestRate[];
    news: NewsItem[];
    customFields: CustomField[];
    companyInfo: CompanyInfo;
    impactStats: ImpactStats;
    usedMachinery: UsedMachineryItem[];
    faqs: FaqItem[];
    lastUpdated: string;
}

export interface User {
    username: string;
    role: 'admin';
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}
