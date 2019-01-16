function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var __timer = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            setInterval(__timer);
            timer = duration;
            document.getElementById("timeFinished").style="display:block;"
            document.getElementById("timeFinished").value += "Tiempo acabado"
            document.getElementById("time").style="display:none;"
            document.getElementById("tiempo").style="display:none;"
            document.getElementById("minuts").style="display:none;"
            document.getElementById('letters').style="display:none;"
            document.getElementById('showQuestion').style="display:none;"
            document.getElementById('userAnswer').style="display:none;"
            document.getElementById('acceptar').style="display:none;"
            document.getElementsByClassName('letter').style="display:none;"
            document.getElementById('Okrepeat').style="display:none;"//pq no es mostri
            document.getElementById('repeatPasapalabra').style="display:none;"
            document.getElementById('showresults').style="display:none;"
            document.getElementById('results').style="display:none;"
            document.getElementById("end").style="display:none;" 
            document.getElementById("questionPlayAgain").style="display:block;"
            document.getElementById("playAgainYes").style="display:block;"
            document.getElementById("playAgainNo").style="display:block;"
            
        }
       
    }, 1000);
}

