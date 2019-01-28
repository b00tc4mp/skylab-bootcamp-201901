'use strict'

class SearchPanel extends Panel {
    constructor() {
        super($(`<section>
    <form>
        <input type="text" placeholder="..." name ="query">
        <button type="submit">Search</button>
    </form>
</section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        var $queryInput = $form.find('input');
        this.__$queryInput__ = $queryInput;

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {

            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$queryInput__.val('');
        this.clearError();
    }

    clearError() {
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
}