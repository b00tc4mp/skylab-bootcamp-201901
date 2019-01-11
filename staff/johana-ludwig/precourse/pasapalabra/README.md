Pasapalabra
=========

# Introducction

Juego Pasapalabra

# Functional description

programa pregunta por la definición de una palabra y el usuario deberá adivinar qué palabra es. 

Por ejemplo:

```
'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!
```
***

1. El juego hace una pregunta por cada letra del alfabeto. 

2. al final del juego, y habiendo respondido todas las letras, indica al usuario cuantas letras ha fallado y cuantas ha acertado. 

3. Si el usuario responde con *"pasapalabra"* el usuario tendrá la oportunidad de dejarla para la siguiente ronda. 


## Use cases

Lorem Ipsum...


# Technical description

```javascript
for (let i = 0; i < questions.length; i++) {
    if (questions[i].status === 0) { 
        let userAnswer = prompt(questions[i].question).toLowerCase();
            
    if (userAnswer === questions[i].answer) {
        console.log(`Has acertado!`);
            questions[i].status = 1;
            correctAnswers++;
            count++   
                
    } else if (userAnswer === 'pasapalabra' || userAnswer === '') {
    console.log('Pasamos palabra')
        
    } else {
        console.log(`Has fallado!`);
        questions[i].status = 2;
        wrongAnswers++;
        count++;
        }
    }
    } 
}


```