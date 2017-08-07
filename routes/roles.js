var express = require('express');
let mysql = require('mysql');
let Role = require('../mysql/role');
var router = express.Router();
let uuid = require('uuid');



let role = new Role();

/* 查询所有角色. */
router.get('/', (req, res, next)=> {
    role.list((results)=> {
        res.send(results);
    });
});

/* 根据用户ID查询用户 */
router.get('/:id', (req, res, next)=> {
    role.single(req.params.id,(code, role)=> {
        res.send(code, role);
    });
});


/*根据角色名称查询用户 */
router.get('/rolename/:rolename', (req, res, next)=> {
    role.singleByRoleName(req.params.rolename,(code, role)=> {
        res.send(code, role);
    });
});
/* 新建role */
router.post('/', (req, res, next)=> {

    let data = req.body;
    data.roleid = uuid.v1();

    role.create(data,function(code,data){
        res.send(code,data);
    });
});
/* 删除role */
router.delete('/:id',(req, res, next)=>{
    role.remove( req.params.id , function (code, err) {
        res.send(code, err);
    });
});

module.exports = router;