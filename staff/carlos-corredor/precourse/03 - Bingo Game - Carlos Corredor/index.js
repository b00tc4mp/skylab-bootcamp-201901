function bingo() {
    const filas = { // contenido del cartón
        f1: ['01', '02', '03', '04', '05'],
        f2: ['06', '07', '08', '09', '10'],
        f3: ['11', '12', '13', '14', '15']
    };
    const c = { // cuerpo del cartón
        b: [' B ', ' I ', ' N ', ' G', ' O'],
        t: ' ----------------------------------\n',
        p: ' | ',
        s: '\n ----------------------------------' //34 guiones
    };
    
    const fx = [' X ', ' X ', ' X ', ' X ', ' X '];
    const fxCompare = {
        f1: false,
        f2: false,
        f3: false
    };

    function carton () {
        let fila0 = c.t + c.p + c.b.join(c.p) + c.p + c.s;
        let fila1 = c.p  + filas.f1.join(c.p) + c.p + c.s;
        let fila2 = c.p  + filas.f2.join(c.p) + c.p + c.s;
        let fila3 = c.p  + filas.f3.join(c.p) + c.p + c.s;
        return fila0 + '\n' + fila1 + '\n' + fila2 + '\n' + fila3
    };
    
    let bombo = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    function newNumber(){
        let ficha = bombo[Math.floor(Math.random()*bombo.length)];
        bombo.splice(bombo.indexOf(ficha),1)
        return ficha;
    };
    function arrayCompare (o1, o2, a2){
        let counter = 0;
        for(let y in o1){
            for(let i = 0; i < a2.length; i++){
                if(o1[y][i] === a2[i]){
                    counter++
                };
            };
            if((counter === a2.length) && !o2[y]){
                o2[y] = true;
            };
            counter = 0;
            
        }
    };

    let line = '';
    function linea (){
        for(let y in fxCompare){
            if(fxCompare[y]){
            line = '¡LÍNEA!\n'
            }
        }
    };

    let counter2 = 0;
    let n;
    function Bingo(){
        if(counter2 === Object.keys(fxCompare).length){
            let b = confirm('¡¡Bingo!!\n' + 'Ha salido el ' + n + '\n¿Deseas jugar de nuevo?\n' + carton());
            if(b){
                bingo();
                return;
            };
            alert('Chao');
            return;
        };
        Continuar()
    };

    function Continuar(){
        let continuar = confirm(line + 'Ha salido el ' + n + '\n¿Deseas continuar?\n' + carton());
        counter2 = 0;
        newTurn(continuar);
    };

    function newTurn (turno){
        if(!turno){
            alert('Chao');
            return;
        };
        n = newNumber();
        for(let y in filas){
            filas[y] = filas[y].map(x =>{if(parseFloat(x) === n){return ' X '};return x});
        };
        arrayCompare(filas, fxCompare, fx);
        linea ();
        
        for(let y in fxCompare){
            if(fxCompare[y]){
                counter2++
            }
        };
        Bingo ();
    };
    let name = prompt('¡Bienvenido al Bingo Game!\nIntroduce tu nombre');
    if(!name){
        alert('Chao');
        return;
    };
    let turno = confirm(`Hola ${name} este es tu cartón\n¿Deseas jugar?\n` + carton());
    newTurn(turno)
};
bingo();
