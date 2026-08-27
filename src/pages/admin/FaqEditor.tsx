import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import type { FaqItem } from '@/types';
import toast from 'react-hot-toast';

function FaqLivePreview({ items }: { items: FaqItem[] }) {
    const { lang } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="p-6 bg-slate-950 text-white rounded-xl space-y-4">
            <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-xl font-bold text-white mb-1">
                    {lang === 'th' ? 'คำถามที่พบบ่อย (FAQ Live Preview)' : 'Frequently Asked Questions'}
                </h2>
                <p className="text-xs text-slate-400">
                    {lang === 'th' ? 'คำถามและคำตอบสำหรับการอนุมัติสินเชื่อเช่าซื้อเครื่องจักร' : 'Questions & Answers'}
                </p>
            </div>

            <div className="space-y-3">
                {items.map((item, idx) => {
                    const isOpen = openIndex === idx;
                    const question = lang === 'en' ? (item.question_en || item.question) : item.question;
                    const answer = lang === 'en' ? (item.answer_en || item.answer) : item.answer;

                    return (
                        <div key={item.id || idx} className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                className="w-full px-4 py-3 text-left font-semibold text-xs sm:text-sm text-slate-200 flex items-center justify-between hover:text-sky-400 transition-colors"
                            >
                                <span>{question}</span>
                                <span className="text-sky-400 text-base">{isOpen ? '−' : '+'}</span>
                            </button>
                            {isOpen && (
                                <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                                    {answer}
                                </div>
                            )}
                        </div>
                    );
                })}
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
            actionButtons={
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'th' ? 'เพิ่มคำถามใหม่' : 'Add FAQ'}</span>
                </button>
            }
            preview={<FaqLivePreview items={items} />}
        >
            <div className="space-y-6">
                {/* Form Editor */}
                {editingId && (
                    <div className="glass rounded-2xl p-4 border border-sky-400/40 space-y-3 bg-slate-900/60">
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                            <h2 className="text-xs font-bold text-foreground">
                                {editingId === 'new' ? (lang === 'th' ? 'เพิ่มคำถามใหม่' : 'Add New FAQ') : (lang === 'th' ? 'แก้ไขคำถาม' : 'Edit FAQ')}
                            </h2>
                            <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำถาม (TH)</label>
                            <input
                                type="text"
                                value={formData.question || ''}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">คำตอบ (TH)</label>
                            <textarea
                                rows={2}
                                value={formData.answer || ''}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
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
