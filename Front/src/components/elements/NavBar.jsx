import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <Navbar bg="light" expand="lg" fixed="bottom">
            <Container>
                <Nav className="w-100 d-flex justify-content-around flex-row">
                    <Nav.Link as={Link} to="/">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faHome} size="lg" />
                            <br />
                            Explore
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/pointShop">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            <br />
                            PointShop
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faUserCircle} size="lg" />
                            <br />
                            Profile
                        </div>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;