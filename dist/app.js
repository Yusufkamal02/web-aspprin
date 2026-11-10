import { icon } from './icons.js';
import { houses, materials, articles } from './data.js';
import { escape as e, money, mortgage, recommendations, onDevicePick } from './domain.js';
import * as view from './views.js';

const $ = selector => document.querySelector(selector);
const main = $('#main');
const dialog = $('#dialog');
const storageKey = 'aspprin-marketplace-v1';
const emptyState = () => ({ orders: [], listings: [] });

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved?.orders) && Array.isArray(saved?.listings) ? saved : emptyState();
  } catch {
    return emptyState();
  }
}

let state = readState();
let activeRoute;
let toastTimer;
let dialogSubmit;
let searchRun = 0;
const listings = () => [...houses, ...state.listings];

function updateBadge() {
  const badge = $('.order-count');
  badge.hidden = state.orders.length === 0;
  badge.textContent = state.orders.length;
}

function toast(message) {
  const status = $('#toast');
  status.textContent = message;
  status.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { status.hidden = true; }, 4300);
}

function record(kind, title, detail, extra = {}, listing) {
  const current = readState();
  const id = 'ASP-' + crypto.randomUUID().slice(0, 8).toUpperCase();
  const order = { id, kind, title, detail, status: 'Tersimpan (Demo)', created: Date.now(), ...extra };
  const next = { orders: [order, ...current.orders], listings: listing ? [listing, ...current.listings] : current.listings };
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    toast('Browser tidak dapat menyimpan aktivitas. Periksa pengaturan penyimpanan.');
    return false;
  }
  state = next;
  updateBadge();
  return true;
}

function go(route) {
  if (location.hash.slice(1) === route) render();
  else location.hash = route;
}

function setMenu(open) {
  $('[data-menu]').setAttribute('aria-expanded', String(open));
  $('[data-menu]').setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  $('#main-nav').classList.toggle('open', open);
}

