function con(){
     console.log(arguments)
     var keys=Object.keys(arguments[0]);
     var len=keys.length;
     console.log(len);
    
    }

    console.log(con({0:1,1:2}))