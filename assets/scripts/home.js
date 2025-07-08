//Swiper slider
const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
//اسکریپت کانتر
function animateCounter(el, target, duration = 2000) 
{
    const start = 0;
    let startTime = null;

    function updateCounter(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
}
const section = document.getElementById('counterSection');
const counters = section.querySelectorAll('.counter-number');
let counted = false;
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          animateCounter(counter, target);
        });
        counted = true;
        observer.unobserve(section);
      }
    });
}, { threshold: 0.4 });
observer.observe(section);
//تغییر تایتل سرچ
function updateTitleSearch() 
{
    const title = document.getElementById("title-search");
    if (window.innerWidth >= 730) {
      title.textContent = "می توانید در کادر جستجو بر اساس نام بیماری، پزشک یا خدمت مورد نظر خود را بیابید";
    } else {
      title.textContent = "جستجوی پزشک یا خدمت";
    }
}
// اجرا هنگام بارگذاری صفحه
window.addEventListener("load", updateTitleSearch);
// اجرا هنگام تغییر اندازه صفحه (ریسایز)
window.addEventListener("resize", updateTitleSearch);
//کارت های شیشه ای خدمات ما
document.addEventListener("DOMContentLoaded", function () {
    const scroller = document.querySelector(".scroller-container");
    const track = document.querySelector(".scroller-track");
  
    // وقتی به انتها رسید، برش گردون به اول
    scroller.addEventListener("scroll", () => {
      const maxScroll = track.scrollWidth / 3;
      if (scroller.scrollLeft >= maxScroll) {
        scroller.scrollLeft -= maxScroll;
      }
    });
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      const myModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
      myModal.show();
    }
  });
document.addEventListener('shown.bs.modal', function () {
    document.body.style.paddingRight = '0';
  });

  