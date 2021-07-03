import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../context/auth";
import {useState} from "react";

const Login = () => {

    const {user, setUser} = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const {register, handleSubmit} = useForm();

    const onSubmit = (d) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("/api/auth/signin", {method: "POST", headers: headers, body: JSON.stringify(d)})
            .then(response => response.json())
            .then(result => {
                if ("token" in result) {
                    setUser(result);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            })
            .catch(e => {
                setIsError(true);
            });
    };

    if (isLoggedIn || user !== null) {
        return <Redirect to="/"/>;
    }

    return (
        <Container className="mb-5" fluid>
            <Row>
                <Col lg={6} className="m-auto">
                    <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mb-3">Login</h3>
                        <Form.Group className="mb-3" controlId="loginUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control {...register("username")} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register("password")} type="password"/>
                        </Form.Group>
                        <Row>
                            <Button variant="primary" type="submit" className="ml-auto mr-3 mt-3">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;