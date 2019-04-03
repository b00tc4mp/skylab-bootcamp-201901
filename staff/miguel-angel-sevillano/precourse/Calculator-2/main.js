var num1=0;
       var num2=0;
       var result=0;
        var x=false;
       var plus = false;
       var minus=false;
       var div=false;

       function reset(){
        document.getElementById("input1").value="";
        document.getElementById("resultado").innerHTML="";
        document.getElementById("numero2").innerHTML="";
        document.getElementById("simbolo").innerHTML="";
        document.getElementById("numero1").innerHTML="";
        num1=0;
        num2=0;
        x=false;
        plus=false;
        minus=false;
        div=false;
        
    }

       function getX(){
           x= true;
           plus=false;
           minus=false;
           div=false;
           num1 =document.getElementById("input1").value;
           document.getElementById("input1").value="";
           document.getElementById("numero1").innerHTML=num1;
           document.getElementById("simbolo").innerHTML=" x ";
           document.getElementById("numero2").innerHTML="";
           document.getElementById("resultado").innerHTML="";
       }
    
           function getPlus(){
           plus= true;
           x=false;
           minus=false;
           div=false;
           num1 =document.getElementById("input1").value;
           document.getElementById("input1").value="";
           document.getElementById("numero1").innerHTML=num1;
           document.getElementById("simbolo").innerHTML=" + ";
           document.getElementById("numero2").innerHTML="";
           document.getElementById("resultado").innerHTML="";
           
           }
           function getMinus(){
           plus= false;
           x=false;
           minus=true;
           div=false;
           num1 =document.getElementById("input1").value;
           document.getElementById("input1").value="";
           document.getElementById("numero1").innerHTML=num1;
           document.getElementById("simbolo").innerHTML=" - ";
           document.getElementById("numero2").innerHTML="";
           document.getElementById("resultado").innerHTML="";
           
           }
           function getDiv(){
           plus= false;
           x=false;
           minus=false;
           div=true;
           num1 =document.getElementById("input1").value;
           document.getElementById("input1").value="";
           document.getElementById("numero1").innerHTML=num1;
           document.getElementById("simbolo").innerHTML=" / ";
           document.getElementById("numero2").innerHTML="";
           document.getElementById("resultado").innerHTML="";
           
           }
   

        function calc(){
            if(x===true){
                num2 =document.getElementById("input1").value;
                result= parseInt(num1)*parseInt(num2);
                document.getElementById("numero2").innerHTML=num2;
                document.getElementById("resultado").innerHTML="= "+result;
                document.getElementById("input1").value="";
                
            }
            if(plus===true){
                num2 =document.getElementById("input1").value;
                result= parseInt(num1)+parseInt(num2);
                document.getElementById("numero2").innerHTML=num2;
                document.getElementById("resultado").innerHTML=" = "+result;
                document.getElementById("input1").value="";
                
                
            }
            if(minus===true){
                num2 =document.getElementById("input1").value;
                result= parseInt(num1)-parseInt(num2);
                document.getElementById("numero2").innerHTML=num2;
                document.getElementById("resultado").innerHTML=" = "+result;
                document.getElementById("input1").value="";
                
                
            }
            if(div===true){
                num2 =document.getElementById("input1").value;
                result= parseInt(num1)/parseInt(num2);
                document.getElementById("numero2").innerHTML=num2;
                document.getElementById("resultado").innerHTML=" = "+result;
                document.getElementById("input1").value="";
                
                
            }
           
        }