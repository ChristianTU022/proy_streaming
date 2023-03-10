var socket = io();

//Ejecutar evento socket de tipo stream, donde recibe una imagen
socket.on('stream', (image) => {
    let img = document.querySelector('#play');
    img.src = image;
})