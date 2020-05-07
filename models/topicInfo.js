const connection = require("../connection");


const  getTopics = ()=>{
    return new Promise((resolve, reject)=>{
        console.log('in get topics');
        let data;
        connection.query('SELECT * FROM topics', (error, results, fields)=>{
        data = results;

        if(data) resolve(data);
        else reject('something went wrong get topics');
        });

    });

  }

let getTopicPosts = (id)=>{
return new Promise((resolve, reject)=>{
console.log('topic id is ', id);
connection.query('SELECT * FROM posts WHERE topic_id=?',[id], (error, results, fields)=>{
    data = results;
    console.log(data);

    if(data) resolve(data);
    else reject('something went wrong get topics');
    });
});
}
let getImages = ()=>{
    console.log('get images');
    let images;
    return new Promise((resolve, reject)=>{
    connection.query('SELECT image FROM images', (error, results, fields)=>{
         images = results;
    
        if(images) resolve(images);
        else reject('something went wrong get topics');
        });
    });

}

module.exports.topics = getTopics;
module.exports.topicPosts = getTopicPosts;
module.exports.images = getImages;
