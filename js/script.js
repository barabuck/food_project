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

    tabsparent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item') ) {
            tabs.forEach((item,i) => {
                if (event.target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });        
        }
    });
    //-----------------------------------------------------------------------------------
    //timer
    const deadline = '2021-03-11 14:00';
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
    // установка нуля для таймера если единичное число
    function setZero(num) {
        if (num >= 0 && Math.trunc(num / 10) >= 1) {
            return num;
        } else {
            num = '0' + num;
            return num;
        } 
    }

    function setTextEndPromotion(endtime) {
        const textend = document.querySelector('#text-end-promotion');
        const timeend = new Date(endtime);
        let month = timeend.getMonth();
        const day = timeend.getDate();
        const hour = timeend.getHours();
        const minute = timeend.getMinutes();
        const arrMohts = [
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
        month = arrMohts[month];
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

    





});
