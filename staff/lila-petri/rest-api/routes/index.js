const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req
    
    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).res.json({ message: 'Ok, user registered. '}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})
app.post('/auth', jsonParser, (req, res) =>{
    const { body: { email, password } } = req
    try{
        logic.authenticateUser(email, password)
            .then((response)=> res.json({ message: 'Ok, user authenticated.', data: {token: response}}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    }catch({message}){
        res.status(400).json({ error: message})
    }

})
app.get('/user', (req, res)=>{
    const { headers : {authorization} } = req
    let token= authorization.slice(7, authorization.length)
        try{
            logic.retrieveUser(token)
                .then((response)=>res.json({data:response}))
                .catch(({ message }) => {
                    res.status(400).json({ error: message})
                })

        }catch({message}){
            res.status(400).json({ error: message})
        }
    
})
app.get('/ducks', jsonParser, (req, res) =>{
    const { headers : {authorization}, query: {query} } = req
    let token= authorization.slice(7, authorization.length)
    try{
        logic.searchDucks(token, query)
            .then((response)=>res.json({data:response}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })

    }catch({message}){
        res.status(400).json({ error: message})
    }
})
app.get('/duck/:id', jsonParser, (req, res) =>{
    const { headers : {authorization}, params:{id}} = req
    let token= authorization.slice(7, authorization.length)
    try{
        logic.retrieveDuck(token, id)
            .then((response)=>res.json({data:response}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })

    }catch({message}){
        res.status(400).json({ error: message})
    }
})
app.post('/togglefavduck/:id', jsonParser, (req, res) =>{
    const { headers : {authorization}, params:{id}} = req
    let token= authorization.slice(7, authorization.length)
    try{
        logic.toggleFavDuck(token, id)
            .then(()=>res.json({message :'OK'}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })

    }catch({message}){
        res.status(400).json({ error: message})
    }
})
app.get('/favducks', jsonParser, (req, res)=>{
    const { headers : {authorization}} = req
    let token= authorization.slice(7, authorization.length)
    try{
        logic.retrieveFavDucks(token)
            .then((response)=>res.json({data: response}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })

    }catch({message}){
        res.status(400).json({ error: message})
    }


})
// TODO other routes

app.use(function (req, res, next) {
    
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))