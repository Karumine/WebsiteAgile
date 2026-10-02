import type { PageBlock, PageCustomContent } from '@/types';
import type { PageSectionSchema, SectionFieldDef } from '@/lib/pageSections';
import { F, header } from './pageSections/fields';

export type PageBlockType =
    | 'text' | 'cards' | 'image-cards' | 'image-text' | 'stats' | 'steps' | 'faq' | 'gallery' | 'cta';

export interface PageBlockDef {
    type: PageBlockType;
    label: string;
    description: string;
    schema: PageSectionSchema;
}

const columns: SectionFieldDef = {
    key: 'columns', label: 'จำนวนคอลัมน์', type: 'plain',
    options: [{ value: '2', label: '2 คอลัมน์' }, { value: '3', label: '3 คอลัมน์' }, { value: '4', label: '4 คอลัมน์' }],
};

const def = (type: PageBlockType, label: string, description: string, schema: Omit<PageSectionSchema, 'id' | 'label'>): PageBlockDef =>
    ({ type, label, description, schema: { id: type, label, ...schema } });

export const PAGE_BLOCKS: PageBlockDef[] = [
    def('text', 'ข้อความ / บทความ', 'หัวข้อพร้อมย่อหน้าข้อความ เหมาะกับคำอธิบายบริการหรือรายละเอียดยาว', {
        fields: [F.badge, F.title, { key: 'body', label: 'เนื้อหา (ขึ้นบรรทัดใหม่ = ย่อหน้าใหม่)', type: 'lines' }],
        defaults: {
            fields: {
                badgeTh: '', badgeEn: '',
                titleTh: 'หัวข้อของส่วนนี้', titleEn: 'Section Title',
                bodyTh: 'พิมพ์เนื้อหาย่อหน้าแรกที่นี่\nขึ้นบรรทัดใหม่เพื่อเริ่มย่อหน้าถัดไป',
                bodyEn: 'Write the first paragraph here.\nStart a new line for the next paragraph.',
            },
        },
    }),
    def('cards', 'การ์ดไอคอน', 'หัวข้อ + การ์ดไอคอนหลายคอลัมน์ (แบบสวัสดิการในหน้าร่วมงานกับเรา)', {
        fields: [...header(), columns],
        list: { label: 'การ์ด', titleKey: 'title', fields: [F.icon, F.title, F.desc] },
        defaults: {
            fields: { badgeTh: 'HIGHLIGHTS', badgeEn: 'HIGHLIGHTS', titleTh: 'จุดเด่นของเรา', titleEn: 'Our Highlights', subtitleTh: '', subtitleEn: '', columns: '3' },
            items: [
                { id: 'c1', icon: 'Zap', titleTh: 'อนุมัติรวดเร็ว', titleEn: 'Fast Approval', descTh: 'ทราบผลเบื้องต้นภายใน 24-48 ชั่วโมง', descEn: 'Preliminary results within 24-48 hours' },
                { id: 'c2', icon: 'ShieldCheck', titleTh: 'โปร่งใส ตรงไปตรงมา', titleEn: 'Transparent Terms', descTh: 'เงื่อนไขชัดเจน ไม่มีค่าธรรมเนียมแอบแฝง', descEn: 'Clear terms with no hidden fees' },
                { id: 'c3', icon: 'TrendingUp', titleTh: 'ยืดหยุ่นตามธุรกิจ', titleEn: 'Flexible Structuring', descTh: 'ออกแบบค่างวดตามกระแสเงินสด', descEn: 'Installments matched to cash flow' },
            ],
        },
    }),
    def('image-cards', 'การ์ดรูปภาพ', 'การ์ดมีรูป ป้าย หัวข้อ รายละเอียด และปุ่มลิงก์ (แบบรายการเครื่องจักร)', {
        fields: [...header(), columns],
        list: {
            label: 'การ์ด', titleKey: 'title',
            fields: [F.image, { ...F.badge, label: 'ป้ายบนรูป' }, F.title, { key: 'subtitle', label: 'หัวข้อรอง' }, F.desc, F.btn, F.link],
        },
        defaults: {
            fields: { badgeTh: '', badgeEn: '', titleTh: 'บริการของเรา', titleEn: 'Our Services', subtitleTh: '', subtitleEn: '', columns: '3' },
            items: [
                { id: 'i1', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80', badgeTh: 'ใหม่', badgeEn: 'New', titleTh: 'ชื่อบริการ', titleEn: 'Service name', subtitleTh: '', subtitleEn: '', descTh: 'รายละเอียดสั้นๆ ของบริการ', descEn: 'Short service description', btnTh: 'อ่านเพิ่มเติม', btnEn: 'Learn More', link: '/leasing-application' },
            ],
        },
    }),
    def('image-text', 'รูปคู่ข้อความ', 'รูปภาพด้านหนึ่ง ข้อความและปุ่มอีกด้าน (แบบรากฐานวิศวกรรมในหน้าเกี่ยวกับเรา)', {
        fields: [
            F.badge, F.title, { key: 'body', label: 'เนื้อหา (ขึ้นบรรทัดใหม่ = ย่อหน้าใหม่)', type: 'lines' },
            F.image,
            { key: 'imagePosition', label: 'ตำแหน่งรูป', type: 'plain', options: [{ value: 'left', label: 'รูปซ้าย' }, { value: 'right', label: 'รูปขวา' }] },
            F.btn, F.btnLink,
        ],
        defaults: {
            fields: {
                badgeTh: 'ABOUT', badgeEn: 'ABOUT', titleTh: 'เรื่องราวของเรา', titleEn: 'Our Story',
                bodyTh: 'เล่าเรื่องราวหรือรายละเอียดของส่วนนี้', bodyEn: 'Tell the story behind this section.',
                image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1000&q=80', imagePosition: 'left',
                btnTh: 'ติดต่อเรา', btnEn: 'Contact Us', btnLink: '/contact',
            },
        },
    }),
    def('stats', 'แถบตัวเลขสถิติ', 'ตัวเลขเด่นเรียงเป็นแถว (แบบแถบสถิติในหน้าร่วมงานกับเรา)', {
        fields: [F.title],
        list: { label: 'ตัวเลข', titleKey: 'value', fields: [F.value, F.label] },
        defaults: {
            fields: { titleTh: '', titleEn: '' },
            items: [
                { id: 's1', value: '16+', labelTh: 'ปีแห่งประสบการณ์', labelEn: 'Years of Experience' },
                { id: 's2', value: '5,000+', labelTh: 'ลูกค้าที่ไว้วางใจ', labelEn: 'Trusted Clients' },
                { id: 's3', value: '24 ชม.', labelTh: 'ทราบผลเบื้องต้น', labelEn: 'Initial Response' },
            ],
        },
    }),
    def('steps', 'ขั้นตอน', 'ขั้นตอนเรียงลำดับ 01, 02, 03 (แบบขั้นตอนคัดเลือกในหน้าร่วมงานกับเรา)', {
        fields: [F.badge, F.title],
        list: { label: 'ขั้นตอน', titleKey: 'title', fields: [{ key: 'step', label: 'ลำดับ', type: 'plain' }, F.title, F.desc] },
        defaults: {
            fields: { badgeTh: 'HOW IT WORKS', badgeEn: 'HOW IT WORKS', titleTh: 'ขั้นตอนการขอสินเชื่อ', titleEn: 'How It Works' },
            items: [
                { id: 'p1', step: '01', titleTh: 'ยื่นเอกสาร', titleEn: 'Submit Documents', descTh: 'ส่งข้อมูลและเอกสารเบื้องต้น', descEn: 'Send your basic information' },
                { id: 'p2', step: '02', titleTh: 'พิจารณาสินเชื่อ', titleEn: 'Credit Review', descTh: 'ทีมงานประเมินภายใน 24-48 ชม.', descEn: 'Reviewed within 24-48 hours' },
                { id: 'p3', step: '03', titleTh: 'อนุมัติและส่งมอบ', titleEn: 'Approval & Delivery', descTh: 'ลงนามสัญญาและรับเครื่องจักร', descEn: 'Sign and receive your machinery' },
            ],
        },
    }),
    def('faq', 'คำถามที่พบบ่อย', 'คำถาม-คำตอบแบบกดเปิด/ปิด', {
        fields: [F.title],
        list: { label: 'คำถาม', titleKey: 'q', fields: [F.q, F.a] },
        defaults: {
            fields: { titleTh: 'คำถามที่พบบ่อย', titleEn: 'Frequently Asked Questions' },
            items: [
                { id: 'q1', qTh: 'ใช้เวลาพิจารณานานเท่าไร?', qEn: 'How long does approval take?', aTh: 'โดยทั่วไปทราบผลเบื้องต้นภายใน 24-48 ชั่วโมง', aEn: 'Usually 24-48 hours for a preliminary result.' },
            ],
        },
    }),
    def('gallery', 'แกลเลอรีรูปภาพ', 'รูปภาพเรียงเป็นตาราง พร้อมคำบรรยายใต้รูป', {
        fields: [F.title, columns],
        list: { label: 'รูปภาพ', titleKey: 'caption', fields: [F.image, { key: 'caption', label: 'คำบรรยายรูป' }] },
        defaults: {
            fields: { titleTh: 'ภาพกิจกรรม', titleEn: 'Gallery', columns: '3' },
            items: [
                { id: 'g1', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', captionTh: '', captionEn: '' },
                { id: 'g2', image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80', captionTh: '', captionEn: '' },
                { id: 'g3', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', captionTh: '', captionEn: '' },
            ],
        },
    }),
    def('cta', 'แบนเนอร์ชวนติดต่อ (CTA)', 'กล่องเชิญชวนพร้อมปุ่ม มักวางท้ายหน้า', {
        fields: [F.title, F.subtitle, F.btn, F.btnLink],
        defaults: {
            fields: {
                titleTh: 'พร้อมเริ่มต้นกับเราหรือยัง?', titleEn: 'Ready to get started?',
                subtitleTh: 'ทีมงานของเราพร้อมออกแบบแผนการเงินที่เหมาะสมกับธุรกิจของคุณ',
                subtitleEn: 'Our team is ready to design a financing plan tailored to your business.',
                btnTh: 'ขอสินเชื่อกับเรา', btnEn: 'Financing with Us', btnLink: '/leasing-application',
            },
        },
    }),
];

export const getBlockDef = (type: string) => PAGE_BLOCKS.find((b) => b.type === type);

const newBlockId = () => `blk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export function createBlock(type: PageBlockType): PageBlock {
    const d = getBlockDef(type)!;
    return { id: newBlockId(), type, ...structuredClone(d.schema.defaults) };
}

/** Blocks equivalent to how a custom page rendered before the page builder existed. */
export function legacyBlocks(pc: Partial<PageCustomContent> | undefined): PageBlock[] {
    const blocks: PageBlock[] = [];
    const html = [pc?.contentTh, pc?.contentEn];
    if (html.some(Boolean)) {
        const toText = (h?: string) => (h || '').replace(/<\/(p|h\d|li|div)>|<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
        blocks.push({ ...createBlock('text'), fields: { badgeTh: '', badgeEn: '', titleTh: '', titleEn: '', bodyTh: toText(html[0]), bodyEn: toText(html[1]) } });
    }
    if (pc?.items && pc.items.length > 0) {
        blocks.push({
            ...createBlock('image-cards'),
            fields: { badgeTh: '', badgeEn: '', titleTh: '', titleEn: '', subtitleTh: '', subtitleEn: '', columns: '3' },
            items: pc.items.map((it) => ({
                id: it.id, image: it.image || '', badgeTh: it.badge || '', badgeEn: it.badge || '',
                titleTh: it.title || '', titleEn: it.titleEn || '', subtitleTh: it.subTitle || '', subtitleEn: it.subTitleEn || '',
                descTh: it.description || '', descEn: it.descEn || '', btnTh: it.btnText || '', btnEn: it.btnTextEn || '', link: it.link || '',
            })),
        });
    }
    blocks.push({
        ...createBlock('cta'),
        fields: {
            titleTh: 'พร้อมเริ่มต้นกับเราหรือยัง?', titleEn: 'Ready to get started?',
            subtitleTh: 'ทีมงานของเราพร้อมออกแบบแผนการเงินที่เหมาะสมกับธุรกิจของคุณ',
            subtitleEn: 'Our team is ready to design a financing plan tailored to your business.',
            btnTh: pc?.ctaTextTh || 'ขอสินเชื่อกับเรา', btnEn: pc?.ctaTextEn || 'Financing with Us', btnLink: pc?.ctaLink || '/leasing-application',
        },
    });
    return blocks;
}
