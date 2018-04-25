const express=require('express');
var fs=require("fs");

const port = process.env.PORT || 3000;

var ext=".jpg";
var imageJSON=[];
var dirOfImages={};
//read all the folder names in the "image" directory.
//create an image object for each where category is the image folder
// and image is the jpeg image in the folder.

var folders = fs.readdirSync(__dirname +'/public/images');
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



var app= express();
//call express as a function.  the object is passed back.

//instead of setting up handlers, use middle ware to tell express to serve
//what is in the "public" folder.
app.use(express.static(__dirname +'/public'));
app.listen(port,()=>{
  console.log("Server is up");
});
