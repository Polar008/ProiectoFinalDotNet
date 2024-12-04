import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getShopOffer } from "../../controllers/PointOfferController";
import { buyRewardApi } from "../../controllers/RewardsController";
import Button from "react-bootstrap/Button";

function PointOffer() {
  const { id } = useParams();
  const [pointOffer, setPointOffer] = useState({});
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    getShopOffer(id, jwt).then((o) => setPointOffer(o));
  }, []);

  function handleArrowOnClick() {
    navigate("/pointShop");
  }

  async function handleBuyPointOffer() {
    // const decodedToken = jwtDecode(jwt);

    const userShopOffer = {
      ShopOfferId: id,
    };
    console.log(userShopOffer);

    const buyRewardResponse = await buyRewardApi(userShopOffer, jwt);
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
                src="https://imgs.search.brave.com/V9MihjZCr3uqoPsiU0TbzLp5mI5MW6WufLgYOpr7NPs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MjIxODA3Mi9waG90/by9yZXNpZGVudGlh/bC1hcmVhLW5lYXIt/dG9reW8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWt0WDU0/UE5PS3dJUV9oYnJ4/Vkw0RnUzdEZCdlZ3/bnlmQy0tUTlBLUxH/WlE9"
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
