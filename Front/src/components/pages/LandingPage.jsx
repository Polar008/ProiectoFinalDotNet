import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container className="">
        <Row>
          <Col xs={2}></Col>
          <Col xs={8}>
            <Image
              src="./src/assets/PixelCuality.png"
              style={{ width: "100%", justifyContent: "center" }}
            ></Image>
          </Col>
          <Col xs={2}></Col>
        </Row>

        <Row>
          <Col xs={2}></Col>
          <Col xs={8}>
            <p>
              Bienvenido Usuario! Aqui desde Volfi queremos recompensar
              a nuestros usuarios que realicen actividades civicas con 
              puntos canjeables en la tienda de nuestra app los cuales
              pueden ser intercambiados por premios!
              </p>
            <p>Para que te ayuden mientras ayudas!</p>
          </Col>
          <Col xs={2}></Col>
        </Row>

        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Button variant="primary" onClick={() => navigate("/Login")}>
              Iniciar Sesion
            </Button>
            <br />
            <Button variant="primary" onClick={() => navigate("/Register")}>
              Registrate
            </Button>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
