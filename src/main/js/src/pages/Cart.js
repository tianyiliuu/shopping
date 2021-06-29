import {useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Image, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const Cart = props => {

    const cartItems = props.cartItems;
    const adjustCartItemHandler = props.adjustCartItemHandler;
    const removeCartItemHandler = props.removeCartItemHandler;

    const [cartProducts, setCartProducts] = useState([]);
    const [isCartProductsLoaded, setIsCartProductsLoaded] = useState(false);

    useEffect(() => {
        const urls = Object.keys(cartItems).map(productId => `/api/products/${productId}`);
        const promises = urls.map(url => fetch(url).then(y => y.json()));
        Promise.all(promises).then(results => {
            setCartProducts(results);
            setIsCartProductsLoaded(true);
        })
    }, [cartItems]);

    if (!isCartProductsLoaded) {
        return <></>;
    }

    const cartProductsRows = cartProducts.map(product => {
        const productId = String(product.id);
        const quantity = cartItems[productId];
        return (
            <tr key={product._links.self.href}>
                <td><Image src={product.imageUrl} width="100px"/></td>
                <td><strong>{product.name}</strong> <br/> {product.description} <br/> <em>$ {product.unitPrice}</em>
                </td>
                <td>
                    {quantity} <br/>
                    Sub-total: $ {(product.unitPrice * quantity).toFixed(2)} <br/>
                    <ButtonGroup aria-label="Basic example">
                        {
                            (quantity === 1) ?
                                <Button variant="outline-secondary" disabled>-</Button>
                                : <Button variant="outline-secondary"
                                          onClick={() => adjustCartItemHandler(productId, -1)}>-</Button>
                        }
                        <Button variant="outline-secondary"
                                onClick={() => adjustCartItemHandler(productId, 1)}>+</Button>
                        <Button variant="outline-secondary"
                                onClick={() => removeCartItemHandler(productId)}>Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    });

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
                    {cartProductsRows}
                    </tbody>
                </Table>
            </Row>
            <Row className="d-flex">
                <h5 className="ml-auto">Total: $ total</h5>
            </Row>
            <Row className="d-flex">
                <Link to="/order-info-form" className="ml-auto"><Button>Order Now</Button></Link>
            </Row>
        </Container>
    );
}

export default Cart;