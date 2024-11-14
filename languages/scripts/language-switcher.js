document.addEventListener('DOMContentLoaded', function() {
    const languageBtns = document.querySelectorAll('.lang-btn');
    
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            // Actualizar botones
            languageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar contenido
            document.querySelectorAll('[data-en]').forEach(element => {
                const text = element.dataset[lang];
                if (text) element.textContent = text;
            });

            // Actualizar atributo lang del HTML
            document.documentElement.lang = lang;
        });
    });
});