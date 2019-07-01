import React, {Component} from 'react'
import axios from 'axios'

class DetailProduct extends Component {

    state = {
        product: {}
    }

    componentDidMount(){

        let pro_id = this.props.match.params.product_id

        axios.get('http://localhost:2019/products/' + pro_id)
        .then(res => {
            // console.log(res.data)
            this.setState({product: res.data})
        })

        // axios.get(
        //     'http://localhost:2019/products',
        //     {
        //         params: {
        //             id: pro_id
        //         }
        //     }
        // ).then(res => {
        //     console.log(res.data)
        // })
    }


    render() {
        let {name, desc, price, src} = this.state.product
        return (
            <div className="card col-3 m-4 mx-auto">
                <img src={src} className="card-img-top mt-3" alt="pict"/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{desc}</p>
                    <p className='card-text'>Rp. {price}</p>
                    
                    <button className="btn btn-primary btn-block" onClick={() => this.addCart(this.props.data)}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default DetailProduct