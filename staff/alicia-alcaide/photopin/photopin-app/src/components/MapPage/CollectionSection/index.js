import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import logic from "../../../logic"
import literals from './literals'


class CollectionSection extends Component {

    state = { error: null, addingCollection: false }


    handleNewCollection = () => {
        this.setState({ addingCollection: true })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newCollection = e.target.collection.value
        this.setState({ addingCollection: false })
        this.props.onNewCollection(newCollection)
    }

    render() {
        const {
            state: { error, addingCollection },
            props: { lang, pmap },
            handleNewCollection,
            handleSubmit
        } = this

        const { addCollection, add, placeholderNewCol } = literals[lang]


        return <>
            <section className="collections__addCollection">
                <button className="button--addCollection" onClick={() => handleNewCollection()}>{addCollection}</button>
                {addingCollection &&
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="collection" placeholder={placeholderNewCol} autoFocus />
                        <button type="submit">{add}</button>
                        {error && <span>{error}</span>}
                    </form>
                }
            </section>
            <section className="collections">
                {pmap && pmap.collections &&
                    <ul uk-accordion="multiple: true">
                        {pmap.collections.map(collection => {
                            return (
                                <li key={collection.title}>
                                    <h6 class="uk-margin-left uk-accordion-title">{collection.title}</h6>
                                    {collection.pins &&
                                        <ul class="uk-margin-left uk-accordion-content">
                                            {collection.pins.map(pin => {
                                                return (
                                                    <li key={pin._id}>
                                                        <p>{pin.title}</p>
                                                    </li>
                                                )
                                            }
                                            )}
                                        </ul>
                                    }
                                </li>)
                        })
                        }
                    </ul>
                }
            </section>
        </>
    }
}

export default withRouter(CollectionSection);