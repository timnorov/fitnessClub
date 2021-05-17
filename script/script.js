document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //открываем меню Выбрать клуб
  const path = window.location.pathname,
        page = path.split("/").pop(),
        clubSelect = document.querySelector('.club-select'),
        clubsShow = document.querySelector('.clubs-show');

        clubsShow.classList.add('hidden-block');
  
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

  const fixedGift = document.querySelector('.fixed-gift'),
        gift = document.getElementById('gift');
  
  //закрываем поп-апы
  document.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('overlay') || target.classList.contains('close_icon') || target.classList.contains('close-btn') || target.classList.contains('btn-ok1') || target.classList.contains('btn-ok2')) {
      statusMess1.classList.add('hidden-block');
      statusMess2.classList.add('hidden-block');
      document.getElementById('form2').style.display = 'block';
      document.getElementById('form2').reset();
      document.getElementById('form1').style.display = 'block';
      document.getElementById('form1').reset();
      freeVisitName.classList.remove('success');
      freeVisitPhone.classList.remove('success');
      callBackName.classList.remove('success');
      callBackPhone.classList.remove('success');      
      freeVisit.style.display = 'none';
      callBack.style.display = 'none';
      thanksModal.style.display = 'none';
      badConnection.style.display = 'none';
      gift.style.display = 'none';
    } else if (target.classList.contains('gift-icon')){
      gift.style.display = 'block';
      fixedGift.classList.add('hidden-block');
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
        freeVisitName = document.getElementById('free-visit-name'),
        freeVisitPhone = document.getElementById('callback_form2-phone'),
        callBackName = document.getElementById('callback_form1-name'),
        callBackPhone = document.getElementById('callback_form1-phone');

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
  const statusText1 = document.querySelector('.status-text1'),
        statusText2 = document.querySelector('.status-text2'),
        statusMess1 = document.querySelector('.status-message-form1'),
        statusMess2 = document.querySelector('.status-message-form2'),
        thanksModal = document.getElementById('thanks'),
        badConnection = document.getElementById('bad-connection');

    const sendForm = () => {
          const errorMessage = 'Извините, произошла ошибка. Повторите попытку позже.',
          successMessage = 'Сообщение отправлено. Наши менеджеры свяжутся с Вами в ближайшее время.',
          forms = document.querySelectorAll('form');
          
        const statusMessageGood = document.createElement('div'),
              statusMessageBad = document.createElement('div');
        statusMessageGood.style.cssText = 'font-size: 1rem; margin-top: 5px; text-align: center; color: green';
        statusMessageBad.style.cssText = 'font-size: 1rem; margin-top: 5px; text-align: center; color: #d93025';

        forms.forEach((item) => {
          
          let name = item.querySelector('.name'),
              phone = item.querySelector('.phone'),
              checkbox = item.querySelector('.checkbox'),
              checkbox2 = item.querySelector('.radio');

        item.addEventListener('submit', (event) => {
            event.preventDefault();            

            if (!item.matches('#footer_form') && name.classList.contains('success') && phone.classList.contains('success') && checkbox.checked === false) {
              item.appendChild(statusMessageBad);
              statusMessageBad.textContent = 'Необходимо согласиться на обработку данных';
            } else if (item.matches('#footer_form') && phone.classList.contains('success') && checkbox.checked === false && checkbox2.checked === false) {
              item.appendChild(statusMessageBad);
              statusMessageBad.textContent = 'Необходимо выбрать один клуб';
            } else if (!item.matches('#footer_form') && name.classList.contains('success') && phone.classList.contains('success') && checkbox.checked === true){
              statusMessageBad.textContent = '';
              item.appendChild(statusMessageGood);
            statusMessageGood.innerHTML = `  
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
            const formData = new FormData(item);
        
            postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status error not 200')
                    }
                    if (item.classList.contains('form1') || item.classList.contains('form2')) {
                      item.style.display = 'none';
                      item.removeChild(statusMessageGood)
                      thanksModal.style.display = 'block';
                    } else if (item.matches('#banner-form')) {
                      thanksModal.style.display = 'block';
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else if (item.matches('#footer_form')) {
                      thanksModal.style.display = 'block';
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else if (item.classList.contains('card_order1')){
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      promoCode.classList.remove('success');
                      statusMessageGood.textContent = successMessage;
                      totalPrice.innerHTML = '1999';
                      item.reset();
                      setTimeout(() => {
                        statusMessageGood.textContent = '';
                      }, 5000);  
                    } else {
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      statusMessageGood.textContent = successMessage;
                      item.reset();
                      setTimeout(() => {
                        statusMessageGood.textContent = '';
                      }, 5000);
                    }

                })
                .catch((error) => {
                    if (item.classList.contains('form1') || item.classList.contains('form2')) {
                      item.style.display = 'none';
                      badConnection.style.display = 'block';
                    } else if (item.matches('#banner-form')) {
                      badConnection.style.display = 'block';
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else if (item.matches('#footer_form')) {
                      badConnection.style.display = 'block';
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else {
                      statusMessageBad.textContent = errorMessage;
                      totalPrice.innerHTML = '1999';
                      item.reset();
                      setTimeout(() => {
                        statusMessageBad.textContent = '';
                      }, 5000);   
                    }
                    console.error(error);
                });
            }
            
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
        })
    };
    sendForm();


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
    const headSlider = document.querySelector('.head-slider'),
          toTop = document.getElementById('totop');
    
    function isInViewport(el) {
    const rect = el.getBoundingClientRect();
      return (
          rect.bottom >= 0
      );
    }

    document.addEventListener('scroll', function () {
      if(isInViewport(headSlider)){
        toTop.style.display = 'none';
      } else {
        toTop.style.display = 'block';
      }
    });

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

  //калькулятор
  const clubCards = document.getElementById('card_order'),
        oneMonth = document.getElementById('m1'),
        sixMonth = document.getElementById('m2'),
        nineMonth = document.getElementById('m3'),
        twelveMonth = document.getElementById('m4'),
        clubMozaika = document.getElementById('card_leto_mozaika'),
        clubSchelkovo = document.getElementById('card_leto_schelkovo'),
        promoCode = document.getElementById('promocode'),
        totalPrice = document.getElementById('price-total');
  let currentPrice;
  
  if (page === '' || page === 'index.html') {
    clubCards.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('#m1') && clubMozaika.checked === true || target.matches('#card_leto_mozaika') && oneMonth.checked === true){
        promoCode.value = '';
        totalPrice.innerHTML = '1999';
      } else if (target.matches('#m2') && clubMozaika.checked === true || target.matches('#card_leto_mozaika') && sixMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '9990';
      } else if (target.matches('#m3') && clubMozaika.checked === true || target.matches('#card_leto_mozaika') && nineMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '13900';
      } else if (target.matches('#m4') && clubMozaika.checked === true || target.matches('#card_leto_mozaika') && twelveMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '19900';
      } 
  
      if (target.matches('#m1') && clubSchelkovo.checked === true || target.matches('#card_leto_schelkovo') && oneMonth.checked === true){
        promoCode.value = '';
        totalPrice.innerHTML = '2999';
      } else if (target.matches('#m2') && clubSchelkovo.checked === true || target.matches('#card_leto_schelkovo') && sixMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '14990';
      } else if (target.matches('#m3') && clubSchelkovo.checked === true || target.matches('#card_leto_schelkovo') && nineMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '21990';
      } else if (target.matches('#m4') && clubSchelkovo.checked === true || target.matches('#card_leto_schelkovo') && twelveMonth.checked === true) {
        promoCode.value = '';
        totalPrice.innerHTML = '24990';
      }
      currentPrice = totalPrice.innerHTML; 
    });

  }
    
  if (page === '' || page === 'index.html') {
    promoCode.addEventListener('input', () => {
      if (promoCode.value === 'ТЕЛО2020') {
        totalPrice.innerHTML = currentPrice - Math.ceil(totalPrice.innerText * 0.3) ;
      } else if (promoCode !== 'ТЕЛО2020') {
         totalPrice.innerHTML = currentPrice;
      }
    });
  }  


});