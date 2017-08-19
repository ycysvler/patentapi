
var express = require('express');
let mysql = require('mysql');
let Maproleresoure = require('../mysql/maproleresoure');
var router = express.Router();


let maproleresoure = new Maproleresoure();

/*
/!* 查询所有角色. *!/
router.get('/', (req, res, next)=> {
    maproleresoure.list((results)=> {
        res.send(results);
    });
});
*/

/* 根据用户ID查询用户 */
router.get('/:id', (req, res, next)=> {
    maproleresoure.listByRoleID(req.params.id,(code, maproleresoure)=> {
        res.send(code, maproleresoure);
    });
});

/* 新建maproleuser */
router.post('/', (req, res, next)=> {
    maproleresoure.create(req.body,function(code,data){
        res.send(code,data);
    });
});


/* 删除maproleuser */
router.delete('/:id',(req, res, next)=>{
    maproleresoure.remove( req.params.id , function (code, err) {
        res.send(code, err);
    });
});


module.exports = router;
