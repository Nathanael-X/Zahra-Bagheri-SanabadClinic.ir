document.addEventListener('DOMContentLoaded', () => {
    // فعال‌سازی Tooltip‌ها
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  
    // فعال‌سازی Popover‌ها
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new bootstrap.Popover(el);
    });
  
    // شمارنده‌های متحرک
    const counters = document.querySelectorAll(".counter_earning_Master");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const format = counter.getAttribute("data-format");
      const duration = 8000;
      const steps = 200;
      const increment = target / steps;
      let count = 0;
  
      const formatNumber = (num, format) => {
        return format === "currency"
          ? `${num.toLocaleString("fa-IR")} تومان`
          : num.toLocaleString("fa-IR");
      };
  
      const update = () => {
        count += increment;
        if (count >= target) {
          counter.innerText = formatNumber(target, format);
        } else {
          counter.innerText = formatNumber(Math.ceil(count), format);
          requestAnimationFrame(update);
        }
      };
  
      update();
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
function showRefundToast() 
{
    const toastWrapper_refund = document.getElementById('refundToast').parentElement;
    toastWrapper_refund.classList.remove('d-none');
    toastWrapper_refund.classList.add('d-block');
    toastWrapper_refund.classList.add('showToast'); 
    const send_recModal = document.getElementById('refundModal');
    const send_rec = bootstrap.Modal.getInstance(send_recModal);
    send_rec.hide();
    var toastEl = document.getElementById('refundToast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
}  
  