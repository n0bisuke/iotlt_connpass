'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(express.static(__dirname));

app.get('/', (req, res) => res.send(process.version));
 
app.listen(PORT);