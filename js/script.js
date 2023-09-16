window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");
    

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            })
        }
    })
    //timer

    const deadline = '2023-09-17';

    function getTimeRemining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()),
              msInSec = 1000,
              msInMin = 60*msInSec,
              msInHour = 60*msInMin,
              msInDay = 24*msInHour;

              if (t > 0) {
                days = Math.floor(t/msInDay),
                hours = Math.floor(t/msInHour%24),
                minutes = Math.floor(t/msInMin%60),
                seconds = Math.floor(t/msInSec%60);
              } else {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
              }
              //   days = Math.floor(t/msInDay),
              //   hours = Math.floor((t-(msInDay*days))/msInHour),
              //   minutes = Math.floor((t-(msInDay*days)-(hours*msInHour))/msInMin),
              //   seconds = Math.floor((t - (msInDay*days) - (msInHour* hours) - (msInMin*minutes))/msInSec);
              

              return {
                "total": t,
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
              };
    }

    function getZero(num) {
        if (num >=0 && num < 10) 
            return `0${num}`;
        else 
            return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds");
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <=0)
                clearInterval(timeInterval);
        }
    }

    setClock(".timer", deadline);
})

// const timerId = setTimeout( function () {
//     console.log("Hello");
// }, 2000);

// const timerId = setTimeout( function (text) {
//     console.log(text);
// }, 4000, 'Hllo');

// const timerId = setTimeout(logger, 3000);

// function logger() {
//     console.log('text');
// }

const now = new Date();

console.log(now);