const mysql=require("mysql");

const conn=mysql.createConnection({
    host:'localhost',
    database:'crickbuzz',
    user:'root',
    password:'root'
});
module.exports= conn;