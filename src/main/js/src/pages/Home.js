import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = props => {

    let {categoryId} = useParams();
    const adjustCartItemHandler = props.adjustCartItemHandler;

    const [products, setProducts] = useState([]);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);
    useEffect(() => {
        const uri = categoryId === undefined ? "/api/products?page=0&size=2000" : `/api/productCategories/${categoryId}/products`;
        fetch(uri, {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                setProducts(result._embedded.products);
                setIsProductsLoaded(true);
            })
            .catch(error => console.log('error', error));
    }, [categoryId]);

    if (!isProductsLoaded) {
        return <></>;
    }


    const productList = products.map(product => (
        <Col xs={6} md={4} lg={3} xl={2} className="d-flex align-items-stretch" key={product._links.self.href}>
            <Card className="p-2 m-2 mh-90">
                <Card.Img variant="top" src={product.imageUrl}/>
                <Card.Body className="d-flex flex-column">
                    <Link to={`/products/${product.id}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Subtitle className="mb-2 text-muted">$ {product.unitPrice}</Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Button className="mt-auto" onClick={() => adjustCartItemHandler(product.id, 1)}>Add to Cart</Button>
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