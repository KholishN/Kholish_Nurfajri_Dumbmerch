import Logo from "../../images/Frame.png"
import {Navbar,Container,Nav} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../context/userContext'
import { useContext } from "react"


function NavigationBarCustomer() {

    const navigate = useNavigate()

    const compalin = () => {
      navigate("/complain")
  }
  
  const [state, dispatch] = useContext(UserContext)
  const ids = state.user.id
    const profile = () => {
      navigate("/profile/" + ids )
}


    const logout = () => {
      dispatch({
          type: "LOGOUT"
      })
      navigate("/")
    }


  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark">
    <Container>
    <Navbar.Brand href="/home">
          <img className="logo" src={Logo} alt="Logo" />
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      </Nav>
      <Nav className="navContent">
        <Nav.Link className="text-light active" onClick={compalin}>Complain</Nav.Link>
        <Nav.Link className="text-light active" onClick={profile}>Profile</Nav.Link>
        <Nav.Link className="text-light active" onClick={logout}>Logout</Nav.Link>
  
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}

export default NavigationBarCustomer