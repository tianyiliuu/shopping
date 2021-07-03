import {Badge, Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useCart} from "../context/cart";

const Header = () => {

    const {cartItems} = useCart();
    const history = useHistory();

    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => {
        history.push(`/search/${d.searchName}`);
    }

    const numCartItems = Object.keys(cartItems).reduce((acc, curId) => {
        return acc + cartItems[curId];
    }, 0);

    const [categories, setCategories] = useState([]);
    const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
    useEffect(() => {
        fetch("/api/productCategories", {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                setCategories(result._embedded.productCategories);
                setIsCategoriesLoaded(true);
            })
            .catch(error => console.log('error', error));
    }, []);

    if (!isCategoriesLoaded) {
        return <></>;
    } else {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="#">My Store</Navbar.Brand>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Navbar.Toggle aria-controls="navbarScroll" style={{paddingTop: "3px", paddingBottom: "3px"}}/>
                    <Button variant="outline-primary" style={{marginLeft: "10px"}} className="d-lg-none d-inline-block">
                        Cart <Badge bg="secondary"
                                    style={{backgroundColor: "#CCC", marginLeft: "4px"}}>{numCartItems}</Badge>
                    </Button>
                </div>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{maxHeight: '200px'}}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">CCC</Nav.Link>
                        <NavDropdown title="Category" id="navbarScrollingDropdown">
                            {categories.map(category => (
                                <NavDropdown.Item as={Link} to={`/category/${category.id}`}
                                                  key={category.id}>{category.categoryName}</NavDropdown.Item>
                            ))}
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to="/">All</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                            {...register("searchName")}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
                <Button variant="outline-primary" style={{marginLeft: "10px"}} className="d-lg-block d-none">
                    Cart <Badge bg="secondary"
                                style={{backgroundColor: "#CCC", marginLeft: "4px"}}>{numCartItems}</Badge>
                </Button>
            </Navbar>
        );
    }
}

export default Header;