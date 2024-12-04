import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import {
  getShopOffer,
  updateShopOfferApi,
} from "../../controllers/PointOfferController";
import "bootstrap/dist/css/bootstrap.min.css";
// import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

function EditPointOffer() {
  const { id } = useParams();
  const [shopOfferData, setShopOfferData] = useState(null);

  const jwt = JSON.parse(localStorage.getItem("storageJwt"));

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const costRef = useRef(null);

  async function handleUpdatePointOffer() {
    const updatedShopOffer = {
      id: id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value,
    };

    await updateShopOfferApi(id, updatedShopOffer, jwt);
  }

  useEffect(() => {
    getShopOffer(id, jwt)
      .then((data) => {
        console.log(data);
        setShopOfferData(data);
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        costRef.current.value = data.cost;
      })
      .catch(() => {});
  }, [id]);

  return (
    <>
      <Container className="my-5">
        <Form>
          <h2>Editar Punto de Oferta</h2>
          <Form.Group className="mb-3">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar titulo"
              ref={titleRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} ref={descriptionRef} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresar costo"
              ref={costRef}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdatePointOffer}>
            Actualizar Punto Oferta
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditPointOffer;
