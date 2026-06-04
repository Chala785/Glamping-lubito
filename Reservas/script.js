//menu hamburguesa
const ham = document.getElementById('ham');
    const menu = document.getElementById('mobileMenu');

    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
      });
    });