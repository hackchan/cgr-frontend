import React, { useContext, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Logo } from '../Logo'
import { Link } from 'react-router-dom'
import { StyledNavLink, LogoName, LogoApp, HamburgerIcon } from './styles'
import { AppContext } from '../../contex/AppProvidercContext'

export const NavBar = () => {
  const { state, logout, chgDarkMode } = useContext(AppContext)
  const { user, darkMode } = state
  const [dark, setDark] = useState(darkMode)
  // const [userStorage] = useLocalStorage('user', false)
  const [menuAdmin, setMenuAdmin] = useState(false)

  useEffect(() => {
    const listaRolesUser = user?.roles.map((rol) => {
      return rol.name
    })
    setMenuAdmin(['ADMIN', 'JEDI'].some((value) => listaRolesUser?.includes(value)))
  })
  console.log('menu admin:', menuAdmin)
  const handleChange = () => {
    setDark(!dark)
    chgDarkMode(!dark)
  }
  return (
    // className='rounded'
    <Navbar collapseOnSelect variant={state.darkMode ? 'dark' : 'light'} bg={state.darkMode ? 'dark' : 'light'} expand='lg'>
      <Container fluid>
        <div className='d-flex justify-content-start align-items-center'>
          <Navbar.Brand as={Link} to='/' className='d-flex flex-row '>
            <Logo className='mr-l4' />
            <LogoName darkMode={state.darkMode}>Analyzer</LogoName><LogoApp>App</LogoApp>

          </Navbar.Brand>
          <Form.Switch
            checked={state.darkMode}
            className='d-flex justify-content-start bg-red'
            type='switch'
            id='custom-switch'
            label=''
            onChange={() => handleChange()}
          />
        </div>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'>
          <span><HamburgerIcon /></span>

        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav className='mr-auto'>

            <Nav.Link as={StyledNavLink} to='/'>Features</Nav.Link>
            {menuAdmin && (
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='Gestion Usuarios'
                menuVariant={state.darkMode ? 'dark' : 'light'}
              >
                <NavDropdown.Item as={StyledNavLink} to='/Usuarios'>Usuarios</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/tipo-user'>Tipo Usuario</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/roles'>Roles</NavDropdown.Item>

              </NavDropdown>
            )}

            <NavDropdown
              id='nav-dropdown-dark-example'
              title='Gestion Matriz Obras'
              menuVariant={state.darkMode ? 'dark' : 'light'}
            >
              {menuAdmin && (
                <NavDropdown.Item as={StyledNavLink} to='/sector-obra'>Sector Obra</NavDropdown.Item>
              )}

              {menuAdmin && (
                <NavDropdown.Item as={StyledNavLink} to='/origen-recurso'>Origen Recursos</NavDropdown.Item>
              )}

              {menuAdmin && (
                <NavDropdown.Item as={StyledNavLink} to='/estado-obra'>Estado Obra</NavDropdown.Item>
              )}

              <NavDropdown.Item as={StyledNavLink} to='/matriz-obra'>Matriz Obra</NavDropdown.Item>
              <NavDropdown.Item as={StyledNavLink} to='/matriz-obra-soporte'>Soportes Obras</NavDropdown.Item>

            </NavDropdown>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title='Gestion Matriz IES'
              menuVariant={state.darkMode ? 'dark' : 'light'}
            >
              {/* <NavDropdown.Item as={StyledNavLink} to='/sector-obra'>Sector Obra</NavDropdown.Item>
              <NavDropdown.Item as={StyledNavLink} to='/origen-recurso'>Origen Recursos</NavDropdown.Item>
              <NavDropdown.Item as={StyledNavLink} to='/estado-obra'>Estado Obra</NavDropdown.Item> */}
              <NavDropdown.Item as={StyledNavLink} to='/matriz-ies'>Matriz IES</NavDropdown.Item>
              {/* <NavDropdown.Item as={StyledNavLink} to='/matriz-obra-soporte'>Soportes Obras</NavDropdown.Item> */}

            </NavDropdown>
            {menuAdmin && (
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='Gestion Satelital'
                menuVariant={state.darkMode ? 'dark' : 'light'}
              >
                <NavDropdown.Item as={StyledNavLink} to='/satelital'>Satelital</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={StyledNavLink} to='/department'>Departamento</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/municipio'>Municipios</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/tipo-municipio'>Tipo Municipio</NavDropdown.Item>

              </NavDropdown>
            )}

            {menuAdmin && (
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='Gestion Entidades'
                menuVariant={state.darkMode ? 'dark' : 'light'}
              >
                <NavDropdown.Item as={StyledNavLink} to='/categoria'>Categoria</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={StyledNavLink} to='/sector'>Sector</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/subsector'>Subsector</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={StyledNavLink} to='/entidad'>Entidad</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/emails'>Emails</NavDropdown.Item>
                <NavDropdown.Item as={StyledNavLink} to='/emails'>Telefonos</NavDropdown.Item>

              </NavDropdown>
            )}

          </Nav>
          <Nav>
            {!user
              ? <Nav.Link as={StyledNavLink} to='/login'>Iniciar sesión</Nav.Link>
              : <Nav.Link as={StyledNavLink} eventKey={2} to='/logout' onClick={logout}>Cerrar sesión</Nav.Link>}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
