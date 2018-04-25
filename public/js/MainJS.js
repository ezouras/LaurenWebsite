var quotes=[
  {
    quote:`"Thank you for always making these tedious projects
      easy. You are so organized and have a great attention to detail. It is
      such a pleasure working with you!"`,
    author:"D.C., ProCirc"
  },
  {
    quote:`"Thanks!!!!!!!!! You’re terrific to work with and
      your work is excellent. I will definitely use you again..."`,
    author:`J.S., Prometheus Global Media `
  },
  {
    quote:`"Thanks for all of the accurate, timely and affordable
    work that you do! Happy to be part of a win-win scenario."`,
    author:" M.T., ProCirc"
  },
  {
    quote:`"It’s been a pleasure working with you these
      past several years, I look forward to many more projects in the new
      year!"`,
    author:"D.P., Mast Circulation Group"
  },
  {
    quote:`"Your email test for 7 Years Younger not only
      beat the control, it DOUBLED response!...It’s official!! 7 Years
      Younger is a New York Times bestseller."`,
    author:"T.M., Hearst"
  },
  {
    quote:`“She exemplifies creativity and professionalism
    from beginning to end on any project. Her superior quality
    of work was constantly recognized during her time at Forbes
    and often used as the example in which to follow. "`,
    author:"C.H., Forbes"
  },
  {
    quote:`"Thank you for the amazing work
      you do for us! We can always count on you for a fresh
      (and winning) design for all our projects.”`,
    author:"A.F., Rodale"
  },
]


$(document).ready(function(){
  var quoteIndex = 0;
  var max=quotes.length-1;
  console.log("max is: "+max);


  function fadeInOut(quoteObject) {
    var delay=5000;
    console.log("quote length is: "+quoteObject.quote.length);
    if(quoteObject.quote.length>435){
      delay=30000;
    };
    //435 charaters
    $(".testimonials").children(".quote").text(quoteObject.quote)
        .fadeIn(2000).delay(delay).fadeOut(2000, function() {
        if (quoteIndex >= max) // are you at the end of the array?
        {
          quoteIndex=0;
          fadeInOut(quotes[0]);
        }
        else
        {
          fadeInOut(quotes[++quoteIndex]);
        } // if not, then use go back to the first sibling
      });
    $(".testimonials").children(".author").text(quoteObject.author)
    .fadeIn(2000).delay(delay).fadeOut(2000);
  };

  fadeInOut(quotes[quoteIndex]);

  $(".card-container").bind("click", function () {
    var image = $(this).attr("id");
    var url = "carousel.html?images=" + encodeURIComponent(image);
    window.location.href =url;
  });




});
