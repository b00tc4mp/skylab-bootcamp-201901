
// Preguntas básicas; agrupadas de tres en tres.
const questions = [

    [{id: "A1", question: "With the letter A: Which is the complete name of the most famous robot of Penguin Village?", answer: "arale norimaki" , so: 0},
    {id: "A2", question: "With the letter A: Osamu Tezuka's robo-kid.", answer: "astroboy", so: 0},
    {id: "A3", question: "With the letter A: Animaniacs was co-produced by Warner Bros. Animation and the Television division of Steven Spielberg's production company named: ", answer: "amblin", so: 0}],

    [{id: "B1", question: "With the letter B: Which is the name of the Inspector Gadget's niece's dog?", answer: "brain", so: 0},
    {id: "B2", question: `With the letter B: Who chatch phrase is: "Eh... What's up, doc?"`, answer: "bugs bunny", so: 0},
    {id: "B3", question: "With the letter B: The fifth Disney Princess is...", answer: "belle", so: 0}],

    [{id: "C1", question: "With the letter C: He wears half of his egg shell on his head.", answer: "calimero", so: 0},
    {id: "C2", question: "With the letter C: Heidi's wealthy friend's fullname.", answer: "clara sesemann", so: 0},
    {id: "C3", question: "With the letter C: Finish the title: Lupin the Third: The Castle of...", answer: "cagliostro", so: 0}],

    [{id: "D1", question: "With the letter D: Smartest member of the Morgendorffer family.", answer: "daria", so: 0},
    {id: "D2", question: "With the letter D: Full name of this disney character who was often enemies with Adolf Hitler during the Second World War", answer: "donald duck", so: 0},
    {id: "D3", question: "With the letter D: Family name of the villain who tried to wear a lot of little dog's skins.", answer: "de vil", so: 0}],

    [{id: "E1", question: "With the letter E: Full name of the most popular character (USA) on South Park. ", answer: "eric theodore cartman", so: 0},
    {id: "E2", question: "With the letter E: Real name of Flynn Rider, main masculine character in Tangled.", answer: "eugene", so: 0},
    {id: "E3", question: "With the letter E: Object of Judge Claude Frollo sexual obsesion.", answer: "esmeralda", so: 0}],

    [{id: "F1", question: "With the letter F: Full name of the asshole who did this game", answer: "francesc destruels rossello", so: 0},
    {id: "F2", question: "With the letter F: Dreamwork's green princess' name.", answer: "fiona", so: 0},
    {id: "F3", question: "With the letter F: From the Hunchback of Notre Dame, family name of the main antagonist.", answer: "frollo", so: 0}],

    [{id: "G1", question: "With the letter G: Which is the name of the disney character who sing Moher's know best?", answer: "gothel", so: 0},
    {id: "G2", question: "With the letter G: Name of the evil wizard that's always trying to capture the Smurfs.", answer: "gargamel", so: 0},
    {id: "G3", question: "With the letter G: Originally known as Dippy Dawg, the character is nowadays commonly known simply as:", answer: "goofy", so: 0}],

    [{id: "H1", question: "With the letter H: Who hears a who?", answer: "horton", so: 0},
    {id: "H2", question: "With the letter H: If he went from zero to hero... who he is?", answer: "hercules", so: 0},
    {id: "H3", question: "With the letter H: Underworld master.", answer: "hades", so: 0}],

    [{id: "I1", question: "Contain the letter I: Full name of the Tomboy character from Recess.", answer: "ashley spinelli", so: 0},
    {id: "I2", question: "With the letter I: Disney redeemed parrot.", answer: "iago", so: 0},
    {id: "I3", question: "Contain the letter I: Pride Land's wise mandrill.", answer: "rafiki", so: 0}],

    [{id: "J1", question: "With the letter J: Voice of the concience", answer: "jiminy cricket", so: 0},
    {id: "J2", question: "With the letter J: He enjoys to annoy lovely cats.", answer: "jerry", so: 0},
    {id: "J3", question: "With the letter J: Batman's main psychopath supervillain.", answer: "joker", so: 0}],

    [{id: "K1", question: "Contain the letter K: Real full name of Kinnikuman.", answer: "suguru kinniku", so: 0},
    {id: "K2", question: "With the letter K: Which one os the Simpson's aliens were elected president of USA during a Treehouse of Horror episodes?", answer: "kang", so: 0},
    {id: "K3", question: "With the letter K: Disney more arrogant, comically conceited, selfish and cocky Emperor name.", answer: "kuzko", so: 0}],

    [{id: "L1", question: "With the letter L: Who was the mind behind all the events on the first Pokemon Movie?", answer: "mewtwo", so: 0},
    {id: "L2", question: "Contain the letter L: Nemo's mother.", answer: "coral", so: 0},
    {id: "L3", question: "With the letter L: Full name. He is always caring his security blanket.", answer: "linus van pelt", so: 0}],

    [{id: "M1", question: "With the letter M: Japanese name of Case Close (also known as Detective Conan).", answer: "meitantei konan", so: 0},
    {id: "M2", question: "Contain the letter M: Full name. Rich uncle of Donal Duck.", answer: "scrooge mcduck", so: 0},
    {id: "M3", question: "With the letter M: Full name of Sully's green friend and workmate.", answer: "mike wazowski", so: 0}],

    [{id: "N1", question: "With the letter N: In which network did Aang start his adventures to master the elements?", answer: "nickelodeon", so: 0},
    {id: "N2", question: "With the letter N: Which is Apu's family name?", answer: "nahasapeemapetilon", so: 0},
    {id: "N3", question: "With the letter N: From which movie starring a Skellington was Henry Selick director?", answer: "the nightmare before christmas", so: 0}],

    [{id: "O1", question: "With the letter O: All pirates from Oda's work are looking for one treasure. How is it called?", answer: "one piece", so: 0},
    {id: "O2", question: "Contain the letter O: Where took the third season of Pokemon?", answer: "jhoto", so: 0},
    {id: "O3", question: "With the letter O: Loves to bet with other's lifes are on the line", answer: "oogie boogie", so: 0}],

    [{id: "P1", question: "With the letter P: Who is SpongeBob's best pal?", answer:  "patrick star", so: 0},
    {id: "P2", question: "With the letter P: Full name of the character whose sexuality shocked Marge Simpson.", answer: "patty bouvier", so: 0},
    {id: "P3", question: "With the letter P: In which serie we can find a dog called Snoopy?", answer: "peanuts", so: 0}],

    [{id: "Q1", question: "With the letter Q: The Hunchback of Notre-Dame.", answer: "quasimodo", so: 0},
    {id: "Q2", question: "With the letter Q: Which card of the deck tryed to behead Alice? ", answer: "queen of hearts", so: 0},
    {id: "Q3", question: "With the letter Q: Duck version of Dracula", answer: "quackula", so: 0}],

    [{id: "R1", question: "With the letter R: In wich show was the little Tommy Pickles one of the main characters?", answer: "rugrats", so: 0},
    {id: "R2", question: "With the letter R: Author of Ranma Nibun-no-ichi.", answer: "rumiko takahashi", so: 0},
    {id: "R3", question: "Contain the letter R: An object or person that bends something.", answer: "bender", so: 0}],

    [{id: "S1", question: "With the letter S: Who was the mind behind Animaniacs?", answer: "steven spielberg", so: 0},
    {id: "S2", question: "With the letter S: Who is Scooby-Doo best friend?", answer: "shaggy rogers", so: 0},
    {id: "S3", question: "With the letter S: For most of the show there is only one femenine Smurf. Her name is?", answer: "smurfette", so: 0}],

    [{id: "T1", question: "With the letter T: 'I tawt I taw a puddy tat!'", answer: "tweety", so: 0},
    {id: "T2", question: "Contain the letter T: Title of the cartoon where Big Nose is annoyed by a pink cat.", answer: "the pink panther", so: 0},
    {id: "T3", question: "With the letter T: Bubble, Blossom and Buttercup, they are...!?", answer: "the powerpuff girls", so: 0}],

    [{id: "U1", question: "Contain the letter U: 17th and final Angel's human full name.", answer: "kaworu nagisa", so: 0},
    {id: "U2", question: "With the letter U: Poor unfortunate souls...", answer: "ursula", so: 0},
    {id: "U3", question: "Contain the letter U: Full name of the Warner Bros contrapart of Donald Duck.", answer: "daffy duck", so: 0}],

    [{id: "V1", question: "With the letter V: Timmy is an average kid... Mom and Dad and **answer**... ", answer: "vicky", so: 0},
    {id: "V2", question: "With the letter V: Trigun main chracter's frist name", answer: "vash", so: 0},
    {id: "V3", question: "With the letter V: `It's over 9000!` -said **answer**.", answer: "vegeta", so: 0}],

    [{id: "W1", question: "With the letter W: Fred Flinstone smart wife's name", answer: "wilma", so: 0},
    {id: "W2", question: "With the letter W: One of Timmy's fairies", answer: "wanda", so: 0},
    {id: "W3", question: "With the letter W: Artistic name of the actress behind the voice of one of Scar's sideckicks.", answer: "whoopi goldberg", so: 0}],

    [{id: "X1", question: "Contain the letter X: Name of a popular black cat who first appeared during the silent era.", answer: "felix", so: 0},
    {id: "X2", question: "Contain the letter X: Professor X full name", answer: "charles xavier", so: 0},
    {id: "X3", question: "With the letter X: Gargoyles main villain's family name.", answer: "xanatos", so: 0}],

    [{id: "Y1", question: "With the letter Y: Wich is the name of the ex-bandit friend of Goku?", answer: "yamcha", so: 0},
    {id: "Y2", question: "Contain the letter Y: Turanga Leela's husband's first name. ", answer: "fry", so: 0},
    {id: "Y3", question: "With the letter Y: Who lives in Jellystone Park?", answer: "yogi bear", so: 0}],

    [{id: "Z1", question: "Contain the letter Z: Complete name of the first human ally of Bunny Tsukino.    ", answer: "ami mizuno", so: 0},
    {id: "Z2", question: "Contain the letter Z: Full name of Karekano main character.", answer: "yukino miyazawa", so: 0},
    {id: "Z3", question: "With the letter Z: Name of Buzz Lightyear' serie nemesis.", answer: "zurg", so: 0}],
]

