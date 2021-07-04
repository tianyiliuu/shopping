import {useAuth} from "../context/auth";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Container, Image, Row, Table} from "react-bootstrap";

const OrderDetails = () => {

    let {orderId} = useParams();
    const {user} = useAuth();
    const [order, setOrder] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.token);
        fetch(`/api/orders/${orderId}`, {method: "GET", headers: headers})
            .then(response => response.json())
            .then(result => {
                setOrder(result);
                setIsLoaded(true);
            })
            .catch(e => {
                ;
            });
    }, []);

    if (!isLoaded) {
        return <p>loading...</p>;
    }

    const productList = order.orderItems.map((product, index) =>
        <tr key={index}>
            <td><Image src={product.imageUrl} width="100px"/></td>
            <td><strong>{product.name}</strong> <br/> {product.description} <br/> <em>$ {product.unitPrice}</em>
            </td>
            <td>{product.quantity}</td>
        </tr>
    );

    return (
        <Container className="mb-5">
            <Row>
                <h3 className="m-3">Order</h3><br/>
                <Table>
                    <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Details</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productList}
                    </tbody>
                </Table>
            </Row>
            <Row className="d-flex">
                <h5 className="ml-auto">Total: ${order.totalPrice.toFixed(2)}</h5>
            </Row>
        </Container>
    );
}

export default OrderDetails;