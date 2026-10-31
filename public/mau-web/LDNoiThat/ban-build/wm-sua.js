/*
 * Bộ chỉnh sửa tự động của Website Market, được chèn vào bản build của mọi mẫu web.
 * Chỉ chạy khi trang mở với ?nguon=cua-toi&khoa=... (trang của người đã mua).
 * Tự tìm các đoạn chữ và ảnh, cho phép sửa, lưu vào localStorage theo khóa `khoa`,
 * giao tiếp với trang cha bằng postMessage (cùng giao thức với bộ xem của hệ thống).
 *
 * Ba loại phần tử được nhận diện:
 *   chu  : phần tử chỉ chứa chữ (và <br>)               -> lưu textContent
 *   html : phần tử chứa chữ lẫn thẻ nội dòng (span, b...) -> lưu innerHTML
 *   anh  : thẻ <img>                                      -> lưu ảnh dạng data URL
 * Nút, ô nhập, biểu tượng chữ (Material Symbols...) không bị chạm tới.
 */
(function () {
  var thamSo = new URLSearchParams(location.search);
  if (thamSo.get('nguon') !== 'cua-toi') return;

  var KHOA = thamSo.get('khoa') || 'wm_site_khach';
  var CHAN = 'script,style,noscript,svg,button,textarea,select,option,input,head,title,iframe,canvas,video,audio,[data-wm-bo-qua]';
  var NOI_DONG = 'br,wbr,span,b,i,em,strong,u,small,mark,sub,sup';
  var BIEU_TUONG = /material|icon|glyph|symbol|(^|[\s_-])fa([\s_-]|$)/i;
  var TOI_DA_CHU = 600;

  var daLuu = docDaLuu();
  var banNhap = sao(daLuu);
  var dangSua = false;
  var hen = 0;

  function sao(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function docDaLuu() {
    try {
      var v = JSON.parse(localStorage.getItem(KHOA));
      return v && typeof v === 'object' ? v : {};
    } catch {
      return {};
    }
  }

  function guiCha(tinNhan) {
    if (window.parent !== window) {
      tinNhan.nguon = 'wm';
      window.parent.postMessage(tinNhan, location.origin);
    }
  }

  function baoThayDoi() {
    guiCha({ loai: 'thay-doi', coThayDoi: JSON.stringify(banNhap) !== JSON.stringify(daLuu) });
  }

  function bam(chuoi) {
    var h = 5381;
    for (var i = 0; i < chuoi.length; i++) h = ((h << 5) + h + chuoi.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  function chuan(chuoi) {
    return chuoi.replace(/\s+/g, ' ').trim();
  }

  function duong(el) {
    var doan = [];
    for (var n = el; n && n !== document.body; n = n.parentElement) {
      var vt = 1;
      for (var s = n.previousElementSibling; s; s = s.previousElementSibling) {
        if (s.tagName === n.tagName) vt++;
      }
      doan.unshift(n.tagName.toLowerCase() + vt);
    }
    return doan.join('>');
  }

  function laBieuTuong(el) {
    return (
      (typeof el.className === 'string' && BIEU_TUONG.test(el.className)) || el.getAttribute('aria-hidden') === 'true'
    );
  }

  // Trả về 'chu', 'html' hoặc null (không sửa được)
  function loaiChu(el) {
    if (el.closest(CHAN) || el.closest('[data-wm-loai="html"]') || laBieuTuong(el)) return null;
    var coChu = false;
    var coPhanTuCon = false;
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) {
        if (n.nodeValue.trim()) coChu = true;
      } else if (n.nodeType === 1) {
        if (n.tagName !== 'BR' && n.tagName !== 'WBR') coPhanTuCon = true;
      }
    }
    if (!coChu || chuan(el.textContent).length > TOI_DA_CHU) return null;
    if (!coPhanTuCon) return 'chu';
    if (el.querySelector('*:not(' + NOI_DONG + ')')) return null;
    var cacTheCon = el.querySelectorAll('span,i');
    for (var i = 0; i < cacTheCon.length; i++) {
      if (laBieuTuong(cacTheCon[i])) return null;
    }
    return 'html';
  }

  function laAnh(el) {
    return el.tagName === 'IMG' && Boolean(el.getAttribute('src')) && !el.closest(CHAN);
  }

  function giaTriHienTai(el) {
    var loai = el.getAttribute('data-wm-loai');
    if (loai === 'chu') return el.textContent;
    if (loai === 'html') return el.innerHTML;
    return el.getAttribute('src');
  }

  function datGiaTri(el, v) {
    var loai = el.getAttribute('data-wm-loai');
    if (loai === 'chu') el.textContent = v;
    else if (loai === 'html') el.innerHTML = v;
    else {
      el.setAttribute('src', v);
      el.removeAttribute('srcset');
    }
  }

  function apDung(el) {
    var muc = banNhap[el.getAttribute('data-wm-key')];
    if (muc && giaTriHienTai(el) !== muc.v && document.activeElement !== el) datGiaTri(el, muc.v);
  }

  function khoiPhucGoc(el) {
    if (giaTriHienTai(el) !== el.__wmGoc) datGiaTri(el, el.__wmGoc);
  }

  function huyDangKy(el) {
    el.removeAttribute('data-wm-key');
    el.removeAttribute('data-wm-loai');
    el.classList.remove('wm-sua', 'wm-anh');
    if (el.getAttribute('contenteditable')) el.removeAttribute('contenteditable');
  }

  function ghiChu(el) {
    var key = el.getAttribute('data-wm-key');
    var loai = el.getAttribute('data-wm-loai');
    var moi = loai === 'html' ? el.innerHTML : el.textContent.replace(/\s+$/, '');
    var vanGoc = loai === 'html' ? moi === el.__wmGoc : chuan(moi) === el.__wmGocChuan;
    if (vanGoc) delete banNhap[key];
    else banNhap[key] = { loai: loai, v: moi };
    baoThayDoi();
  }

  function batSua(el) {
    if (el.getAttribute('data-wm-loai') !== 'anh') {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
      el.classList.add('wm-sua');
    } else {
      el.classList.add('wm-anh');
      el.title = 'Bấm để đổi ảnh';
    }
  }

  function tatSua(el) {
    if (el.getAttribute('data-wm-loai') !== 'anh') {
      el.removeAttribute('contenteditable');
      el.classList.remove('wm-sua');
    } else {
      el.classList.remove('wm-anh');
      el.removeAttribute('title');
    }
  }

  function dangKy(el, loai) {
    var goc = loai === 'chu' ? el.textContent : loai === 'html' ? el.innerHTML : el.getAttribute('src');
    el.__wmGoc = goc;
    el.__wmGocChuan = loai === 'chu' ? chuan(goc) : goc;
    el.setAttribute('data-wm-loai', loai);
    el.setAttribute('data-wm-key', loai + ':' + duong(el) + ':' + bam(el.__wmGocChuan));
    if (loai !== 'anh' && !el.__wmNghe) {
      el.__wmNghe = true;
      el.addEventListener('input', function () {
        if (dangSua) ghiChu(el);
      });
      el.addEventListener('blur', function () {
        if (dangSua) ghiChu(el);
      });
      el.addEventListener('keydown', function (e) {
        if (dangSua && e.key === 'Enter') {
          e.preventDefault();
          el.blur();
        }
      });
      el.addEventListener('paste', function (e) {
        if (!dangSua) return;
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
      });
    }
    apDung(el);
    if (dangSua) batSua(el);
  }

  function quet() {
    var cacPhanTu = document.body ? document.body.querySelectorAll('*') : [];
    for (var i = 0; i < cacPhanTu.length; i++) {
      var el = cacPhanTu[i];
      var loai = el.getAttribute('data-wm-loai');
      if (loai) {
        // Ứng dụng tự đổi nội dung (ví dụ bộ đếm): bỏ đăng ký để tính lại khóa theo nội dung mới
        if (loai !== 'anh' && document.activeElement !== el) {
          var muc = banNhap[el.getAttribute('data-wm-key')];
          var hienTai = giaTriHienTai(el);
          var khop = loai === 'chu' ? chuan(hienTai) === el.__wmGocChuan : hienTai === el.__wmGoc;
          var khopDaSua = muc && (loai === 'chu' ? chuan(hienTai) === chuan(muc.v) : hienTai === muc.v);
          if (!khop && !khopDaSua) {
            huyDangKy(el);
            var moi = loaiChu(el);
            if (moi) dangKy(el, moi);
          }
        }
        continue;
      }
      if (laAnh(el)) dangKy(el, 'anh');
      else {
        var kieu = loaiChu(el);
        if (kieu) dangKy(el, kieu);
      }
    }
  }

  function datLichQuet() {
    if (hen) return;
    hen = requestAnimationFrame(function () {
      hen = 0;
      quet();
    });
  }

  function moiTatCa(hamXuLy) {
    var ds = document.querySelectorAll('[data-wm-key]');
    for (var i = 0; i < ds.length; i++) hamXuLy(ds[i]);
  }

  function nenAnh(tep) {
    return new Promise(function (xong, loi) {
      if (!/^image\//.test(tep.type)) return loi(new Error('Tệp được chọn không phải ảnh'));
      var doc = new FileReader();
      doc.onerror = function () {
        loi(new Error('Không đọc được tệp ảnh'));
      };
      doc.onload = function () {
        var anh = new Image();
        anh.onerror = function () {
          loi(new Error('Ảnh bị lỗi hoặc không hỗ trợ'));
        };
        anh.onload = function () {
          var tiLe = Math.min(1, 1200 / Math.max(anh.width, anh.height));
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(anh.width * tiLe);
          canvas.height = Math.round(anh.height * tiLe);
          canvas.getContext('2d').drawImage(anh, 0, 0, canvas.width, canvas.height);
          xong(canvas.toDataURL('image/jpeg', 0.8));
        };
        anh.src = doc.result;
      };
      doc.readAsDataURL(tep);
    });
  }

  function chonAnh(el) {
    var o = document.createElement('input');
    o.type = 'file';
    o.accept = 'image/*';
    o.style.display = 'none';
    o.setAttribute('data-wm-bo-qua', '');
    o.onchange = function () {
      var tep = o.files && o.files[0];
      o.remove();
      if (!tep) return;
      nenAnh(tep).then(
        function (url) {
          banNhap[el.getAttribute('data-wm-key')] = { loai: 'anh', v: url };
          apDung(el);
          baoThayDoi();
        },
        function (loi) {
          guiCha({ loai: 'loi', thongDiep: loi.message });
        }
      );
    };
    document.body.appendChild(o);
    o.click();
  }

  // Ở chế độ sửa, bấm vào chữ/ảnh chỉ để sửa, không kích hoạt liên kết hay nút của mẫu
  document.addEventListener(
    'click',
    function (e) {
      if (!dangSua || !e.target.closest) return;
      var el = e.target.closest('[data-wm-key]');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      if (el.getAttribute('data-wm-loai') === 'anh') chonAnh(el);
    },
    true
  );

  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || e.source !== window.parent) return;
    var d = e.data;
    if (!d || d.nguon !== 'wm') return;

    if (d.loai === 'che-do') {
      dangSua = Boolean(d.sua);
      quet();
      moiTatCa(dangSua ? batSua : tatSua);
    } else if (d.loai === 'luu') {
      try {
        localStorage.setItem(KHOA, JSON.stringify(banNhap));
        daLuu = sao(banNhap);
        guiCha({ loai: 'da-luu' });
        baoThayDoi();
      } catch {
        guiCha({ loai: 'loi', thongDiep: 'Không lưu được vì bộ nhớ trình duyệt đã đầy. Hãy dùng ảnh nhỏ hơn.' });
      }
    } else if (d.loai === 'huy') {
      banNhap = sao(daLuu);
      moiTatCa(function (el) {
        if (banNhap[el.getAttribute('data-wm-key')]) apDung(el);
        else khoiPhucGoc(el);
      });
      baoThayDoi();
    } else if (d.loai === 'khoi-phuc') {
      try {
        localStorage.removeItem(KHOA);
      } catch {
        /* bỏ qua */
      }
      daLuu = {};
      banNhap = {};
      moiTatCa(khoiPhucGoc);
      guiCha({ loai: 'da-khoi-phuc' });
      baoThayDoi();
    }
  });

  function batDau() {
    var kieu = document.createElement('style');
    kieu.setAttribute('data-wm-bo-qua', '');
    kieu.textContent =
      '.wm-sua{outline:1px dashed #60a5fa!important;outline-offset:2px;cursor:text!important;-webkit-user-select:text!important;user-select:text!important}' +
      '.wm-sua:hover{background:rgba(96,165,250,.18)}' +
      '.wm-sua:focus{outline:2px solid #2563eb!important;background:rgba(96,165,250,.22)}' +
      '.wm-anh{outline:2px dashed #3b82f6!important;outline-offset:-4px;cursor:pointer!important}';
    document.head.appendChild(kieu);
    quet();
    new MutationObserver(datLichQuet).observe(document.body, { childList: true, subtree: true, characterData: true });
    guiCha({ loai: 'san-sang' });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', batDau);
  else batDau();
})();
