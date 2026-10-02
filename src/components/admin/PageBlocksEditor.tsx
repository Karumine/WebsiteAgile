import { useState } from 'react';
import { ArrowDown, ArrowUp, Blocks, Copy, Plus, Trash2, X } from 'lucide-react';
import type { PageBlock } from '@/types';
import { PAGE_BLOCKS, createBlock, getBlockDef, type PageBlockType } from '@/data/pageBlocks';
import { SectionCard } from '@/components/admin/PageSectionsEditor';

interface Props {
    number: number;
    blocks: PageBlock[];
    onChange: (next: PageBlock[]) => void;
}

const iconBtn = 'shrink-0 p-2 rounded-lg border bg-navy-light border-border text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all disabled:opacity-30 disabled:pointer-events-none';

export function PageBlocksEditor({ number, blocks, onChange }: Props) {
    const [pickerOpen, setPickerOpen] = useState(false);

    const move = (index: number, dir: -1 | 1) => {
        const target = index + dir;
        if (target < 0 || target >= blocks.length) return;
        const next = [...blocks];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    };
    const duplicate = (index: number) => {
        const copy: PageBlock = { ...structuredClone(blocks[index]), id: createBlock(blocks[index].type as PageBlockType).id };
        onChange([...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)]);
    };
    const remove = (index: number) => {
        const label = getBlockDef(blocks[index].type)?.label || 'บล็อกนี้';
        if (window.confirm(`ลบ "${label}" ออกจากหน้านี้?`)) onChange(blocks.filter((_, i) => i !== index));
    };
    const add = (type: PageBlockType) => {
        onChange([...blocks, createBlock(type)]);
        setPickerOpen(false);
    };

    return (
        <div className="glass rounded-2xl p-6 space-y-4 border-l-4 border-l-purple-500">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                    <Blocks className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            {number}. เนื้อหาหน้า (Page Builder)
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            เรียงบล็อกได้อิสระ — บล็อกแสดงบนเว็บตามลำดับจากบนลงล่าง ต่อจากส่วนหัว (Hero)
                        </p>
                    </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    {blocks.length} บล็อก
                </span>
            </div>

            {blocks.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl">
                    ยังไม่มีบล็อก — หน้าเว็บจะแสดงเฉพาะส่วนหัว กด "เพิ่มบล็อก" เพื่อเริ่มสร้างเนื้อหา
                </p>
            )}

            <div className="space-y-3">
                {blocks.map((block, index) => {
                    const def = getBlockDef(block.type);
                    if (!def) return null;
                    return (
                        <SectionCard
                            key={block.id}
                            title={`บล็อก ${index + 1}: ${def.label}`}
                            schema={def.schema}
                            value={block}
                            onChange={(next) => onChange(blocks.map((b, i) => (i === index ? { ...next, id: block.id, type: block.type } : b)))}
                            actions={
                                <>
                                    <button type="button" className={iconBtn} onClick={() => move(index, -1)} disabled={index === 0} title="เลื่อนขึ้น" aria-label="เลื่อนบล็อกขึ้น">
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button type="button" className={iconBtn} onClick={() => move(index, 1)} disabled={index === blocks.length - 1} title="เลื่อนลง" aria-label="เลื่อนบล็อกลง">
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                    <button type="button" className={iconBtn} onClick={() => duplicate(index)} title="ทำสำเนา" aria-label="ทำสำเนาบล็อก">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button type="button" className={`${iconBtn} hover:!text-red-400`} onClick={() => remove(index)} title="ลบบล็อก" aria-label="ลบบล็อก">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </>
                            }
                        />
                    );
                })}
            </div>

            {pickerOpen ? (
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300">เลือกประเภทบล็อกที่จะเพิ่ม</span>
                        <button type="button" onClick={() => setPickerOpen(false)} className="p-1 rounded text-muted-foreground hover:text-foreground" aria-label="ปิด">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {PAGE_BLOCKS.map((b) => (
                            <button
                                key={b.type}
                                type="button"
                                onClick={() => add(b.type)}
                                className="text-left p-3 rounded-xl bg-navy-light border border-border hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                            >
                                <span className="block text-xs font-bold text-foreground">{b.label}</span>
                                <span className="block text-[11px] text-muted-foreground mt-1 leading-snug">{b.description}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-dashed border-purple-500/40 text-purple-300 hover:bg-purple-500/10 text-xs font-semibold transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มบล็อก</span>
                </button>
            )}
        </div>
    );
}
