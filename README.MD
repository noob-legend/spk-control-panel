# SPK Control Panel

Aplikasi **SPK (Surat Perintah Kerja) Control Panel** berbasis React (frontend) dan Node.js + Express + MongoDB (backend).  
Memungkinkan user untuk:

- Mengelola SPK (create, read, update, delete)
- Melihat detail SPK
- Mengelola produk terkait SPK (tambah, hapus, edit)

---

## Fitur

### SPK

- CRUD SPK
- Filter dan search SPK berdasarkan nomor SPK atau customer
- Pagination

### Detail SPK

- Lihat informasi lengkap SPK (customer, proyek, status, tanggal dibuat, deadline, total unit)
- Prioritas SPK ditampilkan dengan badge warna
- Lihat daftar produk terkait SPK

### Produk

- Tambah produk baru langsung dari detail SPK
- Hapus produk
- Placeholder edit produk (bisa dikembangkan lebih lanjut)

---

## Teknologi

- **Frontend:** React, Vite, React Router DOM, TailwindCSS, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **UI Components:** lucide-react, custom Button, Input, DataTable

---

## Struktur Project

/src
/components
/forms
AddProductModal.jsx
/ui
Button.jsx
Input.jsx
/tables
DataTable.jsx
/layout
Layout.jsx
/pages
Dashboard.jsx
Login.jsx
SPK.jsx
SPKDetail.jsx
CreateSPK.jsx

---

## Instalasi

### Backend

```bash
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev

Pastikan MongoDB berjalan di local atau cloud (Atlas), dan sesuaikan MONGO_URI di .env.

Konfigurasi .env

Contoh .env untuk backend:

PORT=5000
MONGO_URI=mongodb://localhost:27017/spk_db
JWT_SECRET=your_secret_key
Cara Menggunakan

Login di halaman /login.

Masuk ke /spk untuk melihat daftar SPK.

Klik SPK untuk melihat Detail SPK dan daftar produknya.

Tambah produk menggunakan tombol Tambah Produk.

Hapus produk atau SPK menggunakan tombol Trash.

Edit SPK menggunakan tombol Pencil.


author : Noob Legend
```
