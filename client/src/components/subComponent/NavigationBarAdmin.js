import Logo from "../../images/Frame.png"
import {Navbar,Container,Nav} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../context/userContext'
import { useContext } from "react"



function NavigationBarAdmin() {
  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  const logout = () => {
    dispatch({
        type: "LOGOUT"
    })
    navigate("/")
  }

  const adminComplain = () => {
    navigate("/admin-complain")
}

  const category = () => {
    navigate("/category-list")
  }
  const productList = () => {
    navigate("/product-list")
  }


  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark">
    <Container>
    <Navbar.Brand href="/product-list">
          <img className="logo" src={Logo} alt="Logo" />
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      </Nav>
      <Nav className="navContent">
        <Nav.Link className="text-light" onClick={adminComplain}>Complain</Nav.Link>
        <Nav.Link className="text-light" onClick={category}>Category</Nav.Link>
        <Nav.Link className="text-light" onClick={productList}>Product</Nav.Link>
        <Nav.Link className="text-light" onClick={logout}>Logout</Nav.Link>
  
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}

export default NavigationBarAdmin