const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const async = require('async');
var db = require('../lib/db.js');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    //console.log("auth <");
    res.status(200).json({
        _id: req.session.user_num,
        isAdmin: req.session.authority === 0 ? true : false , 
        isAuth: true,
        email: req.session.id,
        name: req.session.user_name,
        nickname: req.session.user_nickname,
        // role: req.session.role,
        // image: req.session.image,
        cart: req.session.cart,
        history: req.session.history

        

        // _id: req.user._id,
        // isAdmin: req.user.role === 0 ? false : true,
        // isAuth: true,
        // email: req.user.email,
        // name: req.user.name,
        // lastname: req.user.lastname,
        // role: req.user.role,
        // image: req.user.image,
        // cart: req.user.cart,
        // history: req.user.history
    });
});

router.post("/register", (req, res) => {

    //console.log(req.body)

    var email = req.body.email;  //아이디로 사용
    var lastName = req.body.lastName;   //닉네임으로 사용
    var name = req.body.name;   //이름으로 사용
    var password = req.body.password;

    // INSERT INTO `user` (`user_num`, `user_id`, `user_pw`, `user_name`, `user_nickname`, `user_addr`, `user_zip`, `user_phone`, `user_machine`, `user_authority`) 
    // VALUES (NULL, 'ddde', '1', '언', '닉', NULL, '-1', '-1', '0', '0');

    db.db.query(`INSERT INTO user 
    (user_id, user_pw, user_name, user_nickname, user_zip, user_phone, user_machine, user_authority) 
    VALUES   (?, ?, ?, ?,?, ?, ?, ?)`,
    [email, password, name, lastName, -1,-1,0,0],
    function(error){
        if(error){
            console.log(error);
            return res.json({ success: false, error });
            throw error;
        }
        return res.status(200).json({
            success: true
        });
        // res.writeHead(302, {Location: `/board/community/${filteredId}/0`});
        // res.end();
    }); 

    /*
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
    */
});

router.post("/login", (req, res) => {
    //1 이메일 찾기
    //없으면 반환
    //있으면    비밀번호 비교
    //틀리면 반환
    // 맞으면   쿠키 형태로 반환

    var id = req.body.email;
    var pw = req.body.password;
    console.log(id);
   

    db.db.query(`SELECT user_num FROM user WHERE user_id=?`,
    [id],
    function(error, userid){
        if(error){
            
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
            throw error;
        }
        if(userid == '')
        {
            //console.log("아이디 없음");
            //res.redirect('login_process_noid');
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        }
        else
        {
            db.db.query(`SELECT user_num, user_nickname, user_authority FROM user WHERE user_id=? AND user_pw=? `,
            [id, pw],
            function(error, login_res){
                if(error){
                    return res.json({ loginSuccess: false, message: "Wrong password" });
                    throw error;
                }
                if(login_res == '')//비번틀림
                {
                    return res.json({ loginSuccess: false, message: "Wrong password" });
                    //res.redirect('login_process_nopw');
                }
                else
                {
                    if(req.body.user_authority == 2) req.session.authority = true;
                    req.session.id = req.body.email;
                    req.session.user_num = login_res[0].user_num;
                    req.session.user_nickname = login_res[0].user_nickname;
                    req.session.is_Logined = true;
                    req.session.cart = [];
                    req.session.history = [];
                    //console.log(login_res);
                    req.session.save(function(){
                        res
                            
                            .status(200)
                            .json({
                                loginSuccess: true, userId: id
                            });
                    });


                    //동진 코드
                    // login_res.generateToken((err, user) => {
                    //     if (err) return res.status(400).send(err);
                    //     res.cookie("w_authExp", user.tokenExp);
                    //     res
                    //         .cookie("w_auth", user.token)
                    //         .status(200)
                    //         .json({
                    //             loginSuccess: true, userId: user._id
                    //         });
                    // });

                    //내코드
                    // req.session.id = id;
                    // req.session.user_num = login_res[0].user_num;
                    // req.session.user_nickname = login_res[0].user_nickname;
                    // req.session.is_Logined = true;
                    // //console.log(login_res);
                    // req.session.save(function(){
                    //     res.writeHead(302, {Location: `/`});
                    //     res.end();
                    // });

                }
            });

        }
        
    }
    );
    /*
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
    */
});

