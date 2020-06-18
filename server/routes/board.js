const express = require('express');
const router = express.Router();
//var auth = require('../lib/auth');
//var express = require('express');
//var router = express.Router();
//var template = require('../lib/template');
var db = require('../lib/db.js');
//var sanitizeHtml = require('sanitize-html');
var path = require('path');
//var auth = require('../lib/auth');
//var list = require('../lib/board_list');
//var comment = require('../lib/comment');
var mysql = require('mysql');
var cookie = require('cookie');

router.get('comment/:pageId4', (req, res) => {
    console.log('comment');

    var filteredId = path.parse(req.params.pageId4).base;
    var data = new Object();

    var o = [] 

    db.db.query(`SELECT board_title,board_time,user_nickname,board_view,board_info 
    FROM board JOIN user ON user_num = board_witer WHERE board_category =  ${filteredId} `, function(err,results)
    {


        var leng = results.length;
        for (var j = 0; j < leng ; j++)
        {
        
        var title = results[j].board_title ;
        var description = results[j].board_title ;
        var nick = results[j].user_nickname;
        var st = results[j].user_info;

        //var time = results[0].board_time*1;
        var date_ = new Date(results[j].board_time * 1);
        var date = date_.getFullYear() +'-';
        if(date_.getMonth() < 10) date = date + '0';
        date = date + date_.getMonth() +'-';
        if(date_.getDate() < 10) date = date + '0';
        date = date + date_.getDate()+' ';
        if(date_.getHours() < 10) date = date + '0';
        date = date + date_.getHours()+':';
        if(date_.getMinutes() < 10) date = date + '0';
        date = date + date_.getMinutes()+':';
        if(date_.getSeconds() < 10) date = date + '0';
        date = date + date_.getSeconds();
        


        data.title = title;
        if(st == null) st = 0;
        var star = "";
        for(var i = 0;i < 5; i++)
        {   
            if(i < Number(st)) 
            {
                star = star + `★`;
            }
            else 
            {
                star = star + `☆`;
            }
        }
       
        data.start = star;
        data.description =description;
        data.nick = nick;
        data.date = date;
        

        if (!Array.isArray(o)) {
            o = [];
        }
        o.push(data);

    }
        JSON.stringify(o);


        console.log(o);
        res.send([o]);



        
    });
    
});


router.get('/:pageId/:pageId2', (req, res) => {
    //console.log('http://localhost:3000/community/-1/0');
    var filteredId = path.parse(req.params.pageId).base;
    var filteredId2 = path.parse(req.params.pageId2).base;
    var max;

    var num = [];
    var rec = [];
    var title = [];
    var title_l = [];
    var nick = [];
    var da = [];
    var view = [];

    var data = new Object();

    var o = [] 
    db.db.query(`SELECT COUNT(*) as cnt FROM board WHERE board_category = ${filteredId}`, function(err,re){
        max = re[0].cnt;
    });
    var start = 20 * filteredId2;

    db.db.query(`SELECT board_num,board_title,board_time,user_nickname,board_view,board_info FROM board JOIN user ON user_num = board_witer WHERE board_category = ${filteredId} ORDER BY board_time DESC Limit ${start}, 20`, function(err,results){
        if(results == '' ||results ==  null ||results ==  undefined ||results ==  0 || results == NaN) 
        {
        }
        else{
            var leng = results.length;
            for (var j = 0; j < leng ; j++)
            {
                data = new Object();
                var date_ = new Date(results[j].board_time * 1);
                var date = date_.getMonth() +'-' +date_.getDate();
                //console.log(date);

                var recommend = results[j].board_info ;
                if(recommend == null) recommend = 0;

                num[j] = max - (filteredId2 * 20) -  j ;
                rec[j] = recommend;
                title[j] = results[j].board_title;
                title_l[j] = `${filteredId2}/content/${results[j].board_num}`;
                nick[j] =     results[j].user_nickname;
                da[j] = date;
                view[j] = results[j].board_view;

                
                data.num= num[j];
                data.recommend= rec[j];
                data.title= title[j];
                data.title_l= title_l[j];
                data.nick= nick[j];
                data.date= da[j];
                data.view= view[j];
                

                if (!Array.isArray(o)) {
                    o = [];
                }
                o.push(data);
                

            }
        }
        JSON.stringify(o);
        // o.max = max;
        //console.log(o);


        res.send([o , max]
        );
    });

    
});

router.get('/:pageId/:pageId2/:pageId3', (req, res) => {


    var filteredId = path.parse(req.params.pageId).base;
    var filteredId2 = path.parse(req.params.pageId2).base;
    var filteredId3 = path.parse(req.params.pageId3).base;

  
    
    var data = new Object();

    var o = [] 

    db.db.query(`UPDATE board SET board_view=board_view+1 WHERE board_num = ${filteredId3} `, function(err){});

    db.db.query(`SELECT board_title, board_content,board_time,user_nickname,board_view,board_info FROM board JOIN user ON user_num = board_witer WHERE board_num = ${filteredId3} `, function(err,results)
    {
        
        
        var recommend = results[0].board_info ;
        //var time = results[0].board_time*1;
        var date_ = new Date(results[0].board_time * 1);
        var date = date_.getFullYear() +'-';
        if(date_.getMonth() < 10) date = date + '0';
        date = date + date_.getMonth() +'-';
        if(date_.getDate() < 10) date = date + '0';
        date = date + date_.getDate()+' ';
        if(date_.getHours() < 10) date = date + '0';
        date = date + date_.getHours()+':';
        if(date_.getMinutes() < 10) date = date + '0';
        date = date + date_.getMinutes()+':';
        if(date_.getSeconds() < 10) date = date + '0';
        date = date + date_.getSeconds();
        
        
        data.title = results[0].board_title;
        if(recommend == null) recommend = 0;
        data.recommend = recommend;
        data.view = results[0].board_view;
        data.nick = results[0].user_nickname;
        data.date = date;
        data.content = results[0].board_content;
        

        if (!Array.isArray(o)) {
            o = [];
        }
        o.push(data);
        JSON.stringify(o);



        res.send([o]);
    });
    
});


module.exports = router;