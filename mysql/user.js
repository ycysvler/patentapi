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
        var sql = 'select * from user';
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

    /* 判断用户名是否重复 */
    singleByUserName(username, callback) {
        var sql = 'select * from user where username=?';
        console.log('username', username);
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

    /* create new user. */
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

    remove(id, callback) {
        var sql = 'delete from user where userid= ?';

        pool.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else {
                callback(true);
            }
        }.bind(this));
    }

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

    validatePassword(password) {
        var genpassword = this.generatePassword(this.user.name, password, this.user.salt);
        return (genpassword == this.user.password)
    }

    generatePassword(username, password, salt) {
        var res = '';

        var hash1 = crypto.createHash('sha1');
        hash1.update(username + password);
        res = hash1.digest('hex').toUpperCase();

        var hash2 = crypto.createHash('sha1');
        hash2.update(res + salt);
        res = hash2.digest('hex').toUpperCase();

        return res;
    }

    generateSalt(len) {
        len = len || 6;
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    modifyUser(post, callback) {
        var sql = 'UPDATE base_user SET ? WHERE id = ?';
        pool.query(sql, [post, post.id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else {
                callback(true);
            }
        }.bind(this));
    }

    changePassword(appKey, id, name, newPassword, callback) {
        var sql = 'UPDATE base_user SET ? WHERE id = ? AND portal_id = (SELECT id FROM app_product WHERE appKey = ?)';
        //重新生成密码
        var salt = this.generateSalt(5);
        var password = this.generatePassword(name, newPassword, salt);
        var post = {
            password: password,
            salt: salt
        };
        pool.query(sql, [post, id, appKey], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else {
                callback(true);
            }
        }.bind(this));
    }
}






