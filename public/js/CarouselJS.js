$(document).ready(function(){
    var imageDir;
    var dir = "/images/";
    var fileextension = ".jpg";
    var folderImages;
    var test=false;

    if (window.location.search.split('?').length > 1){
      imageDir = window.location.search.split('=')[1];
    }
    //console.log("image directory is: "+imageDir);

    //remove automatic scroll of carousel
    $('.carousel').carousel({
        interval: false
    });

//getJSON is asyc so put everything in the callback otherwise
//the rest will get called out of order

    $.getJSON( "../image-data.json",(data)=>{
      $.each(data,(key,val)=>{
        //get the correct directory of images
          if(val.directoryName==imageDir){
              folderImages=val.images; //array of images in folder
          }
        });// end .each function

      if(folderImages.length>0){
        folderImages.forEach((val,index)=>{
          var liString; //for ordered list of indicators or dots at the bottom
          var imgString;
          var divStringBeg;
          var divStringEnd="</div></div>";
          var divWhiteBox="<div class=\"whiteBox\">";
          var altIndex=index+1;
          var carouselItem;


          if(index==0)
          {
            liString="<li class=\"item"+altIndex+" active\"></li>";
            divStringBeg="<div class=\"item active\">";
          }
          else{
            liString="<li class=\"item"+altIndex+"\"></li>";
            divStringBeg="<div class=\"item\">";
          }
          imgString="<img class=\"img-responsive center-block\" src=\"images/"+imageDir+"/"+val+"\"";
          $(".carousel-indicators").append(liString);
          $(".carousel-inner").append(divStringBeg+divWhiteBox+imgString+divStringEnd) //add image to the carousel
          $(".item"+altIndex).click(function() { //add listener to indicators or tiny circles at bottom
            $("#myCarousel").carousel(index);
          });
        });//end for each folder image function
      }//end if statement


        // Enable Carousel Controls
        $(".left").click(function() {
          $("#myCarousel").carousel("prev");
        });
        $(".right").click(function() {
          $("#myCarousel").carousel("next");
        });

/*
        $("#myCarousel").swiperight(function() {
           $(this).carousel('prev');
         });
        $("#myCarousel").swipeleft(function() {
           $(this).carousel('next');
        });
        */

        $("#myCarousel").swipe(
          {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData)
            {

              if (direction == 'left')
                $(this).carousel('next');
              if (direction == 'right')
                $(this).carousel('prev');
            },


            //allowPageScroll:"vertical"
        });

    });//end get json file function



console.log("test is equal to: ",test);


});//end of js file
