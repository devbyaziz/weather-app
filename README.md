# Weather App - Aplikasi Prakiraan Cuaca Interaktif

Aplikasi prakiraan cuaca interaktif yang terintegrasi dengan OpenWeatherMap API. Antarmukanya dibuat dengan React dan Tailwind CSS, dengan fokus pada informasi yang ringkas dan mudah dipindai.

## Fitur Utama

✨ **Fitur-fitur:**
- 🌍 Pencarian cuaca berdasarkan nama kota
- 📍 Deteksi lokasi otomatis (Geolocation)
- 🌡️ Informasi cuaca real-time lengkap
- 📊 Detail cuaca (angin, kelembaban, tekanan, jarak pandang)
- 🌅 Waktu matahari terbit & terbenam
- 📅 Prakiraan cuaca 5 hari ke depan
- 🎨 Desain responsif berbasis React dan Tailwind CSS
- 🔁 Toggle satuan Celsius/Fahrenheit
- 🕘 Riwayat kota yang terakhir dilihat
- 📱 Mobile-friendly

## Cara Penggunaan

### 1. Clone/Download Repository

```bash
git clone https://github.com/username/weather-app.git
cd weather-app
```

Atau download ZIP dan extract.

### 2. Dapatkan API Key

1. Kunjungi [OpenWeatherMap](https://openweathermap.org/api)
2. Klik **Sign Up** untuk daftar akun gratis
3. Verifikasi email Anda
4. Login dan klik nama Anda → **My API keys**
5. Copy API key yang sudah otomatis dibuat

### 3. Setup Konfigurasi

1. **Copy file template:**
   ```bash
   copy config.example.js config.js
   ```
   (Di Mac/Linux: `cp config.example.js config.js`)

2. **Edit file `config.js`:**
   - Buka file `config.js`
   - Ganti `YOUR_API_KEY_HERE` dengan API key Anda

   ```javascript
   const CONFIG = {
       API_KEY: 'paste_api_key_anda_disini',
       API_BASE_URL: 'https://api.openweathermap.org/data/2.5'
   };
   ```

3. **JANGAN commit file `config.js` ke GitHub!**
   - File ini sudah otomatis dilindungi oleh `.gitignore`
   - API key Anda akan tetap aman

### 4. Jalankan Aplikasi

Buka file `index.html` di browser favorit Anda.

## 🔒 Keamanan API Key

### File yang DI-UPLOAD ke GitHub:
✅ `index.html` - Aman
✅ `style.css` - Aman
✅ `script.js` - Aman (tidak ada API key)
✅ `config.example.js` - Aman (hanya template)
✅ `.gitignore` - Aman (melindungi config.js)
✅ `README.md` - Aman

### File yang TIDAK DI-UPLOAD:
❌ `config.js` - Dilindungi oleh .gitignore (berisi API key Anda)

### Untuk Orang yang Clone Repository Anda:
Mereka akan melihat instruksi di README untuk:
1. Copy `config.example.js` → `config.js`
2. Isi dengan API key mereka sendiri
3. Aplikasi siap digunakan!

## Teknologi yang Digunakan

- **React 18** - State dan rendering antarmuka
- **Tailwind CSS** - Styling responsif melalui CDN
- **Babel Standalone** - Transform JSX langsung di browser
- **OpenWeatherMap API** - Data cuaca real-time
- **Google Fonts** - Tipografi antarmuka

## Struktur File

```
weather app/
│
├── index.html          # File HTML utama
├── style.css           # Styling lama (tidak dipakai oleh entry point)
├── script.js           # Logika lama (tidak dipakai oleh entry point)
├── config.js           # Konfigurasi API key (TIDAK di-upload)
├── config.example.js   # Template konfigurasi (DI-upload)
├── .gitignore          # Proteksi file config.js
└── README.md           # Dokumentasi
```

## Cara Menggunakan Aplikasi

### Metode 1: Pencarian Manual
1. Ketik nama kota di kotak pencarian
2. Klik tombol search atau tekan Enter
3. Lihat hasil cuaca untuk kota tersebut

### Metode 2: Lokasi Otomatis
1. Klik tombol "Lokasi Saya"
2. Izinkan browser mengakses lokasi Anda
3. Aplikasi akan menampilkan cuaca di lokasi Anda saat ini

## Informasi yang Ditampilkan

### Cuaca Saat Ini:
- Suhu aktual dan terasa seperti
- Kondisi cuaca dengan ikon
- Suhu maksimal dan minimal
- Kecepatan angin
- Kelembaban udara
- Tekanan atmosfer
- Jarak pandang
- Waktu matahari terbit
- Waktu matahari terbenam

### Prakiraan 5 Hari:
- Tanggal
- Ikon cuaca
- Suhu
- Deskripsi cuaca

## Browser Support

Aplikasi ini mendukung semua browser modern:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## Tips

- Aplikasi akan otomatis mencoba menggunakan lokasi Anda saat pertama kali dibuka
- Jika geolocation gagal, aplikasi akan menampilkan cuaca Jakarta sebagai default
- Anda dapat mencari kota dari seluruh dunia
- Gunakan nama kota dalam bahasa Inggris untuk hasil terbaik (contoh: "Tokyo", "New York", "London")

## Troubleshooting

### API Key Error
Jika muncul error "API key tidak valid":
1. Pastikan API key sudah benar di file `config.js`
2. Pastikan file `config.js` sudah dibuat dari `config.example.js`
3. Tunggu beberapa menit setelah mendaftar (aktivasi API key memerlukan waktu)
4. Periksa quota API Anda di dashboard OpenWeatherMap

### Kota Tidak Ditemukan
Jika muncul error "Kota tidak ditemukan":
1. Periksa ejaan nama kota
2. Coba gunakan nama kota dalam bahasa Inggris
3. Tambahkan kode negara (contoh: "Jakarta,ID")

### Geolocation Error
Jika lokasi otomatis tidak berfungsi:
1. Pastikan browser Anda mendukung geolocation
2. Berikan izin akses lokasi saat diminta
3. Periksa pengaturan privasi browser Anda

## Lisensi

Aplikasi ini dibuat untuk tujuan edukasi dan dapat digunakan secara bebas.

## Credits

- Data cuaca: [OpenWeatherMap](https://openweathermap.org)
- Font: [Google Fonts](https://fonts.google.com)

---

**Dibuat menggunakan React, Tailwind CSS, dan OpenWeatherMap**
