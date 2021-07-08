import React from 'react'
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux'

function Filter() {

    const { categories } = useSelector((state) => state)


    return (
        <div>
            <select name='Category'>
                <option value='All'>Todas</option>
                {categories?.map((c, i) => (
                    <NavLink to={`/category/${c.name}`} className='link'>
                        <option key={i} value={c.name}>
                            {c.name}
                     </option>
                    </NavLink>
                ))}
            </select>
        </div>
    )
}

export default Filter
