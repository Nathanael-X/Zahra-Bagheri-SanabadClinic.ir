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
 //اسکریپت کارت های اماری
 document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl, {
          container: '.btm-bar', // مهم برای رفع به‌هم‌ریختگی
      });
  });
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
    //پاسخ به مودال علیرضا محمدی
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
     
  let selectedRow = null;
  // ذخیره کردن ردیف فعلی هنگام کلیک روی آیکون ویرایش
  document.querySelectorAll('[data-bs-target="#Edit_schegualModal"]').forEach(btn => {
      btn.addEventListener('click', function () {
      selectedRow = this.closest('tr'); // ذخیره ردیف انتخاب‌شده

      const trackingCode = selectedRow.children[0].textContent.trim();
      const patientName = selectedRow.children[1].textContent.trim();
      const dateTime = selectedRow.children[3].textContent.trim().split(' - ');

      document.getElementById('trackingCode').value = trackingCode;
      document.getElementById('patientName').value = patientName;
      });
  });

  // وقتی روی "ثبت تغییرات" کلیک می‌کنیم
  document.querySelector('.modal-footer .btn-success').addEventListener('click', function () {
      if (!selectedRow) return;

      const newDate = document.getElementById('appointmentDate').value;
      const newTime_h = document.getElementById('appointmentTime_hour').value;
      const newTime_m = document.getElementById('appointmentTime_minutes').value;

      // آپدیت ستون "زمان نوبت"
      selectedRow.children[3].textContent = `${newDate} - ${newTime_h+':'+newTime_m}`;

      // بستن مودال
      const modal = bootstrap.Modal.getInstance(document.getElementById('Edit_schegualModal'));
      modal.hide();
  });

  function convertPersianToGregorian(shamsiDate) {
      const formatted = shamsiDate.replaceAll('/', '-');
      return moment.from(formatted, 'fa', 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
  }
  const toastTriggersuccess = document.getElementById('showToastBtn');
  const toastElementsuccess = document.getElementById('successToast');
  // والد toast که کلاس d-none داره
  const toastWrapper_success = document.getElementById('successToast').parentElement;

  if (toastTriggersuccess) {
    toastTriggersuccess.addEventListener('click', () => {
    // نمایش wrapper
      toastWrapper_success.classList.remove('d-none');
      toastWrapper_success.classList.add('d-block');
      toastWrapper_success.classList.add('showToast');
      const toastsuccess = new bootstrap.Toast(toastElementsuccess);
      toastsuccess.show();
      const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_alireza'));
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
  const toastWrapper_unread = document.getElementById('unreadToast').parentElement;

  function open_unread_toast()
  {
    toastWrapper_unread.classList.remove('d-none');
    toastWrapper_unread.classList.add('d-block');
    toastWrapper_unread.classList.add('showToast');
    const onread_toast = new bootstrap.Toast(toastElementonread);
    onread_toast.show();
    const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_alireza'));
    user_ticket_modal.hide();
  }
  let rowToCancel = null;

// انتخاب ردیف مورد نظر وقتی روی آیکون لغو کلیک میشه
document.querySelectorAll('.cancel-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    rowToCancel = e.target.closest('tr');
  });
});

// وقتی "بله، لغو کن" زده شد
document.getElementById('confirmCancelBtn').addEventListener('click', function () {
  if (rowToCancel) {
    // تغییر وضعیت نوبت به "لغو شده"
    const statusCell = rowToCancel.children[8]; // ستون وضعیت
    statusCell.textContent = 'لغو شده';

    // اضافه کردن دکمه "عودت وجه" اگر قبلاً اضافه نشده
    const actionCell = rowToCancel.querySelector('td.text-end');
    if (!actionCell.querySelector('.btn-info')) {
      const refundButton = document.createElement('a');
      refundButton.href = '#';
      refundButton.className = 'btn btn-sm btn-info ms-1';
      refundButton.title = 'عودت وجه';
      refundButton.setAttribute('data-bs-toggle', 'modal');
      refundButton.setAttribute('data-bs-target', '#refundModal');
      refundButton.innerHTML = '<i class="fas fa-undo-alt text-white"></i>';
      actionCell.appendChild(refundButton);
    }

    rowToCancel = null;
  }

  // بستن مودال
  const modalEl = document.getElementById('cancelConfirmModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  modalInstance.hide();
});
  function showRefundToast() {
    const toastWrapper_refund = document.getElementById('refundToast').parentElement;
     // نمایش wrapper
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

  
