import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import logic from '../../logic';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { width: 'auto', margin: 10 };

function RangeSlider({min, max, deleteRange, onFilters}) {

    // const [minValue, setMinValue] = useState(min)
    // const [maxValue, setMaxValue] = useState(max)

    // useEffect(() => {
    //     handleSearchItems()
    // })

    // async function handleSearchItems() {
    //     try {
    //         const items = await logic.searchItems({})
    //         setMinValue(Math.min.apply(Math, items.map(item => item.startPrice)))
    //         setMaxValue(Math.max.apply(Math, items.map(item => item.startPrice)))
    //     } catch (error) {
            
    //     }
    // }

    function handleRange(e) {
        const minValue = e[0]
        const maxValue = e[1]
        onFilters({target: {name: 'range', value: [minValue, maxValue]}})
    }

    return <>
        {/* <div style={wrapperStyle}>
        <Range onAfterChange={handleRange} min={minValue} max={maxValue} defaultValue={[minValue, maxValue]} pushable tipFormatter={value => value} />
        </div> */}
        <div style={wrapperStyle}>
        <Range onAfterChange={handleRange} min={0} max={5000} defaultValue={[0, 5000]} pushable tipFormatter={value => value} />
        </div>
    </>
}

export default RangeSlider