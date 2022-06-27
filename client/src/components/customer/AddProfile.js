import {Container,Button,Form,FloatingLabel } from "react-bootstrap";
import NavigationBar from "../subComponent/NavigationBarCustomer"
import {useMutation } from "react-query"
import { API } from "../../config/api"
import React, { useState,useContext } from "react";
import {useNavigate} from "react-router-dom"
import {UserContext} from "../../context/userContext"


function AddProfile() {
    const title = 'Edit Profile';
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate()
    const [state] = useContext(UserContext);

    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
      };
      const handleChangeGender = (e) => {
        setGender(e.target.value);
      };
      const handleChangeAddress = (e) => {
        setAddress(e.target.value);
      };

      
      

        const handleSubmit = useMutation(async (e) => {
            try {
                e.preventDefault();

                const data = {
                    phone,
                    gender,
                    address,
                    idUser :  state.user.id
                }
                console.log(data)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                },
                };
                console.log(data);
                const response = await API.post('/profile',data, config);
                navigate("/profile")
            } catch (error) {
                console.log(error);
            }
        });
  return (
    <Container >
        <NavigationBar />
      <div className="editcat">
        <div>
            <h3 className="editcattit">Add Profile</h3>

    <form onSubmit={(e) => handleSubmit.mutate(e)}>

        <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
            <Form.Control type="number" className="frmcolor" name="phone"   onChange={handleChangePhone}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput " label="Gender" className="mb-3">
            <Form.Select aria-label="Floating label select example" className="frmcolor" name="gender" onChange={handleChangeGender}>
                <option></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Address" className="mb-5">
            <Form.Control type="text" className="frmcolor" name="address" onChange={handleChangeAddress}/>
        </FloatingLabel>

        <Button type="submit" className="editcatbtn">Save</Button>
    </form>
        </div>
        </div>
    </Container>
  )
}

export default AddProfile