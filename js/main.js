/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Image Modal Handler
   */
  document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');

    document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#imageModal"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const src = this.getAttribute('data-src');
        const title = this.getAttribute('title');
        modalImage.src = src;
        modalTitle.textContent = title;
      });
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Program Details Toggle
   */
  const serviceLinks = document.querySelectorAll('.services-list a');
  const servicesImg = document.querySelector('.services-img');
  const servicesTitle = document.querySelector('.service-details h3');
  const servicesDesc = document.querySelectorAll('.service-details p');
  const servicesList = document.querySelector('.service-details ul');

  const servicesContent = {
    digides: {
      img: 'assets/img/services.jpg',
      title: 'Digides - Digitalisasi Destinasi Wisata',
      desc: [
        'Digitalisasi penuh destinasi wisata melalui pemetaan sebaran objek, website resmi desa, dan QR Code di setiap titik strategis, sehingga informasi wisata dapat diakses real- time & tanpa batas.',
        'Partisipasi Mitra 20 Perangkat desa dan Pokdarwis Dengan Rincian Kegiatan Sebagai Berikut:',
        'KEBERLANJUTAN PROGRAM DIGIDES :Program DIGIDES (Digitalisasi Desa Wisata) dirancang untuk terus berlanjut melalui kolaborasi beragam pihak di Desa Silungkang Oso. Pengelolaan hosting dan domain website wisata akan diperpanjang dan dikelola bersama oleh Pokdarwis serta admin perangkat desa, guna memastikan keberlanjutan promosi digital desa wisata. Kegiatan pelatihan digitalisasi wisata akan dilaksanakan secara rutin oleh mahasiswa KKN UNP bekerja sama dengan Dinas Pariwisata, sehingga kapasitas digital masyarakat desa terus meningkat.Selain itu, QR Code yang terpasang di titik-titik wisata akan diperbarui setiap enam bulan agar konten informasi tetap relevan dan menarik. Desa juga akan membentuk Smart Village Center sebagai pusat inovasi dan literasi digital yang mendorong kreativitas masyarakat di era teknologi. Peta digital dan plang wisata akan dijaga dan dirawat oleh pemuda desa sebagai bagian dari aset penting pengembangan pariwisata.Untuk sektor pertanian, dikembangkan Smart Farming berbasis data dan pemasaran digital guna mendukung peningkatan ekonomi petani. Beberapa destinasi seperti Goa Kelambu dan Camping Ground telah dimasukkan dalam RKPDes dan APBDes sebagai titik prioritas pembangunan wisata desa. Selain itu, desa berkomitmen untuk mengembangkan Perpustakaan Digital sebagai sarana pembelajaran masyarakat berbasis teknologi. Ke depan, desa juga berencana membentuk Koperasi Digital sebagai wadah transaksi dan pengelolaan usaha masyarakat yang transparan, inovatif, dan berdaya saing.'
      ],
      list: [
        'Pelatihan website,Pembuatan website,Pembuatan peta wisata,Pembuatan QR Code.',
        'Pemasangan plang,Spanduk dan petunjuk arah,Membuat area tracking,Pembuatan tong sampah.',
        'Penanaman bibit tanaman lindung,Pembuatan spot foto,Penanaman bunga tulisan “guak kumbuah”.'
      ]
    },
    siaga1: {
      img: 'assets/img/portfolio/app-1.jpg',
      title: 'Siaga 1 - Silungkang Aktif Dan Berdaya',
      desc: [
        '“Menghidupkan kembali Talempong Batuang lewat regenerasi pemain muda,dokumentasi digital, dan pementasan sebagai atraksi budaya yang unik di Sumatera Barat.”',
        'Partisipasi Mitra 15 Orang Generasi muda dan tokoh adat Desa Silungkang Oso Dengan Rincian Kegiatan Sebagai Berikut:',
        'KEBERLANJUTAN PROGRAM SIAGA 1 : Program SIAGA 1 (Silungkang Aktif Dan Berdaya) berfokus pada pelestarian budaya lokal melalui penguatan komunitas seni tradisional. Keberlanjutan program ini diwujudkan melalui aktivitas rutin Komunitas Talempong Botuang yang berada di bawah pembinaan langsung para tokoh adat, sehingga nilai-nilai budaya dan kearifan lokal tetap terjaga secara turun-temurun. Para pemuda desa telah menguasai teknik bermain Talempong Batuang, hasil dari proses pelatihan dan pendampingan yang berkelanjutan.Kegiatan pertunjukan Talempong Batuang kini menjadi agenda rutin dalam berbagai acara budaya dan wisata desa, memperkuat identitas budaya lokal sekaligus menarik wisatawan. Melalui kerja sama dengan Dinas Pendidikan, permainan Talempong Batuang juga direncanakan menjadi bagian dari mata pelajaran seni budaya di sekolah-sekolah sekitar, agar generasi muda terus mengenal dan melestarikan tradisi ini. Sebagai bentuk dokumentasi dan promosi digital, video tutorial Talempong Batuang akan diunggah secara berkala ke media sosial desa, sehingga pengetahuan dan semangat pelestarian budaya dapat tersebar lebih luas.'
      ],
      list: [
        'Menambah 4 buah talempong batuang,Penampilan talempong batuang',
        'Latihan talempong batuang bersama generasi muda dan tokoh adat',
        'Pembuatan Draft Talempong Botuang Untuk Kurikulum Sekolah'
      ]
    },
    rancak: {
      img: 'assets/img/portfolio/books-1.jpg',
      title: 'Rancak - Rancangan Kreatif Silungkang',
      desc: [
        '“Melatih UMKM untuk branding, desain kemasan, pemasaran digital, serta mengolah limbah perca songket menjadi Bross, gantungan kunci, dan souvenir khas bernilai jual tinggi.serta kayu manis menjadi sirup,lilin aroma terapi,dan bubuk kayu manis."',
        'Partisipasi Mitra Ibu – Ibu PKK 20 orang Dengan Rincian Kegiatan Sebagai Berikut:',
        'KEBERLANJUTAN PROGRAM RANCAK :Program RANCAK (Rancangan Kreatif Silungkang) berfokus pada penguatan ekonomi kreatif desa melalui pendampingan UMKM agar mampu bersaing di era digital. Dalam keberlanjutannya, UMKM desa akan terus didampingi oleh Dinas Koperindag untuk memperluas pemasaran berbasis digital dan meningkatkan kapasitas pengelolaan usaha. Produk-produk kreatif hasil inovasi masyarakat desa akan dipasarkan melalui marketplace dan berbagai event kota, sehingga memiliki jangkauan pasar yang lebih luas dan bernilai jual tinggi.Untuk menjaga daya saing, desa akan melaksanakan pelatihan inovasi produk setiap triwulan, yang mencakup pengembangan desain, kemasan, dan strategi promosi digital. Selain itu, sertifikasi usaha akan diperpanjang secara berkala dan dijadikan sebagai standar resmi desa dalam pengelolaan UMKM. Sebagai bentuk pembaruan informasi, katalog UMKM desa akan diperbarui setiap enam bulan agar mencerminkan perkembangan produk dan inovasi terbaru dari para pelaku usaha lokal. Dengan langkah-langkah ini, program RANCAK diharapkan dapat menciptakan ekosistem ekonomi desa yang mandiri, kreatif, dan berkelanjutan.'
      ],
      list: [
        'Pelatihan Pembuatan Lilin Aroma Terapi,Sirup Kayu Manis,Bubuk Kayu Manis.',
        'Pelatihan Pembuatan Gantungan Kunci,Bross,Tote Bag dan Pelatihan Katalog.',
        'Pendampingan Pembuatan Kemasan dan Pendampingan Membuat E Commerce.'
      ]
    },
    siaga2: {
      img: 'assets/img/portfolio/branding-1.jpg',
      title: 'Siaga 2 - Silungkang Aktif Dan Berdaya',
      desc: [
        '“Membentuk dan melatih Pokdarwis profesional sebagai penggerak utama wisata, memastikan tata kelola destinasi berstandar nasional dan berkelanjutan.”',
        'Partisipasi Mitra 20 Peserta masyarakat, Pokdarwis Dengan Rincian Kegiatan Sebagai Berikut:',
        'KEBERLANJUTAN PROGRAM SIAGA 2 : Program SIAGA 2 (Silungkang Aktif Dan Berdaya) berfokus pada penguatan kapasitas kelembagaan desa melalui pemberdayaan Pokdarwis (Kelompok Sadar Wisata) sebagai motor utama pengembangan pariwisata dan ekonomi lokal. Dalam keberlanjutannya, Pokdarwis akan terus aktif dengan dukungan dana dari APBDes, sehingga kegiatan promosi, pengelolaan destinasi, dan inovasi wisata dapat berjalan secara berkesinambungan.Selain itu, pelatihan manajemen dan kepemimpinan akan difasilitasi secara rutin oleh Dinas Pariwisata, guna meningkatkan profesionalitas dan kemampuan organisasi Pokdarwis dalam mengelola potensi desa. Pokdarwis juga akan berperan sebagai mitra strategis pemerintah desa dalam pengembangan sektor wisata dan ekonomi kreatif masyarakat. Untuk menjamin kualitas dan efektivitas program, evaluasi kinerja Pokdarwis akan dilakukan setiap semester bersama pendamping dari Universitas Negeri Padang (UNP). Langkah ini memastikan bahwa seluruh kegiatan tetap terarah, terukur, dan selaras dengan visi pembangunan desa wisata yang berkelanjutan..'
      ],
      list: [
        'Pelatihan Manajemen Wisata,Keuangan Pokdarwis.',
        'Menyusun Struktur Pokdarwis,SOP Pengelolaan Destinasi Wisata.',
        'Menerbitkan SK Pokdarwis Dan Merancang Program Kerja Pokdarwis.'
      ]
    },
    glowup: {
      img: 'assets/img/portfolio/product-1.jpg',
      title: 'Glow Up - Go Local Wisata Unggul Dan Promosi',
      desc: [
        '“Menciptakan identitas digital desa wisata melalui logo dan slogan resmi, produksi video promosi, brosur digital, serta aktivasi media sosial (YouTube, Instagram, TikTok) untuk menjangkau wisatawan lokal hingga mancanegara.”',
        'Partisipasi Mitra 15 Orang Perangkat Desa dan Pokdarwis Dengan Rincian Kegiatan Sebagai Berikut:',
        'KEBERLANJUTAN PROGRAM GLOW UP :Program GLOW UP (Go Lokal Wisata Unggul dan Promosi) dirancang untuk memastikan keberlanjutan promosi digital dan branding Desa Wisata Silungkang Oso secara profesional dan konsisten. Dalam pelaksanaannya, telah terbentuk tim admin media sosial yang dikelola secara profesional, bertugas mengelola konten, interaksi publik, serta strategi komunikasi digital desa. Logo dan tagline GLOW UP diterapkan secara menyeluruh pada seluruh produk, materi promosi, dan media publikasi, guna memperkuat identitas visual desa wisata.Selain itu, desa menjalin kolaborasi dengan influencer dan kreator lokal untuk mendukung promosi musiman yang menarik wisatawan pada momen-momen tertentu. Setiap tahun, video promosi desa wisata akan diperbarui agar menampilkan perkembangan terbaru destinasi, kegiatan budaya, dan produk unggulan masyarakat. Upaya promosi digital juga akan dilanjutkan secara berkelanjutan melalui kanal resmi Pemerintah Daerah (Pemda), memastikan bahwa Desa Silungkang Oso tetap dikenal luas sebagai destinasi wisata berbasis budaya, ekonomi kreatif, dan inovasi digital.'
      ],
      list: [
        'Pembuatan Logo Desa Wisata,Tagline/Slogan Desa Wisata,dan Maskot Desa Wisata.',
        'Pembuatan Video Profil Desa Wisata, Video Promosi 4 Destinasi Wisata dan Media Sosial Aktif.',
        'Podcast Bersama Channel Youtube dan di Upload Dan Penanyangan Video Trone Diskominfotik Di 8 Titik.'
      ]
    }
  };

  function updateServiceContent(service) {
    const content = servicesContent[service];
    if (content) {
      servicesImg.src = content.img;
      servicesTitle.textContent = content.title;
      servicesDesc.forEach((p, index) => {
        if (content.desc[index]) {
          p.textContent = content.desc[index];
        }
      });
      servicesList.innerHTML = content.list.map(item => `<li><i class="bi bi-check-circle"></i> <span>${item}</span></li>`).join('');
    }
  }

  serviceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.getAttribute('data-service');
      document.querySelectorAll('.services-list a.active').forEach(activeLink => activeLink.classList.remove('active'));
      this.classList.add('active');
      updateServiceContent(service);
    });
  });

  // Check for hash on page load and activate corresponding service
  window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash && servicesContent[hash]) {
      const link = document.querySelector(`[data-service="${hash}"]`);
      if (link) {
        document.querySelectorAll('.services-list a.active').forEach(activeLink => activeLink.classList.remove('active'));
        link.classList.add('active');
        updateServiceContent(hash);
      }
    }
  });

})();
