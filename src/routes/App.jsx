import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { Home } from '../containers'
import { Layout } from '../components/Layout'
import { Checkout } from '../containers/Checkout'
import { Login } from '../containers/Login'
import { Logout } from '../containers/Logout'
import { Recovery } from '../components/Recovery'
import { VerifyEmail } from '../components/VerifyEmail'
import { Payment } from '../containers/Payment'
import { Succes } from '../containers/Succes'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ResetPassword } from '../components/ResetPassword'
import { NewPassword } from '../components/NewPassword'
import { NewUserEntidad } from '../components/NewUserEntidad'
import { NotFound } from '../components/NotFound'
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
import { CrudEstadoObra } from '../components/CrudEstadoObra'
import { CrudSectorObra } from '../components/CrudSectorObra'
import { CrudOrigenRecurso } from '../components/CrudOrigenRecurso'
import { MatrizObra } from '../components/CrudMatrizObra'
import { MatrizProyecto } from '../components/CrudMatrizProyecto'
import { CrudSectorProyecto } from '../components/CrudSectorProyecto'
import { CrudMatrizObraSoporte } from '../components/CrudMatrizObraSoportes'
import { GestionUsurios } from '../components/CrudGestionUsuarios'
import { TypeUser } from '../components/CrudTypeUser'
import { Roles } from '../components/CrudRoles'
import { ActiveUser } from '../components/ActiveUser'

import { MatrizIES } from '../components/CrudMatrizIES'

import { CrudEmails } from '../components/CrudEmail'
import { useLocalStorage } from '../hooks/useLocalStorage'
export const App = () => {
  const [user] = useLocalStorage('user', false)

  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />

        <Route path='checkout' element={<Checkout />} />

        <Route path='emails' element={<ProtectedRoute><CrudEmails /></ProtectedRoute>} />

        <Route path='satelital' element={<ProtectedRoute><CrudSatelital /></ProtectedRoute>} />

        <Route path='department' element={<ProtectedRoute><CrudDepartmets /></ProtectedRoute>} />

        <Route path='municipio' element={<ProtectedRoute><CrudMunicipios /></ProtectedRoute>} />

        <Route path='tipo-municipio' element={<ProtectedRoute><CrudTipoMunicipios /></ProtectedRoute>} />

        <Route path='categoria' element={<ProtectedRoute><CrudCategorias /></ProtectedRoute>} />

        <Route path='sector' element={<ProtectedRoute><CrudSector /></ProtectedRoute>} />

        <Route path='entidad' element={<ProtectedRoute><CrudEntidad /></ProtectedRoute>} />

        <Route path='subsector' element={<ProtectedRoute><CrudSubSector /></ProtectedRoute>} />

        <Route path='estado-obra' element={<ProtectedRoute><CrudEstadoObra /></ProtectedRoute>} />

        <Route path='sector-obra' element={<ProtectedRoute><CrudSectorObra /></ProtectedRoute>} />

        <Route path='origen-recurso' element={<ProtectedRoute><CrudOrigenRecurso /></ProtectedRoute>} />
        <Route path='matriz-proyecto' element={<MatrizProyecto />} />
        <Route path='sector-proyecto' element={<ProtectedRoute><CrudSectorProyecto /></ProtectedRoute>} />
        <Route path='matriz-obra' element={<ProtectedRoute><MatrizObra /></ProtectedRoute>} />

        <Route path='matriz-obra-soporte' element={<CrudMatrizObraSoporte />} />

        <Route path='matriz-ies' element={<ProtectedRoute><MatrizIES user={user} /></ProtectedRoute>} />
        <Route path='estructuracion' element={<CsvParser />} />
        <Route path='load-table' element={<LoadTable />} />
        <Route path='recovery' element={<Recovery />} />
        <Route path='verify-email' element={<VerifyEmail />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />
        <Route path='payment' element={<Payment />} />
        <Route path='succes' element={<Succes />} />
        <Route path='usuarios' element={<ProtectedRoute><GestionUsurios /></ProtectedRoute>} />
        <Route path='tipo-user' element={<ProtectedRoute><TypeUser /></ProtectedRoute>} />
        <Route path='roles' element={<ProtectedRoute><Roles /></ProtectedRoute>} />
        <Route path='reset' element={<ResetPassword />} />
        <Route path='newpass' element={<NewPassword />} />
        <Route path='active' element={<ActiveUser />} />
        <Route path='newuser-entidad' element={<NewUserEntidad />} />

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
