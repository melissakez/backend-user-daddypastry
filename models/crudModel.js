const pool = require("../config/db.js");

exports.getmenu = () => {
  return new Promise(function (resolve, reject) {
    var sql = "select * from menu";
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.checkoutHead = (data) => {
  console.log(data);
  var dataCart = {
    user_id: data.user_id,
  };

  var dataCartTrans = {
    cart_id: 0,
    menu_id: data.menu_id,
    quantity: data.menu_qty,
  };

  console.log(dataCart);

  return new Promise(function (resolve, reject) {
    var sql = "insert into cart set ?";
    pool.query(sql, [dataCart], (err, result) => {
      if (err) reject(err);

      var sql = `select Id from cart where user_id ='${dataCart.user_id}' order by Id DESC LIMIT 1`;
      pool.query(sql, [dataCart], (err, result) => {
        if (err) reject(err);

        dataCartTrans.cart_id = result[0].Id;
        console.log("Cart id");
        console.log(dataCartTrans);

        console.log("Trans");
        console.log(dataCartTrans.cart_id);
        console.log(dataCartTrans.quantity[0]);
        console.log(dataCartTrans.quantity[1]);
        for (let i = 0; i < dataCartTrans.menu_id.length; i++) {
          var sql = `insert into cart_transaction(cart_id, menu_id, quantity, status) values(${dataCartTrans.cart_id},${dataCartTrans.menu_id[i]},${dataCartTrans.quantity[i]}, 'pending')`;
          pool.query(sql, [dataCartTrans], (err, result) => {
            if (err) reject(err);

            resolve(true);
          });
        }
      });
    });

    // setTimeout(function () {

    //     if(dataCartTrans.cart_id){
    //         console.log("Trans")
    //         console.log(dataCartTrans.cart_id)
    //         console.log(dataCartTrans.menu_id[0])
    //         for (let i = 0; i < dataCartTrans.menu_id.length; i++) {
    //             var sql = `insert into cart_transaction(cart_id, menu_id, quantity) values(${dataCartTrans.cart_id},${dataCartTrans.menu_id[i]},${dataCartTrans.quantity[i]})`;
    //             pool.query(sql, [dataCartTrans], (err, result)=> {
    //             if (err) reject(err);

    //             resolve(true);
    //             });
    //         }
    //     }

    // }, 5000);
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
