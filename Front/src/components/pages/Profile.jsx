import NavBar from "../elements/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getUserOffers } from "../../controllers/OfferController";
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
  const [points, setPoints] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [offers, setOffers] = useState([]);
  const [rewards, setRewards] = useState([]);

  const [selection, setSelection] = useState("offers");

  const [copyText, setCopyText] = useState("");

  const navigate = useNavigate();

  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
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
      setPassword(o.password);
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

  function onUpgrade() {
    navigate("/upgrade");
  }

  function swapScreen(option) {
    setSelection(option);
  }

  function onDeleteOfferClicked(id) {
    leaveOffer(jwt, id);
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
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  function ActiveOffers() {
    return (
      <>
        {offers.length > 0 ? (
          offers.map((o, index) => (
            <Row key={index} onClick={() => navigateOffer(o.id)}>
              <Col xs={3}>
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
              <Col xs={7}>
                <h3>{o.title}</h3>
                <h4>{o.city}</h4>
                <h4>{o.street}</h4>
              </Col>
              <Col xs={2} onClick={() => onDeleteOfferClicked(o.id)}>
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

  function Info() {
    return (
      <>
        <Row>
          <h2>Nombre</h2>
          <p>{name}</p>

          <h2>Email</h2>
          <p>{email}</p>

          <h2>Contraseña</h2>
          <p>*****</p>

          <h2>Codigo Postal</h2>
          <p>{postalCode}</p>

          <h2>Puntos:{points}</h2>

          <button onClick={onUpgrade}>Mejorar</button>

          <button onClick={onEdit}>Editar Perfil</button>
        </Row>
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
          <Info />
        ) : (
          <h1>ERROR</h1>
        )}
      </Container>

      <NavBar />
    </>
  );
}

export default Profile;
