  const toTopButton = () => {
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
  }

    export default toTopButton;