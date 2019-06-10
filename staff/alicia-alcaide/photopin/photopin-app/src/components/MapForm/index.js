import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import literals from './literals'
import validate from 'photopin-validate'
import NavBar from '../NavBar'
import placeholderImage from '../../assets/images/placeholder-image.png'
import './index.css'
import logic from '../../logic'


class MapForm extends Component {
    state = {
        mapId: this.props.match.params.id || null,
        mapInfo: {
            mapTitle: "",
            description: "",
            coverImage: ""
        },
        coverImage: null,
        redirectToHome: false,
        redirectToMap: false,
        errors: {},
        description: ""
    };


    componentDidMount() {
        logic.isUserLoggedIn && this.props.match.params.id &&
            logic
                .retrieveUserMap(this.props.match.params.id)
                .then(pmap => {
                    const pmapInfo = {
                        mapTitle: pmap.title || "",
                        description: pmap.description || "",
                        coverImage: pmap.coverImage || ""
                    }
                    this.setState({ mapId: this.props.match.params.id, mapInfo: pmapInfo, coverImage: pmapInfo.coverImage || null })
                })
                .catch(error => this.setState({ error: error.message }));
    }

    handleChangeImage = (e) => {
        let changedCoverImage = null
        if (e.target.value !== '') {
            try {
                validate.url(e.target.value)
                changedCoverImage = e.target.value
            } catch {
                changedCoverImage = null
            }
        }
        this.setState({ coverImage: changedCoverImage })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        (async () => {
            try {
                const validateErrors = {}
                if (!e.target.mapTitle.value || e.target.mapTitle.value === '') validateErrors.title = 'Title can not be empty'

                if (e.target.coverImage.value !== '') {
                    try {
                        validate.url(e.target.coverImage.value)
                    } catch {
                        validateErrors.coverImage = 'This is not a correct url'
                    }
                }

                if (Object.keys(validateErrors).length !== 0) {
                    this.setState({ errors: validateErrors })
                }
                else {
                    if (!this.state.mapId) {
                        const newMapId = await logic.createMap(e.target.mapTitle.value, this.state.description, e.target.coverImage.value)
                        this.setState({ mapId: newMapId, redirectToMap: true })
                    }
                    else {
                        const data = {}
                        if (e.target.mapTitle.value) data.title = e.target.mapTitle.value
                        if (this.state.description !== "") data.description = this.state.description
                        if (e.target.coverImage.value) data.coverImage = e.target.coverImage.value
                        await logic.updateMap(this.state.mapId, data)
                        this.setState({ redirectToMap: true })
                    }
                }
            } catch (error) {
                //TODO - mostrar el error
                this.setState({ error });
            }
        })()
    }

    handleCancelCreate = () => {
        this.setState({ redirectToHome: true })
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.description })
    }


    render() {
        const {
            props: { lang, onLogout }
        } = this


        const { title, create, update, cancel, mapTitle, mapTitlePlaceholder,
            description, descriptionPlaceholder,
            coverImage, coverImagePlaceholder
        } = literals[lang]

        return <>

            {this.state.redirectToHome && (<Redirect to="/home" />)}
            {this.state.redirectToMap && (<Redirect to={`/map/${this.state.mapId}`} />)}

            <NavBar lang={lang} onLogout={onLogout} />
            <h2 className='uk-text-center uk-margin-medium-bottom uk-margin-remove-top'>{title}</h2>

            <div className="uk-grid-large uk-grid-match uk-child-width-expand@m" data-uk-grid>
                <div>
                    <div className="uk-card uk-card-default uk-card-body uk-margin-large-bottom  uk-margin-large-left">
                        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
                            <div className="uk-margin">
                                <label className="" htmlFor="form-stacked-text">{mapTitle}</label>
                                {this.state.errors.title && <span className="uk-text-danger uk-margin-medium-left">{this.state.errors.title}</span>}
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-large" id="form-stacked-text" type="string" name="mapTitle" placeholder={mapTitlePlaceholder} defaultValue={this.state.mapInfo.mapTitle} autoFocus required />
                                </div>
                            </div>
                            <div className="uk-margin">
                                <label className="" htmlFor="form-stacked-text">{description}</label>
                                <div className="uk-form-controls">
                                    <textarea className="uk-textarea uk-form-width-large" id="form-stacked-text" type="text" name="description" rows="4" cols="25" placeholder={descriptionPlaceholder} value={this.state.mapInfo.description} onChange={this.handleDescriptionChange} />
                                </div>
                            </div>
                            <div className="uk-margin">
                                <label className="" htmlFor="form-stacked-text">{coverImage}</label>
                                {this.state.errors.coverImage && <span className="uk-text-danger uk-margin-medium-left">{this.state.errors.coverImage}</span>}
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-large" id="form-stacked-text" type="url" name="coverImage" placeholder={coverImagePlaceholder} defaultValue={this.state.mapInfo.coverImage} onChange={this.handleChangeImage} />
                                </div>
                            </div>
                            <div className="">
                                {!this.state.mapId && <button className="custom-form-button" type="submit">{create}</button>}
                                {this.state.mapId && <button className="custom-form-button" type="submit">{update}</button>}
                                <button className="custom-form-button" type="button" onClick={this.handleCancelCreate}>{cancel}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default uk-card-body  uk-margin-large-bottom  uk-margin-large-right">
                        <img src={this.state.coverImage ? this.state.coverImage : placeholderImage} width="" height="" alt="" />
                    </div>
                </div>
            </div>
        </>
    }
}


MapForm.propTypes = {
    lang: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    mapId: PropTypes.string
};

export default withRouter(MapForm)