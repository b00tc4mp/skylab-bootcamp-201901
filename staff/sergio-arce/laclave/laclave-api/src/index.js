const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const tokenHelper = require('./routes/middleware/token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
	//users
	registerUser,
	loginUser,
	retrieveUser,
	updateUser,
	deleteUser,

	favArtist,

	//congress
	createCongress,
	retrieveCongress,
	updateCongress,
	deleteCongress,
	listCongresses,
	searchCongresses,

	//artists
	listArtists,
	retrieveArtist,
	createArtist,
	searchArtists,

	//search
	searchItems

} = require('./routes')

const port = 8000

mongoose.connect('mongodb://localhost/laclave-data', { useNewUrlParser: true })
	.then(() => {

		tokenHelper.jwtSecret = 'secret'

		const app = express()
		
		const router = express.Router()

		const jsonBodyParser = bodyParser.json()

		app.use(cors())

		// users
		router.post('/user/register', jsonBodyParser, registerUser)
		router.post('/user/login', jsonBodyParser, loginUser)
		router.get('/user/get/', tokenVerifierMiddleware, retrieveUser)
		router.put('/user/update/', [jsonBodyParser, tokenVerifierMiddleware], updateUser)
		router.delete('/user/delete/:id', deleteUser)

		router.post('/fav/artist/:artistId',tokenVerifierMiddleware, favArtist)

		// congresses
		router.post('/congress/create', [jsonBodyParser, tokenVerifierMiddleware], createCongress)
		router.get('/congress/get/:id', retrieveCongress)
		router.put('/congress/update/:id', jsonBodyParser, updateCongress)
		router.delete('/congress/delete/:id', deleteCongress)
		router.get('/congress/list', listCongresses)
		router.get('/congress/search', searchCongresses)

		// artists
		router.get('/artist/list', listArtists)
		router.get('/artist/get/:id', retrieveArtist)
		router.post('/artist/create', [jsonBodyParser, tokenVerifierMiddleware], createArtist)
		router.get('/artist/search', searchArtists) 
		
		// search Items
		router.get('/search/items', searchItems)

	
		app.use('/api', router)

		app.listen(port, () => console.log(`server listening in port ${port}`))

	})
	.catch(error => console.log('error in mongoose connect ' + error.message))