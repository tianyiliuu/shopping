import {useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {Redirect} from "react-router-dom";
import {useAuth} from "../context/auth";

const Signup = () => {

    const {user} = useAuth();
    const {register, handleSubmit} = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = (d) => {
        d["role"] = [
            "mod",
            "user"
        ];
        console.log(d);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("/api/auth/signup", {method: "POST", headers: headers, body: JSON.stringify(d)})
            .then(response => {
                if (response.status === 200) {
                    setIsSuccess(true);
                } else {
                    setIsError(true);
                }
            })
            .catch(e => {
                setIsError(true);
            });
    };

    if (isSuccess || user !== null) {
        return <Redirect to="/login"/>;
    }

    return (
        <Container className="mb-5" fluid>
            <Row>
                <Col lg={6} className="m-auto">
                    <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mb-3">Register</h3>
                        <Form.Group className="mb-3" controlId="signupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control {...register("username")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupUsername">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" {...register("email")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupPassword">
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

export default Signup;