import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const data = ["aaaaaaaaa", "abaaaaaaaaa", "acaaaaaaaaa"];

  function handleSuggestionClick() {}

  function handleInputChange(e) {
    const query = e.target.value;
    setSearchTerm(query);
    if (query) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      console.log(filtered.length);
      if (filtered.length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  }

  return (
    <div className="search-bar-container">
      <Form className="d-flex">
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
          />
          <Button variant="outline-primary">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>
        {showDropdown && (
          <Dropdown.Menu show className="w-50" style={{ top: "6%", zIndex: 1 }}>
            {filteredData.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Form>
    </div>
  );
}
export default SearchBar;
