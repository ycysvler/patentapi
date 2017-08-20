var express = require('express');
let mysql = require('mysql');
let Mentmenu = require('../mysql/mentmenu');
var router = express.Router();


let resource = new Mentmenu();


function getMenuItemsByParentId(id, resources) {
    let menus = [];
    for (var key in resources) {
        let data = resources[key];

        if (data.parentid === id) {
            menus.push((data));
        }
    }
    return menus;
}

function buildTree(menu, resources) {
    menu.children = getMenuItemsByParentId(menu.rid, resources);

    for (let key in menu.children) {
        let item = menu.children[key];
        buildTree(item,resources);
    }
}

router.get('/:id', (req, res, next) => {
    resource.list(req.params.id, (code, results) => {
        getMenuItemsByParentId(results.rid, results);
        let level_meuns = getMenuItemsByParentId('0',results);

        for (let key in level_meuns) {
            let menu = level_meuns[key];
            buildTree(menu,results);
        }
        res.send(code, {code:200,data:level_meuns});
    });
});

module.exports = router;