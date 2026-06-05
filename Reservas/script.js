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

// Lógica de selección de alojamiento y addons
function selectCard(el, gridId) {
    document.querySelectorAll(`#${gridId} .card`).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    updateButton();
  }

  function toggleAddon(el) {
    el.classList.toggle('selected');
  }

  function updateButton() {
    const selected = document.querySelector('#alojamiento-grid .card.selected');
    const btn = document.getElementById('btn-submit');
    if (selected) {
      const name = selected.querySelector('.card-name').textContent;
      btn.textContent = `Solicitar reservación — ${name}`;
      btn.classList.add('ready');
    } else {
      btn.textContent = 'Selecciona un alojamiento';
      btn.classList.remove('ready');
    }
  }
