//Aqui se inicializara el servidor
const http = require('./app');

http.listen(3000, () => {
    console.log('Servidor entro al puerto 3000');
})