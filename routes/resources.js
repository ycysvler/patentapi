var express = require('express');
let mysql = require('mysql');
let Resoure = require('../mysql/resource');
var router = express.Router();
let uuid = require('uuid');


let resource = new Resoure();

/* 查询所有角色. */
router.get('/', (req, res, next)=> {
    resource.list((results)=> {
        res.send(results);
    });
});

/* resource */
router.post('/', (req, res, next)=> {
    resource.create(req.body,function(code,data){
        res.send(code,data);
    });
});
module.exports = router;