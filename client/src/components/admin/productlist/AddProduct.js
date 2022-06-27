import {Container,Button,InputGroup,Form} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import {useMutation,} from "react-query";
import {API} from "../../../config/api";
import {useNavigate} from "react-router";
import React, { useState, useEffect } from 'react';


function AddProduct() {
    const title = "Add Product";
    document.title = "Dumb Merch | " + title;

    let navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        image: "",
        title: "",
        desc: "",
        price: "",
        qty: "",
    })


    const getCategories = async () => {
        try {
            const response = await API.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleChangeCategoryId = (e) =>{
        const id = e.target.value;
        const checked = e.target.checked;

        if(checked === true) {
            setCategoryId([...categoryId, parseInt(id)]);
        }else{
            let newCategoryId = categoryId.filter((categoryIdItem) =>{
                return categoryIdItem !== id
            })
            setCategoryId(newCategoryId)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type ===  "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url)
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type" : "multipart/form-data"
                }
            };

            
            const formData = new FormData();
            formData.set("title", form.title)
            formData.set("desc", form.desc)
            formData.set("price", form.price)
            formData.set("qty", form.qty)
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("categoryId", categoryId);

            const response = await API.post("/product", formData, config)
            console.log(response.data)

            navigate("/product-list")
        } catch (error) {
            console.log(error)
        }
    })
    useEffect(() => {
        getCategories();
      }, []);

  return (
    <Container >

    <NavigationBarAdmin />
        <div className="editlp">
        <div>
            <h3 className="editcattit">Add Product</h3>
            </div>

        <form onSubmit={(e) => handleSubmit.mutate(e)} >
        {preview && (
                <div>
                  <img src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      marginBottom: "20px"
                    }}
                    alt={preview}
                  />
                </div>
              )}

        <Form.Control type="file" size="md" className="btnfile"  onChange={handleChange} name="image" />

        <InputGroup >
        <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="title"
            type="text"
            onChange={handleChange}
        />
        </InputGroup>

        <InputGroup>
        <Form.Control
        as="textarea"
        aria-label="Description"
        className="editcatinput tareaedit"
        placeholder="Description"
        name="desc"
        onChange={handleChange}
            />
        </InputGroup>

        <InputGroup >
        <Form.Control
            placeholder="Price"
            aria-label="Price"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="price"
            type="number"
            onChange={handleChange}
        />
        </InputGroup>

        <InputGroup >
        <Form.Control
            placeholder="Quantity"
            aria-label="Quantity"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="qty"
            type="number"
            onChange={handleChange}
        />
        </InputGroup>

        {/* <InputGroup >
        {categories?.map((item, index) => (
        <Form.Control
            placeholder="Category"
            aria-label="Category"
            aria-describedby="basic-addon1"
            className="editcatinput"
            onClick={handleChangeCategoryId}
        />
        ))}
        </InputGroup> */}

        <div className="card-form-input mt-1 mb-5 px-2 py-1 pb-2">
                <div className="text-secondary mb-1" style={{ fontSize: '15px' }}> Category </div>
                <div  className=" me-4 catee" >
                <label className="ms-2" htmlFor="category"  >
                <input type="checkbox" />
                </label>
                </div>
                </div>

        <Button className="editcatbtn" type="submit">Save</Button>
        </form>
        </div>
    </Container>
  )
}

export default AddProduct