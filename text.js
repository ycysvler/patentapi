/**
 * Created by VLER on 2017/8/19.
 */
console.log('trest');

var datas = [
    {rid:'01',rname:'系统管理',parentid:'0'},
    {rid:'02',rname:'图像检索',parentid:'0'},
    {rid:'0101',rname:'用户管理',parentid:'01'},
    {rid:'0102',rname:'觉色管理',parentid:'01'},
    {rid:'010101',rname:'用户列表',parentid:'0101'},
    {rid:'01010101',rname:'分配权限',parentid:'010101'},
    {rid:'010102',rname:'新建用户',parentid:'0101'},
    {rid:'010201',rname:'角色列表',parentid:'0102'}
];


function getMenuItemsByParentId(id){
    let menus = [];

    for(var key in datas){
        let data = datas[key];

        if(data.parentid === id){
            menus.push(data);
        }
    }
    return menus;
}

let level_menus = getMenuItemsByParentId('0');

for(let key in level_menus){
    let menu = level_menus[key];
    buildTree(menu);
}

function  buildTree(menu){
    menu.children = getMenuItemsByParentId(menu.rid);

    for(let key in menu.children){
        let item = menu.children[key];
        buildTree(item);
    }
}

console.log(JSON.stringify(level_menus));