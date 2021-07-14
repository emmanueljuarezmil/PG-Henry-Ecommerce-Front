import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import CarouselComponent from '../CarouselComponent/CarouselComponent'
import Log from '../log/log';

const imagesLanding = [
    "https://mx.yamaha.com/es/files/el_guitars_a9b6e526be7c84999af59273aa3bff85.jpg?impolicy=resize&imwid=1200&imhei=480",
    "https://mx.yamaha.com/es/files/Image-main_LCHO_1200x480_1200x480_8112074cb3b557bbe6704640f7101bf2.jpg",
    "https://mx.yamaha.com/es/files/aw_image_main_11e27deca711f8adbbefac6494061bda.jpg?impolicy=resize&imwid=1200&imhei=480",
    "http://media1.santabanta.com/full5/Miscellaneous/Musical%20Instruments/musical-instruments-50a.jpg"
]

function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <div>
            <CarouselComponent images={imagesLanding}/>
        </div>
    )
}

export default Landing
