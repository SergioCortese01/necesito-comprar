document.addEventListener("DOMContentLoaded", () => {
    const publicarForm = document.getElementById("publicar-form");
    const listaPublicaciones = document.getElementById("lista-publicaciones");

    publicarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = publicarForm.querySelector("textarea").value;
        if (texto.trim() === "") return;

        const publicacion = document.createElement("div");
        publicacion.classList.add("publicacion");
        publicacion.innerHTML = `
            <p>${texto}</p>
            <button class="responder-btn btn">Responder</button>
            <small>${new Date().toLocaleString()}</small>
            <div class="chat-area" style="display: none;">
                <div class="chat-messages"></div>
                <div class="chat-vendedor">
                    <input type="text" class="chat-input chat-input-vendedor" placeholder="Responde vendedor...">
                    <button class="enviar-chat-btn btn" data-role="vendedor">Enviar</button>
                </div>
                <div class="chat-comprador">
                    <input type="text" class="chat-input chat-input-comprador" placeholder="Escribe comprador...">
                    <button class="enviar-chat-btn btn" data-role="comprador">Enviar</button>
                </div>
            </div>
        `;
        listaPublicaciones.appendChild(publicacion);
        publicarForm.reset();
    });

    listaPublicaciones.addEventListener("click", (e) => {
        if (e.target.classList.contains("responder-btn")) {
            const chatArea = e.target.nextElementSibling.nextElementSibling;
            chatArea.style.display = chatArea.style.display === "none" ? "block" : "none";
        }

        if (e.target.classList.contains("enviar-chat-btn")) {
            const role = e.target.dataset.role;
            const input = e.target.previousElementSibling;
            const mensaje = input.value.trim();
            if (mensaje === "") return;

            const chatMessages = e.target.closest(".chat-area").querySelector(".chat-messages");
            const mensajeDiv = document.createElement("div");
            mensajeDiv.classList.add("chat-message", role);
            mensajeDiv.textContent = mensaje;
            chatMessages.appendChild(mensajeDiv);
            input.value = "";
        }
    });
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
