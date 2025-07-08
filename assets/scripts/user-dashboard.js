//for preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
  preloader.style.opacity = '0';
  setTimeout(() => {
      preloader.style.display = 'none';
  }, 500);
  }, 1000); // 1 ثانیه تأخیر برای نمایش انیمیشن
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
});