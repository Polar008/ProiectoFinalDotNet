import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useState, useRef, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { getCharityOffers } from "../../controllers/OfferController";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { URL } from "../../config";

function OfferCloser() {
  const { id } = useParams();
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    async function fetchOffers() {
      // const fetchOffers = async () =>
      try {
        const o = await getCharityOffers(jwt);
        setOffers(o);
        console.log(o);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOffers();
  }, []);

  function cardOnClickHandler(offerId) {
    navigate("/offer/closer/" + offerId);
  }

  //   useEffect(() => {
  //     await getCharityOffers(jwt)
  //       .then((o) => setOffers(o))
  //       .catch(() => {});

  //       console.log(offers);
  //   }, []);

  return (
    <>
      <Container className="my-5">
        <h2>Tus Ofertas</h2>

        <Row>
          {offers.map((offer, index) => (
            <Col
              key={offer.id}
              xs={6} /* 2 cards per row on small screens */
              lg={
                2
              } /* 5 cards per row on large screens (12/5 = approx 2 cols each) */
              className="mb-4"
              onClick={() => cardOnClickHandler(offer.id)}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={`${URL}/uploads/${offer.imgBanner}`}
                  // alt={`Card ${index + 1}`}
                />

                <>
                  <Card.Body>
                    <Card.Title>{offer.title}</Card.Title>
                    <Card.Text>{offer.description}.</Card.Text>
                  </Card.Body>
                </>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default OfferCloser;
