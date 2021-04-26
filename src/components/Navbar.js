import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import final from './final.png';
import {useHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FacebookIcon from '@material-ui/icons/Facebook';
//import './Navbar.css'
import Dropdown from './Dropdown'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from 'react-bootstrap/Button';
import fire from '../fire'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const Styles = styled.div`
  .navbar { background-color: #004C8C; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #ffffff;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  
`;



function NavBar() {
  let history=useHistory();
const handleLogout = () => {
  history.push("/")
  fire.auth().signOut().then(() => {
        
  }).catch((error) => {
// An error happened.
  });
  
}

 return (
  <>
  <Styles>
    <Navbar expand="lg">
      <img src={final} alt="" height = "43" width ="65"/>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      {/* <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <Nav.Item className='nav-itempro' marginRight='20px' ><Link to={"/View Admin"}>< AccountBoxIcon fontSize="large"  /></Link></Nav.Item>
          <Nav.Item  class="logout"> 
          <Button styles={{ textDecorationColor:' #ffffff'}} onClick={handleLogout} className="adjustSubmit"> Sign Out</Button>
          </Nav.Item> 
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
  </>
);
}
export default NavBar