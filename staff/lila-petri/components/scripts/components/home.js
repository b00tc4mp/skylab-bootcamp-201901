class Home extends Component{
    constructor(container, onSearch, onDetail, onLogout, literals) {
    super(container);
        
       this.__literals__ = literals;

        const form = this.container.children[1];
        new Search(form, onSearch);

        const ul = this.container.children[2];
        const results = new Results(ul, onDetail);
        this.__results__ = results;
        results.visible=false;

        const section= this.container.children[3];
        const details= new Detail(section);
        this.__details__= details;
        details.visible = false;
        // const button= this.container.children[4];
        // const loginOut = new LoginOut(button, onLogout);
        // this.__loginOut__=loginOut;

    }
        set results(results) {
            this.__details__.visible = false;
            this.__results__.items = results;
            this.__results__.visible = true;
        }
        set details (details) {
            this.__results__.visible = false;
            this.__details__.items = details;
            this.__details__.visible = true;
        }     
        set name(name) {
            // const literals = this.__literals__[language]
            // this.container.children[0].innerText = literals.title + ' ' + name + '!'
            this.container.children[0].innerText = `Hello, ${name}`
            
        }
}


