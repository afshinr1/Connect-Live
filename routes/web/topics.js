const express = require("express");
const router = express.Router();
const path = require("path");
const connection = require("../../connection");
const topicInfo = require('../../models/topicInfo');
const posts = require('../../models/posts');
const url = require('url');


router.get('/', async (req, res, next)=>{
  if(req.session.username){
    let data;
    data = await topicInfo.topics();

    data = JSON.stringify(data);
    let images = await topicInfo.images();
    images = JSON.stringify(images);
    res.render("web/TopicsPage", { topics : data,
                                    images : images});
    
  }
else res.redirect('/');
  
  });

  router.get('/search', async (req,res, next)=>{
  
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var parse = url.parse(fullUrl, true);
    let searchVal = parse.query;
    console.log('searching sadasd', fullUrl);
  let data;
  data = await topicInfo.search(searchVal.search);

  data = JSON.stringify(data);
  let images = await topicInfo.images();
  images = JSON.stringify(images);
  console.log(images);
  res.render("web/TopicsPage", { topics : data,
                                  images : images});
    
});

  router.post('/createTopic', async (req, res, next)=>{
    let tit = req.body.title;
    let desc = req.body.description;
    if(tit && desc){
      await topicInfo.createTopic(tit, desc, req.session.username);
      res.redirect('/TopicsPage');
    }
    else res.redirect('/');

  
  });
  
  router.post('/:id/createPost', async (req, res, next)=>{
    let id = req.params.id;
    let tit = req.body.title;
    let desc = req.body.description;
    if(id && tit && desc){
      await posts.createPost(id, tit, desc, req.session.username);
      res.redirect(`/TopicsPage/${id}`);
    }
    else res.redirect('/');
    
  });
  
  router.get('/:id', async (req, res, next)=>{
    console.log("posts page get");
    let id = req.params.id;
    console.log(id);

    let allPosts = await topicInfo.topicPosts(id);
    allPosts = JSON.stringify(allPosts);
    res.render('web/PostsPage', {posts : allPosts,
                                topicID : id});

  });
  router.get('/:id/search', async (req, res, next)=>{
  
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var parse = url.parse(fullUrl, true);
    let searchVal = parse.query;
    console.log('searching etwehwehwe', parse);
    let topicID = parse.pathname.split('/');
    let id = topicID[2];
  let data;
  data = await posts.search(topicID[2], searchVal.search);
  allPosts = JSON.stringify(data);
    res.render('web/PostsPage', {posts : allPosts,
                                topicID : id});
  });



  module.exports = router;

