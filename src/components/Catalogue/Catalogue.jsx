import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Catalogue.css';

function Catalogue({products}) {
 
    const prod = products
    console.log(products)

    return (
        <div>
            <div className='catalogue_container'>
                {
                    prod && prod.map((products, index) => (
                        <ProductCard index={index} product={products} />
                    ))
                }
            </div>
        </div>
    )
};

export default Catalogue;