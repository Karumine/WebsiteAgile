import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cmsService } from '@/services/cmsService';
import { cn } from '@/lib/utils';

type UploadFolder = 'news' | 'assets' | 'banner' | 'pages';

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Uploads an image to `POST /uploads/images` and hands back its public URL.
 * Sits next to an image-URL input; disabled outside backend sessions.
 */
export function ImageUploadButton({ folder, onUploaded, className }: {
    folder: UploadFolder;
    onUploaded: (url: string) => void;
    className?: string;
}) {
    const { isServerSession } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > MAX_BYTES) {
            toast.error('รองรับเฉพาะไฟล์ JPG, PNG, WebP ขนาดไม่เกิน 5MB');
            return;
        }
        setUploading(true);
        const res = await cmsService.uploadImage(file, folder);
        setUploading(false);
        if (res.success && res.data?.url) {
            onUploaded(res.data.url);
            toast.success('อัปโหลดรูปแล้ว');
        } else {
            toast.error(`อัปโหลดรูปไม่สำเร็จ ${res.message || ''}`.trim());
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={!isServerSession || uploading}
                title={isServerSession ? 'อัปโหลดรูปจากเครื่อง (JPG, PNG, WebP ≤ 5MB)' : 'อัปโหลดได้เมื่อเข้าสู่ระบบผ่านเซิร์ฟเวอร์หลังบ้าน'}
                className={cn(
                    'shrink-0 inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border bg-navy-light border-border text-muted-foreground text-xs font-medium hover:text-foreground hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed',
                    className
                )}
            >
                {uploading
                    ? <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    : <Upload className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}</span>
            </button>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChange} />
        </>
    );
}
