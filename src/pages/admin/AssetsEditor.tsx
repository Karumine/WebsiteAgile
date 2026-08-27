import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import { AssetsForSaleSection } from '@/components/sections/AssetsForSaleSection';
import type { UsedMachineryItem } from '@/types';
import toast from 'react-hot-toast';

export function AssetsEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();
    const [items, setItems] = useState<UsedMachineryItem[]>(settings.usedMachinery || []);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<UsedMachineryItem>>({});

    const handleSave = () => {
        if (!formData.title || !formData.price) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อเครื่องจักรและราคา' : 'Please fill title and price');
            return;
        }

        let updated: UsedMachineryItem[];
        if (editingId && editingId !== 'new') {
            updated = items.map((item) => (item.id === editingId ? ({ ...item, ...formData } as UsedMachineryItem) : item));
            toast.success(lang === 'th' ? 'อัปเดตข้อมูลสำเร็จ' : 'Asset updated');
        } else {
            const newItem: UsedMachineryItem = {
                id: `asset-${Date.now()}`,
                title: formData.title || '',
                title_en: formData.title_en || '',
                category: formData.category || 'ทั่วไป',
                price: formData.price || '0 บาท',
                year: formData.year || '2024',
                condition: formData.condition || 'สภาพดี',
                description: formData.description || '',
                image: formData.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
                status: formData.status || 'available',
            };
            updated = [newItem, ...items];
            toast.success(lang === 'th' ? 'เพิ่มเครื่องจักรเรียบร้อย' : 'Asset added');
        }

        setItems(updated);
        updateSettings({ usedMachinery: updated });
        setEditingId(null);
        setFormData({});
    };

    const handleDelete = (id: string) => {
        if (confirm(lang === 'th' ? 'ยืนยันการลบรายการนี้?' : 'Delete this item?')) {
            const updated = items.filter((item) => item.id !== id);
            setItems(updated);
            updateSettings({ usedMachinery: updated });
            toast.success(lang === 'th' ? 'ลบรายการเรียบร้อย' : 'Asset deleted');
        }
    };

    const handleEdit = (item: UsedMachineryItem) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const handleAddNew = () => {
        setEditingId('new');
        setFormData({
            title: '',
            title_en: '',
            category: 'น้ำดื่ม & เครื่องดื่ม',
            price: '',
            year: new Date().getFullYear().toString(),
            condition: 'สภาพดีเยี่ยม 90%+',
            description: '',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            status: 'available',
        });
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการเครื่องจักรมือสอง (40/60 Live)' : 'Assets for Sale Editor (40/60 Split)'}
            description={lang === 'th' ? 'เพิ่ม แก้ไข และปรับสถานะสินค้าสำหรับหน้า Assets for Sale โดยเห็นผลลัพธ์พรีวิวทันที' : 'Manage used machinery listings with real-time live preview.'}
            actionButtons={
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'th' ? 'เพิ่มเครื่องจักรใหม่' : 'Add Asset'}</span>
                </button>
            }
            preview={<AssetsForSaleSection />}
        >
            <div className="space-y-6">
                {/* Form Modal / Block */}
                {editingId && (
                    <div className="glass rounded-2xl p-5 border border-sky-400/40 space-y-4 animate-fade-in bg-slate-900/60">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                            <h2 className="text-sm font-bold text-foreground">
                                {editingId === 'new' ? (lang === 'th' ? 'เพิ่มเครื่องจักรใหม่' : 'Add New Asset') : (lang === 'th' ? 'แก้ไขข้อมูลเครื่องจักร' : 'Edit Asset')}
                            </h2>
                            <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">ชื่อเครื่องจักร (TH)</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="เช่น เครื่องบรรจุน้ำดื่มอัตโนมัติ 24 หัวจ่าย"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">ชื่อเครื่องจักร (EN)</label>
                                <input
                                    type="text"
                                    value={formData.title_en || ''}
                                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Automatic 24-Head Bottling Line"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">หมวดหมู่</label>
                                    <input
                                        type="text"
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">ราคา</label>
                                    <input
                                        type="text"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">ปีผลิต</label>
                                    <input
                                        type="text"
                                        value={formData.year || ''}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">สถานะ</label>
                                    <select
                                        value={formData.status || 'available'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as UsedMachineryItem['status'] })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="available">พร้อมขาย</option>
                                        <option value="reserved">ติดจอง</option>
                                        <option value="sold">ขายแล้ว</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">URL รูปภาพ</label>
                                <input
                                    type="text"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">รายละเอียดเพิ่มเติม</label>
                                <textarea
                                    rows={2}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button onClick={() => setEditingId(null)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium">
                                {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                            </button>
                            <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 text-white font-bold text-xs">
                                <Save className="w-3.5 h-3.5" />
                                <span>{lang === 'th' ? 'บันทึก' : 'Save'}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                <div>
                                    <h3 className="text-xs font-bold text-foreground leading-snug">{item.title}</h3>
                                    <p className="text-[11px] text-sky-400 font-semibold">{item.price}</p>
                                </div>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
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
