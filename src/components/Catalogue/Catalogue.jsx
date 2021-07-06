import React from 'react';
import { useSelector } from 'react-redux';
import './Catalogue.css'
import ProductCard from '../ProductCard/ProductCard';

function Catalogue() {
    const products = useSelector((state) => state.all_products);
    
    return (
        <div className='catalogue_container'>
            {products?.map((product, index) => (
                <ProductCard index={index} product={product}/>
            ))}
        </div>
    )
};

export default Catalogue