import React from 'react';
import { useDispatch } from "react-redux";
import { setFilterName } from '../../Redux/Actions/index';

import './SearchBar.css';

function SearchBar() {


    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setFilterName(e.target.value))
        // setName(e.target.value);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(setFilterName(name))
    //     setName('')
    // };
   

    return (
        <div classname='cont'>
            <form>
            {/* <form onSubmit={handleSubmit}> */}
                {/* <input className='input-icon' type="text" value={name} onChange={handleChange} placeholder=" Search" /> */}
                <input className='input-icon' type="text" onChange={(e) => handleChange(e)} placeholder=" Search" />
            </form>
        </div>
    )
};

export default SearchBar;

