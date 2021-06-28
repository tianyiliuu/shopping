import {Button, Col, Container, Form, Row} from "react-bootstrap";

const OrderInfoForm = (props) => {

    return (
        <Container fluid cl>
            <Row>
                <Col lg={6} className="m-auto">
                    <Form>
                        <h3>Customer</h3>
                        <Row>
                            <Form.Group as={Col} controlId="formGridFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control placeholder="Firstname"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control placeholder="Lastname"/>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <h3 className="mt-5">Shipping Address</h3>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor"/>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Province</Form.Label>
                                <Form.Control/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
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

export default OrderInfoForm;