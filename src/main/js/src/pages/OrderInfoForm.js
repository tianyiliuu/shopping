import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

const OrderInfoForm = () => {

    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));

    return (
        <Container fluid cl className="mt-5">
            <Row>
                <Col lg={6} className="m-auto">
                    <Form onSubmit={handleSubmit(onSubmit)}>
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

                        <h3 className="mt-5">Shipping Address</h3>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control {...register("address")} placeholder="1234 Main St"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control {...register("address_2")} placeholder="Apartment, studio, or floor"/>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control {...register("city")}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Province</Form.Label>
                                <Form.Control {...register("province")}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPostalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control {...register("postalCode")}/>
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