import React,{useState} from 'react'
import './SearchBar.css'
import {connect} from 'react-redux'
import { getProductByName } from '../../Redux/Actions/index'




function SearchBar({getProductByName}) {
    const [search,setSearch]=useState('')
    
    const handleChange=(e)=>{
        setSearch(e.target.value);
        getProductByName(search);
    }
    return (
        <div classname='cont'>
            <form>
                <input className='input-icon' type="text" value={search} onChange={handleChange} placeholder=" Search"/>
            </form>
        </div>
    )
}
function mapStateToProps(state){
    return {
        product_search:state.product_search
    }
}
function mapDispatchToProps(dispatch){
    return {
        getProductByName:(name)=>dispatch(getProductByName(name))
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(SearchBar);

