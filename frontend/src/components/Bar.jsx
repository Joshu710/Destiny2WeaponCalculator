import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/Bar.css";

function Bar() {
  return (
    <>
      <div className="bar">
        <Navbar expand="lg">
          <div
            data-bs-theme="light"
            className="d-flex w-100 flex-row align-items-center justify-content-around"
          >
            <Navbar.Brand className="text-light" href="/">
              CMSC 437/461 Project
            </Navbar.Brand>
            <div className="d-flex justify-content-evenly">
              <Nav.Link className="p-3 text-light" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="p-3 text-light" href="/about">
                About
              </Nav.Link>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
}

export default Bar;
