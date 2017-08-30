'use strict';

const io = require('socket.io-client');
const action = require('./action');
const socket = io('mysocket.azurewebsites.net');

console.log(`startup`);

socket.on('connect', () => {
    socket.on('update_connpass', (msg) => {
        console.log(`message: ${msg}`);
        console.log('connecting connpass...');
        action();
    });
});