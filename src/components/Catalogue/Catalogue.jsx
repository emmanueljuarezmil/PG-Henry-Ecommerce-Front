import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import './Catalogue.css'
import ProductCard from '../ProductCard/ProductCard';

function Catalogue() {
    const products = useSelector((state) => state.all_products);
    const filter= useSelector((state)=> state.filtered_products);
    const productsPerPage=15;
    // const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);

    const indexOfLastProduct=productsPerPage*currentPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=products.slice(indexOfFirstProduct,indexOfLastProduct);
    const pagesNumber=Math.ceil(products.length/productsPerPage);

    const nextPage= ()=>{
        if(currentPage<pagesNumber){
            setCurrentPage(currentPage+1);
        }else setCurrentPage(1);         
    }
    const prevPage=()=>{
        if(currentPage!==1){
            setCurrentPage(currentPage-1);
        }else setCurrentPage(pagesNumber);             
    }
    
    return (
        <div className='catalogue_container'>
            {filter.length? filter.map((product, index) => (
                <ProductCard index={index} product={product}/>
            )):currentProducts?.map((product, index) => (
                <ProductCard index={index} product={product}/>
            ))}
            <button className='prev' onClick={nextPage}>{'< prev'}</button>
            <button className='next' onClick={prevPage}>{'next >'}</button>
        </div>
    )
};

export default Catalogue