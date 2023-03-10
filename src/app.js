
//Aqui se configurara el servidor que creamos dentro del index

const express = require("express");
const { Socket } = require("socket.io");
const app  = express();
//aqui se crea un servidor http, a partir de la libreria express
const http = require('http').Server(app);

//para generar una comunicacion se trabajo el paquete/libreria/extension socket.io
const io = require('socket.io')(http);

//rutas
app.use(require ('./routes/proy_streaming.routes'));

//se va a ir a la carpeta public a buscar los html que vamos a trabajar
app.use(express.static(__dirname + "/public"));

//Generar canal de comunicacion
io.on('connection', (socket) => { //Se genera un evento llamado connection que abre socket y ejecuta una funcion
    socket.on('stream', (image) => {
        //emite el evento a todos los sockets conectados
        //con la siguiente funcion EMISORA
        socket.broadcast.emit('stream', image)
    })
})


module.exports = http;
