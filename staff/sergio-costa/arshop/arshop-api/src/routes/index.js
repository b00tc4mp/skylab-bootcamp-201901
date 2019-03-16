const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const imageParser = require('../image-parser')
const cloudinaryUploader = require('../cloudinary')

const { tokenVerifierMiddleware } = tokenHelper
const { registerUser, authenticateUser, retrieveUser, updateUser, addProduct, retrieveProducts, retrieveProduct, toogleFav, retrieveFavs, searchProductsByCategory, searchProducts, updateProduct, retrieveUserProducts, toogleSold, uploadProductImg, uploadUserImg, notFound } = require('./handlers')

//#region cloudinary
// const { parseImageUpload } = require('../../cloudinary/midlecloud')

//#endregion

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.put('/user/update', [tokenVerifierMiddleware, jsonBodyParser], updateUser)

router.put('/add/product', [tokenVerifierMiddleware, jsonBodyParser], addProduct)

router.get('/products', retrieveProducts)

router.get('/product/:id', retrieveProduct)

router.get('/user/products', tokenVerifierMiddleware, retrieveUserProducts)

router.put('/product/update/:id', [tokenVerifierMiddleware, jsonBodyParser], updateProduct)

router.put('/product/sold/:id', tokenVerifierMiddleware, toogleSold)

router.post('/fav/product/:id', tokenVerifierMiddleware, toogleFav)

router.get('/fav/user', tokenVerifierMiddleware, retrieveFavs)

router.get('/search/category', searchProductsByCategory)

router.get('/search', searchProducts)

router.post('/product/photo/:id', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], uploadProductImg)

router.post('/user/photo', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], uploadUserImg)

router.get('*', notFound)

module.exports = router