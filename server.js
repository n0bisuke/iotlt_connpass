'use strict';

const fs = require('fs');
const express = require('express');
const action = require('./action');
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send(process.version);
    action();
});
 
app.listen(PORT);