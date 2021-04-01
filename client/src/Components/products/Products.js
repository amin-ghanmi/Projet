import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, modifiedProduct } from '../../js/actions/productAction';
import AddProduct from '../productActions/AddProduct';




const Products = () => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const products = useSelector(state => state.productReducer.products)

    return (

        <div>
            <Button variant="outline-info" onClick={handleShow} >Add Product</Button>

            <div className=" row">
                {products.map(product => <Card className="col-md-2 mt-3 mx- auto" key={product._id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.Image} />
                    <Card.Body>
                        <Card.Title> {product.Article} </Card.Title>
                        <Card.Text>
                            {product.Description}
                        </Card.Text>

                        <Card.Text>
                            {product.Price}
                        </Card.Text>
                        <div>
                            <Button variant="primary" onClick={()=> dispatch(modifiedProduct(product._id))}>Update</Button>
                            <Button variant="primary" onClick={() => dispatch(deleteProduct(product._id))} >Delete</Button>
                        </div>
                    </Card.Body>
                </Card>)}
                <AddProduct show={show} handleClose={handleClose} />

            </div>
        </div>
    )
}

export default Products
