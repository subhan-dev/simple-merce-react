import React, {Component} from 'react'

class Checkout extends Component {

    renderCheckout = () => {
        return this.props.cartList.map( item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.jumlah}</td>
                    <td>Rp. {item.price.toLocaleString('IN')}</td>
                    <td>Rp. {(item.price * item.jumlah).toLocaleString('IN')}</td>
                </tr>
            )
        })
    }

    getTotal = () => {
        let total = 0, arrCart = this.props.cartList
        for(let i = 0; i < arrCart.length; i++) {
            total += arrCart[i].jumlah * arrCart[i].price
        }
        return total.toLocaleString('IN')
    }

    render() {
        return (
            <div>
                <h1>TOTAL</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">QTY</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCheckout()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="4">TOTAL</th>
                            <td>Rp. {this.getTotal()}</td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}

export default Checkout