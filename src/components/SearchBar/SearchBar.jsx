import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFilterName } from '../../Redux/Actions/index';
import './SearchBar.css';

function SearchBar() {
    const dispatch = useDispatch()
    const name = useSelector(state => state.filterName)
    const handleChange = (e) => {
        dispatch(setFilterName(e.target.value))
    };

    return (
        <div classname='cont'>
            <form>
                <input className='input-icon' value={name} type="text" onChange={(e) => handleChange(e)} placeholder=" Search" />
            </form>
        </div>
    )
};

export default SearchBar;

