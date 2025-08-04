document.addEventListener('DOMContentLoaded', function () {
    const archiveButtons = document.querySelectorAll('.dropdown-item:has(.bi-archive)');
    const userStateMap = new Map(); // نگهداری اطلاعات هر کارت

archiveButtons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    const card = btn.closest('.card');
    const userId = card.getAttribute('data-user-id');
    const userName = card.querySelector('h5')?.innerText.trim() || 'کاربر';

    const colWrapper = card.closest('.col-xl-6');
    const originalContainer = colWrapper.parentElement;

    // شناسه کارت بعدی
    const nextCol = colWrapper.nextElementSibling;
    const nextSiblingId = nextCol?.querySelector('.card')?.getAttribute('data-user-id') || null;


    // ذخیره اطلاعات در Map
    userStateMap.set(userId, {
      originalContainer,
      nextSiblingId,
    });

    // نمایش مودال تأیید
    const modal = document.getElementById('archiveConfirmModal');
    modal.querySelector('#archive-user-name').textContent = userName;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // دکمه تأیید آرشیو
    const confirmBtn = document.querySelector('#archiveConfirmModal .confirm-archive-btn');
    confirmBtn.onclick = function () {
      const clonedCard = card.cloneNode(true);
      const archiveContainer = document.querySelector('#archive_personels .card-body .row');
      const emptyMessage = document.getElementById('no-notifications');

      // حذف کارت از جای اصلی
      colWrapper.remove();

      // استایل خاکستری و دکمه خروج
      clonedCard.classList.add('blocked-user');

      const exitBtn = document.createElement('button');
      exitBtn.className = 'unblock-btn-container btn-unblock';
      exitBtn.setAttribute('data-bs-toggle', 'modal');
      exitBtn.setAttribute('data-bs-target', '#DearchiveConfirmModal');
      exitBtn.textContent = 'خروج از آرشیو';
      clonedCard.appendChild(exitBtn);

      // قرار دادن در آرشیو
      const newCol = document.createElement('div');
      newCol.className = 'col-12 col-lg-6';
      newCol.setAttribute('data-user-id', userId); // برای ردیابی
      newCol.appendChild(clonedCard);
      archiveContainer.appendChild(newCol);

      if (emptyMessage) emptyMessage.classList.add('d-none');

      // دکمه تأیید خروج از آرشیو
      const de_archive_btn = document.getElementById('confirm-dearchive-btn');
      const deModal = document.getElementById('DearchiveConfirmModal');

      // برای جلوگیری از چند بار اجرا شدن
      de_archive_btn.onclick = null;
      de_archive_btn.onclick = function () {
        const info = userStateMap.get(userId);
        if (!info) return;

        const { originalContainer, nextSiblingId } = info;

        // حذف از آرشیو
        newCol.remove();

        // ظاهر قبلی
        clonedCard.classList.remove('blocked-user');
        exitBtn.remove();

        const returnCol = document.createElement('div');
        returnCol.className = 'col-12 col-lg-6';
        returnCol.appendChild(clonedCard);

        // درج در محل درست
        const allCols = Array.from(originalContainer.querySelectorAll('.col-xl-6'));
        let inserted = false;
        for (const col of allCols) {
          const nextCard = col.querySelector('.card');
          if (nextCard?.getAttribute('data-user-id') === nextSiblingId) {
            originalContainer.insertBefore(returnCol, col);
            inserted = true;
            break;
          }
        }
        if (!inserted) originalContainer.appendChild(returnCol);

        // نمایش پیام آرشیو خالی
        if (archiveContainer.querySelectorAll('.col-xl-6').length === 0) {
          emptyMessage?.classList.remove('d-none');
        }

        // بستن مودال
        bootstrap.Modal.getInstance(deModal)?.hide();

        // پاکسازی
        userStateMap.delete(userId);
      };
      bootstrap.Modal.getInstance(modal).hide();
    };
  });
});

});
