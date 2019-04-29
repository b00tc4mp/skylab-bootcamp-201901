let results = []

function  calculator(num1,num2){
    results = []
     if(typeof num1 === 'number' && typeof num2 === 'undefined'){
        results.push('Arrel cuadrada: ' +raiz(num1))
     }else if(typeof num1 === 'number' && typeof num2 === 'number'){
        results.push('Suma: ' + suma(num1,num2), 'Resta: '+ resta(num1,num2), 'Mutiplicació: ' + mutiplicar(num1,num2),'Dividir: ' + dividir(num1,num2))
     }else{
      results.push('Algun paramentre no es un numero')
     }  
  console.log(results)
  }

  function suma(num1,num2){
      if(Number.isInteger(num1+num2) === true){
          return num1 + num2
      }else{
          return (num1 + num2).toFixed(3)
      }
      
  }
  function resta(num1,num2){
      if(Number.isInteger(num1 - num2) === true){
          return num1 - num2
      }else{
          return (num1 - num2).toFixed(3)
      }
  
  }
  function mutiplicar(num1,num2){
      if(Number.isInteger(num1 * num2) === true){
          return num1 * num2
      }else{
          return (num1 * num2).toFixed(3)
      }
  }
  function dividir(num1,num2){
      if(Number.isInteger(num1 / num2) === true){
          return num1 / num2
      }else{
          return (num1 / num2).toFixed(3)
      }
  }
  function raiz(num1){
      if(Number.isInteger(Math.sqrt(num1)) === true){
          return Math.sqrt(num1)
      }else{
          return Math.sqrt(num1).toFixed(3)
      }
  }

calculator(9,3)