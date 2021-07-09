import React from 'react';
import { useSelector } from 'react-redux';
import './Catalogue.css'
import ProductCard from '../ProductCard/ProductCard';

function Catalogue() {
    const products = useSelector((state) => state.all_products);
    const filter= useSelector((state)=> state.filtered_products)
    
    return (
        <div className='catalogue_container'>
            {filter.length? filter.map((product, index) => (
                <ProductCard index={index} product={product}/>
            )):products?.map((product, index) => (
                <ProductCard index={index} product={product}/>
            ))}
        </div>
    )
};

export default Catalogue