import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getShopOffer } from "../../controllers/PointOfferController";
import { buyRewardApi } from "../../controllers/RewardsController";
import Button from "react-bootstrap/Button";
import { decodeJwt, URL } from "../../config";
import { getUserData } from "../../controllers/UserController";
import "../../index.css";

function PointOffer() {
  const { id } = useParams();
  const [pointOffer, setPointOffer] = useState({});
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    getShopOffer(id, jwt).then((o) => setPointOffer(o));
    const decodedToken = decodeJwt(jwt);
    getUserData(decodedToken.UserId, jwt).then((o) => {
      setUser(o);
    });
  }, []);

  function handleArrowOnClick() {
    navigate("/pointShop");
  }

  async function handleBuyPointOffer() {
    // const decodedToken = jwtDecode(jwt);

    // const userShopOffer = {
    //   ShopOfferId: id,
    // };
    // console.log(userShopOffer);

    const buyRewardResponse = await buyRewardApi(id, jwt);
    console.log(buyRewardResponse);
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
                src={`${URL}/uploads/${pointOffer.imgBanner}`}
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
              <div
                className="pointsInOffer"
              >
                <p className="points" style={{backgroundColor: "white"}}>
                  Puntos: {user != null ? user.points : 0}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <h1 className="mb-3">{pointOffer.title}</h1>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col xs={12} className="text-left">
            <p className="lead">{pointOffer.description}</p>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={handleBuyPointOffer}>
            {pointOffer.cost}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default PointOffer;
