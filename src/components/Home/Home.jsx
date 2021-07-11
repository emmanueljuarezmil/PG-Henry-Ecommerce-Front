import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../Redux/Actions'
import Filter from '../Filter/Filter';
import { useSelector } from 'react-redux';
import SearchRoot from '../SearchRoot/SearchRoot';
import Catalogue from '../Catalogue/Catalogue';
import SearchBar from '../SearchBar/SearchBar';

import './Home.css'

function Home() {
    const searched = useSelector((state) => state.product_search);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <div>
            <div className='search_div'>
                <SearchBar />
            </div>
            {searched.length ?
                <SearchRoot /> :
                <div>
                    <Filter />
                    <Catalogue />
                </div>
            }
        </div>
    )
}

export default Home;
