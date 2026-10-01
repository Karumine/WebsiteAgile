import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { Turnstile } from '@/components/ui/Turnstile';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile';
import type { ApiResult } from '@/services/apiClient';
import type { SubmissionMeta } from '@/services/formService';

const RESUBMIT_COOLDOWN_MS = 15_000;

/**
 * Shared submit pipeline for every public form: honeypot, double-submit lock,
 * resubmit cooldown, optional Turnstile, and honest error feedback.
 * Render `guardFields` inside the <form>.
 */
export function useLeadSubmit() {
    const { lang } = useLanguage();
    const { settings } = useSiteSettings();
    const startedAt = useRef(Date.now());
    const lastSuccessAt = useRef(0);
    const inFlight = useRef(false);
    const honeypotRef = useRef<HTMLInputElement>(null);
    const [captchaToken, setCaptchaToken] = useState<string>();
    const [captchaKey, setCaptchaKey] = useState(0);

    const phone = settings.companyInfo?.phone || '02-000-9392';
    const th = lang === 'th';

    const send = useCallback(
        async <T,>(request: (meta: SubmissionMeta) => Promise<ApiResult<T>>): Promise<ApiResult<T> | null> => {
            if (inFlight.current) return null;

            // Bots fill hidden fields; pretend success so they don't retry.
            if (honeypotRef.current?.value) {
                return { success: true, status: 200 };
            }

            if (Date.now() - lastSuccessAt.current < RESUBMIT_COOLDOWN_MS) {
                toast.error(th ? 'คุณเพิ่งส่งข้อมูลไป กรุณารอสักครู่ก่อนส่งอีกครั้ง' : 'You just submitted. Please wait a moment before sending again.');
                return null;
            }

            if (TURNSTILE_SITE_KEY && !captchaToken) {
                toast.error(th ? 'กรุณายืนยันว่าคุณไม่ใช่บอทก่อนส่งข้อมูล' : 'Please complete the verification before submitting.');
                return null;
            }

            inFlight.current = true;
            try {
                const result = await request({
                    captchaToken,
                    elapsedMs: Date.now() - startedAt.current,
                    pageUrl: window.location.href,
                    lang,
                });

                if (result.success) {
                    lastSuccessAt.current = Date.now();
                    startedAt.current = Date.now();
                    return result;
                }

                if (result.status === 429) {
                    toast.error(th ? 'ส่งข้อมูลบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่' : 'Too many attempts. Please wait a moment and try again.');
                } else if (result.status === 400 || result.status === 422) {
                    toast.error(result.message || (th ? 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' : 'Some details are invalid. Please check and try again.'));
                } else {
                    toast.error(
                        th
                            ? `ระบบส่งข้อมูลขัดข้องชั่วคราว ข้อมูลของคุณยังไม่ถูกส่ง กรุณาลองใหม่ หรือโทร ${phone}`
                            : `We couldn't send your details right now. Please try again or call ${phone}.`,
                        { duration: 8000 }
                    );
                }
                return null;
            } finally {
                inFlight.current = false;
                if (TURNSTILE_SITE_KEY) {
                    setCaptchaToken(undefined);
                    setCaptchaKey((k) => k + 1);
                }
            }
        },
        [captchaToken, lang, phone, th]
    );

    const guardFields = (
        <>
            <div aria-hidden="true" className="sr-only">
                <label>
                    Leave this field empty
                    <input ref={honeypotRef} type="text" name="website_url" tabIndex={-1} autoComplete="off" defaultValue="" />
                </label>
            </div>
            <Turnstile key={captchaKey} lang={lang} onToken={setCaptchaToken} />
        </>
    );

    return { send, guardFields };
}
