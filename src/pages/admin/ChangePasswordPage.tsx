import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, KeyRound, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { authService } from '@/services/authService';

const MIN_LENGTH = 12;

const inputCls = 'w-full px-4 py-3 pr-12 rounded-xl bg-navy-light border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all';

export function ChangePasswordPage() {
    const { user, logout, isServerSession } = useAuth();
    const { pendingSections } = useSiteSettings();
    const { lang } = useLanguage();
    const navigate = useNavigate();
    const th = lang === 'th';

    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!current) {
            setError(th ? 'กรุณากรอกรหัสผ่านปัจจุบัน' : 'Enter your current password.');
            return;
        }
        if (next.length < MIN_LENGTH) {
            setError(th ? `รหัสผ่านใหม่ต้องมีอย่างน้อย ${MIN_LENGTH} ตัวอักษร` : `The new password must be at least ${MIN_LENGTH} characters.`);
            return;
        }
        if (next === current) {
            setError(th ? 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม' : 'The new password must differ from the current one.');
            return;
        }
        if (next !== confirm) {
            setError(th ? 'ยืนยันรหัสผ่านใหม่ไม่ตรงกัน' : 'The new passwords do not match.');
            return;
        }
        if (pendingSections.length > 0 && !window.confirm(th
            ? 'ยังมีการแก้ไขที่ยังไม่ได้เผยแพร่ หลังเปลี่ยนรหัสผ่านต้องเข้าสู่ระบบใหม่ (แบบร่างยังอยู่ในเบราว์เซอร์นี้) ดำเนินการต่อหรือไม่?'
            : 'You have unpublished changes. You will need to sign in again after changing the password (the draft stays in this browser). Continue?')) {
            return;
        }

        setSaving(true);
        const res = await authService.changePassword(current, next);
        setSaving(false);

        if (res.success) {
            toast.success(th ? 'เปลี่ยนรหัสผ่านแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่' : 'Password changed. Please sign in with your new password.', { duration: 6000 });
            logout();
            navigate('/management-portal', { replace: true });
            return;
        }

        setCurrent('');
        if (res.status === 401) return; // Session expired: the client already redirects to the login page
        if (res.status === 429) {
            setError(th ? 'ลองบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่' : 'Too many attempts. Please wait and try again.');
        } else if (res.status === 400 || res.status === 403 || res.status === 422) {
            setError(res.message || (th ? 'รหัสผ่านปัจจุบันไม่ถูกต้อง หรือรหัสผ่านใหม่ไม่ผ่านเงื่อนไข' : 'The current password is wrong or the new password is not allowed.'));
        } else {
            setError(th ? 'ไม่สามารถเชื่อมต่อระบบหลังบ้านได้ กรุณาลองใหม่ภายหลัง' : 'The server is unavailable. Please try again later.');
        }
    };

    const field = (id: string, label: string, value: string, set: (v: string) => void, autoComplete: string) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1.5">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    maxLength={200}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className={inputCls}
                    autoComplete={autoComplete}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? (th ? 'ซ่อนรหัสผ่าน' : 'Hide password') : (th ? 'แสดงรหัสผ่าน' : 'Show password')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-xl">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{th ? 'เปลี่ยนรหัสผ่าน' : 'Change Password'}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {th ? `บัญชี ${user?.username ?? ''} — หลังเปลี่ยนแล้วทุกอุปกรณ์จะถูกออกจากระบบ` : `Account ${user?.username ?? ''} — every device is signed out after the change.`}
                </p>
            </div>

            {user?.mustChangePassword && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                    {th ? 'บัญชีนี้ยังใช้รหัสผ่านชั่วคราว กรุณาตั้งรหัสผ่านใหม่ก่อนใช้งาน' : 'This account still uses a temporary password. Please set a new one before continuing.'}
                </div>
            )}

            {!isServerSession ? (
                <p className="glass rounded-2xl p-6 text-sm text-muted-foreground">
                    {th ? 'เปลี่ยนรหัสผ่านได้เฉพาะเมื่อเข้าสู่ระบบผ่านเซิร์ฟเวอร์หลังบ้าน' : 'Password changes require a session signed in through the backend server.'}
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
                    {error && (
                        <div role="alert" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}
                    {field('current-password', th ? 'รหัสผ่านปัจจุบัน' : 'Current password', current, setCurrent, 'current-password')}
                    {field('new-password', th ? `รหัสผ่านใหม่ (อย่างน้อย ${MIN_LENGTH} ตัวอักษร)` : `New password (at least ${MIN_LENGTH} characters)`, next, setNext, 'new-password')}
                    {field('confirm-password', th ? 'ยืนยันรหัสผ่านใหม่' : 'Confirm new password', confirm, setConfirm, 'new-password')}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving
                            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <KeyRound className="w-4 h-4" />}
                        {th ? 'บันทึกรหัสผ่านใหม่' : 'Save new password'}
                    </button>
                </form>
            )}
        </div>
    );
}
