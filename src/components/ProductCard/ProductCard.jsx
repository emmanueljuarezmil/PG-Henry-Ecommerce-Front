import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard2.css';
import Rating from '@material-ui/lab/Rating';
import { addToCart } from '../../Redux/Actions';
import { useDispatch, } from 'react-redux';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { MdShoppingCart } from "react-icons/md";
import { useAuth0 } from '@auth0/auth0-react'
import { AddToFavs } from '../addToFavourites/addToFavs';
import { RiPriceTag3Fill } from 'react-icons/ri'


function ProductCard({ product, index }) {
    const { isAuthenticated } = useAuth0()
    const dispatch = useDispatch();
    const userId = Cookies.get('id');
    const [quantity, setQuantity] = useState(product?.quantity || 1);
    const cardCss = (index) => {
        let cont = index % 6;
        switch (cont) {
            case 0: {
                return 'card-content-red'
            }
            case 1: {
                return 'card-content-darkred'
            }
            case 2: {
                return 'card-content-blue'
            }
            case 3: {
                return 'card-content-lightblue'
            }
            case 4: {
                return 'card-content-green'
            }
            case 5: {
                return 'card-content-orange'
            }
            default:
                return 'card-content-red'

        }
    }

    const reviews = product.Reviews
    let quantityRev = reviews?.length;
    function promedio(array) {
        let suma = 0;
        let cont = 0;
        if (!array.length) return 0;
        for (let i = 0; i < array.length; i++) {
            suma = suma + parseInt(array[i].rating);
            cont++;
        }
        return suma / cont;
    }
    let prom = 0;
    if (quantityRev) prom = promedio(reviews);

    const addToCartBtn = () => {
        if ((Number(quantity)) <= product.stock) {
            setQuantity(Number(quantity) + 1);
            dispatch(addToCart({ ...product, quantity }, userId));
            Swal.fire({
                icon: 'success',
                text: 'Producto agregado exitosamente!',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else Swal.fire({
            icon: 'error',
            text: 'Lo sentimos, no hay stock de este producto',
        })
    };
    let iconStyles = { color: "white", fontSize: "2rem", position: 'center' };

    return (
        <div>
            <div className={cardCss(index)}>

                <Link to={`/product/${product.id}`}>
                    {
                        product.photo[0] ?
                            <img src={product.photo[0]} alt='' className='card-image' /> :
                            <img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt='' className='card-image' />
                    }
                </Link>


                <h4 className='product_name'>{product.name} {product.stock === 0 ? '(Sin stock)' : null}</h4>

                <div className='stars'>
                    {
                        product.Reviews.length ?
                            <Rating name="read-only" precision={0.5} value={prom} readOnly /> :
                            null
                    }
                </div>

                <div className='discount'>
                    {product.perc_desc > 0 ?
                        <h5><RiPriceTag3Fill style={iconStyles} />{product.perc_desc}%</h5> : null}
                </div>

                <div className='cart-price-container'>
                    <h5>${product.price}</h5>
                    <div className='addtocart-and-fav-button'>
                    {product.stock > 0 ? (
                        <button onClick={addToCartBtn} className='add-to-cart-buton'><MdShoppingCart style={iconStyles} /></button>) : null}
                    {isAuthenticated && (<AddToFavs product={product} />)}
                    </div>
                    <div className='views'>
                        <p>{product.views} visitas</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;
