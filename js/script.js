'use strict';

// const { Console } = require("node:console");

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
    const slider =document.querySelector('.offer__slider');
    const slidecounter = document.querySelector('.offer__slider-counter');
    const btnLeft = slidecounter.querySelector('.offer__slider-prev');
    const btnRight = slidecounter.querySelector('.offer__slider-next');
    const numImage = slidecounter.querySelector('#current');
    const totalImage = slidecounter.querySelector('#total');
    const slidewrapper = document.querySelector('.offer__slider-wrapper');
    const slideImage = slidewrapper.querySelectorAll('.offer__slide');
    const slideInner = slidewrapper.querySelector('.offer__slider-inner');
    const widthWrapper = window.getComputedStyle(slidewrapper).width;
    let slideIndex = 1;
    let offset = 0;

    totalImage.textContent = setZero(slideImage.length);
    numImage.textContent = setZero(slideIndex);

    slideInner.style.width = 100 * slideImage.length + '%';
    slideInner.style.display = 'flex';
    slideInner.style.transition = '0.5s all';

    slidewrapper.style.overflow = 'hidden';

    slideImage.forEach(slide => {
        slide.style.width = widthWrapper;
    });

    // отображение выбраннго изображения на слайдере
    slider.style.position = 'relative';
    const divMoveDots = document.createElement('div');
    divMoveDots.classList.add('carousel-indicators');
    slider.append(divMoveDots);

    slideImage.forEach(() => {
        const moveDot = document.createElement('div');
        moveDot.classList.add('dot');
        divMoveDots.append(moveDot);
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, num) => {
        dotOfImage(dot, num);
    });
    dots[slideIndex-1].style.opacity = '1';

    // изменение слайда нажатием на dot
    function dotOfImage(dot, num) {
        dot.addEventListener('click', () => {
            dots.forEach((item) => {
                item.style.opacity = '0.5';
            });
            offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (num);
            dots[num].style.opacity = '1';
            slideIndex = num + 1;
            numImage.textContent = setZero(slideIndex);
            slideInner.style.transform = `translateX(-${offset}px)`;
        });
    }

    // перемещение вправо или влево
    function moveSlide(param) {
        dots.forEach((item) => {
            item.style.opacity = '0.5';
        });
        if (param == 'right') {
            if (offset == +widthWrapper.slice(0, widthWrapper.length - 2) * (slideImage.length -1)) {
                offset = 0;
                slideIndex = 1;
                numImage.textContent = setZero(slideIndex);
                dots[slideIndex-1].style.opacity = '1';
            } else {
                offset += +widthWrapper.slice(0, widthWrapper.length - 2);
                slideIndex++;
                numImage.textContent = setZero(slideIndex);
                dots[slideIndex-1].style.opacity = '1';
            }
        } else if (param == 'left') {
            if (offset == 0) {
                offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (slideImage.length -1);
                slideIndex = slideImage.length;
                numImage.textContent = setZero(slideIndex);
                dots[slideIndex-1].style.opacity = '1';
            } else {
                offset -= +widthWrapper.slice(0, widthWrapper.length - 2);
                slideIndex--;
                numImage.textContent = setZero(slideIndex);
                dots[slideIndex-1].style.opacity = '1';
            }
        }
        slideInner.style.transform = `translateX(-${offset}px)`;
    }

    // нажатие стрелочки вправо
    btnRight.addEventListener('click', () =>  moveSlide('right'));

    // нажатие стрелочки влево
    btnLeft.addEventListener('click', () => moveSlide('left'));

    // автоматическая карусель
    const autoSlide = setInterval( () =>  moveSlide('right'), 8000);

