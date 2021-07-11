import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { getProductByName } from '../../Redux/Actions/index';
import { Link } from 'react-router-dom';

import './SearchBar.css';

function SearchBar() {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductByName(search))
        setSearch('')
    };

    return (
        <div classname='cont'>
            <form onSubmit={handleSubmit}>
                <input className='input-icon' type="text" value={search} onChange={handleChange} placeholder=" Search" />
            </form>
        </div>
    )
};

export default SearchBar;

