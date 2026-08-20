const slides = [...document.querySelectorAll('.slide')];
const total = slides.length; let i = 0, grid = false;
const dots = document.getElementById('dots');

slides.forEach((s, idx) => { const b = document.createElement('button'); b.onclick = () => go(idx); dots.appendChild(b); });
const pad = n => String(n + 1).padStart(2, '0');

function render() {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    [...dots.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
    document.getElementById('counter').textContent = pad(i) + ' / ' + pad(total - 1);
    document.getElementById('prev').disabled = i === 0; document.getElementById('next').disabled = i === total - 1;
}

function go(n) { i = Math.max(0, Math.min(total - 1, n)); if (grid) toggleGrid(false); render(); }
function fit() {
    const st = document.getElementById('stage'); const sc = document.getElementById('scaler');
    if (grid) { slides.forEach(s => { const c = s.querySelector('.slide-content'); const w = s.clientWidth; c.style.transform = 'scale(' + (w / 1920) + ')'; }); return; }
    const r = st.getBoundingClientRect(); sc.style.transform = 'scale(' + Math.min(r.width / 1920, r.height / 1080) + ')';
}

function toggleGrid(v) {
    grid = v === undefined ? !grid : v; document.body.classList.toggle('grid', grid);
    if (grid) slides.forEach(s => s.classList.add('active')); else render(); fit();
}


slides.forEach((s, idx) => s.addEventListener('click', () => { if (grid) go(idx); }));
document.getElementById('prev').onclick = () => go(i - 1);
document.getElementById('next').onclick = () => go(i + 1);
document.getElementById('home').onclick = () => go(0);
document.getElementById('gridBtn').onclick = () => toggleGrid();
document.getElementById('fsBtn').onclick = () => document.documentElement.requestFullscreen?.();

addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1); if (e.key.toLowerCase() === 'g') toggleGrid();
    if (e.key === 'Escape') toggleGrid(false); if (e.key === 'Home') go(0);
});
addEventListener('resize', fit); render(); fit();