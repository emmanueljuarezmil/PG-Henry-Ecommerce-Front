import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrderDetail } from '../../Redux/Actions/index';
import { useTable } from 'react-table'
import { BiDetail } from 'react-icons/bi'
import OrderDetail from '../OrderDetail/OrderDetail.jsx'


function OrderAdmin() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)
  const [stateAux, setStateAux] = useState('tabla')

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const dataTable = orders.map(order => {
    return {
      col1: order.id,
      col2: order.status,
      col3: order.shippingStatus,
      col4: order.createdAt.split('T')[0],
      col5: (<button onClick={() => {
        dispatch(getOrderDetail(order.id));
        setStateAux('orden');
      }}> <BiDetail
        /> </button>)
    }
  })

  // eslint-disable-next-line
  const columnsTable = [
    {
      Header: 'User ID',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Estado de la orden',
      accessor: 'col2',
    },
    {
      Header: 'Estado de la compra',
      accessor: 'col3',
    },
    {
      Header: 'Fecha de creacion',
      accessor: 'col4',
    },
    {
      Header: 'Ver detalle',
      accessor: 'col5',
    },
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

  return (
    <div>
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