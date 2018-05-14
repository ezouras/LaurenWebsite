var button = document.querySelector(".button");
var inputCollection = document.getElementsByTagName('input');
var message=document.getElementById("message");
var title=document.getElementById("title");



var breakException={
  disableButton: function(){
    button.setAttribute("disabled","");
  }
};



//turn html collection into an array:
var inputElements = Array.prototype.slice.call(inputCollection);
inputElements.push(message);
inputElements.push(title);

inputElements.forEach((input,index)=>{
  console.log("input element is: ",input);
  //add blur event to input fields
    input.addEventListener("blur",(e)=>{
    checkFormValidity();
  });
});


function checkFormValidity(){
  try{
    console.log("Checking Validity for inputs");
      inputElements.forEach((input,index)=>{
      if(!input.checkValidity())throw breakException;
      button.removeAttribute("disabled");
    });
  } catch(e){
    e.disableButton();
  }
};
