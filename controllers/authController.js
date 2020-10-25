const authModel = require('../models/authModel');
const jwt = require('../lib/jwt');
const bcrypt = require('../lib/bcrypt');

exports.register = async (req, res) => {

    var data = {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        instagram: req.body.instagram, 
        password: req.body.password
    }

    let result = authModel.register(data);
    result.then(function(result){
        res.json({
            status: 200,
            success: true
        });
    }).catch(function(err){
        res.json({
            status: 500,
            success: false,
            message: err
        })
    })
}

exports.login = async (req, res) => {
    let userID = authModel.Login(req.body.email, req.body.password);
    userID.then(function(result){
        if (result.length > 0){
            // berhasil login
            let data = {
                user_signin: result[0].id,
                email: result[0].email
            }

            let token = jwt.Encode(data);

            res.json({
                code: 200,
                success: true,
                id: result[0].id,
                token
            })
        } else {
            // gagal login
            console.log(result);
            res.json({
                code: 500,
                success: false
            })
        }
    }).catch(function(err){
        console.log(err);
        res.json({
            code: 500,
            success: false
        })
    })
}

exports.admindata = async (req, res) => {
    let data = jwt.Decode(req.body.token);

    res.json({
        code: 200,
        success: true,
        return : data
    })
}