<<<<<<< HEAD
    // hideSlideImage();
    // showSlideImage();

    // totalImage.textContent = setZero(slideImage.length);

    // // скрытие всех картинок
    // function hideSlideImage () {
    //     slideImage.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    // }
    
    // // показ нужной картинки
    // function showSlideImage (num = 0) {
    //     slideImage[num].classList.add('show');
    //     slideImage[num].classList.remove('hide');
    //     numImage.textContent = setZero(num + 1);
    // }
    
    // // перемещение вправо или влево
    // function moveSlide(param) {
    //     let currentNumImage = +(slidecounter.querySelector('#current')).textContent;
    //     const totalNumImage = +setZero(slideImage.length);
    //     if (param == 'left') {
    //         if (currentNumImage == 1) {
    //             currentNumImage = totalNumImage;
    //         } else {
    //             currentNumImage--;
    //         }
    //     } else if (param == 'right') {
    //         if (currentNumImage == totalNumImage) {
    //             currentNumImage = 1;
    //         } else {
    //             currentNumImage++;
    //         }
    //     }
    //     hideSlideImage();
    //     showSlideImage(currentNumImage-1);
    // }

    // // нажатие стрелочки влево
    // btnLeft.addEventListener('click', () => moveSlide('left'));

    // // нажатие стрелочки вправо
    // btnRight.addEventListener('click', () =>  moveSlide('right'));

    // // автоматическая карусель
    // const autoSlide = setInterval( () => moveSlide('right'), 8000);
=======
>>>>>>> bccc7b686f661f3824b16afbc6d1204c6e4cf44d
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
    // closeModal.addEventListener('click', closeModalWindow);

    // закрытие кликом вне окна
    modalWindow.addEventListener('click', (e) => {
        if (e.target.classList == 'modal' || e.target.getAttribute('data-model-close') == '') {
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
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
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
    let dbMenu;
<<<<<<< HEAD
=======

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(obj => {
                new MenuItem(obj.img, obj.title, obj.descr, obj.price, '.menu .container').createMenuItem();
            });
        });
>>>>>>> bccc7b686f661f3824b16afbc6d1204c6e4cf44d

    // const getResource = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         console.log(data);
    //         data.forEach(obj => {
    //                     new MenuItem(obj.img, obj.title, obj.descr, obj.price, '.menu .container').createMenuItem();
    //                 });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(obj => {
                new MenuItem(obj.img, obj.title, obj.descr, obj.price, '.menu .container').createMenuItem();
            });
        });
    //-----------------------------------------------------------------------------------
<<<<<<< HEAD
    // формы
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Error'
    };

    // привязка функционала к каждой форме
    forms.forEach((item) => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    // отправка запроса на сервер
    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json )
            .then(data => {
                // console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });

        //создание окна ответа формы
        function showThanksModal(message) {
            const modelDialog = document.querySelector('.modal__dialog');
            modelDialog.classList.add('hide');
            openModalWindow();
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content"> 
                    <div data-model-close class="modal__close" >&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                modelDialog.classList.add('show');
                modelDialog.classList.remove('hide');
                closeModalWindow();
            }, 4000);
        }
        
    }
    //-----------------------------------------------------------------------------------

=======
        // формы
        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Success',
            failure: 'Error'
        };
    
        // привязка функционала к каждой форме
        forms.forEach((item) => {
            bindpostData(item);
        });

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
    
            return await res.json();
        };
    
    
        // отправка запроса на сервер
        function bindpostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);

                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
                
                postData('http://localhost:3000/requests', json )
                .then(data => {
                    // console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
    
            //создание окна ответа формы
            function showThanksModal(message) {
                const modelDialog = document.querySelector('.modal__dialog');
                modelDialog.classList.add('hide');
                openModalWindow();
                const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                    <div class="modal__content"> 
                        <div data-model-close class="modal__close" >&times;</div>
                        <div class="modal__title">${message}</div>
                    </div>
                `;
    
                document.querySelector('.modal').append(thanksModal);
    
                setTimeout(() => {
                    thanksModal.remove();
                    modelDialog.classList.add('show');
                    modelDialog.classList.remove('hide');
                    closeModalWindow();
                }, 4000);
            }
            
        }



        //-----------------------------------------------------------------------------------
>>>>>>> bccc7b686f661f3824b16afbc6d1204c6e4cf44d

   
});
