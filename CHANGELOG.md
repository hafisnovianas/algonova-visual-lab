# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Stasiun 0: Bedah Kode Interaktif (Code X-Ray)** pada Pertemuan 3 (`pertemuan-03-string/`) untuk menjembatani visual ke sintaks kode Python bagi siswa ADHD.
- **Web Component `<code-xray>`** berbasis W3C Custom Elements native untuk membedah anatomi kode Python (Inside-Out execution flow: 1 Ambil Peti -> 2 Ukur -> 3 Simpan via `=`).
- **Simulasi Fisik Peti Variabel & Pita Meteran `len()`** lengkap dengan animasi meluncur dan efek audio bertahap (*tit-tit-tit-TING!*).
- **Arsitektur Proyek Berbasis Pertemuan** dengan CSS terpusat (`shared/css/style.css`) dan Web Audio synthesizer (`shared/js/audio.js`).
- **Dashboard Portal Utama** (`index.html`) dengan kartu menu pertemuan `<lesson-card>`.
- **Konfigurasi Deployment Netlify** (`netlify.toml`) untuk publikasi statis tanpa build step.
