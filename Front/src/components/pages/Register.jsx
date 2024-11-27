import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from "react";

function Register() {

  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  function handleSubmit(e)
  {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("postalCode", postalCode);
    formData.append("date", date);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
  }

  function handleNameChange(e)
  {
    setName(e);
  }

  function handlePostalCodeChange(e)
  {
    setPostalCode(e);
  }

  function handleDateChange(e)
  {
    setDate(e);
  }

  function handleEmailChange(e)
  {
    setEmail(e);
  }

  function handlePasswordChange(e)
  {
    setPassword(e);
  }

  function handleImageChange(e)
  {
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <>
    <h1>Register</h1>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control placeholder="Nombre Completo" onChange={handleNameChange} required/>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Codigo Postal</Form.Label>
          <Form.Control type="number" placeholder="Codigo Postal" onChange={handlePostalCodeChange} required/>
        </Form.Group>
      </Row>

      <Form.Group controlId="age">
          <Form.Label>Fecha De Nacimiento</Form.Label>
          <Form.Control type="date" placeholder="Fecha de nacimiento" onChange={handleDateChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" onChange={handlePasswordChange} required/>
      </Form.Group>

      <Form.Group className='"mb-3' controldId="image">
      <label htmlFor="imagen">Seleccionar imagen:</label>
      <input type="file" id="imagen" accept="image/*" onChange={handleImageChange} required/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrate
      </Button>
    </Form>
    </>
  );
}

export default Register;