document.addEventListener("DOMContentLoaded", () =>{
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
});
function clear_notif()
        {
            document.getElementsByClassName('new-notif-tag').item(0).style.display="none";
        }
        const uploadArea = document.getElementById("uploadArea");
        const fileInput = document.getElementById("fileUpload");
        const fileNameDisplay = document.getElementById("fileName");
  
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
//برای حذف اعلان های دریافتی کاربر
const checkboxes = document.querySelectorAll('.notif-checkbox');
const deleteContainer = document.getElementById('delete-selected-container');
const deleteBtn = document.getElementById('delete-selected-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const noNotifications = document.getElementById('no-notifications');

function updateDeleteButtonVisibility() {
  const anyChecked = [...checkboxes].some(cb => cb.checked);
  deleteContainer.classList.toggle('d-none', !anyChecked);
}

checkboxes.forEach(cb => {
  cb.addEventListener('change', updateDeleteButtonVisibility);
});

deleteBtn.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  modal.show();
});

confirmDeleteBtn.addEventListener('click', () => {
  [...checkboxes].forEach(cb => {
    if (cb.checked) {
      cb.closest('.notification-item').remove();
    }
  });

  const remaining = document.querySelectorAll('.notification-item').length;
  if (remaining === 0) {
    noNotifications.classList.remove('d-none');
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
  modal.hide();
  deleteContainer.classList.add('d-none');
});