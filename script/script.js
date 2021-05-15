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
    
});