import {Container, Image, Row, Table} from "react-bootstrap";
import placeholder from "../images/placeholder.png";


const Cart = props => {

    const items = props.items;
    const setItemHandler = props.setItemHandler
    const products = props.products;

    if (products.length === 0) return <></>;

    const findProductById = (targetId) => {
        return products.filter(product => product.id === Number(targetId))[0];
    };

    const productRows = [];
    for (let id in items) {
        let quantity = items[id];
        let product = findProductById(id);
        productRows.push(
            <tr key={product._links.self.href}>
                <td><Image src={placeholder} height="100px" width="100px"/></td>
                <td>{product.name} <br/> {product.description} <br/> {product.unitPrice}</td>
                <td>{quantity} <br/> Sub-total: $ {product.unitPrice * quantity}</td>
            </tr>
        )
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
        </Container>
    );

}

export default Cart;