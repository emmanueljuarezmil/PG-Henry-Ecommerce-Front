import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import Filter from '../Filter/Filter';
import Catalogue from '../Catalogue/Catalogue';

function Home() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <div>
            <Filter/>
            <Catalogue/>
        </div>
    )
}

export default Home;
