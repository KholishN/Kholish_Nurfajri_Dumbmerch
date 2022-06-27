import {Container,Button,InputGroup,Form} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import {useQuery,useMutation } from "react-query"
import { API } from "../../../config/api"
import { useParams,  } from "react-router";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"


function EditCategory() {
  // title
  const title = 'Edit Category';
  document.title = 'Dumbmerch | ' + title



  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });

  let {data: categories} = useQuery("categriesChace", async () => {
    const response = await API.get("/category/" + id)
    setCategory({ name: response.data.Category.name })
  })

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const body = JSON.stringify(category);

      const config = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.patch("/category/" + id, body, config);

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
              <h3 className="editcattit">Edit Category</h3>

          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <InputGroup >
              <Form.Control
                placeholder="Category"
                aria-label="Category"
                aria-describedby="basic-addon1"
                className="editcatinput"
                onChange={handleChange}
                value={category?.name}
              />
            </InputGroup>
              <Button type="submit" className="editcatbtn">Save</Button>
      </form>

        </div>
        </div>
    </Container>
  )
}

export default EditCategory