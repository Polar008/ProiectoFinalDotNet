import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { getUserData, updateUserdApi } from "../../controllers/UserController";
import { useNavigate } from "react-router-dom";

function UpgradeAccount() {
  const [cif, setCif] = useState("");
  const [upgradeTo, setUpgradeTo] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  function handleCifChange(e) {
    setCif(e.target.value);
  }

  function handleUpgradeToChange(e) {
    setUpgradeTo(e.target.value);
  }

  
  const handleSubmit = (e) => {
    console.log("guebonaso")
    e.preventDefault();
    const decodedToken = decodeJwt(jwt);
    getUserData(decodedToken.UserId).then((u) => {
      const newUser = JSON.parse(JSON.stringify(u));
      if (upgradeTo == "Charity") {
        newUser.isCharity = true;
      } else if (upgradeTo == "Enterprise") {
        newUser.isEnterprise = true;
      }
      console.log(newUser);
      setUser(newUser);
    });
  };
  
  useEffect(() => {
    if(user !== null){
      const decodedToken = decodeJwt(jwt);
      updateUserdApi(decodedToken.UserId, user, jwt);
      navigate("/");
    }
  }, [user]);

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <h3>Credit Card Form</h3>
      <Form.Group className="mb-3">
        <Form.Label>Cambia tu cuenta a:</Form.Label>
        <Form.Select name="paymentType" onChange={handleUpgradeToChange}>
          <option value="Charity">Entidad Benefica</option>
          <option value="Enterprise">Empresa</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="floatingInput" label="CIF" className="mb-3">
          <Form.Control
            type="text"
            name="cardholderName"
            placeholder="Pepe Sanchez"
            maxLength={9}
            onChange={handleCifChange}
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="success" size="lg" onClick={handleSubmit}>
        Canviar
      </Button>
    </Form>
  );
}

export default UpgradeAccount;
