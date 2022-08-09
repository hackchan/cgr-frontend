import React, { useState, forwardRef } from 'react'
import MaterialTable, { MTableBodyRow } from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
const empList = [{ id: 4, name: 'Fabio', email: 'fabiorojas7@gmail.com', phone: 9087654321, city: 'cucuta', monto: 267347.33, gender: 'M' }]
export const CrudSatelital = () => {
  const [data, setData] = useState(empList)
  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email', align: 'center' },
    { title: 'Phone', field: 'phone', align: 'center' },
    { title: 'City', field: 'city' },
    { title: 'Monto', field: 'monto', type: 'currency' },
    { title: 'Gender', field: 'gender', lookup: { M: 'Hombre', F: 'Mujer' } }
  ]
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }
  const actions = [
    {
      name: 'remove', // Added custom name property so we know which action to check for
      icon: () => <RemoveCircleIcon />,
      tooltip: <h1>I am a tooltip</h1>,
      onClick: (event, rowData) => window.alert(JSON.stringify(rowData, null, 2)),
      disabled: false, // Set disabled to false by default for all actions
      position: 'row'
    },
    {
      name: 'account',
      icon: () => <AccountCircleIcon />,
      tooltip: <h1>I am a tooltip</h1>,
      onClick: (event, rowData) => alert(JSON.stringify(rowData, null, 2)),
      disabled: false,
      position: 'row'
    }
  ]
  return (

    <div className='App'>
      <h1>Crud Satelital</h1>
      <h4>Opreations Basic</h4>
      <MaterialTable
        actions={actions}
        icons={tableIcons}
        title='Satelital Data'
        data={data}
        columns={columns}
        options={{
          selection: true
        }}
        components={{
          Row: props => {
            const propsCopy = { ...props }
            propsCopy.actions.find(a => a.name === 'remove').disabled = propsCopy.data.id < 100
            propsCopy.actions.find(a => a.name === 'account').disabled = propsCopy.data.name !== 'Paper'
            return <MTableBodyRow {...propsCopy} />
          }
        }}
        // editable={{
        //   onRowAdd: (newRow) => new Promise((resolve, reject) => {
        //     const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
        //     setTimeout(() => {
        //       setData(updatedRows)
        //       resolve()
        //     }, 2000)
        //   }),
        //   onRowDelete: selectedRow => new Promise((resolve, reject) => {
        //     const index = selectedRow.tableData.id
        //     const updatedRows = [...data]
        //     updatedRows.splice(index, 1)
        //     setTimeout(() => {
        //       setData(updatedRows)
        //       resolve()
        //     }, 2000)
        //   }),
        //   onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
        //     const index = oldRow.tableData.id
        //     const updatedRows = [...data]
        //     updatedRows[index] = updatedRow
        //     setTimeout(() => {
        //       setData(updatedRows)
        //       resolve()
        //     }, 2000)
        //   })

        // }}
        // options={{
        //   actionsColumnIndex: -1, addRowPosition: 'first'
        // }}
      />
    </div>
  )
}
