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

    export default gallerySlider;