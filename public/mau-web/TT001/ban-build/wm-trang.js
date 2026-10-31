/*
 * Mở đúng một "trang" của mẫu web khi nhúng vào khung xem trước của Website Market.
 * Dùng cho mẫu một trang (SPA) đổi mục bằng nút, không có đường dẫn riêng cho từng mục.
 * Chỉ chạy khi trang mở với ?wm_bam=<chữ trên nút hoặc liên kết menu>.
 * Tìm nút/liên kết có chữ trùng (không phân biệt hoa thường) và bấm một lần.
 */
(function () {
  // Khi mẫu nằm trong iframe (trang chi tiết, Xem demo): mẫu tự cuộn tới một mục (scrollIntoView,
  // bấm liên kết "#...") thì trình duyệt cuộn luôn cả trang bên ngoài, làm trang bị giật. Giữ trang
  // ngoài đứng yên: ghi lại vị trí trước khi cuộn rồi trả về ngay sau đó (cùng nguồn nên truy cập được).
  var cha = null;
  try {
    if (window.parent !== window) cha = window.parent.scrollY >= 0 ? window.parent : null;
  } catch (e) {
    cha = null;
  }
  if (cha) {
    // Giữ vị trí trang ngoài trong ~1,2 giây: đủ cho hiệu ứng cuộn mượt (scroll-behavior: smooth)
    // của mẫu chạy xong, vì trình duyệt cuộn trang ngoài theo suốt hiệu ứng đó.
    var giuDen = 0;
    var giuX = 0;
    var giuY = 0;
    var giuYen = function () {
      if (performance.now() > giuDen) {
        giuX = cha.scrollX;
        giuY = cha.scrollY;
      }
      var dangGiu = performance.now() <= giuDen;
      giuDen = performance.now() + 1200;
      if (dangGiu) return;
      var vong = function () {
        if (cha.scrollX !== giuX || cha.scrollY !== giuY) cha.scrollTo({ left: giuX, top: giuY, behavior: 'instant' });
        if (performance.now() <= giuDen) requestAnimationFrame(vong);
      };
      vong();
    };
    var cuonGoc = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function () {
      giuYen();
      cuonGoc.apply(this, arguments);
      cha.scrollTo({ left: giuX, top: giuY, behavior: 'instant' });
    };
    // Liên kết "#..." mà mẫu không tự xử lý (không preventDefault): tự cuộn trong khung thay cho cú
    // nhảy mặc định của trình duyệt (cú nhảy đó kéo luôn trang ngoài).
    document.addEventListener(
      'click',
      function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (a) giuYen();
      },
      true
    );
    window.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute('href');
      var dich = href.length > 1 ? document.getElementById(decodeURIComponent(href.slice(1))) : null;
      if (!dich && href !== '#') return;
      e.preventDefault();
      var le = dich ? parseFloat(getComputedStyle(dich).scrollMarginTop) || caoThanhTren() : 0;
      var top = dich ? dich.getBoundingClientRect().top + window.pageYOffset - le : 0;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', href);
    });
  }

  var muc = new URLSearchParams(location.search).get('wm_bam');
  if (!muc) return;

  var dich = muc.replace(/\s+/g, ' ').trim().toLowerCase();
  var VUNG = 'header nav button, header nav a, nav button, nav a, header button, header a, button, a, [role="button"]';
  var xong = false;

  // Chiều cao thanh menu cố định/dính ở đầu trang của mẫu (để mục không bị menu che mất)
  function caoThanhTren() {
    var ds = document.querySelectorAll('header, nav');
    for (var i = 0; i < ds.length; i++) {
      var vt = getComputedStyle(ds[i]).position;
      if ((vt === 'fixed' || vt === 'sticky') && ds[i].getBoundingClientRect().top <= 1) return ds[i].offsetHeight;
    }
    return 0;
  }

  // Bấm thật vào nút/liên kết để mẫu tự xử lý (vd. menu "Nữ"/"Nam" cùng trỏ #products nhưng lọc
  // khác nhau). Trang bên ngoài không bị kéo theo nhờ phần giữ yên ở trên. Liên kết "#..." mà mẫu
  // không tự cuộn tới thì cuộn bù ngay trong khung, chừa chỗ cho thanh menu dính ở đầu trang.
  function mo(el) {
    var href = el.tagName === 'A' ? el.getAttribute('href') || '' : '';
    var muc = href.charAt(0) === '#' && href.length > 1 ? document.getElementById(decodeURIComponent(href.slice(1))) : null;
    // Nút có thể đang ẩn (menu điện thoại): click() vẫn kích hoạt trình xử lý sự kiện
    el.click();
    if (!muc) return;
    setTimeout(function () {
      if (Math.abs(muc.getBoundingClientRect().top) < 200) return;
      var le = parseFloat(getComputedStyle(muc).scrollMarginTop) || caoThanhTren();
      window.scrollTo({ top: Math.max(0, muc.getBoundingClientRect().top + window.pageYOffset - le), behavior: 'instant' });
    }, 900);
  }

  function thu() {
    if (xong || !document.body) return xong;
    var ds = document.querySelectorAll(VUNG);
    for (var i = 0; i < ds.length; i++) {
      var chu = ds[i].textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      // Bỏ số đếm đứng đầu (vd. badge giỏ hàng "3Giỏ hàng") rồi so lại
      if (chu === dich || chu.replace(/^\d+\s*/, '') === dich) {
        mo(ds[i]);
        xong = true;
        return true;
      }
    }
    return false;
  }

  var dem = 0;
  var hen = setInterval(function () {
    if (thu() || ++dem > 80) clearInterval(hen);
  }, 150);
})();
