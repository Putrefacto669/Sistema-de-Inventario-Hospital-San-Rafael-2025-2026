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
const bubbleCount = 14;
const bubbles = [];

for (let i = 0; i < bubbleCount; i++) {
    const size = Math.random() * 100 + 40;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    bubble.style.left = posX + '%';
    bubble.style.top = posY + '%';
    bubble.style.animationDelay = Math.random() * 15 + 's';
    bubble.style.animationDuration = (14 + Math.random() * 8) + 's';
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
        const threshold = 130;

        if (distance < threshold) {
            const force = (threshold - distance) / threshold;
            const angle = Math.atan2(dy, dx);
            const escapeX = b.originalLeft + Math.cos(angle) * force * 9;
            const escapeY = b.originalTop + Math.sin(angle) * force * 9;

            b.el.style.transform = `translate(${escapeX - b.originalLeft}%, ${escapeY - b.originalTop}%) scale(${1 + force * 0.25})`;
            b.el.style.transition = 'transform 0.3s ease-out';
        } else {
            b.el.style.transform = 'translate(0, 0) scale(1)';
            b.el.style.transition = 'transform 0.6s ease-out';
        }
    });
});

// === Logout ===
function logout() {
    window.location.href = "login.html";
}
