var express = require('express');
let mysql = require('mysql');
let User = require('../mysql/user');
let uuid = require('uuid');

var router = express.Router();

/* GET users listing. */
router.post('/', (req, res, next)=> {
    let user = new User();
    console.log(req.body);
    user.signin(req.body.username, req.body.password,(code,user)=>{
        console.log(code);
        if(code === 200){
            // 这里还没有保存redis
            // 保存内容 uuid + ip
            user.token = uuid.v1();
        }
        res.send(code, user);
    });
});


module.exports = router;