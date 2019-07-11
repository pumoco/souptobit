'use strict'

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/**
 * Save badges to database
 * @param {array} badges
 * @param {Function} callback
 */
module.exports.save = function(badges, callback){
    if(!badges.length) return callback(null, null);
    var badge = badges.pop();
    redis.lpush('badges', JSON.stringify(badge), function (err) {
        if (err) return callback(err, null);
        module.exports.save(badges, callback);
    });

};

/**
 * Trim Down redis list
 */
module.exports.trim = function(){
    redis.ltrim('badges', 0, 9);
};
/**
 * Send out badges to the broadcasters
 * @param {array} badges
 * @param {function} callback 
 */

 module.exports.send = function(badges, callback) {
     badges.forEach(broadcast.send);
     callback(null, null);

 };

 /**
  * get badges from redis
  * @param {function} callback
  * 
  */

  module.exports.get = function (callback){
      redis.lrange('badges', 0, -1, function(err, data){
          if(err) return callback(err, null);
        callback(null, data).map(JSON.parse);

      });
  };
