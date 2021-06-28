import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Header from "./components/Header";
import placeholder from "./images/placeholder.png"

function App() {

    const [products, setProducts] = useState([]);

    const getProductsHander = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("api/products", requestOptions)
            .then(response => response.json())
            .then(result => setProducts(result._embedded.products))
            .catch(error => console.log('error', error));
    }

    useEffect(getProductsHander, []);

    const productRows = products.map(product => (

        <Col md={4} lg={3} xl={2} className="h-90">
            <Card key={product._links.self.href} className="p-2 m-2 h-90">
                <Card.Img variant="top" src={placeholder}/>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">$ {product.unitPrice}</Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Button className="mt-auto">Add to Cart</Button>
                </Card.Body>
            </Card>
        </Col>
    ));

    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    {productRows}
                </Row>
            </Container>
        </>
    );
}


export default App;
