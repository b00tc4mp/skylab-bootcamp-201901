'use strict';

/**
 * Duckling API client.
 * 
 * @version 2.0.0
 */
var ducklingApi = {
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    search: function (query, callback) {
        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);

            if (res.error)
                callback(res.error);
            else
                callback(undefined, res.data);
        };

        xhr.onerror = function (error) {
            callback('network error');
        };

        xhr.send();
    }
};

/*
API 2.1.0 => nomes millorem funcionalitat. no li canviem ni el tipu de resultats
x axò no fem versió 3
APi millorada (ALT1), passarem ajax utilitzant jquery:

1er es mostraria l'error i dp el resultat de la trucada.
xhr depen forma part d'ajax.

ress.responseJSOn mirem q estigui definit && si esta definit l'error, direm amb el 
callback, network error

canviem l'api pq falli, li posem un debugger al codi, x veure si agafa l'error
i quin tipu d'error mostra => res.responseJSON.error

l'exemple2, es el q mes s'utilitza, xo x metoge get. si anem a enviar dades 
a un servidor, no la podrem utilitzar (x fer un post). seria $.post
*/
