import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './CarouselLanding.css'

function CarouselLanding({images}) {
    return (
        <div>
            <Carousel autoPlay={true} interval={5000} infiniteLoop={true} centerMode={true} showThumbs={false} centerSlidePercentage={100}>
                {
                    images && images.length ?
                    images.map(image => (
                        <div>
                            <img src={image} alt="Not found" />
                        </div>
                        )
                    ) :
                    <div>
                        <img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt="Not found" />
                    </div>
                }
            </Carousel>
        </div>
    )
}

export default CarouselLanding
