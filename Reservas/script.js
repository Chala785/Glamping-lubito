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