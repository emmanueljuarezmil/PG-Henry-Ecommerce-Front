import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import CarouselLanding from '../CarouselLanding/CarouselLanding'
import guitarras from '../../img/GUITARRAS.png'
import baterias from '../../img/PERCUSION.png'
import otro from '../../img/OTRO.png'
import otro2 from '../../img/OTRO2.png'

const imagesLanding = [
    guitarras,
    baterias,
    otro,
    otro2
]

function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <div>
            <CarouselLanding images={imagesLanding}/>
        </div>
    )
}

export default Landing
