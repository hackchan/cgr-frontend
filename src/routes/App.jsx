import React from 'react'
import '../styles/app.css'
import { Route, Routes, Link, useParams, Outlet } from 'react-router-dom'
import { NavLink } from '../components/NavLink'
import { Home, NotFound } from '../containers'
import { Layout } from '../components/Layout'
import { Checkout } from '../containers/Checkout'
import { Information } from '../containers/Information'
import { Login } from '../containers/Login'
import { Payment } from '../containers/Payment'
import { Succes } from '../containers/Succes'
import { AppProvider } from '../contex/AppContex'
// import { Home } from '../containers/Home'
// import { NotFound } from '../containers/NotFound'
// const Home = () => <h1>Home</h1>
const SearchPage = () => {
  const tacos = ['cochinita', 'chili', 'carnita']
  return (
    <div>
      <ul>
        {tacos.map(taco => (
          <li key={taco}><Link to={`/tacos/${taco}`}>{taco}</Link></li>
        ))}
      </ul>
    </div>
  )
}
const Tacos = () => {
  const { name } = useParams()
  return (
    <div>
      <h1>{name}</h1>
      <Link to='details'>ir a los detalles</Link>
      <Outlet />

    </div>
  )
}

const TacoIndex = () => {
  return (
    <h1>Index Routes tacos</h1>
  )
}
const TacoDetails = () => {
  const { name } = useParams()
  return (
    <h1>taco detail {name} </h1>
  )
}
export const App = () => {
  return (

    <AppProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='information' element={<Information />} />
          <Route path='login' element={<Login />} />
          <Route path='payment' element={<Payment />} />
          <Route path='succes' element={<Succes />} />
        </Route>
        <Route path='/search-page' element={<SearchPage />} />
        <Route path='/tacos/:name' element={<Tacos />}>
          <Route index element={<TacoIndex />} />
          <Route path='details' element={<TacoDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppProvider>

  )
}
