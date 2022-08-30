import React, { useContext } from 'react'
import { AppContext } from '../contex/AppProvidercContext'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../containers'
import { Layout } from '../components/Layout'
import { Checkout } from '../containers/Checkout'
import { Information } from '../containers/Information'
import { Login } from '../containers/Login'
import { Logout } from '../containers/Logout'
import { Recovery } from '../components/Recovery'
import { Payment } from '../containers/Payment'
import { Succes } from '../containers/Succes'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Table } from '../components/Table'
import { ResetPassword } from '../components/ResetPassword'
import { NewPassword } from '../components/NewPassword'
import { NotFound } from '../components/NotFound'
import { DragArea } from '../components/DragArea'
import { Csv } from '../components/Csv'
import { CsvParser } from '../components/CsvParse'
import { LoadTable } from '../components/LoadTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CrudSatelital } from '../components/CrudSatelital'
import { CrudDepartmets } from '../components/CrudDepartments'
import { CrudMunicipios } from '../components/CrudMunicipios'
import { CrudTipoMunicipios } from '../components/CrudTipoMunicipios'
import { CrudCategorias } from '../components/CrudCategorias'
import { CrudSector } from '../components/CrudSector'
import { CrudSubSector } from '../components/CrudSubSector'
import { CrudEntidad } from '../components/CrudEntidad'
export const App = () => {
  const { state } = useContext(AppContext)
  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='satelital' element={<CrudSatelital />} />
        <Route path='department' element={<CrudDepartmets />} />
        <Route path='municipio' element={<CrudMunicipios />} />
        <Route path='tipo-municipio' element={<CrudTipoMunicipios />} />
        <Route path='categoria' element={<CrudCategorias />} />
        <Route path='sector' element={<CrudSector />} />
        <Route path='entidad' element={<CrudEntidad />} />
        <Route path='subsector' element={<CrudSubSector />} />
        <Route path='estructuracion' element={<CsvParser />} />
        <Route path='load-table' element={<LoadTable />} />
        <Route path='recovery' element={<Recovery />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />
        <Route path='payment' element={<Payment />} />
        <Route path='succes' element={<Succes />} />
        <Route path='usuarios' element={<Table />} />
        <Route path='reset' element={<ResetPassword />} />
        <Route path='newpass' element={<NewPassword />} />

      </Route>
      {/* <Route path='/search-page' element={<SearchPage />} />
        <Route path='/tacos/:name' element={<Tacos />}>
          <Route index element={<TacoIndex />} />
          <Route path='details' element={<TacoDetails />} />
        </Route> */}
      <Route path='*' element={<NotFound />} />
    </Routes>

  )
}
