const express = require("express");
const router = express.Router();
const path = require("path");
const connection = require("../../connection");
const topicInfo = require('../../models/topicInfo');



router.get('/', async (req, res, next)=>{
  let data;
    data = await topicInfo.topics();
    data = JSON.stringify(data);
    let images = await topicInfo.images();
    images = JSON.stringify(images);
    res.render("web/TopicsPage", { topics : data,
                                    images : images});
    
  
  });
  
  router.get('/:id', async (req, res, next)=>{
    console.log("posts page get");
    let id = req.params.id;
    console.log(id);
    let allPosts = await topicInfo.topicPosts(id);
    allPosts = JSON.stringify(allPosts);
    res.render('web/PostsPage', {posts : allPosts});
  });

  module.exports = router;


  /*

router.get('/',(req, res, next)=>{
  let data;
  connection.query('SELECT * FROM topics', (error, results, fields)=>{
    data = JSON.stringify(results);

    topicInfo.topics();
    console.log(topicInfo.PI);
    res.render("web/TopicsPage", { topics : data });
    
  });
  
  });
  


  */