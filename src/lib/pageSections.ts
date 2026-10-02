import { useCallback } from 'react';
import { useLanguage, type Lang } from '@/contexts/LanguageContext';
import type { PageCustomContent, PageSectionContent, SectionListItem } from '@/types';

export type SectionFieldType = 'text' | 'textarea' | 'lines' | 'image' | 'link' | 'icon' | 'plain';

export interface SectionFieldDef {
    key: string;
    label: string;
    type?: SectionFieldType;
    /** Defaults to true for text/textarea/lines; stored as `${key}Th` / `${key}En`. */
    bilingual?: boolean;
    /** Text that only exists in one language's layout (e.g. legal paragraphs). */
    only?: 'Th' | 'En';
    placeholder?: string;
    /** Allowed values for a `plain` field rendered as a select. */
    options?: { value: string; label: string }[];
}

export interface PageSectionSchema {
    id: string;
    label: string;
    hint?: string;
    /** False when the section's markup is nested inside another section and can't be hidden on its own. */
    canHide?: boolean;
    fields?: SectionFieldDef[];
    list?: {
        label: string;
        /** Field key used as the card title in the editor list. */
        titleKey?: string;
        fields: SectionFieldDef[];
    };
    defaults: PageSectionContent;
}

export const isBilingual = (f: SectionFieldDef) =>
    f.bilingual ?? (!f.type || f.type === 'text' || f.type === 'textarea' || f.type === 'lines');

export function localize(source: Record<string, string> | undefined, key: string, lang: Lang): string {
    if (!source) return '';
    const th = source[`${key}Th`];
    const en = source[`${key}En`];
    if (th !== undefined) {
        return lang === 'th' ? (th || en || '') : (en || th || '');
    }
    // A plain key wins over a lone `${key}En` sibling (e.g. Buddhist-era `year` next to `yearEn`).
    return source[key] ?? en ?? '';
}

export const toLines = (value: string) =>
    value.split('\n').map((l) => l.trim()).filter(Boolean);

/** Saved values win per key; a saved list (even empty) replaces the default list. */
export function mergeSection(saved: PageSectionContent | undefined, defaults: PageSectionContent): PageSectionContent {
    return {
        hidden: saved?.hidden ?? defaults.hidden ?? false,
        fields: { ...(defaults.fields || {}), ...(saved?.fields || {}) },
        items: saved?.items !== undefined ? saved.items : (defaults.items || []),
    };
}

export function mergeAllSections(schemas: PageSectionSchema[], saved?: Record<string, PageSectionContent>): Record<string, PageSectionContent> {
    const out: Record<string, PageSectionContent> = {};
    schemas.forEach((schema) => {
        out[schema.id] = mergeSection(saved?.[schema.id], schema.defaults);
    });
    return out;
}

export interface SectionItemView {
    raw: SectionListItem;
    t: (key: string) => string;
    lines: (key: string) => string[];
}

export interface SectionView {
    hidden: boolean;
    t: (key: string) => string;
    lines: (key: string) => string[];
    items: SectionItemView[];
}

/** Each page passes its own schema so page defaults stay in that page's lazy chunk. */
export function useSections(content: Partial<PageCustomContent>, schemas: PageSectionSchema[]) {
    const { lang } = useLanguage();
    const saved = content.sections;

    return useCallback((sectionId: string): SectionView => {
        const schema = schemas.find((s) => s.id === sectionId);
        const merged = mergeSection(saved?.[sectionId], schema?.defaults || {});
        const fields = merged.fields || {};
        return {
            hidden: !!merged.hidden && schema?.canHide !== false,
            t: (key) => localize(fields, key, lang),
            lines: (key) => toLines(localize(fields, key, lang)),
            items: (merged.items || []).map((raw) => ({
                raw,
                t: (key) => localize(raw, key, lang),
                lines: (key) => toLines(localize(raw, key, lang)),
            })),
        };
    }, [schemas, saved, lang]);
}
