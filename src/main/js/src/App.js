import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import placeholder from './images/placeholder.png';

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
        <tr key={product._links.self.href}>
            <td align="center"><Image src={placeholder} height="100px" width="100px"  /></td>
            <td>{product.name}</td>
            <td>$ {product.unitPrice}</td>
            <td>{product.unitsInStock}</td>
        </tr>
    ));

    return (
        <Container>
            <h2>Products</h2>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Units in Stock</th>
                </tr>
                </thead>
                <tbody>
                {productRows}
                </tbody>
            </Table>
        </Container>
    );
}

export default App;
