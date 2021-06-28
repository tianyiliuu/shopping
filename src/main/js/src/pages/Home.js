import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import placeholder from "../images/placeholder.png";
import Header from "../components/Header";

const Home = () => {

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


    const productList = products.map(product => (
        <Col xs={6} md={4} lg={3} xl={2} className="d-flex align-items-stretch">
            <Card key={product._links.self.href} className="p-2 m-2 mh-90">
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
                    {productList}
                </Row>
            </Container>
        </>
    );
}

export default Home;