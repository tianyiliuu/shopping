import {Button, ButtonGroup, Container, Image, Row, Table} from "react-bootstrap";
import placeholder from "../assets/images/products/placeholder.png";
import React from "react";
import {Link} from "react-router-dom";


const Cart = props => {

    const items = props.items;
    const products = props.products;
    const addItemHandler = props.addItemHandler;
    const removeItemHandler = props.removeItemHandler;
    const removeAllItemsHandler = props.removeAllItemsHandler;


    if (products.length === 0) return <></>;

    const findProductById = (targetId) => {
        return products.filter(product => product.id === Number(targetId))[0];
    };

    let total = 0;
    const productRows = [];
    for (let id in items) {
        let quantity = items[id];
        let product = findProductById(id);
        total += product.unitPrice * quantity;
        productRows.push(
            <tr key={product._links.self.href}>
                <td><Image src={placeholder} height="100px" width="100px"/></td>
                <td>{product.name} <br/> {product.description} <br/> {product.unitPrice}</td>
                <td>
                    {quantity} <br/>
                    Sub-total: $ {(product.unitPrice * quantity).toFixed(2)} <br/>
                    <ButtonGroup aria-label="Basic example">
                        {
                            (quantity === 1) ?
                                <Button variant="outline-secondary" disabled>-</Button>
                                : <Button variant="outline-secondary" onClick={() => removeItemHandler(id)}>-</Button>
                        }
                        <Button variant="outline-secondary" onClick={() => addItemHandler(id)}>+</Button>
                        <Button variant="outline-secondary" onClick={() => removeAllItemsHandler(id)}>Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }


    return (
        <Container>
            <Row>
                <h3 className="m-3">Cart</h3><br/>
                <Table>
                    <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Details</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productRows}
                    </tbody>
                </Table>
            </Row>
            <Row className="d-flex">
                <h5 className="ml-auto">Total: $ {total}</h5>
            </Row>
            <Row className="d-flex">
                <Link to="/order-info-form" className="ml-auto"><Button>Order Now</Button></Link>
            </Row>
        </Container>
    );

}

export default Cart;