let currentActionCell = null; // نگهدارنده td فعلی
let currentUserName = "";
let currentUsermodal = "";
        
          function openReplyModal(name,modalId_replay, actionTd) {
            currentActionCell = actionTd;
            currentUserName = name;
            currentUsermodal=modalId_replay;
            document.getElementById("replyToName").textContent = name;
            document.getElementById("replyText").value = "";
            new bootstrap.Modal(document.getElementById("replyModal")).show();
          }
          function openReplyModal_modir(name,modalId_replay, actionTd)
          {
            currentActionCell = actionTd;
            currentUserName = name;
            currentUsermodal=modalId_replay;
            document.getElementById("replyToName_modir").textContent = name;
            document.getElementById("replyText_modir").value = "";
            new bootstrap.Modal(document.getElementById("replyModal_modir")).show();
          }
          function submitReply_modir() {
            // نمایش Toast
            const toast = new bootstrap.Toast(document.getElementById("successToast"));
            toast.show();
        
            // بستن مودال
            bootstrap.Modal.getInstance(document.getElementById("replyModal_modir")).hide();
        
            // جایگزینی دکمه‌ها
            if (currentActionCell) {
              // دسترسی به <tr> والد
             const row = currentActionCell.closest('tr');
             if (!row) return;

             // تغییر وضعیت ستون ششم به "پاسخ داده شده"
             const statusCell = row.querySelector('td:nth-child(5)');
             if (statusCell) {
               statusCell.className = 'read_ticket text-center';
               statusCell.textContent = 'پاسخ داده شده';
             }

             // پاک‌سازی دکمه‌های قبلی
             const actionsCell = row.querySelector('.actions_btn');
             if (actionsCell) {
               actionsCell.innerHTML = `
                 <a href="#" class="btn btn-info me-1 mb-0" data-bs-toggle="modal" data-bs-target="#${currentUsermodal}">
                   <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i>
                 </a>
               `;
             }
           }
          }
          function submitReply() {
            // نمایش Toast
            const toast = new bootstrap.Toast(document.getElementById("successToast"));
            toast.show();
        
            // بستن مودال
            bootstrap.Modal.getInstance(document.getElementById("replyModal")).hide();
        
            // جایگزینی دکمه‌ها
            if (currentActionCell) {
               // دسترسی به <tr> والد
              const row = currentActionCell.closest('tr');
              if (!row) return;

              // تغییر وضعیت ستون ششم به "پاسخ داده شده"
              const statusCell = row.querySelector('td:nth-child(5)');
              if (statusCell) {
                statusCell.className = 'read_ticket text-center';
                statusCell.textContent = 'پاسخ داده شده';
              }

              // پاک‌سازی دکمه‌های قبلی
              const actionsCell = row.querySelector('.actions_btn');
              if (actionsCell) {
                actionsCell.innerHTML = `
                  <a href="#" class="btn btn-info me-1 mb-0" data-bs-toggle="modal" data-bs-target="#${currentUsermodal}">
                    <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i>
                  </a>
                `;
              }
            }
          }
          let currentRejectCell = null;
          let currentRejectUser = "";
          let currentRejectModalId = '';
          function openRejectModal(name, modalId, actionTd) {
            currentRejectCell = actionTd;
            currentRejectUser = name;
            currentRejectModalId = modalId;
            document.getElementById("rejectConfirmText").textContent =
              `آیا می‌خواهید درخواست ${name} را رد کنید؟`;
            new bootstrap.Modal(document.getElementById("rejectModal")).show();
          }
          function openRejectModal_modir(name, modalId, actionTd) {
            currentRejectCell = actionTd;
            currentRejectUser = name;
            currentRejectModalId = modalId;
            document.getElementById("rejectConfirmText_modir").textContent =
              `آیا می‌خواهید درخواست ${name} را رد کنید؟`;
            new bootstrap.Modal(document.getElementById("rejectModal_modir")).show();
          }
          function confirmReject_modir() {
            if (currentRejectCell) {
              // دسترسی به <tr> والد
              const row = currentRejectCell.closest('tr');
              if (!row) return;
          
              // تغییر وضعیت ستون ششم به "رد شده"
              const statusCell = row.querySelector('td:nth-child(5)');
              if (statusCell) {
                statusCell.className = 'blocked_ticket text-center';
                statusCell.textContent = 'رد شده';
              }
          
              // ساخت دکمه فقط با استفاده از آیدی مودال دقیق
              const actionsCell = row.querySelector('.actions_btn');
              if (actionsCell) {
                actionsCell.innerHTML = `
                  <a href="#" class="btn btn-info me-1 mb-0"
                     data-bs-toggle="modal" data-bs-target="#${currentRejectModalId}">
                     <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i>
                  </a>
                `;
              }
          
              // بستن مودال رد کردن
              bootstrap.Modal.getInstance(document.getElementById("rejectModal_modir")).hide();
            }
          }
          function confirmReject() {
            if (currentRejectCell) {
              const row = currentRejectCell.closest('tr');
              if (!row) return;
          
              // تغییر وضعیت ستون ششم
              const statusCell = row.querySelector('td:nth-child(5)');
              if (statusCell) {
                statusCell.className = 'blocked_ticket text-center';
                statusCell.textContent = 'رد شده';
              }
          
              // ساخت دکمه فقط با استفاده از آیدی مودال دقیق
              const actionsCell = row.querySelector('.actions_btn');
              if (actionsCell) {
                actionsCell.innerHTML = `
                  <a href="#" class="btn btn-info me-1 mb-0"
                     data-bs-toggle="modal" data-bs-target="#${currentRejectModalId}">
                     <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i>
                  </a>
                `;
              }
          
              // بستن مودال
              bootstrap.Modal.getInstance(document.getElementById("rejectModal")).hide();
            }
          }          
          function markAsRead(name, modalId, actionTd) {
            currentActionCell = actionTd;
            currentUserName = name;
            if (currentActionCell) {
              const row = currentActionCell.closest('tr');
              if (!row) return;
          
              // تغییر وضعیت ستون ششم به "خوانده شده"
              const statusCell = row.querySelector('td:nth-child(5)');
              if (statusCell) {
                statusCell.className = 'unansweard_ticket text-center';
                statusCell.textContent = 'خوانده شده';
              }
          
              // بازنویسی دکمه‌ها با modalId و name داینامیک
              const actionsCell = row.querySelector('.actions_btn');
              if (actionsCell) {
                actionsCell.innerHTML = `
                  <a href="#" class="btn btn-success me-1 mb-1 mb-lg-0"
                     onclick="openReplyModal('${name}','${modalId}', this.parentElement)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="پاسخ به تیکت">
                     <i class="fa-solid fa-reply"></i></a>
          
                  <a href="#" class="btn btn-danger me-1 mb-1 mb-lg-0"
                     onclick="openRejectModal('${name}','${modalId}', this.parentElement)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="رد کردن درخواست">
                     <i class="fa-solid fa-ban"></i></a>
          
                  <a href="#" class="btn btn-info me-1 mb-0"
                     onclick="markAsRead('${name}', '${modalId}', this.parentElement)"
                     data-bs-toggle="modal" data-bs-target="#${modalId}">
                     <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i></a>
          
                  <a href="#" class="btn btn-warning me-1 mb-0"
                     onclick="markAsUnread(this)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="علامت گذاری به عنوان خوانده نشده">
                     <i class="fa-solid fa-bookmark text-white"></i></a>
                `;
              }
            }
          }
          function markAsRead_modir(name, modalId, actionTd) {
            currentActionCell = actionTd;
            currentUserName = name;
            if (currentActionCell) {
              const row = currentActionCell.closest('tr');
              if (!row) return;
          
              // تغییر وضعیت ستون ششم به "خوانده شده"
              const statusCell = row.querySelector('td:nth-child(5)');
              if (statusCell) {
                statusCell.className = 'unansweard_ticket text-center';
                statusCell.textContent = 'خوانده شده';
              }
          
              // بازنویسی دکمه‌ها با modalId و name داینامیک
              const actionsCell = row.querySelector('.actions_btn');
              if (actionsCell) {
                actionsCell.innerHTML = `
                  <a href="#" class="btn btn-success me-1 mb-1 mb-lg-0"
                     onclick="openReplyModal('${name}','${modalId}', this.parentElement)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="پاسخ به تیکت">
                     <i class="fa-solid fa-reply"></i></a>
          
                  <a href="#" class="btn btn-danger me-1 mb-1 mb-lg-0"
                     onclick="openRejectModal('${name}','${modalId}', this.parentElement)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="رد کردن درخواست">
                     <i class="fa-solid fa-ban"></i></a>
          
                  <a href="#" class="btn btn-info me-1 mb-0"
                     onclick="markAsRead('${name}', '${modalId}', this.parentElement)"
                     data-bs-toggle="modal" data-bs-target="#${modalId}">
                     <i class="fa-solid fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="مشاهده کردن تیکت"></i></a>
          
                  <a href="#" class="btn btn-warning me-1 mb-0"
                     onclick="markAsUnread(this)"
                     data-bs-toggle="tooltip" data-bs-placement="top" title="علامت گذاری به عنوان خوانده نشده">
                     <i class="fa-solid fa-bookmark text-white"></i></a>
                `;
              }
            }
          }
          let rowToDelete = null;
            // وقتی روی دکمه حذف کلیک میشه
            document.querySelectorAll('.btn-delete-notification').forEach(btn => {
                btn.addEventListener('click', function (e) {
                e.preventDefault();
                rowToDelete = this.closest('tr'); // ذخیره سطر هدف
                const deleteModal = new bootstrap.Modal(document.getElementById('deleteNotificationConfirmModal'));
                deleteModal.show();
                });
            });

            // وقتی کاربر در مودال تأیید حذف رو میزنه
            document.getElementById('confirmDeleteNotificationBtn').addEventListener('click', function () {
                if (rowToDelete) {
                rowToDelete.remove();
                updateRowNumbers();
                rowToDelete = null;

                // بستن مودال
                bootstrap.Modal.getInstance(document.getElementById('deleteNotificationConfirmModal')).hide();
                }
            });

            // تابع به‌روزرسانی شماره ردیف‌ها
            function updateRowNumbers() {
                const rows = document.querySelectorAll('table tbody tr');
                rows.forEach((row, index) => {
                const numberCell = row.querySelector('td div');
                if (numberCell) {
                    numberCell.textContent = index-7;
                }
                });
            }
            function markAsUnread(button) {
              const row = button.closest('tr');
              const statusCell = row.querySelector('td[class*="ticket"]');
          
              if (statusCell) {
                // حذف کلاس خوانده شده و افزودن کلاس خوانده نشده
                statusCell.classList.remove('unansweard_ticket');
                statusCell.classList.add('unread_ticket');
                // تغییر متن وضعیت
                statusCell.textContent = 'خوانده نشده';
                button.style.display="none";
              }
            }

            