router.get("/logout", auth, (req, res) => {
    req.session.is_Logined = false;
    console.log("로그아웃 클릭");
    req.session.destroy(function(err){
        if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
    })

    // User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
    //     if (err) return res.json({ success: false, err });
    //     return res.status(200).send({
    //         success: true
    //     });
    // });
});


router.post("/addToCart", auth, (req, res) => {

    //INSERT INTO `cart` (`cart_num`, `cart_user_num`, `cart_item_num`, `cart_item_amount`, `cart_use`) 
    //VALUES ('1', '8', '1', '2', '1');
    var user_num = req.session.user_num;
    var item_num = req.body.productId;
    //console.log(req);

    // SELECT cart_item_amount,item_name, item_price, item_cover  
    // FROM cart join  item on item_num = cart_item_num 
    // WHERE cart_user_num = 8 and cart_use = 1

    //SELECT cart_item_amount FROM cart WHERE cart_user_num=1 and cart_use= 1 and cart_item_num=2

    db.db.query(`SELECT cart_item_amount FROM cart WHERE cart_user_num=${user_num} and cart_use= 1 and cart_item_num=${item_num}`, 
    function(err,results){
        if(results == '' ||results ==  null ||results ==  undefined ||results ==  0 || results == NaN) 
        {
            db.db.query(`INSERT INTO cart 
            (cart_user_num, cart_item_num, cart_item_amount, cart_use) 
            VALUES   (?, ?, ?, ?)`,
            [user_num, item_num, 1, 1],
            function(error){
                if(error){
                    console.log(error);
                    return res.json({ success: false, error });
                    throw error;
                }
                return res.status(200).json({
                    success: true
                });
            }); 
        }
        else{
            db.db.query(`UPDATE cart
            SET RoomNum = ${results.cart_item_amount + 1}
            WHERE cart_user_num=${user_num} and cart_use= 1 and cart_item_num=${item_num}
            `,
            function(error){
                if(error){
                    console.log(error);
                    return res.json({ success: false, error });
                    throw error;
                }
                return res.status(200).json({
                    success: true
                });
            }); 
        }

    // //먼저  User Collection에 해당 유저의 정보를 가져오기 
    // User.findOne({ _id: req.user._id },
    //     (err, userInfo) => {

    //         // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인 

    //         let duplicate = false;
    //         userInfo.cart.forEach((item) => {
    //             if (item.id === req.body.productId) {
    //                 duplicate = true;
    //             }
    //         })

    //         //상품이 이미 있을때
    //         if (duplicate) {
    //             User.findOneAndUpdate(
    //                 { _id: req.user._id, "cart.id": req.body.productId },
    //                 { $inc: { "cart.$.quantity": 1 } },
    //                 { new: true },
    //                 (err, userInfo) => {
    //                     if (err) return res.status(200).json({ success: false, err })
    //                     res.status(200).send(userInfo.cart)
    //                 }
    //             )
    //         }
    //         //상품이 이미 있지 않을때 
    //         else {
    //             User.findOneAndUpdate(
    //                 { _id: req.user._id },
    //                 {
    //                     $push: {
    //                         cart: {
    //                             id: req.body.productId,
    //                             quantity: 1,
    //                             date: Date.now()
    //                         }
    //                     }
    //                 },
    //                 { new: true },
    //                 (err, userInfo) => {
    //                     if (err) return res.status(400).json({ success: false, err })
    //                     res.status(200).send(userInfo.cart)
    //                 }
    //             )
    //         }
        })
});


router.get('/removeFromCart', auth, (req, res) => {

    //먼저 cart안에 내가 지우려고 한 상품을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            //product collection에서  현재 남아있는 상품들의 정보를 가져오기 

            //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})



router.post('/successBuy', auth, (req, res) => {


    //1. User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    //2. Payment Collection 안에  자세한 결제 정보들 넣어주기 
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData
    transactionData.product = history

    //history 정보 저장 
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err })


            //payment에다가  transactionData정보 저장 
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })


                //3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기 


                //상품 당 몇개의 quantity를 샀는지 

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })


                async.eachSeries(products, (item, callback) => {

                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                }
                )
            })
        }
    )
})



module.exports = router;
