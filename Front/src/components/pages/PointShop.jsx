import NavBar from "../elements/NavBar";
import SearchBar from "../elements/SearchBar";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getShopOffers } from "../../controllers/PointOfferController";
import "../../App.css";
import { URL } from "../../config";

function PointShop() {
  const [offers, setOffers] = useState([]);
  const [isFilteredShop, setIsFilteredShop] = useState([]);
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    getShopOffers(jwt).then((o) => setOffers(o));
  }, []);

  function cardOnClickHandler(offerId) {
    navigate("/shopOffer/" + offerId);
  }

  return (
    <>
      <SearchBar location="shop" isFilteredshop={setIsFilteredShop} />
      <Container className="my-4 pb-5">
        <Row>
          {isFilteredShop.length > 0
            ? offers
                .filter((c) => isFilteredShop.find((i) => i.id == c.id))
                .map((c, index) => (
                  <Col
                    key={c.id}
                    xs={6} /* 2 cards per row on small screens */
                    lg={
                      2
                    } /* 5 cards per row on large screens (12/5 = approx 2 cols each) */
                    className="mb-4"
                    onClick={() => cardOnClickHandler(c.id)}
                  >
                    <Card>
                      <Card.Img
                        className="imgHeight"
                        variant="top"
                        src={`${URL}/uploads/${c.imgBanner}`}
                        alt={`Card ${index + 1}`}
                      />
                      <Card.Body className="bodyHeight">
                        <Card.Title>{c.title}</Card.Title>
                        <Card.Text>{c.description}.</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
            : offers.map((c, index) => (
                <Col
                  key={c.id}
                  xs={6} /* 2 cards per row on small screens */
                  lg={
                    2
                  } /* 5 cards per row on large screens (12/5 = approx 2 cols each) */
                  className="mb-4"
                  onClick={() => cardOnClickHandler(c.id)}
                >
                  <Card>
                    <Card.Img
                      className="imgHeight"
                      variant="top"
                      src={`${URL}/uploads/${c.imgBanner}`}
                      alt={`Card ${index + 1}`}
                    />
                    <Card.Body className="bodyHeight">
                      <Card.Title>{c.title}</Card.Title>
                      <Card.Text>{c.description}.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>
      <NavBar />
    </>
  );
}

export default PointShop;
