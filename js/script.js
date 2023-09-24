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

    //modal
    const modal = document.querySelector(".modal"),
          buttnsModal = document.querySelectorAll("[data-modal]"),
          modalClose = modal.querySelector("[data-close]");
              
    function showModal() {
        modal.classList.remove('hide')
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }
 
    function hideModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    buttnsModal.forEach(item => {
        item.addEventListener('click', showModal);
    })

    modalClose.addEventListener('click', hideModal); 

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    })

    document.addEventListener('keydown', (e)=> {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            hideModal();
        }
    })

    //const modalTimerId = setTimeout(showModal, 5000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //используем классы для табов
    
    class MenuCard {
        constructor(src, altText, title, description, price, parentSelector) {
            this.src = src;
            this.altText = altText;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.altText}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`;
            this.parent.appendChild(element);
        }
    }

    new MenuCard('/img/tabs/vegy.jpg', 'veganMenu', 'Меню "Фитнес"', 
                 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
                 9, '.menu .container').render();
    new MenuCard('/img/tabs/elite.jpg', 'eliteMenu', 'Меню “Премиум”', 
                 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                 21, '.menu .container') .render();
    new MenuCard('/img/tabs/post.jpg', 'postMenu', 'Меню "Постное"', 
                 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
                 16, '.menu .container').render();
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
