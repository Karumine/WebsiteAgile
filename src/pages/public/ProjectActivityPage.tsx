import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, DollarSign, FileText, Mail } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { QuickContactWidget } from '@/components/ui/QuickContactWidget';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/Hero-Banner-Website-3-scaled.png';

// Interactive Slideshow Card for Company Projects
function CompanySlideshowCard({
    title,
    images,
}: {
    title: string;
    images: string[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3.8 seconds
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3800);
        return () => clearInterval(timer);
    }, [images]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="flex flex-col space-y-2.5">
            {/* Company Title */}
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {title}
            </h3>

            {/* Slideshow Container */}
            <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800 group border border-slate-200 dark:border-slate-700">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`${title} - ${idx + 1}`}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';
                            }}
                        />
                    </div>
                ))}

                {/* Left/Right Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous Slide"
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next Slide"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}

                {/* Dot Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                                aria-label={`Slide ${idx + 1}`}
                                className={`rounded-full transition-all duration-300 ${idx === currentIndex
                                    ? 'w-3.5 h-1 bg-sky-400'
                                    : 'w-1 h-1 bg-white/50 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ProjectActivityPage() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    // 8 Featured Company Project Slideshows (Exact matching reference screenshot)
    const companyProjects = [
        {
            title: lang === 'th' ? 'บริษัท ชัยพร โฮลดิ้ง จำกัด' : 'Chaiyaporn Holding Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237159_0-1.jpg?t=1728555014',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237153_0.jpg?t=1728554825',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237161_0.jpg?t=1728557031',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237158_0.jpg?t=1728557031',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b1e0b8a2e0b89ee0b8a3e0b982e0b8aee0b8a5e0b894e0b8b4e0b989e0b887/237156_0.jpg?t=1728557031',
            ],
        },
        {
            title: lang === 'th' ? 'หจก.ไลฟ์ รีพับลิก' : 'Life Republic Ltd., Part.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/20240910_142452.jpg?t=1728555279',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/20240910_135826.jpg?t=1728555319',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/Seaming_0.jpg?t=1728555320',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8abe0b888e0b881-e0b984e0b8a5e0b89fe0b98c-e0b8a3e0b8b5e0b89ee0b8b1e0b89ae0b8a5e0b8b4e0b881/Weighing_0.jpg?t=1728556692',
            ],
        },
        {
            title: lang === 'th' ? 'บริษัท ชุมพรเอกฟ้า จำกัด' : 'Chumphon Aek Fah Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/338336402_2.jpg?t=1728556109',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/338209033_1.jpg?t=1728555902',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5%E0%B8%AA%E0%B8%94%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%9F%E0%B9%89%E0%B8%B2_001.jpg?t=1728555759',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b888e0b881-e0b88ae0b8b8e0b8a1e0b89ee0b8a3e0b980e0b8ade0b881e0b89fe0b989e0b8b2/939C07D3-25EC-484F-95B5-E228DE296B1F.jpg?t=1728555759',
            ],
        },
        {
            title: lang === 'th' ? 'บริษัท น้ำดื่มวินวิน จำกัด' : 'Win Win Drinking Water Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580756.jpg?t=1759907825',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580760.jpg?t=1759907825',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580772.jpg?t=1759907825',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580767.jpg?t=1759907825',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1-e0b8a7e0b8b4e0b899e0b8a7e0b8b4e0b899-e0b8ade0b8b4e0b899/S__30580771.jpg?t=1759907825',
            ],
        },
        {
            title: lang === 'th' ? 'บริษัท มิลเลี่ยน แม็กไพส์ จำกัด' : 'Million Magpies Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2.jpg?t=1759908530',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_1.jpg?t=1759908530',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_3.jpg?t=1759908530',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b8a1e0b8b4e0b8a5e0b980e0b8a5e0b8b5e0b988e0b8a2e0b899-e0b981e0b8a1e0b987e0b881e0b984e0b89ee0b8aa/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_4.jpg?t=1759908530',
            ],
        },
        {
            title: lang === 'th' ? 'อุดมทรัพย์ฟาร์ม' : 'Udomsap Farm',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237098_0.jpg?t=1728554560',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237096_0.jpg?t=1728554560',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237116_0.jpg?t=1728554560',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b8ade0b8b8e0b894e0b8a1e0b897e0b8a3e0b8b1e0b89ee0b8a2e0b98ce0b89fe0b8b2e0b8a3e0b98ce0b8a1/237099_0.jpg?t=1728554560',
            ],
        },
        {
            title: lang === 'th' ? 'บริษัท นันทวรรณ กรีนดริ้งค์ จำกัด' : 'Nanthawan GreenDrink Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/286157.jpg?t=1759908780',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/286165.jpg?t=1759908781',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933336.jpg?t=1759908781',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933331.jpg?t=1759908781',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897-e0b899e0b8b1e0b899e0b897e0b8a7e0b8a3e0b8a3e0b893-e0b881e0b8a3e0b8b5e0b899e0b894e0b8a3e0b8b4e0b989/S__1933334.jpg?t=1759908781',
            ],
        },
        {
            title: lang === 'th' ? 'บริษัท น้ำดื่มขอนแก่น จำกัด' : 'Khon Kaen Drinking Water Co., Ltd.',
            images: [
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1e0b882e0b8ade0b899e0b981e0b881e0b899e0b888e0b8b3/11896.jpg?t=1760429064',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1e0b882e0b8ade0b899e0b981e0b881e0b899e0b888e0b8b3/313793.jpg?t=1760429064',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1e0b882e0b8ade0b899e0b981e0b881e0b899e0b888e0b8b3/313775.jpg?t=1760429064',
                'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,h_280/https://agileassets.co.th/wp-content/gallery/e0b89ae0b8a3e0b8b4e0b8a9e0b8b1e0b897e0b899e0b989e0b8b3e0b894e0b8b7e0b988e0b8a1e0b882e0b8ade0b899e0b981e0b881e0b899e0b888e0b8b3/313789.jpg?t=1760429064',
            ],
        },
    ];

    // 12 Photographic Activity Collage Items (4x3 Grid)
    const collagePhotos = [
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/307397-1024x1024.jpg',
            alt: 'Executive visit and client partnership handshake',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/S__1933333-1024x768.jpg',
            alt: 'Factory project consultation meeting',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/LINE_ALBUM_240725-%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%87-2-New-Line_250819_2-1024x768.jpg',
            alt: 'Machinery handover team group photo',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2025/10/11896-1024x768.jpg',
            alt: 'Conference room project briefing',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/237098_0-1024x768.jpg',
            alt: 'Poultry farm ventilation and climate system commissioning',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/338213071_6247572745332805_2982020131925519013_n-1024x689.jpg',
            alt: 'Corporate ceremonial plaque handover',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/nggallery_import/20240910_142452-1024x768.jpg',
            alt: 'MOU signing and formal financial cooperation',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2024/10/237159_0-1-1024x768.jpg',
            alt: 'Electrical switchgear and substation audit',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_754/https://agileassets.co.th/wp-content/uploads/2022/01/263065161_417825200062927_7117604202506920683_n-754x1024-1.jpg',
            alt: 'Industrial chiller piping and high-grade valve installation',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361722-1024x478.jpg',
            alt: 'Heavy borehole drilling and water equipment project site',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_768/https://agileassets.co.th/wp-content/uploads/2022/03/361724-768x1645.jpg',
            alt: 'High-power diesel generator set motor unit',
        },
        {
            src: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1024/https://agileassets.co.th/wp-content/uploads/2022/03/361726-1024x478.jpg',
            alt: 'Industrial machinery commissioning and engineer site review',
        },
    ];

    const title = lang === 'th'
        ? 'ผลงานและกิจกรรม (Project & Activity) | Agile Assets'
        : 'Project & Activity | Agile Assets - Industrial Machinery Financing';
    const description = lang === 'th'
        ? 'ผลงานและกิจกรรมของ Agile Assets สะท้อนความเชี่ยวชาญ การเติบโตอย่างต่อเนื่อง ผ่านโครงการ ความร่วมมือและกิจกรรม ติดตามผลงานและกิจกรรมได้ที่นี่'
        : 'Agile Assets Projects & Activity — Demonstrating our engineering heritage, financing trust, and nationwide project commissionings.';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-sky-500 selection:text-white">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="https://agileassets.co.th/project/" />
            </Helmet>

            <Navbar />

            <main className="flex-1">
                {/* ─── 1. Hero Banner (Same Full Size as Home Page: min-h-[96vh]) ─── */}
                <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-10">
                    {/* Background Image: Same Exact Tree of Growth as Home Page */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroBg}
                            alt="Agile Assets Project & Activity"
                            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
                            loading="eager"
                        />
                        {/* Dynamic Vignette & Ambient Light Overlays — Identical to Home Page */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
                        <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 via-transparent to-black/80" />
                    </div>

                    {/* Glowing Ambient Aura Particles */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
                    <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-float" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

                    {/* Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
                        <ScrollReveal animation="fade-up">
                            <p className="text-xl sm:text-3xl font-semibold text-slate-100 mb-3 font-sans tracking-wide drop-shadow-md">
                                Agile Assets
                            </p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl font-sans">
                                Project & Activity
                            </h1>
                        </ScrollReveal>
                    </div>
                </section>

                {/* ─── 2. โครงการและกิจกรรมของเรา (8 Company Projects 4-Column Grid) ─── */}
                <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <ScrollReveal animation="fade-up">
                            <div className="text-center mb-12">
                                <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 mb-1">
                                    Project & Activity
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight font-sans">
                                    {lang === 'th' ? 'โครงการและกิจกรรมของเรา' : 'Our Projects & Activities'}
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* 4-Column Grid of 8 Company Project Slideshows */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-16">
                            {companyProjects.map((company, idx) => (
                                <ScrollReveal key={idx} animation="fade-up" delay={idx * 40}>
                                    <CompanySlideshowCard
                                        title={company.title}
                                        images={company.images}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* ─── 3. 12-Image Photographic Activity Grid (4 columns x 3 rows) ─── */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
                            {collagePhotos.map((photo, idx) => (
                                <ScrollReveal key={idx} animation="zoom-in" delay={idx * 30}>
                                    <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md bg-slate-200 dark:bg-slate-800 group border border-slate-200 dark:border-slate-800">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                                            <p className="text-[11px] font-medium text-white line-clamp-1">
                                                {photo.alt}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* ─── 4. Bottom 3 Action Buttons ─── */}
                        <ScrollReveal animation="fade-up">
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 pb-8">
                                {/* Financing with Us (Opens Official LINE Add Friend) */}
                                <a
                                    href="https://line.me/R/ti/p/%40884ukedb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all min-w-[200px] flex items-center justify-center gap-2"
                                >
                                    <DollarSign className="w-4 h-4" />
                                    <span>Financing with Us</span>
                                </a>

                                {/* Company Profile (Opens Company Profile PDF) */}
                                <a
                                    href="https://agileassets.co.th/wp-content/uploads/2021/11/Company-Profile-Agile-Assets.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all min-w-[200px] flex items-center justify-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Company Profile</span>
                                </a>

                                {/* Newsletter */}
                                <button
                                    onClick={() => {
                                        navigate('/newsletter');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all min-w-[200px] flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Newsletter</span>
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
            <CookieConsent />
            <QuickContactWidget />
        </div>
    );
}
