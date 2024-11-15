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

function checkWordProximity() {
    const words = document.querySelectorAll('.word');
    const butterflies = document.querySelectorAll('.butterfly');

    // Primero, remover la clase near-text de todas las mariposas
    butterflies.forEach(butterfly => {
        butterfly.classList.remove('near-text');
    });

    words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordCenter = {
            x: wordRect.left + wordRect.width/2,
            y: wordRect.top + wordRect.height/2
        };

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

            // Si la mariposa está cerca de una palabra
            if (distance < 50) {
                word.classList.add('glow');
                butterfly.classList.add('near-text');
            } else {
                word.classList.remove('glow');
            }
        });
    });
}

setInterval(checkWordProximity, 50);

// about/scripts/about.js

// Intersection Observer para las secciones
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-50px'
});

// Observar todas las secciones
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// Dividir el texto en palabras para la interacción con mariposas
document.querySelectorAll('.about-text').forEach(text => {
    text.innerHTML = text.textContent.split(' ').map(word => 
        `<span class="word">${word}</span>`
    ).join(' ');
});

// Interacción mariposa-texto mejorada
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

            // Reducido el radio de interacción
            if (distance < 50) { // Reducido de 100 a 50
                isClose = true;
            }
        });

        if (isClose) {
            word.classList.add('glow');
        } else {
            word.classList.remove('glow');
        }
    });
}

// Ejecutar la verificación de proximidad más frecuentemente
setInterval(checkWordProximity, 50); // Reducido de 100 a 50ms para mayor suavidad

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});