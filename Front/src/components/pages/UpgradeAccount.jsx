import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Form } from "react-bootstrap";

function UpgradeAccount() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted!");
  };
  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <h3>Credit Card Form</h3>

      <Form.Group className="mb-3">
        <Form.Label>Cardholder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="1234 5678 9012 3456"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="MM/YY"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CVV</Form.Label>
        <Form.Control
          type="text"
          placeholder="123"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
}

export default UpgradeAccount;
