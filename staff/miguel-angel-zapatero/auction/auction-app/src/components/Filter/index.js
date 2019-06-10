import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import moment from 'moment'
import RangeSlider from '../RangeSlider'
import FiltersDelete from '../FiltersDelete'
import handleErrors from '../../common/handleErrors';
import { withRouter } from 'react-router-dom'

function Filter({ onFilter, query, filters, history }) {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [startPrice, setStartPrice] = useState(null)
    const [endPrice, setEndPrice] = useState(null)
    const [city, setCity] = useState(null)
    const [category, setCategory] = useState(null)
    const [cities, setCities] = useState(null)
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        handleCities()
    }, []);

    useEffect(() => {
        handleCategories()
    }, []);

    useEffect(() => {
        if(filters && Object.keys(filters).length) {
            const {city} = filters
            setCity(city)
        }
    }, [query, filters])

    async function handleCities() {
        try {
            const _cities = await logic.retrieveCities()
            setCities(_cities)
        } catch (error) {
            handleErrors(error)
        }
    }

    async function handleCategories() {
        try {
            const _categories = await logic.retrieveCategories()
            setCategories(_categories)
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleChange(e) {
        let { target: { name, value } } = e

        switch (name) {
            case "startDate":
                if (value) value = new Date(value)
                setStartDate(value)
                onFilter({ startDate: value, endDate, startPrice, endPrice, city, category })
                break;

            case "endDate":
                if (value) value = new Date(value + ' 23:59:59')
                setEndDate(value)
                onFilter({ startDate, endDate: value, startPrice, endPrice, city, category })
                break;

            case "range":
                setStartPrice(value[0])
                setEndPrice(value[1])
                onFilter({ startDate, endDate, startPrice: value[0], endPrice: value[1], city, category })
                break;

            case "city":
                setCity(value)
                onFilter({ startDate, endDate, startPrice, endPrice, city: value, category })
                break;

            case "category":
                setCategory(value)
                onFilter({ startDate, endDate, startPrice, endPrice, city, category: value })
                break;
        }
    }

    function deleteFilters() {
        document.getElementsByName("startDate")[0].value = ""
        document.getElementsByName("endDate")[0].value = ""

        setStartDate(null)
        setEndDate(null)
        setStartPrice(null)
        setEndPrice(null)
        setCity(null)
        setCategory(null)
        onFilter(null)
        history.push('/')

    }

    return <div className='home__section-filter'> 
        <form className="uk-form-stacked" onChange={handleChange} onSubmit={deleteFilters}>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-startdate">From</label>
                <div className="uk-form-controls">
                    <input className="uk-input uk-form-small" id="form-stacked-startdate" type="date" name="startDate" max={moment(endDate).format('YYYY-MM-DD')} />
                </div>
                <label className="uk-form-label" htmlFor="form-stacked-enddate">To</label>
                <div className="uk-form-controls">
                    <input className="uk-input uk-form-small" id="form-stacked-enddate" type="date" name="endDate" min={moment(startDate).format('YYYY-MM-DD')} />
                </div>
            </div>
            
            <div className="uk-margin">
                <label className="uk-form-label">Estimate</label>
                <RangeSlider onFilters={handleChange}/>
            </div>
            
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-city">City</label>
                <div className="uk-form-controls">
                    <select className="uk-select uk-form-small" id="form-stacked-city" name="city">
                    {cities && cities.map((city, index) =>
                        <option key={index} value={city}>{city}</option>
                    )}
                    </select>
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-category">Category</label>
                <div className="uk-form-controls">
                    <select className="uk-select uk-form-small" id="form-stacked-category" name="category">
                        {categories && categories.map((category, index) =>
                            <option key={index} value={category}>{category}</option>
                        )}
                    </select>
                </div>
            </div>
        </form>
        
        { ((startDate && endDate) || (startPrice && endPrice) || city || category) &&
        <FiltersDelete startDate={startDate} endDate={endDate} startPrice={startPrice} endPrice={endPrice} city={city} category={category} onDelete={deleteFilters}/>}
    </div>
}

export default withRouter(Filter)