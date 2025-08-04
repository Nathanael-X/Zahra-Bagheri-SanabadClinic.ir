

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

// ==== Global Variables ====
let currentActionCell = null;
let currentUserName = "";
let currentUsermodal = "";
let currentRejectCell = null;
let currentRejectUser = "";
let currentRejectModalId = '';
let rowToDelete = null;

// ==== Reply Modals ====
function openReplyModal(name, modalId, actionTd, isModir = false) {
  currentActionCell = actionTd;
  currentUserName = name;
  currentUsermodal = modalId;
  document.getElementById(isModir ? "replyToName_modir" : "replyToName").textContent = name;
  document.getElementById(isModir ? "replyText_modir" : "replyText").value = "";
  new bootstrap.Modal(document.getElementById(isModir ? "replyModal_modir" : "replyModal")).show();
}

function submitReply(isModir = false) {
  const toast = new bootstrap.Toast(document.getElementById("successToast"));
  toast.show();

  bootstrap.Modal.getInstance(document.getElementById(isModir ? "replyModal_modir" : "replyModal")).hide();

  if (currentActionCell) {
    const row = currentActionCell.closest('tr');
    const statusIndex = isModir ? 5 : 6;
    const statusCell = row.querySelector(`td:nth-child(${statusIndex})`);
    if (statusCell) {
      statusCell.className = 'read_ticket text-center';
      statusCell.textContent = 'پاسخ داده شده';
    }

    const actionsCell = row.querySelector('.actions_btn');
    if (actionsCell) {
      actionsCell.innerHTML = `
        <a href="#" class="btn btn-info me-1 mb-0" data-bs-toggle="modal" data-bs-target="#${currentUsermodal}">
          <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" title="مشاهده کردن تیکت"></i>
        </a>
      `;
    }
  }
}

// ==== Reject Modals ====
function openRejectModal(name, modalId, actionTd, isModir = false) {
  currentRejectCell = actionTd;
  currentRejectUser = name;
  currentRejectModalId = modalId;
  document.getElementById(isModir ? "rejectConfirmText_modir" : "rejectConfirmText").textContent = `آیا می‌خواهید درخواست ${name} را رد کنید؟`;
  new bootstrap.Modal(document.getElementById(isModir ? "rejectModal_modir" : "rejectModal")).show();
}

function confirmReject(isModir = false) {
  if (!currentRejectCell) return;
  const row = currentRejectCell.closest('tr');
  const statusIndex = isModir ? 5 : 6;
  const statusCell = row.querySelector(`td:nth-child(${statusIndex})`);
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
  bootstrap.Modal.getInstance(document.getElementById(isModir ? "rejectModal_modir" : "rejectModal")).hide();
}

// ==== Mark as Read ====
function markAsRead(name, modalId, actionTd, isModir = false) {
  currentActionCell = actionTd;
  currentUserName = name;
  const row = actionTd.closest('tr');
  const statusIndex = isModir ? 5 : 6;
  const statusCell = row.querySelector(`td:nth-child(${statusIndex})`);

  if (statusCell) {
    statusCell.className = 'unansweard_ticket text-center';
    statusCell.textContent = 'خوانده شده';
  }

  const actionsCell = row.querySelector('.actions_btn');
  if (actionsCell) {
    actionsCell.innerHTML = `
      <a href="#" class="btn btn-success me-1 mb-1 mb-lg-0"
         onclick="openReplyModal('${name}','${modalId}', this.parentElement, ${isModir})"
         data-bs-toggle="tooltip" title="پاسخ به تیکت">
         <i class="fa-solid fa-reply"></i></a>

      <a href="#" class="btn btn-danger me-1 mb-1 mb-lg-0"
         onclick="openRejectModal('${name}','${modalId}', this.parentElement, ${isModir})"
         data-bs-toggle="tooltip" title="رد کردن درخواست">
         <i class="fa-solid fa-ban"></i></a>

      <a href="#" class="btn btn-info me-1 mb-0"
         onclick="markAsRead('${name}', '${modalId}', this.parentElement, ${isModir})"
         data-bs-toggle="modal" data-bs-target="#${modalId}">
         <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" title="مشاهده کردن تیکت"></i></a>

      <a href="#" class="btn btn-warning me-1 mb-0"
         onclick="markAsUnread(this)"
         data-bs-toggle="tooltip" title="علامت گذاری به عنوان خوانده نشده">
         <i class="fa-solid fa-bookmark text-white"></i></a>
    `;
  }
}

// ==== Mark as Unread ====
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

// ==== Delete Row ====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.btn-delete-ticket').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      rowToDelete = this.closest('tr');
      new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
    });
  });

  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (rowToDelete) {
        rowToDelete.remove();
        updateRowNumbers();
        rowToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
      }
    });
  }
});

function updateRowNumbers() {
  const rows = document.querySelectorAll('table tbody tr');
  rows.forEach((row, index) => {
    const numberCell = row.querySelector('td div');
    if (numberCell) {
      numberCell.textContent = index - 7;
    }
  });
}