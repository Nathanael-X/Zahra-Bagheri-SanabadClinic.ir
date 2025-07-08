document.addEventListener('DOMContentLoaded', function () {
    var swiper1 = new Swiper(".mySwiper1", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 1,
        reverseDirection: true,
        disableOnInteraction: false,
      },
      speed: 2000,
      grabCursor: true,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 30,
    });
    // ستون وسط - حرکت به پایین
    var swiper2 = new Swiper(".mySwiper2", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: 2000,
      grabCursor: true,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 30,
    });
    
    // ستون سوم - حرکت به بالا
    var swiper3 = new Swiper(".mySwiper3", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 1,
        reverseDirection: true,
        disableOnInteraction: false,
      },
      speed: 2000,
      grabCursor: true,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 30,
    });
});
