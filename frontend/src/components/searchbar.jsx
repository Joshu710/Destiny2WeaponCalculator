import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "../components/filter";

function SearchBar(props) {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Takes search result to results page
  const searchCallBack = (event) => {
    event.preventDefault();
    props.search(searchText);
    navigate("/results");
  };

  const getFilter = (data) => {
    props.filterValue(data);
  };

  return (
    <>
      <div className="d-flex justify-content-center w-100">
        <Form onSubmit={searchCallBack}>
          <Form.Label htmlFor="weaponSearch">Search</Form.Label>
          <Form.Group>
            <Form.Control
              type="text"
              id="weaponSearch"
              aria-describedby="weaponSearchHelp"
              className="w-full"
              placeholder="Ex. Breakneck"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Form.Text id="weaponSearchHelp" muted>
              Please enter a weapon from the current season or a perk.
            </Form.Text>
          </Form.Group>
          <div className="w-50 mx-auto py-2">
            <FilterButton filterValue={getFilter}></FilterButton>
          </div>
          <Button as="input" type="submit" value="Submit" />{" "}
        </Form>
      </div>
    </>
  );
}

export default SearchBar;
