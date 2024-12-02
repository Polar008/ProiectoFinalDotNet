import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getOffers } from "../../controllers/OfferController";
import SearchBar from "../elements/SearchBar";
import NavBar from "../elements/NavBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [offers, setOffers] = useState([]);
  const [isFilteredHome, setIsFilteredHome] = useState([]);
  const navigate = useNavigate();
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  useEffect(() => {
    console.log(jwt);
    getOffers(jwt)
      .then((o) => setOffers(o))
      .catch(() => {});
  }, []);

  function cardOnClickHandler(offerId) {
    navigate("/offer/" + offerId);
  }

  return (
    <>
      {offers?.length > 0 ? (
        <>
          <SearchBar location="home" isFilteredHome={setIsFilteredHome} />
          <Container className="my-4">
            <Row>
              {isFilteredHome.length > 0
                ? offers
                    .filter((c) => isFilteredHome.find((i) => i.id == c.id))
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
                            variant="top"
                            src={`http://26.147.198.13:5058/uploads/${c.imgBanner}`}
                            alt={`Card ${index + 1}`}
                          />
                          <Card.Body>
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
                          variant="top"
                          src={`http://26.147.198.13:5058/uploads/${c.imgBanner}`}
                          alt={`Card ${index + 1}`}
                        />
                        <Card.Body>
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
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default Home;
