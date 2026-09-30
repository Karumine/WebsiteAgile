# Backend API Specification — Agile Assets Corporate Website
> Generated from frontend source scan: services/, types/, pages/, admin editors — ครบถ้วนตาม Frontend ปัจจุบัน
> Base URL: `https://api.tunjai.in.th/api/v1`
> Stack hint: ASP.NET Core · SQL Server · JWT Bearer

---

## Response Envelope (มาตรฐานทุก Endpoint)

```json
{
  "success": true,
  "data": { ... },
  "message": "string (optional)",
  "error": {
    "code": "string",
    "message": "string",
    "details": "any (optional)"
  }
}
```

> Frontend ใช้ `if ('success' in data)` ตรวจจับ envelope นี้ ถ้า backend ส่ง raw object โดยไม่มี `success` field — frontend ก็รองรับอยู่แล้ว แต่แนะนำให้ wrap เสมอ

---

## Authorization

| Level | Header | หมายเหตุ |
|---|---|---|
| Public | ไม่ต้อง | ทุกคนเข้าได้ |
| Admin | `Authorization: Bearer <accessToken>` | JWT ที่ได้จาก POST /auth/login |

Frontend เก็บ token ใน `localStorage` key `agile_assets_token` และ `agile_assets_refresh_token`

---

## 1. Authentication

### POST `/auth/login`
**Auth:** Public  
**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Response `data`:**
```json
{
  "user": {
    "id": "string | number",
    "username": "string",
    "role": "admin",
    "fullName": "string (optional)",
    "email": "string (optional)"
  },
  "accessToken": "string (JWT)",
  "refreshToken": "string (optional)",
  "expiresIn": 86400
}
```
**Notes:**
- Frontend fallback credential: `marketing` / `123456789` (ใช้เมื่อ backend down เท่านั้น)
- Session duration ฝั่ง frontend: 24 ชั่วโมง
- 401 เมื่อ credentials ผิด

---

## 2. Theme Settings

### GET `/settings/theme`
**Auth:** Public (frontend โหลด theme ก่อน render)  
**Response `data`:**
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

### PUT `/settings/theme`
**Auth:** Admin  
**Request Body:** (เหมือน GET response)
```json
{
  "primaryColor": "string (hex color)",
  "gradientStart": "string (hex color)",
  "gradientEnd": "string (hex color)",
  "buttonTextColor": "string (hex color)",
  "buttonRadius": "rounded-md | rounded-xl | rounded-2xl | rounded-full",
  "buttonStyle": "gradient | solid | glow",
  "accentColor": "string (hex color)"
}
```
**Response `data`:** ThemeSettings ที่บันทึกแล้ว

**Database Table: `ThemeSettings`**
| Column | Type | Notes |
|---|---|---|
| Id | INT PK | |
| PrimaryColor | NVARCHAR(20) | hex |
| GradientStart | NVARCHAR(20) | hex |
| GradientEnd | NVARCHAR(20) | hex |
| ButtonTextColor | NVARCHAR(20) | hex |
| ButtonRadius | NVARCHAR(30) | enum string |
| ButtonStyle | NVARCHAR(20) | gradient/solid/glow |
| AccentColor | NVARCHAR(20) | hex |
| UpdatedAt | DATETIMEOFFSET | |
| UpdatedBy | NVARCHAR(100) | |

---

## 3. Banner Settings

> ⚠️ BannerEditor ซิงค์กับ `/pages/home` ด้วย — เมื่อ save banner ต้องอัปเดต `PageContents` ของ `home` พร้อมกัน (หรือ frontend จัดการเอง)

### GET `/settings/banner`
**Auth:** Public  
**Response `data`:**
```json
{
  "headline": "string",
  "subheadline": "string",
  "ctaText": "string",
  "ctaLink": "string"
}
```

### PUT `/settings/banner`
**Auth:** Admin  
**Request Body:** เหมือน GET  
**Response `data`:** BannerSettings ที่บันทึก

**Database Table: `BannerSettings`**
| Column | Type | Notes |
|---|---|---|
| Id | INT PK | |
| Headline | NVARCHAR(500) | |
| Subheadline | NVARCHAR(2000) | |
| CtaText | NVARCHAR(200) | |
| CtaLink | NVARCHAR(500) | URL หรือ anchor |
| UpdatedAt | DATETIMEOFFSET | |

