# 📋 Backend API Specification — Agile Assets Website

> **เอกสารฉบับนี้สำหรับ**: ทีม Backend Developer  
> **โปรเจกต์**: Agile Assets Corporate Website (agileassets.co.th)  
> **Frontend Stack**: React 19 + TypeScript + Vite + TailwindCSS 4  
> **วันที่**: 17 กันยายน 2569  
> **เวอร์ชัน**: 1.0

---

## 1. ภาพรวมระบบ (System Overview)

### สถานะปัจจุบัน
ตอนนี้ Frontend **ทำงานแบบ Standalone** ไม่มี Backend — ข้อมูลทั้งหมดเก็บใน `localStorage` ของ browser ซึ่งมีปัญหา:
- ข้อมูลหายเมื่อลบ cache หรือเปลี่ยนเครื่อง
- Admin หลายคนไม่เห็นข้อมูลร่วมกัน
- ฟอร์มลูกค้า (สมัครสินเชื่อ/ติดต่อ) ไม่ได้ส่งข้อมูลจริง
- Authentication ไม่ปลอดภัย (hardcoded credentials)

### สถาปัตยกรรมเป้าหมาย

```
┌─────────────┐     HTTPS/JSON      ┌──────────────────┐      ┌────────────┐
│   Frontend   │ ◄────────────────► │   Backend         │ ◄──► │  Database  │
│  React SPA   │                    │  ASP.NET Core     │      │ SQL Server │
│  (Vite)      │                    │  Web API (C#)     │      │    / PG    │
└─────────────┘                    │  + Swagger UI     │      └────────────┘
                                   │                   │      ┌────────────┐
                                   │                   │ ◄──► │  Storage   │
                                   └──────────────────┘      │ (Azure/S3) │
                                                              └────────────┘
```

### Base URL
```
Production:  https://api.agileassets.co.th/api/v1
Development: http://localhost:5000/api/v1  (หรือ https://localhost:5001/api/v1)
Swagger UI:  http://localhost:5000/swagger
```

### Response Format (ทุก endpoint)
```json
// สำเร็จ
{
  "success": true,
  "data": { ... },
  "message": "Operation completed"
}

// ผิดพลาด
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [...]
  }
}
```

### Pagination Format (สำหรับ list endpoints)
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 54,
    "totalPages": 3
  }
}
```

---

## 2. Authentication API

> ⚠️ **สำคัญมาก**: ตอนนี้ username/password ถูก hardcode ไว้ใน source code — ต้องย้ายมาเก็บใน database โดยเร็ว

### 2.1 Login

```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Username หรือ Password ไม่ถูกต้อง"
  }
}
```

### 2.2 Refresh Token

```
POST /api/v1/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "string (required)"
}
```

### 2.3 Get Current User

```
GET /api/v1/auth/me
Authorization: Bearer <accessToken>
```

### 2.4 Logout

```
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
```

### ข้อกำหนด Auth
| รายการ | ค่า |
|--------|-----|
| Password Hashing | bcrypt (salt rounds ≥ 10) |
| Token Type | JWT (jsonwebtoken) |
| Access Token Expiry | 24 ชั่วโมง |
| Refresh Token Expiry | 7 วัน |
| Role ที่รองรับ | `admin` (อนาคตอาจเพิ่ม `editor`, `viewer`) |

---

## 3. CMS API — Content Management

> ทุก endpoint ที่เป็น `POST`, `PUT`, `DELETE` ต้องมี **Authorization header** (admin only)  
> ทุก endpoint ที่เป็น `GET` เปิดให้ public เข้าถึงได้ (สำหรับแสดงผลบนเว็บ)

---

### 3.1 Banner Settings (แบนเนอร์หน้าแรก)

#### GET /api/v1/cms/banner
ดึงค่า Banner ปัจจุบัน

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "headline": "Growth – Good Capital",
    "subheadline": "ทุนเติบโต - ดี - งาม — Agile Assets ผู้ให้บริการสินเชื่อ...",
    "ctaText": "Financing with Us",
    "ctaLink": "#financing",
    "updatedAt": "2026-09-17T05:00:00Z"
  }
}
```

