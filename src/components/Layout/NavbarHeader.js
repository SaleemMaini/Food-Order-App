import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import HeaderCartButton from "./HeaderCartButton";
import logo from "../../assets/logo.png";
const NavbarHeader = (props) => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" width="30" height="30" className="mx-3" />
          <span>Food order app</span>
        </Navbar.Brand>
        <Navbar.Brand>
          <HeaderCartButton onClick={props.cartOnClick} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default NavbarHeader;
