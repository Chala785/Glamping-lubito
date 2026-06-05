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

// Función para redirigir a la página de reservas con el plan seleccionado
function irAReservar(plan) {
    localStorage.setItem('planSeleccionado', plan);
    window.location.href = '/reservas.html';
}