import React from 'react'
import '../styles/app.css'
import { Route, Routes, Link, useParams, Outlet } from 'react-router-dom'
import { NavLink } from '../components/NavLink'
import { Home, NotFound } from '../containers'
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
    <div className='app'>
      <header>
        <nav>
          <ul>
            <li><NavLink to='/search-page'>Search page</NavLink></li>
            <li><NavLink to='/'>home</NavLink></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search-page' element={<SearchPage />} />
        <Route path='/tacos/:name' element={<Tacos />}>
          <Route index element={<TacoIndex />} />
          <Route path='details' element={<TacoDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>

  )
}
