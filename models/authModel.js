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

exports.Login = (email, password) => {
    return new Promise(function(resolve, reject) {
        var sql = `select id, email from user_signin where email = '${email}' and password = '${password}'`;
        pool.query(sql, (err, result)=> {
            if (err) reject(err);

            resolve(result);
        });
    });
};
