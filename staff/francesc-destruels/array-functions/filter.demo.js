console.log('DEMO', 'filter');

var a = ["hair","carrot","tomato","sun","minishcap","alloyd"];

console.log('case 1');

console.log(filter(a, function(v){return v.length > 5}));
// newArray = [carrot, tomato, minishcap, alloyd]

console.log('case 2');

console.log(filter(a, function(v){return v.length -2 > 5}));
// newArray = [minishcap]
