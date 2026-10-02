import type { PageSectionSchema } from '@/lib/pageSections';

export const homePartnersSections: PageSectionSchema[] = [
    {
        id: "partners",
        label: "หน้าแรก: พันธมิตร (Our Partners)",
        fields: [
            { key: "t01", label: "ข้อความ — \"OUR PARTNER & MACHINE\"", type: "text" },
            { key: "t02", label: "หัวข้อ — \"คู่ค้าและเครื่องจักรที่เราให้บริการ\"", type: "text" },
            { key: "t03", label: "ข้อความ — \"PHOOWANUS PANICH\"", type: "text" },
            { key: "t04", label: "ข้อความ — \"LIMITED PARTNERSHIP\"", type: "text" },
            { key: "t05", label: "ข้อความ — \"GR\"", type: "text" },
            { key: "t06", label: "ข้อความ — \"◆ MITSUBISHI\"", type: "text" },
            { key: "t07", label: "ข้อความ — \"MOTORS & MACHINERY\"", type: "text" },
            { key: "t08", label: "ข้อความ — \"FANUC\"", type: "text" },
        ],
        list: {
            label: "พันธมิตร",
            fields: [
                { key: "name", label: "name", type: "plain" },
                { key: "tag", label: "tag", type: "plain" },
                { key: "type", label: "type", type: "plain" },
                { key: "bgColor", label: "bgColor", type: "plain" },
                { key: "textColor", label: "textColor", type: "plain" },
                { key: "subtitle", label: "subtitle", type: "plain" },
            ],
        },
        defaults: {
            fields: {
                t01Th: "OUR PARTNER & MACHINE",
                t01En: "OUR PARTNER & MACHINE",
                t02Th: "คู่ค้าและเครื่องจักรที่เราให้บริการ",
                t02En: "Our Trusted Partners & Machine Brands",
                t03Th: "PHOOWANUS PANICH",
                t03En: "PHOOWANUS PANICH",
                t04Th: "LIMITED PARTNERSHIP",
                t04En: "LIMITED PARTNERSHIP",
                t05Th: "GR",
                t05En: "GR",
                t06Th: "◆ MITSUBISHI",
                t06En: "◆ MITSUBISHI",
                t07Th: "MOTORS & MACHINERY",
                t07En: "MOTORS & MACHINERY",
                t08Th: "FANUC",
                t08En: "FANUC",
            },
            items: [
                { name: "PHOOWANUS PANICH", tag: "Limited Partnership", type: "image", bgColor: "#0f172a", textColor: "#38bdf8", subtitle: "หจก. ภูวนัส พาณิชย์", id: "partners-1" },
                { name: "GRD Machine", tag: "Industrial Systems", type: "image", bgColor: "#ffffff", textColor: "#16a34a", subtitle: "GRD Industrial Machine", id: "partners-2" },
                { name: "MITSUBISHI MOTORS", tag: "Heavy Industries", type: "image", bgColor: "#ffffff", textColor: "#dc2626", subtitle: "Mitsubishi Machinery", id: "partners-3" },
                { name: "FANUC", tag: "Robotics & CNC", type: "image", bgColor: "#ffffff", textColor: "#eab308", subtitle: "Robotics & Factory Automation", id: "partners-4" },
                { name: "HAITIAN", tag: "Plastics Machinery", type: "image", bgColor: "#ffffff", textColor: "#0284c7", subtitle: "Injection Molding Global Leader", id: "partners-5" },
                { name: "DAIKIN", tag: "Industrial Chillers", type: "image", bgColor: "#ffffff", textColor: "#0ea5e9", subtitle: "Air & Water Cooled Chillers", id: "partners-6" },
            ],
        },
    },
];
