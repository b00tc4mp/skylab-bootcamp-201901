const detectSSid = require('detect-ssid');

detectSSid(function (error, ssidname) {
    console.log(ssidname);
    const net = ssidname.split('-')
    if(net[0] === 'TELLO') console.log('yesss is tello')

});