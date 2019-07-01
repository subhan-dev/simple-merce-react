import React, { Component } from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {getCart, addCartCount} from '../actions/index'
import {Link} from 'react-router-dom'
import axios from 'axios';

class ProductItem extends Component {

    // state = {
    //     cart: []
    // }

    addCart = (cart) => {
        const jumlahOrder = parseInt(this.order.value)
        const newCart = {
            ...cart,
            order: jumlahOrder
        }

        let addCount = true, index
        let arr = this.props.cart.cart
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].id === cart.id) {
                addCount = false
                index = i
                break;
            }
        }

        if(addCount) {
            this.props.getCart(newCart)
        } else {
            let objOrder = {
                jumlahOrder,
                index
            }
            this.props.addCartCount(objOrder)
        }
        
    }

    // addCart = (data) => {

    //     const order = parseInt(this.order.value)

    //     axios.post('http://localhost:2019/cart',{
    //         idUser: this.props.user.id,
    //         idProduct: data.id,
    //         count: order,
    //     }).then(res => {
    //         console.log(res.data)
    //         // this.setState({cart: res.data})
    //     })
    // }

    render(){
        //console.log(this.props.cart.cart)
        let {id, name, desc, price, src} = this.props.data
        return (
            <div className="card col-3 m-4 ">
                <img src={src} className="card-img-top mt-3" alt="pict"/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>Rp. {price}</p>
                    <input type='text' className="form-control mb-2" ref={(input) => this.order = input}/>
                    <Link to={`/detailproduct/${id}`}>
                        <button className="btn btn-outline-primary btn-block">Details</button>
                    </Link>
                    
                    <button className="btn btn-primary btn-block" onClick={() => this.addCart(this.props.data)}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth, // {id, username}
        cart: state.carts
    }
}

export default connect(mapStateToProps, {getCart, addCartCount})(ProductItem)