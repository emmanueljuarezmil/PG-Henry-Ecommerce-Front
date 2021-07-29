import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './User.css';
import Cookies from 'universal-cookie'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { getUserOrders, resetShippingAddress, authenticationByCode } from '../../Redux/Actions';
import FormShipping from '../FormShipping/FormShipping';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';
import axios from 'axios'
import { url } from "../../constantURL"
import { headers } from '../../controllers/GetHeaders'

function User() {
    const { isAuthenticated } = useAuth0()
    const dispatch = useDispatch();

    useEffect(() => {
        const cookie = new Cookies();
        const id = cookie.get('id');
        dispatch(getUserOrders(id));
    }, [dispatch]);

    const user = useSelector((state) => state.user);
    const orders = useSelector((state) => state.userOrders);
    const validated = useSelector((state) => state.authenticatedByCode);
    const address = useSelector((state) => state.user_address);

    const forAnchor = {}

    orders.forEach((orders, index) => {
        return {
            [orders.order.id]: null
        }
    })

    const [anchorEl, setAnchorEl] = React.useState(forAnchor);

    const [code, setCode] = useState('')
    const cookies = new Cookies();
    const onSubmit = async (e) => {
        e.preventDefault()
        if (validated) Swal.fire('Tu cuenta ya está verificada')
        else {
            try {
                const idUser = await cookies.get("id")
                const { data } = await axios.get(`${url}/users/authenticationByCode/${idUser}?authenticationCode=${code}`, { headers })
                if (data) {
                    dispatch(authenticationByCode(data))
                    Swal.fire("Su cuenta ha sido verificada");
                }
                else {
                    Swal.fire("Código de verificación incorrecto");
                }
            } catch (err) {
                console.error(err)
                Swal.fire("Código de verificación incorrecto");
            }
        }
    }
    const setInputCode = (e) => {
        setCode(e.target.value)
    }

    // const total = (array) => {
    //     let total = 0;
    //     for (let i = 0; i < array.length; i++) {
    //         total+=array[i].price*array[i].quantity*(100-array[i].perc_desc)/100
    //     }
    //     return total;
    //}


    const editAddress = (e) => {
        e.preventDefault()
        dispatch(resetShippingAddress())
    };

    const handleClose = (e) => {
        const nullAnchor = {}
        for (let anchor in anchorEl) {
            nullAnchor[anchor] = null
        }
        setAnchorEl(nullAnchor);
    };

    const handleClick = (e) => {
        setAnchorEl({
            ...anchorEl,
            [e.target.id]: true
        });
    };

    return (
        <div className='all_gus'>
            <div className='perfil'>
                <img className='picture_dios_mio_gus' src={user.picture} alt="" />
                <p>Nick: {user.nickname}</p>
                <p>Nombre: {user.name}</p>
                <p>Correo: {user.email}</p>
                {validated && (
                    <p>¡Tu email ya ha sido verificado!</p>
                )}
                {!validated && (
                    <p>¡Vaya! Tu email aun no esta verificado</p>
                )}
            </div>
            {isAuthenticated && (
                <NavLink to='/favourites'>Tus productos favoritos</NavLink>
            )}
            <div className='orders'>
                {address[0].length ?
                    <div>
                        <p>Direccion de envio: {address[0]}</p>
                        <p>Ciudad: {address[1]}</p>
                        <p>Codigo postal: {address[2]}</p>
                        <button onClick={editAddress}>Editar</button>
                    </div>
                    : <FormShipping />
                }
            </div>
            {validated === false ?
                <div>
                    <h2>Ingresa tu codigo de validación acá</h2>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={code} onChange={setInputCode}></input>
                        <button type="submit">Valida</button>
                    </form>
                </div>
                : null
            }

            {/* <div className='orders'>
                <ul className='order_list'>
                    <h2>Lista de órdenes:</h2>
                    {orders === "El usuario requerido no tiene ninguna orden" ? (
                        <li>Aún no tienes órdenes de compra.</li>
                    ) :
                        (orders.map(order => {
                            return (
                                <li className='order'>
                                    <h3>Id: {order.id}</h3>
                                    <h4>Status: {order.status}</h4>
                                    <h4>Fecha de compra: {order.createdAt.split('T')[0]}</h4>
                                    <h4>Total de la compra: $ {total()}</h4>
                                    <h4>Products:</h4>

                                    <div className='products'>
                                        {order.Products.map(prod => {
                                            return (
                                                <div className='product_dios_mio_gus'>
                                                    <div className='product_img_dios_mio_gus_container'>
                                                        <img className='product_img_dios_mio_gus' src={prod.photo[0]} alt="" />
                                                    </div>
                                                    <h4>Nombre: {prod.name}</h4>
                                                    <h5>Precio: {prod.price}</h5>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </li>
                            )
                        })
                        )}
                </ul>
            </div> */}
            <div className='orders_history_container'>
                <h2>Historial de ordenes</h2>
                <div className='orders_history'>
                {
                    orders.map((item, index) => {
                        return (
                            <div className='each_order_history'>
                                <button onClick={handleClick} id={item.order.id} aria-controls="simple-menu">Orden nro: {item.order.id}</button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl[item.order.id]}
                                    keepMounted
                                    open={Boolean(anchorEl[item.order.id])}
                                    onClose={handleClose}
                                    className='each_menu_order'>
                                    <MenuItem>{`Fecha: ${item.order.createdAt.split('T')[0]}`}</MenuItem>
                                    {item.order.status === 'cart' ?
                                        <MenuItem>{`Estado de la orden: pendiente en carrito`}</MenuItem>
                                        :
                                        item.order.status === 'approved' ?
                                            <MenuItem>{`Estado de la orden: aprobada`}</MenuItem>
                                            :
                                            <MenuItem>{`Estado de la orden: cancelada`}</MenuItem>
                                    }
                                    {
                                        item.products?.map(product => {
                                            return (
                                                <MenuItem>{`${product.name.slice(0, 50)}... / ${product.quantity} ${product.quantity > 1 ? product.quantity + ' unidades' : product.quantity + ' unidad'} / $ ${product.price}`}</MenuItem>
                                            )
                                        })
                                    }
                                    <MenuItem>{`Total: $ ${Math.round(item.products?.reduce((total, { price, quantity, perc_desc }) => total + price * quantity * (100 - perc_desc) / 100, 0))}`}</MenuItem>
                                </Menu>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
};

export default User
