if (window.innerWidth > 768) {
   //کارت های شیشه ای بیمه ها
    document.addEventListener("DOMContentLoaded", function () {
      const scroller = document.querySelector(".scroller-container");
      const track = document.querySelector(".scroller-track");

      // وقتی به انتها رسید، برش گردون به اول
      scroller.addEventListener("scroll", () => {
        const maxScroll = track.scrollWidth / 4;
        if (scroller.scrollLeft >= maxScroll) {
          scroller.scrollLeft -= maxScroll;
        }
      });
    });
  }
document.addEventListener('shown.bs.modal', function () {
    document.body.style.paddingRight = '0';
  });
//سکشن چهارم فلیپ کارت
function flipCard(card) 
{
    if (window.innerWidth < 768) 
    { // فقط برای موبایل
      card.classList.toggle('flipped');
    }
}

  