#### PUT /api/v1/cms/banner 🔒
แก้ไข Banner (admin only)

**Request Body:**
```json
{
  "headline": "string (required, max 100)",
  "subheadline": "string (required, max 500)",
  "ctaText": "string (required, max 50)",
  "ctaLink": "string (required, URL format)"
}
```

---

### 3.2 Interest Rates (อัตราดอกเบี้ยสินเชื่อ)

#### GET /api/v1/cms/rates
ดึงรายการอัตราดอกเบี้ยทั้งหมด

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `featured` | boolean | กรอง featured only |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "rate-001",
      "product": "Blow Moulding Machine (เครื่องเป่าขวดพลาสติก)",
      "rate": 8.9,
      "term": "12–60 months",
      "featured": true,
      "description": "สินเชื่อเช่าซื้อเครื่องเป่าขวด PET อัตโนมัติ..."
    }
  ]
}
```

#### POST /api/v1/cms/rates 🔒
เพิ่มอัตราดอกเบี้ยใหม่

**Request Body:**
```json
{
  "product": "string (required, max 200)",
  "rate": "number (required, 0-100)",
  "term": "string (required, max 100)",
  "featured": "boolean (default: false)",
  "description": "string (required, max 1000)"
}
```

#### PUT /api/v1/cms/rates/:id 🔒
แก้ไขอัตราดอกเบี้ย

#### DELETE /api/v1/cms/rates/:id 🔒
ลบอัตราดอกเบี้ย

---

### 3.3 News & Articles (ข่าวสาร/บทความ)

#### GET /api/v1/cms/news
ดึงรายการข่าว (รองรับ pagination)

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | หน้าที่ต้องการ |
| `limit` | number | 20 | จำนวนต่อหน้า (max 100) |
| `category` | string | - | กรองตาม category (`NEWS`, `FINANCE`, `ACTIVITY`) |
| `pinned` | boolean | - | กรองข่าวปักหมุด |
| `search` | string | - | ค้นหาจาก title/excerpt |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "news-hire-purchase-vs-leasing",
      "title": "เช่าซื้อ กับลีสซิ่งต่างกันอย่างไร",
      "title_en": "Difference Between Hire Purchase and Financial Leasing",
      "excerpt": "เจาะลึกความแตกต่างระหว่าง...",
      "excerpt_en": "In-depth comparison between...",
      "content": "<p>ในการจัดหาเครื่องจักร...</p>",
      "content_en": "<p>When acquiring machinery...</p>",
      "date": "2026-08-20",
      "pinned": true,
      "category": "FINANCE",
      "image": "https://...",
      "createdAt": "2026-08-20T10:00:00Z",
      "updatedAt": "2026-08-20T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 4,
    "totalPages": 1
  }
}
```

#### GET /api/v1/cms/news/:id
ดึงรายละเอียดข่าวตาม ID

#### POST /api/v1/cms/news 🔒
สร้างข่าวใหม่

**Request Body:**
```json
{
  "title": "string (required, max 300)",
  "title_en": "string (optional, max 300)",
  "excerpt": "string (required, max 1000)",
  "excerpt_en": "string (optional, max 1000)",
  "content": "string (required, HTML content)",
  "content_en": "string (optional, HTML content)",
  "date": "string (required, format: YYYY-MM-DD)",
  "pinned": "boolean (default: false)",
  "category": "string (required, enum: NEWS | FINANCE | ACTIVITY)",
  "image": "string (optional, URL or uploaded file path)"
}
```

#### PUT /api/v1/cms/news/:id 🔒
แก้ไขข่าว

#### DELETE /api/v1/cms/news/:id 🔒
ลบข่าว

---

