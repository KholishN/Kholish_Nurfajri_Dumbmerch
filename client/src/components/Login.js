import {Button,Card,InputGroup,FormControl,Container,Alert} from "react-bootstrap";
import Logo from "../images/Frame.png";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useState,useContext} from "react";
import {useMutation} from "react-query";
import {API} from "../config/api";
import { UserContext } from "../context/userContext";




const Login = () => {

    const title = "Login";
    document.title = "Dumbmerch | " + title;

    const [state, dispatch] = useContext(UserContext)
    // console.log(state)

    const [message, setMessage] = useState(null)

    const navigate = useNavigate();
    const handleNavigateToLogin = () => {
        navigate("/")
    };

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) =>{
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
        // console.log(e.target.name)
        // console.log(e.target.value)

    }

    const handleOnSubmit = useMutation(async (e) =>{
        try {
        e.preventDefault();

        const config = {
            headers : {
                "Content-type": "application/json"
            }
        };

        const body = JSON.stringify(login);

        const response = await API.post("/login", body, config);

        const userStatus = response.data.data.status;

        dispatch({
            type: "LOGIN_SUCCESS" ,
            payload: response.data.data
        });

        setMessage(null)
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.response.data.message}
                </Alert>
            );
            setMessage(alert);
            console.log(error.response.data.message);
        }
    });

    const checkAuth = () => {
        if(state.isLogin === true){
            if(state.user.status === "customer") {
                navigate("/home")
            } else  {
                navigate("/product-list")
            }
        }
    }
    checkAuth();

    return(

            <Container className="d-flex loginCard">
            <div className="left me-5">
                <img src={Logo} alt="logo" className="mb-5" />
                <h1 className="text-light mb-3">Easy,Fast and Reliable</h1>
                <p className="text-secondary mb-5">Go shopping for merchandise,just go merch shopping. 
                                                the biggest merchandise in <b>Indonesia</b></p>
                <Button className="me-5  py-1" onClick={handleNavigateToLogin}>Login</Button>
                <Link to="/register" className="mt-5 text-light text-decoration-none">Register</Link>
                </div>
            <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="right ms-5">
                <Card style={{ width: '20rem' }} className="formLogin text-light p-2">
                    <Card.Body>
                {message && message}
                        <Card.Title className="mb-4 fs-2">Login</Card.Title>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            className="loginInput"
                            id="email"
                            onChange={handleOnChange}
                            value={login.email}
                            name="email"
                            />
                            </InputGroup>
                        <InputGroup className="mb-3" >
                            <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            className="loginInput"
                            id="password"
                            onChange={handleOnChange}
                            value={login.password}
                            name="password"
                            />
                            </InputGroup>
                        <Button className="mt-4 loginbtn" type="submit">Login</Button>
                        </Card.Body>
                    </Card>
                    </div>
                </form>
            </Container>

    )
}
export default Login