import "./App.css";
import Bar from "./components/Bar";
import Home from "./components/Home";
import About from "./components/About";
import Selector from "./components/Selector";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState(0);
  const [weaponId, setWeaponId] = useState(0);
  const [table, setTable] = useState("");

  return (
    <>
      <div data-bs-theme="light">
        <BrowserRouter>
          <Bar></Bar>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  search={setSearchText}
                  filterValue={setFilterValue}
                ></Home>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route
              path="/selector"
              element={
                <Selector
                  search={setSearchText}
                  filterValue={setFilterValue}
                  weapon={weaponId}
                  table={table}
                ></Selector>
              }
            ></Route>
            <Route
              path="/results"
              element={
                <Results
                  searchTerm={searchText}
                  filterValue={filterValue}
                  weapon={setWeaponId}
                  table={setTable}
                ></Results>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
