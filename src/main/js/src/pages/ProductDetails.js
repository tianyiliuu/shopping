import {Button, Container, Image} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import placeholder from "../images/placeholder.png";

const ProductDetails = props => {

    let {id} = useParams();
    const [product, setProduct] = useState(null);

    const addItemHandler = props.addItemHandler;

    const loadProductHandler = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`/api/products/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => setProduct(result))
            .catch(error => console.log('error', error));
    }

    useEffect(loadProductHandler, [id]);

    let productDetails = <></>
    if (product !== null) {
        productDetails = (
            <Container className="mt-5">
                <Image src={placeholder}/>
                <h3>{product.name}</h3>
                <h5>$ {product.unitPrice}</h5>
                <Button onClick={() => addItemHandler(product.id)}>Add to Cart</Button>
                <p>{product.description}</p>
            </Container>
        );
    }

    return (
        <>
            {productDetails}
        </>
    );
}

export default ProductDetails;