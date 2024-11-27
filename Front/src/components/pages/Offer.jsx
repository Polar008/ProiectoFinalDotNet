import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOffer } from "../../controllers/OfferController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBuilding } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { joinOffer } from "../../controllers/UserOfferController";
import jwtDecode from "jwt-decode";
import ContextUser from "../../controllers/ContextUser";

function Offer() {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const navigate = useNavigate();
  const { jwt } = useContext(ContextUser);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    getOffer(id)
      .then((o) => setOffer(o))
      .then(checkIfJoined());
  }, []);

  function checkIfJoined() {
    let decodedToken = decodeJwt(jwt);
    if (offer.enrolleds.includes(decodedToken.UserId)) {
        setIsJoined(true);
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
    joinOffer(offer.id);
  }

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-left">
          <Col xs={12} className="text-center" style={{ display: "contents" }}>
            <div
              style={{
                position: "relative",
                width: "fit-content",
                padding: "5px",
              }}
            >
              <Image
                src="https://imgs.search.brave.com/F-BI6Qdc1yenyGLvo9uktjZYHdbVkB6e_XD16qZD-hw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODQ4/NTQ5Mjg2L3Bob3Rv/L2RyZWFtLWhvbWUt/bHV4dXJ5LWhvdXNl/LXN1Y2Nlc3MuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWNq/aG9OcW9tTlR4Z1lX/eHVaOUV2NVB4Wmg2/V1k5NnZ2REdmM0hs/LTd4LVU9"
                alt="Example"
                rounded
                fluid
                className="mb-4"
              />
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrowOffer"
                style={{ color: "black" }}
                onClick={handleArrowOnClick}
              />
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
              {offer.enrolleds.length + "/" + offer.capacity}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <p className="lead">{offer.description}</p>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={tryJoinOffer} disabled={isJoined}>
            {isJoined ? "Unirse" : "Unido"}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Offer;
