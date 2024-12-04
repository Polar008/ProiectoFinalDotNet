import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOffer } from "../../controllers/OfferController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBuilding } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { joinOffer } from "../../controllers/UserOfferController";
import { jwtDecode } from "jwt-decode";

import { URL } from "../../config";

function Offer() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));
  const [time, setTime] = useState(0);
  const [isBlack, setIsBlack] = useState(false);

  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    getOffer(id, jwt).then((o) => setOffer(o));
    console.log(offer);
    setTime(time + 1);
  }, []);

  useEffect(() => {
    checkIfJoined();
  }, [offer]);

  useEffect(() => {
    setTimeout(() => {
      setIsBlack(!isBlack);
      setTime(time + 1);
    }, 10);
  }, [time]);

  function checkIfJoined() {
    let decodedToken = decodeJwt(jwt);
    if (
      offer != null &&
      offer.enrolleds.find((element) => element.id == decodedToken.UserId)
    ) {
      setIsJoined(true);
    } else {
      console.log(offer);
    }
  }
  function decodeJwt(token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Claims:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  function handleArrowOnClick() {
    navigate("/");
  }

  function tryJoinOffer() {
    joinOffer(jwt, offer.id).then(() =>
      getOffer(id, jwt).then((o) => setOffer(o))
    );
  }

  return (
    <>
      {offer != null ? (
        <Container className="my-5">
          <Row className="justify-content-left">
            <Col
              xs={12}
              className="text-center"
              style={{ display: "contents" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  padding: "5px",
                }}
              >
                <Image
                  src={`${URL}/uploads/${offer.imgBanner}`}
                  alt="Example"
                  rounded
                  fluid
                  className="mb-4"
                />
                <div
                  className="arrowOffer"
                  style={{
                    backgroundColor: "#ffffff", // Black background for contrast
                    color: "#fff", // White icon color
                    width: "20px", // Icon container size
                    height: "20px", // Icon container size
                    display: "flex", // Flexbox to center the icon
                    alignItems: "center", // Center the icon vertically
                    justifyContent: "center", // Center the icon horizontally
                    borderRadius: "50%", // Make the container a circle
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "black" }}
                    onClick={handleArrowOnClick}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col xs={12} className="text-left">
              <h1 className="mb-3">{offer.title}</h1>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col xs={1} lg={1} className="text-left">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </Col>
            <Col xs={11} className="text-left">
              <p className="lead">
                {offer.province?.name + ", " + offer.city + ", " + offer.street}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col xs={1} lg={1} className="text-left">
              <FontAwesomeIcon icon={faBuilding} />
            </Col>
            <Col xs={10} className="text-left">
              <p className="lead">{offer.charity?.name}</p>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col xs={1} lg={1} className="text-left">
              <FontAwesomeIcon icon={faUser} />
            </Col>
            <Col xs={3} lg={2} className="text-left">
              <p className="lead">
                {offer.enrolleds?.length + "/" + offer.capacity}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col xs={12} className="text-left">
              <p className="lead">{offer.description}</p>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              onClick={() => tryJoinOffer()}
              disabled={isJoined}
            >
              {isJoined ? "Unido" : "Unirse"}
            </Button>
          </div>
        </Container>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Offer;
