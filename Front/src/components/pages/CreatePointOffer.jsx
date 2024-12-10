import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button, Image } from "react-bootstrap";
import {
  createPointOfferApi,
  getShopOffers,
} from "../../controllers/PointOfferController";
import { uploadImage } from "../../controllers/UploadsController";
import { useNavigate } from "react-router-dom";

import { generateRewardApi } from "../../controllers/RewardsController";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

function CreatePointOffer() {
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const costRef = useRef(null);
  const rewardCountRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShopOffers(jwt);
      console.log(data);
    };

    fetchData();
  }, []);

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

  async function handleCreatePointOffer() {
    const decodedToken = jwtDecode(jwt);

    console.log(decodedToken);

    const uploadedImage = await uploadImage(image);
    const photoLink = uploadedImage.fileUrl;

    const pointOffer = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value,
      imgBanner: String(photoLink),
    };

    const pointOfferResponse = await createPointOfferApi(pointOffer, jwt);
    console.log(pointOfferResponse);

    const userShopOffer = {
      ShopOfferId: pointOfferResponse.id,
      rewardsCount: rewardCountRef.current.value,
    };
    console.log(userShopOffer);

    const generateRewardResponse = await generateRewardApi(userShopOffer, jwt);
    console.log(generateRewardResponse);
    navigate("/profileEnt");
  }

  return (
    <>
      <Container className="my-5">
        <Form>
          <h2>Crear Punto de Oferta</h2>
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

          <Form.Group className="mb-3">
            <Form.Label>Cantidad de rewards</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresar cantidad"
              ref={rewardCountRef}
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

          <Button variant="primary" onClick={handleCreatePointOffer}>
            Crear Punto de Oferta
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreatePointOffer;
