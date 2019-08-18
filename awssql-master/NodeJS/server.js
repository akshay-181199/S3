const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');
 
const s3 = new aws.S3({
 accessKeyId: 'ASIATVWBNAOCJIFBHA4Y',
 secretAccessKey: '+TbeidluMcl47VM76N6QxWrT8YvHBdM/9XQnspEV',
 sessionToken:'FQoGZXIvYXdzEPP//////////wEaDJ69NFFLsHShOokejyL8BI7bfrL2GWBHjaZk0zMoUYyLBLm5lu324mVbbz3jwmMqgFmbYQcUC7qFtI13srmBJZmyZTqOj/zzKvpkhGSgq/5h1T67/yN3nPzyrSR+sjDaXc1WoN2IV+R65vrRHy4yRuqisYHzP7+b9gmUynvOJ8IMDvperaNfZbDYt0rfFVU1MytU2B1caQClqJUi3OTQpDta5RxQoX0MnG9W7L74MnaC64UT688uSxP6DSddCDtCqe4R37ppGqYOrjIdxCz1HMF27LhkU8oe1aNQKzaFzg7iN5eU0GMsiog0qC/xF/4gumg0h9Mlh6kxYRrsMsFWLJAfpzuP0HGKKk9knbRhqebY1hrhM04/u4HD33TIWJ5KkwMM8Cdexl0tN8C44djn4WHe+J276q829OS9muxDqX5EQm5HvGitvnndzoIgsQCAGV9q2xG0F3zm3kBkNIZOxqSRVCgg5hatoe4fjthlrVLlTt2KLFfm+o1SaW7Pd6/Pdxrbkpo/n8eMQ2l0ay0u6eoNKdqVaJd2vMMD7+Od+LYLRodLMY2Dn+lObViw0K/hSt+Oicl1w1i5hIE2ZkpL0H+Hk8R66xpBvmIXx2ubNgY6z+/0l40dNRWJEudiD20MCDPW6n6ZoeOR3kSMNQGY/nlVosfdGlg1TyeawtSlFYdjoJJkLj0svFJ6MwtLpLIFt/XUjatL0DEQLeCrsd2PDQrsFbaRQ9bNL5K8TqlRWSWYwOEP2PgSCb7gKho58yjqpfpXH1HarAYi5QEPxKatflPYiPpbCNKdnlb2cUHwD2GcXV5JRM+2tU0Hava5Qmj1ovdreiI9nSbLwyxc+oBWB/aJgp+9XSM6J3lShSjvjubqBQ==',
 Bucket: 'akshay777'
});





function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg|png|gif/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: Images Only!' );
 }
}

const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'akshay777',
  // acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');




app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/img',(req,res)=>{

profileImgUpload( req, res, ( error ) => {
  // console.log( 'requestOkokok', req.file );
  // console.log( 'error', error );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const imageName = req.file.key;
    const imageLocation = req.file.location;
// Save the file name into database into profile model
    res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });


});

app.post('/',(req,res)=>{



var con = mysql.createConnection({
  host: "database-1.c1bcknw46pqf.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  //host:"34.67.178.8",
  user:"admin", // user name to your mysql database
  password:"akhi7777", // corresponding password
  database: "maestro" // use the specified database
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("Select * from CLOUDDB", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) 
      {
        console.log('error');
        throw err;

      }
      console.log('ITS OK');
    // if there is no error, you have the fields object
    // iterate for all the rows in fields object
    Object.keys(result).forEach(function(key) {
      var res = result[key];
 //     console.log(res)
    });
  });
});



  var {seldate,days,country,states}=req.body;
 // console.log(name);
 //console.log(req.body);
    var today = new Date();
    var date3 = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

    var date1 = new Date(date3); 
    var date2 = new Date(seldate);
   
const diffTime = (date2.getTime() - date1.getTime());
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffDays-1);
diffDays=diffDays-1;

console.log(diffDays>=30);
console.log(diffDays+"<0-->"+(diffDays<0)); 
 if(diffDays>=30)
 {
console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date within 30 days from today"
   }
   res.json(JSON.stringify(abc));

 }

 else if(diffDays<0)
 {
  console.log(diffDays); 

   const abc={
    res:"Error",
    error:"Date shouldn't be before today"
   }
   res.json(JSON.stringify(abc));

 }

else
{

  var xtra="";
  var records = [[req.body.seldate,req.body.days,req.body.country,req.body.states]];
//console.log(records)
if(records[0][0]!=null)
{
  con.query("INSERT INTO CLOUDDB (Date,Days,Country,States) VALUES ?", [records], function (err, result, fields) {
    if (err) console.log(err.sqlMessage);
   
   const abc={
    res:result,
    error:err
   }
   res.json(JSON.stringify(abc));

  });

}
}


});

app.listen(3001,()=>{
  console.log("Port 3001");
})
