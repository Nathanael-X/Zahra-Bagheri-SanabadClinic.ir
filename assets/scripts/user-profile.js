document.addEventListener("DOMContentLoaded", () => {
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
 // انتخاب عناصر
 const deleteButton = document.querySelector(".uploadremove");
 const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
 const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

 const profileImage = document.getElementById("uploadfile-1-preview");
 const avatarImage = document.querySelector(".avatar-img"); // تصویر دوم در div.avatar

 // حذف عکس پروفایل
 deleteButton.addEventListener("click", function (e) {
 e.preventDefault();
 confirmModal.show();
 });

 confirmDeleteBtn.addEventListener("click", function () {
 const defaultImage = "assets/Images/sample-profile/sample-pic.jpeg";
 
 // تغییر هر دو تصویر
 profileImage.src = defaultImage;
 avatarImage.src = defaultImage;

 confirmModal.hide();
 deleteButton.style.display = "none";
 });

 // تغییر عکس پروفایل
 const fileInput = document.getElementById("uploadfile-1");

 fileInput.addEventListener("change", function () {
 const file = this.files[0];

 if (file && file.type.startsWith("image/")) {
     const reader = new FileReader();

     reader.onload = function (e) {
     profileImage.src = e.target.result;
     avatarImage.src = e.target.result; // آپدیت عکس دوم

     deleteButton.style.display = "block";
     };

     reader.readAsDataURL(file);
 } else {
     alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
 }
 });