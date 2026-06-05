// menu hamburguesa
const ham = document.getElementById('ham');
const menu = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
    });
});

// Precios de planes
const precios = {
    domo:   200000,
    cabana: 120000,
    tienda: 260000
};

// Precios de addons
const preciosAddon = {
    'Decoración':        45000,
    'Sesión fotográfica': 80000
};

function selectCard(el, gridId) {
    document.querySelectorAll(`#${gridId} .card`).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    updateButton();
    updateResumen();
}

function toggleAddon(el) {
    el.classList.toggle('selected');
    updateResumen();
}

function updateButton() {
    const selected = document.querySelector('#reserva-grid .card.selected');
    const btn = document.getElementById('btn-submit');
    if (selected) {
        const name = selected.querySelector('.card-name').textContent;
        btn.textContent = `Solicitar reservación — ${name}`;
        btn.classList.add('ready');
    } else {
        btn.textContent = 'Selecciona un plan para reservar';
        btn.classList.remove('ready');
    }
}

function getNochesDiff() {
    const llegada = document.getElementById('llegada').value;
    const salida  = document.getElementById('salida').value;
    if (!llegada || !salida) return 1;
    const diff = (new Date(salida) - new Date(llegada)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 1;
}

function formatCOP(n) {
    return '$' + n.toLocaleString('es-CO').replace(/,/g, '.');
}

function updateResumen() {
    const selected = document.querySelector('#reserva-grid .card.selected');
    const section  = document.getElementById('resumen-section');

    if (!selected) { section.style.display = 'none'; return; }

    section.style.display = 'block';

    const planNombre = selected.querySelector('.card-name').textContent;
    const planValor  = precios[selected.dataset.value];
    const noches     = getNochesDiff();
    let total        = planValor * noches;

    let lineasHTML = `
        <div class="resumen-linea">
            <span>${planNombre} × ${noches} noche${noches > 1 ? 's' : ''}</span>
            <span>${formatCOP(planValor * noches)}</span>
        </div>`;

    document.querySelectorAll('#servicios-grid .addon-card.selected').forEach(addon => {
        const nombre = addon.querySelector('.addon-name').textContent;
        const valor  = preciosAddon[nombre] || 0;
        total += valor;
        lineasHTML += `
        <div class="resumen-linea">
            <span>· ${nombre}</span>
            <span>${formatCOP(valor)}</span>
        </div>`;
    });

    document.getElementById('resumen-lineas').innerHTML = lineasHTML;
    document.getElementById('resumen-total-valor').textContent = formatCOP(total);
}

// Actualizar resumen al cambiar fechas
document.getElementById('llegada').addEventListener('change', updateResumen);
document.getElementById('salida').addEventListener('change', updateResumen);

// Limitar huéspedes
document.getElementById('huespedes').addEventListener('input', function () {
    if (this.value > 4) this.value = 4;
    if (this.value < 1) this.value = 1;
});

function enviarReserva() {
    const selected = document.querySelector('#reserva-grid .card.selected');
    if (!selected) return;

    const nombre    = document.getElementById('nombre').value.trim();
    const email     = document.getElementById('email').value.trim();
    const llegada   = document.getElementById('llegada').value;
    const salida    = document.getElementById('salida').value;
    const huespedes = document.getElementById('huespedes').value;

    if (!nombre || !email || !llegada || !salida) {
        alert('Por favor completa nombre, correo y fechas antes de continuar.');
        return;
    }

    const planNombre = selected.querySelector('.card-name').textContent;
    const planEmoji  = selected.querySelector('.card-emoji').textContent;
    const noches     = getNochesDiff();
    const planValor  = precios[selected.dataset.value];
    let total        = planValor * noches;

    document.querySelectorAll('#servicios-grid .addon-card.selected').forEach(addon => {
        const n = addon.querySelector('.addon-name').textContent;
        total += preciosAddon[n] || 0;
    });

    // Rellenar confirmación
    document.getElementById('conf-nombre').textContent   = nombre;
    document.getElementById('conf-plan').textContent     = planNombre;
    document.getElementById('conf-email').textContent    = email;
    document.getElementById('conf-aloj').textContent     = `${planNombre} ${planEmoji}`;
    document.getElementById('conf-llegada').textContent  = llegada;
    document.getElementById('conf-salida').textContent   = salida;
    document.getElementById('conf-noches').textContent   = noches;
    document.getElementById('conf-huespedes').textContent = huespedes;
    document.getElementById('conf-total').textContent    = formatCOP(total);

    // Ocultar formulario y mostrar confirmación
    document.querySelector('.container').style.display   = 'none';
    document.getElementById('confirmacion').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}