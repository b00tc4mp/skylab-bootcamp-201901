import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom' 
import logic from '../../logic'

class Results extends Component {

    render(){
        const {props:{results} } = this
        console.log(results)
        return(
            <section className="results section columns is-multiline">
             {(results || []).map(result => (             
                <Link to={`/event/${result.id}`}>
                    <img className="image" src={result.category.image} alt={result.title} />
                    <h2>{result.title}</h2>
                </Link>
            )
            )}
            </section>
        )
    }
}

export default Results