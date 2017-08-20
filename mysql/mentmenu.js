var pool = require('./pool');

module.exports = class Mentmenu {
    constructor() {
        this.Mentmenu = null;
    }


    /* 获取角色列表 */
    list(userid,callback) {
        var sql = 'select mrr.rid ,re.rname ,re.url,re.parentid from map_role_resoure as mrr,map_role_user as mru,resource as re where mrr.rid=re.rid and mru.roleid = mrr.roleid and mru.userid=? order by re.order';
        // 用pool查数据库
        pool.query(sql, [userid], function (error, rows, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(200, rows);
            }
        }.bind(this));

    }

}