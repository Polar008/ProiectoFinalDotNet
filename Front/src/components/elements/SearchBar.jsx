import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
    return (
        <div className="search-bar-container">
            <Form className="d-flex">
                <InputGroup>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Button variant="outline-primary">
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SearchBar;