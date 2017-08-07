/**
 * Created by ZZY on 2017/8/7.
 */

var pool = require('./pool');

module.exports = class Maproleresoure {
    constructor() {
        this.maprolesoure = null;
    }


    /* 获取列表 */
    list(callback) {
        var sql = 'select m.roleid,r.rid,r.rname,r.url,r.parentid,r.`order`,r.icon from patentdb.map_role_resoure as m,resource as r where m.rid = r.rid';
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }

    /* 获取关联信息 用于ID*/
    listByRoleID(roleid, callback) {
        var sql = 'select m.roleid,r.rid,r.rname,r.url,r.parentid,r.`order`,r.icon from patentdb.map_role_resoure as m,resource as r where m.rid = r.rid and m.roleid=?';

        // 用pool查数据库
        pool.query(sql, [roleid], function (error, rows, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                    callback(200,rows);
            }
        });
    }


    /* 新建角色列表 */
    create(maprolesoure, callback) {

        var sql = 'INSERT map_role_resoure SET ?';
        pool.query(sql, maprolesoure, function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500, error.stack);
            }
            else {
                callback(200, maprolesoure);
            }
        });
    }


    /* 删除角色列表 */
    remove(id, callback) {
        var sql = 'delete from map_role_resoure where roleid= ?';

        pool.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500,error.stack);
            }
            else {
                callback(200,null);
            }
        }.bind(this));
    }


}








