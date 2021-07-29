import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from '../../Redux/Actions/index';
import {useHistory} from 'react-router-dom'
import Select from 'react-select';
import './SearchBar.css';

function SearchBar() {
    const dispatch = useDispatch()
    const searchProducts = useSelector(state => state.searchProducts)
    const history= useHistory();
    const handleChange = (e) => {
        if(e.value !== null) {
            dispatch(getProductDetail(e.value))
            return history.push(`/product/${e.value}`)
        }
        return
    };

    const options = searchProducts && searchProducts.map(product => {
        return {
            value: product.id,
            label: product.name,
            action: 'select-option'
        }
    })

    return (
        <div className='cont'>
            <Select
            className="basic-single"
            classNamePrefix="select"
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            name="color"
            options={options}
            onChange={handleChange}
            placeholder='Buscar productos'
            />
        </div>
    )
};

export default SearchBar;

