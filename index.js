// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
});

server.get('/api/users', (req, res) => {
   db
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})