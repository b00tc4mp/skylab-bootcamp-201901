import React, {useState, useEffect} from 'react'
import logic from '../../logic'

function Filter({onFilter}) {
    
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
        let {target: { name, value }} = e

        switch (name) {
            case "startDate":
                if(value) value = new Date(value)
                setStartDate(value)
                onFilter({startDate: value, endDate, startPrice, endPrice, city, category})
                break;
            
            case "endDate":
                if(value) value = new Date(value + ' 23:59:59')
                setEndDate(value)
                onFilter({startDate, endDate: value, startPrice, endPrice, city, category})
                break;
            
            case "startPrice":
                setStartPrice(value)
                onFilter({startDate, endDate, startPrice: value, endPrice, city, category})
                break;
            
            case "endPrice":
                setEndPrice(value)
                onFilter({startDate, endDate, startPrice, endPrice: value, city, category})
                break;
            
            case "city":
                setCity(value)
                onFilter({startDate, endDate, startPrice, endPrice: value, city: value, category})
                break;
            
            case "category":
                setCategory(value)
                onFilter({startDate, endDate, startPrice, endPrice, city, category: value})
                break;
        }
    }
    
    function deleteFilters(e) {
        e.preventDefault()
        
        e.target.startDate.value = ""
        e.target.endDate.value = ""
        e.target.startPrice.value = ""
        e.target.endPrice.value = ""

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
            <input type="date" name="startDate" max={endDate}/>
            <input type="date" name="endDate" min={startDate}/>
            <br/>
            <input type="range" name="startPrice"/>
            <input type="range" name="endPrice"/>
            <br/>
            <select>
            {cities && cities.map(city =>  
               <option key={city} value={city}>{city}</option>
            )}
            </select>
            <br/>
            <select>
            {categories && categories.map(category =>  
               <option key={category} value={category}>{category}</option>
            )}
            </select>
            <button>Delete Filters</button>
        </form>
    </> 
}

export default Filter