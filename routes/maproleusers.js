
var express = require('express');
let mysql = require('mysql');
let Maproleuser = require('../mysql/maproleuser');
var router = express.Router();




let maproleuser = new Maproleuser();

/* 查询所有角色. */
router.get('/', (req, res, next)=> {
    maproleuser.list((results)=> {
        res.send(results);
    });
});

/* 根据用户ID查询用户 */
router.get('/:id', (req, res, next)=> {
    maproleuser.listByRoleId(req.params.id,(code, maproleuser)=> {
        res.send(code, maproleuser);
    });
});

/* 新建maproleuser */
router.post('/', (req, res, next)=> {
    maproleuser.create(req.body,function(code,data){
        res.send(code,data);
    });
});


/* 删除maproleuser */
router.delete('/:id',(req, res, next)=>{
    maproleuser.remove( req.params.id , function (code, err) {
        res.send(code, err);
    });
});


module.exports = router;
