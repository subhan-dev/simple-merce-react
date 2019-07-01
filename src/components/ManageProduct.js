import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label } from 'reactstrap';

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          products: [],
          editProduct: {}
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));

        // console.log("tes")
    }
    // state = {
    //     products: []
    // }

    componentDidMount(){
        // Akses database
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }

    handleEdit = (data) => {
        this.toggle()

        // const nameproduct = this.editDesc.value
        // console.log(nameproduct)
        
        this.setState({
            editProduct: data
        })
    }

    addProduct = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = parseInt(this.price.value)
        const pict = this.pict.value

        axios.post(
            'http://localhost:2019/products',
            {
                desc,
                name,
                price,
                src : pict
            }
        ).then(res => {
            // GET DATA
            this.getProduct()
        })
    }

    handleDelete = (id) => {
        axios.delete(`http://localhost:2019/products/${id}`).then(res => {this.getProduct()})
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>
                        <img className='list' src={item.src} alt="Pict"/>
                    </td>
                    <td>
                        <Button color="danger" onClick={() => this.handleEdit(item)}>Edit</Button>
                        <button className = 'btn btn-warning' onClick={() => this.handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }


    handleSimpan = () => {
        
        const edtName = this.editName.value
        const edtDesc = this.editDesc.value
        const edtPrice = this.editPrice.value
        const edtSrc = this.editSrc.value
        
        // console.log(editDesc)
        // console.log(edtName)
        axios.put(
            `http://localhost:2019/products/${this.state.editProduct.id}`,
            {
                name: edtName,
                desc: edtDesc,
                price: edtPrice,
                src: edtSrc
            }
        ).then(res => {
            this.getProduct()
        })
        this.toggle()
    }


    render () {
        if(this.props.user.username.length > 0) {
            console.log(this.props.user.username)
            return (
                <div className="container">
                    <h1 className="display-4 text-center">List Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label sm={2}>Name</Label>
                                            <Col sm={10}>
                                                <input className='form-control' type='text'
                                                    ref={(input) => {this.editName = input}} defaultValue={this.state.editProduct.name}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={2}>Desc</Label>
                                            <Col sm={10}>
                                                <input className='form-control' type='text'
                                                    ref={(input) => {this.editDesc = input}} defaultValue={this.state.editProduct.desc}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={2}>Price</Label>
                                            <Col sm={10}>
                                                <input className='form-control' type='text'
                                                    ref={(input) => {this.editPrice = input}} defaultValue={this.state.editProduct.price}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={2}>Picture</Label>
                                            <Col sm={10}>
                                                <input className='form-control' type='text'
                                                    ref={(input) => {this.editSrc = input}} defaultValue={this.state.editProduct.src}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.handleSimpan}>Simpan</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Batal</Button>
                                </ModalFooter>
                            </Modal>
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        return <Redirect to="/login" />
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ManageProduct)