var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    add: function (user, callback) {
        pool.query(userSqlMap.add, [user.username, user.password,user.node], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    list: function (callback) {
        pool.query(userSqlMap.list, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getById: function (id, callback) {
        pool.query(userSqlMap.getById, id, function (error, result) {
            if (error) throw error;
            console.log(result[0]);
            callback(result[0]);
        });
    },
    getByUsername: function (username, callback) {
        pool.query(userSqlMap.getByUsername, username, function (error, result) {
            if (error) throw error;
            console.log(result);
            callback(result);
        });
    },
    deleteById: function (id, callback) {
        pool.query(userSqlMap.deleteById, id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update: function (user, callback) {
        pool.query(userSqlMap.update, [user.username, user.password,user.node, user.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};