// mainVar[0] = preguntas con las que se juega, mainVar[1] = almacena el usuario; mainVar[2][0/1] = almacena aciertos/fallos
let mainVar = {gameQuest: [], userName: "", correct: 0, incorrect: 0};

//almacenará hasta 5 records por orden de aciertos.
let records = [];

//función principal
function pasaPalabraMain(){

    askName();

    pickingQuestions();

    // Mientras haya alguna pregunta cuya key .so sea 0 seguirá.
    while (mainVar.gameQuest.some(object => object.so === 0)){
        for(let i = 0; i < mainVar.gameQuest.length; i++){
            if (mainVar.gameQuest[i].so === 0){
                console.log(mainVar.gameQuest[i].question); 
                
                
                let asking = prompt(mainVar.gameQuest[i].question);
                let answer = (asking === String)? asking.toLocaleLowerCase() : asking;

                switch(answer) {
                    case null:
                    case undefined:
                    case "":
                        console.log(`It was: ${mainVar.gameQuest[i].answer}!\n\n`);
                        alert(`It was: ${mainVar.gameQuest[i].answer}!`);
                        mainVar.gameQuest[i].so = 2;
                        break;
                    case "end":
                        closeGame();
                        break;
                    case mainVar.gameQuest[i].answer:
                        console.log(`${mainVar.gameQuest[i].answer} is correct!\n\n`);
                        alert(`${mainVar.gameQuest[i].answer} is correct!`);
                        mainVar.gameQuest[i].so = 1;
                        break;
                    case "pasapalabra":
                        continue;
                    default:
                        console.log(`${answer} is incorrect! It was: ${mainVar.gameQuest[i].answer}!\n\n`); 
                        alert(`${answer} is incorrect! It was: ${mainVar.gameQuest[i].answer}!`);
                        mainVar.gameQuest[i].so = 2;
                        break;
                }

            }
        }
    }

    // Escanemoas mainVar[0] en busca de aciertos (1) y errores (2).
    for(let check = mainVar.gameQuest.map(x => x.so), i = 0; i < check.length; i++){ 
        if (check[i] === 1){mainVar.correct++} else {mainVar.incorrect++}
    } 
    
    //Devolvemos un mensaje con la cantidad de errores y aciertos.
    console.log(`You got ${mainVar.correct} correct ${mainVar.correct === 1 ? "answer" : "answers"} and ${mainVar.incorrect} wrong ${mainVar.incorrect === 1 ? "answer" : "answers"}  `);
    
    //Antes de mostrar los records miramos si pueden ser almacenados.
    savingPoints();

    //Se muestran lso records.
    console.log(`\n Records: \n`);
    for(i = 0; i < records.length; i++){
        console.log(`${records[i].userName}: ${records[i].numberCorr} \u2705 and ${records[i].numberInc} \u274E`);
    }

    //Pregunta si queremos jugar de nuevo.
    playAgain();
}

