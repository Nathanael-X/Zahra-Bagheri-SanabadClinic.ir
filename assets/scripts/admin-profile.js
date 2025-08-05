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
document.addEventListener("DOMContentLoaded", function () {
  
    //حذف عکس پروفایل
    const deleteButton = document.querySelector(".uploadremove");
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const profileImage = document.getElementById("uploadfile-1-preview");
    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      confirmModal.show();
    });

    confirmDeleteBtn.addEventListener("click", function () {
      // تغییر تصویر پروفایل
      profileImage.src = "assets/Images/sample-profile/sample-pic.jpeg";
      // بستن مودال
      confirmModal.hide();
      deleteButton.style.display="none";
    });

    //تغییر عکس پروفایل
    const fileInput = document.getElementById("uploadfile-1");
    const previewImage = document.getElementById("uploadfile-1-preview");

    fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
        previewImage.src = e.target.result;
        deleteButton.style.display="block";
        };

        reader.readAsDataURL(file);
    } else {
        alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
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
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl, {
        container: tooltipTriggerEl.closest('.btm-bar')
      });
    });

  });
  
  const uploadArea = document.getElementById("uploadArea");
            const fileInput_1 = document.getElementById("fileUpload");
            const fileNameDisplay_1 = document.getElementById("fileName");

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
            fileInput_1.files = e.dataTransfer.files;
            fileNameDisplay_1.textContent = `فایل انتخاب‌شده: ${file.name}`;
            });

            fileInput_1.addEventListener("change", () => {
            if (fileInput_1.files.length > 0) {
                fileNameDisplay_1.textContent = `فایل انتخاب‌شده: ${fileInput_1.files[0].name}`;
            }
            });