/* eslint-disable react-hooks/exhaustive-deps */
import {Container,Button,Table} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import DeleteData from "../../subComponent/ModalDelete"
import {useQuery, useMutation} from "react-query"
import { API } from "../../../config/api"
import Rupiah from "rupiah-format"



function ProductList() {
    const title = 'Product';
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate();
    const handleNavigateToEditProduct = (id) => {
        navigate("/edit-product-list/" + id)
    }

    const AddProduct = () => {
        navigate("/add-product")
    }

    const [confirmDelete, setConfirmDelete] = useState(null);
    const [idDelete, setIdDelete] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (id) => {
      setIdDelete(id)
        handleShow();
      };

    const deleteById = useMutation(async (id) => {
      try {
        await API.delete(`/product/${id}`);
        refetch();
      } catch (error) {
        console.log(error);
      }
    });

    useEffect(() => {
      if (confirmDelete) {

        handleClose();
        deleteById.mutate(idDelete)
        setConfirmDelete(null);
      }
    }, [confirmDelete]);


    
    let {data: products, refetch} = useQuery("products", async () => {
        const response = await API.get("/products")
        console.log( response)
        return response.data.products
    })
    console.log(products)

  return (
    
    <Container >
        <NavigationBarAdmin />

        <div className="contlp">
        <h3 className="lp">List Product</h3>
        <Button className="bg-secondary add btneditcat mb-3 py-2" onClick={AddProduct}>Add Product</Button>
        <Table striped  hover variant="dark">
            <thead>
                <tr>
                <th className="plno">No</th>
                <th className="plimg">Photo</th>
                <th className="plname">Product Name</th>
                <th className="pldesc">Product Desc</th>
                <th className="plprice">Price</th>
                <th className="plqty">Qty</th>
                <th className="plact">Action</th>
                </tr>
                </thead>
            <tbody>
            {products?.map((item, index) => (
                <tr key={index}>
                    <td className="pllno">{index + 1}</td>
                    <td className="pllimg">
                        <img src={item?.image} alt="ImageProduct" style={{width: '80px',height: '80px',objectFit: 'cover',}} />
                        </td>
                    <td className="pllname">{item?.title}</td>
                    <td className="plldesc">{item?.desc}</td>
                    <td className="pllprice">{Rupiah.convert(item?.price)}</td>
                    <td className="pllqty">{item?.qty}</td>
                    <td className="pllact">
                        <Button className="bg-success  btneditcat btn-lg" onClick={() => {handleNavigateToEditProduct(item?.id)}}>Edit</Button>
                        <Button className="bg-danger  btndeletecat btn-lg" onClick={() => {handleDelete(item.id)}}>Delete</Button>
                    </td>
                </tr>
                ))}
                </tbody>
        </Table>
        </div>
        <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </Container>
  )
}

export default ProductList