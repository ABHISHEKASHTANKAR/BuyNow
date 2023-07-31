import React from 'react'
import ReactPaginate from 'react-paginate'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../Store/Slices/PaginationSlice';
import './Paginate.css'

const Paginate = () => {

    const dispatch = useDispatch();

    const handlePageClick = (e) => {
        dispatch(setCurrentPage(e.selected+1));
    }

    const totalPages = useSelector((state)=>state.pagination.totalPages);

  return (
    <div className='paginate'>
        <ReactPaginate
            previousLabel = {<BsArrowLeft className='paginate-icon'/>}
            nextLabel = {<BsArrowRight className='paginate-icon'/>}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName='pagination'
            activeClassName='active-page'
        />
    </div>
  )
}

export default Paginate