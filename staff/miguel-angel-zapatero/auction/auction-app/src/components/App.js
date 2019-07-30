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
        (async () => {
            try {
                if (logic.isUserLoggedIn) {
                    const _user = await logic.retrieveUser()
                    setUser(_user)
                    // setIsLoggedIn(logic.isUserLoggedIn)
                    UIkit.notification({message: `Welcome ${_user.name}!`, status: 'success'})
                }
            } catch (error) {
                handleErrors(error)
            }
        })()
    }, [isLoggedIn])

    useEffect(() => {
        handleSearch(query)
    }, [query]);

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
                // setIsLoggedIn(logic.isUserLoggedIn)
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
            if (logic.isUserLoggedIn) {
                const _item = await logic.retrieveItem(id)
                setItem(_item)
                history.push(`/items/${_item.id}`)
            } else {
                logic.logoutUser()
                UIkit.modal.confirm('Sorry, you need to be logged. Do you want to create an account?').then(function () {
                    history.push('/register')
                }, function () {
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
            <Nav onLogin={handleLogin} onLogout={handleLogout} user={user} path="/" />

            <Route exact path="/" render={() => <Search onSearch={handleQuery} />} />

            <Route exact path="/" render={() => <Filter onFilter={handleFilter} query={query} filters={filters}/>} />
        
            <Switch>
                <Route exact path="/" render={() => <Items items={items} onItem={handleRetrieve} />} />

                {logic.isUserLoggedIn && <Route path="/items/:id" render={(props) => < Item item={item} getItem={handleRetrieve} itemId={props.match.params.id} onLogout={handleLogout} />} />}
                
                {logic.isUserLoggedIn && <Route path="/user/mybids" render={() => <MyBids isLogged={logic.isUserLoggedIn} onItem={handleRetrieve} onLogout={handleLogout}/>} />}

                {logic.isUserLoggedIn && <Route path="/user" render={() => <Profile onUpdate={handleUpdate} user={user}/>} />}

                <Route path="/register" render={() => <Register onRegister={handleRegister} />} />

                <Route exac path="/404" render={() => <NotFound />} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </div>
    </>
}

export default withRouter(App);
