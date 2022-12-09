import React, { useContext, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Logo } from '../Logo'
import { Link } from 'react-router-dom'
import { StyledNavLink, LogoName, LogoApp, HamburgerIcon, Perfil, PerfilName } from './styles'
import { AppContext } from '../../contex/AppProvidercContext'
import { isAdmin } from '../../utils/user'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Avatars } from '../Avatars'
export const NavBar = () => {
  const [userLocal] = useLocalStorage('user', false)
  console.log('userLocal:', userLocal)
  const { state, logout, chgDarkMode } = useContext(AppContext)
  const { user, darkMode } = state
  const [dark, setDark] = useState(darkMode)
  // const [userStorage] = useLocalStorage('user', false)
  const [menuAdmin, setMenuAdmin] = useState(false)
  console.log('user:', user)
  useEffect(() => {
    setMenuAdmin(isAdmin(user))
  })

  const handleChange = () => {
    setDark(!dark)
    chgDarkMode(!dark)
  }
  return (
    // className='rounded'
    <Navbar collapseOnSelect variant={state.darkMode ? 'dark' : 'light'} bg={state.darkMode ? 'dark' : 'light'} expand='lg'>
      <Container fluid>
        <div className='d-flex justify-content-center align-items-center'>
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

        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-start'>
          <Nav className='justify-content-center'>

            <Nav.Link as={StyledNavLink} to='/'>Novedades</Nav.Link>
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
              title='Matrices'
              menuVariant={state.darkMode ? 'dark' : 'light'}
            >
              <NavDropdown
                drop='end'
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
                drop='end'
                id='nav-dropdown-dark-example'
                title='Gestion Matriz IES'
                menuVariant={state.darkMode ? 'dark' : 'light'}
              >
                <NavDropdown.Item as={StyledNavLink} to='/matriz-ies'>Matriz IES</NavDropdown.Item>

              </NavDropdown>

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
                <NavDropdown.Item as={StyledNavLink} to='/telefonos'>Telefonos</NavDropdown.Item>

              </NavDropdown>
            )}

          </Nav>

          {/* <Nav className='justify-content-end'>
            <img src='' alt='logo' />
            {!user
              ? <Nav.Link as={StyledNavLink} to='/login'>Iniciar sesión</Nav.Link>
              : (
                <NavDropdown
                  drop='down'
                  id='nav-dropdown-dark-example'
                  title={user.username}
                  menuVariant={state.darkMode ? 'dark' : 'light'}
                >

                  <Nav.Link as={StyledNavLink} eventKey={2} to='/logout' onClick={logout}>Cerrar sesión</Nav.Link>
                  <NavDropdown.Divider />

                </NavDropdown>)}
          </Nav> */}

          {/* <Nav>
            {!user
              ? <Nav.Link as={StyledNavLink} to='/login'>Iniciar sesión</Nav.Link>
              : (
                <NavDropdown
                  id='nav-dropdown-dark-example'
                  title={user.username}
                  menuVariant={state.darkMode ? 'dark' : 'light'}
                >
                  <NavDropdown.Item as={StyledNavLink} to='/logout'>Cerrar sesión</NavDropdown.Item>
                  <NavDropdown.Divider />

                </NavDropdown>)}
          </Nav> */}

        </Navbar.Collapse>
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav className='justify-content-center'>

            {!user
              ? <Nav.Link as={StyledNavLink} to='/login' className='inisesion'>👥 Iniciar sesión</Nav.Link>
              : (
                <>
                  <NavDropdown
                    drop='start'
                    id='nav-dropdown-dark-example'
                    title={user.username}
                    menuVariant={state.darkMode ? 'dark' : 'light'}
                  >
                    <NavDropdown.Divider />
                    <Perfil>
                      <PerfilName>¡Hola, {user.username}!</PerfilName>
                      {user.tipo.name === 'ENTIDAD' &&
                        <div>
                          <p>{user.tipo.name}</p>
                          <p>{user.entidades[0].name}</p>
                        </div>}

                    </Perfil>

                    <NavDropdown.Divider />

                    <Nav.Link as={StyledNavLink} className='closeSesion' eventKey={2} to='/logout' onClick={logout}>Cerrar sesión</Nav.Link>

                  </NavDropdown>
                  <Avatars style={{ width: '32px', height: '32px', marginRight: '5px' }} />
                </>
                )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
