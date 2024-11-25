import { Form, Button } from "react-bootstrap";

function SerchBar() {
    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
        </Form>
    )
}

export default SerchBar;