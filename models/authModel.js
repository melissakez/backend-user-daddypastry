const pool = require('../config/db.js');

exports.register = (data) => {
    return new Promise(function(resolve, reject) {
        var sql = 'insert into user_signin set ?';
        pool.query(sql, [data], (err, result)=> {
            if (err) reject(err);

            resolve(true);
        });
    });
};

exports.Login = (username, password) => {
    return new Promise(function(resolve, reject) {
        var sql = `select id, username from admin_login where username = '${username}' and password = '${password}'`;
        pool.query(sql, (err, result)=> {
            if (err) reject(err);

            resolve(result);
        });
    });
};
