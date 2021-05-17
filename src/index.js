'use strict';

import slider from './modules/slider';
import gallerySlider from './modules/gallerySlider';
import sendForm from './modules/sendForm';
import toTopButton from './modules/toTopButton';
import fixBurgerMenu from './modules/fixBurgerMenu';

//основной слайдер
slider();

//слайдер галереи
gallerySlider();

//отправка данных форм
sendForm();

//появлеие стрелки наверх
toTopButton();

//фиксация бургер меню
fixBurgerMenu();