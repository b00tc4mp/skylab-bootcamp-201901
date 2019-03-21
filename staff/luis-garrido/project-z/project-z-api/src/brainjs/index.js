const brain = require('brain.js');

const network = new brain.NeuralNetwork({
    activation: 'sigmoid',
    hiddenLayers: [4]
});

network.train