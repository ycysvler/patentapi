/**
 * Created by ZZY on 2017/8/7.
 */

var pool = require('./pool');

module.exports = class Maproleresoure {
    constructor() {
        this.maprolesoure = null;
    }


    /* 获取关联信息 用于ID*/
    /*list(callback) {
        var sql = 'select * from map_role_resoure where roleid = ?';
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }*/

    /* 获取关联信息 用于ID*/
    listByRoleID(roleid, callback) {
        var sql = 'select * from map_role_resoure where roleid = ?';

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
        console.log(maprolesoure.length, maprolesoure);
        if (maprolesoure.length === 0) {
            callback(304, '您为算了的范围可分为！');
        } else {
            var del = 'DELETE from map_role_resoure where roleid=?';
            pool.query(del, maprolesoure[0].roleid, function (error, results, fields) {
                if (error) {
                    console.error('error query: ' + error.stack);
                    callback(500, error.stack);
                }
                else {
                    var sql = 'INSERT map_role_resoure(roleid,rid) values ';

                    for(var index in maprolesoure){
                        let item = maprolesoure[index];
                        sql += "('" + item.roleid + "','" + item.rid + "'),";
                    }

                    sql = sql.substring(0,sql.length -1);
                    console.log('sql:', sql);

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
            });

        }

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








