

  var a =[6,4,7,5,6,7]


  function sort(array){
      
    var newar=[];
    var n=0;
    var acc = array.length 
    var e =array.length -1;
    var next = false;

    for(let a = 0;a<array.length;a++){

        for(var i = 0 ;i<acc;i++){
           
             if (array[i]>array[i+1] &&  i<e){
                 newar[n]=array[i+1]
                 n++
                 newar[n]=array[i]
                n++
             }
             else if(next === true){
                 n++
             }
        
        }
        acc --;
        for(var b=0;b<newar.length;b++){
              array[b] = newar[b]
        }
        next = true;
        n=0;
        
    }

        return newar  
  }



  
  console.log(sort(a))