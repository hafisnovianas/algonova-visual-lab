# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Pertemuan 3 (String & Interpreter)**: Merombak total arsitektur antarmuka menjadi pendekatan *Code-as-Widget*, di mana setiap baris kode Python berfungsi langsung sebagai alat peraga visual interaktif (inline steppers & inputs).
- Mengeliminasi Stasiun 0 terpisah dan menyatukan seluruh materi ke dalam 5 Tab Operasi Sintaks Terpadu (Variabel & len, Indeks [i], Slicing [a:b], Detektif .find, dan Tipe Data str/Biner).
- Menambahkan sistem Misi Cepat dengan deteksi otomatis dan audio chime reward untuk studi kasus Algonova Task 51172 & Task 51173.

### Added
- **Pertemuan 4 (Konstruksi Bersarang & Kode Ringkas)**: Simulator interaktif pabrik matryoshka untuk memahami pemanggilan fungsi bersarang `int(input())` dan `len(input())` dengan alur inside-out, aturan return value (mengapa `print()` dilarang disarangkan), barometer keterbacaan kode (*clean code meter*), scanner radar komentar `#`, serta panduan kunci jawaban tugas platform ProTeam Algonova.
- **Pertemuan 1 (Variabel & Assignment)**: Simulator visual interaktif kotak 3D berengsel untuk materi pemula/ADHD, mencakup konsep variabel sebagai kotak berlabel, operator assignment `=`, aturan satu nilai per kotak (re-assignment), pembacaan isi kotak via `print()`, kloning dua kotak (`b = a`), serta komparasi model kotak vs label tali (pointer/reference Python).
- **Stasiun 0: Bedah Kode Interaktif (Code X-Ray)** pada Pertemuan 3 (`pertemuan-03-string/`) untuk menjembatani visual ke sintaks kode Python bagi siswa ADHD.
- **Web Component `<code-xray>`** berbasis W3C Custom Elements native untuk membedah anatomi kode Python (Inside-Out execution flow: 1 Ambil Peti -> 2 Ukur -> 3 Simpan via `=`).
- **Simulasi Fisik Peti Variabel & Pita Meteran `len()`** lengkap dengan animasi meluncur dan efek audio bertahap (*tit-tit-tit-TING!*).
- **Arsitektur Proyek Berbasis Pertemuan** dengan CSS terpusat (`shared/css/style.css`) dan Web Audio synthesizer (`shared/js/audio.js`).
- **Dashboard Portal Utama** (`index.html`) dengan kartu menu pertemuan `<lesson-card>`.
- **Konfigurasi Deployment Netlify** (`netlify.toml`) untuk publikasi statis tanpa build step.
