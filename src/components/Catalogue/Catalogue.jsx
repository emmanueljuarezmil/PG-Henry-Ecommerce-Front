import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';

import './Catalogue.css';

function Catalogue() {
    const products = useSelector((state) => state.all_products);
    const filter = useSelector((state) => state.filtered_products);

    const productsPerPage = 16;
    // const [loading,setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastProduct = productsPerPage * currentPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = [];
    let pagesNumber = 1;

    if (filter.length) {
        currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);
        pagesNumber = Math.ceil(filter.length / productsPerPage);
    } else {
        currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
        pagesNumber = Math.ceil(products.length / productsPerPage);
    };

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

export default Catalogue;