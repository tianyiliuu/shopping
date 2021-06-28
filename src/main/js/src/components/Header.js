import {Badge, Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = props => {
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
                    Cart <Badge bg="secondary" style={{backgroundColor: "#CCC", marginLeft: "4px"}}>9</Badge>
                </Button>
            </div>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{maxHeight: '200px'}}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                        Link
                    </Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            <Button variant="outline-primary" style={{marginLeft: "10px"}} className="d-lg-block d-none">
                Cart <Badge bg="secondary" style={{backgroundColor: "#CCC", marginLeft: "4px"}}>9</Badge>
            </Button>
        </Navbar>

    );
}

export default Header;