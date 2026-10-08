# สิ่งที่หลังบ้านต้องแก้ — Agile Assets Website

> อัปเดต: 2026-10-08 · อ้างอิง `Backend_API_Spec_Complete.md`

เป้าหมาย: **อัปโหลดรูป, แก้ข้อความ, เพิ่มหน้าใหม่ และเปลี่ยนสี** ต้องใช้ได้ครบ ตรวจรอบ 3 (2026-10-08): ไฟล์อัปโหลดเปิดได้แล้ว, `/site/public` ส่ง `pageContents` เป็น object และไม่ส่ง section ว่างแล้ว · ที่เหลือด้านล่างต้องทดสอบด้วยบัญชีแอดมิน · ที่แก้แล้ว: CORS, `/site/public`, `/health`, security headers, login, static `/uploads` · เปลี่ยนรหัสผ่านย้ายไปทำทีหลัง

## สรุปงานที่เหลือ

| # | งาน | สิ่งที่พบ | ต้องทำ | ความสำคัญ | สถานะ |
| --- | --- | --- | --- | --- | --- |
| 1 | Cloudflare Turnstile | หน้าบ้านยังไม่มี site key | ส่ง site key ให้หน้าบ้าน หรือตั้ง `Enabled = false` ไว้ก่อน | สำคัญ | ยังไม่เริ่ม |
| 2 | Endpoint ที่ยังไม่ได้ทดสอบ | ยืนยันแล้ว: login, `PUT /pages/{id}`, `POST /uploads/images` (รับไฟล์ได้) | ยืนยันตามเช็กลิสต์ท้ายเอกสาร | ต้องยืนยัน | ยังไม่เริ่ม |
| 3 | รูปจากเว็บ WordPress เดิม | โค้ดหน้าบ้านยังลิงก์ `agileassets.co.th/wp-content/...` 47 URL | ย้ายมาเก็บที่ `/uploads` แล้วแจ้ง URL ใหม่ | ก่อนปิดเว็บเดิม | ยังไม่เริ่ม |

## จุดที่ต้องแก้

**🔴 `PUT /pages/{pageId}` ตอบ 422 — เผยแพร่เนื้อหาหน้าไม่ได้เลย (เร่งด่วนที่สุด)**

- [ ] **validation ของ `sections` ผิด** — กดเผยแพร่หน้า Home ได้ `422 Unprocessable Entity` ข้อความ `sections and blocks must be arrays with at most 50 items.` แต่ spec §9.10.1 กำหนดให้ **`sections` เป็น object** (key = sectionId) ไม่ใช่ array:
  ```json
  "sections": {
    "benefits": { "hidden": false, "fields": { "titleTh": "…" }, "items": [ { "id": "b1", "titleTh": "…" } ] },
    "process":  { "hidden": true }
  }
  ```
  แก้ให้: `sections` = object (ไม่มีลิมิตจำนวน key นอกจากขนาด document ≤ 512 KB), ส่วน **`blocks` = array ≤ 50** และ `items` ในแต่ละ section/block = array ≤ 100 · ทั้งสองฟิลด์ optional (ไม่มี key = ผ่าน) · เก็บ document ทั้งก้อนแบบ raw JSON ตาม §9.10.1 (ห้าม DTO ทิ้งฟิลด์ที่ไม่รู้จัก)

**🔴 อัปโหลดรูป**

- [ ] **`POST /uploads/images` คืน `url` เป็น path (`/uploads/pages/…`)** — spec §6 ให้คืน URL เต็ม `https://api.tunjai.in.th/uploads/…` (ใช้ `Uploads.PublicBaseUrl`) หน้าบ้านเติมโดเมนให้แล้ว แต่ควรแก้ให้ตรง spec
- [ ] **ไฟล์ยังเป็น `.png` และไม่มีโฟลเดอร์ปี/เดือน** — spec §6 ให้ re-encode เป็น WebP (quality 82) ตัด EXIF/GPS ย่อกว้าง ≤ 1920px และเก็บที่ `/uploads/{folder}/{yyyy}/{MM}/{guid}.webp`

**`GET /site/public`**

- [ ] **เผยแพร่แล้วต้องเห็นทันที** — ทุก PUT/DELETE ใน §5 ต้องล้าง server memory cache ของ `/site/public` (หน้าบ้านฝั่งแอดมินขอข้อมูลแบบไม่ใช้ cache แล้ว)

- [ ] **ETag ยังไม่ตอบ 304** — ส่ง `If-None-Match` ตรงกับ ETag แล้วยังได้ 200 (ตรวจว่า Cloudflare หรือ compression middleware ตัด/เปลี่ยน ETag หรือไม่)

## ฟังก์ชันที่ต้องใช้ได้ครบ และ endpoint ที่แต่ละอันเรียก

หน้าบ้านกด "เผยแพร่" แล้วยิงหลาย request พร้อมกัน ถ้าตัวใดตัวหนึ่งไม่ผ่าน จะขึ้น "เผยแพร่ไม่สำเร็จ" ทั้งชุด

