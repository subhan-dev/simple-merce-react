import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { onLogoutUser, getAllProducts } from '../actions'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, UncontrolledDropdown,DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    onButtonClick = () => {
        // menghapus username dari redux state
        this.props.onLogoutUser()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.props.getAllProducts(res.data)
            })
    }

    render () {
        if(this.props.user.username === ''){
            // Render ketika belum login
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/' onClick={() => this.getProduct()}>All Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 

        // Render setelah login
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2'>
                        <Link to='/' onClick={() => this.getProduct()}>All Products</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hallo, {this.props.user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link to="/manageproduct">Manage Products</Link>
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <Button className='dropdown-item' onClick={this.onButtonClick}>
                            Logout
                        </Button>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem className='mt-2'>
                        <Link to='/cart' >Cart</Link>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
            
                    
          );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {onLogoutUser, getAllProducts})(Header)