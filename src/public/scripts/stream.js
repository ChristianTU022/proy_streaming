
var canvas = document.querySelector('#preview');  //captura la variable preview
var context = canvas.getContext('2d');
var btn = document.querySelector('#btn');

//Ocultar la preview que se usara para enviar al receptor
canvas.style.display = 'none';

canvas.width = 512;
canvas.height = 384;

context.width = canvas.width;
context.height = canvas.height;

var video = document.querySelector('#video'); // capturar la variable video
var socket = io();


//Funcion para estado del stream
function colocarMensaje(msg) {
    document.querySelector('.status').innerText = msg;
}
//Funcion para cargar la camara
function cargarCamara(stream) {
    video.srcObject = stream;
    colocarMensaje('Estas en Vivo y en Directo');
}
//Funcion en caso de que no pueda abrir la Camara
function errorCamara() {
    colocarMensaje('La Camara esta teniendo un error.');
}
//Funcion que recibe 2 elementos con el fin de dibujar en canvas un elemento
function verVideo(video, context) {
    //Objeto, coordenadas en X y Y ademas de las dimensiones
    context.drawImage(video, 0, 0, context.width, context.height);
    //Aqui emitimos para recibirlo en el otro html
    socket.emit('stream', canvas.toDataURL('image/webp'));
}

btn.addEventListener('click', () => {
    alert('Emitiendo');
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msgGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, cargarCamara, errorCamara)
    }
    //Funcion que Refresca
    setInterval(() => {
        //Se ejecuta funcion con objeto video de html y context para refrescar en el intervalo
        verVideo(video, context);
    });
})
