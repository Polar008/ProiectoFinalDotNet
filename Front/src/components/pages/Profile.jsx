import NavBar from "../elements/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getOffers } from "../../controllers/OfferController";
import { getUserData } from "../../controllers/UserController";
import { getUserRewards } from "../../controllers/RewardsController";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { leaveOffer } from "../../controllers/UserOfferController";
import { jwtDecode } from "jwt-decode";
import { URL } from "../../config";

function Profile() {
  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);

  const [offers, setOffers] = useState([]);
  const [rewards, setRewards] = useState([]);

  const [selection, setSelection] = useState("offers");

  const navigate = useNavigate();

  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    console.log(jwt);
    var decodedToken = decodeJwt(jwt);
    setUserId(decodedToken.UserId);
    
    getOffers(jwt)
      .then((o) => setOffers(o))
      .catch(() => {});

    getUserRewards(decodedToken.UserId, jwt).then((o) => setRewards(o));

    getUserData(decodedToken.UserId,jwt)
    .then((o) => {
      setName(o.name);
      console.log(o)
      setPostalCode(o.postalCode);
      setImage(o.photo);
    });
  }, []);

  function decodeJwt(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  function onEdit() {}

  function swapScreen(option) {
    setSelection(option);
  }

  function onDeleteOfferClicked(id) {
    leaveOffer(jwt, id);
  }

  function navigateOffer(offerId) {
    navigate("/offer/" + offerId);
  }

  function ActiveOffers() {
    return (
      <>
        {offers.filter(o => o.enrolleds?.find((element) => element.id == userId)).length > 0 ? (
          offers.filter(o => o.enrolleds?.find((element) => element.id == userId)).map((o, index) => (
            <Row key={index} onClick={() => navigateOffer(o.id)}>
              <Col xs={3}>
                <Image src="holder.js/171x180" rounded />
              </Col>
              <Col xs={7}>
                <h3>{o.title}</h3>
                <h4>{o.city}</h4>
                <h4>{o.street}</h4>
              </Col>
              <Col xs={2}>
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => onDeleteOfferClicked(o.id)}
                />
              </Col>
            </Row>
          ))
        ) : (
          <h1>THERE ARE NO OFFERS</h1>
        )}
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
          <Col xs={12}>
            <h1>INFO</h1>
          </Col>
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
          <Col xs={2}><Image src={URL+"/uploads/"+image} roundedCircle /></Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h2 style={{ padding: "5px" }}>Estrellas({0})</h2>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h5 style={{ padding: "5px" }}>
              {offers.length} Offers {rewards.length} Rewards
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
            <h2>{offers.length}</h2>
          </Col>
          <Col
            xs={4}
            className="text-center"
            onClick={() => swapScreen("rewards")}
          >
            <h2>{rewards.length}</h2>
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
