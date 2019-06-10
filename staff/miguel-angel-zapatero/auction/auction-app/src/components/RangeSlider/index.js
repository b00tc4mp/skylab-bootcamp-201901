import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import logic from '../../logic';
import handleErrors from '../../common/handleErrors';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { width: 'auto', margin: 10 };

function RangeSlider({onFilters}) {

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    useEffect(() => {
        handleSearchItems()
    },[])

    async function handleSearchItems() {
        try {
            const items = await logic.searchItems({})
            setMinValue(Math.min.apply(Math, items.map(item => item.startPrice)))
            setMaxValue(Math.max.apply(Math, items.map(item => item.startPrice)))
        } catch (error) {
            handleErrors(error)
        }
    }

    function handleRange(e) {
        const minValue = e[0]
        const maxValue = e[1]
        onFilters({target: {name: 'range', value: [minValue, maxValue]}})
    }

    return <>
        <div style={wrapperStyle}>
        <Range onAfterChange={handleRange} min={minValue} max={maxValue} defaultValue={[minValue, maxValue]} pushable tipFormatter={value => value} />
        </div>
    </>
}

export default RangeSlider