import destinyLogo from "/destiny_logo.svg";
import SearchBar from "../components/searchbar";
import FilterButton from "../components/filter";
import { useState } from "react";

function Home(props) {
  const getSearch = (data) => {
    props.search(data);
  };

  const getFilter = (data) => {
    props.filterValue(data);
  };

  return (
    <div className="d-flex vh-100  w-100 justify-content-center  align-content-center">
      <div className=" w-25 d-flex flex-column justify-content-center text-center">
        <a className="" href="https://bungie.net" target="_blank">
          <img src={destinyLogo} className="w-25" alt="Destiny logo" />
        </a>
        <h1>Destiny 2 DPS Calculator</h1>
        <SearchBar
          search={getSearch}
          filterValue={getFilter}
          aria-label="Search bar weapons and perks"
        ></SearchBar>
      </div>
    </div>
  );
}

export default Home;
