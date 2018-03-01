const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
// const mongoose = require('mongoose');

// const User = require('../models/orders');
// mariaDB API
const Client = require('mariasql');

const c = new Client({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    db: 'laraticles'
});

// c.query('SELECT * FROM users WHERE id = :id AND name = :name',
//     function (err, rows) {
//         if (err)
//             throw err;
//         console.dir(rows);
//     });

router.get('/', (req, res, next) => {
    c.query('SELECT * FROM users',
        function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({
                    message: 'List of user',
                    users: rows
                })
            }
        })
});
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    c.query('SELECT * FROM users WHERE id = ' + id, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                message: 'One User',
                users: rows
            })
        }
    })
})

router.post('/', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    var passwordhash = bcrypt.hashSync(password);
    // INSERT INTO person SET first_name = 'John', last_name = 'Doe';
    const query = 'INSERT INTO users SET name = "' + name + '", email = "' + email + '", password = "' + passwordhash + '"'
    console.log(query)
    c.query(query ,
        function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({
                    message: 'User Created !',
                    users: rows
                })
            }
        })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = 'DELETE FROM users WHERE id = ' + id;
    c.query(query, function (err, rows) {
        if (err){
            console.log(err);
        }else{
            res.status(200).json({
                message: 'User Deleted !',
                users: rows
            })
        }
    })
})

module.exports = router;