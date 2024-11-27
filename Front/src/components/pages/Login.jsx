import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    function handleOnClickRegister() {
        navigate("/register");
    }

    function handleOnClickLogin() {
        navigate("/");
    }

  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
