/* ==========================================================================
   main.js — общие скрипты страницы: фиксированная шапка, мобильное меню,
   год в подвале
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Фиксированная шапка: добавляем тень и плотный фон после начала скролла
  const header = document.getElementById("header");

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 16);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // Мобильное меню навигации
  const burger = document.getElementById("burger");
  const nav = document.getElementById("site-nav");

  if (burger && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      burger.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    };

    burger.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    // Закрываем меню после клика по ссылке (актуально на мобильных)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });
  }

  // Актуальный год в копирайте подвала
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    if (name.length < 2 || contact.length < 5) {
        alert('Пожалуйста, заполните корректно имя и контакт.');
        return;
    }
    alert('Спасибо, мы свяжемся с вами!');
    this.reset();
});

window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight * 0.8) sec.classList.add('fade-in', 'visible');
    });
    document.getElementById('scrollTop').style.display = window.scrollY > 500 ? 'block' : 'none';
});
