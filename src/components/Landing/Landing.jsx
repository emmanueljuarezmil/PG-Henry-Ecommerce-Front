import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import CarouselComponent from '../CarouselComponent/CarouselComponent'
import Log from '../log/log';


function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <div>            
           <CarouselComponent/>
        </div>
    )
}

export default Landing
