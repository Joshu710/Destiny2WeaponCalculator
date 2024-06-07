import Form from "react-bootstrap/Form";
import { useRef, useEffect } from "react";

function FilterButton(props) {
  const filterRef = useRef(null);

  // Returns filter value
  const filterCallback = (event) => {
    event.preventDefault();
    const selectedValue = event.currentTarget.value;

    props.filterValue(selectedValue);
  };

  useEffect(() => {
    const selectedValue = filterRef.current.value;
    props.filterValue(selectedValue);
  }, [props]);

  return (
    <Form.Select
      aria-label="Search Filter"
      ref={filterRef}
      onChange={filterCallback}
    >
      <option value="1">Weapon</option>
      <option value="2">Perk</option>
    </Form.Select>
  );
}

export default FilterButton;
