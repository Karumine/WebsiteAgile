import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, ChevronRight, PhoneCall } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types';
import toast from 'react-hot-toast';

function FaqLivePreview({
    items,
    editingId,
    formData = {},
}: {
    items: FaqItem[];
    editingId?: string | null;
    formData?: Partial<FaqItem>;
}) {
    const { lang } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Merge items with live edits for instant reactive feedback
    const displayItems: FaqItem[] = [...items];

    if (editingId === 'new' && (formData.question || formData.answer)) {
        displayItems.unshift({
            id: 'new-draft',
            question: formData.question || (lang === 'th' ? '(ระบุคำถาม...)' : '(Enter question...)'),
            question_en: formData.question_en,
            answer: formData.answer || (lang === 'th' ? '(ระบุคำตอบ...)' : '(Enter answer...)'),
            answer_en: formData.answer_en,
            category: formData.category || 'การอนุมัติสินเชื่อ',
        });
    } else if (editingId && editingId !== 'new') {
        const idx = displayItems.findIndex((i) => i.id === editingId);
        if (idx !== -1) {
            displayItems[idx] = {
                ...displayItems[idx],
                ...formData,
                question: formData.question?.trim() ? formData.question : displayItems[idx].question,
                answer: formData.answer?.trim() ? formData.answer : displayItems[idx].answer,
            };
        }
    }

    return (
        <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto bg-white dark:bg-slate-950 min-h-full transition-colors selection:bg-sky-500 selection:text-white">
            {/* Section Header - 100% faithful to public FaqPage.tsx */}
            <div className="text-center mb-8 sm:mb-12">
                <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1">
                    Frequently Asked Questions (FAQ)
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight font-sans">
                    {lang === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
                </h2>
            </div>

            {/* Accordion List - Exactly identical to public FaqPage.tsx */}
            <div className="space-y-3 sm:space-y-4">
                {displayItems.map((item, idx) => {
                    const isBeingEdited = editingId === item.id || (editingId === 'new' && item.id === 'new-draft');
                    const isOpen = isBeingEdited || openIndex === idx;
                    const question = lang === 'en' ? (item.question_en || item.question) : item.question;
                    const answer = lang === 'en' ? (item.answer_en || item.answer) : item.answer;

                    return (
                        <div
                            key={item.id || idx}
                            className={cn(
                                "rounded-2xl border transition-all duration-200 overflow-hidden",
                                isBeingEdited
                                    ? "ring-2 ring-sky-400 border-sky-400 bg-sky-50/70 dark:bg-slate-900 shadow-md"
                                    : isOpen
                                    ? "bg-sky-50/50 dark:bg-slate-900 border-sky-300 dark:border-sky-700 shadow-md"
                                    : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen && !isBeingEdited ? null : idx)}
                                className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                            >
                                <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 font-sans leading-snug flex items-center gap-2">
                                    <span>{question}</span>
                                    {isBeingEdited && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 shrink-0">
                                            {item.id === 'new-draft' ? 'กำลังเพิ่มใหม่' : 'กำลังแก้ไข'}
                                        </span>
                                    )}
                                </span>
                                <div
                                    className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                                        isOpen
                                            ? "rotate-90 bg-sky-500 text-white shadow-sm"
                                            : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                    )}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 animate-fade-in border-t border-sky-200/50 dark:border-slate-800">
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic bg-white dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                                        “{answer}”
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Need More Assistance CTA Box - Matching public FaqPage.tsx */}
            <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-sky-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-bold font-sans">
                        {lang === 'th' ? 'มีข้อสงสัยหรือต้องการสอบถามเพิ่มเติม?' : 'Need More Information or Personalized Advice?'}
                    </h3>
                    <p className="text-xs text-sky-200">
                        {lang === 'th'
                            ? 'ทีมงาน Agile Assets พร้อมให้คำปรึกษาและโครงสร้างสินเชื่อที่ตอบโจทย์ธุรกิจท่าน'
                            : 'Our credit specialists are ready to tailor financial structures for your business.'}
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-blue-900 font-bold text-xs shadow-md">
                        <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                        <span>02-000-9392</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FaqEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();
    const [items, setItems] = useState<FaqItem[]>(settings.faqs || []);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<FaqItem>>({});

    const handleSave = () => {
        if (!formData.question || !formData.answer) {
            toast.error(lang === 'th' ? 'กรุณากรอกคำถามและคำตอบ' : 'Please fill question and answer');
            return;
        }

        let updated: FaqItem[];
        if (editingId && editingId !== 'new') {
            updated = items.map((item) => (item.id === editingId ? ({ ...item, ...formData } as FaqItem) : item));
            toast.success(lang === 'th' ? 'อัปเดต FAQ เรียบร้อย' : 'FAQ updated');
        } else {
            const newItem: FaqItem = {
                id: `faq-${Date.now()}`,
                question: formData.question || '',
                question_en: formData.question_en || '',
                answer: formData.answer || '',
                answer_en: formData.answer_en || '',
                category: formData.category || 'ทั่วไป',
            };
            updated = [newItem, ...items];
            toast.success(lang === 'th' ? 'เพิ่ม FAQ ใหม่เรียบร้อย' : 'FAQ added');
        }

        setItems(updated);
        updateSettings({ faqs: updated });
        setEditingId(null);
        setFormData({});
    };

    const handleDelete = (id: string) => {
        if (confirm(lang === 'th' ? 'ยืนยันการลบคำถามนี้?' : 'Delete this question?')) {
            const updated = items.filter((item) => item.id !== id);
            setItems(updated);
            updateSettings({ faqs: updated });
            toast.success(lang === 'th' ? 'ลบรายการเรียบร้อย' : 'FAQ deleted');
        }
    };

    const handleEdit = (item: FaqItem) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const handleAddNew = () => {
        setEditingId('new');
        setFormData({
            question: '',
            question_en: '',
            answer: '',
            answer_en: '',
            category: 'การอนุมัติสินเชื่อ',
        });
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการคำถามที่พบบ่อย (40/60 Live)' : 'FAQ Editor (40/60 Split)'}
            description={lang === 'th' ? 'เพิ่มและแก้ไขคำถามคำตอบสำหรับหน้า FAQ โดยเห็นผลลัพธ์พรีวิวทันที' : 'Manage FAQ questions with instant real-time live preview.'}
            liveUrl="/faq"
            actionButtons={
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'th' ? 'เพิ่มคำถามใหม่' : 'Add FAQ'}</span>
                </button>
            }
            preview={<FaqLivePreview items={items} editingId={editingId} formData={formData} />}
        >
            <div className="space-y-6">
                {/* Form Editor */}
                {editingId && (
                    <div className="glass rounded-2xl p-4 border border-sky-400/40 space-y-3 bg-card shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                            <h2 className="text-xs font-bold text-foreground">
                                {editingId === 'new' ? (lang === 'th' ? 'เพิ่มคำถามใหม่' : 'Add New FAQ') : (lang === 'th' ? 'แก้ไขคำถาม' : 'Edit FAQ')}
                            </h2>
                            <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำถาม (TH) *</label>
                            <input
                                type="text"
                                value={formData.question || ''}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="เช่น สินเชื่อเครื่องจักรคืออะไร"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำถามภาษาอังกฤษ (EN)</label>
                            <input
                                type="text"
                                value={formData.question_en || ''}
                                onChange={(e) => setFormData({ ...formData, question_en: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="e.g. What is Machinery Financing?"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำตอบ (TH) *</label>
                            <textarea
                                rows={2}
                                value={formData.answer || ''}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="คำอธิบายรายละเอียด..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำตอบภาษาอังกฤษ (EN)</label>
                            <textarea
                                rows={2}
                                value={formData.answer_en || ''}
                                onChange={(e) => setFormData({ ...formData, answer_en: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="English answer description..."
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                            <button onClick={() => setEditingId(null)} className="px-3 py-1 rounded-lg border border-border text-xs font-medium">
                                {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                            </button>
                            <button onClick={handleSave} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500 text-white font-bold text-xs">
                                <Save className="w-3.5 h-3.5" />
                                <span>{lang === 'th' ? 'บันทึก' : 'Save'}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="glass rounded-xl p-3 border border-border flex items-center justify-between gap-3">
                            <div className="space-y-0.5 flex-1 min-w-0">
                                <h3 className="text-xs font-bold text-foreground truncate">{item.question}</h3>
                                <p className="text-[11px] text-muted-foreground line-clamp-1">{item.answer}</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SplitPreviewContainer>
    );
}