### 3.4 Used Machinery / Assets (เครื่องจักรมือสอง/รอขาย)

#### GET /api/v1/cms/assets
ดึงรายการสินทรัพย์

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | หน้าที่ต้องการ |
| `limit` | number | 20 | จำนวนต่อหน้า |
| `status` | string | - | กรองตาม status (`available`, `reserved`, `sold`) |
| `category` | string | - | กรองตามหมวดหมู่ |
| `search` | string | - | ค้นหาจาก title/description |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "asset-air-compressor-p415",
      "title": "Air Compressor",
      "title_en": "Air Compressor",
      "category": "Doosan Model P415",
      "price": "เปิดรับประมูล (Auction)",
      "year": "2024",
      "condition": "เครื่องจักรแนะนำ ตรวจเช็กมาตรฐานพร้อมใช้งานทันที",
      "description": "Capacity: 400 Cfm | Controller Model: AUJW04CT...",
      "image": "https://...",
      "status": "available",
      "createdAt": "2026-09-01T00:00:00Z",
      "updatedAt": "2026-09-01T00:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### POST /api/v1/cms/assets 🔒
เพิ่มสินทรัพย์ใหม่

**Request Body:**
```json
{
  "title": "string (required, max 200)",
  "title_en": "string (optional, max 200)",
  "category": "string (required, max 200)",
  "price": "string (required, max 100)",
  "year": "string (required, 4 digits)",
  "condition": "string (required, max 500)",
  "description": "string (required, max 2000)",
  "image": "string (optional, URL or uploaded file path)",
  "status": "string (required, enum: available | reserved | sold)"
}
```

#### PUT /api/v1/cms/assets/:id 🔒
แก้ไขสินทรัพย์

#### DELETE /api/v1/cms/assets/:id 🔒
ลบสินทรัพย์

---

### 3.5 FAQ (คำถามที่พบบ่อย)

#### GET /api/v1/cms/faqs
ดึงรายการ FAQ ทั้งหมด

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | กรองตาม category |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "faq-1",
      "question": "สินเชื่อเครื่องจักรคืออะไร",
      "question_en": "What is Machinery Financing?",
      "answer": "ลูกค้าสามารถซื้อเครื่องจักร...",
      "answer_en": "Clients can acquire industrial machinery...",
      "category": "ข้อมูลทั่วไป",
      "sortOrder": 1
    }
  ]
}
```

#### POST /api/v1/cms/faqs 🔒
เพิ่ม FAQ ใหม่

**Request Body:**
```json
{
  "question": "string (required, max 500)",
  "question_en": "string (optional, max 500)",
  "answer": "string (required, max 5000)",
  "answer_en": "string (optional, max 5000)",
  "category": "string (required, max 100)",
  "sortOrder": "number (optional, default: 0)"
}
```

#### PUT /api/v1/cms/faqs/:id 🔒
แก้ไข FAQ

#### DELETE /api/v1/cms/faqs/:id 🔒
ลบ FAQ

---

### 3.6 Company Info (ข้อมูลบริษัท)

#### GET /api/v1/cms/company
ดึงข้อมูลบริษัท

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Agile Assets Co., Ltd.",
    "phone": "02-0009392",
    "email": "rattinun@agileassets.co.th",
    "address": "เลขที่ 20 หมู่ 1 ถ.สุขุมวิท ต.บางเมืองใหม่ อ.เมือง จ.สมุทรปราการ 10270",
    "description": "ผู้ให้บริการสินเชื่อเช่าซื้อเครื่องจักรอุตสาหกรรม...",
    "lineId": "@884ukedb",
    "facebook": "https://facebook.com/agileassetsth",
    "mapUrl": "https://maps.google.com",
    "operatingHours": "จันทร์ - ศุกร์: 08:30 - 17:30 น.",
    "updatedAt": "2026-09-17T05:00:00Z"
  }
}
```

#### PUT /api/v1/cms/company 🔒
แก้ไขข้อมูลบริษัท (admin only)

