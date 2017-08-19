/**
 * Created by ZZY on 2017/8/6.
 */
var pool = require('./pool');

module.exports = class Role {
    constructor() {
        this.role = null;
    }

    /* 获取角色列表 */
    list(callback) {
        var sql = 'select * from role';
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }

    /* 获取单个用户信息 */
    single(roleid, callback) {
        var sql = 'select * from role where roleid=?';

        // 用pool查数据库
        pool.query(sql, [roleid], function (error, rows, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                if (rows.length > 0)
                    callback(200,rows[0]);
                else{
                    callback(404,null);
                }
            }
        });
    }

    /* 判断角色名是否重复 */
    singleByRoleName(rolename, callback) {
        var sql = 'select * from role where rolename=?';
        console.log('rolename', rolename);
        // 用pool查数据库
        pool.query(sql, [rolename], function (error, rows, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                if(rows.length > 0){
                    callback(200, rows[0]);
                }else{
                    callback(404, null);
                }
            }
        }.bind(this));
    }

    /* create new roles */
    create(role, callback) {
        var sql = 'INSERT role SET ?';

        this.singleByRoleName(role.rolename, function (code, data) {
            if (code === 200) {
                callback(500, role.rolename + "角色已存在，不可以重复创建！");
            } else {
                pool.query(sql, role, function (error, results, fields) {
                    if (error) {
                        console.error('error query: ' + error.stack);
                        callback(500, error.stack);
                    }
                    else {
                        callback(200, role);
                    }
                });
            }
        })
    }

    /* delete roles */
    remove(id, callback) {
        var sql = 'delete from role where roleid in (?)';
        pool.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500,error.stack);
            }
            else {
                callback(200,null);
            }
        }.bind(this));

        var sql1 = "delete from map_role_user where roleid in (?)";
        var sql2 = "delete from map_role_resoure where roleid in (?) ";

        pool.query(sql1,[id],function(error,results,fields){});
        pool.query(sql2,[id],function(error,results,fields){});
    }
}

