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

  //слайдер галереи
  const gallerySlider = () => {
    const slider = document.querySelector('.gallery-slider'),
          slide = document.querySelectorAll('.gallery-slides'),
          ul = document.querySelector('.switchers');

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'gallery-slides-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'gallery-slides-active');
      nextSlide(dot, currentSlide, 'dot-active');
      };

      const startSlide = () => {
        interval = setInterval(autoPlaySlide, 2000);
      }

      for (let i = 0; i < slide.length; i++) {
        const li = document.createElement('li');
       
        ul.appendChild(li);
          if (i === 0) {
              li.classList.add('dot');
              li.classList.add('dot-active');
          } else {
              li.classList.add('dot');
          }
      }
      
      const dot = document.querySelectorAll('.dot');  

      const stopSlide = () => {
        clearInterval(interval);
      }

      slider.addEventListener('click', (event) => {
        let target = event.target;
        
        if (!target.matches('.fa-chevron-right, .photoGallery__next, .photoGallery__prev, .fa-chevron-left, .dot')) {
          return;
        }
        prevSlide(slide, currentSlide, 'gallery-slides-active');
        prevSlide(dot, currentSlide, 'dot-active');
        
        if (target.matches('.photoGallery__next') || target.matches('.fa-chevron-right')) {
          currentSlide++;
        } else if (target.matches('.photoGallery__prev') || target.matches('.fa-chevron-left')) {
          currentSlide--;
        } else if (target.matches('.dot')) {
          dot.forEach((elem, index) => {
            if (elem === target) {
              currentSlide = index;
            }
          });
        }

        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }

        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'gallery-slides-active');
        nextSlide(dot, currentSlide, 'dot-active');

      });

      slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.fa-chevron-right, .photoGallery__next, .photoGallery__prev, .fa-chevron-left, .dot')) {
          stopSlide();
        }
      });

      slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.fa-chevron-right, .photoGallery__next, .photoGallery__prev, .fa-chevron-left, .dot')) {
          startSlide();
        }
      });

      startSlide();
  };

  gallerySlider();
    
  //валидация форм
  const name = document.querySelectorAll('.name'),
        phone = document.querySelectorAll('.phone'),
        freeVisitName = document.querySelector('.free-visit-name'),
        freeVisitPhone = document.querySelector('.free-visit-phone'),
        freeVisitCheckbox = document.getElementById('check2'),
        freeVisitButton = document.querySelector('.btn-free-visit');

    name.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^А-Яа-я ]/,'')
      });

      item.addEventListener('focus', () => {
        item.style.border = '1px solid #ffd11a';
      });

      item.addEventListener('blur', () => {
            item.style.border = '';
            if(item.value !== '') {
              item.value = item.value.replace(/\s+/g, ' ').trim()
              item.value = item.value.replace(/[-]+/g, '-')
              item.value = item.value.replace(/^\-+|\-+$/g, '')
              item.value = item.value.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
            } else {

            }
        });  

    });

  

    maskPhone('.phone');

  //отправка данных форм
  const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!',
        agreementMessage = 'Необходимо согласиться на обработку данных';

        const form = document.getElementById('form2');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.innerHTML = `  
            <div class='sk-fading-circle'>
                <div class='sk-circle sk-circle-1'></div>
                <div class='sk-circle sk-circle-2'></div>
                <div class='sk-circle sk-circle-3'></div>
                <div class='sk-circle sk-circle-4'></div>
                <div class='sk-circle sk-circle-5'></div>
                <div class='sk-circle sk-circle-6'></div>
                <div class='sk-circle sk-circle-7'></div>
                <div class='sk-circle sk-circle-8'></div>
                <div class='sk-circle sk-circle-9'></div>
                <div class='sk-circle sk-circle-10'></div>
                <div class='sk-circle sk-circle-11'></div>
                <div class='sk-circle sk-circle-12'></div>
            </div>
            `;
            const formData = new FormData(form);
        
            postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status error not 200')
                    }
                    statusMessage.textContent = successMessage;
                    form.reset();
                    setTimeout(() => {
                        form.removeChild(statusMessage)
                    }, 5000);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                    setTimeout(() => {
                        form.removeChild(statusMessage)
                    }, 5000);
                });
        });

        const postData = (formData) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            });
        };
    };

    //вызов мобильного меню

    const menuButton = document.querySelector('.menu-button'),
          popupMenu = document.querySelector('.popup-menu');

    menuButton.addEventListener('click', () => {
      popupMenu.style.display = 'flex';
    });

    popupMenu.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('.scroll-item, .close-menu-button')){
        popupMenu.style.display = 'none';
      }
    });

    //появлеие стрелки наверх
    const clubs = document.getElementById('clubs'),
          breadcrumbs = document.querySelector('.breadcrumbs'), 
          toTop = document.getElementById('totop');
    
    function isInViewport(el) {
    const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0
      );
    }

    if (page === 'index.html') {
      document.addEventListener('scroll', function () {
      if(isInViewport(clubs)){
        toTop.style.display = 'none';
      } else {
        toTop.style.display = 'block';
      }
    });
    } else {
      document.addEventListener('scroll', function () {
      if(isInViewport(breadcrumbs)){
        toTop.style.display = 'none';
      } else {
        toTop.style.display = 'block';
      }
    });
    }

    //фиксация бургер меню
    (function(){  
    let a = document.querySelector('.top-menu'), b = null;
    window.addEventListener('scroll', Ascroll, false);
    
    function Ascroll() {
    if (b == null) { 
    let Sa = getComputedStyle(a, ''), s = '';
    for (let i = 0; i < Sa.length; i++) { 
      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
      }
    }
    b = document.createElement('div'); 
    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
    a.insertBefore(b, a.firstChild); 
    let l = a.childNodes.length;
    for (let i = 1; i < l; i++) {
      b.appendChild(a.childNodes[1]);
    }
    a.style.height = b.getBoundingClientRect().height + 'px';
    a.style.padding = '0';
    a.style.border = '0'; 
    }
    if (a.getBoundingClientRect().top <= 0 && window.screen.width < 768) { 
      b.className = 'sticky';
    } else {
      b.className = '';
    }
    window.addEventListener('resize', function() {
      a.children[0].style.width = getComputedStyle(a, '').width
    }, false); 
    }
    })()

    
});