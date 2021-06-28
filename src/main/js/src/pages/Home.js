import {Button, Card, Col, Container, Row} from "react-bootstrap";
import placeholder from "../images/placeholder.png";
import {Link} from "react-router-dom";

const Home = props => {

    const products = props.products;
    const addItemHandler = props.addItemHandler;

    const productList = products.map(product => (
        <Col xs={6} md={4} lg={3} xl={2} className="d-flex align-items-stretch" key={product._links.self.href}>
            <Card className="p-2 m-2 mh-90">
                <Card.Img variant="top" src={placeholder}/>
                <Card.Body className="d-flex flex-column">
                    <Link to={`products/${product.id}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Subtitle className="mb-2 text-muted">$ {product.unitPrice}</Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Button className="mt-auto" onClick={() => addItemHandler(product.id)}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </Col>
    ));


    return (
        <>
            <Container fluid>
                <Row>
                    {productList}
                </Row>
            </Container>
        </>
    );
}

export default Home;