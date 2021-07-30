import React, {useEffect, useState, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/Actions/index';
import { useTable } from 'react-table'
import axios from 'axios'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { url } from "../../constantURL"
import { headers } from "../../controllers/GetHeaders"
import Swal from 'sweetalert2';
import './editUsers.css'


function EditUsers() {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const [name,setName] = useState('')
    const [admin,setAdmin] = useState(undefined)

  useEffect(() => {
    dispatch(getAllUsers(null, name, admin))
  },[dispatch, name, admin])



const deleteUser= async (e) => {
  try {
    const {data} = await axios.delete(`${url}/users/${e.target.id}`, {headers})
    Swal.fire({
      icon: 'success',
      text: 'Usuario eliminado con éxito',
      showConfirmButton: false,
      timer: 2000
    })
    dispatch(getAllUsers(data))
  } catch(err) {
    console.error(err)
  }
 }

const changeAdmin = async (e) => {
  e.preventDefault()
  try {
    await axios.put(`${url}/users/newadmin`, {
        id: e.target.id,
        value: e.target.value
      },
      { headers}
    )
    if(e.target.value === 'true') Swal.fire({
      icon: 'success',
      text: 'Usuario elevado a admin',
      showConfirmButton: false,
      timer: 2000
    })
    else Swal.fire({
      icon: 'success',
      text: 'Usuario sin credencial de admin',
      showConfirmButton: false,
      timer: 2000
    })
    dispatch(getAllUsers())
  } catch(err) {
    console.error(err)
  }
}


const dataTable = users.map(users => {
    return {
      col1: users.id,
      col2: users.name,
      col3: users.email,
      col4: users.admin ? "Si" : "No",
      col5: (
        !users.admin ?
        <button onClick={changeAdmin} id={users.id} value={true} style={{background: 'rgba(0, 0, 0, 0.233)',color: 'white', border: '2px solid white'}}>Hacer admin</button> :
        <button onClick={changeAdmin} id={users.id} value={false} style={{background: 'rgba(0, 0, 0, 0.233)',color: 'white', border: '2px solid white'}}>Quitar admin</button>
      ),
      col6: (<RiDeleteBin2Line id={users.id} onClick={deleteUser}/>)
    }
})

  const columnsTable = [
    {
      Header: 'User ID',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Name',
      accessor: 'col2',
    },
    {
      Header: 'Email',
      accessor: 'col3',
    },
    {
      Header: 'Admin',
      accessor: 'col4', 
    },
    {
      Header: '',
      accessor: 'col5',
    },
    {
      Header: "Eliminar",
      accessor: 'col6'
    }
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => columnsTable, [])
  // eslint-disable-next-line
  const data = useMemo(() => dataTable, [users])

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

  const handleNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const filterAdmin = (e) => {
     e.preventDefault()
    setAdmin(e.target.value) 
  }

  const trCss = (index) => {
    let cont = index % 3;
    switch (cont) {
        case 0: {
            return "tr-one";
        }
        case 1: {
            return "tr-two";
        }
        case 2: {
            return "tr-three";
        }
        default:
            return "tr-one";
    }
  };

    return (
      <div className='edit-user-container'>
        <div className='edituser-filters-container'>
          <input type="text" value={name} onChange={handleNameChange} placeholder='Ingresa un nombre'/>
          <span>Filtrar por:</span>
          <select name="select" onChange={filterAdmin}>
          <option value="undefined">Select</option> 
            <option value={true}>Es Admin</option>
            <option value={false}>No es Admin</option>
            </select>   
        </div>
          <div className='edit-user-table-container'>
              { users.length ? 
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
                  rows.map((row, i) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()} className={trCss(i)}>
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
            </table> :
            <div>
            <h3>No se han encontrado resultados para tu busqueda</h3>
            <img src="https://media1.tenor.com/images/65145586c6658008cbd0efb6f491a90c/tenor.gif?itemid=17104237" alt="not found"/> 
            </div>
              }
          </div>
      </div>
    )
}

export default EditUsers
