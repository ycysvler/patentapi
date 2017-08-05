var express = require('express');
let mysql = require('mysql');
let User = require('../mysql/user');
var router = express.Router();

/* GET users listing. */
router.post('/', (req, res, next)=> {
    let user = new User();
    user.list((results)=> {
        res.send(results);
    });
});


module.exports = router;