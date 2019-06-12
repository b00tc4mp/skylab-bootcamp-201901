import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../logic'
import Nav from './Nav'
import Register from './Register'
import Items from './Items'
import Item from './Item'
import Search from './Search'
import Profile from './Profile'
import MyBids from './MyBids'
import Filter from './Filter'
import NotFound from './NotFound'
import Footer from './Footer'
import handleErrors from '../common/handleErrors'
import UIkit from 'uikit'
import './index.sass'

function App({ history }) {

    const [items, setItems] = useState(null)
    const [item, setItem] = useState(null)
    const [query, setQuery] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [filters, setFilters] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                try {
                    const _user = await logic.retrieveUser()
                    setUser(_user)
                    UIkit.notification({message: `Welcome ${_user.name}!`, status: 'success'})
                } catch (error) {
                    handleErrors(error)
                }
            })()
        }
    }, [isLoggedIn])

    useEffect(() => {
        handleSearch(query)
    }, [query]);

    useEffect(() => {
        setIsLoggedIn(logic.isUserLoggedIn)
    }, [isLoggedIn])

    async function handleSearch(query) {
        try {
            const _items = await logic.searchItems(query)
            setItems(_items)    
        } catch (error) {
            handleErrors(error)
        }
    }

    async function handleRegister(name, surname, email, password, confirmPassword) {
        try {
            await logic.registerUser(name, surname, email, password, confirmPassword)
            UIkit.notification({message: "Thanks for register!", status: 'success'})
            history.push('/')
        } catch (error) {
            handleErrors(error)
        }
    }

    async function handleUpdate(data) {
        try {
            if(!logic.isUserLoggedIn) {
                logic.logoutUser()
                setIsLoggedIn(logic.isUserLoggedIn)
                setUser(null)
                history.push('/')
            }

            const _user = await logic.updateUser(data)
            setUser(_user)
            UIkit.notification({message: "User updated!", status: 'success'})
        } catch (error) {
            handleErrors(error)
        }
    }

    async function handleRetrieve(id) {
        try {
            if (isLoggedIn) {
                if(!logic.isUserLoggedIn) {
                    logic.logoutUser()
                    setIsLoggedIn(logic.isUserLoggedIn)
                    setUser(null)
                    history.push('/')
                }

                const item = await logic.retrieveItem(id)
                setItem(item)
                history.push(`/items/${item.id}`)
            } else {
                UIkit.modal.confirm('Sorry, you need to be logged. Do you want to create an account?').then(function () {
                    history.push('/register')
                })
            }
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleQuery(text) {
        if (!text) text = ""
        setQuery({ query: text, ...filters })
    }

    function handleFilter(filters) {
        setFilters(filters)
    }

    async function handleLogin(username, password) {
        try {
            await logic.loginUser(username, password)
            setIsLoggedIn(logic.isUserLoggedIn)
            history.push('/')
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleLogout() {
        logic.logoutUser()
        UIkit.notification({message: "GoodBye!", status: 'success'})
        setIsLoggedIn(logic.isUserLoggedIn)
        setUser(null)
        history.push('/')
    }

    return <>
        <div className="home uk-container">
            <Nav onLogin={handleLogin} onLogout={handleLogout} isLogged={isLoggedIn} user={user} path="/" />

            <Route exact path="/" render={() => <Search onSearch={handleQuery} />} />

            <Route exact path="/" render={() => <Filter onFilter={handleFilter} query={query} filters={filters}/>} />
        
            <Switch>
                <Route exact path="/" render={() => <Items items={items} onItem={handleRetrieve} />} />

                {isLoggedIn && item && <Route path="/items/:id" render={(props) => < Item item={item} getItem={handleRetrieve} itemId={props.match.params.id}onLogout={handleLogout} />} />}
                
                {isLoggedIn && <Route path="/user/mybids" render={() => <MyBids isLogged={isLoggedIn} onItem={handleRetrieve} onLogout={handleLogout}/>} />}

                {isLoggedIn && <Route path="/user" render={() => <Profile onUpdate={handleUpdate} user={user}/>} />}

                <Route path="/register" render={() => <Register onRegister={handleRegister} />} />

                <Route path="/404" render={() => <NotFound />} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </div>
    </>
}

export default withRouter(App);
