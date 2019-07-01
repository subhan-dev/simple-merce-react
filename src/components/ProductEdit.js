import React, {Component} from 'react';

class ProductEdit extends Component {
    render() {
        return (
            <div classname="modal fade" role="dialog">
                <div classname="modal-dialog">

                    
                    <div classname="modal-content">
                    <div classname="modal-header">
                        <button type="button" classname="close" data-dismiss="modal">&times;</button>
                        <h4 classname="modal-title">Modal Header</h4>
                    </div>
                    <div classname="modal-body">
                        <p>Some text in the modal.</p>
                    </div>
                    <div classname="modal-footer">
                        <button type="button" classname="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ProductEdit