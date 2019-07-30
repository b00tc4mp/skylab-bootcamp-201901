function bingo(){


    var carton=paperGenerator();
    var newcarton=paperGenerator();
    var randomNumbers=[];
    
    function askForName(){
        var player=prompt("Enter your name please!!");
          
        if(player===null || player===""){
          console.log("Ciaoooo");
        }else{
          alert("welcome "+player+", here is your paper! \n"+carton);
          var confirmation=confirm("do you want another paper?");
          if(confirmation===true){
            alert("here you have your new paper: \n"+newcarton);
            console.log("here you have your new paper and you cannot change: \n"+newcarton);
            bingoPlay2();
          }else{
             console.log("welcome "+player+", here is your paper! \n"+carton);
             bingoPlay1();
    
          }
        }
     }
       
    function bingoPlay1(){
      play=true;
      
      while(play===true){
          var num=Math.floor(Math.random()*25)
          if (!randomNumbers.includes(num)) {
            randomNumbers.push(num);
            alert("we got a number"+num);
            
            if(carton.includes(num)){
                for(j=0;j<carton.length;j++){
                    if(num===carton[j]){
                        carton[j]='X';
                        alert(carton);
                            if(carton[0]==='X' && carton[1]==='X' && carton[2]==='X' && carton[3]==='X' &&
                                carton[4]==='X'){
                                    play=false;
                                    console.log("BINGOO"+carton);
                                    console.log(" you got BINgo in "+(randomNumbers.length)+" turns");
                            }else{
                              bingoPlay1();
                            }
                    }
                }      
            }else{
                    
                alert("You are not lucky "+carton);
                bingoPlay1();
    
            }
        
        }
      }
    }
    
    
    function bingoPlay2(){
      play=true;
      
      while(play===true){
          var num=Math.floor(Math.random()*25)
          if (!randomNumbers.includes(num)) {
            randomNumbers.push(num);
            alert("we got a number"+num);
            
            if(newcarton.includes(num)){
                for(j=0;j<newcarton.length;j++){
                    if(num===newcarton[j]){
                        newcarton[j]='X';
                        alert(newcarton);
                            if(newcarton[0]==='X' && newcarton[1]==='X' && newcarton[2]==='X' && newcarton[3]==='X' &&
                                newcarton[4]==='X'){
                                    play=false;
                                    console.log("BINGOO"+newcarton);
                                    console.log(" you got BINgo in "+(randomNumbers.length)+" turns");
                            }else{
                              bingoPlay1();
                            }
                    }
                }      
            }else{
                    
                alert("You are not lucky "+newcarton);
                bingoPlay1();
    
            }
        
        }
      }
    }
      
    
    
    
    function paperGenerator(){
        var paper=[];
        while(paper.length<5){
            var number=Math.floor(Math.random()*25);
            if (!paper.includes(number))
              paper.push(number);
          
        }
        return paper;
    }
    
    
    askForName();
}
bingo();