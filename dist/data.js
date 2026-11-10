export const houses = [
  { id: 'cendana', name: 'Griya Cendana Asri', city: 'Bogor', province: 'Jawa Barat', price: 166000000, building: 30, land: 60, rooms: 2, bath: 1, photo: 'cendana.jpg', label: 'Siap Huni', description: 'Hunian satu lantai dengan dua kamar tidur, teras depan dan ruang keluarga yang menyatu dengan area makan.' },
  { id: 'savana', name: 'Taman Savana Residence', city: 'Bekasi', province: 'Jawa Barat', price: 175000000, building: 36, land: 60, rooms: 2, bath: 1, photo: 'savana.jpg', label: 'Unit Baru', description: 'Rumah tipe 36 dengan area keluarga yang lapang, dua kamar tidur, dan ruang terbuka di depan rumah.' },
  { id: 'mentari', name: 'Puri Mentari Sejahtera', city: 'Tangerang', province: 'Banten', price: 168000000, building: 30, land: 60, rooms: 2, bath: 1, photo: 'mentari.jpg', label: 'Siap Huni', description: 'Rumah kompak dengan dua kamar tidur, taman depan kecil dan tata ruang yang mudah disesuaikan.' },
];

export const materials = [
  { id: 'semen', name: 'Semen Portland 50 kg', category: 'Semen', unit: 'sak', price: 69000, groupPrice: 60000, joined: 68, goal: 100, icon: 'package', color: 'sand' },
  { id: 'bata', name: 'Bata Ringan AAC 10 cm', category: 'Bata & Blok', unit: 'm³', price: 675000, groupPrice: 610000, joined: 15, goal: 25, icon: 'bricks', color: 'clay' },
  { id: 'besi', name: 'Besi Beton Ulir 10 mm', category: 'Besi & Baja', unit: 'batang', price: 78000, groupPrice: 71000, joined: 82, goal: 150, icon: 'ruler', color: 'mint' },
];

export const articles = [
  { id: 'rumah-pertama', category: 'Panduan Rumah', title: 'Langkah awal memilih rumah pertama', photo: 'cendana.jpg', lead: 'Bandingkan lokasi, kebutuhan ruang, dan biaya sebelum menjadwalkan kunjungan.', body: ['Buat daftar lokasi yang masih nyaman untuk perjalanan sehari-hari. Saat mengunjungi lokasi, cek akses jalan, transportasi, dan fasilitas di sekitarnya.', 'Bandingkan denah rumah dan luas tanah dengan kebutuhan keluarga. Minta informasi tertulis tentang spesifikasi dan komponen biaya dari pengembang.'] },
  { id: 'group-buy', category: 'Material', title: 'Bagaimana cara kerja Group Buy?', photo: 'material.jpg', lead: 'Kenali pembelian kolektif dan cara mengikuti target pesanan.', body: ['Pilih produk yang memiliki penawaran Group Buy, masukkan jumlah yang Anda butuhkan, lalu periksa harga kelompok dan target pembelian.', 'Pantau jumlah unit yang terkumpul. Di versi pratinjau, jumlah kontribusi dan riwayat pesanan tersimpan di perangkat Anda.'] },
  { id: 'simulasi-kpr', category: 'Pembiayaan', title: 'Memahami hasil simulasi KPR', photo: 'savana.jpg', lead: 'Lihat bagaimana harga, uang muka, dan tenor memengaruhi cicilan.', body: ['Masukkan harga rumah dan uang muka untuk mendapatkan perkiraan pokok pinjaman. Gunakan tenor dan bunga asumsi untuk membandingkan cicilan bulanan.', 'Simulasi memakai rumus anuitas. Hasilnya belum mencakup biaya bank, pajak, maupun asuransi. Konfirmasi biaya dan ketentuan aktual kepada bank.'] },
];

export const academy = [
  {
    id: 'keanggotaan', icon: 'users', agenda: 'Pengenalan keanggotaan', title: 'Memulai pendaftaran anggota',
    summary: 'Kenali layanan keanggotaan dan cara mencoba formulir untuk pengembang.',
    steps: [
      'Buka halaman Keanggotaan untuk melihat layanan ASPPRIN dan tautan ke kontak resmi.',
      'Pada formulir contoh, coba masukkan nama, email, perusahaan, dan kota fiktif. Setelah disimpan, catatan pendaftaran muncul di Pesanan & Pengajuan.',
      'Untuk mendaftar secara resmi, hubungi layanan keanggotaan dan konfirmasi persyaratan serta cara penyerahan dokumen.',
    ],
  },
  {
    id: 'group-buy', icon: 'bricks', agenda: 'Pengenalan pembelian kolektif', title: 'Mengikuti Group Buy',
    summary: 'Pelajari harga kelompok, satuan produk, dan cara membaca progres target.',
    steps: [
      'Buka Material Bangunan dan pilih tab Group Buy. Periksa satuan produk, harga kelompok, dan jumlah yang masih dibutuhkan untuk mencapai target.',
      'Masukkan jumlah yang Anda perlukan dan cek estimasi total. Setelah disimpan, kontribusi contoh muncul di riwayat pesanan dan menambah progres pada browser ini.',
      'Saat merencanakan pembelian sungguhan, sepakati spesifikasi, ongkos kirim, dan jadwal pengiriman dengan pemasok.',
    ],
  },
  {
    id: 'simulasi-kpr', icon: 'calculator', agenda: 'Klinik simulasi pembiayaan', title: 'Membaca hasil simulasi KPR',
    summary: 'Bandingkan skenario harga, uang muka, dan tenor sebelum berbicara dengan bank.',
    steps: [
      'Pilih rumah di simulator atau masukkan harga sendiri. Isi uang muka, tenor, dan asumsi bunga untuk melihat perkiraan cicilan bulanan.',
      'Ubah satu angka pada satu waktu agar Anda bisa melihat dampaknya terhadap cicilan dan total bunga.',
      'Tanyakan suku bunga, biaya tambahan, serta ketentuan terbaru kepada bank sebelum mengambil keputusan pembiayaan.',
    ],
  },
];
