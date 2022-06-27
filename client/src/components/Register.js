import {Button,Card,InputGroup,FormControl,Container,Alert} from "react-bootstrap";
import Logo from "../images/Frame.png";
import {useNavigate} from "react-router-dom";
import {useState, useContext} from "react";
import { UserContext } from "../context/userContext"; 
import {useMutation} from "react-query"
import {API} from "../config/api"




const Register = () => {

    const title = "Register"
    document.title = "Dumbmerch | " + title;

    const [state, dispatch] = useContext(UserContext);
    console.log(state)


    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const handleNavigateToLogin = () => {
        navigate("/")
    }

    const [registers, setRegisters] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleOnChange = (e) =>{
        setRegisters({
            ...registers,
            [e.target.name]: e.target.value


        })
        // console.log(e.target.name)
        // console.log(e.target.value)

    }

    const handleOnSubmit = useMutation(async (e) =>{
        try {
            e.preventDefault();

        const config = {
            headers: {
                "Content-type" : "application/json"
            },
        };

        const body = JSON.stringify(registers);

        const response = await API.post("/register", body, config)
        console.log(response)

        navigate("/")

        console.log(registers)


        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Password must have a minimum of 4 characters
                </Alert>
            );
            setMessage(alert)
            console.log(error)
        }
    })

    

    return(
        
            <Container className="d-flex loginCard">
            <div className="left me-5">
                <img src={Logo} alt="logo" className="mb-5" />
                <h1 className="text-light mb-3">Easy,Fast and Reliable</h1>
                <p className="text-secondary mb-5">Go shopping for merchandise,just go merch shopping.
                                                    the biggest merchandise in <b>Indonesia</b></p>
                <Button className="me-5 py-1" onClick={handleNavigateToLogin}>Login</Button>
                <a href="/register" className="mt-5 text-light text-decoration-none">Register</a>
                </div>


            <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="right ms-5">
                <Card style={{ width: '20rem' }} className="formLogin text-light p-2">
                    <Card.Body>

                {message && message}
                        <Card.Title className="mb-4 fs-2">Register</Card.Title>

                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            type="text"
                            className="loginInput"
                            name="name"
                            onChange = {handleOnChange}
                            value={registers.name}
                            />
                            </InputGroup>

                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            className="loginInput"
                            name="email"
                            onChange = {handleOnChange}
                            value={registers.email}
                            />
                            </InputGroup>

                        <InputGroup className="mb-3" >
                            <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            className="loginInput"
                            name="password"
                            onChange = {handleOnChange}
                            value={registers.password}
                            />
                            </InputGroup>

                        <Button className="mt-4 loginbtn"
                                type="submit"
                                >Register</Button>
                        </Card.Body>
                    </Card>
            </div>
            </form>
            </Container>

    )
};

export default Register