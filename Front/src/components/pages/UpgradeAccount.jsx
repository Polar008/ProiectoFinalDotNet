import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

function UpgradeAccount() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function decodeJwt(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <h3>Credit Card Form</h3>
      <Form.Group className="mb-3">
        <Form.Label>Cambia tu cuenta a:</Form.Label>
        <Form.Select
          name="paymentType"
          value={formData.paymentType}
          onChange={handleChange}
        >
          <option value="Charity">Entidad Benefica</option>
          <option value="Enterprise">Empresa</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel
          controlId="floatingInput"
          label="Nombre propietario de la trgeta"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="cardholderName"
            placeholder="Pepe Sanchez"
            value={formData.cardholderName}
            onChange={handleChange}
          />
        </FloatingLabel>
      </Form.Group>
    </Form>
  );
}

export default UpgradeAccount;
