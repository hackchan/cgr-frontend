import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Logo } from '../Logo'
import { Link } from 'react-router-dom'
import { StyledNavLink } from './styles'
import { AppContext } from '../../contex/AppProvidercContext'
export const NavBar = () => {
  const { state, logout } = useContext(AppContext)
  const { user } = state
  return (
    <Navbar collapseOnSelect variant='dark' bg='dark' expand='lg' className='rounded'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/' className='d-flex flex-row '>
          <Logo className='mr-l4' />
          Analyzer<span className='text-warning'>App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav className='mr-auto'>
            <Nav.Link as={StyledNavLink} to='/'>Features</Nav.Link>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title='Gestion Satelital'
              menuVariant='dark'
            >
              <NavDropdown.Item as={StyledNavLink} to='/satelital'>Satelital</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={StyledNavLink} to='/department'>Departamentos</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Municipios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Entidad
              </NavDropdown.Item>
            </NavDropdown>
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
