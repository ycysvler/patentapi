/**
 * Created by yanggang on 2017/3/6.
 */
var pool = require('./pool');

module.exports = class User  {
    constructor() {
        this.user = null;
    }

    list(callback) {
        var sql =  'select * from user';

        pool.query(sql,[],function(error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
            } else {
                callback(results);
            }
        }.bind(this))
    }
    create(post, callback) {
        var sql = 'INSERT user SET ?';

        pool.query(sql, post, function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else{
                callback(true);
            }
        }.bind(this));
    }
    remove(id,callback){
        var sql = 'delete from user where userid= ?';

        pool.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else{
                callback(true);
            }
        }.bind(this));
    }

    signin(name,password,callback) {
        var sql = 'SELECT * FROM user WHERE name = ? AND password = ?';
        pool.query(sql, [name,password], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(500);
            } else {
                if(results.length == 0) {
                    callback(404);
                } else {
                    this.user = results[0];
                    callback(200);
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
        pool.query(sql, [post,post.id], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else{
                callback(true);
            }
        }.bind(this));
    }
    changePassword(appKey, id, name, newPassword, callback) {
        var sql = 'UPDATE base_user SET ? WHERE id = ? AND portal_id = (SELECT id FROM app_product WHERE appKey = ?)';
        //重新生成密码
        var salt = this.generateSalt(5);
        var password = this.generatePassword(name,newPassword,salt);
        var post = {
            password:password,
            salt:salt
        };
        pool.query(sql, [post,id,appKey], function (error, results, fields) {
            if (error) {
                console.error('error query: ' + error.stack);
                callback(false);
            }
            else{
                callback(true);
            }
        }.bind(this));
    }
}






