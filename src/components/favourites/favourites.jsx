import React,{useEffect} from 'react';
import { deleteFav, getAllFavourites } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux'; 
import  FavouriteCard  from './favouriteCard.jsx'
import './favourites.css';
import { Fade } from "react-awesome-reveal";


export default function Favourites(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFavourites())
    },[dispatch])

    function delFav(id){
        dispatch(deleteFav(id))       
    } 
    
    const products = useSelector(state => state.favourites)
    console.log(products)
    return (
        <div>
            <Fade duration={1500} cascade={true} direction={'right'}>
            <div className='catalogue_container'>
                {
                    products && products.map((products, index) => (
                        <div>
                        <button onClick={() => delFav(products.id)}>X</button>
                        <FavouriteCard index={index} key={index} product={products} />
                    </div>
                    ))
                }
            </div>
            </Fade>
        </div>
    )
    

}