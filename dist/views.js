import { icon } from './icons.js';
import { materials, articles, academy } from './data.js';
import { escape as e, money, number } from './domain.js';

export const asset = name => './assets/' + name;
export const cities = ['Bogor', 'Bekasi', 'Tangerang'];
export const orderKinds = ['Material', 'Group Buy', 'Minat Rumah', 'Iklan Rumah', 'KPR', 'Keanggotaan'];
const link = (to, label, style = 'primary', graphic = 'arrow-right') =>
  `<a class="button ${style}" href="#${to}">${label} ${icon(graphic, 18)}</a>`;
const button = (action, label, id = '', style = 'primary', graphic = 'arrow-right') =>
  `<button class="button ${style}" type="button" data-action="${action}" data-id="${e(id)}">${label} ${icon(graphic, 18)}</button>`;
const eyebrow = label => `<span class="eyebrow"><i></i>${label}</span>`;
const hero = (tag, title, description, actions = '') => `<section class="page-banner"><div class="wrap"><a class="breadcrumb" href="#beranda">${icon('arrow-left', 15)} Beranda</a>${eyebrow(tag)}<h1>${title}</h1><p>${description}</p>${actions ? `<div class="action-row">${actions}</div>` : ''}</div></section>`;
const section = content => `<section class="wrap section">${content}</section>`;
const note = content => `<p class="note">${icon('info', 17)}<span>${content}</span></p>`;
const official = '<a class="text-link" href="https://aspprin.org/" target="_blank" rel="noopener">Situs resmi ASPPRIN ↗</a>';
const empty = (title, description) => `<div class="empty"><span class="tile-icon">${icon('search', 24)}</span><h3>${title}</h3><p>${description}</p></div>`;
export const options = (values, any = '') => (any ? `<option value="">${any}</option>` : '') + values.map(value => `<option>${e(value)}</option>`).join('');
const heading = (tag, title, text, action = '') => `<div class="section-heading"><div>${eyebrow(tag)}<h2>${title}</h2><p>${text}</p></div>${action}</div>`;

export function houseCard(home) {
  return `<article class="card property">
    <div class="card-photo">
      <img src="${asset(home.photo)}" alt="Ilustrasi rumah tipe ${home.building}" loading="lazy" width="768" height="512">
      <span class="pill status"><i></i>${e(home.label)}</span>
    </div>
    <div class="card-body">
      <p class="location">${icon('pin', 15)} ${e(home.city)}, ${e(home.province)}</p>
      <h3>${e(home.name)}</h3>
      <div class="specs"><span>${icon('bed', 16)} ${home.rooms} KT</span><span>${icon('bath', 16)} ${home.bath} KM</span><span>${icon('ruler', 16)} Tipe ${home.building}/${home.land}</span></div>
      <div class="card-bottom"><div><small>Harga contoh</small><strong>${money(home.price)}</strong></div>${button('house', 'Lihat Detail', home.id, 'outline small', 'chevron')}</div>
    </div>
  </article>`;
}

const services = [
  ['rumah', 'home', 'Rumah Subsidi', 'Temukan hunian terjangkau'],
  ['material', 'bricks', 'Material & Group Buy', 'Belanja material bersama'],
  ['kpr', 'calculator', 'Simulasi KPR', 'Hitung estimasi cicilan'],
  ['anggota', 'users', 'Keanggotaan', 'Bergabung dengan ASPPRIN'],
];

