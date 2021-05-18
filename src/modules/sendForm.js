  const sendForm = () => {
        //валидация форм
        const formName = document.querySelectorAll('.name'),
              freeVisitName = document.getElementById('free-visit-name'),
              freeVisitPhone = document.getElementById('callback_form2-phone'),
              callBackName = document.getElementById('callback_form1-name'),
              callBackPhone = document.getElementById('callback_form1-phone');

          formName.forEach((item) => {
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

        //открываем меню Выбрать клуб
        const path = window.location.pathname,
              page = path.split("/").pop(),
              clubSelect = document.querySelector('.club-select'),
              body = document.querySelector('body'),
              clubsShow = document.querySelector('.clubs-show');

              // clubsShow.classList.add('hidden-block');
        
          body.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('choose-club')) {
            clubsShow.classList.toggle('hidden-block');
            } else if (!target.classList.contains('clubs-show') && !target.classList.contains('clubs-show-item')) {
              clubsShow.classList.add('hidden-block');
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


        // calculator
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


        //отправка форм
        const statusMess1 = document.querySelector('.status-message-form1'),
            statusMess2 = document.querySelector('.status-message-form2'),
            thanksModal = document.getElementById('thanks'),
            badConnection = document.getElementById('bad-connection'),
            errorMessage = 'Извините, произошла ошибка. Повторите попытку позже.',
            successMessage = 'Сообщение отправлено. Наши менеджеры свяжутся с Вами в ближайшее время.',
            forms = document.querySelectorAll('form'),
            statusMessageGood = document.createElement('div'),
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
            } else if (!item.matches('#footer_form') && name.classList.contains('success') && phone.classList.contains('success') && checkbox.checked === true || phone.classList.contains('success') && checkbox2.checked === true || item.matches('#footer_form') && phone.classList.contains('success') && checkbox2.checked === true || item.matches('#footer_form') && phone.classList.contains('success') && checkbox.checked === true){
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
                      setTimeout(() => {
                        thanksModal.style.display = 'none';
                        freeVisit.style.display = 'none';
                        callBack.style.display = 'none';
                      }, 4000);
                    } else if (item.matches('#banner-form')) {
                      thanksModal.style.display = 'block';
                      setTimeout(() => {
                        thanksModal.style.display = 'none';
                      }, 4000);
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else if (item.matches('#footer_form')) {
                      thanksModal.style.display = 'block';
                      setTimeout(() => {
                        thanksModal.style.display = 'none';
                      }, 4000);
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
                      setTimeout(() => {
                        badConnection.style.display = 'none';
                        freeVisit.style.display = 'none';
                        callBack.style.display = 'none';
                      }, 4000);
                    } else if (item.matches('#banner-form')) {
                      badConnection.style.display = 'block';
                      setTimeout(() => {
                        badConnection.style.display = 'none';
                      }, 4000);
                      name.classList.remove('success');
                      phone.classList.remove('success');
                      item.reset();
                      statusMessageGood.textContent = '';
                    } else if (item.matches('#footer_form')) {
                      badConnection.style.display = 'block';
                      setTimeout(() => {
                        badConnection.style.display = 'none';
                      }, 4000);
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

    export default sendForm;