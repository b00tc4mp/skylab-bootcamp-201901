class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <ul></ul>
        </section>`));

        var $resultList = this.$element.find('ul');
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<li data-id=${result.id}>${result.text} <img src="${result.image}" width="100px"></li>`);

            // $item.click(function (event) {
            //     // console.log(this.getAttribute('data-id'));

            //     // console.log(event.target.getAttribute('data-id')); // WARN event propagation!

            //     console.log($item.data('id'));

            //     // console.log($(this).data('id')); // WARN add new $ object into mem, but $item is already there
            // });

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelectedCallback__(id)                
            })

            this.__$resultList__.append($item);
        });
    }

    clear() {
        this.__$resultList__.html('');
    }

    set onItemSelected(callback) {
        this.__onItemSelectedCallback__ = callback
    }
}