window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
      preloader.style.display = "none";
      document.documentElement.classList.remove("loading");
      document.body.classList.remove("loading");
    }, 600);
  }
});
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
  
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const format = counter.getAttribute("data-format");
      let count = 0;
      const duration = 2000; // مجموع زمان شمارش (۲ ثانیه)
      const steps = 50; // دفعات اجرا
      const increment = target / steps;
  
      const update = () => {
        count += increment;
        if (count >= target) {
          counter.innerText = formatNumber(target, format);
        } else {
          counter.innerText = formatNumber(Math.ceil(count), format);
          requestAnimationFrame(update);
        }
      };
  
      const formatNumber = (num, format) => {
        if (format === "currency") {
          return num.toLocaleString("fa-IR") + " تومان";
        } else {
          return num.toLocaleString("fa-IR");
        }
      };
  
      update();
    });
    let cancelTargetRow = null;

    document.querySelectorAll('.btn-outline-danger').forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
  
        // یافتن ردیف پدر این دکمه
        cancelTargetRow = this.closest('tr');
  
        // باز کردن مودال
        const modal = new bootstrap.Modal(document.getElementById('cancelRulesModal'));
        modal.show();
      });
    });
  
    // دکمه تایید لغو
    document.getElementById('confirmCancelBtn').addEventListener('click', function () {
      if (cancelTargetRow) {
        // تغییر محتوای وضعیت (سلول هشتم)
        cancelTargetRow.children[7].innerHTML = 'لغو شده';
  
        // حذف دکمه‌ها و جایگزینی با ----
        cancelTargetRow.children[8].innerHTML = '----';
  
        // بستن مودال
        const modal = bootstrap.Modal.getInstance(document.getElementById('cancelRulesModal'));
        modal.hide();
  
        // بازنشانی
        cancelTargetRow = null;
      }
    });
    const rows = document.querySelectorAll(".clickable-row");

            rows.forEach(row => {
                row.addEventListener("click", function () {
                    // حذف رنگ قبلی
                    rows.forEach(r => r.classList.remove("selected-row"));
                    // رنگ دادن به سطر کلیک‌شده
                    this.classList.add("selected-row");
                });
            });
       // نمایش دکمه هنگام اسکرول
      window.onscroll = function () {
        const btn = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
          btn.style.opacity = "1";
          btn.style.visibility = "visible";
        } else {
          btn.style.opacity = "0";
          btn.style.visibility = "hidden";
        }
      };

      // هدایت به بالا با انیمیشن نرم
      document.getElementById("backToTopBtn").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
});
