'use strict';

//слайдер услуг
const services = document.getElementById('services');

  class SliderCarousel{
    constructor({
      main, 
      wrap, 
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 5,
      responsive = []
    }){
      if(!main || !wrap){
        console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
      }
      this.main = services.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow)
      };
      this.responsive = responsive;
    }

    init(){
      this.addGloClass();
      this.addStyle();

      if(this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }
      if (this.responsive) {
        this.responseInit();  
      }
      
    }

    addGloClass() {
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');
      for (const item of this.slides) {
        item.classList.add('glo-slider__item');
      }
    }

    addStyle(){
      let style = document.getElementById('sliderCarousel-style');
      if (!style){
        style = document.createElement('style');
        style.id = 'sliderCarousel-style';
      }
      style.textContent = `
        #services{
          position: relative !important;
        }
        .glo-slider{
          overflow: hidden !important;
          padding-left: 9px !important;
          padding-right: 9px;
          position: relative !important;
        }
        .glo-slider__wrap{
          transition: transform 0.5s !important;
          will-change: transform;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .glo-slider__item{
          flex: 0 0 ${this.options.widthSlide}%;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    controlSlider(){
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider(){
      if (this.options.infinity || this.options.position > 0) {
        --this.options.position;
        if (this.options.position < 0) {
          this.options.position = this.slides.length - this.slidesToShow
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }
    }

    nextSlider(){
      if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
         if (this.options.position > this.slides.length - this.slidesToShow) {
           this.options.position = 0;
         }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;  
      }
    }

    addArrow(){
      this.prev = document.createElement('button');
      this.next = document.createElement('button');

      this.prev.className = 'glo-slider__prev';
      this.next.className = 'glo-slider__next';

      this.prev.innerHTML = '<i class="fa fa-chevron-left"></i>';
      this.next.innerHTML = '<i class="fa fa-chevron-right"></i>';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);

      const style = document.createElement('style');
      style.textContent = `
        .glo-slider__prev,
        .glo-slider__next {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
        }
        .glo-slider__next {
          position: absolute;
          top: 130px;
          right: 0px;
          border-radius: 50%;
          background-color: #efd308;
          width: 20px;
          height: 20px;
          margin: 0;
          padding: 0;
          line-height: 0;
        }
        .glo-slider__prev {
          position: absolute;
          top: 130px;
          left: 0px;
          border-radius: 50%;
          background-color: #efd308;
          width: 20px;
          height: 20px;
          margin: 0;
          padding: 0;
          line-height: 0;
        }
      `;

      document.head.appendChild(style);
    }

    responseInit(){
      const slidesToShowDefault = this.slidesToShow;
      const allResponse = this.responsive.map(item => item.breakpoint);
      const maxResponse = Math.max(...allResponse);
      
      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;
        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]){
              this.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
            }
          } 
        } else {
              this.slidesToShow = slidesToShowDefault;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
        }
      };

      checkResponse();

      window.addEventListener('resize', checkResponse);

    }
  }