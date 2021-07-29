import React, { useMemo } from 'react';
import { useTable } from 'react-table'
import { useSelector } from 'react-redux';

import './OrderDetail.css';

function OrderDetail() {

    const products = useSelector(state => state.order_detail)
    
    const dataTable = products?.map(product => {
        return {
          col1: product.name,
          col2: product.stock,
          col3: `$${product.price}`,
          col4: `${product.perc_desc}%`,
          col5: product.quantity,
          col6: (product.price*product.quantity)*(100-product.perc_desc)
        }
      })
    
      const columnsTable = [
        {
          Header: 'Nombre',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Stock',
          accessor: 'col2',
        },
        {
          Header: 'Precio',
          accessor: 'col3',
        },
        {
          Header: 'Porcentaje de descuento',
          accessor: 'col4',
        },
        {
          Header: 'Cantidad',
          accessor: 'col5',
        },
        {
            Header: 'Subtotal',
            accessor: 'col6',
        },
      ]

    // eslint-disable-next-line
    const columns = useMemo(() => columnsTable, [])
    // eslint-disable-next-line
    const data = useMemo(() => dataTable, [products])

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
    let total = 0
    products?.forEach(el => {
    total+=(el.price*el.quantity*(100-el.perc_desc))
    })

    return (
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
            <h3>Total: ${total}</h3>
          </div>
    )
};

export default OrderDetail;