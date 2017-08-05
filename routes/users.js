var express = require('express');
let mysql = require('mysql');
let User = require('../mysql/user');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=> {
    let user = new User();
    user.list((results)=> {
        res.send(results);
    });
});

/* GET single user. */
router.get('/:id', (req, res, next)=> {
    User.findOne({userid:req.params.id},function(err, user){
        res.send(user);
    });
});

/* create new user. */
router.post('/', (req, res, next)=> {
    let user = new User(req.body);
    user.save(function(err, user){
        res.send(user);
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
