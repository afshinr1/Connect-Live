const connection = require("../connection");
const { v4: uuidv4 } = require('uuid');


let getComments = (uuid) =>{

    return new Promise((resolve,reject)=>{

        let comments;
        let comments2;
        console.log('in comments model', uuid);
        
        let sql = "(SELECT * FROM comments as c1, comments as c2 WHERE c1.parent_uuid = ? AND c2.parent_uuid=c1.uuid)";
        connection.query(sql,[uuid, uuid], (error, results, fields)=>{
            comments = results;
            connection.query("SELECT * FROM comments WHERE parent_uuid = ?",[uuid], (error, results, fields)=>{
           comments2 = results;        
        
            comments2 = comments2.concat(comments);   
            if(comments2) resolve(comments2);
       else reject('something went wrong get nested');
                });
        
            });
        
   
    });

}

let getParentComment = (uuid) =>{
    return new Promise((resolve, reject) =>{
        let data;
        connection.query('SELECT * FROM posts WHERE uuid=?',[uuid], (error, results, fields)=>{
            data = results;
        
            if(data) resolve(data);
            else reject('something went wrong in get parent comment');
            });
    });
   

}

let addComment = (comment, parent_uuid, username)=>{

    return new Promise((resolve, reject)=>{

        console.log('add comment', comment, parent_uuid, username);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']; 
        let month = months[new Date().getMonth()];
        date = month + " " + new Date().getDate() + ", " + new Date().getFullYear();
    
        let sql = 'INSERT INTO comments (comment_content, uuid, parent_uuid, username, likes, date_posted) VALUES (?, ?, ?, ?, 0, ?)';
        connection.query(sql, [comment,uuidv4(),parent_uuid,username,date], (error, result)=>{
            if(error) reject('something went wrong add comment');
            console.log('1 record successfully inserted');
            resolve();
        });
    });

}


module.exports.getComments = getComments;
module.exports.getParentComment = getParentComment;
module.exports.addComment = addComment;