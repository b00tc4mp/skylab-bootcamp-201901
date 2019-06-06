import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import moment from 'moment'
import RangeSlider from '../RangeSlider'

function Filter({ onFilter }) {

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

    async function handleCities() {
        const _cities = await logic.retrieveCities()
        setCities(_cities)
    }

    async function handleCategories() {
        const _categories = await logic.retrieveCategories()
        setCategories(_categories)
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
        document.getElementsByName("search")[0].value = ""

        setStartDate(null)
        setEndDate(null)
        setStartPrice(null)
        setEndPrice(null)
        setCity(null)
        setCategory(null)
        onFilter({})
    }

    return <>
        <form onChange={handleChange} onSubmit={deleteFilters}>
            <input type="date" name="startDate" max={moment(endDate).format('YYYY-MM-DD')} />
            <input type="date" name="endDate" min={moment(startDate).format('YYYY-MM-DD')} />
            <br />
            {/* <RangeSlider onFilters={handleChange}/> */}
            <select name="city">
                {cities && cities.map((city, index) =>
                    <option key={index} value={city}>{city}</option>
                )}
            </select>
            <br />
            <select name="category">
                {categories && categories.map((category, index) =>
                    <option key={index} value={category}>{category}</option>
                )}
            </select>
        </form>
        {(startDate && endDate) && <p>Date {moment(startDate).format('D/M/YYYY')} - {moment(endDate).format('D/M/YYYY')}</p>}
        {endPrice && <p>{startPrice} - {endPrice}</p>}
        {city && <p>{city}</p>}
        {category && <p>{category}</p>}
        <button onClick={deleteFilters}>Delete Filters</button>
    </>
}

export default Filter