function render(resetScroll = false) {
  const [name, search] = (location.hash.slice(1) || 'beranda').split('?');
  if (name === 'main') return;
  const params = new URLSearchParams(search);
  const all = listings();
  const pages = {
    beranda: () => view.homePage(all),
    rumah: () => view.houseCatalog(all, params),
    material: () => view.materialPage(params.get('mode'), state.orders),
    anggota: view.memberPage,
    daftar: view.signupPage,
    kpr: () => view.kprPage(all, all.find(home => home.id === params.get('rumah'))),
    pesanan: () => view.ordersPage(state.orders, params.get('jenis') || ''),
    asisten: view.assistantPage,
    'visi-misi': view.visionPage,
    organisasi: view.orgPage,
    berita: view.newsPage,
    kontak: view.contactPage,
  };
  const page = Object.hasOwn(pages, name) ? name : 'beranda';
  activeRoute = page;
  main.innerHTML = pages[page]();
  document.title = page === 'beranda' ? 'ASPPRIN Marketplace — Ekosistem Perumahan Rakyat' : main.querySelector('h1').textContent + ' | ASPPRIN Marketplace';
  document.querySelectorAll('.main-nav a, .utility nav a, .orders-link').forEach(link => {
    if (link.hash === '#' + page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (page === 'rumah') {
    $('#house-filter').elements.city.value = params.get('city') || '';
    $('#house-filter').elements.sort.value = params.get('sort') || '';
  }
  if (page === 'pesanan') $('#order-filter').value = params.get('jenis') || '';
  if (page === 'kpr') updateMortgage();
  if (resetScroll) {
    setMenu(false);
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function updateMortgage() {
  const form = $('#mortgage');
  const { price, down, years, rate } = Object.fromEntries(new FormData(form));
  form.elements.down.setCustomValidity(+down >= +price && price ? 'Uang muka harus lebih kecil dari harga rumah.' : '');
  const valid = form.checkValidity();
  const error = $('#mortgage-error');
  error.hidden = valid;
  error.textContent = valid ? '' : 'Periksa nilai pembiayaan. Uang muka harus lebih kecil dari harga rumah.';
  $('.mortgage-result [data-action="apply"]').disabled = !valid;
  const data = valid ? mortgage(+price, +down, +years, +rate) : null;
  $('#payment').textContent = data ? money(data.installment) : '—';
  $('#principal').textContent = data ? money(data.principal) : '—';
  $('#interest').textContent = data ? money(data.interest) : '—';
  return data;
}

function modal(title, body, onSubmit) {
  dialogSubmit = onSubmit;
  dialog.innerHTML = `<div class="dialog-content"><div class="dialog-top"><h2 id="dialog-title">${e(title)}</h2><button class="icon-button" data-action="close-dialog" aria-label="Tutup">${icon('x')}</button></div>${body}</div>`;
  if (!dialog.open) dialog.showModal();
  else dialog.querySelector('button').focus();
}

function houseDetails(id) {
  const home = listings().find(item => item.id === id);
  if (!home) return;
  modal(home.name, `
    <img class="dialog-picture" src="${view.asset(home.photo)}" alt="Ilustrasi hunian">
    <p class="location">${icon('pin', 17)} ${e(home.city)}, ${e(home.province)} · ${e(home.label)}</p>
    <p>${e(home.description)}</p><p><strong>${money(home.price)}</strong> · Harga contoh</p>
    <div class="specs"><span>${icon('bed', 17)} ${home.rooms} kamar tidur</span><span>${icon('bath', 17)} ${home.bath} kamar mandi</span><span>${icon('ruler', 17)} LB ${home.building} m² / LT ${home.land} m²</span></div>
    <div class="action-row"><button class="button primary" data-action="interest" data-id="${e(id)}">Saya Tertarik ${icon('arrow-right', 17)}</button><button class="button outline" data-action="simulate" data-id="${e(id)}">Simulasi KPR ${icon('calculator', 17)}</button></div>`);
}

function saveAndShow(kind, title, detail, extra, listing) {
  if (!record(kind, title, detail, extra, listing)) return;
  if (dialog.open) dialog.close();
  go('pesanan');
  toast('Aktivitas contoh disimpan di Pesanan.');
}

function sell() {
  modal('Pasang iklan rumah contoh', `${view.demoNote}<form class="form-grid" data-dialog-form>
    <label class="full">Nama perumahan<input name="name" maxlength="70" required></label>
    <label>Kota<select name="city" required><option value="">Pilih kota</option>${view.options(view.cities)}</select></label>
    <label>Harga rumah (Rp)<input type="number" name="price" min="1" max="1000000000000" required></label>
    <label>Luas bangunan (m²)<input type="number" name="building" min="1" max="1000" required></label>
    <label>Luas tanah (m²)<input type="number" name="land" min="1" max="10000" required></label>
    <label>Kamar tidur<input type="number" name="rooms" min="0" max="30" value="2" required></label>
    <label>Kamar mandi<input type="number" name="bath" min="0" max="30" value="1" required></label>
    <label class="full">Deskripsi<textarea name="description" maxlength="350" required></textarea></label>
    <button class="button primary full">Simpan Iklan Contoh ${icon('plus', 17)}</button></form>`,
  (data, form) => {
    if (!requireText(form, ['name', 'description'])) return;
    const listing = { id: crypto.randomUUID(), name: data.name.trim(), city: data.city, province: data.city === 'Tangerang' ? 'Banten' : 'Jawa Barat', price: +data.price, building: +data.building, land: +data.land, rooms: +data.rooms, bath: +data.bath, photo: 'cendana.jpg', label: 'Iklan Contoh', description: data.description.trim() };
    if (!record('Iklan Rumah', listing.name, listing.city + ' · ' + money(listing.price), {}, listing)) return;
    dialog.close();
    go('rumah');
    toast('Iklan contoh ditambahkan ke katalog.');
  });
}

function materialOrder(id, group) {
  const item = materials.find(product => product.id === id);
  if (!item) return;
  const price = group ? item.groupPrice : item.price;
  modal(group ? 'Ikut Group Buy' : 'Pesan Material', `
    <p><strong>${e(item.name)}</strong> · ${money(price)} per ${item.unit}</p>${view.demoNote}
    <form class="form-grid" data-dialog-form>
      <label class="full">Jumlah (${item.unit})<input type="number" name="quantity" min="1" max="10000" value="1" required></label>
      <p class="full">Estimasi total <strong id="order-total">${money(price)}</strong></p>
      <button class="button primary full">${group ? 'Simpan Kontribusi' : 'Simpan Pesanan Contoh'} ${icon('bag', 17)}</button>
    </form>`, data => {
    const quantity = Number(data.quantity);
    saveAndShow(group ? 'Group Buy' : 'Material', item.name, `${quantity} ${item.unit} · ${money(quantity * price)}`, { itemId: id, quantity });
  });
  dialog.querySelector('[name="quantity"]').addEventListener('input', event => {
    const input = event.target;
    $('#order-total').textContent = input.validity.valid ? money(input.valueAsNumber * price) : '—';
  });
}

function interest(id) {
  const home = listings().find(item => item.id === id);
  if (!home) return;
  modal('Simpan minat rumah', `<p>${e(home.name)} · ${money(home.price)}</p>${view.demoNote}<form class="form-grid" data-dialog-form>${view.personFields}<button class="button primary full">Simpan Minat ${icon('arrow-right', 17)}</button></form>`, (_, form) => {
    if (requireText(form, ['name'])) saveAndShow('Minat Rumah', home.name, home.city + ' · ' + money(home.price));
  });
}

function apply() {
  const result = updateMortgage();
  if (!result) return;
  const fields = $('#mortgage').elements;
  const home = listings().find(item => item.id === fields.listing.value);
  const title = home?.name ?? 'Pengajuan KPR';
  const detail = `Pinjaman ${money(result.principal)} · ${fields.years.value} tahun · ${money(result.installment)}/bulan`;
  modal('Ajukan KPR', `<p>${e(detail)}</p>${view.demoNote}<form class="form-grid" data-dialog-form>${view.personFields}<button class="button primary full">Simpan Pengajuan Contoh ${icon('arrow-right', 17)}</button></form>`, (_, form) => {
    if (requireText(form, ['name'])) saveAndShow('KPR', title, detail);
  });
}

function article(id) {
  const item = articles.find(entry => entry.id === id);
  if (item) modal(item.title, `<img class="dialog-picture" src="${view.asset(item.photo)}" alt=""><p><strong>${item.lead}</strong></p>${item.body.map(paragraph => `<p>${paragraph}</p>`).join('')}`);
}

function gallery(id) {
  const photo = ['cendana.jpg', 'mentari.jpg', 'material.jpg'][id];
  if (photo) modal(id === '2' ? 'Ilustrasi material bangunan' : 'Ilustrasi hunian rakyat', `<img class="dialog-gallery" src="${view.asset(photo)}" alt="Foto ilustrasi katalog ASPPRIN">`);
}

function showChat(open) {
  $('#chat').hidden = !open;
  $('#chat-launch').setAttribute('aria-expanded', String(open));
  if (open) $('#chat-form input').focus();
  else $('#chat-launch').focus();
}

const topics = [
  [/pesanan|status|riwayat/, 'Pesanan dan pengajuan contoh tersedia di halaman Pesanan pada browser yang sama.', 'pesanan', 'Buka Pesanan'],
  [/group|kolektif|semen|material|bata|besi/, 'Group Buy menggabungkan jumlah unit dari beberapa pesanan untuk mencapai target kelompok. Pilih produk dan jumlah yang ingin Anda ikuti.', 'material?mode=group', 'Lihat Group Buy'],
  [/kpr|simulasi|cicil|bunga|tenor|dp|pembiayaan/, 'Untuk memperkirakan cicilan, masukkan harga rumah, uang muka, tenor, dan asumsi bunga. Anda juga bisa menyimpan contoh pengajuan dari hasil simulasi.', 'kpr', 'Buka Simulasi KPR'],
  [/daftar|anggota|gabung/, 'Anda bisa mencoba formulir untuk pengembang. Gunakan kanal keanggotaan ASPPRIN untuk proses resmi.', 'daftar', 'Buka Formulir Anggota'],
  [/kantor|kontak|telepon|whatsapp|email|alamat/, 'Halaman Kontak memuat alamat, telepon, email, dan WhatsApp keanggotaan dari situs resmi ASPPRIN.', 'kontak', 'Buka Kontak'],
  [/budget|anggaran|rekomendasi|asisten/, 'Asisten Pencari Rumah membandingkan pilihan berdasarkan kota, anggaran, dan prioritas luas atau harga.', 'asisten', 'Buka Asisten Pencari Rumah'],
  [/rumah|subsidi|hunian|lokasi|iklan/, 'Cari hunian berdasarkan kota atau nama perumahan, lalu lihat detail untuk menyimpan minat atau mencoba simulasi KPR. Pengembang dapat menambah iklan contoh dari katalog.', 'rumah', 'Jelajahi Rumah Subsidi'],
];

function chatReply(message) {
  const cleaned = message.trim();
  if (!cleaned) return;
  const log = $('#chat-log');
  const user = document.createElement('p');
  user.className = 'chat-bubble user';
  user.textContent = cleaned;
  const [, answer, route, label] = topics.find(([pattern]) => pattern.test(cleaned.toLowerCase())) ?? [];
  const response = document.createElement('p');
  response.className = 'chat-bubble';
  response.textContent = answer ?? 'Saya bisa membantu seputar rumah subsidi, KPR, Group Buy, keanggotaan, atau pesanan. Coba pilih salah satu topik.';
  if (route) {
    const link = document.createElement('a');
    link.href = '#' + route;
    link.textContent = label + ' →';
    response.append(link);
  }
  log.append(user, response);
  log.scrollTop = log.scrollHeight;
}

function requireText(form, names) {
  for (const name of names) {
    const field = form.elements[name];
    if (field.value.trim()) continue;
    field.setCustomValidity('Isi kolom ini dengan teks.');
    field.reportValidity();
    return false;
  }
  return true;
}

async function findRecommendations(values) {
  const run = ++searchRun;
  const results = $('#assistant-results');
  const budget = Number(values.budget);
  const { priority } = values;
  const matches = recommendations(listings(), values.city, budget, priority);
  results.innerHTML = view.assistantResults(matches, budget, priority);
  if (priority !== 'balance') return;
  const pick = await onDevicePick(matches);
  if (pick && run === searchRun && results.isConnected) results.innerHTML = view.assistantResults(matches, budget, priority, pick);
}

const actions = {
  house: houseDetails,
  sell,
  'material-order': id => materialOrder(id, false),
  'group-order': id => materialOrder(id, true),
  interest,
  simulate: id => { dialog.close(); go('kpr?rumah=' + encodeURIComponent(id)); },
  apply,
  article,
  gallery,
  'close-dialog': () => dialog.close(),
  'toggle-chat': () => showChat($('#chat').hidden),
  'close-chat': () => showChat(false),
};

document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]');
  if (action) actions[action.dataset.action]?.(action.dataset.id);
  const prompt = event.target.closest('[data-prompt]');
  if (prompt) chatReply(prompt.dataset.prompt);
  if (event.target.closest('[data-menu]')) setMenu(!$('#main-nav').classList.contains('open'));
  if (event.target.closest('.main-nav a')) setMenu(false);
  if (event.target.closest('#chat-log a')) showChat(false);
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || dialog.open) return;
  if (!$('#chat').hidden) showChat(false);
  else if ($('#main-nav').classList.contains('open')) {
    setMenu(false);
    $('[data-menu]').focus();
  }
});

document.addEventListener('submit', event => {
  const form = event.target;
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  if (form.matches('[data-dialog-form]')) dialogSubmit?.(values, form);
  if (form.id === 'mortgage') updateMortgage();
  if (form.id === 'signup' && requireText(form, ['name', 'company', 'city'])) saveAndShow('Keanggotaan', 'Pendaftaran anggota ASPPRIN', 'Formulir keanggotaan contoh');
  if (form.id === 'assistant-form') void findRecommendations(values);
  if (form.id === 'house-filter') {
    const next = new URLSearchParams(Object.entries(values).filter(([, value]) => value.trim()));
    const hash = '#rumah' + (next.size ? '?' + next : '');
    history.replaceState(null, '', hash);
    $('#house-results').innerHTML = view.houseResults(listings(), values.q, values.city, values.sort);
  }
  if (form.id === 'chat-form') {
    chatReply(values.message);
    form.reset();
    form.elements.message.focus();
  }
});

document.addEventListener('input', event => {
  const input = event.target;
  if (input.validity?.customError) input.setCustomValidity('');
  if (input.form?.id !== 'mortgage' || input.name === 'listing') return;
  if (input.name === 'price') input.form.elements.listing.value = '';
  updateMortgage();
});

document.addEventListener('change', event => {
  const input = event.target;
  if (input.id === 'order-filter') {
    const route = input.value ? 'pesanan?jenis=' + encodeURIComponent(input.value) : 'pesanan';
    history.replaceState(null, '', '#' + route);
    render();
    $('#order-filter').focus();
  }
  if (input.name === 'listing' && input.form?.id === 'mortgage') {
    const home = listings().find(item => item.id === input.value);
    if (home) input.form.elements.price.value = home.price;
    updateMortgage();
  }
});

window.addEventListener('hashchange', () => render(true));
window.addEventListener('storage', event => {
  if (event.key !== storageKey && event.key !== null) return;
  state = readState();
  updateBadge();
  if (!dialog.open && ['pesanan', 'material'].includes(activeRoute)) render();
});
dialog.addEventListener('close', () => { dialogSubmit = undefined; });
document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
$('#year').textContent = new Date().getFullYear();
updateBadge();
render();
