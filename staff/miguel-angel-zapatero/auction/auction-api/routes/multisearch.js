const handleErrors = require('./handle-errors')
const validate = require('auction-validate')
const moment = require('moment')

module.exports = (req, res, next) => {
    handleErrors(() => {
        const { query, category, city, price, date } = req.query 
        
        validate.arguments([
            { name: 'query', value: query, type: 'string', optional: true },
            { name: 'category', value: category, type: 'string', optional: true },
            { name: 'city', value: city, type: 'string', optional: true },
            { name: 'price', value: price, type: 'object', optional: true },
            { name: 'date', value: date, type: 'object', optional: true }
        ])

        const data = {}

        if (query ||category || city || price || date) {
            data.$and = []

            if(query) {
                const regex = new RegExp(query, 'i')
                data.$and.push(
                    { $or: [
                        {title: {$regex: regex }},
                        {description: {$regex: regex }}
                    ]}
                )
            }

            if (category) data.$and.push({category: category})
            if (city) data.$and.push({city: city})
            if (price && price.length > 0)
                data.$and.push({startPrice: { $gt: price[0] - 1, $lt: price[1] + 1 }})
            if (date && date.length > 0) {
                data.$and.push({ finishDate: {
                    $gte: moment(date[0], 'DD-MM-YYYY', true).add(-1, 'day').format(), 
                    $lte: moment(date[1], 'DD-MM-YYYY', true).add(1, 'day').format()
                }})
            }
        }

        req.query = data
        
        next()
    }, res)
}