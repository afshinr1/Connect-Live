const connection = require("../connection");
const { v4: uuidv4 } = require("uuid");

let createPost = (id, title, desc, username) => {
  console.log("in create post");

  return new Promise((resolve, reject) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[new Date().getMonth()];
    date = month + " " + new Date().getDate() + ", " + new Date().getFullYear();

    let sql =
      "INSERT INTO posts (uuid, topic_id, title, description, username, votes, date_posted) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [uuidv4(), id, title, desc, username, 0, date],
      (error, result) => {
        console.log("1 record successfully inserted");
        resolve();
      }
    );
  });
};

let search = (topicID, searchVal) => {
  return new Promise((resolve, reject) => {
    console.log("in search post ", topicID, searchVal);
    connection.query(
      "SELECT * FROM posts WHERE topic_id=? AND title=?",
      [topicID, searchVal],
      (error, results, fields) => {
        data = results;

        if (data) {
          console.log(data);
          resolve(data);
        } else reject("something went wrong get topics");
      }
    );
  });
};

module.exports.createPost = createPost;
module.exports.search = search;
