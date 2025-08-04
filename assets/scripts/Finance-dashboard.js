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
document.addEventListener('DOMContentLoaded', function () {
    // پاسخ به اعلان ادمین
    const replyToggleBtn = document.getElementById("replyToggleBtn");
    const replyBox = document.getElementById("adminReplyBox");
    const clearReplyBtn = document.getElementById("clearReplyBtn");
    const replyTextarea = document.getElementById("replyTextarea");
  
    if (replyToggleBtn && replyBox && replyTextarea) {
      replyToggleBtn.addEventListener("click", function () {
        replyBox.classList.toggle("d-none");
        replyTextarea.focus();
      });
    }
  
    if (clearReplyBtn && replyTextarea) {
      clearReplyBtn.addEventListener("click", function () {
        replyTextarea.value = "";
      });
    }
  
    // توست‌ها و مودال‌ها
    const toastTriggersuccess = document.getElementById('showToastBtn');
    const toastElementsuccess = document.getElementById('successToast_ticket');
    const toastElementreject = document.getElementById('rejectToast');
    const toastElementonread = document.getElementById('unreadToast');
    const userTicketModalId = 'appDetail_SoheilMolody';
  
    if (toastTriggersuccess && toastElementsuccess) {
      toastTriggersuccess.addEventListener('click', () => {
        new bootstrap.Toast(toastElementsuccess).show();
        const modal = bootstrap.Modal.getInstance(document.getElementById(userTicketModalId));
        modal?.hide();
      });
    }
  
    window.reject_userTicket = function () {
      new bootstrap.Toast(toastElementreject).show();
      const modal = bootstrap.Modal.getInstance(document.getElementById('rejectModal'));
      modal?.hide();
    };
  
    window.open_unread_toast = function () {
      new bootstrap.Toast(toastElementonread).show();
      const modal = bootstrap.Modal.getInstance(document.getElementById(userTicketModalId));
      modal?.hide();
    };
  
    // تولتیپ‌ها
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  
    // انتخاب ردیف
    const rows = document.querySelectorAll(".clickable-row");
    rows.forEach(row => {
      row.addEventListener("click", function () {
        rows.forEach(r => r.classList.remove("selected-row"));
        this.classList.add("selected-row");
      });
    });
  
    // عملکرد تایید، رد، و یادداشت
    const today = new persianDate().format('YYYY/MM/DD');
    const approved_Modal = new bootstrap.Modal(document.getElementById("aproveModal"));
    const denied_Modal = new bootstrap.Modal(document.getElementById("deniedModal"));
    const sendNotes_Modal = new bootstrap.Modal(document.getElementById('sendNoteModal'));
  
    let currentActionCell = null;
    let currentUserName = "";
  
    window.funcAproved = function (name, actionTd) {
      currentActionCell = actionTd;
      currentUserName = name;
      document.getElementById("user_reciver").textContent = currentUserName;
      approved_Modal.show();
    };
  
    window.return_money = function () {
      if (!currentActionCell) return;
      const row = currentActionCell.closest('tr');
      if (!row) return;
  
      disableActionButtons(row);
      updateStatus(row, "واریز شده", "text-success");
      row.querySelector('td:nth-child(8)').textContent = today;
      approved_Modal.hide();
    };
  
    window.funcDenied = function (name, actionTd) {
      currentActionCell = actionTd;
      currentUserName = name;
      document.getElementById("user_reciver_denied").textContent = currentUserName;
      denied_Modal.show();
    };
  
    const deniedBtn = document.getElementById("deniedMoney");
    if (deniedBtn) {
      deniedBtn.addEventListener("click", () => {
        if (!currentActionCell) return;
        const row = currentActionCell.closest('tr');
        if (!row) return;
        disableActionButtons(row);
        updateStatus(row, "رد شده", "text-danger");
        denied_Modal.hide();
      });
    }
  
    window.funcAddNote = function (name) {
      currentUserName = name;
      document.getElementById("replyToName").textContent = currentUserName;
      sendNotes_Modal.show();
    };
  
    const sendNoteBtn = document.getElementById("btn-send-not");
    if (sendNoteBtn) {
      sendNoteBtn.addEventListener("click", () => {
        new bootstrap.Toast(document.getElementById("successToast")).show();
        sendNotes_Modal.hide();
      });
    }
  
    // توابع کمکی
    function disableActionButtons(row) {
      row.querySelectorAll('.aproved, .denied').forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('btn-info');
        btn.classList.add('btn-secondary');
      });
    }
  
    function updateStatus(row, text, statusClass) {
      const statusCell = row.querySelector('td:nth-child(7)');
      statusCell.textContent = text;
      statusCell.classList.remove("text-success", "text-danger");
      statusCell.classList.add(statusClass, "fw-bold");
    }
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
  