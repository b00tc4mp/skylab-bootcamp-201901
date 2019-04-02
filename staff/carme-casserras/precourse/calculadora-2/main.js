function calc(boto) {
  
   
if (boto != '=') {
    if (document.getElementById("result").innerText.length < 10) {   
    document.getElementById("result").innerHTML = document.getElementById("result").innerHTML + boto;
    let answ = document.getElementById("result").innerHTML;
    } 
} else {
    document.getElementById("result").innerText = eval(document.getElementById("result").innerText);
   };
   //console.log( document.getElementById("result").innerText.length);
};

function delet() {
 document.getElementById("result").innerText = document.getElementById("del").value;
};