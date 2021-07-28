import React from 'react';
import Swal from 'sweetalert2';

const AuthenticationCode = () => {
    const sendAuthenticationCode = async () => {
        const { value: ipAddress } = await Swal.fire({
            title: 'Verifica tu cuenta',
            input: 'text',
            inputLabel: 'Ingresa tu código de verificación',
            inputValue: `InputValue`,
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un código'
                }
            }
        })
        const cookies = new Cookies
        const idUser = cookies.get('id')
        if(ipAddress) {
            await dispatch(authenticationByCode(idUser, ipAddress))
        }
        if (validated) {
            Swal.fire('Su cuenta ha sido verificada')
        }
    }
    return (
        <div>
            
        </div>
    )
};

export default AuthenticationCode;
