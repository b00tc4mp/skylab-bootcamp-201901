
//Global variables:
let mainVar = [[], "", 0];
let records = [
    {userName: "Francesc", numberCorr:  25, time: 150},
    {userName: "WoW", numberCorr:  20, time: 150},
    {userName: "Okay", numberCorr:  15, time: 150},
    {userName: "Some", numberCorr:  10, time: 150},
    {userName: "Badly", numberCorr:  5, time: 150},
];
let numberQuestion = 0;
let interval; // Variable del timer.
let count = 240; // Valor del timer.
let finishing = false;

// Constante global: Preguntas básicas; agrupadas de tres en tres.
const questions = [

    [{id: "A1", question: "With the letter A: Which is the complete name of the most famous robot of Penguin Village?", answer: "arale norimaki" , so: 0, url: "https://upload.wikimedia.org/wikipedia/ja/c/ce/Nerima_Oizumi-animegate_Chronological_table_Dr_Slump_1.jpg"},
    {id: "A2", question: "With the letter A: Osamu Tezuka's robo-kid.", answer: "astroboy", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Astro_Boy-08.jpg/220px-Astro_Boy-08.jpg"},
    {id: "A3", question: "With the letter A: Animaniacs was co-produced by Warner Bros. Animation and the Television division of Steven Spielberg's production company named: ", answer: "amblin", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/5/5f/Amblin_TV_2015.png"}],

    [{id: "B1", question: "With the letter B: Which is the name of the Inspector Gadget's niece's dog?", answer: "brain", so: 0, url: "https://vignette.wikia.nocookie.net/p__/images/0/0c/Braindog.jpg/revision/latest/scale-to-width-down/300?cb=20120228210932&path-prefix=protagonist"},
    {id: "B2", question: `With the letter B: Who chatch phrase is: "Eh... What's up, doc?"`, answer: "bugs bunny", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Bugs_Bunny.svg/220px-Bugs_Bunny.svg.png"},
    {id: "B3", question: "With the letter B: The fifth Disney Princess is...", answer: "belle", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Belle_disney.png/220px-Belle_disney.png"}],

    [{id: "C1", question: "With the letter C: He wears half of his egg shell on his head.", answer: "calimero", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/5/53/Calimero.jpg"},
    {id: "C2", question: "With the letter C: Heidi's wealthy friend's fullname.", answer: "clara sesemann", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Heidi_DVD_1.jpg/220px-Heidi_DVD_1.jpg"},
    {id: "C3", question: "With the letter C: Finish the title: Lupin the Third: The Castle of...", answer: "cagliostro", so: 0, url: "https://occ-0-2433-999.1.nflxso.net/art/b6549/e7ef902fac2faec5152c2806a9eb0f8b959b6549.jpg"}],

    [{id: "D1", question: "With the letter D: Smartest member of the Morgendorffer family.", answer: "daria", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Daria_Morgendorffer.png/222px-Daria_Morgendorffer.png"},
    {id: "D2", question: "With the letter D: Full name of this disney character who was often enemies with Adolf Hitler during the Second World War", answer: "donald duck", so: 0, url: "https://i.pinimg.com/originals/45/f6/b0/45f6b0cadc9752f14b584177c2e52f60.jpg"},
    {id: "D3", question: "With the letter D: Family name of the villain who tried to wear a lot of little dog's skins.", answer: "de vil", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Cruella_de_Vil.gif/220px-Cruella_de_Vil.gif"}],

    [{id: "E1", question: "With the letter E: Full name of the most popular character (USA) on South Park. ", answer: "eric theodore cartman", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png"},
    {id: "E2", question: "With the letter E: Real name of Flynn Rider, main masculine character in Tangled.", answer: "eugene", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/4/48/Flynn_Rider_Eugene_Fitzherbert_Tangled.png"},
    {id: "E3", question: "With the letter E: Object of Judge Claude Frollo sexual obsesion.", answer: "esmeralda", so: 0, url: "https://vignette.wikia.nocookie.net/disneyfanon/images/a/a2/Esmeralda_transparent.png/revision/latest?cb=20160609153443"}],

    [{id: "F1", question: "With the letter F: Full name of the asshole who did this game", answer: "francesc destruels rossello", so: 0, url: "./yobanana.jpg"},
    {id: "F2", question: "With the letter F: Dreamwork's green princess' name.", answer: "fiona", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/b/b9/Princess_Fiona.png"},
    {id: "F3", question: "With the letter F: From the Hunchback of Notre Dame, family name of the main antagonist.", answer: "frollo", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/ClaudeFrollo.PNG/200px-ClaudeFrollo.PNG"}],

    [{id: "G1", question: "With the letter G: Which is the name of the disney character who sing Moher's know best?", answer: "gothel", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Gothel.png/220px-Gothel.png"},
    {id: "G2", question: "With the letter G: Name of the evil wizard that's always trying to capture the Smurfs.", answer: "gargamel", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Gargamel_and_Azrael_from_the_Smurfs.jpg/250px-Gargamel_and_Azrael_from_the_Smurfs.jpg"},
    {id: "G3", question: "With the letter G: Originally known as Dippy Dawg, the character is nowadays commonly known simply as:", answer: "goofy", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Goofy_Debut.PNG/250px-Goofy_Debut.PNG"}],

    [{id: "H1", question: "With the letter H: Who hears a who?", answer: "horton", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/8/88/Horton_the_Elephant.png"},
    {id: "H2", question: "With the letter H: If he went from zero to hero... who he is?", answer: "hercules", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Hercules_%281997_film%29_poster.jpg/220px-Hercules_%281997_film%29_poster.jpg"},
    {id: "H3", question: "With the letter H: Underworld master.", answer: "hades", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/2/27/Hades_Disney_transparent.png/revision/latest?cb=20181020022702"}],

    [{id: "I1", question: "Contain the letter I: Full name of the Tomboy character from Recess.", answer: "ashley spinelli", so: 0, url: "https://vignette.wikia.nocookie.net/recess/images/2/22/Spinelli.JPG/revision/latest?cb=20161220161921"},
    {id: "I2", question: "With the letter I: Disney redeemed parrot.", answer: "iago", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/0/05/Iago_pose.png/revision/latest?cb=20180705134043"},
    {id: "I3", question: "Contain the letter I: Pride Land's wise mandrill.", answer: "rafiki", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/e/ee/Rafiki_KHII.png/revision/latest?cb=20130129003802"}],

    [{id: "J1", question: "With the letter J: Voice of the concience", answer: "jiminy cricket", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/b/bb/Jiminyumbrella.png/revision/latest?cb=20120507024442"},
    {id: "J2", question: "With the letter J: He enjoys to annoy lovely cats.", answer: "jerry", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/2/2f/Jerry_Mouse.png"},
    {id: "J3", question: "With the letter J: Batman's main psychopath supervillain.", answer: "joker", so: 0, url: "https://vignette.wikia.nocookie.net/batmantheanimatedseries/images/c/c6/Joker_Card.jpg/revision/latest?cb=20160410014213"}],

    [{id: "K1", question: "Contain the letter K: Real full name of Kinnikuman.", answer: "suguru kinniku", so: 0, url: "https://www.absoluteanime.com/ultimate_muscle/kinnikuman.jpg"},
    {id: "K2", question: "With the letter K: Which one os the Simpson's aliens were elected president of USA during a Treehouse of Horror episodes?", answer: "kang", so: 0, url: "https://i.imgur.com/vX05bVq.jpg"},
    {id: "K3", question: "With the letter K: Disney more arrogant, comically conceited, selfish and cocky Emperor name.", answer: "kuzko", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/6/69/Grooveposter.jpg"}],

    [{id: "L1", question: "With the letter L: Who was the mind behind all the events on the first Pokemon Movie?", answer: "mewtwo", so: 0, url: "https://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png"},
    {id: "L2", question: "Contain the letter L: Nemo's mother.", answer: "coral", so: 0, url: "https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/coral-finding-nemo-98.3.jpg"},
    {id: "L3", question: "With the letter L: Full name. He is always caring his security blanket.", answer: "linus van pelt", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Linus_van_Pelt.gif/220px-Linus_van_Pelt.gif"}],

    [{id: "M1", question: "With the letter M: Japanese name of Case Close (also known as Detective Conan).", answer: "meitantei conan", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Detective_Conan_movie_2016.jpg/220px-Detective_Conan_movie_2016.jpg"},
    {id: "M2", question: "Contain the letter M: Full name. Rich uncle of Donal Duck.", answer: "scrooge mcduck", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Scrooge_McDuck.png/220px-Scrooge_McDuck.png"},
    {id: "M3", question: "With the letter M: Full name of Sully's green friend and workmate.", answer: "mike wazowski", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/3/38/Mike1.png/revision/latest?cb=20181009061353"}],

    [{id: "N1", question: "With the letter N: In which network did Aang start his adventures to master the elements?", answer: "nickelodeon", so: 0, url: "https://s22294.pcdn.co/wp-content/uploads/Screen-shot-2013-05-28-at-10.06.37-AM.png"},
    {id: "N2", question: "With the letter N: Which is Apu's family name?", answer: "nahasapeemapetilon", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/2/23/Apu_Nahasapeemapetilon_%28The_Simpsons%29.png"},
    {id: "N3", question: "With the letter N: From which movie starring a Skellington was Henry Selick director?", answer: "the nightmare before christmas", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/The_nightmare_before_christmas_poster.jpg/220px-The_nightmare_before_christmas_poster.jpg"}],

    [{id: "O1", question: "With the letter O: All pirates from Oda's work are looking for one treasure. How is it called?", answer: "one piece", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg/220px-One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg"},
    {id: "O2", question: "Contain the letter O: Where took the third season of Pokemon?", answer: "jhoto", so: 0, url: "https://cdn.bulbagarden.net/upload/thumb/6/64/JohtoMap.png/1200px-JohtoMap.png"},
    {id: "O3", question: "With the letter O: Loves to bet with other's lifes are on the line", answer: "oogie boogie", so: 0, url: "https://vignette.wikia.nocookie.net/disney/images/2/21/Ooogiedisney.png/revision/latest?cb=20130526073335"}],

    [{id: "P1", question: "With the letter P: Who is SpongeBob's best pal?", answer:  "patrick star", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/220px-Patrick_Star.svg.png"},
    {id: "P2", question: "With the letter P: Full name of the character whose sexuality shocked Marge Simpson.", answer: "patty bouvier", so: 0, url: "https://pbs.twimg.com/profile_images/562297025300279296/-nAj_Hx2.jpeg"},
    {id: "P3", question: "With the letter P: In which serie we can find a dog called Snoopy?", answer: "peanuts", so: 0, url: "https://avatar.amuniversal.com/feature_avatars/recommendation_images/features/pe/large_rec-201701251556.jpg"}],

    [{id: "Q1", question: "With the letter Q: The Hunchback of Notre-Dame.", answer: "quasimodo", so: 0, url: "https://vignette.wikia.nocookie.net/topstrongest/images/2/2b/Quasimodo_1.png/revision/latest?cb=20171219203510"},
    {id: "Q2", question: "With the letter Q: Which card of the deck tryed to behead Alice? ", answer: "queen of hearts", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/DisneyQueenHearts.jpg/200px-DisneyQueenHearts.jpg"},
    {id: "Q3", question: "With the letter Q: Duck version of Dracula", answer: "quackula", so: 0, url: "https://vignette.wikia.nocookie.net/vampires/images/a/ac/Quackula.jpeg/revision/latest?cb=20140712234444"}],

    [{id: "R1", question: "With the letter R: In wich show was the little Tommy Pickles one of the main characters?", answer: "rugrats", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/6/66/Rugrats_logo.png"},
    {id: "R2", question: "With the letter R: Author of Ranma Nibun-no-ichi.", answer: "rumiko takahashi", so: 0, url: "https://pm1.narvii.com/6470/fc1fec0baa13c0e6cc248aca8084c7b0543e9e05_hq.jpg"},
    {id: "R3", question: "Contain the letter R: An object or person that bends something.", answer: "bender", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png"}],

    [{id: "S1", question: "With the letter S: Who was the mind behind Animaniacs?", answer: "steven spielberg", so: 0, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/220px-Steven_Spielberg_by_Gage_Skidmore.jpg"},
    {id: "S2", question: "With the letter S: Who is Scooby-Doo best friend?", answer: "shaggy rogers", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/8/87/ShaggyRogers.png"},
    {id: "S3", question: "With the letter S: For most of the show there is only one femenine Smurf. Her name is?", answer: "smurfette", so: 0, url: "https://vignette.wikia.nocookie.net/universe-of-smash-bros-lawl/images/e/ea/Smurfette_2017_Movie_3.png/revision/latest?cb=20171028132434"}],

    [{id: "T1", question: "With the letter T: 'I tawt I taw a puddy tat!'", answer: "tweety", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tweety.svg/1200px-Tweety.svg.png"},
    {id: "T2", question: "Contain the letter T: Title of the cartoon where Big Nose is annoyed by a pink cat.", answer: "the pink panther", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Pink_Panther.png/250px-Pink_Panther.png"},
    {id: "T3", question: "With the letter T: Bubble, Blossom and Buttercup, they are...!?", answer: "the powerpuff girls", so: 0, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/The_Powerpuff_Girls_%282016%29_reboot_logo.svg/1200px-The_Powerpuff_Girls_%282016%29_reboot_logo.svg.png"}],

    [{id: "U1", question: "Contain the letter U: 17th and final Angel's human full name.", answer: "kaworu nagisa", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/4/40/Eva24DC_Kaworu.jpg"},
    {id: "U2", question: "With the letter U: Poor unfortunate souls...", answer: "ursula", so: 0, url: "https://vignette.wikia.nocookie.net/villains/images/1/15/UrsulaOfficial.png/revision/latest?cb=20180731222129"},
    {id: "U3", question: "Contain the letter U: Full name of the Warner Bros contrapart of Donald Duck.", answer: "daffy duck", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Daffy_Duck.svg/1200px-Daffy_Duck.svg.png"}],

    [{id: "V1", question: "With the letter V: Timmy is an average kid... Mom and Dad and **answer**... ", answer: "vicky", so: 0, url: "https://vignette.wikia.nocookie.net/fairlyoddparents/images/8/87/Vicky7.png/revision/latest?cb=20130125001514&path-prefix=en"},
    {id: "V2", question: "With the letter V: Trigun main chracter's frist name", answer: "vash", so: 0, url: "http://pm1.narvii.com/6195/cef26ca30c374afb449f010d28aa4075c89bcd72_00.jpg"},
    {id: "V3", question: "With the letter V: `It's over 9000!` -said **answer**.", answer: "vegeta", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg"}],

    [{id: "W1", question: "With the letter W: Fred Flinstone smart wife's name", answer: "wilma", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Wilma_Flintstone.png/165px-Wilma_Flintstone.png"},
    {id: "W2", question: "With the letter W: One of Timmy's fairies", answer: "wanda", so: 0, url: "https://www.cartoon-clipart.co/amp/images/wanda3.png"},
    {id: "W3", question: "With the letter W: Artistic name of the actress behind the voice of one of Scar's sideckicks.", answer: "whoopi goldberg", so: 0, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Whoopi_Goldberg_at_a_NYC_No_on_Proposition_8_Rally.jpg/220px-Whoopi_Goldberg_at_a_NYC_No_on_Proposition_8_Rally.jpg"}],

    [{id: "X1", question: "Contain the letter X: Name of a popular black cat who first appeared during the silent era.", answer: "felix", so: 0, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/1200px-Felix_the_cat.svg.png"},
    {id: "X2", question: "Contain the letter X: Professor X full name", answer: "charles xavier", so: 0, url: "https://vignette.wikia.nocookie.net/marvelanimated/images/4/4a/Professor_X.jpg/revision/latest?cb=20161120014846"},
    {id: "X3", question: "With the letter X: Gargoyles main villain's family name.", answer: "xanatos", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Xanatos.JPG/250px-Xanatos.JPG"}],

    [{id: "Y1", question: "With the letter Y: Wich is the name of the ex-bandit friend of Goku?", answer: "yamcha", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/a/a9/Yamcha.jpg"},
    {id: "Y2", question: "Contain the letter Y: Turanga Leela's husband's first name. ", answer: "fry", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/220px-Philip_Fry.png"},
    {id: "Y3", question: "With the letter Y: Who lives in Jellystone Park?", answer: "yogi bear", so: 0, url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Yogi_Bear_Yogi_Bear.png/200px-Yogi_Bear_Yogi_Bear.png"}],

    [{id: "Z1", question: "Contain the letter Z: Complete name of the first human ally of Bunny Tsukino.", answer: "ami mizuno", so: 0, url: "https://vignette.wikia.nocookie.net/sailormoon/images/d/d8/InfoAmi.png/revision/latest?cb=20110921183949"},
    {id: "Z2", question: "Contain the letter Z: Full name of Karekano main character.", answer: "yukino miyazawa", so: 0, url: "https://i.pinimg.com/originals/2a/8b/c3/2a8bc3ec68620f18cd0adb7d0e49fc7b.jpg"},
    {id: "Z3", question: "With the letter Z: Name of Buzz Lightyear' serie nemesis.", answer: "zurg", so: 0, url: "https://vignette.wikia.nocookie.net/disney-infinity/images/5/5f/ZURGPROMOART.png/revision/latest?cb=20131014174628"}],
]

// Making the circle;
let abc = [
    {letter: "a", top: 12, left: 51.75},
    {letter: "b", top: 14.5, left: 59.75},
    {letter: "c", top: 18.5, left: 66.75},
    {letter: "d", top: 24.5, left: 73},
    {letter: "e", top: 31.5, left: 78.5},
    {letter: "f", top: 39.5, left: 82},
    {letter: "g", top: 48, left: 83},
    {letter: "h", top: 56.5, left: 82},
    {letter: "i", top: 64.5, left: 78.5},
    {letter: "j", top: 71.5, left: 73},
    {letter: "k", top: 77, left: 66.75},
    {letter: "l", top: 81, left: 59.75},
    {letter: "m", top: 84, left: 51.75},
    {letter: "n", top: 84, left: 44},
    {letter: "o", top: 81, left: 36},
    {letter: "p", top: 77, left: 29},
    {letter: "q", top: 71.5, left: 22.75},
    {letter: "r", top: 64.5, left: 17.25},
    {letter: "s", top: 56.5, left: 13.75},
    {letter: "t", top: 48, left: 12.75},
    {letter: "u", top: 39.5, left: 13.75},
    {letter: "v", top: 31.5, left: 17.25},
    {letter: "w", top: 24.5, left: 22.75},
    {letter: "x", top: 18.5, left: 29},
    {letter: "y", top: 14.5, left: 36},
    {letter: "z", top: 12, left: 44}
];

for (let i = 0; i < abc.length; i++){
    document.getElementById("roulette").innerHTML += `<div id="${i}" class="sphere" style="top: ${abc[i].top}%; left: ${abc[i].left}%;"><p class="letter"> ${abc[i].letter.toUpperCase()}</p></div>`;
}

// Para introducir las respuestas con intro:
let input = document.getElementsById(`userAnswer`);

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("click").click();
    }
});

// Una vez leidas las normas te pide un nombre y que elijas un avatar
function data() {
    document.getElementById("changes").innerHTML =  `
    <div id="pregame"  class="relative">
    <form id="initial questions" style="margin-top: 5%">
    <b>Introduce your name!</b> <input type="text" id="userName" value=""><br><br>
    Pick your avatar! <br><br>
    <input id="male" type="image" class="avatar" src="./male.png" onclick ="avatar('m'); return false;">
    <input id="female" type="image" class="avatar" src="./female.png" onclick ="avatar(''); return false;"><br><br>
    <input type="button" class="intro" value="Start" onclick="checkingUsername()";>    
    </form>
    </div>`;
}

//Coloca el avatar en el circulo
function avatar(name){
    document.getElementById('avatar').alt = "avatar";
    if (name === "m"){
        document.getElementById('avatar').src = "./male.png";
    } else {document.getElementById('avatar').src = "./female.png";}

}

//Comprueba que se haya introducido un avatar y un nombre
function checkingUsername(){

    let name = document.getElementById("userName").value;

    if (name !== "" &&  (document.getElementById("avatar").alt !== "telecirco") ){        
        mainVar[1] = name;
        document.getElementById("changes").innerHTML = `<div id="pregame"  class="pregame">`;
        return pasaPalabraMain();
    } else {
        return document.getElementById("changes").innerHTML =  `
        <div id="pregame"  class="relative">
        <form id="initial questions" style="margin-top: 5%">
        <b>Introduce your name!</b> <input type="text" id="userName" value=""><br><br>
        Pick your avatar! <br><br>
        <input id="male" type="image" class="avatar" src="./male.png" onclick ="avatar('m'); return false;">
        <input id="female" type="image" class="avatar" src="./female.png" onclick ="avatar(''); return false;"><br><br>
        <input type="button" value="Start" onclick="checkingUsername()";>    
        </form>
        </div>`;
    }
}

// Timer

function countdown(){
            interval = setInterval(function(){
            document.getElementById('timer').innerHTML = `<p class="letter">${count}</p>`;

            count--;
            if (count === -1){
                clearInterval(interval);
                document.getElementById('questions').innerHTML="<p>Time is over!</p>";
                return savingPoints();}
        }, 1000);
}
    
//Game
// Por cada grupo de preguntas hace un randon de 0-1 o 2 y introduce esa pregunta en el mainVar[0].
function pickingQuestions(){
    mainVar[0] = [];
    for(let i = 0; i < questions.length; i++){
        let pickingQuestion = Math.floor(Math.random()*3);
        mainVar[0].push(questions[i][pickingQuestion]);
    }
    return mainVar[0];
}


//función inicial
function pasaPalabraMain(){

    pickingQuestions();
    countdown();    
    return nextQuestion();
    
}

// Para ir de pregunta en pregunta
function nextQuestion(){

    if (mainVar[0].findIndex(o => o.so === 0) != -1) {
        numberQuestion = (mainVar[0].findIndex(o => o.so === 0));

    }else if (mainVar[0].findIndex(o => o.so === 3) != -1){
        for (i = 0; i < mainVar[0].length; i++){ // Las busca y les devuelve el valor de 0
            if (mainVar[0][i].so === 3){
                mainVar[0][i].so = 0;
            }
        }
        numberQuestion = (mainVar[0].findIndex(o => o.so === 0));

    }else {
        clearInterval(interval);
        document.getElementById("questions").innerHTML = `<p class="centered">Well done!</p>`;
        return savingPoints();
    }

    return document.getElementById("questions").innerHTML = `<form class="centered"><b>${mainVar[0][numberQuestion].question}</b><br><br>
            <input id="userAnswer" value="">
            <button id="click" onclick="checkAnswer(1)">Check</button>
            <input id="palacabra" type="button" value="Pasapalabra" onclick="checkAnswer(0)">
            </form>`;
 
}

// Para checkear las respuestas
function checkAnswer(num){
    let answer = "";

    if (num === 1){
        answer = (document.getElementById("userAnswer").value).toLowerCase();
    
        switch(answer){
            case null:
            case undefined:
            case "":
                document.getElementById(`${numberQuestion}`).style.background = `red`;
                mainVar[0][numberQuestion].so = 2;
                document.getElementById("changes").innerHTML =  `The answer was <b>${mainVar[0][numberQuestion].answer}</b><br><br><br>
                <img src="${mainVar[0][numberQuestion].url}" alt="${mainVar[0][numberQuestion].answer}" class="max">`;
                nextQuestion();
                break;
            case "end":
                clearInterval(interval);
                document.getElementById("questions").innerHTML = `<p><b>So bad! Look above<b></p>`;
                finishing = true;
                savingPoints();
                break;
            case mainVar[0][numberQuestion].answer:
                document.getElementById(`${numberQuestion}`).style.background = `green`;
                mainVar[0][numberQuestion].so = 1;
                mainVar[2]++;
                document.getElementById("changes").innerHTML =  `You were right! The answer was <b>${mainVar[0][numberQuestion].answer}</b>!</b><br><br><br>
                <img src="${mainVar[0][numberQuestion].url}" alt="${mainVar[0][numberQuestion].answer}" class="max">`;
                document.getElementById("points").innerHTML = `<p class="letter">${mainVar[2]}</p>`;
                nextQuestion();
                break;
            case "pasapalabra":
                document.getElementById(`${numberQuestion}`).style.background = `yellow`;
                mainVar[0][numberQuestion].so = 3;
                nextQuestion();
                break;
            default:
                document.getElementById(`${numberQuestion}`).style.background = `red`;
                mainVar[0][numberQuestion].so = 2;
                document.getElementById("changes").innerHTML =  `The answer was <b>${mainVar[0][numberQuestion].answer}</b><br><br><br>
                <img src="${mainVar[0][numberQuestion].url}" alt="${mainVar[0][numberQuestion].answer}" class="max">`
                nextQuestion();
            break;
        } 
    } else {
        document.getElementById(`${numberQuestion}`).style.background = `yellow`;
        mainVar[0][numberQuestion].so = 3;
        return nextQuestion();
    }
}

// Comprueba los aciertos en la partida y si es superior al de alguno de los ya almacenados lo almacena. 
function savingPoints(){

    if (count === -1) {
        return showRecords(); 
    }else if (finishing === true){
        return showRecords();
    }else if (records.length < 5){
        if (records.length !== 0){
            for (i = 0; i < records.length; i++){
                if(mainVar[2] > records[i].numberCorr){
                    records.splice(i, 0, {userName:  mainVar[1], numberCorr:  mainVar[2]});
                    return showRecords();
                } else if (i === records.length - 1){
                    records.push({userName: mainVar[1], numberCorr:  mainVar[2]});
                    return showRecords();
                }
            }  
        }else{ 
            records.push({userName:  mainVar[1], numberCorr:  mainVar[2][0]});
            return showRecords();
        }
    } else {
        for (i = 0; i < records.length; i++){
            if(mainVar[2] > records[i].numberCorr){
                records.pop();
                records.splice(i, 0, {userName:  mainVar[1], numberCorr:  mainVar[2]});
                return showRecords();
            }
        }
        showRecords();
    }
}

//mostrar record

function showRecords(){

    document.getElementById("rankingdiv").innerHTML =    
    
    `<div id="Records"  class="ranking" style="text-align: center">
    <h3 class="relative"> Final Score:<\h3>
    You got ${mainVar[2]} correct ${mainVar[2] === 1 ? "answer" : "answers"} within ${(240 - count)} seconds!<br><br>
    <h3 class="relative"> Top 5<\h3>
    <div id="Ranking">
    </div> 
    <div id="playAgain" class="centered">
    <br><br><br><input type="button" class="intro" value="Replay" onclick="location.reload()">
    </div> 
    </div>`;

    for(let i = 0; i < records.length; i++){
        const {userName, numberCorr} = records[i]; // Usamos esto pra no tener que pone record[1].lo que sea en el documento. 
        document.getElementById("Ranking").innerHTML += `On ${(i+1)} position ${userName} with ${numberCorr} \u2705 <br>`;
    }
}
