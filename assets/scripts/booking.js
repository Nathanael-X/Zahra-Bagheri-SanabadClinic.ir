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
    //checkout پزشکان در مرحله 5
    const Abdarmani_checkout=document.getElementById('checkout_Ab_darmani');
    const fizioTrapy_checkout=document.getElementById('checkout_fizioTrapy');
    // انتخاب پنل‌های مراحل
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');
    //کد های مربوط به انتخاب جنسیت
    const male_myself=document.getElementById('male');
    const male_other=document.getElementById('male_forOther');
    const female_myself=document.getElementById('femail_zahra');
    const female_other=document.getElementById('female_forOther');
    // دکمه‌های پیمایش بین مراحل
    const nextStep1 = document.getElementById('next-step1');
    const prevStep2 = document.getElementById('prev-step2');
    const nextStep2 = document.getElementById('next-step2');
    const prevStep3 = document.getElementById('prev-step3');
    const nextStep3 = document.getElementById('next-step3');
    const prevStep4 = document.getElementById('prev-step4');
    const nextStep4 = document.getElementById('next-step4');
    const prevStep5 = document.getElementById('prev-step5'); 
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
            fiziotrapy_reason.style.display="none";
            abDarmani_reason.style.display="none";
            // نمایش فرم مناسب
            if(selectedService.id === "medical_services2")
            {
            
                hideAllSteps();
                showStep(step3);
                setActiveStep(trigger3);
                //main
                fiziotrapy_reason.style.display="block";
                document.getElementById('package-selector').style.display="none";
                flag_abdarmani=false;
                flag_fizio=true;
                document.getElementById('steppertrigger2_number').style.backgroundColor="dimgray";
                document.getElementById('steppertrigger2').disabled="true";
                document.getElementById('steppertrigger2_title').style.color="dimgray";
                var mosalh_bime = new bootstrap.Modal(document.getElementById('mosalah_bime'));
                mosalh_bime.show();
            }
            else if(selectedService.id === "medical_services1")
            {
                hideAllSteps();
                showStep(step3);
                setActiveStep(trigger3);
                //main
                abDarmani_reason.style.display="block";
                document.getElementById('package-selector').style.display="flex";
                flag_abdarmani=true;
                flag_fizio=false;
                document.getElementById('steppertrigger2_number').style.backgroundColor="dimgray";
                document.getElementById('steppertrigger2').disabled="true";
                document.getElementById('steppertrigger2_title').style.color="dimgray";
            }
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
            var mosalh_bime = new bootstrap.Modal(document.getElementById('mosalah_bime'));
              mosalh_bime.show();
            showStep(step3);
            setActiveStep(trigger3);
        });
    }

    if (nextStep4) {
        nextStep4.addEventListener('click', function() {
            const pack_radio1=document.getElementById('package_1');
            const pack_radio2=document.getElementById('package_2');
            const pack_radio3=document.getElementById('package_3');
            const st_day_abdarmani=document.getElementById('start_day_abdarmani');
            const selectedDate = document.querySelector('.date-card.selected');
            const selectedTime = document.querySelector('.time-slot.selected');
            // بررسی پر بودن تاریخ شروع
            const day = document.getElementById('day').value;
            const month = document.getElementById('month').value;
            if ((document.getElementById('non-of-packeges').style.display!="none")&&(!selectedDate || !selectedTime)) {
                const warningModal = new bootstrap.Modal(document.getElementById('warningModal4'));
                warningModal.show();
                return;
            }
            else if((document.getElementById('non-of-packeges').style.display=="none")&&(day===""||month===""))
            {
                const warningModal = new bootstrap.Modal(document.getElementById('warningModal42'));
                warningModal.show();
                return;
            }
            if(abDarmani_reason.style.display=="block")
            {
                fizioTrapy_checkout.style.display="none";
                Abdarmani_checkout.style.display="flex";
            }
            else if(fiziotrapy_reason.style.display=="block")
            {
                Abdarmani_checkout.style.display="none";
                fizioTrapy_checkout.style.display="flex";
            }
            const whos_this=document.getElementById('who_is_this');
            const whos_this_fizio=document.getElementById('who_is_this_fizio');
            if (document.getElementById('femail_zahra').checked)
            {
                whos_this.innerHTML='زهرا باقری حسن کیاده';
                whos_this_fizio.innerHTML='زهرا باقری حسن کیاده';
            }
            else if((document.getElementById('person-1').checked))
            {
                whos_this.innerHTML=document.getElementById('person-2').innerHTML;
                whos_this_fizio.innerHTML=document.getElementById('person-2').innerHTML;
            }
            else if((document.getElementById('person-2').checked))
            {
                whos_this.innerHTML=document.getElementById('person-3').innerHTML;
                whos_this_fizio.innerHTML=document.getElementById('person-3').innerHTML;
            }
            if(pack_radio1.checked)
            {
                document.getElementById('how_many_dayes').innerHTML='10 روز';
                document.getElementById('pure_price').innerHTML='4,900,000 تومان';
                document.getElementById('finall_price').innerHTML='4,921,945 تومان';
                document.getElementById('abdarmani_service').innerHTML='آب درمانی (پکیج 10 درصد تخفیف)'
            }
            else if(pack_radio2.checked)
            {
                document.getElementById('how_many_dayes').innerHTML='15 روز';
                document.getElementById('pure_price').innerHTML='7,000,000 تومان';
                document.getElementById('finall_price').innerHTML='7,021,945 تومان';
                document.getElementById('abdarmani_service').innerHTML='آب درمانی (پکیج 13.5 درصد تخفیف)'
            }
            else if(pack_radio3.checked)
            {
                document.getElementById('how_many_dayes').innerHTML='20 روز';
                document.getElementById('pure_price').innerHTML='9,000,000 تومان';
                document.getElementById('finall_price').innerHTML='9,021,945 تومان';
                document.getElementById('abdarmani_service').innerHTML='آب درمانی (پکیج 16.5 درصد تخفیف)'
            }

            if (document.getElementById('non-of-packeges').style.display=="none")
            {
                st_day_abdarmani.innerHTML="1404/"+month+"/"+day;
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
        index=0;
        const uniqueId = `person-${index+1}`;
        const uniqueId_name = `person-${index+2}`;
        const personHTML = `
          <div class="form-check person-option mb-2 px-0">
            <label class="form-check-label d-flex justify-content-between align-items-center" for="${uniqueId}">
              <p>
                <span id="${uniqueId_name}">${name}<br></span>
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

            if (remainingTime <= 0) {
                clearInterval(countdown);
                timerText.textContent = "00:00";
                timerText2.textContent = "00:00";
                timeoutModal.show();
            }

            remainingTime--;
            }, 1000);
        }
        // دکمه‌ی "بازگشت به سیستم نوبت دهی" بعد از اتمام زمان
        document.getElementById("resetBtn").addEventListener("click", () => {
            hideAllSteps();
            showStep(document.getElementById("step-1"));
            setActiveStep(document.getElementById("steppertrigger1"));
            startTimer();
        });
        // اجرای اولیه تایمر
        startTimer();
        //برای تاریخ
        let timeSlotsData = {}; // متغیر عمومی
        const dateSlidesContainer = document.getElementById('date-slides');
        const timeSlotsContainer = document.getElementById('time-slots');
        const how_many_days=document.getElementById('how_many_dayes');
        const purePrice_for_abdarmani=document.getElementById('pure_price');
        const finallPrice_for_abdarmani=document.getElementById('finall_price');
        const purePrice_for_fizio=document.getElementById('pure_price_fizio');
        const finallPrice_for_fizio=document.getElementById('finall_price_fizio');
        const how_many_days_forFizio=document.getElementById('how_many_dayes_forFizio');
        const what_gender=document.getElementById('what_gender');
        const what_gender_fizio=document.getElementById('what_gender_fizio');
        const today = new Date();
        function setTimeSlotsBasedOnGender() {
            if (male_myself.checked || male_other.checked)
            {
                timeSlotsData= {
                    '1404-04-17': {
                    '17:00': 20,
                    '18:30': 15,
                    },
                    '1404-04-18': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-19': {
                      '15:00': 20,
                    },
                    '1404-04-20': {
                      
                    },
                    '1404-04-21': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-22': {
                    '15:00': 20,
                    },
                    '1404-04-23': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-24': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-25': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-26': {
                      '15:00': 20,
                    },
                    '1404-04-27': {
                    },
                    '1404-04-28': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-29': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-30': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-04-31': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-01': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-02': {
                    '15:00': 20,
                    },
                    '1404-06-03': {
                        
                    },
                    '1404-05-04': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-05': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-06': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-07': {
                        '17:00': 20,
                        '18:30': 20,
                    },
                    '1404-05-09': {
                    '15:00': 20,
                    },
                    '1404-05-10': {
                    
                    },
                    '1404-05-11': {
                      '17:00': 20,
                      '18:30': 20,
                  },
                  '1404-05-12': {
                    '17:00': 20,
                    '18:30': 20,
                },
        
                };
                what_gender.innerHTML='آقا';
                what_gender_fizio.innerHTML='آقا';
            }
            else if (female_myself.checked || female_other.checked)
            {
                timeSlotsData = {
                    '1404-04-17': {
                    '08:30': 20,
                    '10:00': 15,
                    '11:30': 9,
                    '15:00': 1,
                    },
                    '1404-04-18': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 17,
                    '15:00': 18,
                    },
                    '1404-04-19': {
                      '13:00': 20,
                    },
                    '1404-04-20': {
                    
                    },
                    '1404-04-21': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-04-22': {
                    '13:00': 20,
                    },
                    '1404-04-23': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-04-24': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 17,
                    '15:00': 18,
                    },
                    '1404-04-25': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-04-26': {
                      '13:00': 20,
                    },
                    '1404-04-27': {
                    
                    },
                    '1404-04-28': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-04-29': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 17,
                    '15:00': 18,
                    },
                    '1404-04-30': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-04-31': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-05-01': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-05-02': {
                    '13:00': 20,
                    },
                    '1404-05-03': {
                    },
                    '1404-05-04': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 17,
                    '15:00': 18,
                    },
                    '1404-05-05': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-05-06': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-05-07': {
                    '08:30': 20,
                    '10:00': 20,
                    '11:30': 20,
                    '15:00': 20,
                    },
                    '1404-05-08': {
                    '13:00': 20,
                    },
                    '1404-05-25': {
                    
                    },
                    '1404-05-09': {
                      '08:30': 20,
                      '10:00': 20,
                      '11:30': 20,
                      '15:00': 20,
                      },
                      '1404-05-10': {
                        '08:30': 20,
                        '10:00': 20,
                        '11:30': 20,
                        '15:00': 20,
                        },
        
                };
                what_gender.innerHTML='خانم';
                what_gender_fizio.innerHTML='خانم';
            }
            generateDateCards(10); // فقط وقتی جنسیت انتخاب شد
        }
        // گوش دادن به تغییر جنسیت:
        male_myself.addEventListener('change', setTimeSlotsBasedOnGender);
        male_other.addEventListener('change', setTimeSlotsBasedOnGender);
        female_myself.addEventListener('change', setTimeSlotsBasedOnGender);
        female_other.addEventListener('change', setTimeSlotsBasedOnGender);
        const daysOfWeek = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه','شنبه'];
        const monthNames = ["", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
        
        let selectedDates = [];
        const dateWrapper = document.getElementById("date-slides");
        
        function generateDateCards(count) {
          for (let i = 0; i < 90; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const weekday = daysOfWeek[currentDate.getDay()];
            const jdate = window.jalaali.toJalaali(currentDate);
            const fullDateStr = `${jdate.jd} ${monthNames[jdate.jm]} ${jdate.jy}`;
            const dateKey = `${jdate.jy}-${String(jdate.jm).padStart(2, '0')}-${String(jdate.jd).padStart(2, '0')}`;
        
            const availableSlots = Object.values(timeSlotsData[dateKey] || {}).filter(val => val > 0).length;
        
            const card = document.createElement('div');
            card.className = 'swiper-slide';
            card.innerHTML = `
              <div class="date-card">
                <div class="fw-bold">${weekday}</div>
                <div class="text-muted my-1">${fullDateStr}</div>
              </div>
            `;
        
            const cardElement = card.querySelector('.date-card');
            cardElement.addEventListener('click', () => {
              if (cardElement.classList.contains('selected')) {
                // حذف تاریخ انتخاب‌شده
                cardElement.classList.remove('selected');
                selectedDates = selectedDates.filter(d => d !== dateKey);
                timeSlotsContainer.innerHTML = '';
                return;
              }
              if (selectedDates.length >= 10) {
                const warningModal = new bootstrap.Modal(document.getElementById('warningModal5'));
                warningModal.show();
                return;
              }
              else
              {
                how_many_days.innerHTML=selectedDates.length+1 +' روز ';
                how_many_days_forFizio.innerHTML=selectedDates.length+1 +' روز ';
              }
              if (selectedDates.length==0)
              {
                document.getElementById('start_day_abdarmani').innerHTML=fullDateStr;
                document.getElementById('start_day_fizio').innerHTML=fullDateStr;
                purePrice_for_fizio.innerHTML="340,000 تومان";
                purePrice_for_abdarmani.innerHTML= "450,000 تومان";
                finallPrice_for_abdarmani.innerHTML="471,945 تومان";
                finallPrice_for_fizio.innerHTML="361,945 تومان"
              }
              else if (selectedDates.length==1)
              {
                purePrice_for_abdarmani.innerHTML= "900,000 تومان";
                finallPrice_for_abdarmani.innerHTML="921,945 تومان";
                purePrice_for_fizio.innerHTML="680,000 تومان";
                finallPrice_for_fizio.innerHTML="701,945 تومان"
              }
              else if (selectedDates.length==2)
              {
                purePrice_for_abdarmani.innerHTML= "1,350,000 تومان";
                finallPrice_for_abdarmani.innerHTML="1,371,945 تومان";
                purePrice_for_fizio.innerHTML="1,020,000 تومان";
                finallPrice_for_fizio.innerHTML="1,041,945 تومان"
              }
              else if (selectedDates.length==3)
              {
                purePrice_for_abdarmani.innerHTML= "1,800,000 تومان";
                finallPrice_for_abdarmani.innerHTML="1,821,945 تومان";
                purePrice_for_fizio.innerHTML="1,360,000 تومان";
                finallPrice_for_fizio.innerHTML="1,381,945 تومان"
              }
              else if (selectedDates.length==4)
              {
                purePrice_for_abdarmani.innerHTML= "2,250,000 تومان";
                finallPrice_for_abdarmani.innerHTML="2,271,945 تومان";
                purePrice_for_fizio.innerHTML="1,700,000 تومان";
                finallPrice_for_fizio.innerHTML="1,721,945 تومان"
              }
              else if (selectedDates.length==5)
              {
                purePrice_for_abdarmani.innerHTML= "2,700,000 تومان";
                finallPrice_for_abdarmani.innerHTML="2,721,945 تومان";
                purePrice_for_fizio.innerHTML="2,040,000 تومان";
                finallPrice_for_fizio.innerHTML="2,061,945 تومان"
              }
              else if (selectedDates.length==6)
              {
                purePrice_for_abdarmani.innerHTML= "3,150,000 تومان";
                finallPrice_for_abdarmani.innerHTML="3,171,945 تومان";
                purePrice_for_fizio.innerHTML="2,380,000 تومان";
                finallPrice_for_fizio.innerHTML="2,401,945 تومان"
              }
              else if (selectedDates.length==7)
              {
                purePrice_for_abdarmani.innerHTML= "3,600,000 تومان";
                finallPrice_for_abdarmani.innerHTML="3,621,945 تومان";
                purePrice_for_fizio.innerHTML="2,720,000 تومان";
                finallPrice_for_fizio.innerHTML="2,741,945 تومان"
              }
              else if (selectedDates.length==8)
              {
                purePrice_for_abdarmani.innerHTML= "4,050,000 تومان";
                finallPrice_for_abdarmani.innerHTML="4,071,945 تومان";
                purePrice_for_fizio.innerHTML="3,060,000 تومان";
                finallPrice_for_fizio.innerHTML="3,081,945 تومان"
              }
              else if (selectedDates.length==9)
              {
                purePrice_for_abdarmani.innerHTML= "4,500,000 تومان";
                finallPrice_for_abdarmani.innerHTML="4,521,945 تومان";
                purePrice_for_fizio.innerHTML="3,400,000 تومان";
                finallPrice_for_fizio.innerHTML="3,421,945 تومان"
              }
              showTimeSlots(jdate, (selectedTime) => {
                // اگر ساعتی انتخاب شد:
                selectedDates.push(dateKey);
                cardElement.classList.add('selected');
              });
            });
        
            dateSlidesContainer.appendChild(card);
          }
        }
        
        function showTimeSlots(jdate, onTimeSelected) {
          timeSlotsContainer.innerHTML = '';
          const dateKey = `${jdate.jy}-${String(jdate.jm).padStart(2, '0')}-${String(jdate.jd).padStart(2, '0')}`;
          const times = timeSlotsData[dateKey] || {};
        
          const availableTimes = Object.entries(times).filter(([time, count]) => count > 0);
        
          if (availableTimes.length === 0) {
            timeSlotsContainer.innerHTML = '<div class="text-muted">در این روز وقتی برای ویزیت موجود نیست</div>';
            return;
          }
        
          availableTimes.forEach(([time, count]) => {
            const slot = document.createElement('div');
            slot.className = 'time-slot d-flex flex-column align-items-center gap-1';
            slot.innerHTML = `
              <div><i class="fa-regular fa-clock"></i> <span>${time}</span></div>
              <div class="text-muted" style="font-size: 0.8rem;">${count} جای خالی</div>
            `;
            slot.onclick = () => {
              document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
              slot.classList.add('selected');
              onTimeSelected(time); // فراخوانی برای ثبت تاریخ
            };
            timeSlotsContainer.appendChild(slot);
          });
        }
        
        generateDateCards(10);
        
        // اسلایدر Swiper
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
        //دکمه رادیویی پکیج های دارای تخفیف
        const radios = document.querySelectorAll('input[name="package"]');
        let selectedImg = null;
        const form = document.getElementById("start-date-form");
        const modal = new bootstrap.Modal(document.getElementById('rulesModal'));
    
        radios.forEach(radio => {
            radio.addEventListener('change', function () {
                // ریست همه‌ی تصاویر
                document.querySelectorAll('.radio-image img').forEach(img => {
                    let originalSrc = img.getAttribute('src').replace('-selected', '');
                    img.setAttribute('src', originalSrc);
                });
    
                // عکس انتخابی رو تغییر بده
                selectedImg = this.nextElementSibling;
                let src = selectedImg.getAttribute('src').replace('-selected', '');
                let newSrc = src.replace(/(\.png|\.jpg|\.jpeg|\.webp)$/i, '-selected$1');
                selectedImg.setAttribute('src', newSrc);
    
                // نمایش مودال
                modal.show();
            });
        });
    
        // وقتی کاربر روی "فهمیدم" کلیک کرد
        document.getElementById("understandBtn").addEventListener("click", function () {
            form.style.display = "block";
            document.getElementById('non-of-packeges').style.display="none";
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


