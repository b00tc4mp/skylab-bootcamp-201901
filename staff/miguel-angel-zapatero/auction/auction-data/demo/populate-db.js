require('dotenv').config()

const mongoose = require('mongoose')
const { Item } = require('../models')

const {env: { MONGO_URL_LOGIC_TEST }} = process;

(async () => {
    try {
        await mongoose.connect(MONGO_URL_LOGIC_TEST, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
        
        console.log('connected to database')
        
        const date = new Date
        let randomDate = new Date

        const imgFerrari1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264104/auctionlive/cars/ferrari-1_x5g6u4.jpg"
        const imgFerrari2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264073/auctionlive/cars/ferrari-2_biouh9.jpg"
        const imgFerrari3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264076/auctionlive/cars/ferrari-3_hz0lf3.jpg"
        const imgFerrari4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264103/auctionlive/cars/ferrari-4_sxkpx2.jpg"

        const imgMustang1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264089/auctionlive/cars/mustang-3_epeggy.jpg"
        const imgMustang2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264089/auctionlive/cars/mustang-4_nvn1bp.jpg"
        const imgMustang3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264090/auctionlive/cars/mustang-5_bczfxl.jpg"
        const imgMustang4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264067/auctionlive/cars/mustang-2_b0vjt0.jpg"

        const imgRolce1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264106/auctionlive/cars/rolceroyce-1_cnepg2.jpg"
        const imgRolce2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264114/auctionlive/cars/rolceroyce-2_rjqdao.jpg"
        const imgRolce3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264097/auctionlive/cars/rolceroyce-3_edeyyf.jpg"

        const imgWatch1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264190/auctionlive/watches/__-drz-__-1481652-unsplash_ea7ucl.jpg"
        const imgWatch2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264165/auctionlive/watches/tadeusz-lakota-762228-unsplash_vwnmda.jpg"
        const imgWatch3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264156/auctionlive/watches/marek-prygiel-54094-unsplash_oxgdnc.jpg"
        const imgWatch4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264155/auctionlive/watches/rodrigo-bressane-1580163-unsplash_lufe61.jpg"
        const imgWatch5 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264152/auctionlive/watches/marek-prygiel-54093-unsplash_azocbs.jpg"
        const imgWatch6 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264148/auctionlive/watches/josh-peacey-vilo-750631-unsplash_uzmcgc.jpg"
        const imgWatch7 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264146/auctionlive/watches/hunters-race-412953-unsplash_abzy9y.jpg"
        const imgWatch8 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264143/auctionlive/watches/elisha-terada-249873-unsplash_bkviqb.jpg"

        const imgPainting1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264042/auctionlive/art/steve-johnson-1057358-unsplash_ejb6eg.jpg"
        const imgPainting2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264021/auctionlive/art/steve-johnson-643287-unsplash_klcgka.jpg"
        const imgPainting3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264000/auctionlive/art/steve-johnson-643285-unsplash_jtnrbr.jpg"
        const imgPainting4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264051/auctionlive/art/dan-farrell-1308316-unsplash_cf9mok.jpg"
        const imgPainting5 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264049/auctionlive/art/jean-philippe-delberghe-324898-unsplash_gdrjgm.jpg"
        const imgPainting6 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264020/auctionlive/art/alex-holyoake-60249-unsplash_qxvtju.jpg"
        const imgPainting7 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264007/auctionlive/art/gustavo-centurion-665623-unsplash_vji9a3.jpg"

        const imgGems1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264122/auctionlive/gems/jason-d-1395052-unsplash_bhcldv.jpg"
        const imgGems2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264120/auctionlive/gems/thibault-luycx-1420314-unsplash_ykwqcf.jpg"
        const imgGems3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264120/auctionlive/gems/joshua-fuller-616702-unsplash_safifn.jpg"
        const imgGems4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264106/auctionlive/gems/ilze-lucero-1321008-unsplash_htbfqw.jpg"

        const imgJewellery1 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264161/auctionlive/jewellery/motah-799870-unsplash_urhpdu.jpg"
        const imgJewellery2 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264156/auctionlive/jewellery/denny-muller-718645-unsplash_pzmfwj.jpg"
        const imgJewellery3 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264138/auctionlive/jewellery/charisse-kenion-494906-unsplash_xf9pqx.jpg"
        const imgJewellery4 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560264122/auctionlive/jewellery/mong-bui-547346-unsplash_aitxuz.jpg"
        const imgJewellery5 = "https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560268611/auctionlive/jewellery/church-of-the-king-635797-unsplash_iddqmp.jpg"

        const description = `Lorem fistrum velit voluptate te va a hasé pupitaa llevame al sircoo occaecat qui condemor quietooor labore tempor. Benemeritaar tiene musho peligro pecador te va a hasé pupitaa caballo blanco caballo negroorl qué dise usteer ese pedazo de elit. Caballo blanco caballo negroorl exercitation condemor cillum llevame al sircoo laboris diodeno. Diodenoo dolor nostrud officia exercitation aliquip mamaar. De la pradera exercitation sed duis voluptate ullamco tiene musho peligro labore.

        Apetecan pecador por la gloria de mi madre no puedor al ataquerl eiusmod exercitation ese hombree consequat no te digo trigo por no llamarte Rodrigor. Duis ese pedazo de diodeno ullamco labore. Quis ex enim diodeno. Caballo blanco caballo negroorl duis me cago en tus muelas la caidita a peich quietooor te va a hasé pupitaa labore. Cillum ut nisi veniam consectetur me cago en tus muelas tiene musho peligro fistro quis.`

        await Item.create({
            title: "Ferrari 812 Superfast",
            description: description,
            startPrice: 300000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgFerrari1, imgFerrari2, imgFerrari3, imgFerrari4],
            category: "Cars",
            city: "London"
        })

        await Item.create({
            title: "Ford Mustang 2018",
            description: description,
            startPrice: 60000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgMustang1, imgMustang2, imgMustang3, imgMustang4],
            category: "Cars",
            city: "New York"
        })

        await Item.create({
            title: "Rolce Royce",
            description: description,
            startPrice: 200000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgRolce1, imgRolce2, imgRolce3],
            category: "Cars",
            city: "London"
        })

        await Item.create({
            title: "Rolex Yacht‑Master 42",
            description: description,
            startPrice: 25000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgWatch1, imgWatch2, imgWatch3, imgWatch4],
            category: "Watches",
            city: "Tokyo"
        })

        await Item.create({
            title: "Rolex GMT-Master II",
            description: description,
            startPrice: 12500,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgWatch5, imgWatch6, imgWatch7, imgWatch8],
            category: "Watches",
            city: "New York"
        })

        await Item.create({
            title: "The Sauron's Ring",
            description: description,
            startPrice: 1000000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgJewellery1, imgJewellery2, imgJewellery3, imgJewellery4],
            category: "Jewellery",
            city: "Mordor"
        })

        await Item.create({
            title: "The Queen's Crown",
            description: description,
            startPrice: 666666,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgJewellery5],
            category: "Jewellery",
            city: "London"
        })

        await Item.create({
            title: "Street Paintings",
            description: description,
            startPrice: 25000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgPainting4, imgPainting5, imgPainting6, imgPainting7],
            category: "Art",
            city: "Barcelona"
        })

        await Item.create({
            title: "Modern Paintings",
            description: description,
            startPrice: 5500,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgPainting1, imgPainting2, imgPainting3],
            category: "Art",
            city: "New York"
        })

        await Item.create({
            title: "Pink Diamonds",
            description: description,
            startPrice: 47000,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: [imgGems1, imgGems2, imgGems3, imgGems4],
            category: "Gems",
            city: "Tokyo"
        })

        await Item.create({
            title: "Bilal's Banana",
            description: "The banana into the Skylab's Fridge",
            startPrice: 500,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: ["https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560269342/auctionlive/img_1172-e1330201003815_oiqjtd.jpg"],
            category: "Gems",
            city: "Barcelona"
        })

        await Item.create({
            title: "Dinner with Manu",
            description: `A dinner with Manu, the fantastic destroyer projects teacher.
            
            Thanks for the idea of Alex!`,
            startPrice: 1,
            startDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*2)),
            finishDate: randomDate.setDate(date.getDate() + Math.floor(Math.random()*3)+2),
            bids: [],
            images: ["https://res.cloudinary.com/auctionlive/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1560275103/auctionlive/IMG-20190611-WA0005_sff1m6.jpg"],
            category: "Cuisine",
            city: "Barcelona"
        })

        console.log('done')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error, error.message)
    }
})()