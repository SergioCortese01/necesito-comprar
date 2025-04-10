document.getElementById('publicar-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const textarea = this.querySelector('textarea');
    textarea.placeholder = "Escribe lo que necesites comprar, alquilar, contratar, conseguir"; // Cambiar el texto del placeholder
    const text = textarea.value.trim();
    if (text) {
        const publicaciones = document.getElementById('lista-publicaciones');
        const nuevaPublicacion = document.createElement('div');
        nuevaPublicacion.className = 'publicacion';
        nuevaPublicacion.innerHTML = `
            <p>${text}</p>
            <small>${new Date().toLocaleString()}</small>
            <button class="responder-btn">Responder</button>
            <div class="respuestas"></div>
            <div class="chat-area" style="display: none;">
                <div class="chat-messages"></div>
                <input type="text" class="chat-input chat-input-vendedor" placeholder="Responde vendedor...">
                <button class="enviar-chat-btn" data-role="vendedor">Enviar</button>
                <input type="text" class="chat-input chat-input-comprador" placeholder="Escribe comprador...">
                <button class="enviar-chat-btn" data-role="comprador">Enviar</button>
            </div>
        `;
        publicaciones.prepend(nuevaPublicacion);
        textarea.value = '';
    }
});

document.getElementById('lista-publicaciones').addEventListener('click', function(event) {
    if (event.target.classList.contains('responder-btn')) {
        const publicacion = event.target.closest('.publicacion');
        const chatArea = publicacion.querySelector('.chat-area');
        chatArea.style.display = chatArea.style.display === 'none' ? 'block' : 'none';
    } else if (event.target.classList.contains('enviar-chat-btn')) {
        const chatArea = event.target.closest('.chat-area');
        const input = event.target.previousElementSibling; // Campo de entrada asociado
        const messages = chatArea.querySelector('.chat-messages');
        const message = input.value.trim();

        if (message) {
            const newMessage = document.createElement('div');
            newMessage.className = 'chat-message';

            // Identificar si es comprador o vendedor
            if (event.target.dataset.role === 'comprador') {
                newMessage.classList.add('comprador'); // Mensaje del comprador
            } else if (event.target.dataset.role === 'vendedor') {
                newMessage.classList.add('vendedor'); // Mensaje del vendedor
            }

            newMessage.textContent = message;
            messages.appendChild(newMessage);
            input.value = ''; // Limpiar el campo de entrada
            messages.scrollTop = messages.scrollHeight; // Desplazar hacia abajo
        }
    }
});

document.querySelector('.contacto-btn').addEventListener('click', function() {
    document.getElementById('contacto-modal').style.display = 'flex';
});

document.querySelector('.cerrar-modal-btn').addEventListener('click', function() {
    document.getElementById('contacto-modal').style.display = 'none';
});

// Mostrar la fecha actual
document.getElementById('fecha').textContent = `Fecha: ${new Date().toLocaleDateString()}`;

// Actualizar la hora cada segundo
setInterval(() => {
    const horaActual = new Date().toLocaleTimeString();
    document.getElementById('hora').textContent = `Hora: ${horaActual}`;
}, 1000);
