import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../controllers/AuthController";
import { useContext, useState } from "react";
import ContextUser from "../../controllers/ContextUser";
import { decodeJwt } from "../../config";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { changeJwt, userName } = useContext(ContextUser);

  function saveJwtToStorage(jwt) {
    var jsonData = JSON.stringify(jwt);
    localStorage.setItem("storageJwt", jsonData);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleOnClickRegister() {
    navigate("/register");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    console.log(userName);
    authLogin(data)
      .then((t) => {
        if (t != null) {
          saveJwtToStorage(t.token);
          changeJwt(t.token);
          const decodedT = decodeJwt(t.token);
          if (decodedT.IsCharity == "True") {
            navigate("/profileCha");
          } else if (decodedT.IsEnterprise == "True") {
            navigate("/profileEnt");
          } else {
            navigate("/");
          }
        } else {
          alert("Email o contraseña incorrectos");
        }
      })
      .catch();
  }

  return (
    <>
      <Container
        className="d-flex flex-column align-items-center justify-content-center my-5"
        style={{ height: "80vh", boxSizing: "border-box" }}
      >
        <Row className="">
          <Col className="d-flex justify-content-center">
            <Image
              src="./src/assets/PixelCuality.png"
              style={{ width: "50%", justifyContent: "center" }}
            ></Image>
          </Col>
        </Row>
        <Row className="justify-content-center w-100">
          <Col xs={12}>
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="Email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Iniciar sesion
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center w-100">
          <Col xs={5}>
            <div className="barra"></div>
          </Col>
          <Col
            xs={2}
            className="d-flex text-center justify-content-center align-items-center"
          >
            <p>o</p>
          </Col>
          <Col xs={5}>
            <div className="barra"></div>
          </Col>
        </Row>
        <Row className="w-100">
          <Col xs={{ span: 12, offset: 0 }}>
            <div className="d-grid gap-2">
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleOnClickRegister}
              >
                Crear cuenta
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
