var express = require('express');
var socket = require('socket.io');

// Crear aplicación Express
var app = express();

// Levantar el servidor en el puerto 4000 y escuchar en todas las interfaces
var server = app.listen(4000, '0.0.0.0', function(){
    console.log('Servidor corriendo en http://0.0.0.0:4000');
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Inicializar Socket.io
var io = socket(server);

// Manejo de conexiones de clientes
io.on('connection', function(socket){
    console.log('Hay una conexión: ', socket.id);

    // Evento de chat
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // Evento de escritura (typing)
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
