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
document.addEventListener("DOMContentLoaded", () => {

    //پاسخ به اعلان ادمین
    const replyToggleBtn = document.getElementById("replyToggleBtn");
    const replyBox = document.getElementById("adminReplyBox");
    const clearReplyBtn = document.getElementById("clearReplyBtn");
    const replyTextarea = document.getElementById("replyTextarea");

    replyToggleBtn.addEventListener("click", function () {
        replyBox.classList.toggle("d-none");
        replyTextarea.focus();
    });

    clearReplyBtn.addEventListener("click", function () {
        replyTextarea.value = "";
    });
    let selectedRow = null; // ردیفی که برای حذف انتخاب شده

  // همه دکمه‌های حذف را انتخاب می‌کنیم
  const deleteButtons = document.querySelectorAll('.delete-btn');

  // مودال حذف
  const deleteModalEl = document.getElementById('deleteModal');
  const deleteModal = new bootstrap.Modal(deleteModalEl);

  // وقتی روی دکمه حذف هر ردیف کلیک شد
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      selectedRow = button.closest('tr'); // ردیف والد دکمه حذف
      deleteModal.show(); // نمایش مودال تایید حذف
    });
  });

  // وقتی روی دکمه تایید حذف کلیک شد
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (selectedRow) {
      selectedRow.remove(); // حذف ردیف انتخاب شده
      selectedRow = null;
      updateNoteNumbers(); // بروزرسانی شماره یادداشت‌ها بعد از حذف
    }
    deleteModal.hide(); // بستن مودال
  });

  // تابع بروزرسانی شماره یادداشت‌ها
  function updateNoteNumbers() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      const noteNumberCell = row.querySelector('.note-number');
      if (noteNumberCell) {
        noteNumberCell.textContent = index + 1;
      }
    });
  }

    /** =====================
     *  Tooltips Initialization
     * ===================== */
    const initTooltips = () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    };

    /** =====================
     *  Animated Counters
     * ===================== */
    const initCounters = () => {
        const counters = document.querySelectorAll(".counter_master");
        if (!counters.length) return;

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            const format = counter.dataset.format;
            let count = 0;
            const steps = 200;
            const increment = target / steps;

            const formatNumber = (num, formatType) => {
                if (formatType === "currency") {
                    return num.toLocaleString("fa-IR") + " تومان";
                }
                return num.toLocaleString("fa-IR");
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
    };

    /** =====================
     *  Chart.js Doughnut Chart
     * ===================== */
    const initTrafficChart = () => {
        const chartEl = document.getElementById('ChartTrafficViews_master');
        if (!chartEl) return;

        const ctx = chartEl.getContext('2d');
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
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed} بازدید`
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
    };

    /** =====================
     *  Initialize All
     * ===================== */
    initTooltips();
    initCounters();
    initTrafficChart();


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
//توست های نخوانده شده، مودال و توست رد شده، توست پاسخ داده شده و بستن مودال اعلان ادمین
const toastTriggersuccess = document.getElementById('showToastBtn');
  const toastElementsuccess = document.getElementById('successToast');
  const toastWrapper_success = document.getElementById('successToast').parentElement;

  if (toastTriggersuccess) {
    toastTriggersuccess.addEventListener('click', () => {
      toastWrapper_success.classList.remove('d-none');
      toastWrapper_success.classList.add('d-block');
      toastWrapper_success.classList.add('showToast'); 
      const toastsuccess = new bootstrap.Toast(toastElementsuccess);
      toastsuccess.show();
      const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_FizioTrapy'));
      user_ticket_modal.hide();
    });
  }
  const toastElementreject = document.getElementById('rejectToast');
  const toastWrapper_reject = document.getElementById('rejectToast').parentElement;
  function reject_userTicket()
  {
    toastWrapper_reject.classList.remove('d-none');
    toastWrapper_reject.classList.add('d-block');
    toastWrapper_reject.classList.add('showToast');
    const rejectToast = new bootstrap.Toast(toastElementreject);
    rejectToast.show();
    const reject_modal = bootstrap.Modal.getInstance(document.getElementById('rejectModal'));
    reject_modal.hide();
  }
  const toastElementonread = document.getElementById('unreadToast');
  const toastWrapper_onread = document.getElementById('unreadToast').parentElement;
  function open_unread_toast()
  {
    toastWrapper_onread.classList.remove('d-none');
    toastWrapper_onread.classList.add('d-block');
    toastWrapper_onread.classList.add('showToast');
    const onread_toast = new bootstrap.Toast(toastElementonread);
    onread_toast.show();
    const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_FizioTrapy'));
    user_ticket_modal.hide();
  }
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
     
