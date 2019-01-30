'use strict'

class DetailPanel extends Panel {
    constructor() {
        super($(`<section class="detail container">
    <div class="row">
        <div class="col">
            <img src="" width="100px">
        </div>
        <div class="col">
            <h3></h3>
        </div>
        <div class="col">
            <span class="price"></span>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <p></p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <a href="#" target="_blank">External link</a>
        </div>
        <div class="col">
            <button>Go back</button>
        </div>
    </div>
</section>`))

        const $container = this.$element

        const $image = $container.find('img')
        this.__$image__ = $image

        const $title = $container.find('h3')
        this.__$title__ = $title

        const $description = $container.find('p')
        this.__$description__ = $description

        const $price = $container.find('span')
        this.__$price__ = $price

        const $externalLink = $container.find('a')
        this.__$externalLink__ = $externalLink

        const $goBackButton = $container.find('button')
        this.__$goBackButton__ = $goBackButton
    }

    set item({ image, title, description, price, externalLink }) {
        this.__$image__.attr('src', image)
        this.__$title__.text(title)
        this.__$description__.text(description)
        this.__$price__.text(price)
        this.__$externalLink__.attr('href', externalLink)
    }

    set onGoBack(callback) {
        this.__$goBackButton__.click(callback)
    }
}