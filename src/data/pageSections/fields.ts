import type { SectionFieldDef } from '@/lib/pageSections';

export const F = {
    badge: { key: 'badge', label: 'ป้ายกำกับเล็กด้านบน (Badge)' },
    title: { key: 'title', label: 'หัวข้อ (Title)' },
    subtitle: { key: 'subtitle', label: 'คำอธิบาย (Subtitle)', type: 'textarea' },
    desc: { key: 'desc', label: 'รายละเอียด (Description)', type: 'textarea' },
    icon: { key: 'icon', label: 'ไอคอน', type: 'icon' },
    image: { key: 'image', label: 'URL รูปภาพ', type: 'image' },
    link: { key: 'link', label: 'ลิงก์ปลายทาง (URL)', type: 'link' },
    btn: { key: 'btn', label: 'ข้อความปุ่ม' },
    btnLink: { key: 'btnLink', label: 'ลิงก์ปุ่ม (URL)', type: 'link' },
    value: { key: 'value', label: 'ตัวเลข / ค่า', type: 'plain' },
    label: { key: 'label', label: 'คำอธิบายสั้น (Label)' },
    q: { key: 'q', label: 'คำถาม' },
    a: { key: 'a', label: 'คำตอบ', type: 'textarea' },
} satisfies Record<string, SectionFieldDef>;

/** Badge + title + subtitle — the standard header above most sections. */
export const header = (): SectionFieldDef[] => [F.badge, F.title, F.subtitle];
