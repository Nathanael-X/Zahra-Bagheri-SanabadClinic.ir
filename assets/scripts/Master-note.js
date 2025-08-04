document.addEventListener('DOMContentLoaded', () => {
    // فعال‌سازی Tooltipها
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  
    let selectedRow = null;
  
    // مدیریت دکمه‌های حذف
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        selectedRow = button.closest('tr');
  
        const deleteModalEl = document.getElementById('deleteModal');
        if (deleteModalEl) {
          new bootstrap.Modal(deleteModalEl).show();
        }
      });
    });
  
    // عملکرد دکمه تأیید حذف
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', () => {
        if (selectedRow) {
          selectedRow.remove();
          selectedRow = null;
        }
  
        // به‌روزرسانی شماره‌ی یادداشت‌ها
        const rows = document.querySelectorAll('#notesTable tbody tr');
        rows.forEach((row, index) => {
          const numberCell = row.querySelector('.note-number');
          if (numberCell) {
            numberCell.textContent = index + 1;
          }
        });
  
        // بستن مودال با بررسی وجود آن
        const deleteModalEl = document.getElementById('deleteModal');
        const deleteModalInstance = bootstrap.Modal.getInstance(deleteModalEl);
        if (deleteModalInstance) {
          deleteModalInstance.hide();
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