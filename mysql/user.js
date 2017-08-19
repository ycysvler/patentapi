/**
 * Created by yanggang on 2017/3/6.
 */
var pool = require('./pool');

module.exports = class User {
    constructor() {
        this.user = null;
    }

    /* 获取用户列表 */
    list(callback) {
        var sql = 'select u.userid, u.icon, u.username, u.cname, mru.roleid , r.rolename from user u left join map_role_user mru on u.userid = mru.userid left join role r on mru.roleid = r.roleid';


        console.log(sql);
        // 用pool查数据库
        pool.query(sql, [], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this));
    }

    /*
     * 通过用户ID获取用户信息
     * userid : 用户ID
     * callback : 回调函数（code:200 成功，500 内部错误）
     * */
    single(userid, callback) {
        var sql = 'select * from user where userid=?';

        // 用pool查数据库
        pool.query(sql, [userid], function (error, rows, fields) {
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

    /*
     * 通过用户名获取用户信息
     * username : 用户名
     * callback : 回调函数（code:200 成功，500 内部错误）
     * */
    singleByUserName(username, callback) {
        var sql = 'select * from user where username=?';

        // 用pool查数据库
        pool.query(sql, [username], function (error, rows, fields) {
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

    /*
     * 创建用户
     * user : 用户
     * callback : 回调函数（code:200 成功，500 内部错误）
     * */
    create(user, callback) {
        var sql = 'INSERT user SET ?';

        this.singleByUserName(user.username, function (code, data) {
            if (code === 200) {
                callback(500, user.username + "用户已存在，不可以重复创建！");
            } else {
                pool.query(sql, user, function (error, results, fields) {
                    if (error) {
                        console.error('error query: ' + error.stack);
                        callback(500, error.stack);
                    }
                    else {
                        callback(200, user);
                    }
                });
            }
        })
    }
    /*
    * 删除用户
    * id : 用户id
    * callback : 回调函数（code:200 成功，500 内部错误）
    * */
    remove(ids, callback) {
        var sql = 'delete from user where userid in (?)';

        pool.query(sql, [ids], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500,error.stack);
            }
            else {
                callback(200,null);
            }
        }.bind(this));
    }
    /*
    * 登录
    * name : 用户名
    * password : 密码
    * callback : 回调函数（code:200 成功，404 查不到用户，500 内部错误）
    * */
    signin(name, password, callback) {
        console.log(name, password);
        var sql = 'SELECT userid,username,cname,icon FROM user WHERE username = ? AND password = ? limit 1';
        pool.query(sql, [name, password], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500);
            } else {
                if (results.length == 0) {
                    callback(404);
                } else {
                    this.user = results[0];
                    callback(200, this.user);
                }
            }
        }.bind(this));
    }
    /* 修改用户信息 */
    modifyUser(user, userid , callback) {

        var sql = 'UPDATE user SET ? WHERE userid = ?';
        pool.query(sql, [user,userid], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500, error.stack);
            }
            else {
                console.log(results);
                callback(200,null);
            }
        }.bind(this));
    }
    /* 修改密码 */
    changePassword(user, id,  callback) {
        var sql = 'UPDATE user SET ? WHERE userid = ?';

        pool.query(sql, [user, id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500, error.stack);
            }
            else {
                callback(200,null);
            }
        }.bind(this));
    }
}






