# Portfolio — Aghasha Rudolph

Website portfolio statis (HTML, CSS, JavaScript murni, tanpa framework dan tanpa build step).

## Struktur folder

```
index.html          → semua konten halaman (teks, project, link)
css/style.css       → tampilan; warna & font diatur di bagian TOKEN paling atas
js/main.js          → menu HP, link nav aktif, animasi scroll, bintang jatuh
assets/img/         → foto (sudah dikompres) + favicon
```

## Cara menjalankan di laptop

Buka `index.html` langsung di browser, atau pakai server lokal biar sama persis kayak online:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Cara edit yang paling sering

- **Ganti warna aksen**: ubah `--accent` dan `--accent-hover` di `css/style.css`.
- **Tambah project**: di `index.html`, copy satu blok `<article class="project">…</article>`,
  lalu ganti judul, deskripsi, poin fitur, stack, link GitHub, dan isi `sysmap`
  (baris `actors` = siapa yang pakai sistem, baris `modules` = fitur/modul).
- **Ganti foto**: taruh file baru di `assets/img/`. Usahakan lebar maksimal ±1000px
  dan ukuran di bawah 200 KB supaya halaman tetap cepat.

## Deploy ke GitHub Pages

1. Push ke branch `main`.
2. Di GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pilih `main` dan folder `/ (root)`.
3. Tunggu 1–2 menit, website muncul di `https://<username>.github.io/<nama-repo>/`.
