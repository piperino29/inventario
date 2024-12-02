import React, { useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'; // Importa tu archivo SASS aquí
import Logo from "../assets/LOGO-BLANCO.png";

function NavbarNav  (args)  {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} expand="md" >
      <NavbarBrand href="/">
      <img src={Logo} style={{ maxHeight: "70px", maxWidth: "150px" }} alt="Logo" /> </NavbarBrand>
      <NavbarToggler onClick={toggle} style={{ backgroundColor: 'white', borderColor: 'white' }} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            <NavItem>
              <NavLink href="/Inventario" style={{color:'white',fontWeight:'bolder'}}>inventario
              </NavLink>
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarNav;
