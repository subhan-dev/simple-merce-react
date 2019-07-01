import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Cart extends Component {

    // state = {
    //     cart: []
    // }
    renderListCart = () => {
        return this.props.cart.cart.map(item => {
            return (
                <div className="card col-3 m-3 ">
                    <img src={item.src} className="card-img-top mt-3" alt="pict"/>
                    <div className='card-body'>
                        <h5 className='card-title'>{item.name}</h5>
                        <p className='card-text'>Rp. {item.price}</p>
                        <p className='card-text'>Jumlah {item.order}</p>
                        <p className='card-text'>Total {item.order * item.price}</p>
                        <button className="btn btn-primary btn-block">Checkout</button>
                    </div>
                </div>
            )
        })
    }

    // renderListCart = () => {
        
    // }
    // componentDidMount() {
    //     this.getData()
    // }

    // getData = () => {
    //     axios.get('http://localhost:2019/cart', {
    //         params: {
    //             idUser: this.props.user.id
    //         }
    //     }).then(res => {
    //         console.log(res)
    //         this.setState({cart: res.data})
    //     })
    // }

    render() {
        // console.log(this.props.cart.cart)
        return (
            <div className="row col-10">
                {this.renderListCart()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.carts,
        user: state.auth
    }
}

export default connect(mapStateToProps)(Cart)