// about/scripts/about.js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '-100px'
});

// Observar secciones
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Dividir texto para interacción con mariposas
document.querySelectorAll('.content-wrapper p').forEach(text => {
    text.innerHTML = text.textContent.split(' ').map(word => 
        `<span class="word">${word}</span>`
    ).join(' ');
});

// Interacción mariposas-texto
function checkWordProximity() {
    const words = document.querySelectorAll('.word');
    const butterflies = document.querySelectorAll('.butterfly');

    words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordCenter = {
            x: wordRect.left + wordRect.width/2,
            y: wordRect.top + wordRect.height/2
        };

        let isClose = false;

        butterflies.forEach(butterfly => {
            const butterflyRect = butterfly.getBoundingClientRect();
            const butterflyCenter = {
                x: butterflyRect.left + butterflyRect.width/2,
                y: butterflyRect.top + butterflyRect.height/2
            };

            const distance = Math.hypot(
                wordCenter.x - butterflyCenter.x,
                wordCenter.y - butterflyCenter.y
            );

            if (distance < 100) isClose = true;
        });

        if (isClose) {
            word.classList.add('glow');
        } else {
            word.classList.remove('glow');
        }
    });
}

setInterval(checkWordProximity, 100);

// Efecto zoom al scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrolled >= sectionTop - window.innerHeight/2 && 
            scrolled <= sectionTop + sectionHeight) {
            const progress = (scrolled - sectionTop + window.innerHeight/2) / sectionHeight;
            const scale = 1 + (progress * 0.1);
            section.style.transform = `scale(${scale})`;
        }
    });
});