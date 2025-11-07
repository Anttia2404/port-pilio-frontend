# Web-Portfolio-React

### เทมเพลตเว็บพอร์ตโฟลิโอ (ที่แจกฟรีให้ใช้งาน)
ที่นี่คุณสามารถนำเทมเพลตนี้ไปใช้ได้อย่างสบายใจ และ เว็บนี้ถูกพัฒนาโดยใช้ React.js (Vite) และสามารถปรับธีมเป็น Dark Mode หรือ Light Mode ตามความชอบของผู้ใช้.

### 📘 วิธีการติดตั้ง และ ใช้งาน
1. อย่างแรก fork และก็ clone ก่อน
```bash
git clone https://github.com/NekoSakuraLucia/Web-Portfolio-React.git
```

2. เมื่อ clone เสร็จแล้วก็ติดตั้ง dependencies
```bash
cd web-portfolio
bun install
```

3. เมื่อติดตั้งเสร็จแล้วให้รันเว็บ
```bash
bun run dev
```

4. เมื่อต้องการ build เป็น production
```bash
bun run build

// เมื่อต้องการรันดูเว็บหลังจาก build

bun run preview
```

---

#### 📁 โครงสร้างไฟล์ และ โฟลเดอร์
```
/src
│
├── /components
│   ├── /About
│   │   └── About.jsx            # หน้าเกี่ยวกับ (About Page)
│   ├── /Home
│   │   └── Home.jsx             # หน้าแรก (Home Page)
│   ├── /Projects
│   │   └── Projects.jsx         # หน้าผลงาน (Projects Page)
│   ├── /Contact
│   │   └── Contact.jsx          # หน้าติดต่อ (Contact Page)
│   ├── /Footer
│   │   └── Footer.jsx           # เมนูส่วนท้าย (Footer)
│   ├── Navbar.jsx               # เมนูนำทาง (Navbar)
│
├── /App.jsx                     # จุดเริ่มต้นของแอปพลิเคชัน (รวมทุกหน้า)
├── /main.jsx                    # จุดเริ่มต้นการ render แอป (ReactDOM.render)
```

###### copyright 2025 - NekoSakuraLucia, MIT License
###### สามารถนำไปใช้ตามสบายใจ ไม่สงวนสิทธ์ใด ๆ ทั้งนั้น