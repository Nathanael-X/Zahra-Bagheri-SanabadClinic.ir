document.documentElement.classList.add('loading');
  document.body.classList.add('loading');

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.documentElement.classList.remove('loading');
        document.body.classList.remove('loading');
      }, 600);
    }
  });
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-header-link').addEventListener('click',()=>
  {
    const sidebar = document.getElementById('mobileSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
  });
  document.getElementById('system_nobat').addEventListener('click',()=>
  {
    const sidebar = document.getElementById('mobileSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
  });
  document.getElementById('tamas-ba-ma').addEventListener('click',()=>
  {
    const sidebar = document.getElementById('mobileSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
  });
   // Timer logic
   let duration = 120; // seconds
   const countdownEl = document.getElementById('countdown');
 
   const timer = setInterval(() => {
     const minutes = Math.floor(duration / 60);
     const seconds = duration % 60;
     countdownEl.textContent =
       `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     duration--;
     if (duration < 0) clearInterval(timer);
   }, 1000);
 
   // Auto move to next input
   document.querySelectorAll('.code-input').forEach((input, index, arr) => {
     input.addEventListener('input', () => {
       if (input.value.length === 1 && index < arr.length - 1) {
         arr[index + 1].focus();
       }
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
//بیمار اتباع خارجی است
function toggleIDNumberField(checkbox) 
{
    const input = document.getElementById('nationalCode');
    const input_text_1 = document.getElementsByClassName('nationalCode_lbl').item(0);
    const input_text_2 = document.getElementsByClassName('nationalCode_lbl').item(1);

    if (checkbox.checked) {
        input.disabled = true;
        input_text_1.classList.add('text-muted');
        input_text_2.classList.add('text-muted');
    } else {
        input.disabled = false;
        input_text_1.classList.remove('text-muted');
        input_text_2.classList.remove('text-muted');

    }
}
//sidebar
const sidebar = document.getElementById('mobileSidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const openBtn = document.getElementById('hamburgerBtn');
openBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  backdrop.classList.add('active');
});
backdrop.addEventListener('click', () => {
  sidebar.classList.remove('active');
  backdrop.classList.remove('active');
});
