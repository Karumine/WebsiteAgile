import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Copy, Eye, EyeOff, LayoutList, Plus, RotateCcw, Trash2 } from 'lucide-react';
import type { PageSectionContent, SectionListItem } from '@/types';
import { isBilingual, type PageSectionSchema, type SectionFieldDef } from '@/lib/pageSections';
import { SECTION_ICON_NAMES, SectionIcon } from '@/lib/sectionIcons';
import { cn } from '@/lib/utils';
import { ImageUploadButton } from '@/components/admin/ImageUploadButton';

interface Props {
    schemas: PageSectionSchema[];
    value: Record<string, PageSectionContent>;
    onChange: (next: Record<string, PageSectionContent>) => void;
    startNumber: number;
}

const inputCls = 'w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-xs focus:ring-1 focus:ring-primary';

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function FieldInput({ def, langKey, value, onChange }: {
    def: SectionFieldDef;
    langKey: string;
    value: string;
    onChange: (key: string, v: string) => void;
}) {
    const type = def.type || 'text';
    const common = { value, onChange: (e: { target: { value: string } }) => onChange(langKey, e.target.value) };

    if (type === 'icon') {
        return (
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <SectionIcon name={value} className="w-4 h-4" />
                </div>
                <select {...common} className={inputCls}>
                    <option value="">— ไม่ระบุ —</option>
                    {SECTION_ICON_NAMES.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
        );
    }
    if (def.options) {
        return (
            <select {...common} className={inputCls}>
                {def.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        );
    }
    if (type === 'textarea' || type === 'lines') {
        return <textarea rows={type === 'lines' ? 4 : 3} {...common} placeholder={def.placeholder || (type === 'lines' ? 'หนึ่งรายการต่อหนึ่งบรรทัด' : undefined)} className={cn(inputCls, 'leading-relaxed')} />;
    }
    if (type === 'image') {
        return (
            <div className="flex items-center gap-2">
                <input type="text" {...common} placeholder={def.placeholder || 'https://...'} className={cn(inputCls, 'font-mono')} />
                <ImageUploadButton folder="pages" onUploaded={(url) => onChange(langKey, url)} />
                {value && <img src={value} alt="" className="w-9 h-9 shrink-0 rounded-lg object-cover border border-border" />}
            </div>
        );
    }
    return <input type="text" {...common} placeholder={def.placeholder} className={cn(inputCls, (type === 'link' || type === 'plain') && 'font-mono')} />;
}

function FieldGrid({ defs, source, onChange }: {
    defs: SectionFieldDef[];
    source: Record<string, string>;
    onChange: (key: string, v: string) => void;
}) {
    return (
        <div className="space-y-3">
            {defs.map((def) => def.only ? (
                <div key={def.key}>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                        {def.label} ({def.only.toUpperCase()})
                    </label>
                    <FieldInput def={def} langKey={`${def.key}${def.only}`} value={source[`${def.key}${def.only}`] || ''} onChange={onChange} />
                </div>
            ) : isBilingual(def) ? (
                <div key={def.key} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['Th', 'En'] as const).map((suffix) => (
                        <div key={suffix}>
                            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                                {def.label} ({suffix.toUpperCase()})
                            </label>
                            <FieldInput def={def} langKey={`${def.key}${suffix}`} value={source[`${def.key}${suffix}`] || ''} onChange={onChange} />
                        </div>
                    ))}
                </div>
            ) : (
                <div key={def.key}>
                    <label className="block text-[11px] font-medium text-muted-foreground mb-1">{def.label}</label>
                    <FieldInput def={def} langKey={def.key} value={source[def.key] || ''} onChange={onChange} />
                </div>
            ))}
        </div>
    );
}

function itemTitle(item: SectionListItem, key: string | undefined, index: number) {
    if (key) {
        const v = item[`${key}Th`] || item[`${key}En`] || item[key];
        if (v) return v;
    }
    return `รายการที่ ${index + 1}`;
}

