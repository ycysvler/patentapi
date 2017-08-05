var express = require('express');
let Role = require('../db/role');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=> {
    let user = new User();
    user.list((results)=> {
        res.send(results);
    });
});

router.get('/:id', (req, res, next)=> {
    let db = mysql.createConnection({host: '127.0.0.1', user: 'root', password: 'root', database: 'patentdb'});
    db.query("select * from log limit 10", [], function (err, rows) {
        res.json(rows);
    });
    //res.send('respond with a ' + req.params.id);
});

router.post('/', (req, res, next)=> {
    let role = new Role();
    role.create(req.body, (results)=> {
        res.send(results);
    });
});

router.delete('/:id',(req, res, next)=>{
    let user = new User();
    user.remove(req.params.id,(results)=>{
        res.send(results);
    })
});

module.exports = router;