import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Catalogue.css';
import { Fade } from "react-awesome-reveal";

function Catalogue({products}) {

    return (
        <div>
            <Fade duration={1500} cascade={true} direction={'right'}>
            <div className='cards-container'>
                {
                    products && products.map((products, index) => (
                        <ProductCard index={index} key={index} product={products} />
                    ))
                }
            </div>
            </Fade>
        </div>
    )
};

export default Catalogue;