import NavBar from "../elements/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Profile() {
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState("");

  const [offers, setOffers] = useState(0);
  const [rewards, setRewards] = useState(0);

  function onEdit() {}

  return (
    <>
      <div
        onClick={onEdit}
        style={{
          display: "absolute",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faPen} style={{ marginRight: "8px" }} />
      </div>
      <Container className="my-5">
        <Row className="justify-content-left">
          <Col xs={10} className="text-center" style={{ display: "contents" }}>
            <h1 style={{padding: "5px"}}>Nombre</h1>
          </Col>
          <Col xs={2} className="text-center" style={{ display: "contents" }}>
            
          </Col>
        </Row>
        <Row className="justify-content-left">
            <Col xs={12} className="text-center" style={{ display: "contents" }}>
            <h2 style={{padding: "5px"}}>Estrellas({offers})</h2>
            </Col>
        </Row>
        <Row className="justify-content-left">
            <Col xs={12} className="text-center" style={{ display: "contents" }}>
            <h6 style={{padding: "5px"}}>{offers} Offers {rewards} rewards</h6>
            </Col>
        </Row>
        <Row className="justify-content-left">
            <Col xs={12} className="text-center" style={{ display: "contents" }}>
            <h6 style={{padding: "5px"}}>Location</h6>
            </Col>
        </Row>
      </Container>
      <NavBar />
    </>
  );
}

export default Profile;
