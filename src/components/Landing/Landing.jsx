import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../Redux/Actions'

function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Esta es la Landing page</h1>
        </div>
    )
}

export default Landing
