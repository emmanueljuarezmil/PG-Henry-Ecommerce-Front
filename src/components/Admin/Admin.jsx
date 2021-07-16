import React from 'react'
import { NavLink } from 'react-router-dom'


function Admin() {
    return (
        <div>
            <div className='admin_item'>
                <NavLink to='/admin/product' className="NavLink">Agregar producto</NavLink>
            </div>
            <div className='admin_item'>
                <NavLink to='/admin/category' className="NavLink">Agregar categoria</NavLink>
            </div>   
            <div className='admin_item'>
                <NavLink to='/admin/orders' className="NavLink">Ver ordenes</NavLink>
            </div> 
        </div>
    )
}

export default Admin