//Pregunta nombre.
function askName() {
    user = prompt(`Please introduce your name`, `Guest`);
    if (user === (null || undefined)){
        confirm('Do you want to close the game?') ?  closeGame() : askName();
    } else {return mainVar.userName = user};
}

// Por cada grupo de preguntas hace un randon de 0-1 o 2 y introduce esa pregunta en el mainVar[0].
function pickingQuestions(){
    mainVar.gameQuest = [];
    for(i = 0; i < questions.length; i++){
        let pickingQuestion = Math.floor(Math.random()*3);
        mainVar.gameQuest.push(questions[i][pickingQuestion]);
    }
    return mainVar.gameQuest;
}

// Comprueba los aciertos en la partida y si es superior al de alguno de los ya almacenados lo almacena. 
function savingPoints(){
    if (records.length < 5){
        if (records.length !== 0){
            for (i = 0; i < records.length; i++){
                if(mainVar.correct > records[i].numberCorr){
                    return records.splice(i, 0, {userName: mainVar.userName, numberCorr:  mainVar.correct, numberInc: mainVar.incorrect});
                } else if (i === records.length - 1){
                    return records.push({userName: mainVar.userName, numberCorr:  mainVar.correct, numberInc: mainVar.incorrect});
                }
            }  
        }else{ 
            return records.push({userName: mainVar.userName, numberCorr:  mainVar.correct, numberInc:  mainVar.incorrect});
        }
    } else {
        for (i = 0; i < records.length; i++){
            if(mainVar.correct > records[i].numberCorr){
                records.pop();
                return records.splice(i, 0, {userName: mainVar.userName, numberCorr:  mainVar.correct, numberInc:  mainVar.incorrect});
            }
        }
    }
}

// Pregunta si se juega de nuevo
function playAgain(){
    if (confirm(`${mainVar.userName}, do you want to play again?`)){
        reestablish();
        return pasaPalabraMain();
    }else {closeGame();
    }
}

//Cierra el juego reestableciendo los valores.
function closeGame() {
    reestablish();
    alert(`Bye, we hope you enjoyed it!`);
}

//Parte del restablecimiento de valores. 
function reestablish(){
    reestablisValuesTo0();
    return mainVar = {gameQuest: [], userName: "", correct: 0, incorrect: 0};
}

// No se por qué pero sin volver todos los valores de .so a 0 antes de borrarlos hacia qu se conservaran....
function reestablisValuesTo0(){
    for(let i = 0; i < mainVar.gameQuest.length; i++){
        mainVar.gameQuest[i].so = 0;
    }
}

// Llamo la función.
pasaPalabraMain();