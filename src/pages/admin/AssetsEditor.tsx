import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Tag, Phone, Sparkles } from 'lucide-react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SplitPreviewContainer } from '@/components/admin/SplitPreviewContainer';
import type { UsedMachineryItem } from '@/types';
import toast from 'react-hot-toast';

function AssetAuctionLivePreview({
    items,
    editingId,
    formData,
}: {
    items: UsedMachineryItem[];
    editingId: string | null;
    formData: Partial<UsedMachineryItem>;
}) {
    const { lang } = useLanguage();

    // Merge live changes if editing an existing item
    const displayItems = items.map((item) => {
        if (editingId && editingId !== 'new' && item.id === editingId) {
            return { ...item, ...formData } as UsedMachineryItem;
        }
        return item;
    });

    // Draft item if adding new
    const draftItem =
        editingId === 'new'
            ? ({
                  id: 'draft-new',
                  title: formData.title || (lang === 'th' ? 'ชื่อเครื่องจักรใหม่ (กำลังพิมพ์...)' : 'New Machine Title (Drafting...)'),
                  title_en: formData.title_en || '',
                  category: formData.category || 'หมวดหมู่เครื่องจักร',
                  price: formData.price || 'ราคา / สถานะ',
                  year: formData.year || '2024',
                  condition: formData.condition || 'สภาพเครื่องจักร',
                  description: formData.description || '',
                  image: formData.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
                  status: formData.status || 'available',
              } as UsedMachineryItem)
            : null;

    const featuredItem = displayItems[0];
    const otherItems = displayItems.slice(1);

    const defaultSpecs = [
        { label: 'Capacity', value: '400 Cfm' },
        { label: 'Controller Model', value: 'AUJW04CT' },
        { label: 'Speed', value: '2500 RPM' },
        { label: 'Horse system', value: '115 HP' },
        { label: 'Compressor Oil', value: '50 ml' },
    ];

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-2xl space-y-8 transition-colors">
            {/* Header matching AssetForSalePage */}
            <div className="text-center max-w-xl mx-auto">
                <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mb-1 font-mono uppercase tracking-wider">
                    Asset for Sale
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                    {lang === 'th' ? 'สินทรัพย์รอการขาย' : 'Assets for Sale'}
                </h2>
            </div>

            {/* Blue Category Banner matching AssetForSalePage */}
            <div className="bg-gradient-to-r from-blue-900 via-sky-950 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-sky-500/30">
                <h3 className="text-base sm:text-lg font-bold font-sans mb-1 text-white">
                    {lang === 'th' ? 'ประมูลเครื่องจักรมือสอง คุณภาพดี' : 'High Quality Used Industrial Machinery Auction'}
                </h3>
                <p className="text-xs text-sky-200 font-normal">
                    {lang === 'th'
                        ? 'เครื่องจักรแนะนำที่ไม่ควรพลาด ตรวจเช็กมาตรฐานพร้อมใช้งานทันที'
                        : 'Featured Machinery & Equipment for Bidding, thoroughly inspected and certified'}
                </p>
            </div>

            {/* New Draft Item Banner if adding */}
            {draftItem && (
                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/70 border-2 border-sky-400 shadow-xl space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 text-xs font-bold">
                        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                        <span>กำลังเพิ่มเครื่องจักรใหม่ (Drafting Live Preview)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800">
                        <div className="sm:col-span-4 aspect-video rounded-lg overflow-hidden bg-slate-950">
                            <img src={draftItem.image} alt="Draft" className="w-full h-full object-cover" />
                        </div>
                        <div className="sm:col-span-8 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-sky-600 dark:text-sky-400">{draftItem.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{draftItem.category}</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{draftItem.description || draftItem.condition}</p>
                            </div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white mt-2">{draftItem.price}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. Featured Item (e.g. Air Compressor) */}
            {featuredItem && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                            ★ เครื่องจักรแนะนำเด่น (Featured Machine)
                        </span>
                        {editingId === featuredItem.id && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                กำลังแก้ไข (Editing Live)
                            </span>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl transition-colors">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            {/* Image */}
                            <div className="lg:col-span-6 relative bg-slate-950 flex items-center justify-center min-h-[240px] overflow-hidden">
                                <img src={featuredItem.image} alt={featuredItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                                    <span className="text-white/40 text-sm sm:text-base font-extrabold tracking-widest uppercase select-none">
                                        Agile Assets Co., Ltd.
                                    </span>
                                </div>
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-900/90 text-white text-[10px] font-bold border border-white/20">
                                    <Tag className="w-3 h-3" />
                                    <span>แนะนำ / Featured</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="lg:col-span-6 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="mb-3">
                                        <h4 className="text-base sm:text-lg font-bold text-blue-950 dark:text-sky-400 font-sans">{featuredItem.title}</h4>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{featuredItem.category}</p>
                                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                                            {featuredItem.price}
                                        </span>
                                    </div>

                                    <div className="space-y-1 mb-3 text-[11px] text-slate-700 dark:text-slate-300">
                                        {defaultSpecs.map((s, i) => (
                                            <div key={i} className="flex justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">: {s.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-800 dark:text-slate-200 mb-3">
                                        ติดต่อวิศวกรเพื่อขอเข้าดูเครื่องจักร : <span className="text-sky-600 dark:text-sky-400 font-bold">095-246-0255</span>
                                    </div>
                                </div>

                                <div className="w-full py-2 px-3 rounded-xl bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md transition-all">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>ติดต่อเข้าร่วมประมูลเครื่องจักร</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Other Machines List / Grid */}
            {otherItems.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {lang === 'th' ? `เครื่องจักรพร้อมส่งมอบอื่นๆ (${otherItems.length} เครื่อง)` : `Additional Machinery (${otherItems.length})`}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {otherItems.map((item) => {
                            const isBeingEdited = editingId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                                        isBeingEdited
                                            ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-lg'
                                            : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-blue-900/90 text-white text-[10px] font-bold border border-white/20">
                                            {item.category}
                                        </div>
                                        {isBeingEdited && (
                                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold shadow">
                                                กำลังแก้ไข
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1">{item.title}</h4>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
                                                {item.description || item.condition}
                                            </p>
                                            <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-3">{item.price}</div>
                                        </div>
                                        <div className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-bold text-[11px] text-center flex items-center justify-center gap-1.5 transition-colors hover:bg-sky-500 hover:text-white">
                                            <Phone className="w-3 h-3" />
                                            <span>ติดต่อสอบถามเครื่องนี้</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export function AssetsEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const { lang } = useLanguage();
    const [items, setItems] = useState<UsedMachineryItem[]>(settings.usedMachinery || []);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<UsedMachineryItem>>({});

    const handleSave = () => {
        if (!formData.title || !formData.price) {
            toast.error(lang === 'th' ? 'กรุณากรอกชื่อเครื่องจักรและราคา/สถานะ' : 'Please fill title and price');
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
                category: formData.category || 'Doosan Model P415',
                price: formData.price || 'พร้อมส่งมอบ (Available)',
                year: formData.year || '2024',
                condition: formData.condition || 'เครื่องจักรแนะนำ ตรวจเช็กมาตรฐานพร้อมใช้งานทันที',
                description: formData.description || '',
                image: formData.image || 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/9522_0.jpg',
                status: formData.status || 'available',
            };
            updated = [...items, newItem];
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
            category: 'เครื่องจักรอุตสาหกรรม',
            price: 'พร้อมส่งมอบ (Available)',
            year: new Date().getFullYear().toString(),
            condition: 'สภาพดีเยี่ยม ตรวจเช็กมาตรฐานพร้อมใช้งาน',
            description: '',
            image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://agileassets.co.th/wp-content/uploads/2026/04/9522_0.jpg',
            status: 'available',
        });
    };

    return (
        <SplitPreviewContainer
            title={lang === 'th' ? 'จัดการเครื่องจักรมือสอง (40/60 Live)' : 'Assets for Sale Editor (40/60 Split)'}
            description={lang === 'th' ? `มีเครื่องจักรในระบบทั้งหมด ${items.length} เครื่อง เพิ่ม แก้ไข และพรีวิวได้ทันที` : `Managing ${items.length} assets with real-time live preview.`}
            liveUrl="/asset-for-sale"
            actionButtons={
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'th' ? 'เพิ่มเครื่องจักรใหม่' : 'Add Asset'}</span>
                </button>
            }
            preview={<AssetAuctionLivePreview items={items} editingId={editingId} formData={formData} />}
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
                                    placeholder="เช่น Blow Moulding Machine"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">ชื่อเครื่องจักร (EN)</label>
                                <input
                                    type="text"
                                    value={formData.title_en || ''}
                                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Blow Moulding Machine"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">รุ่น / หมวดหมู่</label>
                                    <input
                                        type="text"
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="เช่น เครื่องเป่าขวดพลาสติก PET"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground mb-1">ราคา / สถานะการขาย</label>
                                    <input
                                        type="text"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="เช่น พร้อมส่งมอบ (Available)"
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
                                        <option value="available">พร้อมขาย / เปิดประมูล</option>
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
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground mb-1">รายละเอียด / สเปกเครื่องจักร</label>
                                <textarea
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="รายละเอียดเครื่องจักร..."
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
                        <div
                            key={item.id}
                            className={`glass rounded-xl p-4 border flex items-center justify-between gap-3 transition-all ${
                                editingId === item.id ? 'border-sky-400 bg-sky-950/20' : 'border-border'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                <div>
                                    <h3 className="text-xs font-bold text-foreground leading-snug">{item.title}</h3>
                                    <p className="text-[11px] text-muted-foreground">{item.category}</p>
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
