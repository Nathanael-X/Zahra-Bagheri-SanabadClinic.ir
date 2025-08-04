document.addEventListener('DOMContentLoaded', () => {
    // 📌 سایدبار
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
  
    if (sidebarToggle && sidebar && overlay) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
      });
  
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
      });
    }
  
    // 📌 Tooltip‌ها
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  
    // 📌 Popover‌ها
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new bootstrap.Popover(el);
    });
  
    // 📌 حذف عکس پروفایل
    const deleteButton = document.querySelector(".uploadremove");
    const confirmModalEl = document.getElementById('confirmDeleteModal');
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const profileImage = document.getElementById("uploadfile-1-preview");
    const confirmModal = confirmModalEl ? new bootstrap.Modal(confirmModalEl) : null;
  
    if (deleteButton && confirmModal && confirmDeleteBtn && profileImage) {
      deleteButton.addEventListener("click", e => {
        e.preventDefault();
        confirmModal.show();
      });
  
      confirmDeleteBtn.addEventListener("click", () => {
        profileImage.src = "assets/Images/sample-profile/sample-pic.jpeg";
        confirmModal.hide();
        deleteButton.style.display = "none";
      });
    }
  
    // 📌 تغییر عکس پروفایل
    const fileInput = document.getElementById("uploadfile-1");
    const previewImage = document.getElementById("uploadfile-1-preview");
  
    if (fileInput && previewImage && deleteButton) {
      fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = e => {
            previewImage.src = e.target.result;
            deleteButton.style.display = "block";
          };
          reader.readAsDataURL(file);
        } else {
          alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
        }
      });
    }
  
    // 📌 نمایش دکمه رفتن به بالا
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        const show = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
        backToTopBtn.style.opacity = show ? "1" : "0";
        backToTopBtn.style.visibility = show ? "visible" : "hidden";
      });
  
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // 📌 Drag & Drop و نمایش نام فایل
    const uploadArea = document.getElementById("uploadArea");
    const fileInput_1 = document.getElementById("fileUpload");
    const fileNameDisplay_1 = document.getElementById("fileName");
  
    if (uploadArea && fileInput_1 && fileNameDisplay_1) {
      uploadArea.addEventListener("dragover", e => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
  
      uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
      });
  
      uploadArea.addEventListener("drop", e => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file) {
          fileInput_1.files = e.dataTransfer.files;
          fileNameDisplay_1.textContent = `فایل انتخاب‌شده: ${file.name}`;
        }
      });
  
      fileInput_1.addEventListener("change", () => {
        if (fileInput_1.files.length > 0) {
          fileNameDisplay_1.textContent = `فایل انتخاب‌شده: ${fileInput_1.files[0].name}`;
        }
      });
    }
  });
  