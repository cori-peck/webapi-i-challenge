// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
});


// C - Create
server.post('/api/users', (req, res) => {
    console.log(req.body)
    const { name, bio } = req.body;
    const user = { name, bio }
    if (!name || !bio) {
        return res
        .status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

        db
        .insert(user)
        .then(userId => {
            const { id } = userId;

            db
            .findById(id)
            .then(user => {
                res.status(201).json({ user });
            })
        })
        .catch(error => res.status(500).json({ error: "There was an errorwhile saving the user to the database."}));
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


// U - Update
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
  
    const { name, bio } = req.body;
    const newUser = { name, bio };
  
    if (!name || !bio) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  
    db.findById(id)
      .then(user => {
        if (user) {
          db.update(id, newUser)
            .then(user => {
              db.findById(id).then(user => {
                res.status(200).json({ user });
              });
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: "The user information could not be modified." });
            });
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      });
  });
