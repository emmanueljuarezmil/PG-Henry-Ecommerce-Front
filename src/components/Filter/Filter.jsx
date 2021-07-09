import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFiltratedCategories} from '../../Redux/Actions/index'

const Filter = () =>{
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const handleCategory = (e) => {
		dispatch(getFiltratedCategories(e.target.value));
	};
    return (
        <div>
            <select name='Category' onChange={(e) => handleCategory(e)}>
                <option value='All'>Todas</option>
                {categories?.map((c, i) => (
                    <option key={i} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filter;
