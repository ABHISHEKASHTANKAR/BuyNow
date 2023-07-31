import React, { useState } from 'react'
import axios from 'axios';
import './AddProduct.css'
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx'
import { closeAddProductModal } from '../../../Store/Slices/AdminSlice';
import { enqueueSnackbar } from 'notistack';
import { addProductAPI } from '../../../APIS';

const AddProduct = () => {

    const AddProductState = useSelector((state) => state.admin.AddProductModal);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        stock: "",
        rating: "",
        category: new Set(),
        image: null,
        description: ""
    })

    const [categoryArr, setCategoryArr] = useState([]);

    const handleClose = () => {
        dispatch(closeAddProductModal());
    }


    const handleAddProduct = async (e) => {
        e.preventDefault();
        const bodyData = new FormData();
        bodyData.append('name', formData.name);
        bodyData.append('price', Number(formData.price));
        bodyData.append('rating', Number(formData.rating));
        bodyData.append('description', formData.description);
        bodyData.append('category', categoryArr);
        bodyData.append('brand', formData.brand);
        bodyData.append('stock', Number(formData.stock));
        bodyData.append('product', formData.image);


        try {
            const res = await axios.post(addProductAPI, bodyData);
            if (res.status === 201) {
                enqueueSnackbar('Item added to database ❤️ successfully!',
                    {
                        variant: 'success',
                    }
                );
            }
            else {
                enqueueSnackbar(`Item couldn't added to database 😔 due to ${res.message}`,
                    {
                        variant: 'error',
                    }
                );
            }
        }
        catch (error) {
            console.log(error);
        }
    }

   

    const handleChange = (e) => {
        setFormData((prevData) => {
            const arr = [...formData.category];
            setCategoryArr(arr);
        
            return {
                ...prevData,
                [e.target.name]: e.target.id === 'category' ? prevData.category.add(e.target.value) : e.target.value,
            }
        })
    }

    console.log(categoryArr);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => {
            return {
                ...prevData,
                image: file,
            }
        })
    }



    const handleRemove = (e) => {
        setFormData((prevData) => {
            const updatedCategory = new Set(prevData.category);
            updatedCategory.delete(e.target.parentElement.id);
            return {
                ...prevData,
                category: updatedCategory
            }
        })

    }


    return (
        <div className='add-product'>
            <div className="top">
                <span className='title'>Add Product</span>
                <span className='close-btn' onClick={handleClose}><RxCross2 /></span>
            </div>
            <form className="bottom" onSubmit={handleAddProduct}>
                <div style={{ display: "flex", columnGap: "1rem" }}>
                    <input className='input' type="text" id='name' placeholder='Product Name' onChange={handleChange} name="name" value={formData.name} />
                    <input className='input' type="text" id='brand' placeholder='Product Brand' onChange={handleChange} name="brand" value={formData.brand} />
                </div>
                <div style={{ display: "flex", columnGap: "1rem" }}>
                    <input className='input' type="text" id='price' placeholder='Product Price' onChange={handleChange} name="price" value={formData.price} />
                    <input className='input' type="text" id='stock' placeholder='Product Quantity' onChange={handleChange} name="stock" value={formData.stock} />
                </div>
                <input className='input' type="text" id='rating' placeholder='Product Rating' onChange={handleChange} name="rating" value={formData.rating} />
                <div className="input" id='input-div'>
                    <div>
                        <label htmlFor="category">Category : </label>
                        <select id='category' onChange={handleChange} name="category" value={formData.category}>
                            <option value="Select">Select</option>
                            <option value="Food">Food</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Toys">Toys</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Home">Home</option>
                        </select>
                    </div>
                    <div className="selected-options">
                        {
                            Array.from(formData.category, (item, index) => {
                                return (
                                    <div className='category-btn' key={index}>
                                        <div className="item">{item}</div>
                                        <div className="remove" onClick={handleRemove} id={item}><RxCross2 /></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="input" id='input-div'>
                    <div>
                        <label htmlFor="image">Product Image : </label>
                        <input type="file" accept="image/*" id='image' onChange={handleImageChange} name='image' />
                    </div>
                </div>
                <textarea className='input' placeholder='Enter Product Description' id='description' onChange={handleChange} name='description' value={formData.description} />
                <button type="submit" id="submit-btn">SUBMIT</button>
            </form>
        </div>
    )
}

export default AddProduct