document.addEventListener('DOMContentLoaded', function () {

    // ✅ فعال‌سازی همه Tooltipها
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        new bootstrap.Tooltip(el, { container: 'body' });
    });

    // ✅ پاسخ به کاربر
    const answerBtn = document.getElementById('send_answerBTN');
    if (answerBtn) {
        answerBtn.addEventListener('click', function () {
            const unanswered = document.querySelector(".unanswered");
            const viewCommentModalEl = document.getElementById('viewCommentModal');

            if (unanswered) {
                unanswered.innerText = "پاسخ داده شده";
                unanswered.classList.remove('text-muted');
                unanswered.classList.add('text-success', 'fw-bold');
            }

            if (viewCommentModalEl) {
                bootstrap.Modal.getInstance(viewCommentModalEl)?.hide();
            }
            const toastWrapper_success = document.getElementById('sendSuccessToast').parentElement;
            toastWrapper_success.classList.remove('d-none');
            toastWrapper_success.classList.add('d-block');
            toastWrapper_success.classList.add('showToast'); 
            const successToast = new bootstrap.Toast(document.getElementById('sendSuccessToast'));
            successToast.show();
        });
    }

    // ✅ مدیریت عمومی برای حذف یا مسدودسازی نظر
    let currentRow = null;
    let currentAction = null;

    function handleAction(btnSelector, modalId, actionType) {
        document.querySelectorAll(btnSelector).forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const row = btn.closest('tr');
                if (!row) return;

                currentRow = row;
                currentAction = actionType;

                if (actionType === 'delete') {
                    const userName = row.querySelector('h6')?.innerText || 'کاربر';
                    const confirmText = document.getElementById('DeleteCommentConfirmText');
                    if (confirmText) {
                        confirmText.innerHTML = `آیا می‌خواهید نظر کاربر: ${userName} را حذف کنید؟ <span class="text-danger">این عملیات غیرقابل بازگشت است.</span>`;
                    }
                }

                const modal = new bootstrap.Modal(document.getElementById(modalId));
                modal.show();
            });
        });
    }

    // تنظیم دکمه‌های حذف و مسدودسازی
    handleAction('.btn-delete-comment', 'DeleteCommentModal', 'delete');
    handleAction('.btn-block-comment', 'BlockUserModal', 'block');

    // ✅ دکمه تایید داخل مودال‌ها
    document.querySelectorAll('.modal .btn-danger').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!currentRow || !currentAction) return;

            currentRow.remove();
            currentRow = null;

            const modalEl = btn.closest('.modal');
            if (modalEl) {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                modalInstance?.hide();
            }

            currentAction = null;
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

});
