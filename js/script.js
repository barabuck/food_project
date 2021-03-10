'use strict';

window.addEventListener('DOMContentLoaded', () => {
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

    
});
