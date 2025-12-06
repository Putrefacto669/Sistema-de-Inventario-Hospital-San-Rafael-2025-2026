// === 1. Resplandor suave del mouse ===
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

// === 2. Burbujas dinámicas ===
const bubblesContainer = document.getElementById('bubbles');
const bubbleCount = 14;
const bubbles = [];

for (let i = 0; i < bubbleCount; i++) {
    const size = Math.random() * 90 + 30;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    bubble.style.left = posX + '%';
    bubble.style.top = posY + '%';
    bubble.style.animationDelay = Math.random() * 15 + 's';
    bubble.style.animationDuration = (13 + Math.random() * 8) + 's';
    bubble.style.opacity = 0.4 + Math.random() * 0.4;
    bubblesContainer.appendChild(bubble);

    bubbles.push({
        el: bubble,
        originalLeft: posX,
        originalTop: posY
    });
}

// Reacción de burbujas al mouse
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

// === 3. Hojas y gotas animadas ===
function createFloatingElements() {
    const container = document.body;
    for (let i = 0; i < 3; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-element';
        leaf.style.left = (10 + Math.random() * 80) + '%';
        leaf.style.top = (20 + Math.random() * 60) + '%';
        leaf.style.animation = `floatLeaf ${20 + Math.random() * 12}s infinite ease-in-out`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(leaf);
    }
    for (let i = 0; i < 2; i++) {
        const drop = document.createElement('div');
        drop.className = 'floating-element gota';
        drop.style.width = '10px';
        drop.style.height = '10px';
        drop.style.left = (15 + Math.random() * 70) + '%';
        drop.style.top = (25 + Math.random() * 50) + '%';
        drop.style.animation = `floatDrop ${25 + Math.random() * 10}s infinite ease-in-out`;
        drop.style.animationDelay = `${Math.random() * 6}s`;
        container.appendChild(drop);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingElements);
} else {
    createFloatingElements();
}

// === 4. Lógica de login ===
function login() {
    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMsg");
    error.textContent = "";

    if (user === "admin" && pass === "password") {
        const btn = document.querySelector('button');
        btn.textContent = "✓ Accediendo...";
        btn.style.background = "linear-gradient(135deg, #66bb6a, #2e7d32)";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
        const container = document.querySelector('.login-container');
        container.style.transform = "translateX(-8px)";
        setTimeout(() => container.style.transform = "translateX(8px)", 100);
        setTimeout(() => container.style.transform = "translateX(0)", 200);
    }
}
