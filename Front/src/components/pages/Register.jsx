import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { uploadImage } from "../../controllers/UploadsController";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { createUser } from "../../controllers/UserController";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const [charity, setCharity] = useState(null);
  const [enterprise, setEnterprise] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Upload the image and get the file URL
      const uploadedImage = await uploadImage(image);
      const photoLink = uploadedImage.fileUrl;

      // Create the form data
      const datos = {
        name: name,
        email: email,
        password: password,
        photo: String(photoLink),
        dateOfBirth: date,
        postalCode: postalCode,
        isEnterprise: enterprise,
        isCharity: charity,
      };
      console.log(datos);

      createUser(datos);
      navigate("/login");
    } catch (error) {
      console.error("Error uploading image or submitting form:", error);
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePostalCodeChange(e) {
    setPostalCode(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleUpgradeToChange(e) {
    if (e.target.value === "Enterprise") {
      setEnterprise(true);
      setCharity(false);
    } else if (e.target.value === "Charity") {
      setCharity(true);
      setEnterprise(false);
    } else if (e.target.value === "User") {
      setCharity(false);
      setEnterprise(false);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      // Crear un FileReader per generar el preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result); // Actualitza la URL del preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center my-5">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre Apellido1 Apellido2"
                onChange={handleNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Codigo Postal</Form.Label>
              <Form.Control
                type="number"
                placeholder="000000"
                onChange={handlePostalCodeChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="age">
            <Form.Label>Fecha De Nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha de nacimiento"
              onChange={handleDateChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@gmail.com"
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

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccionar imagen</Form.Label>
            {previewUrl && (
              <div className="mb-3 text-center">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  rounded
                  fluid
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de cuenta</Form.Label>

            <Form.Select name="Type" onChange={handleUpgradeToChange}>
              <option value="User">Usuario</option>
              <option value="Charity">Entidad Benefica</option>
              <option value="Enterprise">Empresa</option>
            </Form.Select>
          </Form.Group>
          {(enterprise || charity) && (
            <Form.Group className="mb-3">
              <Form.Label>CIF</Form.Label>
              <Form.Control
                type="text"
                placeholder="123456789"
                maxLength={9}
                required
              />
            </Form.Group>
          )}
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Registrate
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Register;
