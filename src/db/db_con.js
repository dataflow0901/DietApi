const mysql = require('mysql');
const config = require('./db_info')();

module.exports = function() {
    return {
        init: function () {
            return mysql.createConnection(config);
        },
      
        test_open: function (con) {
            con.connect(function (err) {
                if (err) {
                console.error('mysql connection error :' + err);
                } else {
                console.info('mysql is connected successfully.');
                }
            })
        },
    }

}