const banners = [
  {
    name: 'Rumah subsidi', photo: 'hero.jpg', tag: 'BERSAMA MEMBANGUN RUMAH UNTUK MASA DEPAN',
    title: 'Rumah terjangkau,<br><em>masa depan lebih dekat.</em>',
    description: 'Temukan rumah subsidi, belanja material bangunan, dan rencanakan KPR Anda dalam satu marketplace dari ASPPRIN.',
    actions: link('rumah', 'Jelajahi Rumah Subsidi') + link('kpr', 'Simulasi KPR', 'glass', 'calculator'),
    caption: ['home', 'Perumahan rakyat', 'Ilustrasi hunian'],
  },
  {
    name: 'Group Buy', photo: 'material.jpg', tag: 'MATERIAL BANGUNAN',
    title: 'Belanja bersama,<br><em>bangun lebih efisien.</em>',
    description: 'Temukan material untuk proyek Anda dan ikut pembelian kolektif untuk mencapai target bersama.',
    actions: link('material?mode=group', 'Lihat Group Buy') + link('material', 'Jelajahi Material', 'glass', 'bricks'),
    caption: ['bricks', 'Material bangunan', 'Ilustrasi katalog'],
  },
  {
    name: 'Akademi ASPPRIN', photo: 'savana.jpg', tag: 'SOSIALISASI & AKADEMI',
    title: 'Belajar bersama<br><em>Akademi ASPPRIN.</em>',
    description: 'Lihat topik sosialisasi dan pelajari cara menggunakan marketplace melalui modul singkat.',
    actions: link('sosialisasi', 'Buka Akademi') + link('sosialisasi?tab=belajar', 'Mulai Belajar', 'glass', 'check'),
    caption: ['users', 'Akademi ASPPRIN', 'Ilustrasi hunian'],
  },
];

