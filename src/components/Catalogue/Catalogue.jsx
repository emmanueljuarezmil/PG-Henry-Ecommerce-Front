import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Catalogue.css';

function Catalogue({products}) {

    return (
        <div>
            <div className='catalogue_container'>
                {
                    products && products.map((products, index) => (
                        <ProductCard index={index} product={products} />
                    ))
                }
            </div>
        </div>
    )
};

export default Catalogue;