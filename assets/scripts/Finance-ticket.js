// ticket-system.js

document.addEventListener("DOMContentLoaded", function () {
    // File upload drag & drop
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileUpload");
  const fileNameDisplay = document.getElementById("fileName");

  if (uploadArea && fileInput && fileNameDisplay) {
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      fileInput.files = e.dataTransfer.files;
      fileNameDisplay.textContent = `فایل انتخاب‌شده: ${file.name}`;
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `فایل انتخاب‌شده: ${fileInput.files[0].name}`;
      }
    });
  }
    // فعال‌سازی تولتیپ‌ها
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  
    // انتخاب سطر با کلاس clickable-row
    const rows = document.querySelectorAll(".clickable-row");
    rows.forEach(row => {
      row.addEventListener("click", function () {
        rows.forEach(r => r.classList.remove("selected-row"));
        this.classList.add("selected-row");
      });
    });
  
    // حذف تیکت
    let rowTicketToDelete = null;
    document.querySelectorAll('.btn-delete-ticket').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        rowTicketToDelete = this.closest('tr');
        new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
      });
    });
  
    document.getElementById('confirmDeleteTicketBtn').addEventListener('click', function () {
      if (rowTicketToDelete) {
        rowTicketToDelete.remove();
        rowTicketToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
      }
    });
  });
  
  // متغیرهای مشترک برای مدیریت عملیات
  let currentActionCell = null;
  let currentUserName = "";
  let currentUsermodal = "";
  
  let currentRejectCell = null;
  let currentRejectUser = "";
  let currentRejectModalId = "";
  
  // علامت‌گذاری به عنوان خوانده شده
  function markAsRead(name, modalId, actionTd) {
    currentActionCell = actionTd;
    currentUserName = name;
  
    const row = currentActionCell.closest('tr');
    if (!row) return;
  
    const statusCell = row.querySelector('td:nth-child(4)');
    if (statusCell) {
      statusCell.className = 'unansweard_ticket text-center';
      statusCell.textContent = 'خوانده شده';
    }
  
    const actionsCell = row.querySelector('.actions_btn');
    if (actionsCell) {
      actionsCell.innerHTML = `
        <a href="#" class="btn btn-success me-1 mb-1 mb-lg-0"
           onclick="openReplyModal('${name}','${modalId}', this.parentElement)"
           data-bs-toggle="tooltip" data-bs-placement="top" title="پاسخ به تیکت">
           <i class="fa-solid fa-reply"></i></a>
  
        <a href="#" class="btn btn-danger me-1 mb-1 mb-lg-0"
           onclick="openRejectModal('${name}','${modalId}', this.parentElement)"
           data-bs-toggle="tooltip" data-bs-placement="top" title="رد کردن درخواست">
           <i class="fa-solid fa-ban"></i></a>
  
        <a href="#" class="btn btn-info me-1 mb-0"
           onclick="markAsRead('${name}', '${modalId}', this.parentElement)"
           data-bs-toggle="modal" data-bs-target="#${modalId}">
           <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" title="مشاهده کردن تیکت"></i></a>
  
        <a href="#" class="btn btn-warning me-1 mb-0"
           onclick="markAsUnread(this)"
           data-bs-toggle="tooltip" data-bs-placement="top" title="علامت گذاری به عنوان خوانده نشده">
           <i class="fa-solid fa-bookmark text-white"></i></a>
      `;
    }
  }
  
  // علامت‌گذاری به عنوان خوانده‌نشده
  function markAsUnread(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('td[class*="ticket"]');
  
    if (statusCell) {
      statusCell.classList.remove('unansweard_ticket');
      statusCell.classList.add('unread_ticket');
      statusCell.textContent = 'خوانده نشده';
      button.style.display = "none";
    }
  }
  
  // باز کردن مودال رد تیکت
  function openRejectModal(name, modalId, actionTd) {
    currentRejectCell = actionTd;
    currentRejectUser = name;
    currentRejectModalId = modalId;
  
    const rejectText = document.getElementById("rejectConfirmText");
    if (rejectText) {
      rejectText.textContent = `آیا می‌خواهید درخواست ${name} را رد کنید؟`;
    }
  
    new bootstrap.Modal(document.getElementById("rejectModal")).show();
  }
  
  // تایید رد تیکت
  function confirmReject() {
    if (!currentRejectCell) return;
  
    const row = currentRejectCell.closest('tr');
    if (!row) return;
  
    const statusCell = row.querySelector('td:nth-child(4)');
    if (statusCell) {
      statusCell.className = 'blocked_ticket text-center';
      statusCell.textContent = 'رد شده';
    }
  
    const actionsCell = row.querySelector('.actions_btn');
    if (actionsCell) {
      actionsCell.innerHTML = `
        <a href="#" class="btn btn-info me-1 mb-0"
           data-bs-toggle="modal" data-bs-target="#${currentRejectModalId}">
           <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" title="مشاهده کردن تیکت"></i>
        </a>
      `;
    }
  
    bootstrap.Modal.getInstance(document.getElementById("rejectModal")).hide();
  }
  
  // باز کردن مودال پاسخ
  function openReplyModal(name, modalIdReplay, actionTd) {
    currentActionCell = actionTd;
    currentUserName = name;
    currentUsermodal = modalIdReplay;
  
    const replyToName = document.getElementById("replyToName");
    const replyText = document.getElementById("replyText");
  
    if (replyToName) replyToName.textContent = name;
    if (replyText) replyText.value = "";
  
    new bootstrap.Modal(document.getElementById("replyModal")).show();
  }
  
  // ارسال پاسخ
  function submitReply() {
    const toast = new bootstrap.Toast(document.getElementById("successToast_Ticket"));
    toast.show();
  
    bootstrap.Modal.getInstance(document.getElementById("replyModal")).hide();
  
    if (!currentActionCell) return;
  
    const row = currentActionCell.closest('tr');
    if (!row) return;
  
    const statusCell = row.querySelector('td:nth-child(4)');
    if (statusCell) {
      statusCell.className = 'read_ticket text-center';
      statusCell.textContent = 'پاسخ داده شده';
    }
  
    const actionsCell = row.querySelector('.actions_btn');
    if (actionsCell) {
      actionsCell.innerHTML = `
        <a href="#" class="btn btn-info me-1 mb-0"
           data-bs-toggle="modal" data-bs-target="#${currentUsermodal}">
           <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" title="مشاهده کردن تیکت"></i>
        </a>
      `;
    }
  }
  