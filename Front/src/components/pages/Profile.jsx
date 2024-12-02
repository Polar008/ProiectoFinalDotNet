import NavBar from "../elements/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getOffers } from "../../controllers/OfferController";
import { getUserData } from "../../controllers/UserController";
import Image from "react-bootstrap/Image";

function Profile() {
  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [image, setImage] = useState(null);

  const [offers, setOffers] = useState(0);
  const [rewards, setRewards] = useState(0);

  const [selection, setSelection] = useState("offers");

  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    console.log(jwt);
    /*getOffers(jwt)
      .then(o => setOffers(o))
      .catch(() => {});*/

    /*getRewards
      .then(o => setRewards)*/

    /*getUserData(jwt)
      .then(o => setName(o.name))
      .then(o => setPostalCode(o.postalCode))
      .then(o => setImage(o.image))*/
  }, []);

  function onEdit() {}

  function swapScreen(option) {
    setSelection(option);
  }

  function ActiveOffers() {
    return (
      <>
        <Row>
          <Col xs={3}>
            <Image src="holder.js/171x180" rounded />
          </Col>
          <Col xs={7}>
            <h3>Offer title</h3>
            <h4>City</h4>
            <h4>Street</h4>
          </Col>
          <Col xs={2}>
            <div>
              <FontAwesomeIcon icon={faPen} />
              <br />
              <FontAwesomeIcon icon={faPen} />
            </div>
          </Col>
        </Row>
      </>
    );
  }

  function Reward() {
    return (
      <>
        <Row>
          <Col xs={12}>
            <h1>REWARDS</h1>
          </Col>
        </Row>
      </>
    );
  }

  function Info() {
    return (
      <>
        <Row>
          <h1>INFO</h1>
        </Row>
      </>
    );
  }

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
        <Row className="justify-content-between">
          <Col xs={10} className="text-left">
            <h1 style={{ padding: "5px" }}>{name}</h1>
          </Col>
          <Col xs={2}>
            <Image src={image} roundedCircle />
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h2 style={{ padding: "5px" }}>Estrellas({offers})</h2>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h5 style={{ padding: "5px" }}>
              {offers} Offers {rewards} rewards
            </h5>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h6 style={{ padding: "5px" }}>{postalCode}</h6>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("offers")}
          >
            <h2>{offers}</h2>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("rewards")}
          >
            <h2>{rewards}</h2>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("info")}
          >
            <h2>+</h2>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("offers")}
          >
            <h3>Offers</h3>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("rewards")}
          >
            <h3>Rewards</h3>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("info")}
          >
            <h3>Info</h3>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        {selection == "offers" ? (
          <>
            <ActiveOffers />
          </>
        ) : selection == "rewards" ? (
          <>
            <Reward />
          </>
        ) : selection == "info" ? (
          <>
            <Info />
          </>
        ) : (
          <h1>ERROR</h1>
        )}
      </Container>
      <NavBar />
    </>
  );
}

export default Profile;
