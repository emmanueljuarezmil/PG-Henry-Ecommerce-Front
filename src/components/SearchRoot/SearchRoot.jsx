import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';

import './SearchRoot.css';

function SearchRoot() {
    const searched = useSelector((state) => state.product_search);

    const productsPerPage = 16;
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
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else setCurrentPage(pagesNumber);
    };

    return (
        <div>
            <div className='catalogue_container'>
                {
                    currentProducts?.map((product, index) => (
                        <ProductCard index={index} product={product} />
                    ))
                }
            </div>
                <div className='catalogue_buttons'>
                    {
                        currentPage > 1 ?
                        <button className='prev' onClick={prevPage}>{'< Anterior'}</button> :
                        null
                    }
                    {
                        currentPage < pagesNumber ?
                        <button className='next' onClick={nextPage}>{'Siguiente >'}</button> :
                        null
                    }
                </div>
        </div>
    )
};

export default SearchRoot;