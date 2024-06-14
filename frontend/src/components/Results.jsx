import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import FilterButton from "../components/filter";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Results(props) {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const [filterValue, setFilterValue] = useState(props.filterValue);
  const [selected, setSelected] = useState(props.filterValue);
  const [searchResults, setSearchResults] = useState([]);
  const [perkSearch, setPerkSearch] = useState(false);
  const [currentPerk, setCurrentPerk] = useState("");

  const navigate = useNavigate();

  // Call the API to get search results
  const getResults = async (event) => {
    let term = "";
    if (event) {
      event.preventDefault();
      term = event.target.value;
    } else {
      term = searchTerm;
    }

    try {
      let ext = "";
      if (selected == "1") {
        ext = "weapon";
      } else {
        ext = "perk";
      }
      const response = await axios.get(
        `http://192.168.10.41:8000/api/${ext}/${term}/`
      );
      setSearchResults(response.data.data);
      console.log(JSON.stringify(response, null, 2));
      setFilterValue(selected);
      setPerkSearch(false);
      setCurrentPerk("");
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const getFilter = (data) => {
    setSelected(data);
  };

  // Takes chosen weapon to selector page
  const toSelector = (event, id, table) => {
    event.preventDefault();
    props.weapon(id);
    props.table(table);
    navigate("/selector");
  };

  // Call API to return weapons that can use a certain perk
  const getPerk = async (event, id, name) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://192.168.10.41:8000/api/perk_weapons/${id}/`
      );
      setSearchResults(response.data.perk_weapons);
      console.log(JSON.stringify(response, null, 2));
      setFilterValue(1);
      setPerkSearch(true);
      setCurrentPerk(name);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="d-flex flex-column align-content-start  w-100">
      <div className="d-flex my-2  w-100 justify-content-center">
        <Form className="d-flex flex-row  w-100 justify-content-center">
          <div className="w-50  d-flex justify-content-center">
            <Form.Group className="flex-fill">
              <Form.Control
                type="text"
                id="weaponResults"
                aria-label="Form for entering a name of a weapon or perk"
                className="w-full"
                placeholder="Search for Weapon or Perk from current season"
                onChange={getResults}
              />
            </Form.Group>
            <div>
              <FilterButton filterValue={getFilter}></FilterButton>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <h1 className="text-center">
          <strong>Search Results</strong>
        </h1>
      </div>

      {searchResults.length == 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          <h1>No results</h1>
        </div>
      ) : (
        <>
          {perkSearch ? (
            <div className="">
              <h1 className="text-center">
                Weapons that can use {currentPerk}
              </h1>
            </div>
          ) : (
            <></>
          )}
          <div
            className="d-flex flex-wrap justify-content-center"
            aria-live="assertive"
          >
            {searchResults.map((item, index) => (
              <div key={item[0]} className="m-2">
                <Card
                  style={
                    filterValue == 1
                      ? { maxWidth: "600px" }
                      : { width: "350px" }
                  }
                  className="rounded-0"
                >
                  <Row className="g-0">
                    <Col md="4">
                      <Card.Img
                        variant="top"
                        src={filterValue == 1 ? item[7] : item[14]}
                        style={{ backgroundColor: "black" }}
                        className="rounded-0"
                        alt={item[0]}
                      />
                      {/* put link to weapon picture here */}
                    </Col>
                    <Col md="8">
                      <Card.Body
                        style={{ marginBottom: "-23px", marginTop: "-10px" }}
                      >
                        <Card.Title>
                          <strong>{item[1]}</strong>
                        </Card.Title>
                      </Card.Body>
                      {filterValue == 1 ? (
                        <ListGroup
                          className="list-group-flush"
                          variant="flush"
                          style={{ paddingTop: "0px" }}
                        >
                          <ListGroup.Item aria-label="Weapon Type">
                            {item[3]}
                          </ListGroup.Item>
                          <ListGroup.Item aria-label="Damage Type">
                            {item[4]}
                          </ListGroup.Item>
                          {perkSearch ? (
                            <ListGroup.Item>
                              {" "}
                              Available in Slot #{item[9]}
                            </ListGroup.Item>
                          ) : (
                            <></>
                          )}
                        </ListGroup>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <div>
                    <a
                      href="#"
                      className="stretched-link"
                      onClick={
                        filterValue == 1
                          ? (e) => toSelector(e, item[0], item[2])
                          : (e) => getPerk(e, item[0], item[1])
                      }
                      aria-label="Weapon or Perk Card"
                    ></a>{" "}
                    {/* put link to weapon page here */}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Results;
