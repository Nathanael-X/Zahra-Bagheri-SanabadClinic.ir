

let currentRow_publish = null; // ذخیره سطر فعلی مقاله
 // 1. باز کردن مودال بازدید مقاله
 document.querySelectorAll('.view_admin_article').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        currentRow_publish = this.closest('tr');

    });
});
//تابع ارسال نظر برای نویسنده ی مقاله
function send_suggest_admin() {
    const viewModalEl_article = document.getElementById('viewArticleModal');
    const commentCollapse = document.getElementById('commentFormCollapse');

    // بستن collapse
    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(commentCollapse);
    collapseInstance.hide();

    // نمایش toast
    const toastSuggest = document.getElementById('success_sendSuggest_ToAdmin');
    if (toastSuggest) {
        const toast = new bootstrap.Toast(toastSuggest);
        toast.show();
    }

    const modalInstance_article = bootstrap.Modal.getOrCreateInstance(viewModalEl_article);
    modalInstance_article.hide();
    // حل مشکل باقی‌ماندن backdrop در موارد خاص
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
}  
//انتشار مقاله توسط ادمین مستر
function publish_admin_article()
{
    if (!currentRow_publish) return;

            // تغییر وضعیت
            const statusCell = currentRow_publish.querySelector('td:nth-child(7)');
            if (statusCell) {
                statusCell.textContent = 'منتشر شده توسط ادمین';
                statusCell.classList.remove('text-muted');
                statusCell.classList.add('text-success', 'fw-bold');
            }

            // نمایش Toast موفقیت
            const toastEl_publish = document.getElementById('sendToMaster');
            if (toastEl_publish) {
                const toast_Publish = new bootstrap.Toast(toastEl_publish);
                toast_Publish.show();
            }
        currentRow_publish =null;
}
//رد مقاله توسط ادمین مستر
function reject_admin_article()
{
    if (!currentRow_publish) return;

            // تغییر وضعیت
            const statusCell = currentRow_publish.querySelector('td:nth-child(7)');
            if (statusCell) {
                statusCell.textContent = 'رد شده توسط ادمین';
                statusCell.classList.remove('text-muted');
                statusCell.classList.add('text-danger', 'fw-bold');
            }

            // نمایش Toast موفقیت
            const toastEl_publish = document.getElementById('success_RejectArticle');
            if (toastEl_publish) {
                const toast_Publish = new bootstrap.Toast(toastEl_publish);
                toast_Publish.show();
            }
        currentRow_publish =null;
}
