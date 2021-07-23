import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import Rating from '@material-ui/lab/Rating';

function ProductCard({product, index}) {
    const cardCss=(index)=>{
        let cont =index%6;
        switch(cont){
            case 0:{
                return 'card_container_link_red'
            }
            case 1:{
                return 'card_container_link_darkred'
            }
            case 2:{
                return 'card_container_link_blue'
            }
            case 3:{
                return 'card_container_link_lightblue'
            }
            case 4:{
                return 'card_container_link_green'
            }
            case 5:{
                return 'card_container_link_orange'
            }
            default:
                return 'card_container_link_red'
            
        }
    }

    const reviews=product.Reviews
    let quantity=reviews?.length;
    function promedio(array){
        let suma=0;
        let cont=0;
        if(!array.length) return 0;
        for(let i=0;i<array.length;i++){
            suma=suma+parseInt(array[i].rating);
            cont++;
        }
        return suma/cont;
    }
    let prom=0;
    if(quantity) prom=promedio(reviews);
    return (
        <div>
            <div className={product.stock > 0 ? 'card_container' : 'card_container sold_out'}>
                <Link to={`/product/${product.id}`}
                className={cardCss(index)}
                style={{ textDecoration: 'none' }}>
                    <div className='card_container_item_img'>
                        {
                            product.photo[0] ?
                            <img src={product.photo[0]} alt='' className='product_img' /> :
                            <img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt='' className='product_img' />   
                        }

                    </div>
                    <div className='card_container_item'>
                        <h5 className='product_price'>${product.price}</h5>
                        <h4 className='product_name'>{product.name} {
                            product.stock === 0 ? '(Sin stock)' : null
                        }</h4>
                    </div>
                    <div>
                        {
                            product.Reviews.length ?
                            <Rating name="read-only" precision={0.5} value={prom} readOnly /> :
                            null
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default ProductCard;
