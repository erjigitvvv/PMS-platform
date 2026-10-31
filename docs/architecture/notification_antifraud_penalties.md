# 🛡️ NOTIFICATION ESCALATION, ANTIFRAUD (TAILGATING) & PENALTY ENGINE
> **PMS Platform: Xabarnomalar Eskalatsiyasi, Tailgating Soxtakorligini Aniqlash va Avtomatik Jazolash Algoritmlari**

---

## 1. 🔔 Xabarnomalar Eskalatsiyasi (Notification Escalation Algorithm)
* **Soat 17:00 (Yumshoq eslatma):** Talabaga bugungi kundalikni to'ldirish eslatmasi.
* **Soat 21:00 (Sariq ogohlantirish):** 3 soat vaqt qolgani, 23:59 da tizim qulflanishi haqida shoshilinch ogohlantirish.
* **Ertasiga Soat 09:00 (Qizil jarima eskalatsiyasi):** Hisobot to'ldirilmagan kun uchun avtomatik -1 ball jarima va Dekanat/Ustozga eskalatsiya xati.
* **Soat 11:00 (Mentorga davomat eslatmasi):** Mentorga Telegramda 1-bosish orqali kunlik davomat belgilash tugmalari yuboriladi.

---

## 2. 🕵️‍♂️ Tailgating & Antifraud Nazorat Algoritmi
* **Muammo:** Talaba mentor nomidan kirib o'z hisobotini tasdiqlashi (Proxy Approval / Tailgating).
* **Himoya Algoritmi:**
  1. **IP & Subnet Matching:** Talaba hisobot yuborgan IP bilan mentor tasdiqlagan IP bir xil bo'lsa va oradagi vaqt < 5 daqiqa bo'lsa -> `SUSPICIOUS_PROXY_APPROVAL` bayrog'i yoqiladi.
  2. **Device Fingerprint:** Mentor akkauntiga talaba qurilmasidan (User-Agent) kirish taqiqlanadi.
  3. **Tezkor klonlash:** Bir soniyada bir nechta talabani tasdiqlash bot orqali tekshirilib bloklanadi.

---

## 3. ⚖️ Jazolash va Jarimalar Shkalasi (Penalty System)

Formula:
$$S_{\text{yakuniy}} = \max\Big(0, \, (S_{\text{mentor}} \times 10 + S_{\text{teacher}}) - \sum \text{Jarimalar}\Big)$$

| Qoidabuzarlik turi | Jarima miqdori | Oqibati |
| :--- | :---: | :--- |
| **Kechiktirilgan kundalik** | Har bir kun uchun **-1 ball** | 3 kundan oshsa kun muzlatiladi |
| **Kech kelish (`LATE`)** | 3 tadan oshsa har biriga **-1 ball** | Davomat foizi pasayadi (0.75x) |
| **Sababsiz kelmaslik (`ABSENT`)** | Har bir kun uchun **-2 ball** | 5 kundan oshsa dekanat komissiyasi |
| **Tailgating (Soxta tasdiqlash)** | **-10 ball** jarima | Barcha tasdiqlar bekor, ogohlantirish |
| **Qayta tailgating / Soxta firma** | **Amaliyot bekor (F baho)** | Qayta kursga qoldirish |

---

## 4. Relyatsion Baza Modeli (`penalty_records`)
* `id (UUID PK)`
* `application_id (UUID FK)`
* `penalty_type (VARCHAR 50)`
* `penalty_points (FLOAT)`
* `reason (TEXT)`
* `is_waived (BOOLEAN DEFAULT FALSE)` -- Dekanat sababli deb kechira oladi
* `created_at (TIMESTAMPTZ)`
