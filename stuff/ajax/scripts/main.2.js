var form = document.getElementsByTagName('form')[0];
var input = document.getElementsByTagName('input')[0];
var list = document.getElementsByTagName('ul')[0];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var query = input.value;

    search(query);
});

function search(query) {
    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText);

        list.innerHTML = '';

        if (res.error)
            listNoResults(res.error);
        else
            listResults(res.data);
    };

    xhr.send();
}

function listNoResults(message) {
    var item = document.createElement('li');

    item.innerText = message;

    list.appendChild(item);
}

function listResults(ducklings) {
    ducklings.forEach(function (duckling) {
        var item = document.createElement('li');

        item.innerText = duckling.title;

        var image = document.createElement('img');

        image.src = duckling.imageUrl;
        image.style.width = '100px';

        item.appendChild(image);

        list.appendChild(item);
    });
}