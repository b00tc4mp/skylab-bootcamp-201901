
main();

function main() {

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];


interantionUserInterface();

function interantionUserInterface() {
    var continueRunnig, allFlys, average, scales, lastFive, exit, strExitMessage, option, failInput,strOptionInput;
    continueRunnig = true;
    allFlys = 1;
    average = 2;
    scales = 3;
    lastFive = 4;
    exit = 0;
    option = 0;
    strOptionInput = '';
    failInput = -1;

    strExitMessage = '+ Thanks for check on our flys, we hope to have you back soon!!!';
    var userName = prompt('+ Wellcome to DaniAirlines, enter your user name please...');
    alert('+ Hi ' + userName + ' now you are into the sistem...');
    
    var strOptionsMessage = '\n What woud you like to know: ' +
    '\n* 1 --> See all flys available. \n* 2 --> Check average cost of all flys. \n' +
    '* 3 --> Show scale flys. \n* 4 --> Show last five flys of the day. \n' +
    '* 0 --> Exit and close the program.';
    
    var failInputMessage = 'Enter a correct option please...'

    while (continueRunnig) {
       // debugger
        strOptionInput = prompt(strOptionsMessage); 
        option = Number.parseInt(strOptionInput);
        if(option === NaN || option > 4 || option < 0) {
            option = failInput;
        }
        switch (option) {
            case allFlys:
                alert(getAllFlys());
                break;            
            case average:
                alert(calculateAverageCost());
                break;            
            case scales:
                alert(hasScale());
                break;           
            case lastFive:
                alert(showLastFiveFlys());
                break;
            case failInput:
                alert(failInputMessage);
                break;           
            case exit:
                continueRunnig = false;
                alert(strExitMessage);
                break;

        }

    }
        
}


function getAllFlys() {
    var strAllFlys = '';
    flights.forEach(function(element) {
        strAllFlys += '+ Fly to ' + element.to + ' from ' + element.from +
                        ' cost: ' + element.cost + ' and ' + (element.scale ? 'has scales' : 'has no scales') + '\n';
    });
    return '    --- ALL FLYS AVAILABLE --- \n' + strAllFlys;
}

function calculateAverageCost() {
    var averageCost = 0;
    var totalAmountFlys = flights.length + 1;

    flights.forEach(function(element, index) {
        averageCost += element.cost;
    });
    averageCost = averageCost / totalAmountFlys;
    return '   --- AVERAGE COST ---\n' + averageCost.toFixed(3);
}

function hasScale() {
    var scaleFlysArray = flights.filter(element => element.scale == true);
    var strScaleFlys = '';
    scaleFlysArray.forEach(function(element) {
        strScaleFlys += '+ Fly to ' + element.to + ' from ' + element.from +
                        ' cost: ' + element.cost  + '\n' ;
    });

    return '    --- ALL SCALE FLYS --- \n' + strScaleFlys;
}

function showLastFiveFlys() {
    var lastFiveFlys = flights.filter(element => element.id >= flights.length - 5);
    var strLastFiveFlys = '';
    lastFiveFlys.forEach(function(element) {
        strLastFiveFlys += '+ Fly to ' + element.to + ' from ' + element.from +
                        ' cost: ' + element.cost  + ' and ' + (element.scale ? 'has scales' : 'has no scales') + '\n';
    });

    return '    --- LAST FIVE FLYS --- \n' + strLastFiveFlys;

}

}




