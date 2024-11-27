import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function saveJwtToStorage(jwt){
    var jsonData = JSON.stringify(jwt);
    localStorage.setItem("storageJwt", jsonData);
  }

  function handleOnClickRegister() {
    navigate("/register");
  }

  function handleOnClickLogin() {
    saveJwtToStorage("secureToken");
    navigate("/");
  }

  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="Email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <Button variant="primary" size="lg" onClick={handleOnClickLogin}>
          Iniciar sesion
        </Button>
      </Form>
      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={handleOnClickRegister}>
          Crear cuenta
        </Button>
      </div>
    </>
  );
}

export default Login;
