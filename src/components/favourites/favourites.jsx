import React,{useEffect} from 'react';
import { getAllFavourites } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux'; 
import  FavouriteCard  from './favouriteCard.jsx'
import './favourites.css';
import { Fade } from "react-awesome-reveal";



export default function Favourites(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFavourites())
    })
    
    const products = useSelector(state => state.favourites.data.Products)
     
    return (
        <div>
            <Fade duration={1500} cascade={true} direction={'right'}>
            <div className='catalogue_container'>
                {
                    products && products.map((products, index) => (
                        <FavouriteCard index={index} key={index} product={products} />
                    ))
                }
            </div>
            </Fade>
        </div>
    )
    

}