**Request Body:**
```json
{
  "name": "string (required, max 200)",
  "phone": "string (required, max 50)",
  "email": "string (required, email format)",
  "address": "string (required, max 500)",
  "description": "string (optional, max 2000)",
  "lineId": "string (optional, max 50)",
  "facebook": "string (optional, URL format)",
  "mapUrl": "string (optional, URL format)",
  "operatingHours": "string (optional, max 200)"
}
```

---

### 3.7 Impact Stats (สถิติผลงาน)

#### GET /api/v1/cms/stats
ดึงสถิติผลงาน

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "factoriesServed": "40+",
    "totalCreditValueMB": "400+",
    "totalContractsCount": "50+",
    "customerSatisfactionPct": "98%",
    "updatedAt": "2026-09-17T05:00:00Z"
  }
}
```

#### PUT /api/v1/cms/stats 🔒
แก้ไขสถิติ (admin only)

**Request Body:**
```json
{
  "factoriesServed": "string (required, max 20)",
  "totalCreditValueMB": "string (required, max 20)",
  "totalContractsCount": "string (required, max 20)",
  "customerSatisfactionPct": "string (required, max 20)"
}
```

---

### 3.8 Custom Fields (ฟิลด์เพิ่มเติม / Campaigns)

#### GET /api/v1/cms/custom-fields
ดึง custom fields ทั้งหมด

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `campaign` | string | กรองตาม campaign name |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cf-001",
      "label": "Spring Promotional Rate",
      "type": "number",
      "value": "4.49",
      "campaign": "Spring 2026 Campaign"
    }
  ]
}
```

#### POST /api/v1/cms/custom-fields 🔒

**Request Body:**
```json
{
  "label": "string (required, max 200)",
  "type": "string (required, enum: text | number | date | boolean | url)",
  "value": "string (required, max 1000)",
  "campaign": "string (required, max 200)"
}
```

#### PUT /api/v1/cms/custom-fields/:id 🔒
#### DELETE /api/v1/cms/custom-fields/:id 🔒

---

## 4. Form Submission API (สำหรับลูกค้ากรอกฟอร์ม)

> ⚠️ Endpoints เหล่านี้เปิด **public** (ไม่ต้อง auth) แต่ต้องมี **rate limiting** เพื่อป้องกัน spam

---

### 4.1 Contact Form (ฟอร์มติดต่อเรา)

#### POST /api/v1/forms/contact
ลูกค้าส่งข้อความติดต่อ

**Request Body:**
```json
{
  "firstName": "string (required, max 100)",
  "lastName": "string (required, max 100)",
  "email": "string (required, email format)",
  "subject": "string (required, max 300)",
  "message": "string (required, max 5000)"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 15,
    "message": "ส่งข้อความเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง"
  }
}
```

**Side Effects:**
- บันทึกลง database (ตาราง `contact_submissions`)
- ส่ง email แจ้ง admin (ถ้ามี Email Service)

---

### 4.2 Leasing Application (ใบสมัครสินเชื่อ)

#### POST /api/v1/forms/leasing
ลูกค้ายื่นใบสมัครสินเชื่อ

**Request Body:**
```json
{
  "applicantType": "string (required, enum: corporate | individual)",
  "firstName": "string (required, max 100)",
  "lastName": "string (required, max 100)",
  "companyName": "string (optional, max 200, required if applicantType = corporate)",
  "businessType": "string (optional, max 200)",
  "machineInterest": "string (required, max 300)",
  "address1": "string (required, max 500)",
  "address2": "string (optional, max 500)",
  "district": "string (required, max 100)",
  "province": "string (required, max 100)",
  "postalCode": "string (required, 5 digits)",
  "phone": "string (required, max 20)",
  "email": "string (required, email format)",
  "purpose": {
    "new": "boolean",
    "replace": "boolean",
    "other": "boolean"
  },
  "otherDetails": "string (optional, max 1000)",
  "acceptConsent": "boolean (required, must be true)"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "applicationNumber": "AA-2026-0042",
    "status": "pending",
    "message": "ส่งใบสมัครเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง"
  }
}
```

