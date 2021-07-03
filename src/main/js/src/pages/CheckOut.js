import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useCart} from "../context/cart";

const CheckOut = () => {

    const {cartItems, cartTotalAmount} = useCart();

    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => {
        console.log(Object.keys(d));
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const purchase = purchaseBuilder(d);
        fetch("/api/checkout/purchase", {method: "POST", headers: headers, body: JSON.stringify(purchase)})
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const Customer = (
        <>
            <h3>Customer</h3>
            <Row>
                <Form.Group as={Col} controlId="formGridFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control {...register("firstName")} placeholder="Firstname"/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control {...register("lastName")} placeholder="Lastname"/>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email")} type="email" placeholder="Enter email"/>
            </Form.Group>
        </>
    );

    const ShippingAddress = (
        <>
            <h3 className="mt-5">Shipping Address</h3>
            <Form.Group className="mb-3" controlId="formGridShippingAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control {...register("shippingAddress")} placeholder="1234 Main St"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridShippingAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control {...register("shippingAddress_2")} placeholder="Apartment, studio, or floor"/>
            </Form.Group>
            <Row>
                <Form.Group as={Col} controlId="formGridShippingCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control {...register("shippingCity")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridShippingState">
                    <Form.Label>Province</Form.Label>
                    <Form.Control {...register("shippingProvince")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridShippingPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control {...register("shippingPostalCode")}/>
                </Form.Group>
            </Row>
        </>
    )

    const BillingAddress = (
        <>
            <h3 className="mt-5">Billing Address</h3>
            <Form.Group className="mb-3" controlId="formGridBillingAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control {...register("billingAddress")} placeholder="1234 Main St"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridBillingAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control {...register("billingAddress_2")} placeholder="Apartment, studio, or floor"/>
            </Form.Group>
            <Row>
                <Form.Group as={Col} controlId="formGridBillingCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control {...register("billingCity")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBillingState">
                    <Form.Label>Province</Form.Label>
                    <Form.Control {...register("billingProvince")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBillingPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control {...register("billingPostalCode")}/>
                </Form.Group>
            </Row>
        </>
    )

    const CreditCardInformation = (
        <>
            <h3 className="mt-5">Credit Card</h3>

            <Row>
                <Form.Group as={Col} lg={8} controlId="formGridCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control {...register("cardNumber")} placeholder="3000 0000 0000 6789"/>
                </Form.Group>
                <Form.Group as={Col} lg={4} controlId="formGridCVV">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control {...register("cvv")} placeholder="789"/>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} lg={6} controlId="formGridCardHolderName">
                    <Form.Label>Card Holder Name</Form.Label>
                    <Form.Control {...register("cardHolderName")} placeholder="JUAN LOPEZ"/>
                </Form.Group>
                <Form.Group as={Col} lg={3} controlId="formExpirationMonth">
                    <Form.Label>Exp. Month</Form.Label>
                    <Form.Control {...register("expirationMonth")} placeholder="06"/>
                </Form.Group>
                <Form.Group as={Col} lg={3} controlId="formExpirationYear">
                    <Form.Label>Exp. Year</Form.Label>
                    <Form.Control {...register("expirationYear")} placeholder="21"/>
                </Form.Group>
            </Row>
        </>
    )

    const numberProducts = Object.keys(cartItems).reduce((acc, cur) => {
        return acc + cartItems[cur];
    }, 0);

    const ReviewOrder = (
        <>
            <h3 className="mt-5 mb-3">Review Your Order</h3>
            <p><strong>Total Quantity:</strong> {numberProducts}</p>
            <p><strong>Total Price: </strong> $ {cartTotalAmount.toFixed(2)}</p>
        </>
    );

    const purchaseBuilder = (d) => {
        const purchase = {};
        purchase["customer"] = {
            "firstName": d.firstName,
            "lastName": d.lastName,
            "email": d.email
        };
        purchase["shippingAddress"] = {
            "address": d.shippingAddress,
            "address2": d.shippingAddress_2,
            "city": d.shippingCity,
            "province": d.shippingProvince,
            "postalCode": d.shippingPostalCode
        };
        purchase["billingAddress"] = {
            "address": d.billingAddress,
            "address2": d.billingAddress_2,
            "city": d.billingCity,
            "province": d.billingProvince,
            "postalCode": d.billingPostalCode
        };
        purchase["order"] = {
            "totalQuantity": numberProducts,
            "totalPrice": cartTotalAmount
        };
        purchase["orderItems"] = Object.keys(cartItems).map(productId => ({
            "productId": productId,
            "quantity": cartItems[productId]
        }));

        return purchase;
    }


    return (
        <Container fluid className="mt-5 mb-5">
            <Row>
                <Col lg={6} className="m-auto">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {Customer}
                        {ShippingAddress}
                        {BillingAddress}
                        {CreditCardInformation}
                        {ReviewOrder}
                        <Row className="mt-5">
                            <Button variant="primary" type="submit" className="ml-auto">
                                Confirm
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckOut;