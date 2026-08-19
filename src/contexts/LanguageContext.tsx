import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Lang = 'th' | 'en';

const LANG_STORAGE_KEY = 'agile_assets_lang';

// ─── Translation Dictionary ───
const translations: Record<string, Record<Lang, string>> = {
    // Navbar & Menus
    'nav.home': { en: 'Home', th: 'หน้าแรก' },
    'nav.equipmentFinancing': { en: 'Equipment Financing', th: 'สินเชื่อเครื่องจักรและอุปกรณ์' },
    'nav.equipmentFinancing.desc': { en: 'Customized financial solutions for industrial, medical, and commercial assets', th: 'โซลูชันทางการเงินสำหรับเครื่องจักรอุตสาหกรรม การแพทย์ และยานพาหนะ' },
    'nav.investorRelations': { en: 'Investor Relations', th: 'นักลงทุนสัมพันธ์' },
    'nav.pressCenter': { en: 'Press Center', th: 'ศูนย์ข่าวสาร' },
    'nav.about': { en: 'About Us', th: 'เกี่ยวกับเรา' },
    'nav.assetForSale': { en: 'Asset for Sale', th: 'ทรัพย์รอการขาย' },
    'nav.rates': { en: 'Rates', th: 'อัตราดอกเบี้ย' },
    'nav.news': { en: 'News & Media', th: 'ข่าวสาร' },
    'nav.contact': { en: 'Contact Us', th: 'ติดต่อเรา' },
    'nav.calculator': { en: 'Loan Calculator', th: 'คำนวณสินเชื่อ' },
    'nav.financingWithUs': { en: '$ Financing with Us', th: 'ขอสินเชื่อกับเรา' },

    // Menu Dropdowns
    'menu.industrySolutions': { en: 'Industry Solutions', th: 'Industry Solutions' },
    'menu.industrialEquipment': { en: 'Industrial Equipment', th: 'Industrial Equipment' },
    'menu.drinkingWater': { en: 'Drinking Water Production', th: 'Drinking Water Production' },
    'menu.livestockFarm': { en: 'Livestock Farm', th: 'Livestock Farm' },
    'menu.foodProcessing': { en: 'Food Processing', th: 'Food Processing' },
    'menu.biogasProduction': { en: 'Biogas Production', th: 'Biogas Production' },
    'menu.solarPower': { en: 'Solar Power Generation – EN', th: 'Solar Power Generation – EN' },
    'menu.chiller': { en: 'Financing Service for Chiller', th: 'Financing Service for Chiller' },
    'menu.injectionMolding': { en: 'Financing Service for Injection Molding Machine', th: 'Financing Service for Injection Molding Machine' },
    'menu.generatorSet': { en: 'Financing Service for Generator Set', th: 'Financing Service for Generator Set' },

    'menu.industrialMachinery': { en: 'Industrial Machinery', th: 'เครื่องจักรอุตสาหกรรม' },
    'menu.medicalEquipment': { en: 'Medical Equipment', th: 'เครื่องมือและอุปกรณ์แพทย์' },
    'menu.commercialFleet': { en: 'Commercial Transport & Fleet', th: 'ยานพาหนะเชิงพาณิชย์' },
    'menu.cleanEnergy': { en: 'Clean Tech & Solar Energy', th: 'พลังงานสะอาดและโซลาร์' },
    'menu.factoring': { en: 'Factoring & Working Capital', th: 'สินเชื่อหมุนเวียนธุรกิจ' },
    'menu.saleAndLeaseback': { en: 'Sale & Leaseback', th: 'ขายและเช่ากลับ (Sale & Leaseback)' },
    'menu.financialReports': { en: 'Financial Reports & Disclosure', th: 'รายงานทางการเงินและการเปิดเผยข้อมูล' },
    'menu.governance': { en: 'Corporate Governance & ESG', th: 'การกำกับดูแลกิจการและ ESG' },
    'menu.shareholderInfo': { en: 'Shareholder & Stock Info', th: 'ข้อมูลผู้ถือหุ้น' },
    'menu.pressReleases': { en: 'Press Releases & Events', th: 'ข่าวประชาสัมพันธ์และกิจกรรม' },
    'menu.mediaKit': { en: 'Media Kit & Publications', th: 'สื่อประชาสัมพันธ์และบทความ' },
    'menu.projectsActivity': { en: 'Projects & Activity', th: 'Projects & Activity' },
    'menu.successStory': { en: 'Success Story', th: 'Success Story' },
    'menu.knowledgeContents': { en: 'Knowledge Contents', th: 'Knowledge Contents' },
    'menu.newsUpdate': { en: 'News Update', th: 'News Update' },
    'menu.newsletter': { en: 'Newsletter', th: 'Newsletter' },
    'menu.sustainabilityCampaign': { en: 'Sustainability Campaign', th: 'Sustainability Campaign' },
    'menu.financingCalculator': { en: 'Financing Calculator', th: 'Financing Calculator' },
    'menu.interestRateConverter': { en: 'Interest Rate Converter', th: 'Interest Rate Converter' },
    'menu.faq': { en: 'Frequently Asked Questions (FAQ)', th: 'Frequently Asked Questions (FAQ)' },
    'menu.contactUs': { en: 'Contact Us', th: 'Contact Us' },
    'menu.workForUs': { en: 'Work for Us', th: 'Work for Us' },
    'menu.ourStory': { en: 'Our Vision & Heritage', th: 'ประวัติและวิสัยทัศน์องค์กร' },
    'menu.leadership': { en: 'Board of Directors & Executives', th: 'คณะกรรมการและผู้บริหาร' },

    // Hero Banner
    'hero.badge': { en: 'Agile Assets • Trusted Capital Solutions Since 2010', th: 'Agile Assets • โซลูชันเงินทุนที่เชื่อถือได้ตั้งแต่ปี 2010' },
    'hero.titleMain': { en: 'Growth – Good Capital', th: 'Growth – Good Capital' },
    'hero.titleTh': { en: 'Agile & Sustainable Capital Solutions', th: 'ทุนเติบโต - ดี - งาม' },
    'hero.description': { en: 'Powering high-potential businesses with bespoke equipment leasing, industrial machinery loans, and fast working capital.', th: 'ขับเคลื่อนธุรกิจสู่อนาคต ด้วยบริการสินเชื่อเครื่องจักร อุปกรณ์เพื่อการพาณิชย์ และเงินทุนหมุนเวียนที่คล่องตัว โปร่งใส เคียงข้างทุกการเติบโต' },
    'hero.ctaFinancing': { en: '$ Financing with Us', th: 'ขอสินเชื่อกับเรา' },
    'hero.ctaCalculator': { en: 'Calculate Loan', th: 'คำนวณค่างวดเบื้องต้น' },
    'hero.ctaExplore': { en: 'Explore Solutions', th: 'ดูบริการทางการเงิน' },
    'hero.learnMore': { en: 'Learn More', th: 'เรียนรู้เพิ่มเติม' },
    'hero.stat.aum': { en: 'Capital Deployed', th: 'เงินทุนสนับสนุนธุรกิจ' },
    'hero.stat.aumValue': { en: '฿25B+', th: '25,000+ ล้านบาท' },
    'hero.stat.years': { en: 'Years of Excellence', th: 'ปีแห่งความเชี่ยวชาญ' },
    'hero.stat.yearsValue': { en: '16+ Years', th: 'กว่า 16 ปี' },
    'hero.stat.approval': { en: 'Fast Approval Turnaround', th: 'อนุมัติรวดเร็ว' },
    'hero.stat.approvalValue': { en: '24-48 Hours', th: '24 - 48 ชม.' },
    'hero.stat.satisfaction': { en: 'Client Trust & ESG Rating', th: 'คะแนนความไว้วางใจ' },
    'hero.stat.satisfactionValue': { en: '100% ESG', th: '100% ESG' },

    // Our Story Section (เรื่องราวของเรา)
    'story.badge': { en: 'AGILE ASSETS', th: 'AGILE ASSETS' },
    'story.title': { en: 'Our Story', th: 'เรื่องราวของเรา' },
    'story.subtitle': { en: 'Bridging financial possibilities to drive tangible industrial growth across Thailand.', th: 'สะพานเชื่อมโอกาสทางการเงิน สู่การเติบโตอย่างยั่งยืนของภาคธุรกิจไทย' },

    'story.card1.tag': { en: 'Engineering Roots', th: 'จุดเริ่มต้นของเรา' },
    'story.card1.title': { en: 'The Genesis of Agile Assets', th: 'จุดเริ่มต้นของอาจิไลท์ แอสเซทส์' },
    'story.card1.quote': { en: 'Many Thai enterprises are ready to scale, but held back by machinery and capital.', th: 'ธุรกิจไทยจำนวนมาก "ไปต่อได้" แต่ติดอยู่ที่เงินทุนและเครื่องจักร' },
    'story.card1.desc': { en: 'We originated from an engineering background with deep insights into industrial equipment. Seeing this bottleneck, we engineered financial solutions that truly unlock growth.', th: 'เราเริ่มต้นจากบริษัทวิศวกรรม ที่เข้าใจเครื่องจักรและอุตสาหกรรมอย่างลึกซึ้ง เรามองเห็นถึงปัญหา จึงพัฒนาโซลูชันทางการเงินเพื่อช่วยให้ธุรกิจเติบโตได้จริง' },
    'story.card1.btn': { en: 'Read Our Story', th: 'อ่านเรื่องราวของเรา' },

    'story.card2.tag': { en: 'Industrial Financing', th: 'สินเชื่ออุตสาหกรรม' },
    'story.card2.title': { en: 'Industrial Machinery Leasing', th: 'สินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม' },
    'story.card2.quote': { en: 'We provide financing across diverse sectors to power continuous business expansion.', th: 'เราสนับสนุนสินเชื่อที่ครอบคลุมธุรกิจในหลายอุตสาหกรรม และขยายตัวอย่างต่อเนื่อง' },
    'story.card2.desc': { en: 'We collaborate closely with financial partners to empower Thai entrepreneurs and bridge financial access for SMEs nationwide.', th: 'เราร่วมมือกับพันธมิตรทางการเงิน เพื่อขยายโอกาสให้ผู้ประกอบการไทย เพื่อเติมเต็มโอกาส เป็นสะพานทางการเงินให้ธุรกิจ SMEs ในประเทศไทย' },
    'story.card2.btn': { en: 'Download Newsletter', th: 'ดาวน์โหลด Newsletter' },

    'story.card3.tag': { en: 'Partnership & Future', th: 'พันธมิตรและการเติบโต' },
    'story.card3.title': { en: 'Grow Together With Us', th: 'เติบโตไปพร้อมกับเรา' },
    'story.card3.quote': { en: 'We believe resilient growth happens when all stakeholders advance together.', th: 'เราเชื่อว่าการเติบโตที่มั่นคง เกิดขึ้นเมื่อทุกฝ่ายจับมือไปพร้อมกัน' },
    'story.card3.desc': { en: 'Agile Assets is dedicated to expanding financial capabilities and fostering trusted partnerships to support enterprises moving forward with confidence.', th: 'อาจิไลท์ แอสเซทส์ มุ่งมั่นเพิ่มศักยภาพและพัฒนาโซลูชันทางการเงิน สร้างความร่วมมือกับพันธมิตร เพื่อสนับสนุนธุรกิจให้ก้าวไปอย่างมั่นคง' },
    'story.card3.btn': { en: 'Investor Relations', th: 'นักลงทุนสัมพันธ์' },

    // Equipment Financing Section
    'financing.badge': { en: 'Our Core Capabilities', th: 'บริการสินเชื่อหลัก' },
    'financing.title': { en: 'Equipment Financing Solutions', th: 'สินเชื่อเครื่องจักรและอุปกรณ์ธุรกิจ' },
    'financing.subtitle': { en: 'Comprehensive and agile financing models structured to accelerate your business operations without tying up capital.', th: 'โครงสร้างสินเชื่อที่ยืดหยุ่น ออกแบบเฉพาะสำหรับธุรกิจที่ต้องการขยายกำลังการผลิตโดยไม่สะดุดกระแสเงินสด' },
    'financing.apply': { en: 'Apply for Financing', th: 'สมัครขอสินเชื่อ' },
    'financing.learnMore': { en: 'Learn Details', th: 'ดูรายละเอียด' },

    // Loan Calculator Section
    'calc.badge': { en: 'Interactive Simulator', th: 'เครื่องคำนวณสินเชื่อ' },
    'calc.title': { en: 'Estimate Your Monthly Installment', th: 'คำนวณค่างวดสินเชื่อเบื้องต้น' },
    'calc.subtitle': { en: 'Plan your budget with clarity. Adjust loan amounts, term lengths, and see transparent installment estimates instantly.', th: 'วางแผนการเงินได้อย่างแม่นยำ เลือกวงเงินและระยะเวลาผ่อนชำระเพื่อดูประมาณการค่างวดได้ทันที' },
    'calc.loanAmount': { en: 'Financing Amount', th: 'วงเงินที่ต้องการกู้' },
    'calc.tenure': { en: 'Repayment Period (Months)', th: 'ระยะเวลาผ่อนชำระ (เดือน)' },
    'calc.interestRate': { en: 'Estimated Interest Rate (p.a.)', th: 'อัตราดอกเบี้ยประมาณการ (ต่อปี)' },
    'calc.monthlyPayment': { en: 'Estimated Monthly Payment', th: 'ค่างวดประมาณการต่อเดือน' },
    'calc.totalInterest': { en: 'Estimated Total Interest', th: 'ดอกเบี้ยรวมโดยประมาณ' },
    'calc.totalPayment': { en: 'Total Repayment Amount', th: 'ยอดรวมเงินต้นและดอกเบี้ย' },
    'calc.months': { en: 'Months', th: 'เดือน' },
    'calc.baht': { en: 'THB', th: 'บาท' },
    'calc.applyNow': { en: 'Apply with This Plan', th: 'ยื่นขอสินเชื่อตามแผนนี้' },
    'calc.disclaimer': { en: '* The calculated amounts are estimates for preliminary planning purposes. Final terms depend on credit underwriting.', th: '* ผลการคำนวณนี้เป็นเพียงการประมาณการเบื้องต้น เงื่อนไขและอัตราดอกเบี้ยจริงขึ้นอยู่กับผลการพิจารณาสินเชื่อของบริษัท' },

    // Asset for Sale Section
    'assetSale.badge': { en: 'Pre-owned & Certified Assets', th: 'ทรัพย์สินพร้อมส่งมอบ' },
    'assetSale.title': { en: 'Assets for Sale & Direct Lease', th: 'ทรัพย์รอการขายและให้เช่า' },
    'assetSale.subtitle': { en: 'High-grade inspected machinery, vehicles, and commercial equipment available for purchase or flexible leaseback.', th: 'เครื่องจักร ยานพาหนะ และอุปกรณ์คุณภาพสูงที่ผ่านการตรวจเช็กมาตรฐาน พร้อมส่งมอบทันทีในราคาคุ้มค่า' },
    'assetSale.filterAll': { en: 'All Categories', th: 'ทั้งหมด' },
    'assetSale.filterMachinery': { en: 'Machinery', th: 'เครื่องจักรอุตสาหกรรม' },
    'assetSale.filterVehicles': { en: 'Commercial Fleet', th: 'ยานพาหนะขนส่ง' },
    'assetSale.filterMedical': { en: 'Medical Tech', th: 'อุปกรณ์การแพทย์' },
    'assetSale.filterEnergy': { en: 'Clean Energy', th: 'พลังงานสะอาด' },
    'assetSale.inquire': { en: 'Inquire Asset', th: 'สนใจสอบถามราคา' },
    'assetSale.statusAvailable': { en: 'Available', th: 'พร้อมส่งมอบ' },
    'assetSale.specs': { en: 'Specifications', th: 'รายละเอียด' },

    // Interest Rates
    'rates.badge': { en: 'Live Rates', th: 'อัตราดอกเบี้ยล่าสุด' },
    'rates.title': { en: 'Competitive Interest Rates', th: 'อัตราดอกเบี้ยที่โปร่งใสและแข่งขันได้' },
    'rates.subtitle': { en: 'Transparent, competitive rates across all our lending products. Updated in real-time.', th: 'อัตราดอกเบี้ยที่โปร่งใสและแข่งขันได้สำหรับทุกผลิตภัณฑ์สินเชื่อ อัปเดตแบบเรียลไทม์' },
    'rates.featured': { en: 'Featured', th: 'แนะนำ' },
    'rates.apr': { en: 'APR', th: 'ต่อปี' },
    'rates.term': { en: 'Term', th: 'ระยะเวลา' },
    'rates.disclaimer': { en: '* Rates are subject to change and may vary based on creditworthiness and loan amount. Contact us for a personalized quote.', th: '* อัตราดอกเบี้ยอาจมีการเปลี่ยนแปลง และอาจแตกต่างกันตามความน่าเชื่อถือและยอดสินเชื่อ ติดต่อเราเพื่อรับใบเสนอราคาเฉพาะบุคคล' },

    // News
    'news.badge': { en: 'Press Center & Insights', th: 'ศูนย์ข่าวสาร & กิจกรรม' },
    'news.title': { en: 'News & Announcements', th: 'ข่าวสาร & ข้อมูลความรู้' },
    'news.subtitle': { en: 'Stay informed with the latest market insights, company news, and financial updates.', th: 'ติดตามข่าวสาร ข้อมูลเชิงลึกเกี่ยวกับตลาด และอัปเดตทางการเงินล่าสุด' },
    'news.pinned': { en: 'Pinned', th: 'ปักหมุด' },
    'news.readMore': { en: 'Read More', th: 'อ่านรายละเอียด' },

    // About
    'about.badge': { en: 'Who We Are', th: 'รู้จัก Agile Assets' },
    'about.title': { en: 'Why Choose', th: 'ทำไมธุรกิจชั้นนำจึงเลือก' },
    'about.subtitle': { en: 'We combine decades of financial expertise with cutting-edge agility to deliver unmatched value to our clients and investors.', th: 'เราผสานประสบการณ์ความเชี่ยวชาญทางการเงินเข้ากับความรวดเร็วและเทคโนโลยี เพื่อส่งมอบคุณค่าที่ดีที่สุดให้แก่ลูกค้าและพันธมิตร' },
    'about.precision': { en: 'Speed & Agility', th: 'ความคล่องตัวและรวดเร็ว' },
    'about.precision.desc': { en: 'Swift credit assessment and streamlined underwriting to meet fast-moving business schedules.', th: 'กระบวนการพิจารณาสินเชื่อที่กระชับ รวดเร็ว สอดคล้องกับจังหวะโอกาสทางธุรกิจของคุณ' },
    'about.clientFirst': { en: 'Client Partnership', th: 'เคียงข้างพันธมิตรธุรกิจ' },
    'about.clientFirst.desc': { en: 'We structure tailored repayment schedules aligned with your specific business cashflow cycles.', th: 'ออกแบบงวดการชำระเงินที่สอดคล้องกับรอบกระแสเงินสดและลักษณะธุรกิจจริง' },
    'about.excellence': { en: '16+ Years Heritage', th: 'ประสบการณ์กว่า 16 ปี' },
    'about.excellence.desc': { en: 'Proven track record of supporting over 5,000 enterprise and SME projects nationwide.', th: 'ประวัติการสนับสนุนสินเชื่อให้แก่องค์กรและผู้ประกอบการกว่า 5,000 โครงการทั่วประเทศ' },
    'about.innovation': { en: 'Green & Sustainable Capital', th: 'เงินทุนเพื่อความยั่งยืน (ESG)' },
    'about.innovation.desc': { en: 'Special financing incentives and favorable rates for green energy and eco-friendly technology.', th: 'สิทธิประโยชน์อัตราดอกเบี้ยพิเศษสำหรับโครงการพลังงานสะอาดและเทคโนโลยีรักษ์โลก' },

    // Contact
    'contact.badge': { en: 'Connect With Our Specialists', th: 'ปรึกษาผู้เชี่ยวชาญ' },
    'contact.title': { en: 'Get in Touch with Agile Assets', th: 'ติดต่อฝ่ายสินเชื่อและการลงทุน' },
    'contact.subtitle': { en: 'Ready to elevate your business capacity? Speak directly with our dedicated financial advisors.', th: 'พร้อมขยายขีดความสามารถทางธุรกิจของคุณหรือยัง? ปรึกษาทีมผู้เชี่ยวชาญของเราได้โดยตรง' },
    'contact.info': { en: 'Office Information', th: 'ข้อมูลติดต่อสำนักงาน' },
    'contact.phone': { en: 'Telephone', th: 'เบอร์โทรศัพท์' },
    'contact.email': { en: 'Email Address', th: 'อีเมล' },
    'contact.address': { en: 'Headquarters', th: 'ที่อยู่สำนักงานใหญ่' },
    'contact.hours': { en: 'Operating Hours', th: 'เวลาทำการ' },
    'contact.hours.weekday': { en: 'Monday – Friday: 8:30 AM – 5:30 PM', th: 'จันทร์ – ศุกร์: 8:30 – 17:30 น.' },
    'contact.hours.saturday': { en: 'Saturday – Sunday: Closed', th: 'เสาร์ – อาทิตย์: ปิดทำการ' },
    'contact.hours.sunday': { en: 'Public Holidays: Closed', th: 'วันหยุดนักขัตฤกษ์: ปิดทำการ' },
    'contact.form.title': { en: 'Request a Financing Consultation', th: 'กรอกข้อมูลขอรับคำปรึกษาสินเชื่อ' },
    'contact.form.name': { en: 'Full Name / Contact Person', th: 'ชื่อ-นามสกุล ผู้ติดต่อ' },
    'contact.form.namePlaceholder': { en: 'Enter your full name', th: 'ระบุชื่อ-นามสกุล' },
    'contact.form.phone': { en: 'Phone Number', th: 'เบอร์โทรศัพท์ติดต่อ' },
    'contact.form.phonePlaceholder': { en: 'e.g. 081-234-5678', th: 'เช่น 081-234-5678' },
    'contact.form.company': { en: 'Company Name', th: 'ชื่อบริษัท / กิจการ' },
    'contact.form.companyPlaceholder': { en: 'Your company name', th: 'ระบุชื่อบริษัทหรือกิจการ' },
    'contact.form.productType': { en: 'Interested Product', th: 'ผลิตภัณฑ์ที่สนใจ' },
    'contact.form.email': { en: 'Email Address', th: 'อีเมล' },
    'contact.form.emailPlaceholder': { en: 'your.email@company.com', th: 'your.email@company.com' },
    'contact.form.amount': { en: 'Expected Financing Amount (THB)', th: 'วงเงินที่ต้องการ (บาท)' },
    'contact.form.amountPlaceholder': { en: 'e.g. 5,000,000', th: 'เช่น 5,000,000' },
    'contact.form.message': { en: 'Additional Details', th: 'รายละเอียดเพิ่มเติม / วัตถุประสงค์' },
    'contact.form.messagePlaceholder': { en: 'Please describe the machinery or equipment you wish to finance...', th: 'ระบุประเภทเครื่องจักรหรือรายละเอียดความต้องการ...' },
    'contact.form.submit': { en: 'Submit Financing Request', th: 'ส่งข้อมูลขอรับคำปรึกษา' },
    'contact.form.success': { en: 'Thank you! Our financing specialist will contact you within 24 business hours.', th: 'ขอบคุณที่ติดต่อเรา! เจ้าหน้าที่ฝ่ายสินเชื่อจะติดต่อกลับหาท่านภายใน 24 ชั่วโมงทำการ' },

    // Cookie Consent Banner (PDPA)
    'cookie.text': { en: 'We use cookies to improve performance, analyze site traffic, and enhance your user experience. By continuing to use this website, you agree to our Privacy Policy.', th: 'เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ คุณสามารถศึกษารายละเอียดได้ที่ นโยบายความเป็นส่วนตัว' },
    'cookie.privacyLink': { en: 'Privacy Policy', th: 'นโยบายความเป็นส่วนตัว' },
    'cookie.accept': { en: 'Accept All', th: 'ยอมรับ' },
    'cookie.decline': { en: 'Decline', th: 'ไม่ยอมรับ' },
    'cookie.readPolicy': { en: 'Cookie Policy', th: 'อ่านประกาศนโยบายคุกกี้' },

    // Footer
    'footer.quickLinks': { en: 'Quick Links', th: 'เมนูลัด' },
    'footer.services': { en: 'Financing Services', th: 'บริการสินเชื่อ' },
    'footer.contact': { en: 'Contact & Support', th: 'ติดต่อเรา' },
    'footer.copyright': { en: 'All rights reserved.', th: 'สงวนลิขสิทธิ์' },
    'footer.license': { en: 'Licensed and regulated financial institution under applicable laws.', th: 'ดำเนินธุรกิจตามกฎหมายและหลักเกณฑ์การกำกับดูแลของหน่วยงานที่เกี่ยวข้อง' },
};

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        return (stored === 'th' || stored === 'en') ? stored : 'th';
    });

    useEffect(() => {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    }, [lang]);

    const setLang = (newLang: Lang) => setLangState(newLang);

    const t = useCallback((key: string): string => {
        return translations[key]?.[lang] ?? key;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
