import {Button, Container, Image} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";

const ProductDetails = props => {

    let {productId} = useParams();
    console.log(productId);
    const adjustCartItemHandler = props.adjustCartItemHandler;

    const [product, setProduct] = useState({});
    const [isProductLoaded, setIsProductLoaded] = useState(false);

    useEffect(() => {
        const uri = `/api/products/${productId}`;
        fetch(uri, {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                setProduct(result);
                setIsProductLoaded(true);
            })
            .catch(error => console.log('error', error));
    }, [productId]);

    if (!isProductLoaded) {
        return <></>;
    }

    return (
        <>
            <Container className="mt-5">
                <Image src={product.imageUrl}/>
                <h3>{product.name}</h3>
                <h5>$ {product.unitPrice}</h5>
                <Button onClick={() => adjustCartItemHandler(product.id, 1)}>Add to Cart</Button>
                <p>{product.description}</p>
            </Container>
        </>
    );
}

export default ProductDetails;