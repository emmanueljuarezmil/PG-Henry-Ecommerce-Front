import React,{useState} from 'react'
import './SearchBar.css'


function SearchBar() {
    const [search,setSearch]=useState('')
    
    const handleChange=(e)=>{
        setSearch(e.target.value)
    }
    return (
        <div classname='cont'>
            <form>
                <input className='input-icon' type="text" value={search} onChange={handleChange} placeholder=" Search"/>
            </form>
        </div>
    )
}

export default SearchBar
