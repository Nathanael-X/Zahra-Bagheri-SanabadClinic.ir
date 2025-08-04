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
    
    /** =====================
     *  مدیریت آپلود فایل
     * ===================== */
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
            if (file) {
                fileInput.files = e.dataTransfer.files;
                fileNameDisplay.textContent = `فایل انتخاب‌شده: ${file.name}`;
            }
        });

        fileInput.addEventListener("change", () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = `فایل انتخاب‌شده: ${fileInput.files[0].name}`;
            }
        });
    }
     /** =====================
     *  حذف ردیف از جدول با مودال
     * ===================== */
     let selectedRow = null;
     const deleteButtons = document.querySelectorAll('.delete-btn');
     const deleteModalEl = document.getElementById('deleteModal');
     const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
 
     if (deleteButtons.length && deleteModalEl && confirmDeleteBtn) {
         const deleteModal = new bootstrap.Modal(deleteModalEl);
 
         deleteButtons.forEach(button => {
             button.addEventListener('click', (event) => {
                 event.preventDefault();
                 selectedRow = button.closest('tr');
                 deleteModal.show();
             });
         });
 
         confirmDeleteBtn.addEventListener('click', () => {
             if (selectedRow) {
                 selectedRow.remove();
                 selectedRow = null;
             }
 
             // به‌روزرسانی شماره ردیف‌ها
             const rows = document.querySelectorAll('#notesTable tbody tr');
             rows.forEach((row, index) => {
                 const noteNumberCell = row.querySelector('.note-number');
                 if (noteNumberCell) {
                     noteNumberCell.textContent = index + 1;
                 }
             });
 
             deleteModal.hide();
         });
     }


    /** =====================
     *  Bootstrap Tooltip
     * ===================== */
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl, {
            container: tooltipTriggerEl.closest('.btm-bar')
        });
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

