import {Container,Button,InputGroup,Form} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import { useMutation } from 'react-query';
import { API } from '../../../config/api';
import React, { useState } from 'react';
import {useNavigate} from "react-router";


function AddCategory() {
  // title
    const title = 'Add Category';
    document.title = 'Dumbmerch | ' + title;

    const navigate = useNavigate()
    const [Category, setCategory] = useState("");



    const handleChange = (e) => {
        setCategory(e.target.value);
      };

    const handleSubmit = useMutation(async (e) => {
      try {
          e.preventDefault();

          const config = {
              headers: {
                  'Content-type': 'application/json',
          },
          };
          const body = JSON.stringify({name : Category});
          const response = await API.post('/category',body, config);

          navigate("/category-list")
      } catch (error) {
          console.log(error);
      }
    });

       


  return (
    <Container >
        <NavigationBarAdmin />
        <div className="editcat">
          <div>
            <h3 className="editcattit">Add Category</h3>

          <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <InputGroup >
            <Form.Control
              placeholder="Category"
              aria-label="Category"
              aria-describedby="basic-addon1"
              className="editcatinput"
              onChange={handleChange}
              name="name"
              />
          </InputGroup>

              <Button type="submit" className="editcatbtn">Add</Button>
          </form>

        </div>
        </div>
    </Container>
  )
}

export default AddCategory