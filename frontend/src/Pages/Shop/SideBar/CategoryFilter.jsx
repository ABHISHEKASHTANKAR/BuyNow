import React, { useEffect, useState } from 'react'
import './CategoryFilter.css'
import { useDispatch } from 'react-redux';
import { setCategoryArr } from '../../../Store/Slices/FilterSlice';


const CategoryFilter = () => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [optionArr, setOptionArr] = useState([
        { value: 'Food', checked: false },
        { value: 'Electronics', checked: false },
        { value: 'Fashion', checked: false },
        { value: 'Mobiles', checked: false },
        { value: 'Home', checked: false },
        { value: 'Grocery', checked: false },
        { value: 'Clothes', checked: false },
        { value: 'Toys', checked: false },
    ]);

    const handleCheckboxChange = (value, checked) => {
        const newOptionArr = optionArr.map((option) => {
            if(!categories.includes(value)){
                const newCategories = [...categories, value];
                setCategories(newCategories);
            }
            else{
                const newCategories = categories.filter((category)=>{
                    return category !== value;
                }) 
                setCategories(newCategories);
            }
            return option.value === value ? { ...option, checked: !checked } : option
        })
        setOptionArr(newOptionArr);
    }

    useEffect(()=>{
        dispatch(setCategoryArr(categories));
    }, [categories]);

    return (
        <div className='category-filter'>
            <div className="heading">
                Categories
            </div>
            <div className="radio-btns">
                {
                    optionArr.map((option) => {
                        return (
                            <div className='option-btn' key={option.value}>
                                <label htmlFor={option.value}>
                                    {option.value}
                                </label>
                                <input
                                    type="checkbox"
                                    id={option.value}
                                    name="radioGroup"
                                    value={option.value}
                                    checked={option.checked}
                                    onChange={() => handleCheckboxChange(option.value, option.checked)}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CategoryFilter