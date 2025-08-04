document.addEventListener("DOMContentLoaded", () => {
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