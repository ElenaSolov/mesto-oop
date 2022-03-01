import {page} from './constants.js';

// FIXED POSITION FOR PAGE

let scrollY;

export function lockScrollY() {
  scrollY = window.scrollY;
  page.classList.add('page__scroll-lock');
  page.style.top = `-${scrollY}px`;
}

export function unlockScrollY() {
  page.classList.remove('page__scroll-lock')
  page.style.top = '';
  window.scrollTo(0, scrollY);
}