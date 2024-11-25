import { Card, Container, Row, Col } from "react-bootstrap";

function Home() {
    return (
        <Container className="my-4">
            <Row>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Col
                        key={index}
                        xs={6} /* 2 cards per row on small screens */
                        lg={2} /* 5 cards per row on large screens (12/5 = approx 2 cols each) */
                        className="mb-4"
                    >
                        <Card>
                            <Card.Img
                                variant="top"
                                src={`https://imgs.search.brave.com/6BBU9u_WMLihxAqxYL69Fsnn9huqfdchw7mYW75BIH0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGFjZXNmYWx0YS5v/cmcvSU8vdXN1YXJp/b3MvdHVmb3RvLzlm/YjI3MjNmNzUwOTQz/NWZiZGMxYWQxMDUw/ZjIzZTE3XzIyNVgy/MjVfcy5qcGc`}
                                alt={`Card ${index + 1}`}
                            />
                            <Card.Body>
                                <Card.Title>Card {index + 1}</Card.Title>
                                <Card.Text>
                                    This is a simple description for card {index + 1}.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Home;