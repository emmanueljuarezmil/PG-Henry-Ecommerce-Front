import React from 'react'
//import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getFiltratedCategories} from '../../Redux/Actions/index'

const Filter = () =>{
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    //const { categories } = useSelector((state) => state)
    const handleCategory = (e) => {
		dispatch(getFiltratedCategories(e.target.value));
	};
    
    //<NavLink to={`/category/p_name/${c.name}`} className='link'>
    //</NavLink>

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

/*const mapStateToProps = (state) => {
	return {
		categories: state.categories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllCategories: (category) => dispatch(getAllCategories(category)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);*/
export default Filter;
