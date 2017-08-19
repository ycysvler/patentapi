/**
 * Created by ZZY on 2017/8/6.
 */

var pool = require('./pool');

module.exports = class Maproleuser {
    constructor() {
        this.maproleuser = null;
    }


    /* 获取角色列表 */
    list(callback) {
        var sql = 'select m.roleid, u.userid,u.username,u.cname, u.icon from map_role_user as m,user as u where m.userid = u.userid';
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }

    /* 获取关联角色信息 */
    listByRoleId(roleid, callback) {
        var sql = 'select m.roleid, u.userid,u.username,u.cname, u.icon from map_role_user as m,user as u where m.userid = u.userid and m.roleid=?';

        // 用pool查数据库
        pool.query(sql, [roleid], function (error, rows, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(200, rows);
            }
        });
    }


    /* 新建角色列表 */
       create(maproleuser, callback) {
        console.log(maproleuser.length, maproleuser);
        if (maproleuser.length === 0) {
            callback(304, '您为算了的范围可分为！');
        } else {
            var del = 'DELETE from map_role_user where roleid=?';
            pool.query(del, maproleuser[0].roleid, function (error, results, fields) {
                if (error) {
                    console.error('error query: ' + error.stack);
                    callback(500, error.stack);
                }
                else {
                    var sql = 'INSERT map_role_user(roleid,userid) values ';

                    for(var index in maproleuser){
                        let item = maproleuser[index];
                        sql += "('" + item.roleid + "','" + item.userid + "'),";
                    }

                    sql = sql.substring(0,sql.length -1);
                    console.log('sql:', sql);

                    pool.query(sql, maproleuser, function (error, results, fields) {
                        if (error) {
                            console.error('error query: ' + error.stack);
                            callback(500, error.stack);
                        }
                        else {
                            callback(200, maproleuser);
                        }
                    });
                }
            });

        }

    }


    /* 删除角色列表 */
    remove(id, callback) {
        var sql = 'delete from map_role_user where roleid= ?';

        pool.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500, error.stack);
            }
            else {
                callback(200, null);
            }
        }.bind(this));
    }


}








