import React from 'react'
import ReactSlider from 'react-slider'
import './RatingFilter.css'
import { BsStarFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setRatingFilterValue } from '../../../Store/Slices/FilterSlice'

const RatingFilter = () => {
    const dispatch = useDispatch();
    const handleChange = (value) => {
        dispatch(setRatingFilterValue(value));       
    }
    return (
        <div className='rating-filter'>
            <div className="heading">
                Rating
            </div>
            <div className="rating-slider">
                <ReactSlider
                    className="horizontal-slider"
                    marks = {[0, 1, 2, 3, 4, 5]}
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 5]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}> <span className='thumb-value'>{state.valueNow} <BsStarFill className='star-icon'/></span></div>}
                    pearling
                    minDistance={0}
                    min={0}
                    max={5}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default RatingFilter