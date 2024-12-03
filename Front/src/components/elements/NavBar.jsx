import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const [userType, setUserType] = useState("");
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  function decodeJwt(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  useEffect(() => {
    const decoded = decodeJwt(jwt);
    if (decoded.IsCharity == "true") {
      setUserType("Charity");
    } else if (decoded.IsEnterprise == "true") {
      setUserType("Enterprise");
    } else {
      setUserType("normal");
    }
  }, []);

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
          <Nav.Link
            as={Link}
            to={
              userType == "normal"
                ? "/profile"
                : userType == "Charity"
                ? "/profileCha"
                : "profileEnt"
            }
          >
            <div className="text-center">
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
              <br />
              Profile
            </div>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
