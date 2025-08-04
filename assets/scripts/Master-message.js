document.addEventListener('DOMContentLoaded', function () {
  // ✅ فعال‌سازی Tooltipها به‌صورت استاندارد
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl, {
          container: 'body' // جلوگیری از بهم‌ریختگی داخل جدول یا مودال
      });
  });

  // ✅ کنترل فعال/غیرفعال شدن فیلد شماره موبایل
  const phoneCheckbox = document.querySelector('#sendMessageToAll');
  if (phoneCheckbox) {
      phoneCheckbox.addEventListener('change', function () {
          const input = document.getElementById('user_phoneNumber');
          const label = document.querySelector('.PhoneUser_lbl');
          if (this.checked) {
              input.disabled = true;
              label.classList.add('text-muted');
          } else {
              input.disabled = false;
              label.classList.remove('text-muted');
          }
      });
  }

  // ✅ تغییر متن بر اساس نوع پیام انتخاب‌شده
  const messageTypeSelect = document.getElementById('type-messege');
  if (messageTypeSelect) {
      messageTypeSelect.addEventListener('change', function () {
          const textarea = document.getElementById('how_meet');
          const messages = {
              "0": "مراجع گرامی، به پاس قدردانی شما از اعتماد به کلینیک شبانه روزی سناباد، تخفیف ویژه به شما تعلق گرفته است...",
              "1": "یادآوری نوبت کلینیک شبانه روزی سناباد: لطفاً به‌خاطر داشته باشید که نوبت شما در تاریخ ------ و ساعت ------ رزرو شده است...",
              "2": "مراجع کننده گرامی کلینیک شبانه روزی سناباد، نوبت شما به دلیل ..........  لغو شده است...",
              "3": "مراجع گرامی کلینیک شبانه روزی سناباد طوس، نوبت شما تمدید شد...",
              "4": "مراجع محترم کلینیک شبانه روزی سناباد، وجه پرداختی شما با موفقیت به حساب شما بازگشت داده شد...",
              "5": "با خدمات نوین و تخصصی ما در کلینیک شبانه روزی سناباد، زندگی سالم‌تری را تجربه کنید...",
              "6": "مراجع کننده گرامی ، از اعتماد و همراهی شما با کلینیک شبانه روزی سناباد طوس صمیمانه سپاسگزاریم...",
              "7": "فرارسیدن مناسبت ..... را تبریک عرض می‌کنیم..."
          };
          textarea.value = messages[this.value] || "";
      });
  }

  // ✅ حذف قالب پیام (Delegation)
  let templateToDelete = null;
  document.addEventListener('click', function (e) {
      if (e.target.closest('.delete-temp')) {
          e.preventDefault();
          templateToDelete = e.target.closest('.col-lg-6');
          new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
      }
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
      if (templateToDelete) {
          templateToDelete.remove();
          templateToDelete = null;
      }
      bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
  });

  // ✅ افزودن قالب جدید
  document.getElementById("submitTemplateBtn").addEventListener("click", function () {
      const title = document.getElementById("templateTitle").value.trim();
      const content = document.getElementById("templateContent").value.trim();
      const container = document.getElementById("templateContainer");

      if (!title || !content) {
          alert("لطفاً عنوان و متن پیام را وارد کنید.");
          return;
      }

      const newCol = document.createElement("div");
      newCol.className = "col-lg-6 bg-light py-2 px-4 d-flex align-items-center justify-content-between";
      newCol.innerHTML = `
          <div>
              <p class="fw-bold pt-2">${title}</p>
          </div>
          <div class="d-flex align-items-center gap-2">
              <a href="#" class="rounded-pill bg-dark text-white px-2 py-1 fs-5"><i class="bi bi-pencil-square"></i></a>
              <a href="#" class="rounded-pill bg-danger text-white px-2 py-1 fs-5 delete-temp"><i class="bi bi-trash"></i></a>
          </div>
      `;
      container.appendChild(newCol);

      document.getElementById("templateTitle").value = "";
      document.getElementById("templateContent").value = "";

      bootstrap.Modal.getInstance(document.getElementById("addTemplateModal")).hide();
  });

  // ✅ ویرایش قالب پیام (Delegation)
  let currentTemplateDiv = null;
  document.addEventListener("click", function (e) {
      if (e.target.closest(".bi-pencil-square")) {
          e.preventDefault();
          currentTemplateDiv = e.target.closest(".col-lg-6");

          document.getElementById("editTemplateTitle").value = currentTemplateDiv.querySelector("p").innerText;
          document.getElementById("editTemplateContent").value = currentTemplateDiv.querySelector("small")?.innerText || "";

          new bootstrap.Modal(document.getElementById("editTemplateModal")).show();
      }
  });

  document.getElementById("saveEditTemplate").addEventListener("click", function () {
      const newTitle = document.getElementById("editTemplateTitle").value.trim();
      const newContent = document.getElementById("editTemplateContent").value.trim();

      if (!newTitle) {
          alert("عنوان نمی‌تواند خالی باشد.");
          return;
      }

      currentTemplateDiv.querySelector("p").innerText = newTitle;

      let small = currentTemplateDiv.querySelector("small");
      if (small) {
          small.innerText = newContent;
      } else if (newContent) {
          const smallTag = document.createElement("small");
          smallTag.className = "text-muted";
          smallTag.innerText = newContent;
          currentTemplateDiv.querySelector("p").after(smallTag);
      }

      bootstrap.Modal.getInstance(document.getElementById("editTemplateModal")).hide();
  });
});
