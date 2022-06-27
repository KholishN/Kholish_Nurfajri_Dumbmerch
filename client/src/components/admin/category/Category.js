/* eslint-disable react-hooks/exhaustive-deps */
import {Container,Button,Table} from "react-bootstrap";
import NavigationBarAdmin from "../../subComponent/NavigationBarAdmin"
import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import DeleteData from "../../subComponent/ModalDelete";
import {useQuery, useMutation} from "react-query"
import { API } from "../../../config/api"


function Category() {
  // title
  const title = 'Category';
  document.title = 'Dumbmerch | ' + title

  const navigate = useNavigate();


  const handleNavigateToEditCategory = (id) => {
      navigate("/edit-category/" + id)
  }

  const addCategory = () => {
      navigate("/add-category")
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
        await API.delete(`/category/${id}`);
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

  

  let {data: categories, refetch} = useQuery("categriesChace", async () => {
      const response = await API.get("/categories")
      return response.data.Category
  })


  return (
    <Container >
        <NavigationBarAdmin />

      <div className="ContCat">
          <h4 className="listcat">List Category</h4>
          <Button className="bg-secondary addC btneditcat mb-3 py-2" onClick={addCategory} >Add Category</Button>

        <Table striped  hover variant="dark">
          <thead>
              <tr>
              <th className="catno">No</th>
              <th className="catname">Category Name</th>
              <th className="cataction">Action</th>
              </tr>
            </thead>

          <tbody>
            {categories?.map((item, index) => (
                <tr key={index}>
                    <td className="catno">{index + 1}</td>
                    <td className="catname">{item?.name}</td>
                    <td className="cataction">

                        <Button className="bg-success  btneditcat btn-sm" onClick={() => 
                          {handleNavigateToEditCategory(item?.id)}}>
                            Edit
                        </Button>

                        <Button className="bg-danger  btndeletecat btn-sm" onClick={() => 
                          {handleDelete(item.id);}} >
                            Delete
                        </Button>

                    </td>
                </tr>
              ))}
                </tbody>

        </Table>

        </div>
        <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
    </Container>

  )
}

export default Category