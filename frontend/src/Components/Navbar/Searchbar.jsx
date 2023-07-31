import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import './Searchbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { shortenString } from '../../Utils/Function';
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from '../../Store/Slices/FilterSlice';
import { searchProductsAPI } from '../../APIS';



const Searchbar = () => {

    const suggestRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const [searchArr, setSearchArr] = useState([]);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const search = async () => {
        try {
            const response = await axios.get(`${searchProductsAPI}${searchValue}`);
            setSearchArr(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (searchValue.length >= 3) {
            search();
        }
        else {
            setSearchArr([]);
        }
    }, [searchValue]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchKeyword(searchValue));
        Navigate('/shop');
        setSearchModalOpen(false);
    }

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        setSearchModalOpen(true);
    }

    const OutisideClickHandler = (ref) => {
        useEffect(() => {
            const handleOutSideClick = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setSearchModalOpen(false);
                }
            }

            document.addEventListener('click', handleOutSideClick);

            return () => document.removeEventListener('click', handleOutSideClick);

        }, [ref]);
    }

    OutisideClickHandler(suggestRef);
    return (
        <div className='search'>
            <form className="search-bar" onSubmit={handleSearch} ref={suggestRef}>
                <input className='search-input' type="search" placeholder='Search Products' value={searchValue} onChange={handleInputChange} />
                {
                    searchModalOpen

                    &&

                    <div className="suggestion-list">
                        {
                            searchArr.length === 0
                                ?
                                <div className='item-link'><p className="product-name">No Match Found!!</p></div>
                                :
                                searchArr.map((item) => {
                                    return (
                                        <Link to={`/products/${item._id}`} className='item-link' key={item._id}>
                                            <img src={item.image} alt="Product Img" />
                                            <p className="product-name">{shortenString(item.name, 30)}</p>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                }
            </form>
        </div>
    )
}

export default Searchbar