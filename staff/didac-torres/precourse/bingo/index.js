var arrayNum=[];
var cartonUser=[];
var cartonIA=[];
var counter=0;
var cartonSize=15;
var score=cartonSize *(-1);

function crearCartonUser() {


  for(i=0;i<90;i++){
    arrayNum[i]=i+1;
  }
  
  arrayNum=arrayNum.sort(function() {return Math.random() - 0.5});

  for(i=0;i<cartonSize;i++){
    cartonUser[i]=arrayNum[i];
  }
  return cartonUser;
}

function crearCartonIA() {

  for(i=0;i<90;i++){
    cartonIA[i]=90-i;
  }
  
  cartonIA=cartonIA.sort(function() {return Math.random() - 0.5});
}

function cantarNumero() {

  for(var i=0;i<cartonIA.length;i++){
    for(var j=0;j<cartonUser.length;j++){
      if(cartonIA[i]==cartonUser[j]){
        cartonUser[j]=0;
        counter++;
        
      }
    }
    score++;
    alert("Numero cantado:\n"+cartonIA[i]+"\nCartón:\n"+cartonUser+"\nAciertos:\n"+counter+"\nPuntuaciones:\n"+score);
    if(counter>=cartonSize){
      alert("BINGOOOO!!!"+"\nPuntuación:\n"+score);
      break;
    }
  }
  return score;
}

function reglasPuntuar(){
  alert("REGLAS PUNTUACIÓN:\n -Cada número cantado suma 1 punto. La puntuación ideal es 0 y cuanto mayor sea el número peor es la puntuación.");
}

crearCartonIA();
reglasPuntuar();
alert("Su cartón:\n"+crearCartonUser());
cantarNumero();

