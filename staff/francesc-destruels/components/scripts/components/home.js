'use strict'

class Home extends Component {
    constructor(container, onLogOut, onSearch, onDetail, literals) {
        super(container)

        // ARGUMENT 1 FUNCION LOOGOUT LLAMADA A LOGICA 1
        this.onLogOut = onLogOut

        //ARGUMENT 2 FORM DEL SEARCH LLAMADA A LOGICA 2
        const form = this.container.children[2]
        new Search(form, onSearch)

        // CONTIENE EL RESULTADO DE LA BUSQUEDA 
        const ul = this.container.children[3]

        const results = new Results(ul, onDetail)
        results.visible = false

        this.__results__ = results

        //ARGUMENT 3 CONTENDRA EL RESULTADO DEL DETAIL LLAMADA A LOGICA 3
        const article = this.container.children[4]

        const detail = new Detail(article)
        detail.visible = false

        this.__detail__ = detail

        //ARGUMENT 4 y 5 FIJAR IDIOMA
        this.__literals__ = literals
    }

    // SETTER PARA CUANDO SE ACTIVA EL CLICK EN EL BOTON DE LOGOUT
    set onLogOut(callback) {
        this.container.children[1].addEventListener('click', function (event){
            event.preventDefault()
            callback()
        })
    }

    // SETTER PARA CUANDO RESULTS SE MODIFICA DESPIERTA EL UL;
    set results(results) {
        this.__results__.items = results
        this.__results__.visible = true
        this.__detail__.visible = false
    }

    //SETTER PARA DESPERTAR A ARTICLE Y DORMIR RESULTS
    set detail(detail) {
        this.__detail__.items = detail
        this.__results__.visible = false
        this.__detail__.visible = true
    }

    //SETTER PARA CAMBIAR IDIOMA Y AÑADIR USER
    set language(language) {
        const literals = this.__literals__[language]
        this.container.children[0].innerText = literals.title + ' ' + this.name + '!'
        this.container.children[1].innerText = literals.logOut
        this.container.children[2].children[1].innerText = literals.search
    }
}
