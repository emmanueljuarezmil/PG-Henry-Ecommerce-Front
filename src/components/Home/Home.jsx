import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../Redux/Actions'

import Catalogue from '../Catalogue/Catalogue';

function Home() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllProducts())
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Catalogue/>
        </div>
    )
}

export default Home;
