const express=require('express');
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const fs=require("fs");
const port = process.env.PORT || 3000;
const app= express();
//call express as a function.  the object is passed back.
// create application/x-www-form-urlencoded parser
//instead of setting up handlers, use middle ware to tell express to serve

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//what is in the "public" folder.
app.use(express.static(__dirname +'/public'));

/*app.post("/index.html",(req,res)=>{
  console.log("in post method and the request is: ",req.body);
  res.sendFile(__dirname + '/public/index.html');
});
*/

var ext=".jpg";
var imageJSON=[];
var dirOfImages={};
var folders = fs.readdirSync(__dirname +'/public/images');




// POST get contac me data
app.post("/index.html",(req,res)=>{
  console.log("in post method and the request is: ",req.body);
  console.log("in post method");
  const output =`
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>name: ${req.body.title} ${req.body.fname} ${req.body.lname}</li>
    <li>email: ${req.body.email}<li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>

  `;

  let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bossyappstest@gmail.com', // generated ethereal user
            pass: 'B0ssyAPpsT3st', // generated ethereal password
        },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'bossyappstest@gmail.com', // sender address
        to: 'ezouras@hotmail.com', // list of receivers
        subject: 'Hello Lauren ✔', // Subject line
        text: 'You have a new message', // plain text body
        html: 'output' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //when clicking email me - set up javascript to
        //create modeal and say "email has been sent"
        //then go back to index page FROM Modal
        //res.sendFile(__dirname + '/public/Contact.html');
        res.sendFile(__dirname + '/public/index.html')

    });

    console.log("At the end of the function");
    //res.sendFile(__dirname + '/public/index.html');
  });




//read all the folder names in the "image" directory.
//create an image object for each where category is the image folder
// and image is the jpeg image in the folder.
folders.forEach(function(item,index){
  //if it DOES NOT contain a dot, then do what is in the if statement.
  if(item.indexOf(".")== -1)
  {
    //objec to save in JSON.  directory name.  array of images
    var dirOfImages={
      directoryName: item,
      images: []
    };
    dirOfImages.images=fs.readdirSync(__dirname +'/public/images/'+item).filter((file)=>{
      return file.indexOf(ext)!==-1;
    });
    imageJSON.push(dirOfImages);
  }

});

fs.writeFileSync(__dirname +'/public/image-data.json',JSON.stringify(imageJSON));




app.listen(port,()=>{
  console.log("Server is up");
});
