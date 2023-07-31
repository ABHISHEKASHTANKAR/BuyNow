import React from 'react'
import './PriceFilter.css'
import ReactSlider from 'react-slider'
import { useDispatch } from 'react-redux'
import { setPriceFilterValue } from '../../../Store/Slices/FilterSlice'

const PriceFilter = () => {
    const dispatch = useDispatch();
    const handleChange = (value) => {
        console.log(value);
        dispatch(setPriceFilterValue(value));       
    }
    return (
        <div className='price-filter'>
            <div className="heading">
                Price
            </div>
            <div className="price-slider">
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 1000]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}> <span className='thumb-value'>${state.valueNow}</span></div>}
                    pearling
                    minDistance={0}
                    min={0}
                    max={1000}
                    onChange = {handleChange}
                />
            </div>
            <div className="price-value">
                <span>$0</span>
                <span>$1000</span>
            </div>
        </div>
    )
}

export default PriceFilter