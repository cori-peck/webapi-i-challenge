// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
});


// C - Create
server.post('/api/users', (req, res) => {
    console.log(req.body)
    const { name, bio } = req.body;
    if (!{ name, bio }) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    if({ name, bio}) {
        db
        .insert({ name, bio })
        .then(res => {
            res.status(201).json(res)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database."})
    })} else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})


// R - Read
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