import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import Checkout from './Checkout'

class Cart extends Component {

    state = {
        cart: [],
        checkout: false
    }

    getCart = () => {
        axios.get(
            'http://localhost:2019/cart',
            {
                params: {
                    idUser: this.props.user.id
                }
            }
        ).then(res => {
            this.setState({cart: res.data})
        })
    }
    componentDidMount() {
        this.getCart()
    }

    handleDelete = (id) => {
        axios.delete(
            `http://localhost:2019/cart/${id}`
        ).then(() => {
            this.getCart()
        })
    }

    renderCart = () => {
        return this.state.cart.map( item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.jumlah}</td>
                    <td>Rp. {item.price.toLocaleString('IN')}</td>
                    <td>
                        <img className="list" src={item.src} alt="Pict"/>
                    </td>
                    <td>
                        <button className = 'btn btn-warning' onClick={() => this.handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            )
        })          
    }

    handleCheckout = () => {
        this.setState({checkout: true})
    }

    render() {
        if(this.props.user.username !== '') {
            if(this.state.checkout) {
                return (
                    <div className="container">
                        <h1 className="display-4 text-center">List Product Cart</h1>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
    
                        </table>
                        <button className = 'btn btn-primary mx-auto' onClick={() => {this.handleCheckout()}}>CheckOut</button>
                        <Checkout cartList = {this.state.cart}/>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <h1 className="display-4 text-center">List Product Cart</h1>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
    
                        </table>
                        <button className = 'btn btn-primary' onClick={() => {this.handleCheckout()}}>CheckOut</button>
                    </div>
                )
            }
        }
        return <Redirect to="/login"></Redirect>
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Cart)