
document.addEventListener("DOMContentLoaded", function () {
    // =============================
    // 1. File Drag & Drop Upload
    // =============================
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileUpload");
    const fileNameDisplay = document.getElementById("fileName");
  
    if (uploadArea && fileInput && fileNameDisplay) {
      // درگ فایل روی ناحیه آپلود
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
        if (file) {
          fileInput.files = e.dataTransfer.files;
          fileNameDisplay.textContent = `فایل انتخاب‌شده: ${file.name}`;
        }
      });
  
      // انتخاب فایل از ورودی
      fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
          fileNameDisplay.textContent = `فایل انتخاب‌شده: ${fileInput.files[0].name}`;
        }
      });
    }
  
    // =============================
    // 2. Bootstrap Tooltip
    // =============================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  
    // =============================
    // 3. Row Selection (highlight)
    // =============================
    const rows = document.querySelectorAll(".clickable-row");
    rows.forEach(row => {
      row.addEventListener("click", function () {
        rows.forEach(r => r.classList.remove("selected-row"));
        this.classList.add("selected-row");
      });
    });
  
    // =============================
    // 4. Delete Row With Modal
    // =============================
    let selectedRow = null;
  
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const deleteModal = document.getElementById("deleteModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const notesTableBody = document.querySelector("#notesTable tbody");
  
    if (deleteModal && confirmDeleteBtn && notesTableBody) {
      deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          selectedRow = this.closest("tr");
          new bootstrap.Modal(deleteModal).show();
        });
      });
  
      confirmDeleteBtn.addEventListener("click", function () {
        if (selectedRow) {
          selectedRow.remove();
          selectedRow = null;
  
          // بروزرسانی شماره‌ یادداشت‌ها
          const rows = notesTableBody.querySelectorAll("tr");
          rows.forEach((row, index) => {
            const numberCell = row.querySelector(".note-number");
            if (numberCell) {
              numberCell.textContent = index + 1;
            }
          });
  
          // بستن مودال
          const modalInstance = bootstrap.Modal.getInstance(deleteModal);
          if (modalInstance) modalInstance.hide();
        }
      });
    }
  });
  