---

## 4. Company Info & Impact Stats

### GET `/settings/company`
**Auth:** Public  
**Response `data`:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "description": "string",
  "lineId": "string (optional)",
  "facebook": "string (optional)",
  "mapUrl": "string (optional)",
  "operatingHours": "string (optional)",
  "impactStats": {
    "factoriesServed": "string",
    "totalCreditValueMB": "string",
    "totalContractsCount": "string",
    "customerSatisfactionPct": "string (optional)"
  }
}
```

### PUT `/settings/company`
**Auth:** Admin  
**Request Body:** เหมือน GET response

**Database Table: `CompanyInfo`**
| Column | Type |
|---|---|
| Id | INT PK |
| Name | NVARCHAR(300) |
| Phone | NVARCHAR(100) |
| Email | NVARCHAR(200) |
| Address | NVARCHAR(1000) |
| Description | NVARCHAR(MAX) |
| LineId | NVARCHAR(100) NULL |
| Facebook | NVARCHAR(500) NULL |
| MapUrl | NVARCHAR(1000) NULL |
| OperatingHours | NVARCHAR(200) NULL |
| FactoriesServed | NVARCHAR(50) |
| TotalCreditValueMB | NVARCHAR(50) |
| TotalContractsCount | NVARCHAR(50) |
| CustomerSatisfactionPct | NVARCHAR(50) NULL |
| UpdatedAt | DATETIMEOFFSET |

---

## 5. Interest Rates

### GET `/rates`
**Auth:** Public  
**Response `data`:** `InterestRate[]`

```json
[
  {
    "id": "string",
    "product": "string",
    "rate": 8.9,
    "term": "string (e.g. '12–60 months')",
    "featured": true,
    "description": "string"
  }
]
```

### PUT `/rates`
**Auth:** Admin (replace all)  
**Request Body:** `InterestRate[]`  

### POST `/rates`
**Auth:** Admin (add single)  
**Request Body:** InterestRate (without id)  

### DELETE `/rates/{id}`
**Auth:** Admin  

**Database Table: `InterestRates`**
| Column | Type |
|---|---|
| Id | NVARCHAR(50) PK |
| Product | NVARCHAR(300) |
| Rate | DECIMAL(5,2) |
| Term | NVARCHAR(100) |
| Featured | BIT |
| Description | NVARCHAR(1000) |
| SortOrder | INT |
| UpdatedAt | DATETIMEOFFSET |

---

## 6. News & Articles

### GET `/news`
**Auth:** Public  
**Query Params:**
| Param | Type | Default |
|---|---|---|
| page | int | 1 |
| limit | int | 20 |
| category | string | all |
| pinned | bool | - |

**Response `data`:**
```json
{
  "items": [ NewsItem ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

**NewsItem:**
```json
{
  "id": "string",
  "title": "string",
  "title_en": "string",
  "excerpt": "string",
  "excerpt_en": "string",
  "content": "string (HTML)",
  "content_en": "string (HTML)",
  "date": "string (YYYY-MM-DD)",
  "pinned": false,
  "category": "FINANCE | NEWS | Market Analysis | Company News | Education",
  "image": "string (URL, optional)"
}
```

### GET `/news/{id}`
**Auth:** Public  
**Response `data`:** NewsItem

### POST `/news`
**Auth:** Admin  
**Request Body:** NewsItem (without id)

### PUT `/news/{id}`
**Auth:** Admin  
**Request Body:** Partial\<NewsItem\>

### DELETE `/news/{id}`
**Auth:** Admin

**Database Table: `News`**
| Column | Type |
|---|---|
| Id | NVARCHAR(100) PK |
| Title | NVARCHAR(500) |
| TitleEn | NVARCHAR(500) |
| Excerpt | NVARCHAR(1000) |
| ExcerptEn | NVARCHAR(1000) |
| Content | NVARCHAR(MAX) |
| ContentEn | NVARCHAR(MAX) |
| Date | DATE |
| Pinned | BIT |
| Category | NVARCHAR(100) |
| Image | NVARCHAR(1000) NULL |
| CreatedAt | DATETIMEOFFSET |
| UpdatedAt | DATETIMEOFFSET |

---

## 7. Used Machinery / Assets for Sale

### GET `/assets`
**Auth:** Public  
**Query Params:** `status`, `category`, `page`, `limit`

**Response `data`:** `{ items: UsedMachineryItem[], total, page, limit }`

**UsedMachineryItem:**
```json
{
  "id": "string",
  "title": "string",
  "title_en": "string (optional)",
  "category": "string",
  "price": "string",
  "year": "string",
  "condition": "string",
  "description": "string",
  "image": "string (URL)",
  "status": "available | reserved | sold"
}
```

### GET `/assets/{id}`
**Auth:** Public

### POST `/assets`
**Auth:** Admin

### PUT `/assets/{id}`
**Auth:** Admin

### DELETE `/assets/{id}`
**Auth:** Admin

**Database Table: `UsedMachinery`**
| Column | Type |
|---|---|
| Id | NVARCHAR(50) PK |
| Title | NVARCHAR(500) |
| TitleEn | NVARCHAR(500) NULL |
| Category | NVARCHAR(200) |
| Price | NVARCHAR(100) |
| Year | NVARCHAR(10) |
| Condition | NVARCHAR(200) |
| Description | NVARCHAR(MAX) |
| Image | NVARCHAR(1000) |
| Status | NVARCHAR(20) | CHECK IN ('available','reserved','sold') |
| CreatedAt | DATETIMEOFFSET |
| UpdatedAt | DATETIMEOFFSET |

---

## 8. FAQs

### GET `/faqs`
**Auth:** Public  
**Query Params:** `category`

**Response `data`:** `FaqItem[]`

**FaqItem:**
```json
{
  "id": "string",
  "question": "string (TH)",
  "question_en": "string (optional)",
  "answer": "string (TH)",
  "answer_en": "string (optional)",
  "category": "string"
}
```

### PUT `/faqs`
**Auth:** Admin (replace all)

### POST `/faqs`
**Auth:** Admin

### PUT `/faqs/{id}`
**Auth:** Admin

### DELETE `/faqs/{id}`
**Auth:** Admin

**Database Table: `Faqs`**
| Column | Type |
|---|---|
| Id | NVARCHAR(50) PK |
| Question | NVARCHAR(MAX) |
| QuestionEn | NVARCHAR(MAX) NULL |
| Answer | NVARCHAR(MAX) |
| AnswerEn | NVARCHAR(MAX) NULL |
| Category | NVARCHAR(200) |
| SortOrder | INT |
| UpdatedAt | DATETIMEOFFSET |

---

## 9. Page Contents (Universal CMS)

> ⚠️ นี่คือระบบใหญ่ที่สุด — PageContentEditor ใช้จัดการ 26+ หน้าสาธารณะ

### GET `/pages`
**Auth:** Admin  
**Response `data`:** `string[]` (รายชื่อ pageId ที่มี custom content)

```json
["home", "about", "contact", "solar-power-generation", ...]
```

### GET `/pages/{pageId}`
**Auth:** Public  
**Response `data`:** `PageCustomContent`

**PageCustomContent (ฟิลด์ทั้งหมดจาก types/index.ts):**
```json
{
  "id": "string",
  "pageName": "string",
  "titleTh": "string",
  "titleEn": "string (optional)",
  "sectionTitleTh": "string (optional)",
  "sectionTitleEn": "string (optional)",
  "sectionSubtitleTh": "string (optional)",
  "sectionSubtitleEn": "string (optional)",
  "metaTitle": "string (optional)",
  "metaDescription": "string (optional)",
  "heroBadgeTh": "string (optional)",
  "heroBadgeEn": "string (optional)",
  "heroTitleTh": "string",
  "heroTitleEn": "string (optional)",
  "heroSubtitleTh": "string",
  "heroSubtitleEn": "string (optional)",
  "heroImage": "string URL (optional)",
  "ctaTextTh": "string (optional)",
  "ctaTextEn": "string (optional)",
  "ctaLink": "string (optional)",
  "contentTh": "string HTML (optional)",
  "contentEn": "string HTML (optional)",
  "items": [ "PageSectionItem[]" ],
  "solutionsBadgeTh": "string (optional)",
  "solutionsBadgeEn": "string (optional)",
  "solutionsTitleTh": "string (optional)",
  "solutionsTitleEn": "string (optional)",
  "solutionsSubtitleTh": "string (optional)",
  "solutionsSubtitleEn": "string (optional)",
  "solutionsItems": [ "PageSectionItem[]" ],
  "machineryBadgeTh": "string (optional)",
  "machineryBadgeEn": "string (optional)",
  "machineryTitleTh": "string (optional)",
  "machineryTitleEn": "string (optional)",
  "machinerySubtitleTh": "string (optional)",
  "machinerySubtitleEn": "string (optional)",
  "machineryItems": [ "PageSectionItem[]" ],
  "whatWeDoBadgeTh": "string (optional)",
  "whatWeDoBadgeEn": "string (optional)",
  "whatWeDoTitleTh": "string (optional)",
  "whatWeDoTitleEn": "string (optional)",
  "whatWeDoSubtitleTh": "string (optional)",
  "whatWeDoSubtitleEn": "string (optional)",
  "whatWeDoImage": "string URL (optional)",
  "whatWeDoItems": [ "PageSectionItem[]" ],
  "lastUpdated": "string ISO datetime"
}
```

**PageSectionItem:**
```json
{
  "id": "string",
  "title": "string",
  "titleEn": "string (optional)",
  "subTitle": "string (optional)",
  "subTitleEn": "string (optional)",
  "description": "string",
  "descEn": "string (optional)",
  "badge": "string (optional)",
  "icon": "string icon name (optional)",
  "image": "string URL (optional)",
  "link": "string (optional)",
  "quote": "string (optional)",
  "quoteEn": "string (optional)",
  "btnText": "string (optional)",
  "btnTextEn": "string (optional)"
}
```

### PUT `/pages/{pageId}`
**Auth:** Admin  
**Request Body:** `Partial<PageCustomContent>`  
**Response `data`:** PageCustomContent ที่บันทึก

### DELETE `/pages/{pageId}`
**Auth:** Admin (reset to default)  
**Response:** `{ success: true }`

**Database Tables:**

**`PageContents`**
| Column | Type |
|---|---|
| Id | NVARCHAR(100) PK (= pageId) |
| PageName | NVARCHAR(200) |
| TitleTh | NVARCHAR(500) |
| TitleEn | NVARCHAR(500) NULL |
| SectionTitleTh | NVARCHAR(500) NULL |
| SectionTitleEn | NVARCHAR(500) NULL |
| SectionSubtitleTh | NVARCHAR(1000) NULL |
| SectionSubtitleEn | NVARCHAR(1000) NULL |
| MetaTitle | NVARCHAR(200) NULL |
| MetaDescription | NVARCHAR(500) NULL |
| HeroBadgeTh | NVARCHAR(200) NULL |
| HeroBadgeEn | NVARCHAR(200) NULL |
| HeroTitleTh | NVARCHAR(500) |
| HeroTitleEn | NVARCHAR(500) NULL |
| HeroSubtitleTh | NVARCHAR(1000) |
| HeroSubtitleEn | NVARCHAR(1000) NULL |
| HeroImage | NVARCHAR(1000) NULL |
| CtaTextTh | NVARCHAR(200) NULL |
| CtaTextEn | NVARCHAR(200) NULL |
| CtaLink | NVARCHAR(500) NULL |
| ContentTh | NVARCHAR(MAX) NULL |
| ContentEn | NVARCHAR(MAX) NULL |
| SolutionsBadgeTh | NVARCHAR(200) NULL |
| SolutionsBadgeEn | NVARCHAR(200) NULL |
| SolutionsTitleTh | NVARCHAR(500) NULL |
| SolutionsTitleEn | NVARCHAR(500) NULL |
| SolutionsSubtitleTh | NVARCHAR(1000) NULL |
| SolutionsSubtitleEn | NVARCHAR(1000) NULL |
| MachineryBadgeTh | NVARCHAR(200) NULL |
| MachineryBadgeEn | NVARCHAR(200) NULL |
| MachineryTitleTh | NVARCHAR(500) NULL |
| MachineryTitleEn | NVARCHAR(500) NULL |
| MachinerySubtitleTh | NVARCHAR(1000) NULL |
| MachinerySubtitleEn | NVARCHAR(1000) NULL |
| WhatWeDoBadgeTh | NVARCHAR(200) NULL |
| WhatWeDoBadgeEn | NVARCHAR(200) NULL |
| WhatWeDoTitleTh | NVARCHAR(500) NULL |
| WhatWeDoTitleEn | NVARCHAR(500) NULL |
| WhatWeDoSubtitleTh | NVARCHAR(1000) NULL |
| WhatWeDoSubtitleEn | NVARCHAR(1000) NULL |
| WhatWeDoImage | NVARCHAR(1000) NULL |
| LastUpdated | DATETIMEOFFSET |

**`PageSectionItems`**
| Column | Type | Notes |
|---|---|---|
| Id | NVARCHAR(100) PK |
| PageId | NVARCHAR(100) FK → PageContents.Id |
| SectionType | NVARCHAR(50) | 'items' / 'solutionsItems' / 'machineryItems' / 'whatWeDoItems' |
| SortOrder | INT | |
| Title | NVARCHAR(500) | |
| TitleEn | NVARCHAR(500) NULL | |
| SubTitle | NVARCHAR(500) NULL | |
| SubTitleEn | NVARCHAR(500) NULL | |
| Description | NVARCHAR(MAX) | |
| DescEn | NVARCHAR(MAX) NULL | |
| Badge | NVARCHAR(200) NULL | |
| Icon | NVARCHAR(100) NULL | |
| Image | NVARCHAR(1000) NULL | |
| Link | NVARCHAR(500) NULL | |
| Quote | NVARCHAR(MAX) NULL | |
| QuoteEn | NVARCHAR(MAX) NULL | |
| BtnText | NVARCHAR(200) NULL | |
| BtnTextEn | NVARCHAR(200) NULL | |

---

## 10. Careers / Job Applications

### POST `/careers/apply`
**Auth:** Public  
**Request Body:**
```json
{
  "fullName": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "positionId": "string (optional)",
  "positionTitle": "string (optional)",
  "experienceYears": "string (optional)",
  "expectedSalary": "string (optional)",
  "resumeUrl": "string URL (optional)",
  "coverLetter": "string (optional)"
}
```
**Response `data`:**
```json
{
  "id": "string",
  "message": "Application received"
}
```

### GET `/careers/applications`
**Auth:** Admin  
**Query Params:**
| Param | Type |
|---|---|
| status | pending / reviewing / interview / accepted / rejected |
| positionId | string |
| search | string (fullName, email) |
| page | int (default 1) |
| limit | int (default 20) |

**Response `data`:** `{ items: JobApplication[], total, page, limit }`

**JobApplication:**
```json
{
  "id": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "positionId": "string (optional)",
  "positionTitle": "string (optional)",
  "experienceYears": "string (optional)",
  "expectedSalary": "string (optional)",
  "resumeUrl": "string (optional)",
  "coverLetter": "string (optional)",
  "status": "pending | reviewing | interview | accepted | rejected",
  "createdAt": "ISO datetime",
  "notes": "string (optional)"
}
```

### PATCH `/careers/applications/{id}/status`
**Auth:** Admin  
**Request Body:**
```json
{
  "status": "pending | reviewing | interview | accepted | rejected",
  "notes": "string (optional)"
}
```

**Database Table: `JobApplications`**
| Column | Type |
|---|---|
| Id | UNIQUEIDENTIFIER PK DEFAULT NEWID() |
| FullName | NVARCHAR(300) |
| Email | NVARCHAR(300) |
| Phone | NVARCHAR(50) |
| PositionId | NVARCHAR(100) NULL |
| PositionTitle | NVARCHAR(500) NULL |
| ExperienceYears | NVARCHAR(50) NULL |
| ExpectedSalary | NVARCHAR(100) NULL |
| ResumeUrl | NVARCHAR(1000) NULL |
| CoverLetter | NVARCHAR(MAX) NULL |
| Status | NVARCHAR(20) DEFAULT 'pending' |
| Notes | NVARCHAR(MAX) NULL |
| CreatedAt | DATETIMEOFFSET DEFAULT GETUTCDATE() |
| UpdatedAt | DATETIMEOFFSET |

---

## 11. Custom Fields (Campaign Tags)

> ใช้ใน admin `/management-portal/custom` — เป็น key-value สำหรับ campaign tracking

### GET `/settings/custom-fields`
**Auth:** Admin  
**Response `data`:** `CustomField[]`

**CustomField:**
```json
{
  "id": "string",
  "label": "string",
  "type": "text | number | date | boolean | url",
  "value": "string",
  "campaign": "string"
}
```

### PUT `/settings/custom-fields`
**Auth:** Admin (replace all)  
**Request Body:** `CustomField[]`

**Database Table: `CustomFields`**
| Column | Type |
|---|---|
| Id | NVARCHAR(50) PK |
| Label | NVARCHAR(300) |
| Type | NVARCHAR(20) |
| Value | NVARCHAR(MAX) |
| Campaign | NVARCHAR(200) |
| UpdatedAt | DATETIMEOFFSET |

---

## 12. Users / Admin Account

### GET `/users/me`
**Auth:** Admin  
**Response `data`:** User object

### PUT `/users/me/password`
**Auth:** Admin  
**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Database Table: `Users`**
| Column | Type |
|---|---|
| Id | UNIQUEIDENTIFIER PK DEFAULT NEWID() |
| Username | NVARCHAR(100) UNIQUE |
| PasswordHash | NVARCHAR(MAX) (BCrypt/Argon2) |
| Role | NVARCHAR(50) DEFAULT 'admin' |
| FullName | NVARCHAR(300) NULL |
| Email | NVARCHAR(300) NULL |
| IsActive | BIT DEFAULT 1 |
| CreatedAt | DATETIMEOFFSET DEFAULT GETUTCDATE() |
| UpdatedAt | DATETIMEOFFSET |

**Initial Seed:**
```sql
-- Marketing admin account
IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'marketing')
INSERT INTO Users (Id, Username, PasswordHash, Role, FullName, Email, IsActive, CreatedAt)
VALUES (NEWID(), 'marketing', '$2a$12$<bcrypt_of_123456789>', 'admin', 'Marketing Admin', 'admin@agileassets.co.th', 1, GETUTCDATE());
```

---

## Summary: API Endpoint Inventory

| # | Method | Endpoint | Auth | Frontend ใช้งานจาก |
|---|---|---|---|---|
| 1 | POST | `/auth/login` | Public | AuthContext.tsx |
| 2 | GET | `/settings/theme` | Public | SiteSettingsContext.tsx |
| 3 | PUT | `/settings/theme` | Admin | themeService.ts |
| 4 | GET | `/settings/banner` | Public | BannerEditor.tsx |
| 5 | PUT | `/settings/banner` | Admin | BannerEditor.tsx |
| 6 | GET | `/settings/company` | Public | CompanyInfoEditor.tsx |
| 7 | PUT | `/settings/company` | Admin | CompanyInfoEditor.tsx |
| 8 | GET | `/settings/custom-fields` | Admin | CustomFieldsEditor.tsx |
| 9 | PUT | `/settings/custom-fields` | Admin | CustomFieldsEditor.tsx |
| 10 | GET | `/rates` | Public | RatesEditor.tsx |
| 11 | PUT | `/rates` | Admin | RatesEditor.tsx |
| 12 | POST | `/rates` | Admin | RatesEditor.tsx |
| 13 | DELETE | `/rates/{id}` | Admin | RatesEditor.tsx |
| 14 | GET | `/news` | Public | DashboardPage, NewsUpdatePage |
| 15 | GET | `/news/{id}` | Public | NewsUpdatePage |
| 16 | POST | `/news` | Admin | NewsEditor.tsx |
| 17 | PUT | `/news/{id}` | Admin | NewsEditor.tsx |
| 18 | DELETE | `/news/{id}` | Admin | NewsEditor.tsx |
| 19 | GET | `/assets` | Public | AssetForSalePage |
| 20 | GET | `/assets/{id}` | Public | AssetForSalePage |
| 21 | POST | `/assets` | Admin | AssetsEditor.tsx |
| 22 | PUT | `/assets/{id}` | Admin | AssetsEditor.tsx |
| 23 | DELETE | `/assets/{id}` | Admin | AssetsEditor.tsx |
| 24 | GET | `/faqs` | Public | FaqPage |
| 25 | PUT | `/faqs` | Admin | FaqEditor.tsx |
| 26 | POST | `/faqs` | Admin | FaqEditor.tsx |
| 27 | DELETE | `/faqs/{id}` | Admin | FaqEditor.tsx |
| 28 | GET | `/pages` | Admin | PageContentEditor.tsx |
| 29 | GET | `/pages/{pageId}` | Public | Every public page via usePageContent() |
| 30 | PUT | `/pages/{pageId}` | Admin | pageContentService.ts |
| 31 | DELETE | `/pages/{pageId}` | Admin | pageContentService.ts |
| 32 | POST | `/careers/apply` | Public | WorkForUsPage.tsx |
| 33 | GET | `/careers/applications` | Admin | (Admin panel - planned) |
| 34 | PATCH | `/careers/applications/{id}/status` | Admin | careerService.ts |
| 35 | GET | `/users/me` | Admin | (planned) |
| 36 | PUT | `/users/me/password` | Admin | (planned) |

---

## Frontend Fallback Strategy

> Frontend ออกแบบมาให้ทำงานได้แม้ backend ยังไม่พร้อม:

| ข้อมูล | Fallback |
|---|---|
| Theme | `DEFAULT_THEME_SETTINGS` ใน SiteSettingsContext |
| Page Contents | `DEFAULT_PAGE_CONTENTS` ใน `src/data/defaultPageContents.ts` |
| News/Rates/FAQ/Assets | `defaultSettings.json` |
| Auth | `ADMIN_CREDENTIALS` constant (`marketing` / `123456789`) |

**หมายเหตุ:** Frontend บันทึกทุกอย่างใน `localStorage` key `agile_assets_settings` — ดังนั้นถ้า backend ยัง mock อยู่ user จะไม่เห็นความต่างในการทดสอบ local

---

## Public Pages ที่ใช้ `usePageContent(pageId)`

รายการ pageId ทั้งหมดที่ PageContentEditor จัดการ:

| pageId | URL | Page Component |
|---|---|---|
| `home` | `/` | HomePage |
| `about` | `/about` | AboutPage |
| `drinking-water-production` | `/drinking-water-production` | DrinkingWaterPage |
| `livestock-farm` | `/livestock-farm` | LivestockFarmPage |
| `food-processing` | `/food-processing` | FoodProcessingPage |
| `biogas-production` | `/biogas-production` | BiogasProductionPage |
| `solar-power-generation` | `/solar-power-generation` | SolarPowerPage |
| `chiller` | `/chiller` | ChillerPage |
| `injection-molding` | `/injection-molding-machine` | InjectionMoldingPage |
| `generator-set` | `/generator-set` | GeneratorSetPage |
| `investor-relations` | `/investor-relations` | InvestorRelationsPage |
| `sustainability` | `/sustainability` | SustainabilityPage |
| `project-activity` | `/project-activity` | ProjectActivityPage |
| `newsletter` | `/newsletter` | NewsletterPage |
| `knowledge` | `/knowledge` | KnowledgePage |
| `news-update` | `/news` | NewsUpdatePage |
| `calculator` | `/calculator` | CalculatorPage |
| `interest-rate-conversion` | `/interest-rate-conversion` | InterestRateConversionPage |
| `faq` | `/faq` | FaqPage |
| `contact` | `/contact` | ContactPage |
| `work-for-us` | `/work-for-us` | WorkForUsPage |
| `nc-nda` | `/nc-nda` | NcNdaPage |
| `leasing-application` | `/leasing-application` | LeasingApplicationPage |
| `asset-for-sale` | `/asset-for-sale` | AssetForSalePage |
| `cookie-policy` | `/cookie-policy` | CookiePolicyPage |
