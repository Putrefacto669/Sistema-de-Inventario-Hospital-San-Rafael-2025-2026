// === Cursor glow suave ===
const glow = document.getElementById('cursor-glow');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) / 10;
    glowY += (mouseY - glowY) / 10;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// === Burbujas dinámicas con reacción al mouse ===
const bubblesContainer = document.getElementById('bubbles');
const bubbleCount = 10;
const bubbles = [];

for (let i = 0; i < bubbleCount; i++) {
    const size = Math.random() * 90 + 35;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    bubble.style.left = posX + '%';
    bubble.style.top = posY + '%';
    bubble.style.animationDelay = Math.random() * 12 + 's';
    bubble.style.animationDuration = (14 + Math.random() * 6) + 's';
    bubble.style.opacity = 0.4 + Math.random() * 0.4;
    bubblesContainer.appendChild(bubble);

    bubbles.push({
        el: bubble,
        originalLeft: posX,
        originalTop: posY
    });
}

document.addEventListener('mousemove', () => {
    bubbles.forEach(b => {
        const rect = b.el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const threshold = 120;

        if (distance < threshold) {
            const force = (threshold - distance) / threshold;
            const angle = Math.atan2(dy, dx);
            const escapeX = b.originalLeft + Math.cos(angle) * force * 8;
            const escapeY = b.originalTop + Math.sin(angle) * force * 8;

            b.el.style.transform = `translate(${escapeX - b.originalLeft}%, ${escapeY - b.originalTop}%) scale(${1 + force * 0.2})`;
            b.el.style.transition = 'transform 0.3s ease-out';
        } else {
            b.el.style.transform = 'translate(0, 0) scale(1)';
            b.el.style.transition = 'transform 0.6s ease-out';
        }
    });
});

// === Datos y tabla ===
let inventario = [
    { codigo: "A001", nombre: "Gasas Esterilizadas", categoria: "Curación", cantidad: 40, precio: 3.50 },
    { codigo: "A002", nombre: "Guantes Latex", categoria: "Protección", cantidad: 120, precio: 1.20 },
    { codigo: "A003", nombre: "Jeringas 5ml", categoria: "Inyección", cantidad: 75, precio: 2.10 },
    { codigo: "A004", nombre: "Alcohol Isopropílico", categoria: "Desinfección", cantidad: 30, precio: 4.80 },
    { codigo: "A005", nombre: "Mascarillas Quirúrgicas", categoria: "Protección", cantidad: 200, precio: 0.60 }
];

const tabla = document.getElementById("tablaInventario");

function cargarTabla() {
    tabla.innerHTML = "";
    inventario.forEach((p) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${p.cantidad}</td>
            <td>$${p.precio.toFixed(2)}</td>
            <td>
                <button class="btn-small edit" onclick="editar('${p.codigo}')">✏️</button>
                <button class="btn-small delete" onclick="eliminar('${p.codigo}')">🗑</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

cargarTabla();

// === Búsqueda en tiempo real ===
document.getElementById("search").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    const filas = tabla.getElementsByTagName("tr");
    for (let fila of filas) {
        const texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(filtro) ? "" : "none";
    }
});

// === Funciones CRUD básicas ===
function editar(codigo) {
    alert("Editar: " + codigo);
}

function eliminar(codigo) {
    if (confirm("¿Eliminar producto " + codigo + "?")) {
        inventario = inventario.filter(i => i.codigo !== codigo);
        cargarTabla();
    }
}