**Side Effects:**
- บันทึกลง database (ตาราง `leasing_applications`)
- สร้างเลข Application Number อัตโนมัติ (format: `AA-YYYY-XXXX`)
- ส่ง email แจ้ง admin
- ส่ง email ยืนยันให้ลูกค้า (optional)

---

### 4.3 NC-NDA Agreement (สัญญารักษาความลับ)

#### POST /api/v1/forms/nc-nda
ลูกค้าลงนามสัญญา NC-NDA (Non-Circumvention & Non-Disclosure Agreement)

**Request Body:** `multipart/form-data`
```json
{
  "fullName": "string (required, max 200)",
  "idCard": "string (required, 13 digits, เลขบัตรประชาชน)",
  "email": "string (required, email format)",
  "company": "string (optional, max 200)",
  "phone": "string (optional, max 20)",
  "agreed": "boolean (required, must be true)",
  "signatureImage": "File (required, ภาพลายเซ็นจาก canvas, PNG format)"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 8,
    "referenceNumber": "NDA-2026-384729",
    "fullName": "สมชาย ใจดี",
    "idCard": "1 1234 56789 01 2",
    "email": "somchai@example.com",
    "timestamp": "2026-09-17T12:30:00Z",
    "message": "บันทึกและส่งข้อมูลสัญญารักษาความลับเรียบร้อยแล้ว"
  }
}
```

**Side Effects:**
- บันทึกลง database (ตาราง `nda_submissions`)
- เก็บภาพลายเซ็นลง Storage
- สร้าง Reference Number อัตโนมัติ (format: `NDA-YYYY-XXXXXX`)
- ส่ง email สำเนาสัญญาให้ลูกค้า (optional)
- ส่ง email แจ้ง admin

---

### 4.4 Admin — ดูรายการที่ลูกค้าส่งมา

#### GET /api/v1/admin/contacts 🔒
ดูรายการข้อความติดต่อ

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | หน้า |
| `limit` | number | 20 | จำนวนต่อหน้า |
| `status` | string | - | `unread`, `read`, `replied` |

#### GET /api/v1/admin/applications 🔒
ดูรายการใบสมัครสินเชื่อ

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | หน้า |
| `limit` | number | 20 | จำนวนต่อหน้า |
| `status` | string | - | `pending`, `reviewing`, `approved`, `rejected` |
| `search` | string | - | ค้นหาจาก ชื่อ/บริษัท/เลขที่ |

#### PUT /api/v1/admin/applications/:id/status 🔒
อัปเดตสถานะใบสมัคร

**Request Body:**
```json
{
  "status": "string (required, enum: pending | reviewing | approved | rejected)",
  "note": "string (optional, max 1000)"
}
```

#### GET /api/v1/admin/nda-submissions 🔒
ดูรายการสัญญา NC-NDA ที่ลูกค้าลงนาม

**Query Params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | หน้า |
| `limit` | number | 20 | จำนวนต่อหน้า |
| `search` | string | - | ค้นหาจาก ชื่อ/บริษัท/เลขอ้างอิง |

#### GET /api/v1/admin/nda-submissions/:id 🔒
ดูรายละเอียด NC-NDA submission รวมถึง URL ภาพลายเซ็น

---

## 5. File Upload API

#### POST /api/v1/upload/image 🔒
อัปโหลดภาพ

**Request:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `file` | File | ไฟล์ภาพ (JPEG, PNG, WebP) |
| `folder` | string | โฟลเดอร์ปลายทาง (`news`, `assets`, `banner`) |

