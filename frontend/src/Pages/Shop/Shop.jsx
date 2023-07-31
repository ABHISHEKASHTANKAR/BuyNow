import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { BsChevronUp } from 'react-icons/bs'
import './Shop.css'
import ShopProduct from '../../Components/Product/ShopProduct'
import Sidebar from './SideBar/Sidebar'
import SortModal from './SortModal/SortModal'
import Paginate from '../../Components/Pagination/Paginate';
import Loader from '../../Components/Loader/Loader';

import { useSelector, useDispatch } from 'react-redux'
import { openSortModal, closeSortModal, setFilteredProducts } from '../../Store/Slices/FilterSlice';
import { setTotalPages } from '../../Store/Slices/PaginationSlice'
import { sortProducts } from '../../Utils/Function'
import { filterAPI } from '../../APIS';



const Shop = () => {

    const dispatch = useDispatch();

    const filter = useSelector((state) => state.filter);
    
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleSortClick = () => {
        if (filter.open === true) {
            dispatch(closeSortModal());
        }
        else {
            dispatch(openSortModal());
        }
    }

    useEffect(() => {
        dispatch(setFilteredProducts(sortProducts(filter.filteredProducts, filter.sortValue)));
    }, [filter.sortValue, dispatch]);

    const currentPage = useSelector((state) => state.pagination.currentPage);
    useEffect(() => {
        const minRating = filter.ratingFilterValue[0];
        const maxRating = filter.ratingFilterValue[1];
        const minPrice = filter.priceFilterValue[0];
        const maxPrice = filter.priceFilterValue[1];
        const categoryArr = filter.categoryArr;
        const searchKeyword = filter.searchKeyword;

        const url = `${filterAPI}?page=${currentPage}&minrating=${minRating}&maxrating=${maxRating}&minprice=${minPrice}&maxprice=${maxPrice}&searchKeyword=${searchKeyword}`

        const getFilteredProducts = async () => {
            const response = await axios.post(url, {categoryArr : categoryArr});
            const data = response.data;

            dispatch(setFilteredProducts(data.filteredProducts));
            dispatch(setTotalPages(data.totalPages));
            setStartIndex(data.startIndex);
            setEndIndex(data.endIndex);
            setTotalItems(data.totalItems);
            setIsLoading(false);
        }

        getFilteredProducts();
    }, [filter.ratingFilterValue, filter.priceFilterValue, filter.categoryArr, currentPage, filter.searchKeyword]);

    return (
        <>
            <div className='shop'>
                <div className="shop-left">
                    <h4>Filter</h4>
                    <Sidebar />
                </div>
                <div className="shop-right">
                    <div className="shop-right-top">
                        <div className="sort-container">
                            <p className='text'><span>Showing :</span>{`${startIndex}-${endIndex} products out of ${totalItems}`}</p>
                            <div className="sort">
                                <p className="text">Sort By : </p>
                                <div className='sort-input' onClick={handleSortClick}> <input type="text" value={filter.sortValue} readOnly id='sort-value-input' /> <span className={filter.open ? "arrow-icon-up" : "arrow-icon-down"}> <BsChevronUp className='arrow-icon-up' id='sort-value-btn' /> </span></div>
                            </div>
                            {filter.open && <SortModal />}
                        </div>
                    </div>
                    <div className="shop-right-bottom">
                        {
                            isLoading
                                ?
                                <div className="loading">
                                    <Loader />
                                </div>
                                :
                                filter.filteredProducts.map((item) => {
                                    return (
                                        <ShopProduct {...item} key={item._id} />
                                    )
                                })
                        }
                    </div>
                    <Paginate />
                </div>
            </div>
        </>
    )
}

export default Shop