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
import './index.sass'
import './App.css';

function App({ history }) {

    const [items, setItems] = useState(null)
    const [item, setItem] = useState(null)
    const [query, setQuery] = useState({})
    const [isLogged, setIsLogged] = useState(logic.isUserLoggedIn)
    const [filters, setFilters] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (isLogged) {
            (async () => {
                try {
                    const _user = await logic.retrieveUser()
                    setUser(_user)
                } catch ({ message }) {
                    alert(message)
                }
            })()
        }
    }, [isLogged, user])

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
        } catch ({ message }) {
            alert(message)
        }
    }

    async function handleRegister(name, surname, email, password, confirmPassword) {
        try {
            await logic.registerUser(name, surname, email, password, confirmPassword)
            alert('thanks for register!')
            history.push('/')
        } catch ({ message }) {
            alert(message)
        }
    }

    async function handleUpdate(data) {
        try {
            const _user = await logic.updateUser(data)
            setUser(_user)
            alert('user updated')
        } catch ({ message }) {
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
        } catch ({ message }) {
            alert(message)
        }
    }

    function handleQuery(text, filters) {
        if (!text) text = ""
        setQuery({ query: text, ...filters })
    }

    function handleFilter(filters) {
        setFilters(filters)
    }

    async function handleLogin(username, password) {
        try {
            await logic.loginUser(username, password)
            setIsLogged(logic.isUserLoggedIn)
        } catch ({ message }) {
            alert(message)
        }
    }

    function handleLogout() {
        logic.logoutUser()
        setIsLogged(logic.isUserLoggedIn)
        history.push('/')
    }

    return <>
        <div className="home">
            <Nav onLogin={handleLogin} onLogout={handleLogout} isLogged={isLogged} user={user} path="/" />

            <div className='home__section'>

                    <Route exact path="/" render={() => <Filter onFilter={handleFilter} />} />
   

                <div className='home__section-items'>
                    <div>
                        <Route exact path="/" render={() => <Search onSearch={handleQuery} filters={filters} />} />
                    </div>
                    <Switch>
                        <Route exact path="/" render={() => <Items items={items} onItem={handleRetrieve} />} />

                        {isLogged && item && <Route path="/items/:id" render={(props) => < Item item={item} getItem={handleRetrieve} itemId={props.match.params.id} />} />}
                        {isLogged && <Route path="/user" render={() => <Profile onUpdate={handleUpdate} user={user} />} />}

                        <Route path="/register" render={() => <Register onRegister={handleRegister} />} />

                        <Route path="/404" render={() => <NotFound />} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        </div>
    </>
}

export default withRouter(App);
