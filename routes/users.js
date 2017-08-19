var express = require('express');
let mysql = require('mysql');
let User = require('../mysql/user');
let uuid = require('uuid');

var router = express.Router();

let user = new User();

/* 查询所有用户. */
router.get('/', (req, res, next)=> {
    user.list((results)=> {
        res.send(results);
    });
});

/* 根据用户ID查询用户 */
router.get('/:id', (req, res, next)=> {
    user.single(req.params.id,(code, user)=> {
        res.send(code, user);
    });
});

/*根据用户名称查询用户 */
router.get('/username/:username', (req, res, next)=> {
    user.singleByUserName(req.params.username,(code, user)=> {
        res.send(code, user);
    });
});

/* 新建用户 */
router.post('/', (req, res, next)=> {
    let data = req.body;
    // 服务器生成UUID
    data.userid = uuid.v1();
    user.create(data,function(code,data){
        res.send(code,data);
    });
});

/* 修改 user. */
router.put('/:id', (req, res, next)=> {
    let data = req.body;
    // 不让修改用户id，用户名
    delete data.userid;
    delete data.username;

    user.modifyUser(data,req.params.id, function(code, err){
        res.send(code, err);
    });
});

/* 删除用户 */
router.delete('/',(req, res, next)=>{
    console.log(req.body);
    user.remove( req.body , function (code, err) {
        res.send(code, err);
    });
});


/* 修改密码. */
router.put('/:id/password', (req, res, next)=> {
    let data = {password:req.body.password};

    user.changePassword(data,req.params.id, function(code, err){
        res.send(code, err);
    });
});

module.exports = router;
