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
//ساید بار
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
});
 //اسکریپت کارت های اماری
 document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('ChartTrafficViews').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['صفحه اصلی', 'صفحه دریافت نوبت', 'صفحه دکتر مجد محسنی بیرجندی', 'وبلاگ سایت'],
            datasets: [{
                data: [500, 300, 200, 100],
                backgroundColor: [
                    'rgba(13, 110, 253, 0.9)',
                    'rgba(25, 135, 84, 0.9)',
                    'rgba(255, 193, 7, 0.9)',
                    'rgba(220, 53, 69, 0.9)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            layout: {
                padding: 0
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed} بازدید`;
                        }
                    },
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#ddd',
                    borderWidth: 2,
                    cornerRadius: 5
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    const counters = document.querySelectorAll(".counter");
  
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const format = counter.getAttribute("data-format");
      let count = 0;
      const duration = 8000; // مجموع زمان شمارش (۲ ثانیه)
      const steps = 200; // دفعات اجرا
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

    
  });

  
