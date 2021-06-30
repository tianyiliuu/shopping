import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = props => {

    let {categoryId, searchName} = useParams();
    const adjustCartItemHandler = props.adjustCartItemHandler;

    const [products, setProducts] = useState([]);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [categoryId, searchName]);

    useEffect(() => {
        let uri = `/api/products?page=${page}&size=20`;
        if (categoryId !== undefined) uri = `/api/products/search/findByCategoryId?id=${categoryId}&page=${page}&size=20`;
        if (searchName !== undefined) uri = `/api/products/search/findByNameContaining?name=${searchName}&page=${page}&size=20`
        fetch(uri, {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                setProducts(result._embedded.products);
                setTotalPage(result.page.totalPages);
                setIsProductsLoaded(true);
            })
            .catch(error => console.log('error', error));
    }, [categoryId, searchName, page, totalPage]);

    if (!isProductsLoaded) {
        return <></>;
    }

    console.log(totalPage);

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
                    <Button className="mt-auto" onClick={() => adjustCartItemHandler(product.id, 1)}>Add to
                        Cart</Button>
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
                <Row>
                    <ButtonGroup className="ml-auto m-5" aria-label="Page Nav Buttons">
                        <Button variant="primary" disabled={page === 0}
                                onClick={() => setPage(page - 1)}>&lt;</Button>
                        <Button variant="primary" disabled={page + 1 === totalPage}
                                onClick={() => setPage(page + 1)}>&gt;</Button>
                    </ButtonGroup>
                </Row>
            </Container>
        </>
    );
}

export default Home;