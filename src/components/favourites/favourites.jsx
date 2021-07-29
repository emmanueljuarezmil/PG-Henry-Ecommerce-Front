import React,{useEffect} from 'react';
import { deleteFav, getAllFavourites } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux'; 
import  FavouriteCard  from './favouriteCard.jsx'
import './favourites.css';
import { Fade } from "react-awesome-reveal";


export default function Favourites(){
    const dispatch = useDispatch()
    const products = useSelector(state => state.favourites)
    useEffect(() => {
        dispatch(getAllFavourites())
    },[dispatch])

    function delFav(id){
        dispatch(deleteFav(id))       
        dispatch(getAllFavourites())
    }
    return (
        <div>
            <Fade duration={1500} cascade={true} direction={'right'}>
            <div className='catalogue_container'>
                {
                    products && products.length > 0 ? products.map((products, index) => (
                        <div>
                        <FavouriteCard index={index} key={index} product={products} delFav={delFav}/>
                    </div>
                    ))
                    : <h3 className='no_favs'>No tienes productos agregados a favoritos</h3>
                }
            </div>
            </Fade>
        </div>
    )
    

}