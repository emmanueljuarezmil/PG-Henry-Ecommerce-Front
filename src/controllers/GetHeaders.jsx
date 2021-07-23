import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Cookies from 'universal-cookie';


export let headers

function GetHeaders() {
    const { getAccessTokenSilently } = useAuth0()
    const setHeaders = async () => {
        const token = await getAccessTokenSilently()
        const cookies = new Cookies()
        const idUser = await cookies.get('id')
        return headers = {
            authorization: `Bearer ${token}`,
            idUser
        }
    }
    setHeaders()
    return (
        <div>
        </div>
    )
}

export default GetHeaders

