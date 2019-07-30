let results = []

function  calculator(){
    results = []
    let num1 = parseFloat(document.getElementById('num1').value) 
    let num2 = parseFloat(document.getElementById('num2').value)

    if(isNaN(num1) && isNaN(num2)){
        document.getElementById('results').innerHTML =  'Posa algun numero...'
        
    }else if(typeof num1 === 'number' && isNaN(num2)){

        document.getElementById('results').innerHTML =  '<li>' + 'Arrel cuadrada de ' + num1 + ' = ' + raiz(num1) + '</li>'
        
     }else if(isNaN(num1) && typeof num2 === "number"){
        document.getElementById('results').innerHTML =  '<li>' + 'Arrel cuadrada de ' + num2 + ' = ' + raiz(num2) + '</li>'

     }else if(typeof num1 === 'number' && typeof num2 === 'number'){
        document.getElementById('results').innerHTML =  '<li>' + num1 + ' + ' + num2 + ' = ' + suma(num1,num2) + '</li>' +
                                                        '<li>' + num1 + ' - ' + num2 + ' = ' + resta(num1,num2) + '</li>' +
                                                        '<li>' + num1 + ' x ' + num2 + ' = ' + mutiplicar(num1,num2) + '</li>' +
                                                        '<li>' + num1 + ' / ' + num2 + ' = ' + dividir(num1,num2) + '</li>' 
     }else{
        document.getElementById('results').innerHTML =  'Algun element no es un numero'
     }
    
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

