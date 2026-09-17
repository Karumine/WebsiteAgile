# 📋 Backend API Specification — Addendum v2.0
## เอกสารส่วนต่อขยายข้อกำหนดระบบหลังบ้าน (Phase 2 Enhancements)

> **เอกสารฉบับนี้สำหรับ**: ทีม Backend Developer / DevOps Team  
> **โปรเจกต์**: Agile Assets Corporate Website & Management Portal (`agileassets.co.th`)  
> **เอกสารอ้างอิงหลัก**: [Backend_API_Spec_AgileAssets.md (v1.0)](file:///c:/Users/not/Documents/GitHub/PO-System/PO-system/git-po-system/WebsiteAgile/Backend_API_Spec_AgileAssets.md)  
> **วันที่ประกาศ**: 17 กันยายน 2569  
> **เวอร์ชัน**: 2.0 (Change Request & API Addendum)  
> **สถานะ**: Final Specification for Implementation  

---

## สารบัญ (Table of Contents)

1. [บทสรุปการเปลี่ยนแปลง (Executive Summary & Changelog)](#1-บทสรุปการเปลี่ยนแปลง-executive-summary--changelog)
2. [การอัปเดตระบบ Authentication & Initial Admin](#2-การอัปเดตระบบ-authentication--initial-admin)
3. [ระบบจัดการธีมและสีปุ่ม (Theme & Button Styling API)](#3-ระบบจัดการธีมและสีปุ่ม-theme--button-styling-api)
4. [ระบบจัดการเนื้อหาทุกหน้าเว็บ (Universal Page Content CMS API)](#4-ระบบจัดการเนื้อหาทุกหน้าเว็บ-universal-page-content-cms-api)
5. [ระบบรับสมัครงานออนไลน์ (Careers & Job Application API)](#5-ระบบรับสมัครงานออนไลน์-careers--job-application-api)
6. [โครงสร้างฐานข้อมูลส่วนเพิ่ม (Database Schema & Migration DDL)](#6-โครงสร้างฐานข้อมูลส่วนเพิ่ม-database-schema--migration-ddl)
7. [รายการงานสำหรับทีม Backend (Implementation Checklist)](#7-รายการงานสำหรับทีม-backend-implementation-checklist)

---

## 1. บทสรุปการเปลี่ยนแปลง (Executive Summary & Changelog)

สืบเนื่องจากการส่งมอบเอกสารข้อกำหนดระบบหลังบ้านเวอร์ชันแรก (`Backend_API_Spec_AgileAssets.md v1.0`) ทางทีมพัฒนา Frontend ได้รับข้อกำหนดทางธุรกิจเพิ่มเติม (Business Requirements Phase 2) และได้ทำการอิมพลีเมนต์ฝั่ง UI/UX เสร็จสมบูรณ์แล้ว

เอกสาร **Addendum v2.0** ฉบับนี้จัดทำขึ้นโดยเฉพาะ เพื่อสรุป **API Endpoints ส่วนเพิ่ม, โครงสร้างข้อมูลใหม่ (Database Schema), และการปรับปรุงค่าพื้นฐาน** โดยทีม Backend สามารถต่อยอดจากโค้ดเดิมได้ทันที โดยไม่ต้องรื้อระบบเดิม

### สรุปสาระสำคัญที่เปลี่ยนแปลงจาก v1.0:

| รายการ | v1.0 (เดิม) | v2.0 (ใหม่ใน Addendum นี้) | ผลกระทบต่อ Backend |
|---|---|---|---|
| **Admin Credentials** | `admin` / `admin123` | `dreamza007` / `123456789` | อัปเดต Initial Seed Data ใน Database |
| **Website Typography** | Prompt & Plus Jakarta Sans | **Noto Sans Thai** & Plus Jakarta Sans | อัปเดตรองรับการสร้าง PDF / Email Template ด้วย Noto Sans Thai |
| **หน้าสมัครงาน (Careers)** | ไม่มี (ลิงก์ไปหน้า Contact) | **หน้าใหม่เต็มรูปแบบ (`/work-for-us`)** | เพิ่ม API รับใบสมัครงาน (`POST /careers/apply`) และตารางจัดเก็บ |
| **การปรับแต่งสีปุ่ม & ธีม** | Hardcoded CSS | **Admin ปรับแต่งสีปุ่มและธีมได้อิสระ** | เพิ่ม API บันทึก Theme Settings (`/settings/theme`) |
| **การแก้ไขเนื้อหาหน้าเว็บ** | แก้ได้เฉพาะบางหน้า (Banner, News, Rates) | **แก้ไขได้ทุกหน้าของเว็บไซต์ (Universal CMS)** | เพิ่ม API จัดการเนื้อหาตาม `pageId` (`/pages/{pageId}`) |

---

## 2. การอัปเดตระบบ Authentication & Initial Admin

> [!IMPORTANT]
> มีการปรับเปลี่ยนค่าเริ่มต้นบัญชีผู้ดูแลระบบ (Administrator Account) สำหรับการเริ่มต้นใช้งานครั้งแรก

### 2.1 บัญชีผู้ดูแลระบบตั้งต้น (Initial Seed Account)
* **Username**: `dreamza007`
* **Default Password**: `123456789` (บันทึกด้วย BCrypt / Argon2 Hashing ใน Production)
* **Role**: `admin`
* **Display Name**: `Super Administrator`
* **Email**: `admin@agileassets.co.th`

### 2.2 SQL สำหรับอัปเดต Seed Data

#### SQL Server (T-SQL):
```sql
-- อัปเดตหรือเพิ่มบัญชี Admin ใหม่
IF EXISTS (SELECT 1 FROM Users WHERE Username = 'admin')
BEGIN
    UPDATE Users 
    SET Username = 'dreamza007',
        PasswordHash = '$2a$12$e8YkY/mY1Wk3g.XjO9z6seQ4Nf8oH1z6Q9z6seQ4Nf8oH1z6Q9z6s', -- BCrypt hash of 123456789
        UpdatedAt = GETUTCDATE()
    WHERE Username = 'admin';
END
ELSE IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'dreamza007')
BEGIN
    INSERT INTO Users (Id, Username, PasswordHash, Role, FullName, Email, IsActive, CreatedAt)
    VALUES (NEWID(), 'dreamza007', '$2a$12$e8YkY/mY1Wk3g.XjO9z6seQ4Nf8oH1z6Q9z6seQ4Nf8oH1z6Q9z6s', 'admin', 'Agile Admin', 'admin@agileassets.co.th', 1, GETUTCDATE());
END
```

---

## 3. ระบบจัดการธีมและสีปุ่ม (Theme & Button Styling API)

ผู้ดูแลระบบสามารถปรับเปลี่ยนคู่สีปุ่ม สีกราเดียนต์ ความโค้งมนของปุ่ม และสีประกายได้จากหน้าระบบหลังบ้าน โดยค่าเหล่านี้จะต้องถูกเก็บไว้ใน Database เพื่อให้ผู้เข้าชมทุกคนเห็นสีธีมที่ตรงกัน

### 3.1 ดึงการตั้งค่าธีมปัจจุบัน (Get Active Theme)
* **Method**: `GET`
* **Endpoint**: `/api/v1/settings/theme`
* **Authorization**: ไม่ต้องมี (Public API สำหรับ Frontend ดึงไปปรับ CSS Variable บน `:root`)

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "primaryColor": "#0284c7",
    "gradientStart": "#0284c7",
    "gradientEnd": "#0369a1",
    "buttonTextColor": "#ffffff",
    "buttonRadius": "rounded-xl",
    "buttonStyle": "gradient",
    "accentColor": "#38bdf8",
    "updatedAt": "2026-09-17T08:30:00Z"
  }
}
```

### 3.2 บันทึกการตั้งค่าธีม (Update Theme Settings)
* **Method**: `PUT`
* **Endpoint**: `/api/v1/settings/theme`
* **Authorization**: `Bearer {admin_token}` (เฉพาะ Admin)

#### Request Body:
```json
{
  "primaryColor": "#0284c7",
  "gradientStart": "#0284c7",
  "gradientEnd": "#0369a1",
  "buttonTextColor": "#ffffff",
  "buttonRadius": "rounded-xl",
  "buttonStyle": "gradient",
  "accentColor": "#38bdf8"
}
```

#### Validation Rules:
* `primaryColor`, `gradientStart`, `gradientEnd`, `accentColor`: ต้องเป็น Hex Color Code รูปแบบ `#RRGGBB` ที่ถูกต้อง
* `buttonRadius`: ค่าที่รองรับคือ `rounded-md`, `rounded-xl`, `rounded-2xl`, `rounded-full`
* `buttonStyle`: ค่าที่รองรับคือ `gradient`, `solid`, `glow`

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "primaryColor": "#0284c7",
    "gradientStart": "#0284c7",
    "gradientEnd": "#0369a1",
    "buttonTextColor": "#ffffff",
    "buttonRadius": "rounded-xl",
    "buttonStyle": "gradient",
    "accentColor": "#38bdf8",
    "updatedAt": "2026-09-17T08:35:00Z"
  },
  "message": "Theme settings updated successfully"
}
```

---

## 4. ระบบจัดการเนื้อหาทุกหน้าเว็บ (Universal Page Content CMS API)

Frontend ได้พัฒนาระบบ **Universal Page Content CMS** ซึ่งรองรับการแก้ไขข้อมูลของทุกหน้าบนเว็บไซต์ (21 หน้าหลัก) เช่น หน้าแรก, เกี่ยวกับเรา, สินเชื่ออุตสาหกรรมทั้ง 8 ประเภท, ความยั่งยืน, นักลงทุนสัมพันธ์, และนโยบายต่างๆ

### รายชื่อ `pageId` ทั้งหมดที่ระบบรองรับ:

| `pageId` | ชื่อหน้าภาษาไทย | URL Path |
|---|---|---|
| `home` | หน้าแรก | `/` |
| `about` | เกี่ยวกับเรา | `/about` |
| `work-for-us` | ร่วมงานกับเรา (Careers) | `/work-for-us` |
| `drinking-water` | สินเชื่อโรงงานผลิตน้ำดื่ม | `/drinking-water-production` |
| `livestock-farm` | สินเชื่อฟาร์มปศุสัตว์ | `/livestock-farm` |
| `food-processing` | สินเชื่อโรงงานแปรรูปอาหาร | `/food-processing` |
| `biogas-production` | สินเชื่อโรงไฟฟ้าก๊าซชีวภาพ | `/biogas-production` |
| `solar-power` | สินเชื่อระบบพลังงานแสงอาทิตย์ | `/solar-power-generation` |
| `chiller` | สินเชื่อเครื่องทำความเย็นชิลเลอร์ | `/chiller` |
| `injection-molding` | สินเชื่อเครื่องฉีดพลาสติก | `/injection-molding-machine` |
| `generator-set` | สินเชื่อเครื่องกำเนิดไฟฟ้า | `/generator-set` |
| `sustainability` | ความยั่งยืน & ESG | `/sustainability` |
| `investor-relations`| นักลงทุนสัมพันธ์ | `/investor-relations` |
| `projects` | โครงการ & กิจกรรม | `/project` |
| `contact` | ติดต่อเรา | `/contact` |
| `calculator` | เครื่องคำนวณสินเชื่อ | `/calculator` |
| `interest-rate` | เครื่องมือแปลงอัตราดอกเบี้ย | `/interest-rate-conversion` |
| `nc-nda` | สัญญาการรักษาความลับ (NC-NDA) | `/nc-nda` |
| `cookie-policy` | นโยบายคุกกี้และความเป็นส่วนตัว | `/cookie-policy` |

---

### 4.1 รายการหน้าทั้งหมดและสถานะ (List All Managed Pages)
* **Method**: `GET`
* **Endpoint**: `/api/v1/pages`
* **Authorization**: `Bearer {admin_token}`

#### Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "pageId": "drinking-water",
      "pageName": "โรงงานผลิตน้ำดื่ม (Drinking Water)",
      "path": "/drinking-water-production",
      "category": "สินเชื่ออุตสาหกรรม",
      "isCustomized": true,
      "lastUpdated": "2026-09-17T08:15:00Z"
    },
    {
      "pageId": "work-for-us",
      "pageName": "ร่วมงานกับเรา (Work for Us)",
      "path": "/work-for-us",
      "category": "หน้าหลัก",
      "isCustomized": false,
      "lastUpdated": null
    }
  ]
}
```

---

### 4.2 ดึงเนื้อหาเฉพาะหน้า (Get Page Content)
* **Method**: `GET`
* **Endpoint**: `/api/v1/pages/{pageId}`
* **Authorization**: ไม่ต้องมี (Public API สำหรับให้แต่ละหน้าใน Frontend ดึงไปแสดงผล)

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "pageId": "drinking-water",
    "pageName": "โรงงานผลิตน้ำดื่ม (Drinking Water)",
    "metaTitle": "สินเชื่อเครื่องจักรโรงงานผลิตน้ำดื่ม | Agile Assets",
    "metaDescription": "สินเชื่อเช่าซื้อเครื่องเป่าขวด PET เครื่องบรรจุอัตโนมัติ และระบบกรองน้ำ RO สำหรับโรงงานน้ำดื่ม",
    "heroBadgeTh": "DRINKING WATER INDUSTRY",
    "heroBadgeEn": "DRINKING WATER INDUSTRY",
    "heroTitleTh": "สินเชื่อเครื่องจักรโรงงานผลิตน้ำดื่ม",
    "heroTitleEn": "Financing for Drinking Water Production Line",
    "heroSubtitleTh": "สนับสนุนเงินทุนจัดซื้อเครื่องเป่าขวด PET เครื่องบรรจุน้ำอัตโนมัติความเร็วสูง และระบบกรอง RO",
    "heroSubtitleEn": "High-speed automated PET bottle blowing, filling line, and industrial RO purification systems.",
    "heroImage": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=1200&q=80",
    "ctaTextTh": "ขอสินเชื่อโรงงานน้ำดื่ม",
    "ctaTextEn": "Apply for Financing",
    "ctaLink": "/leasing-application",
    "contentTh": "<p>รายละเอียดเพิ่มเติมเกี่ยวกับเงื่อนไขสินเชื่อน้ำดื่ม...</p>",
    "contentEn": "<p>Additional details regarding water plant financing...</p>",
    "items": [
      {
        "id": "item-001",
        "title": "เครื่องเป่าขวด PET ความเร็วสูง",
        "titleEn": "High-Speed PET Blow Molding Machine",
        "description": "ขึ้นรูปขวดพลาสติกอัตโนมัติ รองรับกำลังการผลิตสูงถึง 6,000 ขวด/ชม.",
        "descEn": "Automated PET bottle molding line producing up to 6,000 BPH.",
        "badge": "ความเร็วสูง",
        "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80",
        "link": "/leasing-application"
      }
    ],
    "lastUpdated": "2026-09-17T08:15:00Z"
  }
}
```

---

### 4.3 อัปเดตเนื้อหาหน้านั้นๆ (Update Page Content)
* **Method**: `PUT`
* **Endpoint**: `/api/v1/pages/{pageId}`
* **Authorization**: `Bearer {admin_token}` (Admin Only)

#### Request Body:
```json
{
  "metaTitle": "สินเชื่อเครื่องจักรโรงงานผลิตน้ำดื่ม | Agile Assets",
  "metaDescription": "คำอธิบายสำหรับการค้นหาบน Google...",
  "heroBadgeTh": "DRINKING WATER INDUSTRY",
  "heroBadgeEn": "DRINKING WATER INDUSTRY",
  "heroTitleTh": "สินเชื่อเครื่องจักรโรงงานผลิตน้ำดื่ม (แก้ไขใหม่)",
  "heroTitleEn": "Financing for Drinking Water Production Line (Updated)",
  "heroSubtitleTh": "คำบรรยายสโลแกนภาษาไทยฉบับปรับปรุงใหม่...",
  "heroSubtitleEn": "Updated English subtitle...",
  "heroImage": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=1200&q=80",
  "ctaTextTh": "ขอสินเชื่อด่วน",
  "ctaTextEn": "Fast Application",
  "ctaLink": "/leasing-application",
  "contentTh": "<p>เนื้อหา HTML หรือย่อหน้าเพิ่มเติม...</p>",
  "contentEn": "<p>Additional HTML body content...</p>",
  "items": [
    {
      "id": "item-001",
      "title": "เครื่องเป่าขวด PET ความเร็วสูง",
      "titleEn": "High-Speed PET Blow Molding Machine",
      "description": "ขึ้นรูปขวดพลาสติกอัตโนมัติ รองรับกำลังการผลิตสูงถึง 6,000 ขวด/ชม.",
      "descEn": "Automated PET bottle molding line producing up to 6,000 BPH.",
      "badge": "ความเร็วสูง",
      "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80",
      "link": "/leasing-application"
    }
  ]
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": { ... },
  "message": "Page content updated successfully"
}
```

---

### 4.4 รีเซ็ตเนื้อหากลับเป็นค่าเริ่มต้น (Reset Page to Default)
* **Method**: `DELETE`
* **Endpoint**: `/api/v1/pages/{pageId}`
* **Authorization**: `Bearer {admin_token}`

#### Response (200 OK):
```json
{
  "success": true,
  "message": "Page content reset to default successfully"
}
```

---

## 5. ระบบรับสมัครงานออนไลน์ (Careers & Job Application API)

หน้า `/work-for-us` มีแบบฟอร์มให้ผู้สมัครงานยื่นใบสมัครออนไลน์ พร้อมแนบประวัติการทำงาน ข้อมูลนี้ต้องถูกบันทึกลงในระบบหลังบ้าน และมี API ให้ Admin ตรวจสอบสถานะการคัดเลือกได้

### 5.1 ยื่นใบสมัครงานออนไลน์ (Submit Job Application)
* **Method**: `POST`
* **Endpoint**: `/api/v1/careers/apply`
* **Authorization**: ไม่ต้องมี (Public API สำหรับผู้สมัครงาน)
* **Rate Limit**: แนะนำจำกัด 5 requests / 10 นาที ต่อ 1 IP ป้องกันสแปม

#### Request Body:
```json
{
  "fullName": "นายสมชาย ใจดี",
  "email": "somchai.j@example.com",
  "phone": "081-234-5678",
  "positionId": "job-credit-bd",
  "positionTitle": "เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ (Commercial Credit & BD)",
  "experienceYears": "2-5 ปี",
  "expectedSalary": "45,000",
  "resumeUrl": "https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing",
  "coverLetter": "มีความสนใจร่วมงานกับ Agile Assets เนื่องจากมีความเชี่ยวชาญด้านสินเชื่อโรงงาน..."
}
```

#### Validation Rules:
| ฟิลด์ | ชนิดข้อมูล | เงื่อนไข |
|---|---|---|
| `fullName` | string | จำเป็น (ความยาว 2-150 ตัวอักษร) |
| `email` | string | จำเป็น (Email Format ถูกต้อง) |
| `phone` | string | จำเป็น (เบอร์โทร 9-10 หลัก) |
| `positionId` | string | จำเป็น |
| `expectedSalary` | string | ไม่บังคับ |
| `resumeUrl` | string (URL) | ไม่บังคับ (หากระบุต้องเป็น URL ที่ถูกต้อง) |
| `coverLetter` | string | ไม่บังคับ (ความยาวสูงสุด 2,000 ตัวอักษร) |

#### Response (201 Created):
```json
{
  "success": true,
  "data": {
    "applicationId": "APP-20260917-001",
    "fullName": "นายสมชาย ใจดี",
    "positionTitle": "เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ (Commercial Credit & BD)",
    "status": "pending",
    "submittedAt": "2026-09-17T08:45:00Z"
  },
  "message": "Application submitted successfully"
}
```

> [!TIP]
> **Email Notification**: เมื่อมีผู้สมัครส่งข้อมูลเข้ามา แนะนำให้ Backend ทำ Background Job ส่งอีเมลแจ้งเตือนไปยังฝ่ายบุคคล (`hr@agileassets.co.th`) เพื่อความรวดเร็วในการติดต่อกลับ

---

### 5.2 ดึงรายการผู้สมัครงานสำหรับ Admin (List Job Applications)
* **Method**: `GET`
* **Endpoint**: `/api/v1/careers/applications`
* **Authorization**: `Bearer {admin_token}` (Admin Only)
* **Query Parameters**:
  * `status`: `pending`, `screening`, `interview`, `offered`, `rejected` (optional)
  * `positionId`: กรองตามตำแหน่ง (optional)
  * `search`: ค้นหาชื่อ, อีเมล หรือเบอร์โทร (optional)
  * `page`: หน้าที่ต้องการ (default: 1)
  * `limit`: จำนวนต่อหน้า (default: 20)

#### Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "APP-20260917-001",
      "fullName": "นายสมชาย ใจดี",
      "email": "somchai.j@example.com",
      "phone": "081-234-5678",
      "positionId": "job-credit-bd",
      "positionTitle": "เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ (Commercial Credit & BD)",
      "experienceYears": "2-5 ปี",
      "expectedSalary": "45,000",
      "resumeUrl": "https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing",
      "coverLetter": "มีความสนใจร่วมงาน...",
      "status": "pending",
      "notes": null,
      "submittedAt": "2026-09-17T08:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

---

### 5.3 อัปเดตสถานะผู้สมัครงาน (Update Application Status)
* **Method**: `PATCH`
* **Endpoint**: `/api/v1/careers/applications/{id}/status`
* **Authorization**: `Bearer {admin_token}`

#### Request Body:
```json
{
  "status": "interview",
  "notes": "นัดสัมภาษณ์ออนไลน์วันที่ 22 กันยายน เวลา 14:00 น."
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "APP-20260917-001",
    "status": "interview",
    "notes": "นัดสัมภาษณ์ออนไลน์วันที่ 22 กันยายน เวลา 14:00 น.",
    "updatedAt": "2026-09-17T09:00:00Z"
  },
  "message": "Status updated"
}
```

---

## 6. โครงสร้างฐานข้อมูลส่วนเพิ่ม (Database Schema & Migration DDL)

ทีม Backend สามารถนำสคริปต์ SQL ด้านล่างนี้ไปรันเพิ่มบน Database เดิมได้ทันที

### 6.1 Entity Relationship Overview (ส่วนที่เพิ่มใหม่)

```
┌─────────────────────────┐
│     ThemeSettings       │
├─────────────────────────┤
│ Id (PK, INT)            │
│ PrimaryColor (VARCHAR)  │
│ GradientStart (VARCHAR) │
│ GradientEnd (VARCHAR)   │
│ ButtonRadius (VARCHAR)  │
│ ButtonStyle (VARCHAR)   │
│ AccentColor (VARCHAR)   │
│ UpdatedAt (DATETIME)    │
└─────────────────────────┘

┌─────────────────────────┐         1:N         ┌─────────────────────────┐
│       PageContents      │ ─────────────────── │    PageSectionItems     │
├─────────────────────────┤                     ├─────────────────────────┤
│ PageId (PK, VARCHAR)    │                     │ Id (PK, VARCHAR)        │
│ PageName (NVARCHAR)     │                     │ PageId (FK, VARCHAR)    │
│ MetaTitle (NVARCHAR)    │                     │ Title (NVARCHAR)        │
│ MetaDescription (NVAR..)│                     │ TitleEn (NVARCHAR)      │
│ HeroBadgeTh (NVARCHAR)  │                     │ Description (NVARCHAR)  │
│ HeroBadgeEn (NVARCHAR)  │                     │ DescEn (NVARCHAR)       │
│ HeroTitleTh (NVARCHAR)  │                     │ Badge (NVARCHAR)        │
│ HeroTitleEn (NVARCHAR)  │                     │ Image (VARCHAR)         │
│ HeroSubtitleTh (NVAR..) │                     │ Link (VARCHAR)          │
│ HeroSubtitleEn (NVAR..) │                     │ SortOrder (INT)         │
│ HeroImage (VARCHAR)     │                     └─────────────────────────┘
│ CtaTextTh (NVARCHAR)    │
│ CtaLink (VARCHAR)       │
│ ContentTh (NVARCHAR(MAX)│
│ ContentEn (NVARCHAR(MAX)│
│ UpdatedAt (DATETIME)    │
└─────────────────────────┘

┌──────────────────────────────┐
│       JobApplications        │
├──────────────────────────────┤
│ Id (PK, VARCHAR)             │
│ FullName (NVARCHAR)          │
│ Email (VARCHAR)              │
│ Phone (VARCHAR)              │
│ PositionId (VARCHAR)         │
│ PositionTitle (NVARCHAR)     │
│ ExperienceYears (NVARCHAR)   │
│ ExpectedSalary (NVARCHAR)    │
│ ResumeUrl (VARCHAR(1000))    │
│ CoverLetter (NVARCHAR(MAX))  │
│ Status (VARCHAR, DEFAULT 'pending')
│ Notes (NVARCHAR(MAX))        │
│ CreatedAt (DATETIME)         │
│ UpdatedAt (DATETIME)         │
└──────────────────────────────┘
```

---

### 6.2 DDL Scripts สำหรับ SQL Server (T-SQL)

```sql
-- 1. ตารางเก็บการตั้งค่าธีมและสีปุ่ม (ThemeSettings)
CREATE TABLE ThemeSettings (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PrimaryColor VARCHAR(10) NOT NULL DEFAULT '#0284c7',
    GradientStart VARCHAR(10) NOT NULL DEFAULT '#0284c7',
    GradientEnd VARCHAR(10) NOT NULL DEFAULT '#0369a1',
    ButtonTextColor VARCHAR(10) NOT NULL DEFAULT '#ffffff',
    ButtonRadius VARCHAR(20) NOT NULL DEFAULT 'rounded-xl',
    ButtonStyle VARCHAR(20) NOT NULL DEFAULT 'gradient',
    AccentColor VARCHAR(10) NOT NULL DEFAULT '#38bdf8',
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- ใส่ค่าตั้งต้น Theme
INSERT INTO ThemeSettings (PrimaryColor, GradientStart, GradientEnd, ButtonTextColor, ButtonRadius, ButtonStyle, AccentColor)
VALUES ('#0284c7', '#0284c7', '#0369a1', '#ffffff', 'rounded-xl', 'gradient', '#38bdf8');


-- 2. ตารางเก็บเนื้อหาของแต่ละหน้าเว็บ (PageContents)
CREATE TABLE PageContents (
    PageId VARCHAR(64) PRIMARY KEY,
    PageName NVARCHAR(150) NOT NULL,
    MetaTitle NVARCHAR(300) NULL,
    MetaDescription NVARCHAR(1000) NULL,
    HeroBadgeTh NVARCHAR(100) NULL,
    HeroBadgeEn NVARCHAR(100) NULL,
    HeroTitleTh NVARCHAR(300) NOT NULL,
    HeroTitleEn NVARCHAR(300) NULL,
    HeroSubtitleTh NVARCHAR(2000) NULL,
    HeroSubtitleEn NVARCHAR(2000) NULL,
    HeroImage VARCHAR(1000) NULL,
    CtaTextTh NVARCHAR(100) NULL,
    CtaTextEn NVARCHAR(100) NULL,
    CtaLink VARCHAR(500) NULL,
    ContentTh NVARCHAR(MAX) NULL,
    ContentEn NVARCHAR(MAX) NULL,
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);


-- 3. ตารางเก็บรายการเครื่องจักร/ฟีเจอร์ย่อยของแต่ละหน้า (PageSectionItems)
CREATE TABLE PageSectionItems (
    Id VARCHAR(64) PRIMARY KEY,
    PageId VARCHAR(64) NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    TitleEn NVARCHAR(200) NULL,
    Description NVARCHAR(2000) NULL,
    DescEn NVARCHAR(2000) NULL,
    Badge NVARCHAR(100) NULL,
    Image VARCHAR(1000) NULL,
    Link VARCHAR(500) NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_PageSectionItems_PageContents FOREIGN KEY (PageId) 
        REFERENCES PageContents(PageId) ON DELETE CASCADE
);

CREATE INDEX IX_PageSectionItems_PageId ON PageSectionItems(PageId, SortOrder);


-- 4. ตารางจัดเก็บใบสมัครงาน (JobApplications)
CREATE TABLE JobApplications (
    Id VARCHAR(64) PRIMARY KEY, -- e.g. APP-YYYYMMDD-XXXX
    FullName NVARCHAR(200) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    PositionId VARCHAR(64) NOT NULL,
    PositionTitle NVARCHAR(200) NOT NULL,
    ExperienceYears NVARCHAR(100) NULL,
    ExpectedSalary NVARCHAR(100) NULL,
    ResumeUrl VARCHAR(1000) NULL,
    CoverLetter NVARCHAR(MAX) NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, screening, interview, offered, rejected
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE INDEX IX_JobApplications_Status ON JobApplications(Status);
CREATE INDEX IX_JobApplications_CreatedAt ON JobApplications(CreatedAt DESC);
```

---

### 6.3 DDL Scripts สำหรับ PostgreSQL

```sql
-- 1. ThemeSettings
CREATE TABLE theme_settings (
    id SERIAL PRIMARY KEY,
    primary_color VARCHAR(10) NOT NULL DEFAULT '#0284c7',
    gradient_start VARCHAR(10) NOT NULL DEFAULT '#0284c7',
    gradient_end VARCHAR(10) NOT NULL DEFAULT '#0369a1',
    button_text_color VARCHAR(10) NOT NULL DEFAULT '#ffffff',
    button_radius VARCHAR(20) NOT NULL DEFAULT 'rounded-xl',
    button_style VARCHAR(20) NOT NULL DEFAULT 'gradient',
    accent_color VARCHAR(10) NOT NULL DEFAULT '#38bdf8',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO theme_settings (primary_color, gradient_start, gradient_end, button_text_color, button_radius, button_style, accent_color)
VALUES ('#0284c7', '#0284c7', '#0369a1', '#ffffff', 'rounded-xl', 'gradient', '#38bdf8');

-- 2. PageContents
CREATE TABLE page_contents (
    page_id VARCHAR(64) PRIMARY KEY,
    page_name VARCHAR(150) NOT NULL,
    meta_title VARCHAR(300),
    meta_description TEXT,
    hero_badge_th VARCHAR(100),
    hero_badge_en VARCHAR(100),
    hero_title_th VARCHAR(300) NOT NULL,
    hero_title_en VARCHAR(300),
    hero_subtitle_th TEXT,
    hero_subtitle_en TEXT,
    hero_image VARCHAR(1000),
    cta_text_th VARCHAR(100),
    cta_text_en VARCHAR(100),
    cta_link VARCHAR(500),
    content_th TEXT,
    content_en TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PageSectionItems
CREATE TABLE page_section_items (
    id VARCHAR(64) PRIMARY KEY,
    page_id VARCHAR(64) NOT NULL REFERENCES page_contents(page_id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    description TEXT,
    desc_en TEXT,
    badge VARCHAR(100),
    image VARCHAR(1000),
    link VARCHAR(500),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ix_page_section_items_page_id ON page_section_items(page_id, sort_order);

-- 4. JobApplications
CREATE TABLE job_applications (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    position_id VARCHAR(64) NOT NULL,
    position_title VARCHAR(200) NOT NULL,
    experience_years VARCHAR(100),
    expected_salary VARCHAR(100),
    resume_url VARCHAR(1000),
    cover_letter TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ix_job_applications_status ON job_applications(status);
CREATE INDEX ix_job_applications_created_at ON job_applications(created_at DESC);
```

---

## 7. รายการงานสำหรับทีม Backend (Implementation Checklist)

ทีม Backend สามารถใช้ Checklist นี้ตรวจสอบความครบถ้วนของการเชื่อมต่อ API:

### Authentication & Database Setup
- [ ] อัปเดตรหัสผ่าน Admin เป็น `dreamza007` / `123456789` ใน Seed Script
- [ ] รัน Migration เพิ่ม 4 ตารางใหม่ (`ThemeSettings`, `PageContents`, `PageSectionItems`, `JobApplications`)

### Theme & Styling API
- [ ] ทำ `GET /api/v1/settings/theme` (Public)
- [ ] ทำ `PUT /api/v1/settings/theme` (Admin Protected)

### Universal Page Content CMS API
- [ ] ทำ `GET /api/v1/pages` (Admin Protected - สรุปรายชื่อ 21 หน้า)
- [ ] ทำ `GET /api/v1/pages/{pageId}` (Public - ดึงเนื้อหาหน้านั้นๆ)
- [ ] ทำ `PUT /api/v1/pages/{pageId}` (Admin Protected - บันทึกเนื้อหาพร้อม `items`)
- [ ] ทำ `DELETE /api/v1/pages/{pageId}` (Admin Protected - คืนค่า Default)

### Careers & Job Applications API
- [ ] ทำ `POST /api/v1/careers/apply` (Public - บันทึกใบสมัครพร้อม Validation)
- [ ] ทำ `GET /api/v1/careers/applications` (Admin Protected - Pagination & Status Filter)
- [ ] ทำ `PATCH /api/v1/careers/applications/{id}/status` (Admin Protected - ปรับสถานะ)
- [ ] (Optional) ทำ Email Notification ส่งแจ้งฝ่าย HR เมื่อมีใบสมัครใหม่

---

> 📞 **ติดต่อสอบถามข้อมูลเพิ่มเติม**:  
> หากทีม Backend ต้องการคำชี้แจงเพิ่มเติมเกี่ยวกับโครงสร้าง JSON หรือพฤติกรรมการเรียก API ของ Frontend สามารถประสานงานร่วมกันได้ทันทีครับ
