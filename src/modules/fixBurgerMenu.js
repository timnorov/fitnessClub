  const fixBurgerMenu = () => {
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
    a.style.height = '100%';
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

  }

    export default fixBurgerMenu;