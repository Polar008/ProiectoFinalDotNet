import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getShopOffer,
  updateShopOfferApi,
} from "../../controllers/PointOfferController";
import "bootstrap/dist/css/bootstrap.min.css";
// import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../controllers/UploadsController";
import { URL } from "../../config";

function EditPointOffer() {
  const { id } = useParams();
  const [shopOfferData, setShopOfferData] = useState(null);

  const navigate = useNavigate();
  const jwt = JSON.parse(localStorage.getItem("storageJwt"));

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const costRef = useRef(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  async function handleUpdatePointOffer() {

    const uploadedImage = await uploadImage(image);
    const photoLink = uploadedImage.fileUrl;

    const updatedShopOffer = {
      id: id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value,
      imgBanner: String(photoLink),
    };

    try {
      await updateShopOfferApi(id, updatedShopOffer, jwt);
      navigate("/profileEnt");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getShopOffer(id, jwt)
      .then((data) => {
        console.log(data);
        setShopOfferData(data);
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        costRef.current.value = data.cost;
        setPreviewUrl(`${URL}/uploads/${data.imgBanner}`);
      })
      .catch(() => {});
  }, [id]);

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

          <Button variant="primary" onClick={handleUpdatePointOffer}>
            Actualizar Punto Oferta
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditPointOffer;
