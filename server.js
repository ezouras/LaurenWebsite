const express=require('express');
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const fs=require("fs");
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app= express();

//set variables for sending email:
var emailSent,buttonPressed,waiting;
resetContactButtons();

//set variables for loading samples
var ext=".jpg";
var imageJSON=[];
var dirOfImages={};
var folders = fs.readdirSync(__dirname +'/public/images');


app.set("view engine",'hbs');
hbs.registerPartials(__dirname+"/views/partials");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//what is in the "public" folder.
app.use(express.static(__dirname +'/public'));

app.get("/contact",(req,res)=>{
  res.render('contact.hbs',{
    buttonPressed,
    waiting
  });
});

// POST. this gets called when hitting the button:
app.post("/contact",(req,res)=>{
  /* you will put the output string in the email */
  const output =`
  <h2>Contact details are as follows:</h2>
  <p>
    <h3>Name:</h3><b> ${req.body.fname} ${req.body.lname}</b>
    <br>
    <h3>Email:</h3><b> ${req.body.email}</b>
    <br>
    <h3>Message:</h3><b>${req.body.message}</b>
  </p>
  `;

  const outputText=`
  Name: ${req.body.fname} ${req.body.lname}
  Email: ${req.body.email}
  Message: ${req.body.message}`;

  let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bossyappstest@gmail.com', // generated ethereal user
            pass: 'B0ssyAPpsT3st', // generated ethereal password
        },
    }); /* end of transporter creation */

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'bossyappstest@gmail.com',
        to: 'design@laurenbriddell.com', // list of receivers
        subject: 'New Contact Request from Lauren Briddell Website', // Subject line
        text: outputText, // plain text body
        html: output // html body
    }; /* end of mailOptions creation */

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if(error)
      {
        res.render('contact.hbs',{
            buttonPressed:true,
            waiting:false,
            emailSent:false
        });
        resetContactButtons();
        return;
      }
      //if message sent correctly render page differently
      res.render('contact.hbs',{
      buttonPressed:true,
      waiting:false,
      emailSent:true
      });
      resetContactButtons();

      }); //finished sending Message
  });/* end post message */




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


function resetContactButtons(){
  emailSent=false;
  buttonPressed=false;
  waiting=true;
}

app.listen(port,()=>{
  console.log("Server is up");
});
