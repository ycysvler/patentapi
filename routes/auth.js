/**
 * 验证http头重是否带有token认证信息
 * Created by ZHQ on 2017/8/2.
 */
module.exports = class Auth {
    constructor() {
    }
    tokenAuth (req, res, next) {
        let url = req.url + "";

        if(url.indexOf('signin') > -1){
            next();
        }else if(req.headers["token"] === undefined){
            // 设置未登录状态码401
            res.status(401);
            res.setHeader("Content-Type","application/json");
            res.end('{"code":401,"data":"未登录"}');
        }else{
            next();
        }
    }
}