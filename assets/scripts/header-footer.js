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
});
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
