// Кофейня «Зерно и пар» — навигация, появление блоков, форма брони
(function () {
  'use strict';

  // Шапка при скролле
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('nav--solid', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Мобильное меню
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      links.classList.toggle('nav__links--open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav--open');
        links.classList.remove('nav__links--open');
      }
    });
  }

  // Появление блоков
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('reveal--in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Демо-форма брони
  var form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add('form--done');
      form.querySelectorAll('input, select, textarea, button').forEach(function (el) { el.disabled = true; });
    });
  }
})();
