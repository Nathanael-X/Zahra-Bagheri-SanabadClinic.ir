document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".summary-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const content = this.nextElementSibling;
          content.classList.toggle("open");
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