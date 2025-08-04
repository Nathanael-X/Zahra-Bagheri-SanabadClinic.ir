document.addEventListener("DOMContentLoaded", function () {
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
    //درج مبلغ بر اساس دکمه انتخاب شده
    const amountButtons = document.querySelectorAll(".amount-btn");
    const amountInput = document.getElementById("chargeAmountInput");

    amountButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // حذف کلاس active از همه
        amountButtons.forEach((b) => b.classList.remove("active-money"));

        // اضافه کردن کلاس active به دکمه فعلی
        this.classList.add("active-money");

        // دریافت مقدار عددی از متن دکمه (حذف "ریال" و فاصله)
        const amountText = this.innerText.replace("ریال", "").trim();
        amountInput.value = amountText;
      });
        });

    //حذف کارت بانکی
    let cardToDelete = null; // نگهداری کارت انتخاب‌شده برای حذف
    // وقتی روی دکمه حذف کارت کلیک شد
    document.addEventListener('click', function (e) {
        if (e.target.matches('.delete-cardbank') && e.target.textContent.includes('حذف')) {
        e.preventDefault();

        // پیدا کردن کارت والد و ذخیره آن
        cardToDelete = e.target.closest('.bg-light.border');
        
        // نمایش مودال تأیید حذف
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteBankAcoount'));
        deleteModal.show();
        }
    });

    // وقتی کاربر در مودال روی "حذف حساب" کلیک می‌کنه
    document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
        if (cardToDelete) {
        cardToDelete.remove(); // حذف کارت از DOM
        cardToDelete = null;
        }

        // بستن مودال
        const modalElement = document.getElementById('deleteBankAcoount');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        document.getElementById("no-notifications").style.display="block";
    });


    document.getElementById("confirmCardBtn").addEventListener("click", function () {
        // بستن مودال
        var modal = bootstrap.Modal.getInstance(document.getElementById("finallAddCardModal"));
        modal.hide();
    
        // مخفی کردن پیغام "هیچ کارت بانکی ثبت نشده"
        var noNotif = document.getElementById("no-notifications");
        if (noNotif) {
          noNotif.style.display = "none";
        }
    
        // ساختن بلوک کارت جدید
        const cardContainer = document.querySelector(".card-body.bank-card");
        const newCardHTML = `
        <div class="bg-light border border-1 p-3 rounded-3 d-sm-flex justify-content-sm-between align-items-center mb-4">
          <div class="form-check d-flex align-items-center justify-content-start">
            <input class="form-check-input mb-0" type="radio" name="bank-number" id="bank-number1" checked>
            <div class="me-5 mt-2">
              <img src="assets/Images/home/sepah.png" style="width: 50px; height:50px;">
              <label class="form-check-label mb-0 h5 me-2" for="bank-number1">بانک سپه</label>
              <p class="mb-0 ms-4 mt-2">5058 - 0112 - **** - 3492</p>
            </div>
          </div>
          <div class="mt-md-0 mt-3">
            <button class="btn btn-danger mb-0 rounded me-1 delete-cardbank">حذف</button>
          </div>
        </div>`;
    
        cardContainer.insertAdjacentHTML("beforeend", newCardHTML);
      });
  });
function closeNotifCard(btn) {
    // کارت را مخفی کن
    const card = btn.closest('.card');
    if (card) {
      card.style.display = 'none';
      
    }

    // بررسی اینکه آیا کارت‌های قابل نمایش دیگری وجود دارند
    const notifContainer = document.querySelector('.div-undone-notif');
    const visibleCards = notifContainer.querySelectorAll('.card');

    const anyVisible = Array.from(visibleCards).some(c => c.style.display !== 'none');

    if (!anyVisible) {
      notifContainer.style.display = 'none';
    }
  }
  function showRefundToast() {
    const send_recModal = document.getElementById('refundModal');
    const send_rec = bootstrap.Modal.getInstance(send_recModal);
    send_rec.hide();
    // والد toast که کلاس d-none داره
    const toastWrapper = document.getElementById('refundToast').parentElement;
    // نمایش wrapper
    toastWrapper.classList.remove('d-none');
    toastWrapper.classList.add('d-block');
    toastWrapper.classList.add('showToast');  
    var toastEl = document.getElementById('refundToast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
  }