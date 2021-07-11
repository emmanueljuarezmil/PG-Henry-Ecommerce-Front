import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './CarouselComponent.css'

function CarouselComponent() {
    return (
        <div className='carousel'>
            <Carousel autoPlay={true} interval={5000} infiniteLoop={true} centerMode={true} showThumbs={false} centerSlidePercentage={100}>
                <div>
                    <img src="https://mx.yamaha.com/es/files/el_guitars_a9b6e526be7c84999af59273aa3bff85.jpg?impolicy=resize&imwid=1200&imhei=480" alt='foto'/>
                </div>
                <div>
                    <img src="https://mx.yamaha.com/es/files/Image-main_LCHO_1200x480_1200x480_8112074cb3b557bbe6704640f7101bf2.jpg" alt='foto' />
                 
                </div>
                <div>
                    <img src="https://mx.yamaha.com/es/files/aw_image_main_11e27deca711f8adbbefac6494061bda.jpg?impolicy=resize&imwid=1200&imhei=480" alt='foto'/>
                </div>
                <div>
                    <img src="http://media1.santabanta.com/full5/Miscellaneous/Musical%20Instruments/musical-instruments-50a.jpg" alt='foto'/>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent
