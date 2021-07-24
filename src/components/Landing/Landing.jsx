import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import CarouselLanding from '../CarouselLanding/CarouselLanding'
import guitarras from '../../img/GUITARRAS.png'
import baterias from '../../img/PERCUSION.png'
import otro from '../../img/OTRO.png'
import otro2 from '../../img/OTRO2.png'
import axios from 'axios';
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';
import { headers } from "../../controllers/GetHeaders" 


const imagesLanding = [
    guitarras,
    baterias,
    otro,
    otro2
]

function Landing(props) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])
    
    
    useEffect(() => {
        return (async () => {
            try{
                const params = props.location.search        
                const objectParams = new URLSearchParams(params)
                const status = objectParams.get('status')
                console.log(status)
                const cookies = new Cookies()
                console.log('2')
                const idUser = await cookies.get('id')
                console.log(idUser)
                await axios((`${url}/user/sendmail?type=status&status=${status}`,{headers}))
                console.log('4')
            }catch(error){
                console.log(error)
            }
        })()
    },[])

    return (
        <div>
            <CarouselLanding images={imagesLanding}/>
        </div>
    )
}

export default Landing