**Constraints:**
- ขนาดไฟล์สูงสุด: **5 MB**
- Format: JPEG, PNG, WebP เท่านั้น
- ระบบควรบีบอัดภาพอัตโนมัติ (ความกว้างสูงสุด 1200px)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "url": "https://api.agileassets.co.th/uploads/news/image-20260917-abc123.webp",
    "filename": "image-20260917-abc123.webp",
    "size": 245000,
    "width": 1200,
    "height": 800
  }
}
```

#### DELETE /api/v1/upload/:filename 🔒
ลบไฟล์ภาพ

---

## 6. Database Schema

### ตาราง `users`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| username | VARCHAR(50) | UNIQUE, NOT NULL | |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'admin' | `admin` |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `banner_settings`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| headline | VARCHAR(100) | NOT NULL | |
| subheadline | VARCHAR(500) | NOT NULL | |
| cta_text | VARCHAR(50) | NOT NULL | |
| cta_link | VARCHAR(300) | NOT NULL | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `interest_rates`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| product | VARCHAR(200) | NOT NULL | ชื่อผลิตภัณฑ์สินเชื่อ |
| rate | DECIMAL(5,2) | NOT NULL | อัตราดอกเบี้ย (%) |
| term | VARCHAR(100) | NOT NULL | ระยะเวลาผ่อน |
| featured | BOOLEAN | DEFAULT FALSE | แสดงเด่น |
| description | TEXT | NOT NULL | รายละเอียด |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `news`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| title | VARCHAR(300) | NOT NULL | หัวข้อ (ภาษาไทย) |
| title_en | VARCHAR(300) | | หัวข้อ (English) |
| excerpt | TEXT | NOT NULL | ข้อความย่อ |
| excerpt_en | TEXT | | ข้อความย่อ (EN) |
| content | TEXT | NOT NULL | เนื้อหา HTML |
| content_en | TEXT | | เนื้อหา HTML (EN) |
| date | DATE | NOT NULL | วันที่เผยแพร่ |
| pinned | BOOLEAN | DEFAULT FALSE | ปักหมุดไหม |
| category | VARCHAR(50) | NOT NULL | `NEWS`, `FINANCE`, `ACTIVITY` |
| image | VARCHAR(500) | | URL ภาพปก |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `used_machinery`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| title | VARCHAR(200) | NOT NULL | ชื่อเครื่องจักร |
| title_en | VARCHAR(200) | | ชื่อ (EN) |
| category | VARCHAR(200) | NOT NULL | หมวดหมู่/รุ่น |
| price | VARCHAR(100) | NOT NULL | ราคาหรือสถานะ |
| year | CHAR(4) | NOT NULL | ปีผลิต |
| condition | VARCHAR(500) | NOT NULL | สภาพเครื่อง |
| description | TEXT | NOT NULL | รายละเอียด |
| image | VARCHAR(500) | | URL ภาพ |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'available' | `available`, `reserved`, `sold` |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `faqs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| question | VARCHAR(500) | NOT NULL | คำถาม (TH) |
| question_en | VARCHAR(500) | | คำถาม (EN) |
| answer | TEXT | NOT NULL | คำตอบ (TH) |
| answer_en | TEXT | | คำตอบ (EN) |
| category | VARCHAR(100) | NOT NULL | หมวดหมู่ |
| sort_order | INT | DEFAULT 0 | ลำดับการแสดง |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `company_info`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | (มีแค่ 1 row) |
| name | VARCHAR(200) | NOT NULL | |
| phone | VARCHAR(50) | NOT NULL | |
| email | VARCHAR(100) | NOT NULL | |
| address | VARCHAR(500) | NOT NULL | |
| description | TEXT | | |
| line_id | VARCHAR(50) | | |
| facebook | VARCHAR(300) | | |
| map_url | VARCHAR(500) | | |
| operating_hours | VARCHAR(200) | | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `impact_stats`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | (มีแค่ 1 row) |
| factories_served | VARCHAR(20) | NOT NULL | เช่น "40+" |
| total_credit_value_mb | VARCHAR(20) | NOT NULL | เช่น "400+" |
| total_contracts_count | VARCHAR(20) | NOT NULL | เช่น "50+" |
| customer_satisfaction_pct | VARCHAR(20) | NOT NULL | เช่น "98%" |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `custom_fields`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| label | VARCHAR(200) | NOT NULL | |
| type | VARCHAR(20) | NOT NULL | `text`, `number`, `date`, `boolean`, `url` |
| value | VARCHAR(1000) | NOT NULL | |
| campaign | VARCHAR(200) | NOT NULL | |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `contact_submissions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| first_name | VARCHAR(100) | NOT NULL | |
| last_name | VARCHAR(100) | NOT NULL | |
| email | VARCHAR(200) | NOT NULL | |
| subject | VARCHAR(300) | NOT NULL | |
| message | TEXT | NOT NULL | |
| status | VARCHAR(20) | DEFAULT 'unread' | `unread`, `read`, `replied` |
| created_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `leasing_applications`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| application_number | VARCHAR(20) | UNIQUE, NOT NULL | `AA-2026-0042` |
| applicant_type | VARCHAR(20) | NOT NULL | `corporate`, `individual` |
| first_name | VARCHAR(100) | NOT NULL | |
| last_name | VARCHAR(100) | NOT NULL | |
| company_name | VARCHAR(200) | | |
| business_type | VARCHAR(200) | | |
| machine_interest | VARCHAR(300) | NOT NULL | |
| address1 | VARCHAR(500) | NOT NULL | |
| address2 | VARCHAR(500) | | |
| district | VARCHAR(100) | NOT NULL | |
| province | VARCHAR(100) | NOT NULL | |
| postal_code | CHAR(5) | NOT NULL | |
| phone | VARCHAR(20) | NOT NULL | |
| email | VARCHAR(200) | NOT NULL | |
| purpose_new | BOOLEAN | DEFAULT FALSE | |
| purpose_replace | BOOLEAN | DEFAULT FALSE | |
| purpose_other | BOOLEAN | DEFAULT FALSE | |
| other_details | TEXT | | |
| status | VARCHAR(20) | DEFAULT 'pending' | `pending`, `reviewing`, `approved`, `rejected` |
| admin_note | TEXT | | บันทึกของ admin |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `nda_submissions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| reference_number | VARCHAR(20) | UNIQUE, NOT NULL | `NDA-2026-384729` |
| full_name | VARCHAR(200) | NOT NULL | ชื่อ-สกุล |
| id_card | CHAR(13) | NOT NULL | เลขบัตรประชาชน (เก็บเฉพาะตัวเลข) |
| email | VARCHAR(200) | NOT NULL | |
| company | VARCHAR(200) | | ชื่อบริษัท (optional) |
| phone | VARCHAR(20) | | |
| agreed | BOOLEAN | NOT NULL, DEFAULT TRUE | ยอมรับข้อตกลง |
| signature_url | VARCHAR(500) | NOT NULL | URL ภาพลายเซ็น |
| created_at | TIMESTAMP | DEFAULT NOW() | |

