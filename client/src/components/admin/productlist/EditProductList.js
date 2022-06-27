/* eslint-disable react-hooks/exhaustive-deps */
import {Container,Button,InputGroup,Form} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import {useParams, useNavigate} from "react-router"
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { API } from '../../../config/api';
import CheckBox from "../../subComponent/Checkbox"


function EditProductList() {
    const title = 'Edit Product';
    document.title = 'Dumbmerch | ' + title;

    const { id } = useParams();
    const navigate = useNavigate()

    const [ categories, setCategories] = useState([]);
    const [ categoryId, setCategoryId ] = useState([]);
    const [ preview, setPreview ] = useState(null);
    const [ product, setProduct ] = useState({});

    const [form, setForm] = useState({
        image: "",
        title: "",
        desc: "",
        price: "",
        qty: ""
    });

    let { data: products } = useQuery("products", async () => {
        const response = await API.get("/product/" + id)

        return  response.data.data

    }) ;

    let { data: categoriesData, } = useQuery("categories", async () => {
        const response = await API.get("/categories");
        return response.data.Category
    });

    useEffect(() => {
        if(products) {
            setPreview(products.image);
            setForm({
                ...form,
                title: products.title,
                desc: products.desc,
                price: products.price,
                qty: products.qty,
                image: products.image
            });
            setProduct(products)
        }

    if(categoriesData) {
        setCategories(categoriesData)
        }
    },[products]);

    const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked

    if(checked === true) {
        setCategoryId([...categoryId, parseInt(id)]);
    }else{
        let newCategoryId = categoryId.filter((categoryIdItem) => {
            return categoryIdItem !== id
        });
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
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            
            const config = {
                headers : {
                    'Content-type': 'application/json'
                }
            };

            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
              }
                formData.set("title", form.title);
                formData.set("desc", form.desc);
                formData.set("price", form.price);
                formData.set("qty", form.qty);
                formData.set("categoryId", categoryId);

            const response = await API.patch("/product/"+ product.id, formData, config);
            console.log(response.data)

            navigate("/product-list")
        } catch (error) {
            console.log(error)
        }
    });
    

    useEffect(() => {
        const newCategoryId = product?.categories?.map((item) => {
            return item.id
        })
        setCategoryId(newCategoryId);
    },[product])

  return (
    <Container >

    <NavigationBarAdmin />
        <div className="editlp">
        <div>
            <h3 className="editcattit">Edit Product</h3>
            </div>

        <form onSubmit={(e) => handleSubmit.mutate(e)}>
        {!preview ?  (
        <div>
        <img src={form.image} style={{maxWidth: '150px', maxHeight: '150px', marginBottom:"30px", objectFit: 'cover',}}  alt="preview"/>
        </div>
             ) : (
        <div>
            <img src={preview} style={{maxWidth: '150px', maxHeight: '150px',marginBottom:"30px", objectFit: 'cover',}}  alt="preview"/>
        </div>
            )}
        <Form.Control type="file" size="md" className="btnfile" onChange={handleChange} name="image" id="upload" />

        <InputGroup >
        <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="title"
            onChange={handleChange}
            value={form?.title}
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
        value={form?.desc}
            />
        </InputGroup>

        <InputGroup >
        <Form.Control
            placeholder="Price"
            aria-label="Price"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="price"
            onChange={handleChange}
            value={form?.price}
        />
        </InputGroup>

        <InputGroup >
        <Form.Control
            placeholder="Quantity"
            aria-label="Quantity"
            aria-describedby="basic-addon1"
            className="editcatinput"
            name="qty"
            onChange={handleChange}
            value={form?.qty}
        />
        </InputGroup>

                <div className="card-form-input mt-1 mb-5 px-2 py-1 pb-2">
                <div
                    className="text-secondary mb-1"
                    style={{ fontSize: '15px' }}
                >
                    Category
                </div>

                {product &&
                categories?.map((item, index) => (
                <div key={index} className=" me-4 catee" >
                <CheckBox
                    categoryId={categoryId} 
                    value={item?.id} 
                    handleChangeCategoryId={handleChangeCategoryId}
                    name="category"
                    />
                <label className="ms-2" htmlFor="category">{item?.name}</label>
                </div>
                    ))}
                </div>

                <Button type="submit" className="editcatbtn mb-5">Save</Button>
        </form>
        </div>
    </Container>
  )
}

export default EditProductList