import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOffer } from "../../controllers/OfferController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';

function Offer() {
    const { id } = useParams();
    const [offer, setOffer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getOffer(id)
            .then(o => setOffer(o))
    }, [])

    function handleArrowOnClick() {
        navigate("/");
    }

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-left">
                    <Col xs={12} className="text-center" style={{ display: "contents" }}>
                        <div style={{ position: "relative", width: "fit-content", padding: "5px" }}>
                            <Image
                                src="https://imgs.search.brave.com/F-BI6Qdc1yenyGLvo9uktjZYHdbVkB6e_XD16qZD-hw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODQ4/NTQ5Mjg2L3Bob3Rv/L2RyZWFtLWhvbWUt/bHV4dXJ5LWhvdXNl/LXN1Y2Nlc3MuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWNq/aG9OcW9tTlR4Z1lX/eHVaOUV2NVB4Wmg2/V1k5NnZ2REdmM0hs/LTd4LVU9"
                                alt="Example"
                                rounded
                                fluid
                                className="mb-4"
                            />
                            <FontAwesomeIcon icon={faArrowLeft} className="arrowOffer" style={{ color: "black" }} onClick={handleArrowOnClick} />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-left">
                    <Col xs={12} className="text-left">
                        <h1 className="mb-3">{offer.title}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-left">
                    <Col xs={2} lg={1} className="text-left">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </Col>
                    <Col xs={3} lg={2} className="text-left">
                        <p className="lead">{offer.city}</p>
                    </Col>
                    <Col xs={7} lg={3} className="text-left">
                        <p className="lead">{offer.street}</p>
                    </Col>
                </Row>
                <Row className="justify-content-left">
                    <Col xs={2} lg={1} className="text-left">
                        <FontAwesomeIcon icon={faUser} />
                    </Col>
                    <Col xs={3} lg={2} className="text-left">
                        <p className="lead">{offer.capacity}</p>
                    </Col>
                </Row>
                <Row className="justify-content-left">
                    <Col xs={12} className="text-left">
                        <p className="lead">
                            {offer.description}
                        </p>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg">Join</Button>
                </div>

            </Container>
        </>
    )
}

export default Offer;