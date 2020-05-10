const express = require('express');
const app = express();
const router  = express.Router();
const session = require('express-session');
const comments = require('../../models/comments');

router.post('/:parentid/:id/create', async (req, res, next)=>{
    let id = req.params.id;
    let topicid = req.params.parentid
    let username = req.session.username;

    if(username){
        let comment = req.body.comm;
        await comments.addComment(comment, id, username);
    
        res.redirect(`/Post/${topicid}`);
    }
    else res.redirect('/');

});


router.get('/:id',  async (req,res, next)=>{
console.log('jaja in post router');
let id = req.params.id;
console.log(id);
 if(req.session.username){
    let allComments = JSON.stringify(await comments.getComments(id));
    let parentComment = JSON.stringify(await comments.getParentComment(id));
    res.render('web/post' , {parent : parentComment,
                             comments : allComments});
                             
 }
 else res.redirect('/');

});


module.exports = router;