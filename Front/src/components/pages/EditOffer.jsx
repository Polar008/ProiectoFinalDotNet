import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button, Image } from "react-bootstrap";
import {
  getOfferByIdApi,
  updateOfferApi,
} from "../../controllers/OfferController";
import { getProvinces } from "../../controllers/ProvinceController";
import { uploadImage } from "../../controllers/UploadsController";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

import { URL } from "../../config";

function EditOffer() {
  const { id } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [offerData, setOfferData] = useState(null);

  const jwt = JSON.parse(localStorage.getItem("storageJwt"));

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const provinceIdRef = useRef(null);
  const capacityRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    getProvinces(jwt)
      .then((o) => setProvinces(o))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getOfferByIdApi(id, jwt)
      .then((data) => {
        setOfferData(data);

        console.log(data);

        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        capacityRef.current.value = data.capacity;
        streetRef.current.value = data.street;
        cityRef.current.value = data.city;
        provinceIdRef.current.value = data.province.id;
        setPreviewUrl(`${URL}/uploads/${data.imgBanner}`);
      })
      .catch(() => {});
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleUpdateOffer() {
    const decodedToken = jwtDecode(jwt);

    let photoLink = offerData.imgBanner;
    if (image) {
      const uploadedImage = await uploadImage(image);
      photoLink = uploadedImage.fileUrl;
    }

    const updatedOffer = {
      id: id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      charityId: decodedToken.UserId,
      imgBanner: String(photoLink),
      provinceId: provinceIdRef.current.value,
      capacity: capacityRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
    };

    await updateOfferApi(id, updatedOffer, jwt);
  }

  return (
    <>
      <Container className="my-5">
        <Form>
          <h2>Editar Oferta</h2>
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
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresar capacidad"
              ref={capacityRef}
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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar calle"
              ref={streetRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar ciudad"
              ref={cityRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Provincia</Form.Label>
            <Form.Select
              aria-label="Default select example"
              ref={provinceIdRef}
            >
              {provinces.map((c, index) => (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleUpdateOffer}>
            Actualizar Oferta
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditOffer;
