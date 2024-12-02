import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getOfferSearch } from "../../controllers/OfferController";
import { useNavigate } from "react-router-dom";
import { getShopOffersSearch } from "../../controllers/PointOfferController";

/* eslint react/prop-types: 0 */
function SearchBar({ location, isFilteredHome, isFilteredshop }) {
  //const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [articles, setArticles] = useState([]);
  //const data = ["aaaaaaaaa", "abaaaaaaaaa", "acaaaaaaaaa"];
  var jwt = JSON.parse(localStorage.getItem("storageJwt"));
  const navigate = useNavigate();

  useEffect(() => {
    if (location == "home") {
      getOfferSearch(jwt).then((o) => setArticles(o));
    } else if (location == "shop") {
      getShopOffersSearch(jwt).then((o) => setArticles(o));
    }
  }, []);

  function handleSuggestionClick(id) {
    navigate("/offer/" + id);
  }

  function handleInputChange(e) {
    const query = e.target.value;
    if (query) {
      const filtered = articles.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
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

  function handleButtonSearch() {
    let ids = [];
    filteredData.forEach((i) => ids.push(i));
    if(location == "home"){
      isFilteredHome(ids);
    }else if(location == "shop"){
      isFilteredshop(ids);
    }
    setShowDropdown(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleButtonSearch();
  }

  return (
    <div className="search-bar-container">
      <Form className="d-flex" onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
          />
          <Button variant="outline-primary" onClick={handleButtonSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>
        {showDropdown && (
          <Dropdown.Menu show className="w-50" style={{ top: "6%", zIndex: 1 }}>
            {filteredData.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSuggestionClick(item.id)}
              >
                {item.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Form>
    </div>
  );
}

export default SearchBar;
