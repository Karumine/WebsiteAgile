import { apiRequest, type ApiResult } from './apiClient';

/** Anti-bot / context data attached to every public form submission. */
export interface SubmissionMeta {
    captchaToken?: string;
    elapsedMs: number;
    pageUrl: string;
    lang: 'th' | 'en';
}

export type InquirySource =
    | 'home-contact'
    | 'drinking-water-production'
    | 'livestock-farm'
    | 'food-processing'
    | 'biogas-production'
    | 'solar-power-generation'
    | 'chiller'
    | 'injection-molding'
    | 'generator-set'
    | 'investor-relations'
    | 'sustainability'
    | 'asset-for-sale';

export interface InquiryPayload {
    source: InquirySource;
    name: string;
    phone?: string;
    email?: string;
    company?: string;
    message?: string;
    interestType?: string;
    projectType?: string;
}

export interface ContactPayload {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface LeasingPayload {
    applicantType: 'corporate' | 'individual';
    firstName: string;
    lastName: string;
    companyName?: string;
    businessType?: string;
    machineInterest: string;
    address1: string;
    address2?: string;
    district: string;
    province: string;
    postalCode: string;
    phone: string;
    email: string;
    purpose: { new: boolean; replace: boolean; other: boolean };
    otherDetails?: string;
    acceptConsent: boolean;
}

export interface NdaPayload {
    fullName: string;
    idCard: string;
    email: string;
    company?: string;
    phone?: string;
    agreed: boolean;
    signature: Blob;
}

export interface NewsletterPayload {
    email: string;
    name?: string;
    company?: string;
}

export interface SubmissionReceipt {
    id?: string | number;
    referenceNumber?: string;
    applicationNumber?: string;
    timestamp?: string;
    message?: string;
}

const post = <T>(endpoint: string, payload: object, meta: SubmissionMeta) =>
    apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify({ ...payload, meta }) });

export const formService = {
    submitInquiry(payload: InquiryPayload, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        return post('/forms/inquiry', payload, meta);
    },

    submitContact(payload: ContactPayload, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        return post('/forms/contact', payload, meta);
    },

    submitLeasing(payload: LeasingPayload, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        return post('/forms/leasing', payload, meta);
    },

    subscribeNewsletter(payload: NewsletterPayload, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        return post('/forms/newsletter', payload, meta);
    },

    submitNda(payload: NdaPayload, meta: SubmissionMeta): Promise<ApiResult<SubmissionReceipt>> {
        const body = new FormData();
        body.append('fullName', payload.fullName);
        body.append('idCard', payload.idCard);
        body.append('email', payload.email);
        if (payload.company) body.append('company', payload.company);
        if (payload.phone) body.append('phone', payload.phone);
        body.append('agreed', String(payload.agreed));
        body.append('signatureImage', payload.signature, 'signature.png');
        body.append('meta', JSON.stringify(meta));
        return apiRequest('/forms/nc-nda', { method: 'POST', body, timeout: 30000 });
    },
};