export function SectionCard({ title, schema, value, onChange, actions }: {
    title: string;
    schema: PageSectionSchema;
    value: PageSectionContent;
    onChange: (next: PageSectionContent) => void;
    /** Extra header buttons (e.g. move/delete for page-builder blocks). */
    actions?: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [openItem, setOpenItem] = useState<string | null>(null);
    const items = value.items || [];
    const fields = value.fields || {};
    const canHide = schema.canHide !== false;
    const hidden = canHide && !!value.hidden;

    const setItems = (next: SectionListItem[]) => onChange({ ...value, items: next });
    const updateItem = (index: number, key: string, v: string) =>
        setItems(items.map((it, i) => (i === index ? { ...it, [key]: v } : it)));
    const moveItem = (index: number, dir: -1 | 1) => {
        const target = index + dir;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        setItems(next);
    };
    const addItem = () => {
        const id = newId();
        setItems([...items, { id }]);
        setOpenItem(id);
    };
    const duplicateItem = (index: number) => {
        const copy = { ...items[index], id: newId() };
        setItems([...items.slice(0, index + 1), copy, ...items.slice(index + 1)]);
    };

    return (
        <div className={cn('glass rounded-2xl border overflow-hidden transition-opacity', hidden ? 'border-dashed border-border/70' : 'border-border')}>
            <div className="flex items-center gap-1 pr-3">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={cn('flex-1 min-w-0 flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors', hidden && 'opacity-50')}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        <LayoutList className="w-4 h-4 text-sky-400 shrink-0" />
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider truncate">
                            {title}
                        </h3>
                        {schema.list && (
                            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-light border border-border text-muted-foreground">
                                {items.length} รายการ
                            </span>
                        )}
                        {hidden && (
                            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                ซ่อนอยู่
                            </span>
                        )}
                    </div>
                    {open ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                {actions}
                {canHide && (
                    <button
                        type="button"
                        onClick={() => onChange({ ...value, hidden: !hidden })}
                        className={cn(
                            'shrink-0 p-2 rounded-lg border transition-all',
                            hidden
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                                : 'bg-navy-light border-border text-muted-foreground hover:text-foreground hover:bg-white/10'
                        )}
                        title={hidden ? 'ส่วนนี้ถูกซ่อน — กดเพื่อแสดงบนเว็บ' : 'แสดงอยู่บนเว็บ — กดเพื่อซ่อน'}
                        aria-label={hidden ? 'แสดงส่วนนี้' : 'ซ่อนส่วนนี้'}
                        aria-pressed={hidden}
                    >
                        {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>

            {open && (
                <div className="px-6 pb-6 space-y-4 border-t border-border/60 pt-4">
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-[11px] text-muted-foreground">{schema.hint}</p>
                        <button
                            type="button"
                            onClick={() => onChange({ ...structuredClone(schema.defaults), hidden: value.hidden })}
                            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-light hover:bg-white/10 border border-border text-muted-foreground hover:text-foreground text-[11px] font-semibold transition-all"
                            title="คืนค่าเฉพาะส่วนนี้เป็นค่าเริ่มต้น"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>ค่าเริ่มต้นส่วนนี้</span>
                        </button>
                    </div>

                    {schema.fields && schema.fields.length > 0 && (
                        <FieldGrid
                            defs={schema.fields}
                            source={fields}
                            onChange={(key, v) => onChange({ ...value, fields: { ...fields, [key]: v } })}
                        />
                    )}

                    {schema.list && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">{schema.list.label}</span>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>เพิ่มรายการ</span>
                                </button>
                            </div>

                            {items.length === 0 && (
                                <p className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-xl">
                                    ยังไม่มีรายการ — ส่วนนี้จะแสดงเป็นว่างบนหน้าเว็บ
                                </p>
                            )}

                            {items.map((item, index) => {
                                const key = item.id || String(index);
                                const isOpen = openItem === key;
                                return (
                                    <div key={key} className="rounded-xl bg-navy-light/40 border border-border">
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <button
                                                type="button"
                                                onClick={() => setOpenItem(isOpen ? null : key)}
                                                className="flex-1 min-w-0 flex items-center gap-2 text-left"
                                            >
                                                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                                                <span className="text-[10px] font-mono text-muted-foreground shrink-0">#{index + 1}</span>
                                                <span className="text-xs font-semibold text-foreground truncate">{itemTitle(item, schema.list!.titleKey, index)}</span>
                                            </button>
                                            <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30" title="เลื่อนขึ้น">
                                                <ArrowUp className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30" title="เลื่อนลง">
                                                <ArrowDown className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => duplicateItem(index)} className="p-1 rounded text-muted-foreground hover:text-foreground" title="ทำสำเนา">
                                                <Copy className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => setItems(items.filter((_, i) => i !== index))} className="p-1 rounded text-muted-foreground hover:text-red-400" title="ลบ">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        {isOpen && (
                                            <div className="px-3 pb-3 pt-1 border-t border-border/50">
                                                <FieldGrid
                                                    defs={schema.list!.fields}
                                                    source={item}
                                                    onChange={(k, v) => updateItem(index, k, v)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function PageSectionsEditor({ schemas, value, onChange, startNumber }: Props) {
    return (
        <div className="space-y-4">
            {schemas.map((schema, i) => (
                <SectionCard
                    key={schema.id}
                    title={`${startNumber + i}. ${schema.label}`}
                    schema={schema}
                    value={value[schema.id] || schema.defaults}
                    onChange={(next) => onChange({ ...value, [schema.id]: next })}
                />
            ))}
        </div>
    );
}
