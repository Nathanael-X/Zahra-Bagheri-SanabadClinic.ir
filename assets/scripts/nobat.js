const calendar = document.getElementById('calendar');
const calendarTitle = document.getElementById('calendarTitle');

const today = new Date();
const jToday = jalaali.toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());

let currentYear = jToday.jy;
let currentMonth = jToday.jm;

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];

// ✳️ تعطیلات رسمی (با فرمت yyyy/mm/dd)
const holidays = [
  '1404/01/01',
  '1404/01/02',
  '1404/01/03',
  '1404/01/04',
  '1404/01/08',
  '1404/01/11',
  '1404/01/12',
  '1404/01/13',
  '1404/01/15',
  '1404/01/22',
  '1404/01/29',
  '1404/02/04',
  '1404/02/05',
  '1404/02/12',
  '1404/02/19',
  '1404/02/26',
  '1404/03/02',
  '1404/03/09',
  '1404/03/14',
  '1404/03/15',
  '1404/03/16',
  '1404/03/23',
  '1404/03/24',
  '1404/03/30',
  '1404/04/06',
  '1404/04/13',
  '1404/04/14',
  '1404/04/15',
  '1404/04/20',
  '1404/04/27',
  '1404/05/03',
  '1404/05/10',
  '1404/05/17',
  '1404/05/23',
  '1404/05/24',
  '1404/05/31',
  '1404/06/02',
  '1404/06/07',
  '1404/06/10',
  '1404/06/14',
  '1404/06/19',
  '1404/06/21',
  '1404/06/28',
  '1404/07/04',
  '1404/07/11',
  '1404/07/18',
  '1404/07/25',
  '1404/08/02',
  '1404/08/09',
  '1404/08/16',
  '1404/08/23',
  '1404/08/30',
  '1404/09/03',
  '1404/09/07',
  '1404/09/14',
  '1404/09/21',
  '1404/09/28',
  '1404/10/05',
  '1404/10/12',
  '1404/10/13',
  '1404/10/19',
  '1404/10/26',
  '1404/10/27',
  '1404/11/03',
  '1404/11/10',
  '1404/11/15',
  '1404/11/17',
  '1404/11/22',
  '1404/11/24',
  '1404/12/01',
  '1404/12/08',
  '1404/12/15',
  '1404/12/20',
  '1404/12/22',
  '1404/12/29',

];

function renderWeekdays() {
  const weekdaysContainer = document.getElementById('weekdays');
  weekdaysContainer.innerHTML = ''; // پاک کردن قبل از رندر جدید

  const fullNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const width = window.innerWidth;
  const isShort = (width < 576 || (width < 1200 && width > 991));

  fullNames.forEach(name => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day weekday-title';
    dayDiv.innerText = isShort ? name[0] : name;
    weekdaysContainer.appendChild(dayDiv);
  });
}

function renderCalendar(year, month) {
  calendar.innerHTML = '';
  calendarTitle.innerText = `${monthNames[month - 1]} ${year}`;

  const firstDayGregorian = jalaali.toGregorian(year, month, 1);
  const firstDayDate = new Date(firstDayGregorian.gy, firstDayGregorian.gm - 1, firstDayGregorian.gd);
  const startWeekday = (firstDayDate.getDay() + 1) % 7;

  const jalaliMonthLength = jalaali.jalaaliMonthLength(year, month);
  let days = [];

  for (let i = 0; i < startWeekday; i++) {
    days.push('');
  }

  for (let day = 1; day <= jalaliMonthLength; day++) {
    days.push(day);
  }

  for (let i = 0; i < days.length; i += 7) {
    const weekRow = document.createElement('div');
    weekRow.className = 'calendar-week';

    for (let j = 0; j < 7; j++) {
      const day = days[i + j];
      const col = document.createElement('div');
      col.className = 'calendar-day';

      if (day) {
        const isToday =
          day === jToday.jd &&
          year === jToday.jy &&
          month === jToday.jm;

        if (isToday) col.classList.add('today');

        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        const formattedDate = `${year}/${paddedMonth}/${paddedDay}`;

        if (holidays.includes(formattedDate)) {
          col.classList.add('holiday');
        }

        col.innerText = day;
        col.dataset.date = formattedDate;

        col.addEventListener('click', () => {
             // حذف کلاس selected_day از همه روزها
            const allDays = document.querySelectorAll('.calendar-day');
            allDays.forEach(dayEl => dayEl.classList.remove('selected_day'));

            // اضافه کردن کلاس به روز کلیک‌شده
            col.classList.add('selected_day');
            document.getElementById('add-nobat-title').innerHTML=`${day} ${monthNames[month - 1]} ${year}`;
          document.getElementById('do-calender').innerText =
            `لیست نوبت های روز ${day} ${monthNames[month - 1]} ${year}`;
            const pad = num => String(num).padStart(2, '0');
            const selectedDate = `${year}/${pad(month)}/${pad(day)}`;
            document.getElementById('for_ordibehesht8').style.display = 'none';
            document.getElementById('for_ordibehesht13').style.display = 'none';
            document.getElementById('for_ordibehesht20').style.display = 'none';
            document.getElementById('empty_table').style.display = 'none';
            if (selectedDate === '1404/02/08') {
                document.getElementById('for_ordibehesht8').style.display = 'table';
            } else if (selectedDate === '1404/02/13')
            {
                document.getElementById('for_ordibehesht13').style.display = 'table';
            }
            else if (selectedDate === '1404/02/20')
            {
                document.getElementById('for_ordibehesht20').style.display = 'table';
            }
            else
            {
              document.getElementById('empty_table').style.display = 'table';
            }
        });
      } else {
        col.classList.add('bg-light');
      }

      weekRow.appendChild(col);
    }

    calendar.appendChild(weekRow);
  }
}

// رویدادها برای دکمه‌های قبلی و بعدی ماه
document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

// رندر اولیه
renderWeekdays();
renderCalendar(currentYear, currentMonth);

// واکنش به تغییر اندازه صفحه
window.addEventListener('resize', () => {
  renderWeekdays();
});
