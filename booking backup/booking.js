//برای مراحل
document.addEventListener('DOMContentLoaded', function() {
    //کدهای مربوط به ذخیره ی اطلاعات جدید کاربر در مرحله 3
    const saveBtn = document.getElementById("saveNewInfoBtn");
    const usernameold = document.getElementById("self-userName");
    const usernamenew = document.getElementById("personNewName");
    const phoneeold = document.getElementById("self-phoneNumber");
    const phonenew = document.getElementById("personNewPhone");

    saveBtn.addEventListener("click", () => {
        usernameold.textContent = usernamenew.value; // مقدار جدید رو جای قبلی
        phoneeold.textContent = phonenew.value;
        const modal = bootstrap.Modal.getInstance(document.getElementById('editPersonModal'));
        if (modal) {
            modal.hide();
        }

    });
    //کدهای مربوط به تایمر ثبت نوبت کاربر
    let remainingTime = 20 * 60;
    const timerText = document.getElementById("timer-text");
    const timerText2 = document.getElementById("timer-text2");
    const timerText3 = document.getElementById("timer-text3");
    const timerText4 = document.getElementById("timer-text4");
    const timerText5 = document.getElementById("timer-text5");
    const timerText6 = document.getElementById("timer-text6");
    const timerText7 = document.getElementById("timer-text7");
    const timerText8 = document.getElementById("timer-text8");
    const timerText9 = document.getElementById("timer-text9");
    const timerText10 = document.getElementById("timer-text10");
    const timerText11 = document.getElementById("timer-text11");
    const timerText12 = document.getElementById("timer-text12");
    const timerText13 = document.getElementById("timer-text13");
    const timerText14 = document.getElementById("timer-text14");
    const timerText15 = document.getElementById("timer-text15");
    const timeoutModalElement = document.getElementById('timeoutModal');
    const timeoutModal = new bootstrap.Modal(timeoutModalElement);
    let countdown = null;
    // انتخاب دکمه‌های مراحل
    const trigger1 = document.getElementById('steppertrigger1');
    const trigger2 = document.getElementById('steppertrigger2');
    const trigger3 = document.getElementById('steppertrigger3');
    const trigger4 = document.getElementById('steppertrigger4');
    const trigger5 = document.getElementById('steppertrigger5');
    //علل های مراجعه به پزشک در مرحله 3
    const abDarmani_reason=document.getElementById('reason-for-Abdarmani');
    const fiziotrapy_reason=document.getElementById('reason-for-Fiziotrapy');
    const skinhair_reason=document.getElementById('reason-for-SkinHair');
    const mama_reason=document.getElementById('reason-for-mama');
    const ravanshenas_reason=document.getElementById('reason-for-Ravanshenas');
    const taghzie_reason=document.getElementById('reason-for-Taghzie');
    const omumi_reason=document.getElementById('reason-for-omumi');
    //کارت های پزشکان در مرحله 3
    const Akram_Rahimi_card3=document.getElementById('Akram_Rahimi_infoForm');
    const Mohammad_PurAli_card3=document.getElementById('Mohammad_PurAli_infoForm');
    const Asie_Panjeshahin_card3=document.getElementById('Asie_Panjeshahin_infoForm');
    const Hossein_Fozuni_card3=document.getElementById('Hossein_Fozuni_infoForm');
    const Firuze_Khalil_card3=document.getElementById('Firuze_Khalil_infoForm');
    const Fateme_FarokhAbadi_card3=document.getElementById('Fateme_FarokhAbadi_infoForm');
    const Mehrak_Dabaghi_card3=document.getElementById('Mehrak_Dabaghi_infoForm');
    const Farahnaz_Kafshi_card3=document.getElementById('Farahnaz_Kafshi_infoForm');
    //checkout پزشکان در مرحله 5
    const Akram_Rahimi_checkout=document.getElementById('checkout_Akram_Rahimi');
    const Mohammad_PurAli_checkout=document.getElementById('checkout_Mohammad_PurAli');
    const Asie_Panjeshahin_checkout=document.getElementById('checkout_Asie_shahin');
    const Hossein_Fozuni_checkout=document.getElementById('checkout_Hossein_Fozuni');
    const Firuze_Khalil_checkout=document.getElementById('checkout_Firuze_Khalili');
    const Fateme_FarokhAbadi_checkout=document.getElementById('checkout_Fateme_FarokhAbadi');
    const Mehrak_Dabaghi_checkout=document.getElementById('checkout_Mehrak_Dabaghi');
    const Farahnaz_Kafshi_checkout=document.getElementById('checkout_Farahnaz_kafshi');
    //نمایش کارت های پزشکان در مرحله ی سوم بر اساس دکمه انتخاب شده توسط کاربر
    let selectedDoctor = null;
    const doctorButtons = document.querySelectorAll('.btn_doctor_style');
    doctorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // برداشتن کلاس انتخاب از بقیه
            doctorButtons.forEach(btn => btn.classList.remove('selected-doctor'));
    
            // اضافه کردن کلاس به دکمه انتخاب‌شده
            this.classList.add('selected-doctor');
    
            // ذخیره کردن ID دکتر انتخاب‌شده
            selectedDoctor = this.id;
        });
    });
    // انتخاب پنل‌های مراحل
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');
    
    // دکمه‌های پیمایش بین مراحل
    const nextStep1 = document.getElementById('next-step1');
    const prevStep2 = document.getElementById('prev-step2');
    const nextStep2 = document.getElementById('next-step2');
    const prevStep3 = document.getElementById('prev-step3');
    const nextStep3 = document.getElementById('next-step3');
    const prevStep4 = document.getElementById('prev-step4');
    const nextStep4 = document.getElementById('next-step4');
    const prevStep5 = document.getElementById('prev-step5');
    //تاریخ
    const dateSlidesContainer = document.getElementById('date-slides');
    const timeSlotsContainer = document.getElementById('time-slots');
    const today = new Date();
    const timeSlotsData = {
        '1404-02-12': ['08:00', '09:30', '10:00'],
        '1404-02-14': ['08:00', '09:30', '10:00','17:30','18:00','20:00'],
    };        
    const daysOfWeek = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه','شنبه'];
    const monthNames = ["", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    const nobarKhali=[0,3,0,6,8,5,5,10,6,8]
    // نمایش مرحله اول به صورت پیش‌فرض
    showStep(step1);
    setActiveStep(trigger1);
    
    
    // دکمه‌های پیمایش بین مراحل
    if (nextStep1) {
        nextStep1.addEventListener('click', function() {
             // بررسی انتخاب سرویس
            const selectedService = document.querySelector('input[name="medical-services"]:checked');

            // هشدار بده
            if (!selectedService) 
            {
                const warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
                warningModal.show();
                return;
            }

            // div
            const taghzieForm = document.getElementById("Taghzie_dr");
            const RavanshenasForm = document.getElementById("Ravanshenas_dr");
            const omumiForm = document.getElementById("Omumi_dr");
            const Skin_HairForm=document.getElementById("skinHair_dr");
            const mama_dr=document.getElementById("Zanan_dr");
            //برای مرحله 3
            Asie_Panjeshahin_card3.style.display="none";
            taghzie_reason.style.display="none";
            Hossein_Fozuni_card3.style.display="none";
            taghzie_reason.style.display="none";
            Farahnaz_Kafshi_card3.style.display="none";
            omumi_reason.style.display="none";
            Mohammad_PurAli_card3.style.display="none";
            omumi_reason.style.display="none";
            Fateme_FarokhAbadi_card3.style.display="none";
            ravanshenas_reason.style.display="none";
            Firuze_Khalil_card3.style.display="none";
            ravanshenas_reason.style.display="none";
            Mehrak_Dabaghi_card3.style.display="none";
            skinhair_reason.style.display="none";
            Akram_Rahimi_card3.style.display="none";
            mama_reason.style.display="none";
            fiziotrapy_reason.style.display="none";
            abDarmani_reason.style.display="none";
            // نمایش فرم مناسب
            if (selectedService.id === "medical_services4") {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
                document.getElementById('steppertrigger2_number').style.backgroundColor = "";
                document.getElementById('steppertrigger2').disabled = false;
                document.getElementById('steppertrigger2_title').style.color = "";
                //other
                omumiForm.style.display = "none";
                RavanshenasForm.style.display="none";
                Skin_HairForm.style.display="none";
                mama_dr.style.display="none";
                //main
                taghzieForm.style.display = "flex";
            } 
            else if(selectedService.id === "medical_services2")
            {
                hideAllSteps();
                showStep(step3);
                setActiveStep(trigger3);
                //main
                fiziotrapy_reason.style.display="block";
                document.getElementById('steppertrigger2_number').style.backgroundColor="dimgray";
                document.getElementById('steppertrigger2').disabled="true";
                document.getElementById('steppertrigger2_title').style.color="dimgray";
            }
            else if (selectedService.id === "medical_services3") {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
                document.getElementById('steppertrigger2_number').style.backgroundColor = "";
                document.getElementById('steppertrigger2').disabled = false;
                document.getElementById('steppertrigger2_title').style.color = "";
                //other
                taghzieForm.style.display="none";
                RavanshenasForm.style.display="none";
                Skin_HairForm.style.display="none";
                mama_dr.style.display="none";
                //main
                omumiForm.style.display = "flex";
            }
            else if (selectedService.id === "medical_services5")
            {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
                document.getElementById('steppertrigger2_number').style.backgroundColor = "";
                document.getElementById('steppertrigger2').disabled = false;
                document.getElementById('steppertrigger2_title').style.color = "";
                //other
                omumiForm.style.display = "none";
                taghzieForm.style.display="none";
                Skin_HairForm.style.display="none";
                mama_dr.style.display="none";
                //main
                RavanshenasForm.style.display="flex";
            }
            else if(selectedService.id === "medical_services7")
            {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
                document.getElementById('steppertrigger2_number').style.backgroundColor = "";
                document.getElementById('steppertrigger2').disabled = false;
                document.getElementById('steppertrigger2_title').style.color = "";
                //other
                omumiForm.style.display = "none";
                taghzieForm.style.display="none";
                RavanshenasForm.style.display="none";
                mama_dr.style.display="none";
                //main
                Skin_HairForm.style.display="flex";
            }
            else if(selectedService.id === "medical_services6")
            {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
                document.getElementById('steppertrigger2_number').style.backgroundColor = "";
                document.getElementById('steppertrigger2').disabled = false;
                document.getElementById('steppertrigger2_title').style.color = "";
                //other
                omumiForm.style.display = "none";
                taghzieForm.style.display="none";
                RavanshenasForm.style.display="none";
                Skin_HairForm.style.display="none";
                //main
                mama_dr.style.display="flex";
            }
            else if(selectedService.id === "medical_services1")
            {
                hideAllSteps();
                showStep(step3);
                setActiveStep(trigger3);
                //main
                abDarmani_reason.style.display="block";
                document.getElementById('steppertrigger2_number').style.backgroundColor="dimgray";
                document.getElementById('steppertrigger2').disabled="true";
                document.getElementById('steppertrigger2_title').style.color="dimgray";
            }
        });
    }
    
    if (prevStep2) {
        prevStep2.addEventListener('click', function() {
            hideAllSteps();
            showStep(step1);
            setActiveStep(trigger1);
        });
    }
    
    if (nextStep2) {
        nextStep2.addEventListener('click', function() {
            // هشدار بده
            if (!selectedDoctor) 
            {
                const warningModal2 = new bootstrap.Modal(document.getElementById('warningModal2'));
                warningModal2.show();
                return;
            }
            Asie_Panjeshahin_card3.style.display="none";
            taghzie_reason.style.display="none";
            Hossein_Fozuni_card3.style.display="none";
            taghzie_reason.style.display="none";
            Farahnaz_Kafshi_card3.style.display="none";
            omumi_reason.style.display="none";
            Mohammad_PurAli_card3.style.display="none";
            omumi_reason.style.display="none";
            Fateme_FarokhAbadi_card3.style.display="none";
            ravanshenas_reason.style.display="none";
            Firuze_Khalil_card3.style.display="none";
            ravanshenas_reason.style.display="none";
            Mehrak_Dabaghi_card3.style.display="none";
            skinhair_reason.style.display="none";
            Akram_Rahimi_card3.style.display="none";
            mama_reason.style.display="none";
            fiziotrapy_reason.style.display="none";
            abDarmani_reason.style.display="none";
        
            // حالا بر اساس selectedDoctor عملیات انجام بده
            if (selectedDoctor === "Akram_Rahimi") {
                Akram_Rahimi_card3.style.display="flex";
                mama_reason.style.display="block";
            }
            else if (selectedDoctor === "asie-shahin")
            {
                Asie_Panjeshahin_card3.style.display="flex";
                taghzie_reason.style.display="block";
            }
            else if (selectedDoctor === "hosein-fozuni")
            {
                Hossein_Fozuni_card3.style.display="flex";
                taghzie_reason.style.display="block";
            }
            else if (selectedDoctor === "Farahnaz-Kafshi")
            {
                Farahnaz_Kafshi_card3.style.display="flex";
                omumi_reason.style.display="block";
            }
            else if (selectedDoctor === "Mohmmad_PurAli")
            {
                Mohammad_PurAli_card3.style.display="flex";
                omumi_reason.style.display="block";
            }
            else if (selectedDoctor === "Fateme_FarokhAbadi")
            {
                Fateme_FarokhAbadi_card3.style.display="flex";
                ravanshenas_reason.style.display="block";
            }
            else if (selectedDoctor === "Firuze-Yazdi")
            {
                Firuze_Khalil_card3.style.display="flex";
                ravanshenas_reason.style.display="block";
            }
            else if (selectedDoctor === "Mehrak_Dabaghi")
            {
                Mehrak_Dabaghi_card3.style.display="flex";
                skinhair_reason.style.display="block";
            }
            hideAllSteps();
            showStep(step3);
            setActiveStep(trigger3);
        });
    }
    
    if (prevStep3) {
        prevStep3.addEventListener('click', function() {
             // بررسی انتخاب سرویس
            const selectedService = document.querySelector('input[name="medical-services"]:checked');
            if(selectedService.id === "medical_services1" || selectedService.id === "medical_services2")
            {
                hideAllSteps();
                showStep(step1);
                setActiveStep(trigger1);
            }
            else
            {
                hideAllSteps();
                showStep(step2);
                setActiveStep(trigger2);
            }
        });
    }
    
    if (nextStep3) {
        nextStep3.addEventListener('click', function() {
        const selectedRadio_pationt = document.querySelector('input[name="person_pationt"]:checked');
        
        // بررسی انتخاب علت مراجعه
        if (!selectedRadio_pationt)
        {
            // نمایش هشدار با مودال (یا alert یا toast - هرچی که استفاده می‌کنی)
            const warningModal = new bootstrap.Modal(document.getElementById('warningModal3'));
            warningModal.show();
            return;
        }
            hideAllSteps();
            showStep(step4);
            setActiveStep(trigger4);
        });
    }
    
    if (prevStep4) {
        prevStep4.addEventListener('click', function() {
            hideAllSteps();
            showStep(step3);
            setActiveStep(trigger3);
        });
    }

    if (nextStep4) {
        nextStep4.addEventListener('click', function() {
            const selectedDate = document.querySelector('.date-card.selected');
            const selectedTime = document.querySelector('.time-slot.selected');

            if (!selectedDate || !selectedTime) {
                const warningModal = new bootstrap.Modal(document.getElementById('warningModal4'));
                warningModal.show();
                return;
            }
            Farahnaz_Kafshi_checkout.style.display="none";
            Mehrak_Dabaghi_checkout.style.display="none";
            Fateme_FarokhAbadi_checkout.style.display="none";
            Firuze_Khalil_checkout.style.display="none";
            Hossein_Fozuni_checkout.style.display="none";
            Asie_Panjeshahin_checkout.style.display="none";
            Mohammad_PurAli_checkout.style.display="none";
            Akram_Rahimi_checkout.style.display="none";
            if(Akram_Rahimi_card3.style.display=="flex")
            {
                Akram_Rahimi_checkout.style.display="flex";
            }
            else if(Asie_Panjeshahin_card3.style.display=="flex")
            {
                Asie_Panjeshahin_checkout.style.display="flex";
            }
            else if(Hossein_Fozuni_card3.style.display=="flex")
            {
                Hossein_Fozuni_checkout.style.display="flex";
            }
            else if(Farahnaz_Kafshi_card3.style.display=="flex")
            {
                Farahnaz_Kafshi_checkout.style.display="flex";
            }
            else if(Mohammad_PurAli_card3.style.display=="flex")
            {
                Mohammad_PurAli_checkout.style.display="flex";
            }
            else if(Fateme_FarokhAbadi_card3.style.display=="flex")
            {
                Fateme_FarokhAbadi_checkout.style.display="flex";
            }
            else if(Firuze_Khalil_card3.style.display=="flex")
            {
                Firuze_Khalil_checkout.style.display="flex";
            }
            else if(Mehrak_Dabaghi_card3.style.display=="flex")
            {
                Mehrak_Dabaghi_checkout.style.display="flex";
            }
            hideAllSteps();
            showStep(step5);
            setActiveStep(trigger5);
        });
    }
    if (prevStep5) {
        prevStep5.addEventListener('click', function() {
            hideAllSteps();
            showStep(step4);
            setActiveStep(trigger4);
        });
    }
    // تابع نمایش مرحله
    function showStep(step) {
        step.classList.add('active', 'show');
    }
    
    // تابع مخفی کردن همه مراحل
    function hideAllSteps() {
        const steps = document.querySelectorAll('.bs-stepper-pane');
        steps.forEach(step => {
            step.classList.remove('active', 'show');
        });
    }
    
    // تابع تنظیم مرحله فعال
    function setActiveStep(trigger) {
        // حذف کلاس active از همه مراحل
        const stepItems = document.querySelectorAll('.step');
        stepItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // افزودن کلاس active به مرحله فعلی
        trigger.closest('.step').classList.add('active');
    }
    //فرم ثبت نوبت برای شخص دیگر
    document.getElementById("addPersonForm").addEventListener("submit", function(e) {
        e.preventDefault();
    
        const name = document.getElementById("personName").value.trim();
        const phone = document.getElementById("personPhone").value.trim();
    
        if (!name || !phone) return;
    
        addPerson(name, phone);
    
        // پاک‌سازی فرم و بستن مودال
        this.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPersonModal'));
        modal.hide();
      });
    function addPerson(name, phone) {
        const uniqueId = `person-${Date.now()}`;
        const personHTML = `
          <div class="form-check person-option mb-2 px-0">
            <label class="form-check-label d-flex justify-content-between align-items-center" for="${uniqueId}">
              <p>
                ${name}<br>
                <small class="text-muted lh-lg">${phone}</small>
              </p>
              <p class="d-flex flex-column gap-3 align-items-center justify-content-center div-checkbox">
                <input class="form-check-input" type="radio" name="person_pationt" id="${uniqueId}">
                <a href="#" class="text-primary">✎ ویرایش</a>
              </p>
            </label>
          </div>
        `;
        const personList = document.getElementById("person-list");
        personList.insertAdjacentHTML("beforeend", personHTML);
      }
    //تابع مربوط به تایمر ثبت نوبت توسط کاربر
        function startTimer() 
        {
            clearInterval(countdown); 
            remainingTime = 20 * 60;

            countdown = setInterval(() => {
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerText.textContent = `${minutes}:${seconds}`;
            timerText2.textContent = `${minutes}:${seconds}`;
            timerText3.textContent = `${minutes}:${seconds}`;
            timerText4.textContent = `${minutes}:${seconds}`;
            timerText5.textContent = `${minutes}:${seconds}`;
            timerText6.textContent = `${minutes}:${seconds}`;
            timerText7.textContent = `${minutes}:${seconds}`;
            timerText8.textContent = `${minutes}:${seconds}`;
            timerText9.textContent = `${minutes}:${seconds}`;
            timerText10.textContent = `${minutes}:${seconds}`;
            timerText11.textContent = `${minutes}:${seconds}`;
            timerText12.textContent = `${minutes}:${seconds}`;
            timerText13.textContent = `${minutes}:${seconds}`;
            timerText14.textContent = `${minutes}:${seconds}`;
            timerText15.textContent = `${minutes}:${seconds}`;

            if (remainingTime <= 0) {
                clearInterval(countdown);
                timerText.textContent = "00:00";
                timerText2.textContent = "00:00";
                timerText3.textContent = "00:00";
                timerText4.textContent = "00:00";
                timerText5.textContent = "00:00";
                timerText5.textContent = "00:00";
                timerText6.textContent = "00:00";
                timerText7.textContent = "00:00";
                timerText8.textContent = "00:00";
                timerText9.textContent = "00:00";
                timerText10.textContent = "00:00";
                timerText11.textContent = "00:00";
                timerText12.textContent = "00:00";
                timerText13.textContent = "00:00";
                timerText14.textContent = "00:00";
                timerText15.textContent = "00:00";
                timeoutModal.show();
            }

            remainingTime--;
            }, 1000);
        }
        // دکمه‌ی "بازگشت به سیستم نوبت دهی" بعد از اتمام زمان
        document.getElementById("resetBtn").addEventListener("click", () => {
            hideAllSteps(); // فرض می‌کنم این تابعو داری
            showStep(document.getElementById("step-1"));
            setActiveStep(document.getElementById("steppertrigger1"));
            startTimer();
        });
        // اجرای اولیه تایمر
        startTimer();
        //برای تاریخ
        function generateDateCards(count) {
            for (let i = 0; i < count; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const weekday = daysOfWeek[currentDate.getDay()];
            const jdate = window.jalaali.toJalaali(currentDate);
            const fullDateStr = `${jdate.jd} ${monthNames[jdate.jm]} ${jdate.jy}`;
            const availableSlots = nobarKhali[i];

            const card = document.createElement('div');
            card.className = 'swiper-slide';
            card.innerHTML = `
                <div class="date-card">
                <div class="fw-bold">${weekday}</div>
                <div class="text-muted my-1">${fullDateStr}</div>
                <div class="blue-light">${availableSlots} وقت خالی</div>
                </div>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
                card.querySelector('.date-card').classList.add('selected');
                showTimeSlots(jdate); // نمای ساعت‌ها
            });
            
            const showTimeSlots = (jdate) => {
                timeSlotsContainer.innerHTML = '';
              
                // ساختن کلید تاریخ به فرمت "yyyy-mm-dd"
                const dateKey = `${jdate.jy}-${String(jdate.jm).padStart(2, '0')}-${String(jdate.jd).padStart(2, '0')}`;
              
                const times = timeSlotsData[dateKey] || []; // اگر زمان نداشت، خالی باشه
              
                if (times.length === 0) {
                  timeSlotsContainer.innerHTML = '<div class="text-muted">در این روز وقتی برای ویزیت موجود نیست</div>';
                  return;
                }
              
                times.forEach(time => {
                  const slot = document.createElement('div');
                  slot.className = 'time-slot d-flex align-items-center gap-2';
                  slot.innerHTML = `<i class="fa-regular fa-clock"></i> <span>${time}</span>`;
                  slot.onclick = () => {
                    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                  };
                  timeSlotsContainer.appendChild(slot);
                });
              };
              

            dateSlidesContainer.appendChild(card);
            }
        }

        generateDateCards(10); // 10 روز

        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 4,
            spaceBetween: 10,
            navigation: {
            nextEl: ".fa-chevron-right",
            prevEl: ".fa-chevron-left",
            },
            breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 4 }
            }
        });
        
});
//کد های مرحله یک
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.medical-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        // حذف حالت انتخاب از همه کارت‌ها
        cards.forEach(c => c.classList.remove('selected'));

        // اضافه کردن کلاس انتخاب به کارت کلیک‌شده
        card.classList.add('selected');

        // فعال کردن input داخل آن کارت
        const input = card.querySelector('input[type="radio"]');
        if (input) input.checked = true;
      });
    });
  });


