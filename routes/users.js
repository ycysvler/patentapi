var express = require('express');
let mysql = require('mysql');
let User = require('../mysql/user');
let uuid = require('uuid');

var router = express.Router();

let user = new User();

/* GET users listing. */
router.get('/', (req, res, next)=> {
    user.list((results)=> {
        res.send(results);
    });
});

/* GET single user. */
router.get('/:id', (req, res, next)=> {
    user.single(req.params.id,(code, user)=> {
        res.send(code, user);
    });
});

/* GET single user. */
router.get('/username/:username', (req, res, next)=> {
    user.singleByUserName(req.params.username,(code, user)=> {
        res.send(code, user);
    });
});

/* create new user. */
router.post('/', (req, res, next)=> {

    let data = req.body;
    data.userid = uuid.v1();

    user.create(data,function(code,data){
        res.send(code,data);
    });
});

/* modify user. */
router.put('/:id', (req, res, next)=> {
    User.findOneAndUpdate({userid:req.params.id},req.body, function(err, user){
        res.send(user);
    });
});

/* delete user. */
router.delete('/:id',(req, res, next)=>{
    User.remove({ userid:req.params.id }, function (err) {
        if (err) return handleError(err);
        res.send(true);
    });
});

module.exports = router;
