

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
//  المان‌ها
const calendar = document.getElementById('calendar');
const calendarTitle = document.getElementById('calendarTitle');
const weekdaysContainer = document.getElementById('weekdays');

//  تاریخ امروز به شمسی
const today = new Date();
const jToday = jalaali.toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());
let currentYear = jToday.jy;
let currentMonth = jToday.jm;

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];

//  تعطیلات رسمی (با فرمت yyyy/mm/dd)
const holidays = [
  '1404/01/01',
  '1404/01/02',
  '1404/01/03',
  '1404/01/04',
  '1404/01/08',
  '1404/01/11',
  '1404/01/12',
  '1404/01/13',
  '1404/01/15',
  '1404/01/22',
  '1404/01/29',
  '1404/02/04',
  '1404/02/05',
  '1404/02/12',
  '1404/02/19',
  '1404/02/26',
  '1404/03/02',
  '1404/03/09',
  '1404/03/14',
  '1404/03/15',
  '1404/03/16',
  '1404/03/23',
  '1404/03/24',
  '1404/03/30',
  '1404/04/06',
  '1404/04/13',
  '1404/04/14',
  '1404/04/15',
  '1404/04/20',
  '1404/04/27',
  '1404/05/03',
  '1404/05/10',
  '1404/05/17',
  '1404/05/23',
  '1404/05/24',
  '1404/05/31',
  '1404/06/02',
  '1404/06/07',
  '1404/06/10',
  '1404/06/14',
  '1404/06/19',
  '1404/06/21',
  '1404/06/28',
  '1404/07/04',
  '1404/07/11',
  '1404/07/18',
  '1404/07/25',
  '1404/08/02',
  '1404/08/09',
  '1404/08/16',
  '1404/08/23',
  '1404/08/30',
  '1404/09/03',
  '1404/09/07',
  '1404/09/14',
  '1404/09/21',
  '1404/09/28',
  '1404/10/05',
  '1404/10/12',
  '1404/10/13',
  '1404/10/19',
  '1404/10/26',
  '1404/10/27',
  '1404/11/03',
  '1404/11/10',
  '1404/11/15',
  '1404/11/17',
  '1404/11/22',
  '1404/11/24',
  '1404/12/01',
  '1404/12/08',
  '1404/12/15',
  '1404/12/20',
  '1404/12/22',
  '1404/12/29',

];

function renderWeekdays() {
  weekdaysContainer.innerHTML = '';
  const fullNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const isShort = window.innerWidth < 576 || (window.innerWidth < 1200 && window.innerWidth > 991);

  fullNames.forEach(name => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day weekday-title';
    dayDiv.innerText = isShort ? name[0] : name;
    weekdaysContainer.appendChild(dayDiv);
  });
}

function renderCalendar(year, month) {
  calendar.innerHTML = '';
  calendarTitle.innerText = `${monthNames[month - 1]} ${year}`;

  const { gy, gm, gd } = jalaali.toGregorian(year, month, 1);
  const firstDayDate = new Date(gy, gm - 1, gd);
  const startWeekday = (firstDayDate.getDay() + 1) % 7;
  const jalaliMonthLength = jalaali.jalaaliMonthLength(year, month);

  const days = Array(startWeekday).fill('').concat([...Array(jalaliMonthLength).keys()].map(i => i + 1));

  for (let i = 0; i < days.length; i += 7) {
    const weekRow = document.createElement('div');
    weekRow.className = 'calendar-week';

    for (let j = 0; j < 7; j++) {
      const day = days[i + j];
      const col = document.createElement('div');
      col.className = 'calendar-day';

      if (day) {
        const isToday = day === jToday.jd && year === jToday.jy && month === jToday.jm;
        if (isToday) col.classList.add('today');

        const paddedMonth = String(month).padStart(2, '0');
        const paddedDay = String(day).padStart(2, '0');
        const formattedDate = `${year}/${paddedMonth}/${paddedDay}`;
        if (holidays.includes(formattedDate)) col.classList.add('holiday');

        col.innerText = day;
        col.dataset.date = formattedDate;

        col.addEventListener('click', () => handleDateClick(col, year, month, day));
      } else {
        col.classList.add('bg-light');
      }

      weekRow.appendChild(col);
    }
    calendar.appendChild(weekRow);
  }
}

