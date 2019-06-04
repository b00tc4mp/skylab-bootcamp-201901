import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './App.css';
import Nav from './Nav'
import Register from './Register'
import Items from './Items'
import ItemDetail from './ItemDetail'
import Search from './Search'
import Profile from './Profile'
import Filter from './Filter'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../logic';

function App({history}) {

    const [items, setItems] = useState(null)
    const [item, setItem] = useState(null)
    const [query, setQuery] = useState({})
    const [isLogged, setIsLogged] = useState(logic.isUserLoggedIn)
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        handleSearch()
    }, [query]);

    useEffect(() => {
        setIsLogged(logic.isUserLoggedIn)
    })

    async function handleSearch() {
        const _items = await logic.searchItems(query)
        setItems(_items)
        setFilters(null)
    }

    async function handleRegister(name, surname, email, password, confirmPassword) {
        try {
            await logic.registerUser(name, surname, email, password, confirmPassword)
            alert('thanks for register!')
            history.push('/')
        } catch ({message}) {
            alert(message)
        }
    }

    async function handleRetrieve(id) {
        try {
            const item = await logic.retrieveItem(id)
            setItem(item)
            history.push(`/items/${item._id}`)
        } catch ({message}) {
            alert(message)
        }
    }

    function handleQuery(text, filters) {
        if(!text) text = ""
        setQuery({query: text, ...filters})
    }

    function handleFilter(filters) {
        setFilters(filters)
    }

    return <>
        <Nav />
            <Route exact path="/" render={()=><Search onSearch={handleQuery} filters={filters}/> }/>
            <Route exact path="/" render={()=><Filter onFilter={handleFilter} /> }/>
        <Switch>
            <Route exact path="/" render={()=><Items items={items} onItem={handleRetrieve}/> }/>
            {isLogged && <Route path="/items/:id" render={()=>< ItemDetail item={item}/> }/>}
            {isLogged && <Route path="/user" render={()=><Profile/> }/>}
            <Route path="/register" render={()=><Register onRegister={handleRegister} /> }/>
            <Redirect to="/" />
        </Switch>
    </>
}

export default withRouter(App);
