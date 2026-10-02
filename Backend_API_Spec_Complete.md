# Backend API Specification — Agile Assets Corporate Website (v3)

> **เอกสารฉบับนี้คือ Single Source of Truth** สำหรับทีม Backend — แทนที่ `Backend_API_Spec_AgileAssets.md` และ `Backend_API_Spec_Addendum_V2.md` ทั้งหมด
> ทุก endpoint ในเอกสารนี้ **ถูกเรียกจริงจากโค้ด Frontend ปัจจุบัน** (อ้างอิงไฟล์ใน `src/services/*`) ยกเว้นที่ระบุว่า *Phase 2*
>
> Base URL: `https://api.tunjai.in.th/api/v1` · Stack: ASP.NET Core 8 · SQL Server · JWT Bearer
> อัปเดตล่าสุด: 2026-10-02 (เพิ่ม `sections`, การซ่อนส่วน `hidden` และ Page Builder `blocks` ใน PageCustomContent — ดู §0 ข้อ 13–18)

---

## สารบัญ

0. [สรุปการเปลี่ยนแปลงจาก spec เดิม](#0-สรุปการเปลี่ยนแปลงจาก-spec-เดิม)
1. [หลักการทั่วไป (Conventions)](#1-หลักการทั่วไป-conventions)
2. [ข้อกำหนดด้านความปลอดภัย (บังคับ)](#2-ข้อกำหนดด้านความปลอดภัย-บังคับ)
3. [Authentication](#3-authentication)
4. [Public Site Bootstrap — `GET /site/public`](#4-public-site-bootstrap)
5. [CMS Admin API (การเผยแพร่เนื้อหา)](#5-cms-admin-api)
6. [Image Upload](#6-image-upload)
7. [Public Forms (ลีดลูกค้า)](#7-public-forms)
8. [Admin: จัดการลีด / ใบสมัคร (Phase 2)](#8-admin-จัดการลีด--ใบสมัคร-phase-2)
9. [Data Models (JSON)](#9-data-models-json)
10. [Database Schema (SQL Server DDL)](#10-database-schema-sql-server-ddl)
11. [PDPA & การจัดการข้อมูลส่วนบุคคล](#11-pdpa--การจัดการข้อมูลส่วนบุคคล)
12. [Performance Requirements](#12-performance-requirements)
13. [Configuration & Deployment](#13-configuration--deployment)
14. [Endpoint Inventory (สรุป)](#14-endpoint-inventory)
15. [Implementation Checklist & ลำดับงาน](#15-implementation-checklist--ลำดับงาน)

---

## 0. สรุปการเปลี่ยนแปลงจาก spec เดิม

| # | เรื่อง | ของเดิม | ฉบับนี้ | เหตุผล |
|---|---|---|---|---|
| 1 | รหัสผ่านสำรองฝั่งหน้าบ้าน | `marketing/123456789` ฝังใน JS | **ลบออกจาก production แล้ว** | ใครเปิด DevTools ก็เห็น — Auth ต้องมาจาก Backend เท่านั้น |
| 2 | การโหลดเนื้อหาหน้าเว็บ | ไม่มี (หน้าบ้านอ่านจาก localStorage ของเครื่องตัวเอง) | **`GET /site/public`** request เดียวได้ทุกอย่าง | เดิมสิ่งที่แอดมินแก้ ผู้เข้าชมจริงไม่เห็นเลย |
| 3 | การบันทึกของแอดมิน | ยิง API ทุกครั้งที่พิมพ์ (บางส่วน) | แอดมินกดปุ่ม **"เผยแพร่"** → ส่งเฉพาะส่วนที่เปลี่ยน | ลดโหลด + กันเนื้อหาครึ่งๆ กลางๆ ขึ้นเว็บ |
| 4 | News / Assets | POST + PUT แยก, server สร้าง id | **`PUT /{id}` แบบ upsert** (id มาจาก client) | หน้าบ้านสร้าง id เองอยู่แล้ว, idempotent, retry ได้ปลอดภัย |
| 5 | Page Contents | ตาราง 40+ คอลัมน์ + ตาราง items | **เก็บเป็น JSON document 1 คอลัมน์** | schema หน้าเว็บเพิ่มฟิลด์บ่อย ไม่ต้อง migrate ทุกครั้ง |
| 6 | Custom Pages (หน้าที่แอดมินสร้างเอง) | ไม่มี | **`PUT /settings/custom-pages`** | ฟีเจอร์ "เพิ่มหน้า" ใน CMS ต้องบันทึกได้ |
| 7 | ฟอร์มลูกค้า | ทุกฟอร์มเป็น `setTimeout` จำลอง (ลีดหายหมด) | ต่อ API จริง 6 endpoint + `meta` กันบอท | ลีดลูกค้าต้องถึงฝ่ายขาย |
| 8 | กันบอท | Rate limit อย่างเดียว | Rate limit + **Cloudflare Turnstile** + time-trap + honeypot | มาตรฐานฟอร์มสาธารณะ |
| 9 | Upload | `POST /upload/image` | **`POST /uploads/images`** + re-encode WebP | ตรงกับโค้ดหน้าบ้าน + ตัดไฟล์อันตราย |
| 10 | Refresh token | มี | **ไม่ใช้ในเฟสนี้** (access token 8 ชม.) | หน้าบ้านไม่มี flow refresh; ลดงานที่ไม่ได้ใช้ |
| 11 | pageId | ตารางเดิมไม่ตรงโค้ด (เช่น `solar-power-generation`) | แก้ให้ตรงโค้ดจริง (ดู §9.10) | ป้องกันบันทึกแล้วหน้าไม่เปลี่ยน |
| 12 | Cache ของ API สาธารณะ | `no-store` ทุก endpoint | `/site/public` ใช้ ETag + cache สั้น | ลดเวลาโหลดหน้าแรก |
| 13 | เนื้อหาทุกส่วนของทุกหน้า | แก้ได้แค่ Hero / items / SEO ส่วนอื่นเขียนตายตัวในโค้ด | **ฟิลด์ใหม่ `sections`** ใน PageCustomContent (§9.10.1) | แอดมินต้องแก้ได้ทั้งหน้า — ไม่มี endpoint ใหม่ ใช้ `PUT /pages/{pageId}` เดิม |
| 14 | pageId ที่จัดการได้ | 19 หน้า + `page-*` | **25 หน้า** + `page-*` (เพิ่ม `faq`, `news`, `knowledge`, `newsletter`, `leasing-application`, `used-machine`) | หน้าเหล่านี้เชื่อมกับ CMS แล้ว |
| 15 | Validation ของ page document | trim + ปฏิเสธ control char + sanitize `content*` ทุกจุด | **ข้อยกเว้นเฉพาะ page document** (§2.5.1) | ข้อความหลายบรรทัด / ช่องว่างท้ายข้อความ / ข้อความธรรมดาที่ชื่อ `contentTh` ต้องไม่ถูกแก้ |
| 16 | URL ใน page document | ตรวจเฉพาะ `*Image`, `image`, `link`, `ctaLink` | **ตรวจทุก string ใน `sections`** (§2.5.1) | `sections` มี URL หลายชื่อ key ที่ไปเป็น `href`/`src` บนหน้าเว็บ |
| 17 | ซ่อน/แสดงแต่ละส่วนของหน้า | ทำไม่ได้ | **`sections.{id}.hidden: boolean`** (§9.10.1) | แอดมินปิดส่วนที่ไม่ใช้ได้โดยไม่ต้องลบข้อมูล |
| 18 | หน้าที่แอดมินสร้างเอง (`page-*`) | Hero + การ์ด + CTA ตายตัว | **Page Builder: `blocks: PageBlock[]`** เรียงบล็อกได้อิสระ (§9.10.2) | ทีมการตลาดสร้างหน้าแคมเปญได้เองจากคลังบล็อกที่ออกแบบไว้ |

---

## 1. หลักการทั่วไป (Conventions)

### 1.1 Response Envelope

ทุก response ต้องห่อด้วยรูปแบบนี้ (frontend รองรับ raw object ด้วย แต่ให้ใช้ envelope เสมอ):

```json
{ "success": true, "data": { }, "message": "ข้อความ (optional)" }
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "อีเมลไม่ถูกต้อง",
    "details": { "email": "รูปแบบอีเมลไม่ถูกต้อง" }
  }
}
```

> Frontend แสดง `error.message` ให้ผู้ใช้เห็นตรงๆ เมื่อได้ **400/422** → ข้อความต้องเป็นภาษาคน และเลือกภาษาตาม `meta.lang` (ฟอร์ม) หรือ header `Accept-Language` (อย่างอื่น) — ห้ามส่ง stack trace / ข้อความ exception

### 1.2 HTTP Status ที่หน้าบ้านจัดการ

| Status | ความหมาย | Frontend ทำอะไร |
|---|---|---|
| 200 / 201 | สำเร็จ | แสดงผลสำเร็จ |
| 400 / 422 | ข้อมูลไม่ถูกต้อง | แสดง `error.message` |
| 401 | token หมดอายุ/ถูกเพิกถอน | **ล้าง session และเด้งไปหน้า login อัตโนมัติ** |
| 403 | ไม่มีสิทธิ์ | แสดง error |
| 404 | ไม่พบ | — |
| 409 | ข้อมูลชนกัน (เช่น path ซ้ำ) | แสดง `error.message` |
| 413 / 415 | ไฟล์ใหญ่เกิน / ชนิดไฟล์ไม่รองรับ | แสดง error |
| 429 | ยิงถี่เกิน | แสดง "ส่งข้อมูลบ่อยเกินไป" — **ต้องส่ง header `Retry-After`** |
| 5xx / timeout | ระบบขัดข้อง | ฟอร์ม: แจ้งให้ลองใหม่ + เบอร์โทรสำรอง (ข้อมูลยังอยู่ในฟอร์ม) |

### 1.3 รูปแบบข้อมูล

- JSON **camelCase** — ยกเว้นฟิลด์ legacy ที่หน้าบ้านใช้อยู่ **ต้องคงชื่อเดิม**: `title_en`, `excerpt_en`, `content_en` (News), `title_en` (UsedMachinery), `question_en`, `answer_en` (Faq) → ใช้ `[JsonPropertyName("title_en")]`
- วันเวลา: ISO-8601 UTC (`2026-10-01T04:30:00Z`); วันที่ล้วนใช้ `YYYY-MM-DD`
- ID ของเนื้อหา CMS (news, assets, rates, faqs, custom pages, page items): **string ที่ client สร้าง** เช่น `1730000000000-ab12cd3`, `page-m1abc-x9z1` → ตรวจด้วย regex `^[A-Za-z0-9_-]{1,100}$`
- ID ของลีด/ใบสมัคร: server สร้าง (GUID) + เลขอ้างอิงที่คนอ่านได้ (เช่น `AA-2026-000042`)
- Pagination (Phase 2): `?page=1&limit=20` → `{ items, total, page, limit }`, `limit` สูงสุด 100

---

## 2. ข้อกำหนดด้านความปลอดภัย (บังคับ)

### 2.1 Transport & Headers
- HTTPS เท่านั้น (redirect HTTP → HTTPS ที่ reverse proxy) + `Strict-Transport-Security: max-age=31536000`
- ทุก response ของ API: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'`, `Referrer-Policy: no-referrer`
- ปิด header ที่เปิดเผยเทคโนโลยี (`Server`, `X-Powered-By`)
- Production: `app.UseExceptionHandler` คืน envelope ทั่วไป — **ไม่ส่ง stack trace**

### 2.2 CORS
```csharp
policy.WithOrigins("https://agileassets.co.th", "https://www.agileassets.co.th", "http://localhost:3001")
      .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
      .WithHeaders("Content-Type", "Authorization", "Accept")
      .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
// ไม่ต้อง AllowCredentials (ใช้ Bearer token ไม่ใช่ cookie)
```
> หน้าบ้านส่ง `Content-Type` เฉพาะ request ที่มี body → `GET /site/public` เป็น simple request ไม่มี preflight (เร็วขึ้น 1 round-trip)
> ถ้าเปลี่ยนโดเมน API ต้องแจ้งหน้าบ้านแก้ `connect-src` ใน CSP (`public/web.config`, `public/.htaccess`, `public/_headers`)

### 2.3 Rate Limiting (ASP.NET `AddRateLimiter`, key = client IP จาก `X-Forwarded-For` ที่เชื่อถือได้)

| กลุ่ม | Limit | หมายเหตุ |
|---|---|---|
| `POST /auth/login` | 5 / นาที / IP และ 10 ครั้งผิด / 15 นาที / username | ครบแล้วล็อก 15 นาที → 429 + `Retry-After` |
| `POST /forms/*`, `POST /careers/apply` | 5 / 10 นาที / IP / endpoint และ 30 / วัน / IP | |
| `GET /site/public` | 120 / นาที / IP | ส่วนใหญ่โดน cache อยู่แล้ว |
| Admin CMS (`PUT/DELETE`) | 600 / นาที / user | **ต้องสูงพอ** — การกด "เผยแพร่" ครั้งเดียวอาจยิงหลายสิบ request พร้อมกัน (หลายหน้า + หลายข่าว) |
| `POST /uploads/images` | 30 / นาที / user | |

### 2.4 กันบอทยิงฟอร์ม (ทุก endpoint ใน §7)
ทุก body มี object `meta`:
```json
"meta": { "captchaToken": "0.xxxx (optional)", "elapsedMs": 8421, "pageUrl": "https://agileassets.co.th/solar-power-generation", "lang": "th" }
```
1. **Cloudflare Turnstile** (เมื่อเปิดใช้ — หน้าบ้านตั้ง `VITE_TURNSTILE_SITE_KEY`): เรียก `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` ด้วย `secret`, `response=meta.captchaToken`, `remoteip` → ไม่ผ่าน = 422 `CAPTCHA_FAILED`
2. **Time-trap**: `elapsedMs < 2500` → บันทึกเป็น spam (`IsSpam = 1`) แต่ **ตอบ 201 ปกติ** (ไม่ให้บอทรู้ว่าโดนจับ) และไม่ส่งอีเมลแจ้งเตือน
3. **Honeypot**: ตรวจที่หน้าบ้าน (ช่องซ่อน `website_url`) — บอทที่กรอกจะไม่ถูกส่งมาเลย
4. Validate `pageUrl` ต้องขึ้นต้นด้วยโดเมนเว็บเรา (ถ้าไม่ใช่ → spam)
5. Content filter: ข้อความมี URL > 3 ลิงก์ หรือคำ spam ที่กำหนด → spam

### 2.5 Input Validation
> ⚠️ Page document (`PUT /pages/{pageId}`) มีข้อยกเว้นของกฎในหัวข้อนี้ — ดู **§2.5.1**

- ทุก field มี max length ตาม §10 (ตรวจทั้งใน DTO ด้วย `[MaxLength]`/FluentValidation และ DB)
- Trim whitespace, ปฏิเสธ control characters
- อีเมล: RFC 5322 แบบพื้นฐาน + max 200; เบอร์โทร: `^[0-9+\-\s]{9,20}$`
- URL ที่แอดมินกรอก (`ctaLink`, `link`, `image`, `href`): อนุญาตเฉพาะ `https://`, `http://`, `mailto:`, `tel:`, path ที่ขึ้นต้นด้วย `/`, หรือ `#anchor` — **ปฏิเสธ `javascript:` / `data:`**
- **HTML จาก Rich Text Editor** (`content`, `content_en`, `contentTh`, `contentEn`): sanitize ฝั่ง server ด้วย [`HtmlSanitizer` (Ganss.Xss)](https://github.com/mganss/HtmlSanitizer) — อนุญาตเฉพาะ `p, br, strong, em, u, s, h2, h3, ul, ol, li, a[href,target,rel], blockquote` (หน้าบ้านใช้ DOMPurify อีกชั้น แต่ server ต้องทำด้วยเสมอ)
- SQL: EF Core / parameterized query เท่านั้น

#### 2.5.1 ข้อยกเว้นสำหรับ Page Document (`PUT /pages/{pageId}`) ⚠️
กฎทั่วไปข้างบนบางข้อ **ทำให้เนื้อหาหน้าเว็บเสีย** ถ้าใช้กับ PageCustomContent ตรงๆ ให้ใช้กฎนี้แทนสำหรับ document นี้:

| กฎทั่วไป | สำหรับ page document | เหตุผล |
|---|---|---|
| Trim whitespace | **ห้าม trim ค่าใดๆ ใน document** | บางข้อความตั้งใจมีช่องว่างท้าย เช่น `"(hereinafter referred to as the "` ที่ต่อด้วยคำตัวหนา — ถ้า trim คำจะติดกัน |
| ปฏิเสธ control characters | **อนุญาต `\n` และ `\r`** (ยังปฏิเสธ control char อื่น) | ฟิลด์หลายบรรทัด เช่น รายการรูปสไลด์ (บรรทัดละ 1 URL), ย่อหน้าบทความ, ผลลัพธ์โครงการ, ตำแหน่งผู้ถือหุ้น — ถ้าปฏิเสธจะบันทึกไม่ได้ (400) |
| Sanitize HTML ใน `contentTh/contentEn` | **เฉพาะ `contentTh` / `contentEn` ระดับบนสุดของ document** — ห้ามแตะค่าใน `sections` | ใน `sections` มี key ชื่อ `contentTh/contentEn` ที่เป็น *ข้อความธรรมดา* (เช่น บทความในหน้า Knowledge) ถ้าผ่าน sanitizer จะถูก encode เป็น `&amp;` แสดงผิดบนเว็บ |
| — | **ห้าม HTML-encode ค่าใน `sections`** เก็บและส่งคืนตามที่ได้รับ | หน้าบ้าน render เป็น text node (React escape ให้แล้ว) |
| ตรวจ URL เฉพาะ key ที่รู้จัก | **ทุก string ใน `sections` และ `blocks`** (แยกตรวจทีละบรรทัดถ้ามี `\n`): ตัด whitespace/control char นำหน้า แล้วถ้าขึ้นต้นด้วย `javascript:` `vbscript:` หรือ `data:` (ไม่สนตัวพิมพ์) → **422** `VALIDATION_ERROR` | `sections` มี URL ใน key หลายชื่อ (`img05`, `link28`, `href`, `url`, `pdfUrl`, `src`, `images`, …) ที่ไปเป็น `href`/`src` — ใช้กฎกลางแทนการไล่ชื่อ key |

ตัวอย่าง C# (ตรวจ `sections` แบบ recursive):
```csharp
static readonly Regex DangerousScheme = new(@"^\s*(javascript|vbscript|data)\s*:", RegexOptions.IgnoreCase | RegexOptions.Compiled);

static bool HasDangerousUrl(JsonElement el) => el.ValueKind switch
{
    JsonValueKind.String => el.GetString()!.Split('\n').Any(line => DangerousScheme.IsMatch(new string(line.Where(c => !char.IsControl(c)).ToArray()))),
    JsonValueKind.Object => el.EnumerateObject().Any(p => HasDangerousUrl(p.Value)),
    JsonValueKind.Array  => el.EnumerateArray().Any(HasDangerousUrl),
    _ => false,
};
```

### 2.6 Authentication & Session
- รหัสผ่าน: **Argon2id** (หรือ BCrypt cost ≥ 12); นโยบาย ≥ 12 ตัวอักษร
- **บัญชีแอดมินเริ่มต้นต้องตั้งรหัสใหม่** — ห้ามใช้ `123456789` บน production (รหัสนี้หลุดอยู่ใน git history แล้ว)
- JWT: HS256 (secret ≥ 256-bit จาก env/Key Vault) หรือ RS256, `exp` = 8 ชั่วโมง, claims: `sub`, `name`, `role`, `jti`, `tv` (token version)
- Logout → บันทึก `jti` ลง `RevokedTokens` จนกว่าจะหมดอายุ; เปลี่ยนรหัสผ่าน → เพิ่ม `Users.TokenVersion` (token เก่าทั้งหมดใช้ไม่ได้)
- Login ผิดตอบ 401 ข้อความเดียวกันทั้ง "ไม่มี user" และ "รหัสผิด" (กัน user enumeration)

### 2.7 Audit Log
บันทึกทุกการกระทำของแอดมิน (publish, delete, upload, ดูรายละเอียด NDA, export) ลง `AuditLogs` พร้อม user, IP, entity, entityId — **ห้ามเก็บ PII ลง log** (ชื่อ/เบอร์/เลขบัตร)

---

## 3. Authentication

### `POST /auth/login` — Public
Request:
```json
{ "username": "marketing", "password": "••••••" }
```
Response 200:
```json
{
  "success": true,
  "data": {
    "user": { "id": "2f1c…", "username": "marketing", "role": "admin", "fullName": "Marketing Admin", "email": "admin@agileassets.co.th" },
    "accessToken": "eyJhbGciOi…",
    "expiresIn": 28800
  }
}
```
Errors: `401 INVALID_CREDENTIALS`, `429 TOO_MANY_ATTEMPTS` (+ `Retry-After`)

> Frontend อ่าน `exp` จาก JWT เพื่อตั้งเวลา auto-logout — **ต้องมี claim `exp`**

### `POST /auth/logout` — Admin
เพิกถอน `jti` ปัจจุบัน → 200 `{ success: true }` (หน้าบ้านเรียกแบบ fire-and-forget)

### `GET /users/me` — Admin *(Phase 2)*
### `PUT /users/me/password` — Admin *(Phase 2)*
```json
{ "currentPassword": "string", "newPassword": "string (≥12)" }
```

---

## 4. Public Site Bootstrap

### `GET /site/public` — Public ⭐ (สำคัญที่สุด)
หน้าบ้านเรียก **ครั้งเดียวตอนเปิดเว็บ** แล้วใช้ข้อมูลนี้แสดงทุกหน้า (`src/services/cmsService.ts → getPublicSite`, timeout 8 วินาที, ถ้าล้มเหลวจะใช้ข้อมูล default ในโค้ด)

Response 200:
```json
{
  "success": true,
  "data": {
    "themeSettings": { "…ThemeSettings" },
    "banner": { "…BannerSettings" },
    "companyInfo": { "…CompanyInfo" },
    "impactStats": { "…ImpactStats" },
    "interestRates": [ "…InterestRate (เรียงตาม sortOrder)" ],
    "news": [ "…NewsItem (เฉพาะที่เผยแพร่, ล่าสุด 100 รายการ)" ],
    "usedMachinery": [ "…UsedMachineryItem (เรียงตาม sortOrder)" ],
    "faqs": [ "…FaqItem (เรียงตาม sortOrder)" ],
    "pageContents": { "home": { "…PageCustomContent" }, "about": { }, "page-m1abc-x9z1": { } },
    "customPages": [ "…CustomPageItem" ]
  }
}
```
- ส่งเฉพาะ section ที่มีข้อมูลใน DB — section ที่ไม่ส่ง หน้าบ้านจะใช้ค่า default ของตัวเอง
- `customFields` **ห้ามส่ง** ใน endpoint นี้ (ข้อมูลภายใน)
- ทุก HTML ต้องผ่าน sanitizer แล้ว (§2.5)

Caching (ดู §12): `Cache-Control: public, max-age=60, stale-while-revalidate=600` + `ETag` (ตอบ 304 เมื่อ `If-None-Match` ตรง) + server memory cache ที่ล้างทันทีเมื่อแอดมินเผยแพร่

### `GET /health` — Public
`200 { "status": "ok", "db": "ok" }` สำหรับ uptime monitor (ไม่ต้องมี envelope, ไม่เปิดเผยรายละเอียดระบบ)

> Endpoint สาธารณะแบบแยกรายการ (`GET /news`, `GET /news/{id}`, `GET /assets`, `GET /faqs`, `GET /rates`, `GET /pages/{pageId}`, `GET /settings/theme`) **หน้าบ้านปัจจุบันไม่ได้เรียก** — ทำเป็น *Phase 2* ได้ถ้าต้องการ SEO pre-render หรือ mobile app

---

## 5. CMS Admin API

ทุก endpoint ในหมวดนี้: **Auth = Admin** (`Authorization: Bearer`), response `Cache-Control: no-store`, ทุกครั้งที่สำเร็จต้อง **invalidate cache ของ `/site/public`** และเขียน `AuditLogs`

แอดมินแก้ไขในหน้า CMS → เห็นพรีวิวทันที (เก็บเป็นแบบร่างในเบราว์เซอร์) → กดปุ่ม **"เผยแพร่"** ที่ header → หน้าบ้านเทียบกับเวอร์ชันที่เผยแพร่ล่าสุด แล้วยิง **เฉพาะ section ที่เปลี่ยน** พร้อมกัน (`Promise.all`) ถ้ามี request ใดล้มเหลว แบบร่างจะยังอยู่และกดเผยแพร่ซ้ำได้ → **ทุก PUT ต้อง idempotent**

| Endpoint | Body | หมายเหตุ |
|---|---|---|
| `PUT /settings/theme` | `ThemeSettings` | single row |
| `PUT /settings/banner` | `BannerSettings` | single row |
| `PUT /settings/company` | `CompanyInfo & { impactStats: ImpactStats }` | single row (รวมสถิติ) |
| `PUT /rates` | `InterestRate[]` | **replace all** ใน transaction, `sortOrder` = ลำดับใน array |
| `PUT /faqs` | `FaqItem[]` | **replace all** ใน transaction |
| `PUT /settings/custom-fields` | `CustomField[]` | replace all |
| `GET /settings/custom-fields` | — | หน้าบ้านโหลดเมื่อแอดมิน login |
| `PUT /settings/custom-pages` | `CustomPageItem[]` | replace all — ตรวจ `path` ไม่ซ้ำ (§9.9) |
| `PUT /news/{id}` | `NewsItem & { sortOrder: number }` | **upsert** (ไม่มี → สร้าง, มี → แก้) |
| `DELETE /news/{id}` | — | 404 ถ้าไม่มี = ถือว่าสำเร็จ (idempotent → ตอบ 200) |
| `PUT /assets/{id}` | `UsedMachineryItem & { sortOrder: number }` | **upsert** |
| `DELETE /assets/{id}` | — | idempotent |
| `PUT /pages/{pageId}` | `PageCustomContent` | upsert JSON document (§9.10) |
| `DELETE /pages/{pageId}` | — | "รีเซ็ตกลับค่าเริ่มต้น" = ลบ document; idempotent |

ตัวอย่าง `PUT /news/1730000000000-ab12cd3`:
```json
{
  "id": "1730000000000-ab12cd3",
  "title": "Agile Assets ร่วมงาน …",
  "title_en": "Agile Assets joins …",
  "excerpt": "…", "excerpt_en": "…",
  "content": "<p>…</p>", "content_en": "<p>…</p>",
  "date": "2026-09-30",
  "pinned": false,
  "category": "Company News",
  "image": "https://api.tunjai.in.th/uploads/news/2026/09/3f2a….webp",
  "sortOrder": 0
}
```
- `id` ใน path กับ body ต้องตรงกัน ไม่งั้น 400
- Response: entity ที่บันทึกแล้ว (มี `imageWidth`/`imageHeight` ถ้ารู้ขนาด)

---

## 6. Image Upload

### `POST /uploads/images` — Admin · `multipart/form-data`
| Field | Type | Rule |
|---|---|---|
| `file` | File | JPEG / PNG / WebP เท่านั้น, ≤ 5 MB |
| `folder` | string | `news` \| `assets` \| `banner` \| `pages` |

ขั้นตอนบังคับ:
1. ตรวจ **magic bytes** (ไม่เชื่อ extension/Content-Type) — ปฏิเสธ SVG, GIF, HEIC → 415
2. Decode + **re-encode เป็น WebP (quality 82)** ด้วย `SixLabors.ImageSharp` — ตัด EXIF/GPS และทำลาย polyglot file ไปในตัว
3. ย่อให้กว้างไม่เกิน 1920px (คงอัตราส่วน)
4. ชื่อไฟล์ = GUID ใหม่ (`/uploads/{folder}/{yyyy}/{MM}/{guid}.webp`) — **ห้ามใช้ชื่อไฟล์จากผู้ใช้**
5. เก็บนอก web root ของโค้ด หรือ Blob Storage; ห้ามให้ execute ได้

Response 201:
```json
{ "success": true, "data": { "url": "https://api.tunjai.in.th/uploads/news/2026/10/6c0e….webp", "width": 1600, "height": 900, "size": 184213 } }
```
> ใช้งานแล้ว: `NewsEditor` (เมื่อ login ผ่าน backend) — editor อื่นยังรับ URL ภายนอก จะเปลี่ยนมาใช้ endpoint นี้ในเฟสถัดไป

---

## 7. Public Forms

**Auth = Public** · Rate limit + กันบอทตาม §2.3–2.4 · ทุก request มี `meta` (§2.4)
หลังบันทึกสำเร็จ: ส่งอีเมลแจ้งทีมขายผ่าน **background queue** (ไม่ทำให้ response ช้า) — อีเมลแจ้งเตือน **ห้ามมีเลขบัตรประชาชน/ลายเซ็น** ให้ใส่แค่เลขอ้างอิง + ลิงก์ไปหน้าแอดมิน

Response มาตรฐาน (201):
```json
{ "success": true, "data": { "id": "c1d2…", "referenceNumber": "INQ-2026-000123", "timestamp": "2026-10-01T04:30:00Z" } }
```

### 7.1 `POST /forms/inquiry` — ฟอร์มสอบถาม/ขอสินเชื่อรายอุตสาหกรรม
ใช้โดย: หน้าแรก (ContactSection), 8 หน้าอุตสาหกรรม, Investor Relations, Sustainability, Asset for Sale
```json
{
  "source": "solar-power-generation",
  "name": "สมชาย ใจดี",
  "phone": "0812345678",
  "email": "somchai@example.com",
  "company": "บริษัท ตัวอย่าง จำกัด",
  "message": "สนใจติดตั้ง Solar Rooftop 250 kWp\nขอรับเอกสาร: Company Profile (PDF)",
  "interestType": "equity",
  "projectType": "solar_water",
  "meta": { "elapsedMs": 9000, "pageUrl": "https://agileassets.co.th/solar-power-generation", "lang": "th" }
}
```
| Field | Rule |
|---|---|
| `source` | required, enum: `home-contact`, `drinking-water-production`, `livestock-farm`, `food-processing`, `biogas-production`, `solar-power-generation`, `chiller`, `injection-molding`, `generator-set`, `investor-relations`, `sustainability`, `asset-for-sale` |
| `name` | required, ≤ 200 |
| `phone` | ≤ 20 — **ต้องมี `phone` หรือ `email` อย่างน้อย 1 อย่าง** |
| `email` | ≤ 200, รูปแบบอีเมล |
| `company` | ≤ 200 |
| `message` | ≤ 5000 (อาจมีบรรทัด "ขอรับเอกสาร: …" เมื่อลูกค้ากดปุ่มขอเอกสาร PDF → ทีมขายต้องส่งไฟล์ให้ทางอีเมล) |
| `interestType` | optional (Investor Relations) ≤ 50 |
| `projectType` | optional (Sustainability) ≤ 50 |

Reference: `INQ-YYYY-NNNNNN`

### 7.2 `POST /forms/contact` — หน้า "ติดต่อเรา"
```json
{ "firstName": "สมชาย", "lastName": "ใจดี", "email": "a@b.com", "subject": "สอบถาม", "message": "…", "meta": { } }
```
`firstName` required ≤100 · `lastName` ≤100 · `email` required ≤200 · `subject` ≤300 · `message` required ≤5000 · Reference: `CT-YYYY-NNNNNN`

### 7.3 `POST /forms/leasing` — ใบสมัครสินเชื่อเช่าซื้อ
```json
{
  "applicantType": "corporate",
  "firstName": "สมชาย", "lastName": "ใจดี",
  "companyName": "บริษัท ตัวอย่าง จำกัด",
  "businessType": "โรงงานน้ำดื่ม",
  "machineInterest": "เครื่องเป่าขวด",
  "address1": "99/1 ถ.สุขุมวิท", "address2": "อาคาร A ชั้น 5",
  "district": "เมือง", "province": "สมุทรปราการ", "postalCode": "10270",
  "phone": "0812345678", "email": "a@b.com",
  "purpose": { "new": true, "replace": false, "other": false },
  "otherDetails": "…",
  "acceptConsent": true,
  "meta": { }
}
```
| Field | Rule |
|---|---|
| `applicantType` | required, `corporate` \| `individual` |
| `companyName` | **required เมื่อ `corporate`**, ≤ 200 |
| `firstName`, `lastName` | required, ≤ 100 |
| `businessType`, `machineInterest` | required, ≤ 200 / ≤ 300 |
| `address1`, `district`, `province` | required (≤ 500 / 100 / 100) |
| `postalCode` | required, `^\d{5}$` |
| `phone` | required, `^[0-9+\-\s]{9,15}$` |
| `email` | required |
| `acceptConsent` | **ต้องเป็น `true`** (หน้าบ้านไม่ติ๊กไว้ล่วงหน้าแล้ว ตาม PDPA) — บันทึก consent version + timestamp + IP |

Reference: `AA-YYYY-NNNNNN`

### 7.4 `POST /forms/nc-nda` — สัญญารักษาความลับ · `multipart/form-data`
| Part | Rule |
|---|---|
| `fullName` | required ≤ 200 |
| `idCard` | required — **เลขบัตรประชาชน 13 หลัก (ตรวจ checksum)** หรือ **พาสปอร์ต `^[A-Z0-9]{6,9}$`** (หน้าบ้านส่งแบบไม่มีช่องว่าง) |
| `email` | required |
| `company` | optional ≤ 200 |
| `phone` | optional ≤ 20 |
| `agreed` | `"true"` เท่านั้น |
| `signatureImage` | PNG จาก canvas, ≤ 500 KB, ตรวจ magic bytes |
| `meta` | JSON string ของ `meta` |

Thai ID checksum (เหมือนหน้าบ้าน):
```csharp
static bool IsValidThaiId(string d) {
    if (!Regex.IsMatch(d, @"^\d{13}$")) return false;
    var sum = 0; for (var i = 0; i < 12; i++) sum += (d[i] - '0') * (13 - i);
    return (11 - sum % 11) % 10 == d[12] - '0';
}
```
Response 201: `{ id, referenceNumber: "NDA-YYYY-NNNNNN", timestamp }` — **ห้ามส่ง idCard กลับใน response**
การจัดเก็บ: ดู §11 (เข้ารหัส, ลายเซ็นเป็น private file)

### 7.5 `POST /forms/newsletter` — ขอรับจดหมายข่าว
```json
{ "email": "a@b.com", "name": "(optional)", "company": "(optional)", "meta": { } }
```
- อีเมลซ้ำ → ตอบ 201 เหมือนเดิม (ไม่เปิดเผยว่ามีในระบบแล้ว)
- ส่งอีเมลลิงก์ Newsletter ฉบับล่าสุด + ลิงก์ยกเลิกรับ (unsubscribe token)

### 7.6 `POST /careers/apply` — สมัครงาน
```json
{
  "fullName": "string ≤200 (required)", "email": "required", "phone": "required ≤20",
  "positionId": "job-credit-bd", "positionTitle": "string ≤300",
  "experienceYears": "2-5 ปี", "expectedSalary": "string ≤100",
  "resumeUrl": "https://… (ต้องเป็น https:// เท่านั้น ≤1000)",
  "coverLetter": "≤5000",
  "meta": { }
}
```
Reference: `JOB-YYYY-NNNNNN`

---

## 8. Admin: จัดการลีด / ใบสมัคร (Phase 2)

> หน้าบ้าน **ยังไม่มี UI** สำหรับส่วนนี้ — ในเฟสแรกให้ทีมขายรับแจ้งเตือนทางอีเมล (§7) ก่อน
> `careerService.getApplications` / `updateStatus` มีในโค้ดหน้าบ้านแล้ว

| Method | Endpoint | หมายเหตุ |
|---|---|---|
| GET | `/admin/leads?type=inquiry\|contact\|leasing\|newsletter&status=&search=&page=&limit=` | รวมลีดทุกประเภท, `IsSpam=0` เป็นค่าเริ่มต้น |
| PATCH | `/admin/leads/{type}/{id}` | `{ status: "new\|contacted\|qualified\|closed\|spam", note }` |
| GET | `/admin/leads/export?type=&from=&to=` | CSV (audit log ทุกครั้ง) |
| GET | `/admin/nda-submissions?page=&limit=&search=` | แสดง idCard แบบ mask (`•••••••••1234`) |
| GET | `/admin/nda-submissions/{id}` | ถอดรหัส idCard + signed URL ลายเซ็น (หมดอายุ 5 นาที) — audit log |
| GET | `/careers/applications` | `{ items, total, page, limit }` |
| PATCH | `/careers/applications/{id}/status` | `{ status: "pending\|reviewing\|interview\|accepted\|rejected", notes }` |

---

## 9. Data Models (JSON)

> ตรงกับ `src/types/index.ts` — ถ้าแก้ type ฝั่งหน้าบ้าน ต้องแก้ตารางนี้ด้วย

### 9.1 ThemeSettings
```ts
{ primaryColor: "#0284c7", gradientStart: "#0284c7", gradientEnd: "#0369a1", buttonTextColor: "#ffffff",
  buttonRadius: "rounded-md" | "rounded-xl" | "rounded-2xl" | "rounded-full",
  buttonStyle: "gradient" | "solid" | "glow", accentColor: "#38bdf8" }
```
สีทุกช่อง validate `^#[0-9a-fA-F]{6}$`

### 9.2 BannerSettings
`{ headline ≤200, subheadline ≤1000, ctaText ≤100, ctaLink ≤500 (URL rule §2.5) }`

### 9.3 CompanyInfo + ImpactStats
```ts
CompanyInfo { name ≤300, phone ≤100, email ≤200, address ≤1000, description ≤5000,
              lineId? ≤100, facebook? ≤500, mapUrl? ≤1000, operatingHours? ≤200 }
ImpactStats { factoriesServed ≤50, totalCreditValueMB ≤50, totalContractsCount ≤50, customerSatisfactionPct? ≤50 }
```

### 9.4 InterestRate
`{ id, product ≤300, rate: number(0–100, 2 ตำแหน่ง), term ≤100, featured: boolean, description ≤1000 }`

### 9.5 NewsItem
`{ id, title ≤500, title_en ≤500, excerpt ≤1000, excerpt_en ≤1000, content (HTML), content_en (HTML), date "YYYY-MM-DD", pinned: boolean, category ≤100, image? ≤1000 }`
category ที่หน้าบ้านใช้: `FINANCE`, `NEWS`, `Market Analysis`, `Company News`, `Education`

### 9.6 UsedMachineryItem
`{ id, title ≤500, title_en? ≤500, category ≤200, price ≤100, year ≤10, condition ≤500, description ≤5000, image ≤1000, status: "available" | "reserved" | "sold" }`

### 9.7 FaqItem
`{ id, question ≤1000, question_en? ≤1000, answer ≤5000, answer_en? ≤5000, category ≤200 }`

### 9.8 CustomField
`{ id, label ≤300, type: "text" | "number" | "date" | "boolean" | "url", value ≤4000, campaign ≤200 }`

### 9.9 CustomPageItem (หน้าที่แอดมินสร้างด้วยปุ่ม "เพิ่มหน้า")
`{ id ("page-…"), groupId ≤100, nameTh ≤200, nameEn ≤200, path ≤200, createdAt? }`
- `path` regex `^/[a-z0-9-]+(/[a-z0-9-]+)*$`, ห้ามซ้ำกัน, ห้ามเป็น `/` หรือขึ้นต้นด้วย `/management-portal` → 409 `PATH_CONFLICT`
- เนื้อหาของหน้าเก็บใน `PageContents` ด้วย `pageId = id`

### 9.10 PageCustomContent (เก็บเป็น JSON document)
pageId ที่หน้าบ้านใช้จริง:

| pageId | URL หลัก |
|---|---|
| `home` | `/` |
| `about` | `/about` |
| `drinking-water` | `/drinking-water-production` |
| `livestock-farm` | `/livestock-farm` |
| `food-processing` | `/food-processing` |
| `biogas-production` | `/biogas-production` |
| `solar-power` | `/solar-power-generation` |
| `chiller` | `/chiller` |
| `injection-molding` | `/injection-molding-machine` |
| `generator-set` | `/generator-set` |
| `investor-relations` | `/investor-relations` |
| `sustainability` | `/sustainability` |
| `projects` | `/project` (alias `/project-activity`) |
| `contact` | `/contact` |
| `calculator` | `/calculator` |
| `interest-rate` | `/interest-rate-conversion` |
| `nc-nda` | `/nc-nda` |
| `cookie-policy` | `/cookie-policy` |
| `work-for-us` | `/work-for-us` |
| `faq` | `/faq` — *ใหม่* (รายการคำถามยังอยู่ที่ `PUT /faqs` เดิม) |
| `news` | `/news-update` — *ใหม่* (ตัวข่าวยังอยู่ที่ `/news` เดิม) |
| `knowledge` | `/knowledge` — *ใหม่* |
| `newsletter` | `/newsletter` — *ใหม่* |
| `leasing-application` | `/leasing-application` — *ใหม่* |
| `used-machine` | `/used-machine` — *ใหม่* (รายการทรัพย์ยังอยู่ที่ `/assets` เดิม) |
| `page-*` | หน้าที่แอดมินสร้างเอง (path ใน CustomPages) |

> ตรวจรูปแบบ `pageId` ด้วย `^[a-z0-9-]{1,100}$` แทนการ whitelist ชื่อ — หน้าบ้านเพิ่มหน้าได้โดยไม่ต้องแก้ backend

ฟิลด์ (ทั้งหมด optional ยกเว้นที่ระบุ — ฝั่ง server **ต้องเก็บฟิลด์ที่ไม่รู้จักไว้ด้วย** เพราะหน้าบ้านเพิ่มฟิลด์ใหม่ได้โดยไม่ต้องแก้ backend):
```ts
{
  id, pageName, titleTh, titleEn?, sectionTitleTh?, sectionTitleEn?, sectionSubtitleTh?, sectionSubtitleEn?,
  metaTitle? ≤200, metaDescription? ≤500,
  heroBadgeTh?, heroBadgeEn?, heroTitleTh, heroTitleEn?, heroSubtitleTh, heroSubtitleEn?, heroImage?,
  ctaTextTh?, ctaTextEn?, ctaLink?,
  contentTh? (HTML), contentEn? (HTML),
  items?: PageSectionItem[],
  solutionsBadgeTh?, solutionsBadgeEn?, solutionsTitleTh?, solutionsTitleEn?, solutionsSubtitleTh?, solutionsSubtitleEn?, solutionsItems?: PageSectionItem[],
  machineryBadgeTh?, machineryBadgeEn?, machineryTitleTh?, machineryTitleEn?, machinerySubtitleTh?, machinerySubtitleEn?, machineryItems?: PageSectionItem[],
  whatWeDoBadgeTh?, whatWeDoBadgeEn?, whatWeDoTitleTh?, whatWeDoTitleEn?, whatWeDoSubtitleTh?, whatWeDoSubtitleEn?, whatWeDoImage?, whatWeDoItems?: PageSectionItem[],
  sections?: Record<string, PageSectionContent>,   // ใหม่ — ดู §9.10.1
  blocks?: PageBlock[],                              // ใหม่ — เฉพาะหน้า page-* ดู §9.10.2
  lastUpdated?
}
PageSectionItem { id, title, titleEn?, subTitle?, subTitleEn?, description, descEn?, badge?, icon?, image?, link?, quote?, quoteEn?, btnText?, btnTextEn? }
```
Server-side validation ของ document: ขนาดรวม ≤ 512 KB, sanitize HTML เฉพาะ `contentTh` / `contentEn` **ระดับบนสุด**, ตรวจ URL rule กับ `*Image`, `image`, `link`, `ctaLink` ระดับบนสุด และทุก string ใน `sections` / `blocks` — **ข้อยกเว้นเรื่อง trim / ขึ้นบรรทัดใหม่ / encode ดู §2.5.1 (ใช้กับ `blocks` ด้วย)**

#### 9.10.1 `sections` — เนื้อหาส่วนอื่นๆ ของหน้า (ใหม่)
ทุกส่วนของหน้าเว็บที่ไม่ใช่ Hero/SEO (หัวข้อแต่ละ section, การ์ด, รายการ, ปุ่ม, รูป, ลิงก์, ข้อความในฟอร์ม) เก็บอยู่ใน `sections` โดยหน้าบ้านเป็นผู้กำหนดว่ามี section/ฟิลด์อะไรบ้าง (schema อยู่ใน `src/data/pageSections/*.ts` ฝั่งหน้าบ้าน) — **backend ไม่ต้องรู้จักชื่อ section หรือชื่อฟิลด์ใดๆ** แค่เก็บและส่งคืนให้ครบ

```ts
sections?: {
  [sectionId: string]: {            // เช่น "benefits", "jobs", "faq", "hero-extras"
    hidden?: boolean,                     // true = แอดมินซ่อนส่วนนี้จากหน้าเว็บ (ข้อมูลยังอยู่ เปิดกลับได้)
    fields?: { [key: string]: string },   // ข้อความ/URL ระดับ section เช่น titleTh, titleEn, img05, link28
    items?:  { [key: string]: string }[]  // รายการการ์ด เรียงตามลำดับที่แสดง; ทุก item มี "id"
  }
}
```
กฎ:
- **ค่าใน `fields` และ `items` เป็น `string` ทั้งหมด** (ตัวเลขก็ส่งมาเป็น string) — ห้ามแปลงชนิด; ข้อยกเว้นเดียวคือ `hidden` ซึ่งเป็น `boolean` ระดับ section
- `hidden` ไม่มี หรือ `false` = แสดงตามปกติ; ต้องเก็บ `hidden: true` ไว้เสมอ (ถ้า server ตัด `hidden: false` ทิ้งได้ ผลเท่ากัน)
- **`items: []` (อาร์เรย์ว่าง) = แอดมินตั้งใจลบรายการทั้งหมด** ต้องเก็บเป็นอาร์เรย์ว่าง ห้ามแปลงเป็น `null` หรือตัด key ทิ้ง (ถ้าไม่มี key `items` หน้าบ้านจะใช้ค่าเริ่มต้น)
- ลำดับใน `items` คือลำดับที่แสดงบนเว็บ ต้องคงไว้ตามที่ได้รับ
- ค่าอาจมี `\n` (ฟิลด์หลายบรรทัด) และช่องว่างหน้า/ท้าย — ห้าม trim / ห้าม encode (§2.5.1)
- `GET /site/public` ส่งคืน `sections` ตามที่เก็บไว้ทุกตัวอักษร

ตัวอย่าง (ย่อจากหน้า `work-for-us`):
```json
{
  "id": "work-for-us",
  "heroTitleTh": "ร่วมงานกับ Agile Assets",
  "sections": {
    "benefits": {
      "fields": { "titleTh": "ทำงานกับ Agile ได้อะไรบ้าง?", "titleEn": "What You Get: Benefits & Perks" },
      "items": [
        { "id": "b1", "icon": "DollarSign", "titleTh": "ผลตอบแทน & โบนัสตามผลงาน", "titleEn": "Competitive Salary & Bonus", "descTh": "…", "descEn": "…" }
      ]
    },
    "jobs": {
      "fields": { "applyBtnTh": "สมัครตำแหน่งนี้", "applyBtnEn": "Apply Now" },
      "items": [
        { "id": "job-credit-bd", "department": "sales", "type": "Hybrid", "titleTh": "เจ้าหน้าที่บริหารงานลูกค้าและสินเชื่อธุรกิจ", "titleEn": "Commercial Credit & BD Specialist" }
      ]
    },
    "departments": { "items": [] },
    "process": { "hidden": true, "fields": { "titleTh": "4 ขั้นตอนการคัดเลือก", "titleEn": "Our 4-Step Hiring Process" }, "items": [] }
  }
}
```
(`departments.items: []` = ลบแท็บกรองทั้งหมด, `process.hidden: true` = ซ่อนส่วนขั้นตอนคัดเลือกทั้งส่วน)

**สำหรับ ASP.NET Core:** ถ้ารับ body ด้วย class DTO ธรรมดา `System.Text.Json` จะ **ทิ้ง `sections` และฟิลด์ที่ไม่รู้จักเงียบๆ** → แอดมินกดบันทึกแล้วเนื้อหาหาย ต้องเลือกอย่างใดอย่างหนึ่ง:
- รับเป็น `JsonElement` / `JsonDocument` ทั้งก้อน แล้วเก็บ raw JSON ลงคอลัมน์ `Document` (แนะนำ — ตรงกับ §10), หรือ
- ใส่ `[JsonExtensionData] public Dictionary<string, JsonElement>? Extra { get; set; }` ใน DTO

ขนาดโดยประมาณ (วัดจากค่าเริ่มต้นจริง): document ใหญ่สุด (`nc-nda`, `work-for-us`, `investor-relations`, `knowledge`) ≈ 22–27 KB ต่อหน้า — ต่ำกว่าลิมิต 512 KB มาก; ถ้าบันทึกครบทุกหน้า `pageContents` ทั้งหมดรวม ≈ 250 KB raw / ≈ 57 KB gzip / ≈ 42 KB brotli

#### 9.10.2 `blocks` — Page Builder สำหรับหน้าที่แอดมินสร้างเอง (ใหม่)
หน้า `page-*` (สร้างจากปุ่ม "เพิ่มหน้า") ใช้ `blocks` แทน `items`/`contentTh`: แอดมินเลือกบล็อกจากคลัง เพิ่ม ลบ ทำสำเนา สลับลำดับ และซ่อนได้ หน้าเว็บแสดงบล็อกเรียงตามลำดับในอาร์เรย์ ต่อจากส่วน Hero

```ts
PageBlock {
  id: string,                            // client สร้าง เช่น "blk-m1abc-x9z1" — ไม่ซ้ำภายในหน้า
  type: string,                          // ชนิดบล็อก (ดูตารางล่าง) — ชนิดที่หน้าบ้านไม่รู้จักจะถูกข้ามตอนแสดงผล
  hidden?: boolean,
  fields?: { [key: string]: string },    // รูปแบบเดียวกับ sections (§9.10.1)
  items?:  { [key: string]: string }[]
}
```

| `type` | ชื่อในหลังบ้าน | ฟิลด์หลัก (ข้อมูลอ้างอิง — backend ไม่ต้องตรวจ) |
|---|---|---|
| `text` | ข้อความ / บทความ | `badge*`, `title*`, `body*` (หลายบรรทัด = หลายย่อหน้า) |
| `cards` | การ์ดไอคอน | `badge* title* subtitle* columns` + items `icon title* desc*` |
| `image-cards` | การ์ดรูปภาพ | `badge* title* subtitle* columns` + items `image badge* title* subtitle* desc* btn* link` |
| `image-text` | รูปคู่ข้อความ | `badge* title* body* image imagePosition btn* btnLink` |
| `stats` | แถบตัวเลขสถิติ | `title*` + items `value label*` |
| `steps` | ขั้นตอน | `badge* title*` + items `step title* desc*` |
| `faq` | คำถามที่พบบ่อย | `title*` + items `q* a*` |
| `gallery` | แกลเลอรีรูปภาพ | `title* columns` + items `image caption*` |
| `cta` | แบนเนอร์ชวนติดต่อ | `title* subtitle* btn* btnLink` |

(`*` = มีคู่ `Th`/`En` เช่น `titleTh`, `titleEn`)

กฎฝั่ง server:
- **เก็บและส่งคืน `blocks` ตามที่ได้รับ** — ลำดับอาร์เรย์คือลำดับบนหน้าเว็บ ห้ามเรียงใหม่; ห้ามตรวจ/จำกัด `type` (หน้าบ้านเพิ่มชนิดบล็อกใหม่ได้โดยไม่ต้องแก้ backend)
- ใช้กฎ §2.5.1 ทั้งหมดกับ `blocks` (ไม่ trim, อนุญาต `\n`, ไม่ encode, ตรวจ scheme อันตรายทุก string)
- `blocks: []` = หน้าแสดงเฉพาะ Hero (ต้องเก็บเป็นอาร์เรย์ว่าง); ไม่มี key `blocks` = หน้าเก่าที่สร้างก่อนมี Page Builder หน้าบ้านจะแสดงแบบเดิม (Hero + `items` + CTA)
- จำกัดจำนวน: `blocks` ≤ 50 บล็อกต่อหน้า, `items` ≤ 100 ต่อบล็อก (เกิน → 422) — นอกจากนี้ใช้ลิมิตขนาด document 512 KB เดิม

ตัวอย่าง:
```json
{
  "id": "page-m1abc-x9z1",
  "heroTitleTh": "สินเชื่อโซลาร์ลอยน้ำ",
  "blocks": [
    { "id": "blk-1", "type": "text", "fields": { "titleTh": "ทำไมต้องโซลาร์ลอยน้ำ", "titleEn": "Why Floating Solar", "bodyTh": "ย่อหน้าที่ 1\nย่อหน้าที่ 2", "bodyEn": "Paragraph 1\nParagraph 2" } },
    { "id": "blk-2", "type": "faq", "hidden": true, "fields": { "titleTh": "คำถามที่พบบ่อย", "titleEn": "FAQ" }, "items": [ { "id": "q1", "qTh": "…", "qEn": "…", "aTh": "…", "aEn": "…" } ] },
    { "id": "blk-3", "type": "cta", "fields": { "titleTh": "พร้อมเริ่มต้นหรือยัง?", "titleEn": "Ready?", "btnTh": "ขอสินเชื่อ", "btnEn": "Apply", "btnLink": "/leasing-application" } }
  ]
}
```

---

## 10. Database Schema (SQL Server DDL)

```sql
-- ===== Identity =====
CREATE TABLE Users (
    Id              UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Username        NVARCHAR(100)  NOT NULL UNIQUE,
    PasswordHash    NVARCHAR(500)  NOT NULL,           -- Argon2id
    Role            NVARCHAR(50)   NOT NULL DEFAULT 'admin',
    FullName        NVARCHAR(300)  NULL,
    Email           NVARCHAR(200)  NULL,
    IsActive        BIT            NOT NULL DEFAULT 1,
    TokenVersion    INT            NOT NULL DEFAULT 0,
    FailedLogins    INT            NOT NULL DEFAULT 0,
    LockedUntil     DATETIMEOFFSET NULL,
    MustChangePassword BIT         NOT NULL DEFAULT 1,
    CreatedAt       DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt       DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE RevokedTokens (
    Jti        NVARCHAR(64)   NOT NULL PRIMARY KEY,
    ExpiresAt  DATETIMEOFFSET NOT NULL                -- job ลบแถวที่หมดอายุทุกวัน
);

-- ===== Single-row settings (Id = 1 เสมอ) =====
CREATE TABLE SiteSettings (
    [Key]      NVARCHAR(50)   NOT NULL PRIMARY KEY,   -- 'theme' | 'banner' | 'company' | 'customPages' | 'customFields'
    JsonValue  NVARCHAR(MAX)  NOT NULL CHECK (ISJSON(JsonValue) = 1),
    UpdatedAt  DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy  UNIQUEIDENTIFIER NULL REFERENCES Users(Id)
);
-- เหตุผล: theme/banner/company/customPages/customFields เป็น object เล็กที่ถูกแทนทั้งก้อนเสมอ
-- (ถ้าทีมต้องการ typed table ก็ได้ แต่ JSON ทำให้เพิ่มฟิลด์ได้โดยไม่ migrate)

-- ===== Collections =====
CREATE TABLE InterestRates (
    Id          NVARCHAR(100) NOT NULL PRIMARY KEY,
    Product     NVARCHAR(300) NOT NULL,
    Rate        DECIMAL(5,2)  NOT NULL CHECK (Rate BETWEEN 0 AND 100),
    Term        NVARCHAR(100) NOT NULL,
    Featured    BIT           NOT NULL DEFAULT 0,
    Description NVARCHAR(1000) NOT NULL DEFAULT '',
    SortOrder   INT           NOT NULL DEFAULT 0,
    UpdatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE News (
    Id          NVARCHAR(100) NOT NULL PRIMARY KEY,
    Title       NVARCHAR(500) NOT NULL,
    TitleEn     NVARCHAR(500) NOT NULL DEFAULT '',
    Excerpt     NVARCHAR(1000) NOT NULL DEFAULT '',
    ExcerptEn   NVARCHAR(1000) NOT NULL DEFAULT '',
    Content     NVARCHAR(MAX) NOT NULL DEFAULT '',     -- sanitized HTML
    ContentEn   NVARCHAR(MAX) NOT NULL DEFAULT '',
    [Date]      DATE          NOT NULL,
    Pinned      BIT           NOT NULL DEFAULT 0,
    Category    NVARCHAR(100) NOT NULL,
    Image       NVARCHAR(1000) NULL,
    ImageWidth  INT NULL, ImageHeight INT NULL,
    SortOrder   INT           NOT NULL DEFAULT 0,
    CreatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_News_Pinned_Date ON News (Pinned DESC, [Date] DESC);

CREATE TABLE UsedMachinery (
    Id          NVARCHAR(100) NOT NULL PRIMARY KEY,
    Title       NVARCHAR(500) NOT NULL,
    TitleEn     NVARCHAR(500) NULL,
    Category    NVARCHAR(200) NOT NULL,
    Price       NVARCHAR(100) NOT NULL,
    [Year]      NVARCHAR(10)  NOT NULL,
    Condition   NVARCHAR(500) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Image       NVARCHAR(1000) NOT NULL,
    ImageWidth  INT NULL, ImageHeight INT NULL,
    Status      NVARCHAR(20)  NOT NULL CHECK (Status IN ('available','reserved','sold')),
    SortOrder   INT           NOT NULL DEFAULT 0,
    CreatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_UsedMachinery_Sort ON UsedMachinery (SortOrder);

CREATE TABLE Faqs (
    Id          NVARCHAR(100) NOT NULL PRIMARY KEY,
    Question    NVARCHAR(1000) NOT NULL,
    QuestionEn  NVARCHAR(1000) NULL,
    Answer      NVARCHAR(MAX) NOT NULL,
    AnswerEn    NVARCHAR(MAX) NULL,
    Category    NVARCHAR(200) NOT NULL,
    SortOrder   INT           NOT NULL DEFAULT 0,
    UpdatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE PageContents (
    PageId     NVARCHAR(100)  NOT NULL PRIMARY KEY,
    Document   NVARCHAR(MAX)  NOT NULL CHECK (ISJSON(Document) = 1),   -- PageCustomContent ทั้งก้อน
    UpdatedAt  DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy  UNIQUEIDENTIFIER NULL REFERENCES Users(Id)
);

CREATE TABLE Uploads (
    Id          UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Folder      NVARCHAR(20)  NOT NULL,
    StoragePath NVARCHAR(500) NOT NULL,
    PublicUrl   NVARCHAR(1000) NOT NULL,
    Width INT NOT NULL, Height INT NOT NULL, SizeBytes INT NOT NULL,
    UploadedBy  UNIQUEIDENTIFIER NOT NULL REFERENCES Users(Id),
    CreatedAt   DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

-- ===== Leads (คอลัมน์ร่วม: ReferenceNumber, Status, IsSpam, ข้อมูลบริบท) =====
CREATE TABLE Inquiries (
    Id              UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ReferenceNumber NVARCHAR(30)  NOT NULL UNIQUE,
    Source          NVARCHAR(50)  NOT NULL,
    Name            NVARCHAR(200) NOT NULL,
    Phone           NVARCHAR(20)  NULL,
    Email           NVARCHAR(200) NULL,
    Company         NVARCHAR(200) NULL,
    Message         NVARCHAR(MAX) NULL,
    InterestType    NVARCHAR(50)  NULL,
    ProjectType     NVARCHAR(50)  NULL,
    Status          NVARCHAR(20)  NOT NULL DEFAULT 'new',
    AdminNote       NVARCHAR(2000) NULL,
    IsSpam          BIT           NOT NULL DEFAULT 0,
    PageUrl         NVARCHAR(500) NULL,
    Lang            NVARCHAR(2)   NULL,
    ElapsedMs       INT           NULL,
    IpAddress       VARBINARY(16) NULL,                 -- เก็บแบบ binary; ลบหลัง 90 วัน
    UserAgent       NVARCHAR(500) NULL,
    CreatedAt       DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_Inquiries_Contact CHECK (Phone IS NOT NULL OR Email IS NOT NULL)
);
CREATE INDEX IX_Inquiries_Created ON Inquiries (IsSpam, CreatedAt DESC);

CREATE TABLE ContactSubmissions (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ReferenceNumber NVARCHAR(30) NOT NULL UNIQUE,
    FirstName NVARCHAR(100) NOT NULL, LastName NVARCHAR(100) NULL,
    Email NVARCHAR(200) NOT NULL, Subject NVARCHAR(300) NULL, Message NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'new', AdminNote NVARCHAR(2000) NULL, IsSpam BIT NOT NULL DEFAULT 0,
    PageUrl NVARCHAR(500) NULL, Lang NVARCHAR(2) NULL, ElapsedMs INT NULL, IpAddress VARBINARY(16) NULL, UserAgent NVARCHAR(500) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE LeasingApplications (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ReferenceNumber NVARCHAR(30) NOT NULL UNIQUE,         -- AA-2026-000042
    ApplicantType NVARCHAR(20) NOT NULL CHECK (ApplicantType IN ('corporate','individual')),
    FirstName NVARCHAR(100) NOT NULL, LastName NVARCHAR(100) NOT NULL,
    CompanyName NVARCHAR(200) NULL, BusinessType NVARCHAR(200) NOT NULL, MachineInterest NVARCHAR(300) NOT NULL,
    Address1 NVARCHAR(500) NOT NULL, Address2 NVARCHAR(500) NULL,
    District NVARCHAR(100) NOT NULL, Province NVARCHAR(100) NOT NULL, PostalCode CHAR(5) NOT NULL,
    Phone NVARCHAR(20) NOT NULL, Email NVARCHAR(200) NOT NULL,
    PurposeNew BIT NOT NULL, PurposeReplace BIT NOT NULL, PurposeOther BIT NOT NULL, OtherDetails NVARCHAR(1000) NULL,
    ConsentVersion NVARCHAR(20) NOT NULL, ConsentAt DATETIMEOFFSET NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending', AdminNote NVARCHAR(2000) NULL, IsSpam BIT NOT NULL DEFAULT 0,
    PageUrl NVARCHAR(500) NULL, Lang NVARCHAR(2) NULL, ElapsedMs INT NULL, IpAddress VARBINARY(16) NULL, UserAgent NVARCHAR(500) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(), UpdatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE NdaSubmissions (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ReferenceNumber NVARCHAR(30) NOT NULL UNIQUE,         -- NDA-2026-000123
    FullName NVARCHAR(200) NOT NULL,
    IdentityType NVARCHAR(10) NOT NULL CHECK (IdentityType IN ('thai_id','passport')),
    IdentityEncrypted VARBINARY(256) NOT NULL,            -- AES-256-GCM (nonce+ciphertext+tag)
    IdentityHash BINARY(32) NOT NULL,                     -- HMAC-SHA256 สำหรับค้นหา
    IdentityLast4 NCHAR(4) NOT NULL,
    Email NVARCHAR(200) NOT NULL, Company NVARCHAR(200) NULL, Phone NVARCHAR(20) NULL,
    SignatureBlobPath NVARCHAR(500) NOT NULL,             -- private storage, ไม่มี public URL
    AgreementVersion NVARCHAR(20) NOT NULL, AgreedAt DATETIMEOFFSET NOT NULL,
    IsSpam BIT NOT NULL DEFAULT 0, IpAddress VARBINARY(16) NULL, UserAgent NVARCHAR(500) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_Nda_IdentityHash ON NdaSubmissions (IdentityHash);

CREATE TABLE NewsletterSubscribers (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Email NVARCHAR(200) NOT NULL UNIQUE, Name NVARCHAR(200) NULL, Company NVARCHAR(200) NULL,
    UnsubscribeToken CHAR(43) NOT NULL UNIQUE, UnsubscribedAt DATETIMEOFFSET NULL,
    ConsentAt DATETIMEOFFSET NOT NULL, CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE JobApplications (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ReferenceNumber NVARCHAR(30) NOT NULL UNIQUE,
    FullName NVARCHAR(200) NOT NULL, Email NVARCHAR(200) NOT NULL, Phone NVARCHAR(20) NOT NULL,
    PositionId NVARCHAR(100) NULL, PositionTitle NVARCHAR(300) NULL,
    ExperienceYears NVARCHAR(50) NULL, ExpectedSalary NVARCHAR(100) NULL,
    ResumeUrl NVARCHAR(1000) NULL, CoverLetter NVARCHAR(MAX) NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (Status IN ('pending','reviewing','interview','accepted','rejected')),
    Notes NVARCHAR(MAX) NULL, IsSpam BIT NOT NULL DEFAULT 0,
    IpAddress VARBINARY(16) NULL, CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

-- ===== Audit =====
CREATE TABLE AuditLogs (
    Id BIGINT IDENTITY PRIMARY KEY,
    UserId UNIQUEIDENTIFIER NULL REFERENCES Users(Id),
    Action NVARCHAR(50) NOT NULL,          -- PUBLISH | DELETE | UPLOAD | VIEW_NDA | EXPORT | LOGIN | LOGIN_FAILED
    Entity NVARCHAR(50) NOT NULL,
    EntityId NVARCHAR(100) NULL,
    IpAddress VARBINARY(16) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_Audit_Created ON AuditLogs (CreatedAt DESC);
```

Seed แอดมิน (รหัสชั่วคราว **สุ่มใหม่ตอน deploy** และ `MustChangePassword = 1`):
```sql
INSERT INTO Users (Username, PasswordHash, Role, FullName, Email, MustChangePassword)
VALUES (N'marketing', N'<argon2id-hash-of-random-temp-password>', N'admin', N'Marketing Admin', N'admin@agileassets.co.th', 1);
```

---

## 11. PDPA & การจัดการข้อมูลส่วนบุคคล

| ข้อมูล | ระดับ | การจัดการ |
|---|---|---|
| เลขบัตรประชาชน / พาสปอร์ต (NDA) | **อ่อนไหวสูง** | เข้ารหัส AES-256-GCM ระดับแอป (key ใน Key Vault, แยกจาก DB) + HMAC สำหรับค้นหา + แสดงผลแบบ mask; ถอดรหัสได้เฉพาะหน้า detail ของแอดมิน + audit log ทุกครั้ง |
| ลายเซ็น (NDA) | อ่อนไหวสูง | private blob container, เข้าถึงผ่าน signed URL อายุ 5 นาทีเท่านั้น |
| ชื่อ เบอร์ อีเมล ที่อยู่ (ลีด) | ส่วนบุคคล | เข้าถึงได้เฉพาะ role admin; export ต้อง audit |
| IP / User-Agent | ส่วนบุคคล | ใช้กันสแปมเท่านั้น, **ลบอัตโนมัติหลัง 90 วัน** |

- **Consent**: ใบสมัครสินเชื่อ/NDA/Newsletter เก็บ `ConsentVersion`/`AgreementVersion` + เวลา — เมื่อแก้ข้อความนโยบายให้เปลี่ยน version
- **Retention** (เสนอ — ให้ฝ่ายกฎหมายยืนยัน): ลีดที่ไม่เป็นลูกค้า 2 ปี; NDA ตามอายุสัญญา + 5 ปี; สแปม 30 วัน; ใบสมัครงานที่ไม่ผ่าน 1 ปี → scheduled job ลบ/anonymize
- **สิทธิเจ้าของข้อมูล**: ต้องมีขั้นตอน (อย่างน้อยแบบ manual ผ่านแอดมิน) สำหรับขอดู/แก้/ลบข้อมูลภายใน 30 วัน
- อีเมลแจ้งเตือนภายใน **ห้ามแนบข้อมูลอ่อนไหว**
- Backup ของ DB ต้องเข้ารหัสเช่นกัน

---

## 12. Performance Requirements

### 12.1 `/site/public` (หน้าแรกรอ endpoint นี้)
- Server memory cache (`IMemoryCache`) ของ response ที่ serialize แล้ว → ล้างเมื่อมี PUT/DELETE ใน §5
- `ETag` = hash ของ payload; รองรับ `If-None-Match` → 304
- `Cache-Control: public, max-age=60, stale-while-revalidate=600` (ถ้ามี CDN หน้า API ใช้ `s-maxage=60`)
- เป้าหมาย: TTFB < 150 ms (cache hit), payload หลังบีบอัด < 150 KB (เดิม 80 KB — ปรับเพราะ `pageContents.*.sections` เมื่อแอดมินบันทึกครบทุกหน้าเพิ่มราว 60 KB หลังบีบอัด, §9.10.1) — **ต้องเปิด Brotli** (§12.2) ซึ่งเล็กกว่า gzip ~25% สำหรับข้อความไทย
- `news` ส่งล่าสุดไม่เกิน 100 รายการ

### 12.2 Compression
```csharp
builder.Services.AddResponseCompression(o => {
    o.EnableForHttps = true;
    o.Providers.Add<BrotliCompressionProvider>();
    o.Providers.Add<GzipCompressionProvider>();
});
builder.Services.Configure<BrotliCompressionProviderOptions>(o => o.Level = CompressionLevel.Fastest);
app.UseResponseCompression();   // ก่อน UseRouting
```

### 12.3 Cache-Control
| Resource | Header |
|---|---|
| `GET /site/public` | `public, max-age=60, stale-while-revalidate=600` + ETag |
| Admin endpoints / forms | `no-store` |
| `/uploads/**` (ชื่อไฟล์เป็น GUID ไม่ซ้ำ) | `public, max-age=31536000, immutable` |

### 12.4 อื่นๆ
- รูปที่อัปโหลดคืน `width/height` → หน้าบ้านใส่ใน `<img>` กัน layout shift
- งานส่งอีเมล/ประมวลผลรูปหนักๆ ใช้ background queue (`Channel<T>` + `BackgroundService` หรือ Hangfire)
- Connection pooling + `AsNoTracking()` สำหรับ query อ่านอย่างเดียว
- Timeout ฝั่งหน้าบ้าน: ปกติ 15 วินาที, `/site/public` 8 วินาที, upload 60 วินาที, NDA 30 วินาที

---

## 13. Configuration & Deployment

```json
{
  "ConnectionStrings": { "Default": "<from env / Key Vault>" },
  "Jwt": { "Issuer": "AgileAssetsAPI", "Audience": "AgileAssetsWeb", "Secret": "<≥32 bytes random, env only>", "AccessTokenHours": 8 },
  "Turnstile": { "SecretKey": "<env only>", "Enabled": true },
  "Encryption": { "PiiKey": "<Key Vault>", "PiiHmacKey": "<Key Vault>" },
  "Uploads": { "Root": "/var/agileassets/uploads", "PublicBaseUrl": "https://api.tunjai.in.th/uploads", "MaxBytes": 5242880 },
  "Email": { "SmtpHost": "...", "From": "noreply@agileassets.co.th", "SalesRecipients": ["sales@agileassets.co.th"], "HrRecipients": ["hr@agileassets.co.th"] },
  "Cors": { "AllowedOrigins": ["https://agileassets.co.th", "https://www.agileassets.co.th", "http://localhost:3001"] }
}
```
- **ห้าม commit secret ใดๆ** ลง repo — ใช้ environment variables / User Secrets / Key Vault
- Forwarded headers: `app.UseForwardedHeaders` + กำหนด `KnownProxies` (ไม่งั้น rate limit จะนับ IP ของ proxy)

ฝั่งหน้าบ้าน (`.env.production`):
```
VITE_API_URL=https://api.tunjai.in.th/api/v1
VITE_TURNSTILE_SITE_KEY=<site key จาก Cloudflare>   # เว้นว่าง = ปิด captcha
```

---

## 14. Endpoint Inventory

| # | Method | Endpoint | Auth | เรียกจาก (frontend) | Phase |
|---|---|---|---|---|---|
| 1 | POST | `/auth/login` | Public | `authService.login` | 1 |
| 2 | POST | `/auth/logout` | Admin | `authService.logout` | 1 |
| 3 | GET | `/site/public` | Public | `cmsService.getPublicSite` | 1 |
| 4 | GET | `/health` | Public | monitoring | 1 |
| 5 | PUT | `/settings/theme` | Admin | `cmsService.publishChanges` | 1 |
| 6 | PUT | `/settings/banner` | Admin | 〃 | 1 |
| 7 | PUT | `/settings/company` | Admin | 〃 | 1 |
| 8 | PUT | `/rates` | Admin | 〃 | 1 |
| 9 | PUT | `/faqs` | Admin | 〃 | 1 |
| 10 | GET | `/settings/custom-fields` | Admin | `cmsService.getCustomFields` | 1 |
| 11 | PUT | `/settings/custom-fields` | Admin | `cmsService.publishChanges` | 1 |
| 12 | PUT | `/settings/custom-pages` | Admin | 〃 | 1 |
| 13 | PUT | `/news/{id}` | Admin | 〃 (upsert) | 1 |
| 14 | DELETE | `/news/{id}` | Admin | 〃 | 1 |
| 15 | PUT | `/assets/{id}` | Admin | 〃 (upsert) | 1 |
| 16 | DELETE | `/assets/{id}` | Admin | 〃 | 1 |
| 17 | PUT | `/pages/{pageId}` | Admin | 〃 | 1 |
| 18 | DELETE | `/pages/{pageId}` | Admin | 〃 | 1 |
| 19 | POST | `/uploads/images` | Admin | `cmsService.uploadImage` | 1 |
| 20 | POST | `/forms/inquiry` | Public | `formService.submitInquiry` | 1 |
| 21 | POST | `/forms/contact` | Public | `formService.submitContact` | 1 |
| 22 | POST | `/forms/leasing` | Public | `formService.submitLeasing` | 1 |
| 23 | POST | `/forms/nc-nda` | Public | `formService.submitNda` | 1 |
| 24 | POST | `/forms/newsletter` | Public | `formService.subscribeNewsletter` | 1 |
| 25 | POST | `/careers/apply` | Public | `careerService.applyJob` | 1 |
| 26 | GET | `/careers/applications` | Admin | `careerService.getApplications` | 2 |
| 27 | PATCH | `/careers/applications/{id}/status` | Admin | `careerService.updateStatus` | 2 |
| 28 | GET/PATCH | `/admin/leads…`, `/admin/nda-submissions…` | Admin | (ยังไม่มี UI) | 2 |
| 29 | GET/PUT | `/users/me`, `/users/me/password` | Admin | (ยังไม่มี UI) | 2 |

---

## 15. Implementation Checklist & ลำดับงาน

**Sprint 1 — ให้เว็บจริงใช้งานได้ (ลีดไม่หาย + CMS เผยแพร่ได้)**
- [ ] โครงโปรเจค, EF Core migrations ตาม §10, error envelope, security headers, CORS, forwarded headers
- [ ] `POST /auth/login`, `/auth/logout`, JWT (`exp`, `jti`, `tv`), Argon2id, lockout, seed แอดมินด้วยรหัสสุ่ม
- [ ] Forms ทั้ง 6 endpoint (§7) + rate limit + Turnstile + time-trap + อีเมลแจ้งทีมขาย ← **สำคัญที่สุด**
- [ ] `GET /site/public` + memory cache + ETag + compression

**Sprint 2 — CMS เต็มรูปแบบ**
- [ ] Admin PUT/DELETE ทั้งหมดใน §5 (upsert, replace-all ใน transaction, invalidate cache, audit log)
- [ ] HtmlSanitizer + URL validation
- [ ] `PUT /pages/{pageId}`: เก็บ document ทั้งก้อนรวม `sections` (ห้าม DTO ทิ้งฟิลด์ที่ไม่รู้จัก) + ข้อยกเว้น §2.5.1 (ไม่ trim, อนุญาต `\n`, sanitize เฉพาะ `contentTh/En` ระดับบนสุด, ตรวจ scheme อันตรายทุก string ใน `sections`)
- [ ] Test: PUT document ที่มี `sections` → `GET /site/public` ต้องได้คืน **ทุกตัวอักษรเหมือนเดิม** (รวม `\n`, ช่องว่างท้ายข้อความ, `&`, `<`, `items: []`)
- [ ] Test: `sections.{id}.hidden` (true/false) และ `blocks` (ลำดับ, `hidden`, `blocks: []`) ต้องได้คืนเหมือนเดิมทุกประการ; `blocks` > 50 หรือ `items` > 100 → 422
- [ ] Test: ค่าใน `sections` / `blocks` ที่ขึ้นต้น `javascript:` / ` JavaScript:` / `data:` (รวมในบรรทัดที่ 2 ของค่าหลายบรรทัด) → 422
- [ ] `POST /uploads/images` (magic bytes, re-encode WebP, GUID name, immutable cache)
- [ ] PDPA: เข้ารหัส NDA, signed URL ลายเซ็น, retention jobs

**Sprint 3 — งานหลังบ้านสำหรับทีมขาย (Phase 2)**
- [ ] `/admin/leads`, NDA viewer, careers list/status, CSV export, เปลี่ยนรหัสผ่าน
- [ ] (หน้าบ้านจะทำ UI ให้หลัง endpoint พร้อม)

**ก่อนขึ้น production (ทั้งสองฝั่ง)**
- [ ] เปลี่ยนรหัสแอดมิน (`123456789` หลุดใน git history แล้ว ถือว่าใช้ไม่ได้)
- [ ] ตั้ง Cloudflare Turnstile (site key → หน้าบ้าน, secret → หลังบ้าน)
- [ ] ย้ายรูปจาก `agileassets.co.th/wp-content/...` (~90 รูปที่หน้าบ้านยังลิงก์อยู่) มาเก็บที่ `/uploads` **ก่อนปิดเว็บ WordPress เดิม** ไม่งั้นรูปเสียทั้งเว็บ
- [ ] ทดสอบ CORS จากโดเมนจริง + ตรวจ CSP `connect-src` ตรงกับโดเมน API
- [ ] Penetration test เบื้องต้น (OWASP ZAP baseline) กับทั้ง API และเว็บ
