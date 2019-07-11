'use strict'

var _ = require('underscore');
var model = require('../models/badges');

/**
 * save badges to model
 */

module.exports.save = function(req, res, next) {

    var badges = _.clone(req.body);
    model.save(badges, function(err){
        if(err) return res.json(503, { error: true});
        next();
        model.trim();
    });
};

/**
 * send badges to pub/sub socket in model
 */
module.exports.send = function(req, res, next) {
var badges = _.clone(req.body);
model.send(badges, function(err){
    if (err) return res.json(503, {
        error: true
    });
    res.json(200, {error: null});
});

};

/**
 * get 10 badges from model
 */
module.exports.get = function(req, res){
    model.get(function(err, data){
            if (err) return res.json(503, {error: true});

            res.json(200, data);

    });
}