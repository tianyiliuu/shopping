import {useAuth} from "../context/auth";
import React, {useEffect, useState} from "react";
import {Button, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const Order = () => {

    const {user} = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.token);
        fetch(`/api/ordersByUsername/${user.username}`, {method: "GET", headers: headers})
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setOrders(result);
                setIsLoaded(true);
            })
            .catch(e => {
                ;
            });
    }, []);

    if (!isLoaded) {
        return <p>Loading...</p>
    }

    const orderList = orders.map(order =>
        <tr key={order.id}>
            <td>
                <>{`${order.dateCreated.substring(0,10)} ${order.dateCreated.substring(11,19)}`}</>
                <br/>
                <strong>$ {order.totalPrice}</strong>
            </td>
            <td>
                <Button variant="outline-primary" style={{marginLeft: "10px"}} className="mr-2"
                        as={Link} to={`/orders/${order.id}`}>
                    View Details
                </Button>
            </td>
        </tr>
    );

    return (
        <Container className="mb-5">
            <Row>
                <h3 className="m-3">My Orders</h3><br/>
                <Table>
                    <tbody>
                    {orderList}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );

}

export default Order;