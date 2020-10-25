const pool = require('../config/db.js');

exports.getmenu = () => {
    return new Promise(function(resolve, reject) {
        var sql = 'select * from menu';
        pool.query(sql, (err, result)=> {
            if (err) reject(err);

            resolve(result);
        });
    });
};

exports.checkoutHead = (data) => {
    return new Promise(function(resolve, reject) {
        var dataCart = {
            userid : data.body.user_id
        }

        var sql = 'insert into cart set ?';
        pool.query(sql, [dataCart], (err, result)=> {
            if (err) reject(err);

            resolve(true);
        });
    });
};

// exports.checkoutTrans = (data) => {
//     return new Promise(function(resolve, reject) {
//         var sql = 'insert into cart_transaction set ?';
//         pool.query(sql, [data], (err, result)=> {
//             if (err) reject(err);

//             resolve(true);
//         });
//     });
// };



// exports.select = () => {
//     return new Promise(function(resolve, reject) {
//         var sql = 'select * from product';
//         pool.query(sql, (err, result)=> {
//             if (err) reject(err);

//             resolve(result);
//         })
//     });
// };

// exports.cart = (ids) => {
//     if (ids.length > 0) ids = ids.join(', ');
//     else ids = '0';

//     return new Promise(function(resolve, reject) {
//         var sql = `select * from product where id in (${ids})`;
//         pool.query(sql, (err, result)=> {
//             if (err) reject(err);

//             resolve(result);
//         })
//     });
// };

// exports.delete = (data) => {
//     return new Promise(function(resolve, reject) {
//         var id = data.id;
//         var sql = 'delete from product where id = ?';
//         pool.query(sql, [id], (err, result)=> {
//             if (err) reject(err);

//             resolve(true);
//         })
//     });
// };

// exports.selectbyID = (id) => {
//     return new Promise(function(resolve, reject) {
//         var sql = `select * from product where id = ${id}`;
//         pool.query(sql, (err, result)=> {
//             if (err) reject(err);

//             resolve(result[0]);
//         })
//     });
// };
