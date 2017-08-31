'use strict';

const io = require('socket.io-client');
const action = require('./action');
const socket = io('c34e6f65.ngrok.io'); // c34e6f65.ngrok.io || mysocket.azurewebsites.net

console.log(`startup`);

socket.on('connect', () => {
    socket.on('update_connpass', (msg) => {
        console.log(`message: ${msg}`);
        action(socket);
    });
});