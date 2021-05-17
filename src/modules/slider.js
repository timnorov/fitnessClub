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

  export default slider;