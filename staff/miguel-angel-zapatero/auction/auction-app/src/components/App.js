import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../logic';
import Nav from './Nav'
import Register from './Register'
import Items from './Items'
import Item from './Item'
import Search from './Search'
import Profile from './Profile'
import MyBids from './MyBids'
import Filter from './Filter'
import NotFound from './NotFound';
import handleErrors from '../common/handleErrors'
// import queryString from 'query-string'
import UIkit from 'uikit'

// import './index.sass'
// import './App.css';

function App({ history, location }) {

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
                    UIkit.notification({message: `Welcome ${_user.name}!`, status: 'success'})
                } catch (error) {
                    handleErrors(error)
                }
            })()
        }
    }, [isLogged])

    // useEffect(() => {
    //     debugger
    //     if (query && Object.keys(query).length) {
    //         const query = queryString.parse(location.search)
    //     debugger
    //         handleFilter(query)
    //         handleQuery(query.query, query)
    //     }
    // }, [location.search])

    useEffect(() => {
        // debugger
        handleSearch(query)
    }, [query]);

    useEffect(() => {
        setIsLogged(logic.isUserLoggedIn)
    }, [isLogged])

    async function handleSearch(query) {
        try {
            const _items = await logic.searchItems(query)
            setItems(_items)    
            
            // if(query && Object.keys(query).length) {
            //     debugger
            //     const {query: text, startDate, endDate, startPrice, endPrice, city, category} = query

            //     let queryStr= ''
            //     if(text) queryStr += `query=${text}`

            //     history.push(`/?${queryStr}`)
            // }
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
            const _user = await logic.updateUser(data)
            setUser(_user)
            UIkit.notification({message: "User updated!", status: 'success'})
        } catch (error) {
            handleErrors(error)
        }
    }

    async function handleRetrieve(id) {
        try {
            if (isLogged) {
                const item = await logic.retrieveItem(id)
                setItem(item)
                history.push(`/items/${item.id}`)
            } else {

            }
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleQuery(text) {
        // debugger
        if (!text) text = ""
        setQuery({ query: text, ...filters })
        // history.push('/?query=hola')
    }

    function handleFilter(filters) {
        setFilters(filters)
    }

    async function handleLogin(username, password) {
        try {
            await logic.loginUser(username, password)
            setIsLogged(logic.isUserLoggedIn)
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleLogout() {
        logic.logoutUser()
        UIkit.notification({message: "GoodBye!", status: 'success'})
        setIsLogged(logic.isUserLoggedIn)
        setUser(null)
        history.push('/')
    }

    return <>
        <div className="home uk-container">
            <Nav onLogin={handleLogin} onLogout={handleLogout} isLogged={isLogged} user={user} path="/" />

            <div className='home__section'>

                    <Route exact path="/" render={() => <Filter onFilter={handleFilter} query={query} filters={filters}/>} />
   

                <div className='home__section-items'>
                    <div>
                        <Route exact path="/" render={() => <Search onSearch={handleQuery} />} />
                    </div>
                    <Switch>
                        <Route exact path="/" render={() => <Items items={items} onItem={handleRetrieve} />} />

                        {isLogged && item && <Route path="/items/:id" render={(props) => < Item item={item} getItem={handleRetrieve} itemId={props.match.params.id} />} />}
                        
                        {isLogged && <Route path="/user/mybids" render={() => <MyBids isLogged={isLogged} onItem={handleRetrieve} />} />}

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
