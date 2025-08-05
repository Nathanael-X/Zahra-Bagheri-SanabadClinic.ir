document.addEventListener("DOMContentLoaded", () => {
    /**
     * رفتن به تب اپلود مقاله با کلیک برروی هر دکمه ی ویرایش مقاله
     */
    const editButtons = document.querySelectorAll('.edit-article'); // یا کلاس دکمه‌ها
    const targetTab = document.querySelector('#insertArticles-tab'); // تب بارگذاری مقاله

    if (editButtons.length && targetTab) {
        editButtons.forEach(button => {
            button.closest('button').addEventListener('click', function (e) {
                e.preventDefault();

                // فعال کردن تب با Bootstrap Tab API
                const tab = new bootstrap.Tab(targetTab);
                tab.show();

                // اسکرول به بالای تب (اختیاری)
                document.querySelector(targetTab.getAttribute('data-bs-target')).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    /** =====================
     *  مدیریت تصویر پروفایل (تغییر و حذف)
     * ===================== */
    const deleteButton = document.querySelector(".uploadremove");
    const confirmModalEl = document.getElementById('confirmDeleteModal');
    const confirmModal = confirmModalEl ? new bootstrap.Modal(confirmModalEl) : null;
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn_thumbnail");
    const profileImage = document.getElementById("uploadfile-1-preview");
    const profileInput = document.getElementById("uploadfile-1");

    if (deleteButton && confirmModal && confirmDeleteBtn && profileImage) {
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            confirmModal.show();
        });

        confirmDeleteBtn.addEventListener("click", () => {
            profileImage.src = "assets/Images/blog/default-thumbnail.png";
            confirmModal.hide();
            deleteButton.style.display = "none";
        });
    }

    if (profileInput && profileImage && deleteButton) {
        profileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                    deleteButton.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else {
                alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
            }
        });
    }


   

     /** =====================
     *  نمایش Toast بعد از انتشار
     * ===================== */
     const confirmPublish_Btn = document.getElementById('confirmPublishBtn');
     if (confirmPublish_Btn) {
         confirmPublish_Btn.addEventListener('click', () => {
             const toastEl = document.getElementById('sendToMaster');
             const toastWrapper = document.getElementById('sendToMaster').parentElement;
             toastWrapper.classList.remove('d-none');
             toastWrapper.classList.add('d-block');
             toastWrapper.classList.add('showToast');  
             if (toastEl) {
                 const toast = new bootstrap.Toast(toastEl);
                 toast.show();
             }
 
             const publishModalEl = document.getElementById('publishModal');
             const modal = bootstrap.Modal.getInstance(publishModalEl);
             if (modal) modal.hide();
         });
     }


       
    /** =====================
     *  بخش آپلود فایل‌ها
     * ===================== */
    function setupFileUpload(uploadAreaId, fileInputId, fileNameDisplayId) {
        const uploadArea = document.getElementById(uploadAreaId);
        const fileInput = document.getElementById(fileInputId);
        const fileNameDisplay = document.getElementById(fileNameDisplayId);

        if (!uploadArea || !fileInput || !fileNameDisplay) return;

        // Drag & Drop
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

        // Change Event
        fileInput.addEventListener("change", () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = `فایل انتخاب‌شده: ${fileInput.files[0].name}`;
            }
        });
    }

    // اجرای برای دو بخش
    setupFileUpload("uploadArea", "fileUpload", "fileName");
    setupFileUpload("uploadArea_oltr", "fileUpload_oltr", "fileName_oltr");


    /** =====================
     *  نمایش / مخفی کردن Tooltip کمکی
     * ===================== */
    window.toggleHelpTooltip = function (iconElement) {
        const tooltip = iconElement.parentElement.querySelector('.help-tooltip');
        if (tooltip) tooltip.classList.toggle('show');
    };



    /** =====================
     *  TinyMCE Editor
     * ===================== */
    if (document.querySelector('#editor')) {
        tinymce.init({
            selector: '#editor',
            directionality: 'rtl',
            language: 'fa',
            language_url: 'assets/vendor/tinymce/langs/fa.js',
            plugins: 'lists link image table code',
            toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table',
            height: 300,
            branding: false,
            menubar: false,
            skin: 'oxide',
            content_css: 'default'
        });
    }


    /** =====================
     *  Bootstrap Tooltip
     * ===================== */
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
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
