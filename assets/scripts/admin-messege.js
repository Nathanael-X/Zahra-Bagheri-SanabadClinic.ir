document.getElementById('type-messege').addEventListener('change', function () {
    const textarea = document.getElementById('how_meet');
    const selectedValue = this.value;
  
    const messages = {
      "0": "مراجع گرامی، به پاس قدردانی شما از اعتماد به کلینیک شبانه روزی سناباد، تخفیف ویژه به شما تعلق گرفته است. شما می توانید با استفاده از کد ----- از 20 درصد تخفیف در مراجعه ی بعدی بهره مند شوید. سلامتی شما در زندگی، اولویت نخست ما است. - کلینیک شبانه روزی سناباد طوس",
      "1": "یادآوری نوبت کلینیک شبانه روزی سناباد: لطفاً به‌خاطر داشته باشید که نوبت شما در تاریخ ------ و ساعت ------ رزرو شده است. حتراماً به اطلاع می‌رسد در صورت عدم حضور به‌موقع در کلینیک شبانه‌روزی سناباد، نوبت شما لغو شده تلقی شده و وجه پرداختی قابل بازگشت نخواهد بود.",
      "2": "مراجع کننده گرامی کلینیک شبانه روزی سناباد، نوبت شما به دلیل ..........  لغو شده است. لطفاً جهت هماهنگی با ما تماس بگیرید.",
      "3": "مراجع گرامی کلینیک شبانه روزی سناباد طوس، نوبت شما تمدید شد. جهت مشاهده جزئیات و زمان دقیق با پشتیبانی تماس حاصل فرمایید.",
      "4": "مراجع محترم کلینیک شبانه روزی سناباد، وجه پرداختی شما با موفقیت به حساب شما بازگشت داده شد. از همراهی شما سپاسگزاریم.",
      "5": "با خدمات نوین و تخصصی ما در کلینیک شبانه روزی سناباد، زندگی سالم‌تری را تجربه کنید. دریافت نوبت از طریق لینک زیر: sanabad.org.ac.ir",
      "6": "مراجع کننده گرامی ، از اعتماد و همراهی شما با کلینیک شبانه روزی سناباد طوس صمیمانه سپاسگزاریم. امیدواریم همیشه سلامت و موفق باشید.",
      "7": "فرارسیدن مناسبت ..... را تبریک عرض می‌کنیم. با آرزوی تندرستی و شادی برای شما. کلینیک شبانه روزی سناباد طوس"
    };
  
    textarea.value = messages[selectedValue] || "";
  });

  let templateToDelete = null; // نگهداری قالبی که باید حذف شود
    // اضافه کردن listener به تمام دکمه‌های حذف
    document.querySelectorAll('.bi-trash').forEach(trashIcon => {
        trashIcon.addEventListener('click', function (e) {
        e.preventDefault();

        // پیدا کردن نزدیک‌ترین عنصر .col-lg-6
        const container = this.closest('.col-lg-6');
        templateToDelete = container;

        // نمایش مودال
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        deleteModal.show();
        });
    });
    // وقتی کاربر روی دکمه "بله" کلیک کرد، قالب حذف شود
    document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
        if (templateToDelete) {
        templateToDelete.remove();
        templateToDelete = null;
        }

        // بستن مودال به صورت دستی
        const deleteModalEl = document.getElementById('deleteConfirmModal');
        const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
        deleteModal.hide();
    });
    document.getElementById("submitTemplateBtn").addEventListener("click", function () {
        const title = document.getElementById("templateTitle").value.trim();
        const content = document.getElementById("templateContent").value.trim();
        const container = document.getElementById("templateContainer");
    
        if (title === "" || content === "") {
          alert("لطفاً عنوان و متن پیام را وارد کنید.");
          return;
        }
    
        // ساختن div قالب جدید
        const newCol = document.createElement("div");
        newCol.className = "col-lg-6 bg-light py-2 px-4 d-flex align-items-center justify-content-between";
        newCol.innerHTML = `
            <p class="fw-bold pt-2">${title}</p>
            <div class="d-flex align-items-center gap-2">
            <a href="#" class="rounded-pill bg-dark text-white p-2 fs-4"><i class="bi bi-pencil-square"></i></a>
            <a href="#" class="rounded-pill bg-danger text-white p-2 fs-4"><i class="bi bi-trash"></i></a>
            </div>
        `;
    
        container.appendChild(newCol);
    
        // پاک‌سازی فیلدها
        document.getElementById("templateTitle").value = "";
        document.getElementById("templateContent").value = "";
    
        // بستن مودال
        const modal = bootstrap.Modal.getInstance(document.getElementById("addTemplateModal"));
        modal.hide();
      });

        let currentTemplateDiv = null; // برای نگهداری عنصر انتخاب‌شده
        document.addEventListener("click", function (e) {
            if (e.target.closest(".bi-pencil-square")) {
            e.preventDefault();

            currentTemplateDiv = e.target.closest(".col-lg-6"); // گرفتن کل قالب

            const title = currentTemplateDiv.querySelector("p").innerText;
            const content = currentTemplateDiv.querySelector("small")?.innerText || "";

            // مقداردهی به فیلدهای مودال
            document.getElementById("editTemplateTitle").value = title;
            document.getElementById("editTemplateContent").value = content;

            // نمایش مودال
            const modal = new bootstrap.Modal(document.getElementById("editTemplateModal"));
            modal.show();
            }
        });

        document.getElementById("saveEditTemplate").addEventListener("click", function () {
            const newTitle = document.getElementById("editTemplateTitle").value.trim();
            const newContent = document.getElementById("editTemplateContent").value.trim();

            if (newTitle === "") {
            alert("عنوان نمی‌تواند خالی باشد.");
            return;
            }

            // به‌روزرسانی DOM
            currentTemplateDiv.querySelector("p").innerText = newTitle;

            // اگر <small> وجود دارد ویرایشش کن، اگر نه اضافه کن
            let small = currentTemplateDiv.querySelector("small");
            if (small) {
            small.innerText = newContent;
            } else if (newContent !== "") {
            const smallTag = document.createElement("small");
            smallTag.className = "text-muted";
            smallTag.innerText = newContent;
            currentTemplateDiv.querySelector("p").after(smallTag);
            }

            // بستن مودال
            bootstrap.Modal.getInstance(document.getElementById("editTemplateModal")).hide();
        });