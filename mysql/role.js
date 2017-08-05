/**
 * Created by ZHQ on 2017/8/3.
 */

var mongoose = require('mongoose');

module.exports = class Role {
    constructor() {
        var promise = mongoose.connect('mongodb://localhost/test', {
            useMongoClient: true
        });

        promise.then(function(db) {
            //Use `db`, for instance `db.model()`
        });

        this.kittySchema =new mongoose.Schema({
            name: String,
            old:Number,
            bd:Date
        });

        this.Kitten = mongoose.model('Kitten', this.kittySchema);
    }

    create(post, callback){
        var fluffy = new this.Kitten(post);
 ;
        var promise = fluffy.save();
        promise.then(function (doc) {
            callback(doc);
        });
    }
}

