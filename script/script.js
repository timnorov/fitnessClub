document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //открываем меню Выбрать клуб
const chooseClub = document.querySelector('.clubs-list'),
      clubsShow = document.querySelector('.clubs-show');

  clubsShow.classList.add('hidden-block');
    
  chooseClub.addEventListener('click', () => {
    clubsShow.classList.toggle('hidden-block');
  });

  //открываем поп-ап окна

  const showPopup = document.querySelector('.open-popup'),
        freeVisit = document.getElementById('free_visit_form'),
        callBackBtn = document.querySelector('.callback-btn'),
        callBack = document.getElementById('callback_form'),
        fixedGift = document.querySelector('.fixed-gift'),
        gift = document.getElementById('gift');

  showPopup.addEventListener('click', () => {
    freeVisit.style.display = 'block';
  });

  callBackBtn.addEventListener('click', () => {
    callBack.style.display = 'block';
  });

  fixedGift.addEventListener('click', () => {
    gift.style.display = 'block';
    fixedGift.classList.add('hidden-block');
  });

  //закрываем поп-ап записаться на визит
  const body = document.querySelector('body');

  body.addEventListener('click', (event) => {
    let target = event.target;
    console.log(target);
    if (target.classList.contains('overlay') || target.classList.contains('close_icon')) {
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

      const autoPlaySlide = () => {
        slide[currentSlide].style.display = 'none';
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        slide[currentSlide].style.display = 'inline-block';
      };

      const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
      }

      startSlide();
  };

  slider();

    //слайдер фотогалереи
  const photoSlider = () => {
      const gallerySlider = document.querySelector('.gallery-slider'),
            slide = gallerySlider.querySelectorAll('.slide');

      console.log(slide);
      slide.forEach((item) => {
        item.style.display = 'none';
      })

      let currentSlide = 0;

      const autoPlaySlide = () => {
        slide[currentSlide].style.display = 'none';
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        slide[currentSlide].style.display = 'inline-block';
      };

      const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
      }

      startSlide();
  };

  photoSlider();
});