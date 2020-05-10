const connection = require("../connection");



let validate = (username, password)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (error, results, fields)=>{
            if(results.length >0){
                resolve('true');
            }else{
                resolve('false');
    
            }
        });
    });
}

let register = (email, username, password)=>{

    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM users WHERE username=? OR email=?', [username, email], (error, results, fields)=>{
            if(results.length >0){
                resolve('false');
            }else{
                let sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

                connection.query(sql, [username, password, email], (error, results, fields)=>{
                    resolve('true');
                });
            }
        });
    });
}


module.exports.validate = validate;
module.exports.register = register;