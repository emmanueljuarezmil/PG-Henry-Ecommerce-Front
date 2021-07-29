import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import './User.css';
import Cookies from 'universal-cookie'
import { getUserOrders } from '../../Redux/Actions';

function User() {    
    const dispatch=useDispatch();
    useEffect(() => {
        const cookie= new Cookies();
        const id= cookie.get('id');
        dispatch(getUserOrders(id));
    }, [dispatch]);

    const user=useSelector((state)=>state.user);
    const orders=useSelector((state)=>state.userOrders);
    const total=()=>{
        let total=0;
        for(let i=0;i<orders.length;i++){
            for(let j=0; j<orders[i].Products.length;j++){
                total=total+orders[i].Products[j].price;
            }
        }
        return total;
    }

    return (
        <div className='all_gus'>
            <div className='perfil'>
                <img className='picture_dios_mio_gus' src={user.picture} alt="" />
                <p>Nick: {user.nickname}</p>
                <p>Nombre: {user.name}</p>
                <p>Correo: {user.email}</p>
                {user.email_verified && (
                    <p>¡Tu email ya ha sido verificado!</p>
                )}
                {!user.email_verified && (
                    <p>¡Vaya! Tu email aun no esta verificado</p>                    
                )}

            </div>
            <div className='orders'>
                <ul className='order_list'>
                    <h2>Lista de órdenes:</h2>
                    {orders==="El usuario requerido no tiene ninguna orden" ?(
                            <li>Aún no tienes órdenes de compra.</li>
                    ):
                    (orders.map(order=>{
                        return(
                            <li className='order'>
                                <h3>Id: {order.id}</h3>
                                <h4>Status: {order.status}</h4>
                                <h4>Fecha de compra: {order.createdAt}</h4>
                                <h4>Total de la compra: {total()}</h4>
                                <h4>Products:</h4>

                                <div className='products'>
                                    {order.Products.map(prod=>{
                                    return(
                                        <div className='product_dios_mio_gus'>
                                            <img className='product_img_dios_mio_gus' src={prod.photo[0]} alt="" />
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
            </div>
        </div>
    )
}

export default User
