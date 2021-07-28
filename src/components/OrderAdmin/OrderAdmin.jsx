import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrderDetail } from '../../Redux/Actions/index';
import { useTable } from 'react-table'
import { BiDetail } from 'react-icons/bi'
import OrderDetail from '../OrderDetail/OrderDetail.jsx'
import axios from 'axios'
import { url } from "../../constantURL"
import { headers } from "../../controllers/GetHeaders"


function OrderAdmin() {
  
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)
  const [stateAux, setStateAux] = useState('tabla')
  const [order,setOrder] = useState('')
  const [shipping,setShipping] = useState('')

  useEffect(() => {
    dispatch(getAllOrders(null, order, shipping))
  }, [dispatch, order, shipping])

  async function handleChange(e){ 
    e.preventDefault()
    const body = {
      status: e.target.value,
      id: e.target.id
    }   
    const {data} = await axios.put(`${url}/orders`, body, {headers})
    dispatch(getAllOrders(data))
}
  
  const statusTranslates = {
    approved: 'Aprobada',
    rejected: 'Rechazada',
    cart: 'Carrito'
  }

  const shippingStatusTranslates = {
    uninitiated: 'No iniciado', 
    processing: 'En proceso', 
    approved: 'Aprobado', 
    cancelled: 'Cancelado'

  }

  const dataTable = orders.map(order => {
    return {
      col1: order.id,
      col2: statusTranslates[order.status],
      col3: order.createdAt && order.createdAt.split('T')[0],
      col4: (<button onClick={() => {
        dispatch(getOrderDetail(order.id));
        setStateAux('orden');
      }}> <BiDetail
        /> </button>),
      col5: shippingStatusTranslates[order.shippingStatus],
      col6: (
          <select id={order.id} onChange={handleChange}>
            <option>Cambiar estado</option>
            {
              order.shippingStatus === 'uninitiated' ?
              <option value="processing">En proceso</option> :
              null
            }
            {
              order.shippingStatus === 'uninitiated' || order.shippingStatus === 'processing' ?
              <option value="approved">Aprobado</option> :
              null
            }
            {
              order.shippingStatus === 'uninitiated' || order.shippingStatus === 'processing' ?
              <option value="cancelled">Cancelado</option> :
              null
            }
          </select>
      )
    }
  })

  const columnsTable = [
    {
      Header: 'ID de la orden',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Estado de la orden',
      accessor: 'col2',
    },
    {
      Header: 'Fecha de creacion',
      accessor: 'col3',
    },
    {
      Header: 'Ver detalle',
      accessor: 'col4',
    },
    {
      Header: 'Estado del envio',
      accessor: 'col5',
    },
    {
      Header: "Cambiar estado del envio",
      accessor: 'col6'
    }
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => columnsTable, [])
  // eslint-disable-next-line
  const data = useMemo(() => dataTable, [orders])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data
  })

  const onClick = () => {
    setStateAux('tabla')
  }
  
  const filterOrder = (e) => {
   e.preventDefault()
  setOrder(e.target.value) 
 }
  const filterShipping = (e) => {
    e.preventDefault()
   setShipping(e.target.value) 
 }


  return (
    <div>
       <span>Filtrar por Estado de orden:</span>
          <select name="select" onChange={filterOrder} >
          <option value="">Select</option> 
            <option value="cart">Carrito</option>
            <option value="approved">Aprobada</option>
            <option value="rejected">Rechazada</option>
          </select> 
          <span>Filtrar por Estado de envio:</span>
          <select name="select" onChange={filterShipping}>
          <option value="">Select</option> 
          <option value="uninitiated">No iniciado</option>
          <option value="processing">En proceso</option>
          <option value="approved">Aprobado</option>
          <option value="cancelled">Cancelado</option>
          </select> 
      {
        (stateAux === 'orden') ?
          <div>
            <OrderDetail/>
            <button onClick={onClick}>Volver</button>
          </div>
          :
          <div>
            <table {...getTableProps()}>
              <thead>
                {// Loop over the header rows
                  headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                          // Apply the header cell props
                          <th {...column.getHeaderProps()}>
                            {// Render the header
                              column.render('Header')}
                          </th>
                        ))}
                    </tr>
                  ))}
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                  rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {// Loop over the rows cells
                          row.cells.map(cell => {
                            // Apply the cell props
                            return (
                              <td {...cell.getCellProps()}>
                                {// Render the cell contents
                                  cell.render('Cell')}
                              </td>
                            )
                          })}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
      }
    </div>
  )
}

export default OrderAdmin;