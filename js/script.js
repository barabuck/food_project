'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //----------------------------------------------------------------------
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabscontent = document.querySelectorAll('.tabcontent'),
          tabsparent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabscontent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (num = 0) {
        tabscontent[num].classList.remove('hide');
        tabscontent[num].classList.add('show' ,'fade');
        tabs[num].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsparent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item') ) {
            tabs.forEach((item,i) => {
                if (e.target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });        
        }
    });
    //-----------------------------------------------------------------------------------
    //timer
    const deadline = '2021-03-12 18:00';
    const timeBlock = '.timer';

    // опредление оставшегося времени
    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / (1000)) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds' :seconds
        } ;
    }
    
    function setTimer (selector, endtime) {
        const timer = document.querySelector(selector);
        const day = timer.querySelector('#days');
        const hour = timer.querySelector('#hours');
        const minute = timer.querySelector('#minutes');
        const second = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();
        // обновление таймера каждую секунду
        function updateClock () {
            const t = getTimeRemaining(deadline);
            day.textContent = setZero(t.days);
            hour.textContent = setZero(t.hours);
            minute.textContent = setZero(t.minutes);
            second.textContent = setZero(t.seconds);
            if (t.total <=0){
                clearInterval(timeInterval);
                const  promotion = document.querySelector('div.promotion');
                promotion.classList.add('hide');
            }
        }
    }
    // установка нуля для однозначного числа
    function setZero(num) {
        if (num >= 0 && Math.trunc(num / 10) >= 1) {
            return num;
        } else {
            num = '0' + num;
            return num;
        } 
    }

    // установка текстовой даты конца акции
    function setTextEndPromotion(endtime) {
        const textend = document.querySelector('#text-end-promotion');
        const timeend = new Date(endtime);
        let month = timeend.getMonth();
        const day = timeend.getDate();
        const hour = timeend.getHours();
        const minute = timeend.getMinutes();
        const arrMonths = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ]; 
        month = arrMonths[month];
        textend.textContent = `Акция закончится ${day} ${month} в ${setZero(hour)}:${setZero(minute)}`;
    }

    setTextEndPromotion(deadline);
    setTimer(timeBlock, deadline);
    //-----------------------------------------------------------------------------------
    // карусель картинок
    const slidecounter = document.querySelector('.offer__slider-counter');
    const btnLeft = slidecounter.querySelector('.offer__slider-prev');
    const btnRight = slidecounter.querySelector('.offer__slider-next');
    const numImage = slidecounter.querySelector('#current');
    const totalImage = slidecounter.querySelector('#total');
    const slidewrapper = document.querySelector('.offer__slider-wrapper');
    const slideImage = slidewrapper.querySelectorAll('.offer__slide');

    hideSlideImage();
    showSlideImage();

    totalImage.textContent = setZero(slideImage.length);

    // скрытие всех картинок
    function hideSlideImage () {
        slideImage.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }
    
    // показ нужной картинки
    function showSlideImage (num = 0) {
        slideImage[num].classList.add('show');
        slideImage[num].classList.remove('hide');
        numImage.textContent = setZero(num + 1);
    }
    
    // нажатие стрелочки влево
    btnLeft.addEventListener('click', () => {
        let currentNumImage = +(slidecounter.querySelector('#current')).textContent;
        const totalNumImage = +setZero(slideImage.length);
        if (currentNumImage == 1) {
            currentNumImage = totalNumImage;
        } else {
            currentNumImage--;
        }
        hideSlideImage();
        showSlideImage(currentNumImage-1);
    });

    // нажатие стрелочки вправо
    btnRight.addEventListener('click', () => {
        let currentNumImage = +(slidecounter.querySelector('#current')).textContent;
        const totalNumImage = +setZero(slideImage.length);
        if (currentNumImage == totalNumImage) {
            currentNumImage = 1;
        } else {
            currentNumImage++;
        }
        hideSlideImage();
        showSlideImage(currentNumImage-1);
    });

    // автоматическая карусель
    const autoSlide = setInterval(() => {
        let currentNumImage = +(slidecounter.querySelector('#current')).textContent;
        const totalNumImage = +setZero(slideImage.length);
        if (currentNumImage == totalNumImage) {
            currentNumImage = 1;
        } else {
            currentNumImage++;
        }
        hideSlideImage();
        showSlideImage(currentNumImage-1);
    }, 8000);
    //-----------------------------------------------------------------------------------
    // модально окно связи
    const openModal = document.querySelectorAll('[data-modal-open]');
    const modalWindow = document.querySelector('div.modal');
    const closeModal =document.querySelector('[data-model-close]');

    // вызов модального окна
    function openModalWindow () {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(autoOpenModal);
    }
    openModal.forEach(item => {
        item.addEventListener('click', openModalWindow);});

    //закрытие модального окна
    function closeModalWindow () {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
    }
    closeModal.addEventListener('click', closeModalWindow);

    // закрытие кликом вне окна
    modalWindow.addEventListener('click', (e) => {
        if (e.target.classList == 'modal') {
            closeModalWindow();
        }
    });

    // закрытие кнопкой esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.style.display != 'none') {
            closeModalWindow();
        }
    });

    // открытие модального окна автоматически через 20 секунд
    const autoOpenModal = setTimeout(openModalWindow, 20000);

    // открытие моадльного окна при пролистывании до конца
    let i = 0;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight && i == 0){
            i++;
            openModalWindow();
        }
    });
    //-----------------------------------------------------------------------------------
    // меню
    class MenuItem {
        constructor (imageUrl, subtitle, menuinfo, price, container) {
            this.imageUrl = imageUrl;
            this.subtitle = subtitle;
            this.menuinfo = menuinfo;
            this.price = price;
            this.container = document.querySelector(container);
        }

        createMenuItem () {
            //создание элементов
            const divMenuItem = document.createElement('div');
            const imgMenuItem = document.createElement('img');
            const h3MenuSubtitle = document.createElement('h3');
            const divMenuInfo = document.createElement('div');
            const divMenuDivider = document.createElement('div');
            const divMenuPrice = document.createElement('div');
            const divMenuCost = document.createElement('div');
            const divMenuTotal = document.createElement('div');
            const spanMenuTotal = document.createElement('span');
            
            //добавление классов 
            divMenuItem.classList.add('menu__item');
            h3MenuSubtitle.classList.add('menu__item-subtitle');
            divMenuInfo.classList.add('menu__item-descr');
            divMenuDivider.classList.add('menu__item-divider');
            divMenuPrice.classList.add('menu__item-price');
            divMenuCost.classList.add('menu__item-cost');
            divMenuTotal.classList.add('menu__item-total');
            
            //вложение элемнтов
            divMenuItem.append(imgMenuItem);
            divMenuItem.append(h3MenuSubtitle);
            divMenuItem.append(divMenuInfo);
            divMenuItem.append(divMenuDivider);
            divMenuItem.append(divMenuPrice);
            divMenuPrice.append(divMenuCost);
            divMenuPrice.append(divMenuTotal);
            
            
            // наполнение меню
            imgMenuItem.src = this.imageUrl;
            h3MenuSubtitle.textContent = this.subtitle;
            divMenuInfo.textContent = this.menuinfo;
            divMenuCost.textContent = 'Цена';
            divMenuTotal.textContent = ' руб/день';
            spanMenuTotal.textContent = this.price;
            divMenuTotal.prepend(spanMenuTotal);
            
            //вставка в нужное место
            this.container.append(divMenuItem);
        }
    }
    // путь влажения меню
    const menuField = document.querySelector('div.menu__field');
    const menuContainer = menuField.querySelector('div.container');
    // создание самих меню
    const menuVegy = new MenuItem('img/tabs/vegy.jpg',
                                    'Меню "Фитнес"',
                                    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                                    '229',
                                    '.menu .container').createMenuItem();

    const menuElite = new MenuItem('img/tabs/elite.jpg',
                                    'Меню “Премиум”',
                                    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                                    '540',
                                    '.menu .container').createMenuItem();

    const menuPost = new MenuItem('img/tabs/post.jpg',
                                    'Меню "Постное"',
                                    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                                    '480',
                                    '.menu .container').createMenuItem();

    
    //-----------------------------------------------------------------------------------

});
