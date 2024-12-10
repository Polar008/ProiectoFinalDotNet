import NavBar from "../elements/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { getUserOffers } from "../../controllers/OfferController";
import { getUserData, updateUserdApi } from "../../controllers/UserController";
import { getUserRewards } from "../../controllers/RewardsController";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { leaveOffer } from "../../controllers/UserOfferController";
import { jwtDecode } from "jwt-decode";
import { URL } from "../../config";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(null);
  const [email, setEmail] = useState(null);

  const [offers, setOffers] = useState([]);
  const [rewards, setRewards] = useState([]);

  const [selection, setSelection] = useState("offers");

  const [copyText, setCopyText] = useState("");

  const navigate = useNavigate();

  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    var decodedToken = decodeJwt(jwt);

    getUserOffers(decodedToken.UserId, jwt)
      .then((o) => {
        setOffers(o);
      })
      .catch(() => {});

    getUserRewards(jwt).then((o) => setRewards(o));

    getUserData(decodedToken.UserId, jwt).then((o) => {
      setName(o.name);
      setPostalCode(o.postalCode);
      setImage(o.photo);
      setPoints(o.points);
      setEmail(o.email);
    });
  }

  function submitChange() {
    const decodedToken = decodeJwt(jwt);
    updateUserdApi(
      decodedToken.UserId,
      {
        id: decodedToken.UserId,
        name: name,
        email: email,
        photo: image,
        points: points,
        postalCode: postalCode,
      },
      jwt
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function decodeJwt(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  function onEdit() {
    setIsEdit(true);
  }

  function swapScreen(option) {
    setSelection(option);
  }

  async function onDeleteOfferClicked(id) {
    try {
      await leaveOffer(jwt, id);
      fetchData(); // Call fetchData only after leaveOffer is complete
    } catch (error) {
      console.error("Failed to leave offer:", error);
    }
  }

  function navigateOffer(offerId) {
    navigate("/offer/" + offerId);
  }

  function copyCode(id) {
    setCopyText(id);
    copyToClipboard();
  }

  const copyToClipboard = async () => {
    try {
      console.log(copyText);
      await navigator.clipboard.writeText("copyText");
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  function ActiveOffers() {
    return (
      <>
        {offers.length > 0 ? (
          offers.map((o, index) => (
            <Row key={index}>
              <Col
                xs={3}
                onClick={() => navigateOffer(o.id)}
                style={{ alignContent: "center" }}
              >
                <Image
                  src={
                    o.imgBanner
                      ? `${URL}/uploads/${o.imgBanner}`
                      : "placeholder.jpg"
                  }
                  rounded
                  style={{ width: "75px", height: "75px" }}
                />
              </Col>
              <Col xs={7} onClick={() => navigateOffer(o.id)}>
                <h3>{o.title}</h3>
                <h4>{o.city}</h4>
                <h4>{o.street}</h4>
              </Col>
              <Col
                xs={2}
                onClick={() => onDeleteOfferClicked(o.id)}
                style={{ alignContent: "center" }}
              >
                <FontAwesomeIcon icon={faPen} />
              </Col>
            </Row>
          ))
        ) : (
          <h2>No te has unido a ninguna oferta</h2>
        )}
      </>
    );
  }

  function Reward() {
    return (
      <>
        {rewards.length > 0 ? (
          rewards.map((r, index) => (
            <Row key={index} onClick={() => copyCode(r.reedemableCode)}>
              <Col xs={12}>
                <h2>{r.reedemableCode}</h2>
              </Col>
            </Row>
          ))
        ) : (
          <h2>No tienes niguna recompensa</h2>
        )}
      </>
    );
  }

  return (
    <>
      <Container className="profile-container">
        <div className="profile-header">
          <div>
            <h1>{name}</h1>
            <h2>Puntos:{points}</h2>
          </div>
          <Image
            src={image ? `${URL}/uploads/${image}` : "placeholder.jpg"}
            roundedCircle
          />
        </div>

        <div className="profile-details">
          <h5>
            {offers.length} Ofertas {rewards.length} Recompensas
          </h5>
          <h6>{postalCode}</h6>
        </div>

        <div className="tabs">
          <div
            onClick={() => swapScreen("offers")}
            className={selection === "offers" ? "active" : ""}
          >
            <h2>{offers.length}</h2>
            <h3>Ofertas</h3>
          </div>
          <div
            onClick={() => swapScreen("rewards")}
            className={selection === "rewards" ? "active" : ""}
          >
            <h2>{rewards.length}</h2>
            <h3>Recompensas</h3>
          </div>
          <div
            onClick={() => swapScreen("info")}
            className={selection === "info" ? "active" : ""}
          >
            <h2>+</h2>
            <h3>Info</h3>
          </div>
        </div>
      </Container>

      <Container className="profile-container">
        {selection === "offers" ? (
          <div className="offers-container">
            <ActiveOffers />
          </div>
        ) : selection === "rewards" ? (
          <Reward />
        ) : selection === "info" ? (
          <>
            <Form onSubmit={handleSubmit} className="p-3">
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nombre"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="accountName"
                    placeholder="Dimitri"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEdit}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="accountEmail"
                    placeholder="PepeSanchez@gmail.com"
                    //value={(()=> JSON.parse(JSON.stringify(email)))()}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEdit}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Codigo Postal"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="accountPCode"
                    placeholder="PepeSanchez@gmail.com"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    disabled={!isEdit}
                  />
                </FloatingLabel>
              </Form.Group>
            </Form>

            {!isEdit && (
              <Button variant="success" onClick={onEdit}>
                Editar
              </Button>
            )}
            {isEdit && (
              <ButtonGroup>
                <Button
                  variant="success"
                  onClick={() => {
                    submitChange();
                    setIsEdit(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setName(name);
                    setEmail(email);
                    setPostalCode(postalCode);
                    setIsEdit(false);
                  }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            )}
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
