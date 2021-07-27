import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';


export let headers;

function GetHeaders() {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const setHeaders = async () => {
            const token = isAuthenticated && await getAccessTokenSilently();
            const idUser = Cookies.get('id');
            return headers = {
                authorization: `Bearer ${token}`,
                idUser,
                email: user?.email,
                name: user?.name
            }
    }
    setHeaders()
    return (
        <div>
        </div>
    )
};

export default GetHeaders;