function homeBanner() {
  return `<section class="hero" aria-roledescription="karusel" aria-label="Sorotan beranda">
    <div class="hero-controls" role="group" aria-label="Kontrol banner">
      <button class="icon-button" type="button" data-rotation aria-label="Jeda rotasi banner">${icon('pause', 16)}</button>
      <button class="icon-button" type="button" data-step="-1" aria-label="Banner sebelumnya">${icon('arrow-left', 17)}</button>
      ${banners.map((banner, index) => `<button class="hero-dot" type="button" data-slide="${index}" aria-label="Banner ${banner.name}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
      <button class="icon-button" type="button" data-step="1" aria-label="Banner berikutnya">${icon('arrow-right', 17)}</button>
    </div>
    <div class="hero-slides" aria-live="off">
      ${banners.map(({ name, photo, tag, title, description, actions, caption }, index) => `<div class="hero-slide" role="group" aria-roledescription="slide" aria-label="${name}" aria-hidden="${index !== 0}"${index ? ' inert' : ''}>
        <img class="hero-image" src="${asset(photo)}" alt="" ${index === 0 ? 'fetchpriority="high"' : 'fetchpriority="low"'}>
        <div class="wrap hero-content"><div class="hero-copy">
          ${eyebrow(tag)}<h1>${title}</h1><p>${description}</p><div class="action-row">${actions}</div>
        </div><div class="hero-caption"><span class="caption-icon">${icon(caption[0], 19)}</span><div><strong>${caption[1]}</strong><small>${caption[2]}</small></div></div></div>
      </div>`).join('')}
    </div>
  </section>`;
}

export function homePage(listings) {
  return `${homeBanner()}
  <div class="wrap quick-wrap"><nav class="quick-nav" aria-label="Layanan marketplace">${services.map(([route, glyph, title, sub]) => `<a href="#${route}"><span class="tile-icon">${icon(glyph, 23)}</span><span><strong>${title}</strong><small>${sub}</small></span>${icon('chevron', 16)}</a>`).join('')}</nav></div>
  ${section(`${heading('KATALOG CONTOH', 'Temukan rumah pertama Anda', 'Jelajahi contoh hunian subsidi berdasarkan lokasi, luas dan anggaran.', link('rumah', 'Lihat Semua Rumah', 'outline'))}<div class="cards">${listings.slice(0, 3).map(houseCard).join('')}</div>`)}
  ${section(`<div class="feature"><div class="feature-copy">${eyebrow('MATERIAL BANGUNAN') }<h2>Belanja bersama dengan Group Buy</h2><p>Pilih material dan gabungkan pesanan untuk mengejar target pembelian kelompok.</p>${link('material?mode=group', 'Lihat Group Buy')}</div><img src="${asset('material.jpg')}" alt="Ilustrasi material bangunan" loading="lazy"></div>`)}
  ${section(`<div class="feature assistant-feature"><div class="feature-copy">${eyebrow('ASISTEN AI')}<h2>Butuh bantuan memilih rumah?</h2><p>Bandingkan pilihan berdasarkan kota, anggaran, atau luas bangunan.</p>${link('asisten', 'Coba Asisten AI', 'primary', 'sparkles')}</div><div class="assistant-art" aria-hidden="true">${icon('sparkles', 76)}</div></div>`)}`;
}

export function houseCatalog(listings, query, city, sort) {
  return hero('MARKETPLACE', 'Rumah Subsidi', 'Cari rumah berdasarkan lokasi dan harga atau tambahkan iklan rumah contoh.', button('sell', 'Pasang Iklan Rumah', '', 'primary', 'plus')) + section(`
    <form class="filters" id="house-filter">
      <label>Cari rumah<input name="q" placeholder="Nama perumahan atau kota" value="${e(query)}"></label>
      <label>Lokasi<span class="filter-select"><select name="city">${options(cities, 'Semua kota')}</select>${icon('chevron-down', 16)}</span></label>
      <label>Urutkan<span class="filter-select"><select name="sort"><option value="">Rekomendasi</option><option value="asc">Harga terendah</option><option value="desc">Harga tertinggi</option></select>${icon('chevron-down', 16)}</span></label>
      <button class="button primary">${icon('search', 17)} Cari Rumah</button>
    </form>
    <div id="house-results" aria-live="polite">${houseResults(listings, query, city, sort)}</div>`);
}

export function houseResults(listings, query, city, sort) {
  const keyword = query.trim().toLocaleLowerCase('id');
  const matches = listings.filter(home => (!city || home.city === city) && `${home.name} ${home.city} ${home.province}`.toLocaleLowerCase('id').includes(keyword));
  if (sort) matches.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);
  return `<p class="result-count">${matches.length} hunian • Katalog contoh</p>` + (matches.length
    ? `<div class="cards">${matches.map(houseCard).join('')}</div>`
    : empty('Rumah belum ditemukan', 'Coba nama lain atau pilih semua kota.'));
}

export function materialPage(mode, orders) {
  const group = mode === 'group';
  return hero('MARKETPLACE', 'Material Bangunan', 'Bandingkan harga satuan dan ikuti pembelian kolektif untuk kebutuhan proyek Anda.') + section(`
    <nav class="tabs" aria-label="Metode pembelian"><a href="#material" aria-current="${group ? 'false' : 'page'}">Katalog Material</a><a href="#material?mode=group" aria-current="${group ? 'page' : 'false'}">Group Buy</a></nav>
    ${note(group ? 'Harga kelompok berlaku dalam simulasi ketika target jumlah unit tercapai.' : 'Produk dan harga dalam katalog ini merupakan contoh.')}
    <div class="cards">${materials.map(item => materialCard(item, group, orders)).join('')}</div>`);
}

function materialCard(item, group, orders) {
  const joined = item.joined + orders.filter(order => order.kind === 'Group Buy' && order.itemId === item.id).reduce((total, order) => total + order.quantity, 0);
  const price = group ? item.groupPrice : item.price;
  return `<article class="card material-card"><div class="product-art ${item.color}">${icon(item.icon, 78)}<span class="pill">${group ? 'Group Buy' : e(item.category)}</span></div>
    <div class="card-body"><h3>${e(item.name)}</h3><div class="product-price"><strong>${money(price)}</strong> / ${item.unit} ${group ? `<del>${money(item.price)}</del>` : ''}</div>
    ${group ? `<div class="progress"><label>${number(joined)} dari ${number(item.goal)} ${item.unit} terkumpul <progress max="${item.goal}" value="${Math.min(joined, item.goal)}"></progress></label></div>` : ''}
    ${button(group ? 'group-order' : 'material-order', group ? 'Ikut Group Buy' : 'Buat Pesanan', item.id, 'primary wide', group ? 'users' : 'bag')}</div></article>`;
}

export function kprPage(listings, selected) {
  const price = selected?.price ?? 166000000;
  return hero('PEMBIAYAAN', 'Simulasi KPR', 'Perkirakan cicilan bulanan dari harga rumah, uang muka, tenor, dan asumsi bunga.') + section(`
    <div class="two-col">
      <form id="mortgage" class="panel form-grid">
        <h2 class="full">Rincian pembiayaan</h2>
        <label class="full">Pilih rumah (opsional)<select name="listing"><option value="">Masukkan harga sendiri</option>${listings.map(home => `<option value="${e(home.id)}" ${home.id === selected?.id ? 'selected' : ''}>${e(home.name)}</option>`).join('')}</select></label>
        <label>Harga rumah (Rp)<input name="price" type="number" min="1" max="1000000000000" step="1" value="${price}" required></label>
        <label>Uang muka (Rp)<input name="down" type="number" min="0" max="1000000000000" step="1" value="${Math.min(10000000, Math.floor(price * .1))}" required></label>
        <label>Tenor (tahun)<input name="years" type="number" min="1" max="40" step="1" value="20" required></label>
        <label>Asumsi bunga (% per tahun)<input name="rate" type="number" min="0" max="40" step="0.01" value="5" required></label>
        <p id="mortgage-error" class="form-error full" role="status" hidden></p>
        <button class="button primary full" type="submit">${icon('calculator', 18)} Hitung Cicilan</button>
      </form>
      <div class="panel mortgage-result"><div class="tile-icon">${icon('calculator', 25)}</div><h2>Estimasi cicilan</h2><div class="payment"><strong id="payment">—</strong><span> / bulan</span></div><dl><div><dt>Pokok pinjaman</dt><dd id="principal">—</dd></div><div><dt>Estimasi total bunga</dt><dd id="interest">—</dd></div></dl>
        <p>Simulasi anuitas dengan bunga tetap. Biaya administrasi, pajak, dan asuransi belum termasuk.</p>
        ${button('apply', 'Ajukan KPR', '', 'light wide')}</div>
    </div>`);
}

export function memberPage() {
  return hero('JARINGAN PENGEMBANG', 'Anggota ASPPRIN', 'Ruang kolaborasi bagi pengembang perumahan rakyat di Indonesia.', link('daftar', 'Daftar Menjadi Anggota') + link('sosialisasi', 'Sosialisasi & Akademi', 'glass')) + section(`
    ${heading('KEANGGOTAAN', 'Bergabung dan berkolaborasi', 'Kenali kegiatan organisasi dan cara memulai pendaftaran.')}
    <div class="cards">
      ${infoCard('users', 'Jaringan pengembang', 'Bangun kerja sama dan berbagi pengalaman dengan pengembang di berbagai daerah.')}
      ${infoCard('tree', 'Struktur organisasi', 'Kenali pengurus, dewan dan klaster kerja ASPPRIN.', link('organisasi', 'Lihat Struktur', 'outline small'))}
      ${infoCard('mail', 'Layanan keanggotaan', 'Hubungi ASPPRIN untuk mengonfirmasi status anggota dan proses pendaftaran resmi.', link('kontak', 'Lihat Kontak', 'outline small'))}
    </div>
    <div class="gallery-heading">${heading('DIREKTORI CONTOH', 'Pengembang dalam marketplace', 'Entri ilustrasi untuk memperlihatkan bentuk direktori. Status anggota resmi dapat dikonfirmasi melalui layanan ASPPRIN.')}</div>
    <div class="cards">${cities.map(city => infoCard('home', 'Pengembang Contoh ' + city, city + ' · Profil contoh pengembang rumah tapak')).join('')}</div>`);
}

const infoCard = (glyph, title, content, action = '') => `<article class="card info-card"><span class="tile-icon">${icon(glyph, 24)}</span><h3>${title}</h3><p>${content}</p>${action}</article>`;

export function academyPage(tab, { interested, completed }) {
  const learning = tab === 'belajar';
  return hero('KEANGGOTAAN', 'Sosialisasi & Akademi', 'Jelajahi topik sosialisasi dan pelajari cara menggunakan layanan marketplace.') + section(`
    <nav class="tabs academy-tabs" aria-label="Bagian akademi">
      <a href="#sosialisasi" aria-current="${learning ? 'false' : 'page'}">Agenda Sosialisasi</a>
      <a href="#sosialisasi?tab=belajar" aria-current="${learning ? 'page' : 'false'}">Modul Belajar</a>
    </nav>
    ${learning ? `<div class="panel academy-progress"><label>${completed.length} dari ${academy.length} modul selesai<progress max="${academy.length}" value="${completed.length}"></progress></label></div>` : note('Topik agenda contoh. Minat disimpan di browser ini. Untuk jadwal resmi, lihat <a class="text-link" href="#kontak">kontak ASPPRIN</a>.')}
    <div class="cards">${academy.map(item => learning
      ? infoCard(item.icon, item.title, item.summary, button('learn', completed.includes(item.id) ? 'Ulangi Modul' : 'Mulai Belajar', item.id, 'outline small', completed.includes(item.id) ? 'check' : 'arrow-right'))
      : infoCard(item.icon, item.agenda, item.summary, button('academy-interest', interested.includes(item.id) ? 'Batalkan Minat' : 'Simpan Minat', item.id, 'outline small', interested.includes(item.id) ? 'check' : 'plus'))).join('')}</div>`);
}

export function lessonContent(item, done) {
  return item.steps.map(step => `<p>${e(step)}</p>`).join('') + (done
    ? note('Modul ini sudah selesai.')
    : button('complete-lesson', 'Tandai Selesai', item.id, 'primary', 'check'));
}
export const demoNote = note('Formulir pratinjau. Gunakan data contoh. Catatan tersimpan di browser ini.');
export const personFields = `<label>Nama lengkap<input name="name" autocomplete="off" maxlength="80" placeholder="Nama contoh" required></label><label>Email<input name="email" type="email" autocomplete="off" maxlength="120" placeholder="nama@example.com" required></label>`;

export function signupPage() {
  return hero('KEANGGOTAAN', 'Daftar menjadi anggota', 'Coba alur pendaftaran sebagai pengembang perumahan.') + section(`
    <div class="panel form-panel"><h2>Formulir keanggotaan</h2>${demoNote}
      <form class="form-grid" id="signup">${personFields}
        <label>Nama perusahaan<input name="company" autocomplete="off" maxlength="90" required></label>
        <label>Kota / kabupaten<input name="city" autocomplete="off" maxlength="50" required></label>
        <button class="button primary full">Simpan Pendaftaran Contoh ${icon('arrow-right', 18)}</button>
      </form>
    </div>`);
}

export function ordersPage(orders, filter) {
  const matching = filter ? orders.filter(order => order.kind === filter) : orders;
  return hero('AKTIVITAS SAYA', 'Pesanan & Pengajuan', 'Pantau pesanan material, minat rumah, dan pengajuan contoh di browser ini.') + section(`
    <label class="order-filter">Jenis aktivitas<select id="order-filter">${options(orderKinds, 'Semua aktivitas')}</select></label>
    ${matching.length ? `<div class="order-list">${matching.map(order => `<article class="panel order"><span class="tile-icon">${icon(order.kind.includes('Rumah') ? 'home' : 'bag')}</span>
    <div><small>${e(order.kind)} · ${e(order.id)}</small><h3>${e(order.title)}</h3><p>${e(order.detail)}</p></div>
    <div class="order-meta"><span class="pill status"><i></i>${e(order.status)}</span><small>${new Date(order.created).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</small></div></article>`).join('')}</div>` : empty('Belum ada aktivitas', 'Pesanan dan pengajuan yang Anda simpan akan muncul di sini.')}`);
}

export function assistantPage() {
  return hero('PANDUAN MARKETPLACE', 'Asisten AI Pencari Rumah', 'Tentukan kriteria Anda dan lihat pilihan rumah yang paling mendekati kebutuhan.') + section(`
    <div class="panel"><h2>Preferensi rumah</h2>${note('Pilihan Seimbang memakai AI di perangkat jika model tersedia. Di browser lain, pilihan diurutkan berdasarkan harga per m² bangunan.')}
    <form id="assistant-form" class="form-grid assistant-form">
      <label>Kota<select name="city">${options(cities, 'Semua kota')}</select></label>
      <label>Anggaran maksimal (Rp)<input name="budget" type="number" min="1" max="1000000000000" value="175000000" required></label>
      <label>Prioritas<select name="priority"><option value="balance">Seimbang (AI)</option><option value="price">Harga terendah</option><option value="space">Bangunan terluas</option></select></label>
      <button class="button primary">${icon('sparkles', 18)} Temukan Rekomendasi</button>
    </form></div><div class="assistant-results" id="assistant-results" aria-live="polite"></div>`);
}

export function assistantResults(matches, budget, priority, pick) {
  const ranking = { space: 'luas bangunan', price: 'harga terendah', balance: 'harga per m² bangunan' };
  const summary = pick ? `Pilihan AI di perangkat: <strong>${e(pick.name)}</strong>.` : `Diurutkan menurut ${ranking[priority]}.`;
  const ordered = pick ? [pick, ...matches.filter(home => home.id !== pick.id)] : matches;
  return matches.length ? `<h2>${matches.length} rumah sesuai anggaran</h2><p>Anggaran maksimal ${money(budget)}. ${summary}</p><div class="cards">${ordered.map(houseCard).join('')}</div>` : empty('Belum ada rumah yang cocok', 'Perluas pilihan kota atau sesuaikan anggaran.');
}

const missions = [
  ['Program nasional', 'Mendorong percepatan penyediaan rumah rakyat melalui proyek pengembang anggota.'],
  ['Kompetensi pengembang', 'Mengembangkan kapasitas anggota lewat pelatihan, edukasi, dan pendampingan.'],
  ['Kebijakan dan perizinan', 'Memberikan masukan terkait regulasi, pertanahan, tata ruang, dan perizinan.'],
  ['Pembiayaan perumahan', 'Mendorong kerja sama yang memperluas akses pembiayaan konstruksi dan KPR.'],
  ['Material dan konstruksi', 'Meningkatkan efisiensi rantai pasok dan mendorong penerapan teknologi konstruksi.'],
  ['Tata kelola organisasi', 'Mengelola data anggota dan pemantauan program agar lebih terintegrasi.'],
];

export function visionPage() {
  return hero('ARAH & TUJUAN', 'Visi & Misi ASPPRIN', 'Kolaborasi untuk penyediaan hunian layak, aman, terjangkau, dan berkelanjutan.') + section(`
    <div class="panel vision">${eyebrow('VISI')}<h2>Rumah layak untuk masyarakat Indonesia</h2><p>ASPPRIN berupaya menjadi asosiasi pengembang yang profesional dan berintegritas, serta memperkuat kerja sama untuk menyediakan hunian yang bisa dijangkau berbagai lapisan masyarakat.</p></div>
    ${heading('MISI STRATEGIS', 'Enam fokus kerja', 'Ringkasan arah kerja organisasi berdasarkan situs ASPPRIN.')}
    <div class="cards">${missions.map(([name, detail], i) => infoCard(['home', 'users', 'shield', 'calculator', 'bricks', 'tree'][i], name, detail)).join('')}</div><p class="source">${official}</p>`);
}

const board = [
  ['Ketua', 'Ricko Armansyah, S.E., M.B.A.'],
  ['Wakil Ketua', 'Fahmi Arifudin'],
  ['Sekretaris', 'Rakhmat Hidayat'],
  ['Wakil Sekretaris', 'Martinus Moda'],
  ['Bendahara', 'Setiyo Sarmoko, S.E.'],
  ['Wakil Bendahara', 'Ridwan Arifin'],
];

export function orgPage() {
  return hero('ORGANISASI', 'Struktur Organisasi ASPPRIN', 'Kenali susunan Kantor Wilayah Executive Nasional ASPPRIN.') + section(`
    ${heading('PENGURUS INTI', 'Kantor Wilayah Executive Nasional', 'Susunan pengurus sebagaimana tercantum di situs ASPPRIN.')}
    <div class="cards">${board.map(([role, name]) => `<article class="card info-card"><span class="tile-icon">${icon('users', 22)}</span><small class="role">${role}</small><h3>${name}</h3></article>`).join('')}</div>
    <div class="panel organization-panel"><h2>Susunan organisasi</h2><p>Dewan Pembina/Penasihat, Dewan Pengawas, Pengurus Inti, serta Kepala Bidang dan Divisi mendukung kerja organisasi nasional.</p><div class="tags">${['Program', 'Legal & Project', 'Finance & Partnership', 'Data & Governance', 'Industri & Public'].map(name => `<span class="pill">${name}</span>`).join('')}</div><p class="source">${official}</p></div>`);
}

export function newsPage() {
  return hero('INFORMASI & GALERI', 'News Gallery', 'Panduan marketplace dan galeri ilustrasi hunian. Untuk berita organisasi, kunjungi situs resmi ASPPRIN.') + section(`
    ${heading('KABAR ASPPRIN', 'Topik dari situs resmi', 'Ikuti pemberitaan ASPPRIN tentang pengembangan perumahan rakyat.', official)}
    <div class="cards">
      ${infoCard('home', 'Dukungan Program 3 Juta Rumah', 'Peran pengembang dalam mempercepat penyediaan hunian rakyat.')}
      ${infoCard('tree', 'Koordinasi klaster kerja', 'Pembahasan penguatan lima klaster kerja di tingkat nasional.')}
      ${infoCard('calculator', 'Kolaborasi pembiayaan perumahan', 'Upaya memperluas akses pembiayaan lewat sinergi perbankan dan BP Tapera.')}
    </div>
    <div class="gallery-heading">
    ${heading('PANDUAN MARKETPLACE', 'Bacaan pilihan', 'Pelajari alur pencarian rumah, Group Buy, dan simulasi KPR.')}
    </div>
    <div class="cards">${articles.map(article => `<article class="card"><div class="card-photo"><img src="${asset(article.photo)}" alt="" loading="lazy"></div><div class="card-body"><small class="role">${article.category}</small><h3>${article.title}</h3><p>${article.lead}</p>${button('article', 'Baca Panduan', article.id, 'outline small')}</div></article>`).join('')}</div>
    <div class="gallery-heading">${heading('GALERI ILUSTRASI', 'Hunian dan material', 'Foto ilustrasi katalog marketplace.')}</div>
    <div class="cards">${['cendana.jpg', 'mentari.jpg', 'material.jpg'].map((photo, index) => `<button class="gallery-item" data-action="gallery" data-id="${index}" type="button" aria-label="Perbesar ilustrasi ${index + 1}"><img src="${asset(photo)}" alt="${index === 2 ? 'Ilustrasi material bangunan' : 'Ilustrasi hunian rakyat'}" loading="lazy"></button>`).join('')}</div>`);
}

export function contactPage() {
  return hero('HUBUNGI KAMI', 'Kontak ASPPRIN', 'Hubungi organisasi untuk informasi keanggotaan, kolaborasi, dan kegiatan ASPPRIN.') + section(`
    <div class="two-col">
      <div class="panel contact-panel"><h2>Kantor ASPPRIN</h2>
        <p class="contact-line">${icon('pin')}<span>Rukan Grand Icon Caman No. B.10, Jl. Caman Raya No. 21, Jatibening, Pondok Gede, Kota Bekasi, Jawa Barat 17412</span></p>
        <p class="contact-line">${icon('phone')}<a href="tel:087788299008">0877-8829-9008</a></p>
        <p class="contact-line">${icon('mail')}<a href="mailto:kanwildppaspprin@gmail.com">kanwildppaspprin@gmail.com</a></p>
        <p class="source">${official}</p>
      </div>
      <div class="panel contact-panel"><h2>Layanan keanggotaan</h2><p>Hubungi nomor WhatsApp yang tercantum di situs ASPPRIN.</p>
      <p class="contact-line">${icon('messages')}<a href="https://wa.me/6282260717744" target="_blank" rel="noopener">0822-6071-7744</a></p>
      <p class="contact-line">${icon('messages')}<a href="https://wa.me/6285607775673" target="_blank" rel="noopener">0856-0777-5673</a></p>
      ${link('daftar', 'Coba Formulir Pendaftaran', 'outline')}</div>
    </div>`);
}
