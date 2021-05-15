document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //открываем меню Выбрать клуб
  const path = window.location.pathname,
        page = path.split("/").pop(),
        clubSelect = document.querySelector('.club-select'),
        chooseClub = document.querySelector('.clubs-list'),
        clubsShow = document.querySelector('.clubs-show');

    if (page === 'index.html') {
      clubsShow.classList.add('hidden-block');
    }
  
    clubSelect.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('choose-club')) {
      clubsShow.classList.toggle('hidden-block');
      }

    });

  //открываем поп-ап окна

  const showPopup = document.querySelector('.open-popup'),
        freeVisit = document.getElementById('free_visit_form'),
        callBackBtn = document.querySelector('.callback-btn'),
        callBack = document.getElementById('callback_form');

  showPopup.addEventListener('click', () => {
    freeVisit.style.display = 'block';
  });

  callBackBtn.addEventListener('click', () => {
    callBack.style.display = 'block';
  });

  if (page === 'index.html') {
    const fixedGift = document.querySelector('.fixed-gift'),
          gift = document.getElementById('gift');
    
    fixedGift.addEventListener('click', () => {
      gift.style.display = 'block';
      fixedGift.classList.add('hidden-block');
    });
  }

  
  //закрываем поп-апы
  const body = document.querySelector('body');

  body.addEventListener('click', (event) => {
    let target = event.target;
    console.log(target);
    if (target.classList.contains('overlay') || target.classList.contains('close_icon') || target.classList.contains('close-btn')) {
      freeVisit.style.display = 'none';
      callBack.style.display = 'none';
      gift.style.display = 'none';
    }
  })

  //основной слайдер
  const slider = () => {
    const mainSlider = document.querySelector('.main-slider'),
          slide = mainSlider.querySelectorAll('.slide');

    let currentSlide = 0;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'hidden-block');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'hidden-block');
      };

      const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
      }

      startSlide();
  };

  slider();
    
});