### ตาราง `activity_logs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | |
| user_id | INT | FOREIGN KEY → users.id | admin ที่ทำ |
| action | VARCHAR(50) | NOT NULL | `CREATE`, `UPDATE`, `DELETE` |
| entity | VARCHAR(50) | NOT NULL | `news`, `assets`, `faqs`, ... |
| entity_id | VARCHAR(50) | | ID ของ record ที่โดน |
| details | JSONB | | รายละเอียดเพิ่มเติม |
| created_at | TIMESTAMP | DEFAULT NOW() | |

---

## 7. Security & Infrastructure Requirements

### CORS
```
Allowed Origins:
  - https://agileassets.co.th
  - https://www.agileassets.co.th
  - http://localhost:5173 (dev only)

Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
Allowed Headers: Content-Type, Authorization
```

### Rate Limiting
| Endpoint Group | Limit |
|----------------|-------|
| Auth endpoints | 5 requests / minute / IP |
| Public form submissions | 3 requests / minute / IP |
| CMS GET (public) | 60 requests / minute / IP |
| CMS CRUD (admin) | 30 requests / minute / IP |
| File upload | 10 requests / minute / user |

### Input Validation
- Validate ทุก field ก่อน process (ใช้ Zod หรือ Joi)
- Sanitize HTML content จาก Rich Text Editor (ป้องกัน XSS)
- Validate file type จาก magic bytes (ไม่ใช่แค่ extension)

### Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AgileAssets;User Id=sa;Password=xxx;TrustServerCertificate=true"
  },
  "Jwt": {
    "Secret": "<random-256-bit-secret>",
    "RefreshSecret": "<random-256-bit-secret>",
    "Issuer": "AgileAssetsAPI",
    "Audience": "AgileAssetsFrontend",
    "AccessTokenExpiryHours": 24,
    "RefreshTokenExpiryDays": 7
  },
  "FileUpload": {
    "UploadDir": "wwwroot/uploads",
    "MaxFileSizeBytes": 5242880,
    "AllowedExtensions": [".jpg", ".jpeg", ".png", ".webp"]
  },
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "SenderEmail": "noreply@agileassets.co.th",
    "SenderPassword": "<app-password>",
    "AdminNotificationEmail": "rattinun@agileassets.co.th"
  },
  "Cors": {
    "AllowedOrigins": [
      "https://agileassets.co.th",
      "https://www.agileassets.co.th",
      "http://localhost:5173"
    ]
  }
}
```

---

## 8. สรุปจำนวน Endpoints ทั้งหมด

| Module | GET | POST | PUT | DELETE | รวม |
|--------|-----|------|-----|--------|-----|
| Auth | 1 | 3 | - | - | **4** |
| Banner | 1 | - | 1 | - | **2** |
| Rates | 1 | 1 | 1 | 1 | **4** |
| News | 2 | 1 | 1 | 1 | **5** |
| Assets | 2 | 1 | 1 | 1 | **5** |
| FAQs | 1 | 1 | 1 | 1 | **4** |
| Company Info | 1 | - | 1 | - | **2** |
| Stats | 1 | - | 1 | - | **2** |
| Custom Fields | 1 | 1 | 1 | 1 | **4** |
| Contact Form | - | 1 | - | - | **1** |
| Leasing Form | - | 1 | - | - | **1** |
| NC-NDA Form | - | 1 | - | - | **1** |
| Admin Contacts | 1 | - | - | - | **1** |
| Admin Applications | 1 | - | 1 | - | **2** |
| Admin NDA | 2 | - | - | - | **2** |
| File Upload | - | 1 | - | 1 | **2** |
| **รวมทั้งหมด** | **15** | **12** | **9** | **6** | **42** |

---

## 9. Timeline แนะนำ

| Sprint | สัปดาห์ | งาน | Endpoints |
|--------|---------|-----|-----------|
| **Sprint 1** | สัปดาห์ 1-2 | Setup project + Database + Auth API + CORS | 4 |
| **Sprint 2** | สัปดาห์ 3-4 | CMS API ทั้ง 8 modules + File Upload | 30 |
| **Sprint 3** | สัปดาห์ 5-6 | Form Submissions (Contact + Leasing + NC-NDA) + Admin Views + Email Notifications + Testing | 8 + Email |

---

## 10. หมายเหตุสำหรับ Frontend

เมื่อ Backend พร้อม ทาง Frontend จะทำการ:
1. เปลี่ยนจาก `localStorage` → เรียก API ทุก endpoint
2. เปลี่ยน Auth จาก hardcoded → JWT-based
3. เปลี่ยน Form submission จาก `setTimeout` mock → `fetch` API จริง
4. เพิ่ม Image Upload component แทน URL input

> **Frontend จะรอ Base URL + Authentication flow จาก Backend ก่อนเริ่ม integrate**
