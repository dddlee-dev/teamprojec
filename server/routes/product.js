const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");

var db = require('../lib/db.js');
var mysql = require('mysql');


//=================================
//             Product
//=================================


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/desimages', (req, res) => {

    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})



//상품 업로드
router.post('/', (req, res) => {

    // writer: props.user.userData._id,
    // title: Title,
    // description: Description,
    // price: Price,
    // images: Images,
    // desimages: Desimages,
    // continents: Continent

    // INSERT INTO item (item_cultureinfo, item_name, item_price, item_stock, item_category, item_cover, item_seller, item_selldate, item_lifetime, item_info, item_option) 
    // VALUES ('-1', '사과', '10000', '50', '5', 'test.jpg', '5', 'current_timestamp().000000', '20', '사과', '사과 10개')

    console.log(req.body);
    var imagedes = "";
    var i = 0;
    for (i = 0; i < req.body.images.length; i++)
    {
        imagedes = imagedes + req.body.images[i]
        if(i !== req.body.images.length -1 )
        {
            imagedes = imagedes + ";";
        }
    }
    var desimagedes = "";
    for (i = 0; i < req.body.desimages.length; i++)
    {
        desimagedes = desimagedes + req.body.desimages[i]
        if(i !== req.body.desimages.length -1 )
        {
            desimagedes = desimagedes + ";";
        }
    }

    db.db.query(`INSERT INTO item 
    (item_cultureinfo, item_name, item_price, item_stock, item_category, 
    item_cover, item_seller, item_lifetime, item_info, item_option) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [-1, req.body.title, req.body.price, 50, req.body.continents, 
        imagedes, req.body.writer, 20, desimagedes, req.body.description],
    function(error){
        if(error){
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json({
            success: true
        });
        // res.writeHead(302, {Location: `/board/community/${filteredId}/0`});
        // res.end();
    }); 

    //받아온 정보들을 DB에 넣어 준다.
    // const product = new Product(req.body)

    // product.save((err) => {
    //     if (err) return res.status(400).json({ success: false, err })
    //     return res.status(200).json({ success: true })
    // })

})



router.post('/products', (req, res) => {


    let order = req.body.order ? req.body.order : "desc";       //
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";     //
    // product collection에 들어 있는 모든 상품 정보를 가져오기    //
    let limit = req.body.limit ? parseInt(req.body.limit) : 20; //갯수
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;     //
    let term = req.body.searchTerml;                              //
    //console.log(term);

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            //console.log('key', key)

            if (key === "price") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
           // console.log(req.body.filters[key][0])
            //console.log(findArgs[key])

        }
    }


    if (term) {
        //console.log(term);
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        //console.log(findArgs.continents);
        var sql_item = `SELECT * FROM item `;
           
        if(findArgs.continents)
        {
            sql_item = sql_item + `WHERE `
            for(var i = 0; i < Object.keys(findArgs.continents).length ;i++)
            {
                var cate;
                cate = findArgs.continents[i];
                sql_item = sql_item + ` item_category = ${cate}`
                if(i !==  Object.keys(findArgs.continents).length-1)
                {
                    sql_item = sql_item + ` OR`
                }
            }
        }
        //console.log(sql_item);

        var sql_item_s = mysql.format(sql_item);
       
    
        //db.db.query(`SELECT * FROM board WHERE board_category=?`, [filteredId], function(res_board){ 
        db.db.query(sql_item_s , function(error, re){  
            //console.log(re);
            var leng = re.length;
            //var leng = Object.keys(re).length;
            //console.log(leng);
            var productInfo = new Object();
            for (var j = 0; j < leng ; j++)
            {
                
                var data = new Object();
                var image = new Array();

                data._id = re[j].item_num;
                data.title=re[j].item_name;
                data.price = re[j].item_price;

                var string = re[j].item_cover;
                var slice = string.split(';');

                var i = 0;
                while(i < slice.length){
                    image[i] = "uploads/" + slice[i];
                    i = i + 1;
                }

                
                data.images = image;
                
                // product._id
                // product.images
                // product.title
                // product.price

                if (!Array.isArray(productInfo)) {
                    productInfo = [];
                }
                
                productInfo.push(data);
            }
            if (error) return res.json({ success: false, err })
            return res.status(200).json({
                            success: true, productInfo,
                            postSize: productInfo.length
                        })
        });



        // Product.find(findArgs)
        //     .populate("writer")
        //     .sort([[sortBy, order]])
        //     .skip(skip)
        //     .limit(limit)
        //     .exec((err, productInfo) => {
        //         if (err) return res.status(400).json({ success: false, err })
        //         return res.status(200).json({
        //             success: true, productInfo,
        //             postSize: productInfo.length
        //         })
        //     })
    }

})


//id=123123123,324234234,324234234  type=array
router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })

    }

    //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.
    var sql_item = `SELECT * FROM item WHERE item_num = ?;`;
    var sql_item_s = mysql.format(sql_item, productIds);
   

    //db.db.query(`SELECT * FROM board WHERE board_category=?`, [filteredId], function(res_board){ 
    db.db.query(sql_item_s , function(error, re){  
        

        var product = new Object();
        var data = new Object();
        var image = new Array();
        var image2 = new Array();
        
        data._id=productIds;
        data.title=re[0].item_name;
        data.price = re[0].item_price;
        data.sold = 0;
        data.views = 3;
        data.continents   = re[0].item_category;
        //image[0]= 'uploads/sun.jpg';

        var string = re[0].item_cover;
        var slice = string.split(';');
        var i = 0;
        while(i < slice.length){
            image[i] = "uploads/" + slice[i];
            i = i + 1;
        }

        data.images = image;

        var string2 = re[0].item_info;
        var slice2 = string2.split(';');
        var i = 0;
        while(i < slice2.length){
            image2[i] = "uploads/" +  slice2[i];
            i = i + 1;
        }
        data.desimages = image2;
        
        
        product = []
        product.push(data);
            // description: {
            //     type: String,
            // },
           
            // images: {
            //     type: Array,
            //     default: []
            // },
            
        
            // continents: {
            //     type: Number,
            //     default: 1
            // },
        
            // desimages: {
            //     type: Array,
            //     default: []
            // }
            console.log(product);
        
        if (error) return res.status(400).send(err)
            return res.status(200).send(product)

    });  


    // Product.find({ _id: { $in: productIds } })
    //     .populate('writer')
    //     .exec((err, product) => {
    //         if (err) return res.status(400).send(err)
    //         return res.status(200).send(product)
    //     })

})






module.exports = router;
