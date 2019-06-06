import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../logic';
import Nav from './Nav'
import Register from './Register'
import Items from './Items'
import Item from './Item'
import Search from './Search'
import Profile from './Profile'
import Filter from './Filter'
import NotFound from './NotFound';
import './App.css';
import logo from '../logo.svg';

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
        try {
            const _items = await logic.searchItems(query)
            setItems(_items)
            setFilters(null)
        } catch ({message}) {
            alert(message)
        }
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
            if (isLogged) {
                const item = await logic.retrieveItem(id)
                setItem(item)
                history.push(`/items/${item.id}`)
            }
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
        <Nav path="/" />
        <Route exact path="/" render={()=><Search onSearch={handleQuery} filters={filters}/> }/>
        <Route exact path="/" render={()=><Filter onFilter={handleFilter}/>}/>
        <Switch>
            <Route exact path="/" render={()=><Items items={items} onItem={handleRetrieve}/> }/>
            {isLogged && <Route path="/items/:id" render={(props)=>< Item item={item} getItem={handleRetrieve} itemId={props.match.params.id}/> }/>}
            {isLogged && <Route path="/user" render={()=><Profile/> }/>}
            <Route path="/register" render={()=><Register onRegister={handleRegister} /> }/>
            <Route path="/notfound" render={()=><NotFound/>}/>
        <Redirect to="/" />
        </Switch>
    </>
}

export default withRouter(App);
