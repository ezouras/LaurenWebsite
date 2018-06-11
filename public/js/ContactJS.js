var button = document.querySelector(".submitButton");
//var backdrop=document.querySelector(".backdrop");
var inputCollection = document.getElementsByTagName('input');
var message=document.getElementById("message");
document.body.style.cursor  = 'default';

button.addEventListener("click",()=>{
  document.body.style.cursor  = "wait";
});

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