function handleDateClick(col, year, month, day) {
  document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected_day'));
  col.classList.add('selected_day');

  document.getElementById('add-nobat-title').innerText = `${day} ${monthNames[month - 1]} ${year}`;
  document.getElementById('do-calender').innerText = `لیست نوبت های روز ${day} ${monthNames[month - 1]} ${year}`;

  const selectedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
  ['for_ordibehesht8', 'for_ordibehesht13', 'for_ordibehesht20', 'empty_table'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });

  const tableMap = {
    '1404/02/08': 'for_ordibehesht8',
    '1404/02/13': 'for_ordibehesht13',
    '1404/02/20': 'for_ordibehesht20'
  };
  document.getElementById(tableMap[selectedDate] || 'empty_table').style.display = 'table';
}

function initDatePickerAndTimePicker() {
  $('#appointmentDate').persianDatepicker({
    format: 'YYYY/MM/DD',
    initialValue: true,
    autoClose: true
  });
  $('#timeInput').mdtimepicker({
    theme: 'blue',
    format: 'hh:mm',
    is24hour: true
  });
}

function handleConfirmTime() {
  document.getElementById('confirmTime').addEventListener('click', () => {
    const selectedTime = document.getElementById('timeInput').value;
    const tableBody = document.querySelector('#empty_table tbody');

    if (!tableBody) return alert("جدول مورد نظر یافت نشد!");

    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td></td><td>نوبت آزاد</td><td></td><td>${selectedTime}</td>` + '<td></td>'.repeat(6);
    tableBody.appendChild(newRow);

    bootstrap.Modal.getInstance(document.getElementById('timeModal')).hide();
  });
}

//تغییر نوبت کاربر
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
    const actionCell = rowToCancel.querySelector('td.actions-btn');
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
    rowToCancel.querySelector('.cancel-btn').style.display="none";
    rowToCancel.querySelector('.edit-btn').style.display="none";

    rowToCancel = null;
  }

  // بستن مودال
  const modalEl = document.getElementById('cancelConfirmModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  modalInstance.hide();
});

function convertPersianToGregorian(shamsiDate) {
  return moment.from(shamsiDate.replaceAll('/', '-'), 'fa', 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
}

//  اجرای اولیه
window.addEventListener('DOMContentLoaded', () => {
  renderWeekdays();
  renderCalendar(currentYear, currentMonth);
  initDatePickerAndTimePicker();
  handleConfirmTime();
  setupEditModal();
  setupCancelConfirm();
});

window.addEventListener('resize', renderWeekdays);

document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 1) { currentMonth = 12; currentYear--; }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 12) { currentMonth = 1; currentYear++; }
  renderCalendar(currentYear, currentMonth);
});
//تغییر رنگ هر سطر از جدول هنگام انتخاب
const rows = document.querySelectorAll(".clickable-row");

  rows.forEach(row => {
      row.addEventListener("click", function () {
          // حذف رنگ قبلی
          rows.forEach(r => r.classList.remove("selected-row"));
          // رنگ دادن به سطر کلیک‌شده
          this.classList.add("selected-row");
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
const toastTriggersuccess = document.getElementById('showToastBtn');
  const toastElementsuccess = document.getElementById('successToast');

  if (toastTriggersuccess) {
    toastTriggersuccess.addEventListener('click', () => {
      const toastsuccess = new bootstrap.Toast(toastElementsuccess);
      toastsuccess.show();
      const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_alireza'));
      user_ticket_modal.hide();
    });
  }
  const toastElementreject = document.getElementById('rejectToast');
  function reject_userTicket()
  {
    const rejectToast = new bootstrap.Toast(toastElementreject);
    rejectToast.show();
    const reject_modal = bootstrap.Modal.getInstance(document.getElementById('rejectModal'));
    reject_modal.hide();
  }
  const toastElementonread = document.getElementById('unreadToast');
  function open_unread_toast()
  {
    const onread_toast = new bootstrap.Toast(toastElementonread);
    onread_toast.show();
    const user_ticket_modal = bootstrap.Modal.getInstance(document.getElementById('appDetail_alireza'));
    user_ticket_modal.hide();
  }
  function showRefundToast() {
    const send_recModal = document.getElementById('refundModal');
    const send_rec = bootstrap.Modal.getInstance(send_recModal);
    send_rec.hide();
    var toastEl = document.getElementById('refundToast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
  }  