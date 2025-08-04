
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
  // ------------------- مدیریت متغیرهای عمومی -------------------
  let currentActionCell = null;
  let currentUserName = "";
  let currentUserModal = "";

  let currentRejectCell = null;
  let currentRejectModalId = "";

  let rowToDelete = null;
  let rowTicketToDelete = null;

  // ------------------- توابع کمکی -------------------
  function updateStatus(row, statusClass, statusText) {
      const statusCell = row.querySelector('td:nth-child(5)');
      if (statusCell) {
          statusCell.className = `${statusClass} text-center`;
          statusCell.textContent = statusText;
      }
  }

  function updateActionsCell(row, modalId, name, isAnswered = false) {
      const actionsCell = row.querySelector('.actions_btn');
      if (!actionsCell) return;

      if (isAnswered) {
          actionsCell.innerHTML = `
              <a href="#" class="btn btn-info me-1 mb-0" data-bs-toggle="modal" data-bs-target="#${modalId}">
                  <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i>
              </a>`;
      } else {
          actionsCell.innerHTML = `
              <a href="#" class="btn btn-success me-1 mb-1 mb-lg-0"
                 onclick="openReplyModal('${name}','${modalId}', this.parentElement)" title="پاسخ به تیکت">
                 <i class="fa-solid fa-reply"></i></a>

              <a href="#" class="btn btn-danger me-1 mb-1 mb-lg-0"
                 onclick="openRejectModal('${name}','${modalId}', this.parentElement)" title="رد کردن درخواست">
                 <i class="fa-solid fa-ban"></i></a>

              <a href="#" class="btn btn-info me-1 mb-0"
                 data-bs-toggle="modal" data-bs-target="#${modalId}">
                 <i class="fa-solid fa-eye text-white"></i></a>

              <a href="#" class="btn btn-warning me-1 mb-0" onclick="markAsUnread(this)" title="علامت‌گذاری خوانده‌نشده">
                 <i class="fa-solid fa-bookmark text-white"></i></a>`;
      }
  }

  function showToast(id) {
      const toast = new bootstrap.Toast(document.getElementById(id));
      toast.show();
  }

  // ------------------- مدیریت پاسخ به تیکت -------------------
  window.openReplyModal = function (name, modalId, actionTd) {
      currentActionCell = actionTd;
      currentUserName = name;
      currentUserModal = modalId;

      const replyModal = document.getElementById("replyModal");
      document.getElementById("replyToName").textContent = name;
      document.getElementById("replyText").value = "";

      new bootstrap.Modal(replyModal).show();
  };

  window.submitReply = function () {
      showToast("successToast");
      bootstrap.Modal.getInstance(document.getElementById("replyModal")).hide();

      if (currentActionCell) {
          const row = currentActionCell.closest('tr');
          updateStatus(row, 'read_ticket', 'پاسخ داده شده');
          updateActionsCell(row, currentUserModal, currentUserName, true);
      }
  };

  // ------------------- مدیریت رد کردن تیکت -------------------
  window.openRejectModal = function (name, modalId, actionTd) {
      currentRejectCell = actionTd;
      currentRejectModalId = modalId;

      document.getElementById("rejectConfirmText").textContent =
          `آیا می‌خواهید درخواست ${name} را رد کنید؟`;

      new bootstrap.Modal(document.getElementById("rejectModal")).show();
  };

  window.confirmReject = function () {
      if (currentRejectCell) {
          const row = currentRejectCell.closest('tr');
          updateStatus(row, 'blocked_ticket', 'رد شده');
          updateActionsCell(row, currentRejectModalId, currentUserName, true);

          bootstrap.Modal.getInstance(document.getElementById("rejectModal")).hide();
      }
  };

  // ------------------- علامت‌گذاری خوانده شده / نشده -------------------
  window.markAsRead = function (name, modalId, actionTd) {
      currentActionCell = actionTd;
      currentUserName = name;

      const row = actionTd.closest('tr');
      updateStatus(row, 'unansweard_ticket', 'خوانده شده');
      updateActionsCell(row, modalId, name);
  };

  window.markAsUnread = function (button) {
      const row = button.closest('tr');
      const statusCell = row.querySelector('td[class*="ticket"]');

      if (statusCell) {
          statusCell.classList.remove('unansweard_ticket');
          statusCell.classList.add('unread_ticket');
          statusCell.textContent = 'خوانده نشده';
          button.style.display = "none";
      }
  };

  // ------------------- حذف اعلان‌ها -------------------
  document.querySelectorAll('.btn-delete-notification').forEach(btn => {
      btn.addEventListener('click', function (e) {
          e.preventDefault();
          rowToDelete = this.closest('tr');
          new bootstrap.Modal(document.getElementById('deleteNotificationConfirmModal')).show();
      });
  });

  document.getElementById('confirmDeleteNotificationBtn').addEventListener('click', function () {
      if (rowToDelete) {
          rowToDelete.remove();
          rowToDelete = null;
          bootstrap.Modal.getInstance(document.getElementById('deleteNotificationConfirmModal')).hide();
      }
  });

  // ------------------- حذف تیکت‌ها -------------------
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

  // ------------------- مدیریت عکس پروفایل -------------------
  const deleteButton = document.querySelector(".uploadremove");
  const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const profileImage = document.getElementById("uploadfile-1-preview");

  if (deleteButton) {
      deleteButton.addEventListener("click", function (e) {
          e.preventDefault();
          confirmModal.show();
      });

      confirmDeleteBtn.addEventListener("click", function () {
          profileImage.src = "assets/Images/JahanGiri/defult image logo.png";
          confirmModal.hide();
          deleteButton.style.display = "none";
      });
  }

  const fileInput = document.getElementById("uploadfile-1");
  const previewImage = document.getElementById("uploadfile-1-preview");

  if (fileInput) {
      fileInput.addEventListener("change", function () {
          const file = this.files[0];

          if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  previewImage.src = e.target.result;
                  deleteButton.style.display = "block";
              };
              reader.readAsDataURL(file);
          } else {
              alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
          }
      });
  }

  // ------------------- مشاهده اعلان -------------------
  const viewButtons = document.querySelectorAll('.btn-show-notif');
  const showNotifModal = new bootstrap.Modal(document.getElementById('ShowNotifModal'));
  const modalTitle = document.getElementById('ShowNotifModalLabel');
  const modalBody = document.querySelector('#ShowNotifModal .modal-body p');

  viewButtons.forEach(button => {
      button.addEventListener('click', function (e) {
          e.preventDefault();
          const row = button.closest('tr');
          const subject = row.querySelector('td:nth-child(2) h6').textContent;
          const description = row.querySelector('td:nth-child(4)').textContent;

          modalTitle.textContent = subject;
          modalBody.textContent = description;
          showNotifModal.show();
      });
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
  
  // File upload drag & drop
  const uploadArea = document.getElementById("uploadArea");
  const fileInput_forUploadArea = document.getElementById("fileUpload");
  const fileNameDisplay = document.getElementById("fileName");

  if (uploadArea && fileInput_forUploadArea && fileNameDisplay) {
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
      fileInput_forUploadArea.files = e.dataTransfer.files;
      fileNameDisplay.textContent = `فایل انتخاب‌شده: ${file.name}`;
    });

    fileInput_forUploadArea.addEventListener("change", () => {
      if (fileInput_forUploadArea.files.length > 0) {
        fileNameDisplay.textContent = `فایل انتخاب‌شده: ${fileInput_forUploadArea.files[0].name}`;
      }
    });
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
