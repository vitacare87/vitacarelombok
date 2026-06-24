/* =====================================================================
   VITA CARE LOMBOK — Loader konten dinamis
   ---------------------------------------------------------------------
   Membaca vitacare-data.json (dihasilkan panel Super Admin / admin.html)
   lalu merender:
     1. Menu navigasi   -> elemen ber-id "navLinks"   (tombol .btn dipertahankan)
     2. Menu layanan    -> elemen ber-id "servicesGrid"

   Cara pakai di halaman mana pun:
     - Beri id pada kontainer menu nav:   <div class="nav-links" id="navLinks">...</div>
     - (opsional) Beri id pada grid layanan: <div class="services-grid" id="servicesGrid">...</div>
     - Tambahkan sebelum </body>:
         <script src="assets/vitacare-dynamic.js" defer></script>

   Catatan:
     - Jika JSON tidak ada / gagal dimuat (mis. dibuka via file://),
       konten statis di HTML tetap tampil sebagai cadangan.
     - Lokasi JSON bisa diatur lewat atribut data-dynamic pada kontainer,
       atau via window.VITACARE_DATA_URL. Default: "vitacare-data.json".
   ===================================================================== */
(function(){
  "use strict";

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  function pageName(){
    return (location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function dataUrl(grid, navBox){
    return (grid && grid.getAttribute("data-dynamic"))
        || (navBox && navBox.getAttribute("data-dynamic"))
        || (typeof window !== "undefined" && window.VITACARE_DATA_URL)
        || "vitacare-data.json";
  }

  function renderServices(grid, data){
    if(!grid) return;
    var list = (data && data.services)
      ? data.services.filter(function(s){ return s && s.active !== false; })
      : [];
    if(!list.length) return; // pertahankan kartu statis sebagai cadangan
    grid.innerHTML = list.map(function(s, i){
      var cls = "service-card" + (s.popular ? " gold" : (i % 2 ? " alt" : ""));
      var pop = s.popular ? "<span class='svc-pop'>\u2605 Populer</span>" : "";
      var price = s.price ? "<div class='svc-price'>" + esc(s.price) + "</div>" : "";
      var desc = s.desc ? "<p>" + esc(s.desc) + "</p>" : "";
      return "<div class='" + cls + "'>" +
               "<div class='service-icon'>" + esc(s.icon || "\uD83E\uDE7A") + "</div>" +
               "<h3>" + esc(s.name) + pop + "</h3>" +
               desc + price +
             "</div>";
    }).join("");
  }

  function renderNav(navBox, data){
    if(!navBox) return;
    // data-nav="legal" -> pakai menu legal; selain itu pakai menu utama.
    var key = (navBox.getAttribute("data-nav") === "legal") ? "legalNav" : "nav";
    var src = (data && data[key]) ? data[key] : [];
    var list = src.filter(function(n){ return n && n.active !== false; });
    if(!list.length) return; // pertahankan menu statis sebagai cadangan
    // Pertahankan tombol aksi yang sudah ada (Login, Book Now, dsb.)
    var buttons = Array.prototype.filter.call(navBox.children, function(el){
      return el.tagName === "A" && /\bbtn\b/.test(el.className);
    });
    var here = pageName();
    navBox.innerHTML = "";
    list.forEach(function(n){
      var a = document.createElement("a");
      a.href = n.url;
      a.textContent = n.label;
      var target = String(n.url).split("/").pop().toLowerCase();
      if(target === here){ a.setAttribute("aria-current", "page"); a.className = "active"; }
      navBox.appendChild(a);
    });
    buttons.forEach(function(b){ navBox.appendChild(b); });
  }

  // Titik bawaan (cadangan bila JSON belum ada / gagal dimuat).
  var DEFAULT_COVERAGE = [
    { name:"Mataram",        lat:-8.5833, lng:116.1167, tourist:false },
    { name:"Senggigi",       lat:-8.4889, lng:116.0436, tourist:true  },
    { name:"Kuta Mandalika", lat:-8.8920, lng:116.2811, tourist:true  },
    { name:"Gili Trawangan", lat:-8.3489, lng:116.0392, tourist:true  },
    { name:"Gili Air",       lat:-8.3603, lng:116.0847, tourist:true  },
    { name:"Gili Meno",      lat:-8.3514, lng:116.0614, tourist:true  },
    { name:"Praya",          lat:-8.7100, lng:116.2742, tourist:false },
    { name:"Selong",         lat:-8.6500, lng:116.5247, tourist:false }
  ];

  function initCoverageMap(data){
    var el = document.getElementById("coverageMap");
    if(!el || typeof L === "undefined" || el._leaflet_id) return;
    // Titik dari panel admin (data.coverage) bila tersedia; jika tidak, pakai bawaan.
    var points = (data && data.coverage && data.coverage.length)
      ? data.coverage.filter(function(p){ return p && p.active !== false; })
      : DEFAULT_COVERAGE;
    if(!points.length) points = DEFAULT_COVERAGE;
    var map = L.map(el, { scrollWheelZoom:false });
    L.tileLayer(("https:"+"//"+"{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var layers = [];
    points.forEach(function(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(isNaN(lat) || isNaN(lng)) return;
      var color = p.tourist ? "#C9A24A" : "#0F5A3C";
      var radiusKm = parseFloat(p.radius);
      if(!isNaN(radiusKm) && radiusKm > 0){
        layers.push(L.circle([lat, lng], { radius: radiusKm * 1000, color: color, weight: 1, fillColor: color, fillOpacity: 0.10 }).addTo(map));
      }
      var marker = L.circleMarker([lat, lng], {
        radius: p.tourist ? 9 : 8,
        color: "#ffffff", weight: 2,
        fillColor: color, fillOpacity: 1
      }).addTo(map);
      var extra = p.desc ? ("<br>" + esc(p.desc)) : "";
      marker.bindPopup("<strong>" + esc(p.name) + "</strong><br>" +
        (p.tourist ? "Wisata Premium" : "Kota Utama") + extra +
        "<br>VITA CARE LOMBOK — layanan home care");
      layers.push(marker);
    });
    if(layers.length){ map.fitBounds(L.featureGroup(layers).getBounds(), { padding:[30,30] }); }
    // Pastikan ukuran benar setelah layout selesai.
    setTimeout(function(){ map.invalidateSize(); }, 200);
  }

  function init(){
    var grid = document.getElementById("servicesGrid");
    var navBox = document.getElementById("navLinks");
    var mapEl = document.getElementById("coverageMap");
    if(!grid && !navBox && !mapEl) return;
    var src = dataUrl(grid, navBox);
    fetch(src, { cache: "no-store" })
      .then(function(r){ if(!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function(data){ renderServices(grid, data); renderNav(navBox, data); initCoverageMap(data); })
      .catch(function(){ /* JSON belum ada / file:// — pakai titik bawaan & konten statis */ initCoverageMap(null); });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
