/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route , useNavigate } from 'react-router-dom';
import { UserContext } from "./context/userContext";
import {useContext, useEffect} from "react";



// "pages" component
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/customer/HomePage";
import DetailPage from "./components/customer/DetailPage";
import Profile from "./components/customer/Profile";
import AddProfile from "./components/customer/AddProfile";
import Category from "./components/admin/category/Category";
import EditCategory from "./components/admin/category/EditCategory";
import ProductList from "./components/admin/productlist/ProductList";
import EditProductList from "./components/admin/productlist/EditProductList";
import AdminComplain from "./components/admin/AdminComplain";
import CustomerComplain from "./components/customer/CustomerComplain";
import AddProduct from './components/admin/productlist/AddProduct';
import AddCategory from './components/admin/category/AddCategory';
import Rate from "./components/features/AddRate";


import {API, setAuthToken} from "./config/api"

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() =>{
    
    if(state.isLogin === false){
      navigate('/')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

 const checkAuth = async () => {
  try {
    
    const response = await API.get("/check-auth")

    if(response.status === 404) {
      return dispatch({
        type: "AUTH_ERROR"
      })
    }

    let payload = response.data.data.user;
    payload.token = localStorage.token

    dispatch({
      type: "USER_SUCCESS",
      payload
    })
    

  } catch (error) {
    console.log(error)

  }
 }
  
 useEffect(() => {
  checkAuth()
 },[])

  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail-page/:id" element={<DetailPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/category-list/" element={<Category />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/edit-product-list/:id" element={<EditProductList />} />
        <Route path="/complain" element={<CustomerComplain />} />
        <Route path="/admin-complain" element={<AdminComplain />} />
        <Route path="/review/:id" element={<Rate />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Routes>
      
  );
}


export default App;
