import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories, setPage, getSearchBarProducts } from '../../Redux/Actions'
import Filter from '../Filter/Filter';
import { useSelector } from 'react-redux';
import Catalogue from '../Catalogue/Catalogue';
// import SearchBar from '../SearchBar/SearchBar';
import SearchBar2 from '../SearchBar/SearchBar2';
import './Home.css'

function Home() {

    const products = useSelector((state) => state.all_products);
    const name = useSelector((state) => state.filterName)
    const category = useSelector((state) => state.filterCategory)
    const page = useSelector(state => state.actualPage);
    const orderBy = useSelector(state => state.orderBy);
    const orderType = useSelector(state => state.orderType);
    const descFilter = useSelector(state => state.descFilter);
    let totalPages = useSelector((state) => state.totalPages);
    totalPages = Math.ceil(totalPages);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(name, page, orderBy , orderType, category, descFilter)) 
        dispatch(getAllCategories())
        dispatch(getSearchBarProducts())
    }, [dispatch, name, page, orderBy , orderType, category, descFilter ])
      
      const prevPage = (e) => {
          e.preventDefault();
          dispatch(setPage(page - 1));
      };
      const nextPage = (e) => {
          e.preventDefault();
          dispatch(setPage(page + 1));
        }
   
    return (
        <div className='home_container'>
            <div className='search_div'>
                {/* <SearchBar /> */}
                <SearchBar2 />
            </div>
            <div className='home_products'>
            <div className='filter_catalogue'>
                <Filter />
            </div>
            {products && products.length ?
                <div>
                    <div className='catalogue_div'>
                        <Catalogue products={products}/>
                    </div>
                </div> : <div>
                    <h3>No se han encontrado resultados para tu busqueda</h3>
                    <img src="https://media1.tenor.com/images/65145586c6658008cbd0efb6f491a90c/tenor.gif?itemid=17104237" alt="not found"/> 
                    </div>
            }
            <div className='catalogue_buttons'>
                <button className='prev' disabled={page === 1 ? true : false} onClick={prevPage}>{'< Anterior'}</button>
                <button className='next' disabled={page === totalPages ? true : false} onClick={nextPage}>{'Siguiente >'}</button>
            </div>
            </div>
        </div>
    )
}

export default Home;
