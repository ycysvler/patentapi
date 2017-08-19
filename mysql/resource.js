/**
 * Created by ZZY on 2017/8/6.
 */

var pool = require('./pool');

module.exports = class Resoure {
    constructor() {
        this.resoure = null;
    }


    /* 获取列表 */
    list(callback) {
        var sql = 'select * from resource';
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }



    /* 新建角色列表 */
    create(resoure, callback) {
        console.log(resoure.length, resoure);
        if (resoure.length === 0) {
            callback(304, '您为算了的范围可分为！');
        } else {
            var del = 'DELETE from map_role_resourer where roleid=?';
            pool.query(del, resoure[0].roleid, function (error, results, fields) {
                if (error) {
                    console.error('error query: ' + error.stack);
                    callback(500, error.stack);
                }
                else {
                    var sql = 'INSERT map_role_resoure(roleid,rid) values ';

                    for(var index in resoure){
                        let item = resoure[index];
                        sql += "('" + item.roleid + "','" + item.rid + "'),";
                    }

                    sql = sql.substring(0,sql.length -1);
                    console.log('sql:', sql);

                    pool.query(sql, resoure, function (error, results, fields) {
                        if (error) {
                            console.error('error query: ' + error.stack);
                            callback(500, error.stack);
                        }
                        else {
                            callback(200, resoure);
                        }
                    });
                }
            });

        }

    }
}