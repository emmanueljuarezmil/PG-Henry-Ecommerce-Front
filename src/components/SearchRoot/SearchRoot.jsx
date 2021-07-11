import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import Nav from '../Nav/Nav';

import './SearchRoot.css';

function SearchRoot() {
    const searched = useSelector((state) => state.product_search);

    const productsPerPage = 15;
    // const [loading,setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = [];
    let pagesNumber = 1;

    currentProducts = searched.slice(indexOfFirstProduct, indexOfLastProduct);
    pagesNumber = Math.ceil(searched.length / productsPerPage);

    const nextPage = () => {
        if (currentPage < pagesNumber) {
            setCurrentPage(currentPage + 1);
        } else setCurrentPage(1);
    }
    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        } else setCurrentPage(pagesNumber);
    };

    return (
        <div>
            {/* ACA IRIA LA NAV*/}
            <div className='catalogue_container'>
                {
                    currentProducts?.map((product, index) => (
                        <ProductCard index={index} product={product} />
                    ))
                }
            </div>
            <div className='catalogue_buttons'>
                <button className='prev' onClick={nextPage}>{'< prev'}</button>
                <button className='next' onClick={prevPage}>{'next >'}</button>
            </div>
        </div>
    )
};

export default SearchRoot;