
const express = require('express');
const app = express();
const mysql= require('mysql2');
const dbdata={
	host:"localhost",
	user:"root",
	password:"cdac",
	database:"practice",
	port:3306

}
let con = mysql.createConnection(dbdata);



const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.get('/poc1', function (req, res) {
	
		let bookid1={bookid:req.query.bookid}
		let output={bookfoundstatus:false, bookdetails:{bookid:0,bookname:"",price:0}};
		con.query("select * from book where bookid = ?",[bookid1.bookid],(err,res1)=>{
			if(err){
				console.log("error");
			}
		else if(res1.length > 0){
				output.bookfoundstatus=true;
				output.bookdetails=res1[0];
			}
			res.send(output);
		})

    });


app.get('/poc2', function (req, res) {
    
	let result=false;
	let input={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};
	con.query("update book set bookname=?,price=? where bookid=?",[input.bookname,input.price,input.bookid],(err,res1)=>{
		if(err){
			console.log("error");

		}
		else if(res1.affectedRows>0){
			result=true;
		}
		res.send(result);
	})
}
)


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});