import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../controllers/AuthController";
import { useContext, useState } from "react";
import ContextUser from "../../controllers/ContextUser";

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
          navigate("/");
        } else {
          alert("Email o contraseña incorrectos");
        }
      })
      .catch();
  }

  return (
    <>
      <Container>
        <h1>Login</h1>
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
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={handleOnClickRegister}>
            Crear cuenta
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Login;
