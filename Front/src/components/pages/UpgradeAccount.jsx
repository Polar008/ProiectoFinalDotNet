import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import InputMask from "react-input-mask";
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

      <Form.Group className="mb-3">
        <FloatingLabel
          controlId="floatingInput"
          label="Numero de la targeta"
          className="mb-3"
        >
          {/* <Form.Control
            type="text"
            placeholder="1234 5678 9012 3456"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          /> */}
          <Form.Control
          type="text"
          placeholder="1234 5678 9012 3456"
          {...register("cardNumber", {
            required: "Card number is required.",
            pattern: {
              value: /^\d{16}$/,
              message: "Card number must be 16 digits.",
            },
          })}
        />
        {errors.cardNumber && (
          <p className="text-danger">{errors.cardNumber.message}</p>
        )}
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col xs={6}>
          <Form.Label>Data de caducidad</Form.Label>
          <Form.Control
              type="text"
              placeholder="MM/YY"
              {...register("expiryDate", {
                required: "Expiration date is required.",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Expiration date must be in MM/YY format.",
                },
              })}
            />
            {errors.expiryDate && (
              <p className="text-danger">{errors.expiryDate.message}</p>
            )}
          {/* <Form.Control
            type="text"
            placeholder="MM/YY"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          /> */}
        </Col>
        <Col xs={6}>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            placeholder="123"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default UpgradeAccount;
