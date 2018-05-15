var button = document.querySelector(".button");
var inputCollection = document.getElementsByTagName('input');
var message=document.getElementById("message");

button.addEventListener("click",()=>{
  console.log("in click event");
})

var breakException={
  disableButton: function(){
    button.setAttribute("disabled","");
  }
};

//turn html collection into an array:
var inputElements = Array.prototype.slice.call(inputCollection);
inputElements.push(message);


inputElements.forEach((input,index)=>{
    input.addEventListener("keyup",(e)=>{
      checkFormValidity();
    });
    input.addEventListener("blur",(e)=>{
    checkFormValidity();
  });
});


function checkFormValidity(){
  try{
      inputElements.forEach((input,index)=>{
      if(!input.checkValidity())throw breakException;
      button.removeAttribute("disabled");
      if(input.value=='')
      button.setAttribute("disabled");
    });
  } catch(e){
    e.disableButton();
  }
};
