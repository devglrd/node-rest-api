const express = require('express');
const router = express.Router();
const fs = require('fs');
// const mongoose = require('mongoose');


router.get('/', function(req, res) {
    // res.writeHead(200, {'Content-Type' : 'text/html'});
    // fs.readFile('../../views/index.html', null, (error, data) => {
    //     if (error){
    //         res.writeHead(404);
    //         res.write('File Not Found')
    //     }else {
    //         res.write(data)
    //     }
    //     res.end()
    // })

    res.render('index', {user:"John Smith"})
});

module.exports = router;