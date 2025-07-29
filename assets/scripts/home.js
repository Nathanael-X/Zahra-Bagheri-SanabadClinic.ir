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


    const sendBtn = document.getElementById('sendBtn');
      const toastElement = document.getElementById('liveToast');

      const toast = new bootstrap.Toast(toastElement, {
        delay: 5000,     // مدت زمان نمایش: ۵ ثانیه
        autohide: true   // مخفی شدن خودکار
      });

      sendBtn.addEventListener('click', function () {
        setTimeout(() => {
          toast.show();
        }, 300); // صبر می‌کنیم تا مودال بسته بشه
      });
  });
//نمایش مودال خوش امد گویی ثبت اطلاعات کاربر
document.getElementById('submit_to_userDashboard').addEventListener('click', function(event) {
    event.preventDefault(); // جلوگیری از ارسال فرم در ابتدا

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    document.getElementById('welcomeModalLabel').textContent = `کاربر ${firstName} ${lastName}، خوش آمدید!`;
    // ساخت پیام خوش‌آمدگویی
    const welcomeMessage = `اطلاعات شما با موفقیت ثبت گردید؛ با کلیک برروی دکمه ی رزرو نوبت جدید می توانید از خدمات ما بهره مند شوید`;

    // بسته شدن مودال ثبت اطلاعات
    var userModal = bootstrap.Modal.getInstance(document.getElementById('userinformationForm_popup'));
    userModal.hide();

    // نمایش مودال خوش‌آمدگویی
    document.getElementById('welcomeMessage').textContent = welcomeMessage;
    var welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
});

// افزودن listener برای دکمه بستن مودال خوش‌آمدگویی
document.getElementById('closeWelcomeModal').addEventListener('click', function() {
    // هدایت به داشبورد کاربری
    window.location.href = 'user-dashboard.html';
});



  