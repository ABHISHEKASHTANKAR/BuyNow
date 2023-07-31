import React, {useEffect, useRef} from 'react'
import './SortModal.css'
import { useDispatch } from 'react-redux'
import { setSortValue, closeSortModal, openSortModal } from '../../../Store/Slices/FilterSlice'

const SortModal = () => {

    const dispatch = useDispatch();

    const handleSetSortVal = (e) => {
        dispatch(setSortValue(e.target.id));
        if(e.type === 'click'){
            dispatch(closeSortModal());
        }
    }

    const sortModalRef = useRef(null);

    function useOutsideAlerter(ref){
        useEffect(()=>{
            const handleOutSideClick = (e) => {
                if(e.target.id === 'sort-value-input' || e.target.tagName ==='path' || e.target.tagName === 'svg'){
                    dispatch(openSortModal());
                }
                else if(ref.current && !ref.current.contains(e.target)){
                    dispatch(closeSortModal());
                }
            }

            document.addEventListener('click', handleOutSideClick);
            return () => {document.removeEventListener('click', handleOutSideClick)};
        })
    }

    useOutsideAlerter(sortModalRef);

    return (
        <div className='sort-modal' ref={sortModalRef}>
            <div className="sort-item" id="Newest First" onMouseOver={handleSetSortVal} onClick={handleSetSortVal}>
                Newest First
            </div>
            <div className="sort-item" id="Price Low to High" onMouseOver={handleSetSortVal} onClick={handleSetSortVal}>
                Price Low to High
            </div>
            <div className="sort-item" id="Price High to Low" onMouseOver={handleSetSortVal} onClick={handleSetSortVal}>
                Price High to Low
            </div>
        </div>
    )
}

export default SortModal