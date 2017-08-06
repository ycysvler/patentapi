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
    data.userid = uuid.v1();

    user.create(data,function(code,data){
        res.send(code,data);
    });
});

/* 修改 user. */
router.put('/:id', (req, res, next)=> {
    User.findOneAndUpdate({userid:req.params.id},req.body, function(err, user){
        res.send(user);
    });
});

/* 删除用户 */
router.delete('/:id',(req, res, next)=>{
    User.remove({ userid:req.params.id }, function (err) {
        if (err) return handleError(err);
        res.send(true);
    });
});

module.exports = router;
