import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setCategoryId, setOrder} from '../../Redux/Actions/index';

const Filter = () =>{
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const categoryActual = useSelector(state => state.filterCategory)
    const orderBy = useSelector(state => state.orderBy)
    const orderType = useSelector(state => state.orderType)
    const orderActual = orderBy + ' ' + orderType

    const handleCategory = (e) => {
		dispatch(setCategoryId(e.target.value));
	};
    
    const handleOrder = (e) => {
        dispatch(setOrder(e.target.value));
    }
    
    return (
        <div className='div_filters'>
            <select name='Category' value={categoryActual} onChange={(e) => handleCategory(e)}>
                <option value=''>Todas</option>
                {categories?.map((c, i) => (
                    <option key={i} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
            
        

            <select name='Order' value={orderActual} onChange={(e) => handleOrder(e)}>
                <option key={1} value={'name ASC'}>
                    Nombre A-Z
                </option>
                <option key={2} value={'name DESC'}>
                    Nombre Z-A
                </option>
                <option key={3} value={'price ASC'}>
                    Menor precio
                </option>
                <option key={4} value={'price DESC'}>
                    Mayor precio
                </option>
            
            </select>
        </div>
    )
}

export default Filter;