| ฟังก์ชัน | endpoint ที่เรียก | ต้องคืนใน `/site/public` |
| --- | --- | --- |
| แก้ข้อความหน้าใดก็ได้ | `PUT /pages/{pageId}` (หน้า Home เรียก `PUT /settings/banner` ด้วย) | `pageContents.{pageId}`, `banner` |
| เพิ่มหน้าใหม่ | `PUT /settings/custom-pages` (array ทั้งหมด) + `PUT /pages/page-…` (มี `blocks`) | `customPages`, `pageContents.page-…` |
| ลบหน้า / รีเซ็ตหน้า | `PUT /settings/custom-pages` + `DELETE /pages/{pageId}` | — |
| เปลี่ยนสีปุ่ม/ธีม | `PUT /settings/theme` (สี validate `^#[0-9a-fA-F]{6}$`) | `themeSettings` |
| อัปโหลดรูป | `POST /uploads/images` แล้วเปิด `url` ได้ | — |
| ข่าว / เครื่องจักร | `PUT`/`DELETE /news/{id}`, `/assets/{id}` | `news`, `usedMachinery` |
| FAQ / อัตราดอกเบี้ย / ข้อมูลบริษัท | `PUT /faqs`, `PUT /rates`, `PUT /settings/company` | `faqs`, `interestRates`, `companyInfo`, `impactStats` |

`PUT /settings/custom-pages`: `path` ตาม regex `^/[a-z0-9-]+(/[a-z0-9-]+)*$`, ห้ามซ้ำ, ห้ามขึ้นต้น `/management-portal` → 409 `PATH_CONFLICT` (§9.9) · ฟิลด์ที่หน้าบ้านส่งมาเกินจาก DTO (เช่น `updatedAt` ใน theme, `lastUpdated` ใน page) ต้องไม่ทำให้ 400

## เช็กลิสต์ทดสอบหลังแก้

ติ๊กเมื่อทดสอบผ่านจากเบราว์เซอร์ที่ `https://tunjai.in.th` จริง ไม่ใช่แค่ curl เพราะ curl ไม่ติด CORS

**Endpoint (ยังไม่ได้ยืนยัน)**

- [ ] `POST /forms/inquiry`, `/forms/contact`, `/forms/leasing`, `/forms/newsletter` — ตอบ 201 + `referenceNumber`
- [ ] `POST /forms/nc-nda` (multipart + ลายเซ็น PNG) และ `POST /careers/apply`
- [ ] `POST /uploads/images` โฟลเดอร์ `news`, `assets`, `pages`, `banner` — คืน `url` ที่เปิดดูได้
- [ ] `PUT /settings/theme`, `/settings/banner`, `/settings/company`, `/settings/custom-fields`, `/settings/custom-pages`
- [ ] `PUT /rates`, `PUT /faqs` (replace all)
- [ ] `PUT` + `DELETE /news/{id}` และ `/assets/{id}` (upsert, DELETE ซ้ำต้องได้ 200)
- [ ] `DELETE /pages/{pageId}` และ `GET /settings/custom-fields`

**เทสต์ตาม spec §15**

- [ ] `PUT /pages/{id}` ที่มี `sections` / `blocks` → `GET /site/public` คืนค่าเหมือนเดิมทุกตัวอักษร (รวม `\n`, ช่องว่างท้ายข้อความ, `&`, `<`, `items: []`, `hidden`)
- [ ] ค่าใน `sections` / `blocks` ที่ขึ้นต้น `javascript:` หรือ `data:` (รวมบรรทัดที่ 2) → 422
- [ ] `blocks` เกิน 50 หรือ `items` เกิน 100 → 422
- [ ] ฟอร์มที่ `elapsedMs < 2500` → ตอบ 201 ปกติ แต่บันทึกเป็น spam
- [ ] ยิงฟอร์มเกิน 5 ครั้ง/10 นาที → 429 + `Retry-After`

## ทำทีหลัง (Phase 2): เปลี่ยนรหัสผ่าน

ยังไม่ต้องทำตอนนี้ — หน้าบ้านทำหน้าจอไว้แล้วแต่ซ่อนเมนูไว้ก่อน ระหว่างนี้ถ้าต้องเปลี่ยนรหัสแอดมินให้หลังบ้านเปลี่ยนที่ฐานข้อมูลโดยตรง เมื่อพร้อมให้ทำตามนี้ แล้วแจ้งหน้าบ้านเปิดเมนู

- `PUT /users/me/password` body `{ "currentPassword": "…", "newPassword": "… (≥12)" }`
- รหัสปัจจุบันผิด → ตอบ **400 หรือ 422 ห้ามตอบ 401** (หน้าบ้านถือว่า 401 คือ session หมดอายุ และจะออกจากระบบทันที)
- ใส่ `user.mustChangePassword: true/false` ใน response ของ `POST /auth/login`
- สำเร็จแล้วเพิ่ม `TokenVersion` ให้ token เก่าใช้ไม่ได้ทั้งหมด หน้าบ้านจะพาไป login ใหม่เอง

อ้างอิง: `Backend_API_Spec_Complete.md` ใน repo หน้าบ้าน (§4, §6, §9.10, §12, §15)
