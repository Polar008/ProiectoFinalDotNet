import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { getUserData, updateUserdApi } from "../../controllers/UserController";
import { decodeJwt } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config";
import {
  deletePointOffers,
  getEnterpriseShopOffers,
} from "../../controllers/PointOfferController";


function ProfileEnterprise() {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selection, setSelection] = useState("offers");
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));
  const navigate = useNavigate();

  

  function onEdit() {
    setIsEdit(true);
  }

  function submiteChange() {
    const decodedToken = decodeJwt(jwt);
    updateUserdApi(
      decodedToken.UserId,
      {
        id: user.id,
        name: name,
        email: email,
        password: user.password,
        photo: user.photo,
        dateOfBirth: user.dateOfBirth,
        isEnterprise: user.isEnterprise,
        isCharity: user.isCharity,
        points: 0,
        postalCode: postalCode,
      },
      jwt
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const decodedToken = decodeJwt(jwt);
    getUserData(decodedToken.UserId, jwt).then((o) => {
      setUser(o);
      setName(o.name);
      setPostalCode(o.postalCode);
      setImage(o.photo);
      setEmail(o.email);
    });
    getEnterpriseShopOffers(jwt).then((o) => setOffers(o));
  }, []);

  function ActiveOffers() {
    return (
      <>
        {offers.length > 0 ? (
          offers.map((o, index) => (
            <Row key={index}>
              <Col xs={3} onClick={() => navigate("/offer/edit/" + o.id)}>
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
              <Col xs={7} onClick={() => navigate("/shopOffer/edit/" + o.id)}>
                <h3>{o.title}</h3>
                <h4>{o.city}</h4>
                <h4>{o.street}</h4>
              </Col>
              <Col xs={2} onClick={() => deletePointOffers(o.id, jwt)}>
                <FontAwesomeIcon icon={faPen} />
              </Col>
            </Row>
          ))
        ) : (
          <h2>No has creado ninguna</h2>
        )}
        <Button
          variant="success"
          onClick={() => navigate("/shopOffer/register")}
        >
          +
        </Button>
      </>
    );
  }

  return (
    <>
      <Container className="profile-container">
        <div className="profile-header">
          <div>
            <h1>{name}</h1>
          </div>
          <Image
            src={image ? `${URL}/uploads/${image}` : "placeholder.jpg"}
            roundedCircle
          />
        </div>

        <div className="profile-details">
          <h5>{offers.length} Ofertas</h5>
          <h6>{postalCode}</h6>
        </div>

        <div className="tabs">
          <div
            onClick={() => setSelection("offers")}
            className={selection === "offers" ? "active" : ""}
          >
            <h2>{offers.length}</h2>
            <h3>Ofertas</h3>
          </div>
          <div
            onClick={() => setSelection("info")}
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
                    placeholder="Pepe Sanchez"
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
                    submiteChange();
                    setIsEdit(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setName(user.name);
                    setEmail(user.email);
                    setPostalCode(user.postalCode);
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
    </>
  );
}

export default ProfileEnterprise;
