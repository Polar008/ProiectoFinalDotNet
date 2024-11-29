import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { uploadImage } from "../../controllers/UploadsController";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { createUser } from "../../controllers/UserController";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Upload the image and get the file URL
      const uploadedImage = await uploadImage(image);
      const photoLink = uploadedImage.fileUrl;

      // Create the form data
      const datos = {
        "name": name,
        "email": email,
        "password": password,
        "photo": String(photoLink),
        "dateOfBirth": date,
        "postalCode": postalCode
      };
      console.log(datos)

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", String(photoLink));
      formData.append("dateOfBirth", date);
      formData.append("postalCode", postalCode);

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

  // function handleImageChange(e) {
  //   const file = e.target.files[0];
  //   setImage(file);
  // }

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
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              placeholder="Nombre Completo"
              onChange={handleNameChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control
              type="number"
              placeholder="Codigo Postal"
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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar imagen:</Form.Label>
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

        {/* <Form.Group className='"mb-3' controldId="image">
          <label htmlFor="imagen">Seleccionar imagen:</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Registrate
        </Button>
      </Form>
    </>
  );
}

export default Register;
