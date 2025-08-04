document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll(".clickable-row");

    rows.forEach(row => {
        row.addEventListener("click", function () {
            // حذف رنگ قبلی
            rows.forEach(r => r.classList.remove("selected-row"));
            // رنگ دادن به سطر کلیک‌شده
            this.classList.add("selected-row");
        });
    });
    // ✅ فعال‌سازی Tooltip با جلوگیری از بهم‌ریختگی
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        new bootstrap.Tooltip(el, { container: 'body' });
    });

    // ✅ حذف حساب کاربری
    const deleteAccountBtn = document.getElementById('confirmDeleteUserAccount');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function () {
            const userCol = document.getElementById('alireza_col');
            if (userCol) userCol.style.display = "none";

            bootstrap.Modal.getInstance(document.getElementById('delete_user_account')).hide();

            new bootstrap.Toast(document.getElementById('deleteAccountSuccessToast')).show();
        });
    }

    // ✅ حذف همه فعالیت‌ها
    const deleteAllBtn = document.getElementById('confirmDeleteAllBtn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function () {
            document.getElementById("full_activity")?.classList.add("d-none");
            document.getElementById("empty_activity")?.classList.remove("d-none");

            bootstrap.Modal.getInstance(document.getElementById('delete_all_avtivities'))?.hide();
            bootstrap.Modal.getInstance(document.getElementById('reservationHistoryModal'))?.hide();

            new bootstrap.Toast(document.getElementById('deleteSuccessToast')).show();
        });
    }

    // ✅ تولید رمز موقت
    function generateRandomPassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    // ✅ باز کردن مودال بازیابی رمز
    window.openResetPasswordModal = function (userName, userId) {
        document.getElementById('resetUserName').innerText = userName;
        document.getElementById('confirmResetBtn').setAttribute('data-userid', userId);
        new bootstrap.Modal(document.getElementById('resetPasswordModal')).show();
    };

    // ✅ تایید بازیابی رمز عبور
    const confirmResetBtn = document.getElementById('confirmResetBtn');
    const CloseAllModal_Pass = document.getElementById('allPassModalClose');
    if (confirmResetBtn) {
        confirmResetBtn.addEventListener('click', function () {
            const newPass = generateRandomPassword(8);
            document.getElementById('newGeneratedPassword').innerText = newPass;

            bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
            new bootstrap.Modal(document.getElementById('newPasswordModal')).show();
        });
    }
    if(CloseAllModal_Pass)
    {
        CloseAllModal_Pass.addEventListener('click', function () {
            bootstrap.Modal.getInstance(document.getElementById('newPasswordModal')).hide();
        });
    }

    // ✅ مسدود کردن کاربر
    const confirmBlockBtn = document.getElementById('confirmBlockUser');
    if (confirmBlockBtn) {
        confirmBlockBtn.addEventListener('click', function () {
            const userCol = document.getElementById('alireza_col');
            if (!userCol) return;

            userCol.classList.add('blocked-user');

            if (!userCol.querySelector('.blocked-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'blocked-overlay';
                userCol.appendChild(overlay);
            }

            if (!userCol.querySelector('.unblock-btn-container')) {
                const unblockDiv = document.createElement('div');
                unblockDiv.className = 'unblock-btn-container';
                unblockDiv.innerHTML = `
                    <button class="btn btn-success btn-sm btn-unblock" data-userid="alireza_col" data-bs-toggle="modal" data-bs-target="#UnBlockUserModal">
                        رفع مسدودیت
                    </button>`;
                userCol.appendChild(unblockDiv);
            }

            bootstrap.Modal.getInstance(document.getElementById('BlockUserModal')).hide();
        });
    }

    // ✅ رفع مسدودیت کاربر
    window.confirmUnBlockUser = function () {
        const userId = document.querySelector('.btn-unblock')?.getAttribute('data-userid');
        const userCol = document.getElementById(userId);
        if (!userCol) return;

        userCol.classList.remove('blocked-user');
        userCol.querySelector('.unblock-btn-container')?.remove();
        userCol.querySelector('.blocked-overlay')?.remove();

        bootstrap.Modal.getInstance(document.getElementById('UnBlockUserModal')).hide();
    };

    
    // ✅ عکس پروفایل کاربر
    const fileInputUser = document.getElementById("uploadfile-user");
    const profileImageUser = document.getElementById("uploadfile-user-preview");
    const deleteButtonUser = document.getElementById("uploaduserremove");
    const confirmDeleteBtnUser = document.getElementById("confirmDeleteBtn");
    const defaultImageSrc = "assets/Images/JahanGiri/defult image logo.png";

    // تغییر عکس پروفایل کاربر
    if (fileInputUser && profileImageUser) {
        fileInputUser.addEventListener("change", function () {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profileImageUser.src = e.target.result;
                    deleteButtonUser?.classList.replace("d-none", "d-block");
                };
                reader.readAsDataURL(file);
            } else {
                alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
            }
        });
    }

    // حذف عکس پروفایل کاربر
    if (deleteButtonUser && confirmDeleteBtnUser && profileImageUser) {
        deleteButtonUser.addEventListener("click", function (e) {
            e.preventDefault();
            new bootstrap.Modal(document.getElementById('confirmDeleteModal')).show();
        });

        confirmDeleteBtnUser.addEventListener("click", function () {
            profileImageUser.src = defaultImageSrc;
            fileInputUser.value = "";
            bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
            deleteButtonUser.classList.replace("d-block", "d-none");
        });
    }


     // ✅ عکس پروفایل پرسنل
     const fileInputPersonel = document.getElementById("uploadfile-1");
     const profileImagePersonel = document.getElementById("uploadfile-1-preview");
     const deleteButtonPersonel = document.getElementById("uploadremove-personel"); // ⬅ شناسه جدا
     const confirmDeleteBtnPersonel = document.getElementById("confirmpersonelDelete_profileBtn");
 
     // تغییر عکس پروفایل پرسنل
     if (fileInputPersonel && profileImagePersonel) {
         fileInputPersonel.addEventListener("change", function () {
             const file = this.files[0];
             if (file && file.type.startsWith("image/")) {
                 const reader = new FileReader();
                 reader.onload = function (e) {
                     profileImagePersonel.src = e.target.result;
                     deleteButtonPersonel?.classList.replace("d-none", "d-block");
                 };
                 reader.readAsDataURL(file);
             } else {
                 alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
             }
         });
     }
 
     // حذف عکس پروفایل پرسنل
     if (deleteButtonPersonel && confirmDeleteBtnPersonel && profileImagePersonel) {
         deleteButtonPersonel.addEventListener("click", function (e) {
             e.preventDefault();
             new bootstrap.Modal(document.getElementById("personelDelete_profile")).show();
         });
 
         confirmDeleteBtnPersonel.addEventListener("click", function () {
             profileImagePersonel.src = defaultImageSrc;
             fileInputPersonel.value = "";
             bootstrap.Modal.getInstance(document.getElementById("personelDelete_profile")).hide();
             deleteButtonPersonel.classList.replace("d-block", "d-none");
         });
     }

});