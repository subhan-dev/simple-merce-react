import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

class ProductItem extends Component {

    addToCart = (productCart) => {
        let count = parseInt(this.count.value)
        if(count <= 0) {
            count = 1
        }

        //console.log(this.props.user.username)
        if(this.props.user.username !== '') {
            if(!(Number.isInteger(count))) {
                alert("Masukkan Angka Jumlah Barang")
            } else {
    
                axios.get(
                    'http://localhost:2019/cart',
                    {
                        params: {
                            idProduct: productCart.id,
                            idUser: this.props.user.id
    
                        }
                    }
                ).then(res => {
                    if(res.data.length < 1) {
                        axios.post(
                            'http://localhost:2019/cart',
                            {
                                idProduct: productCart.id,
                                idUser: this.props.user.id,
                                name: productCart.name,
                                desc: productCart.desc,
                                price: productCart.price,
                                src: productCart.src,
                                jumlah: count
                            }
                        ).then(() => alert("Telah berhasil ditambahkan"))
                    } else {
                        axios.patch(
                            `http://localhost:2019/cart/${res.data[0].id}`,
                            {
                                jumlah: res.data[0].jumlah + count
                            }
                        ).then(() => alert("Barang sudah ada jumlah barang berhasil ditambahkan"))
                        // console.log(res.data[0].id)
                    }
                    
                })
            }
        }


        // console.log(this.props.user.id)

    }


    render(){
        var {id, name, price, src} = this.props.barang // {id, name, desc, price, src}
        // id = 1

        return (
            <div className="card col-3 m-5">
                <img src={src} className='card-img-top' alt="Pict"/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>Rp. {price}</p>
                    <input type='text' className='form-control' ref={(input) => this.count = input}/>
                    <Link to={'/detailproduct/' + id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    <button className='btn btn-primary btn-block' onClick={() => this.addToCart(this.props.barang)}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ProductItem)