const express = require("express");

const router = express.Router();

// 
const {addUsers, getUsers, getUser, updatetUser, deletetUser, getProfile, addProfile} = require("../controllers/user")
const {addProduct, getProducts, getUserProduct, getProductDetail, updateProduct, deleteProduct} = require("../controllers/product")
const {addCategory, getCategories, getCategory, updateCategory, deleteCategory, addCategoryProduct} = require("../controllers/category")
const {register, login, checkAuth} = require("../controllers/auth")
const {getAllTransaction, buyProduct, notification, getTransactionDetail, getUserTransaction, getProductTransaction} = require("../controllers/transaction")
const  {addReview, getReview, getReviewDetail, getProductReview} = require("../controllers/review")

// middleware
const {auth} = require("../middleware/auth")
const {uploadFile} = require("../middleware/uploadFile")



// user
router.post("/user", addUsers)
router.get("/users", getUsers)
router.get("/user/:id",auth, getUser)
router.patch("/user/:id",auth, updatetUser)
router.delete("/user/:id",auth, deletetUser)
// profile
router.get("/profile",auth, getProfile)
router.post("/profile",auth, addProfile)

// product
router.post("/product",auth, uploadFile('image'), addProduct)
router.get("/products", getProducts)
router.get("/product/:id",auth, getProductDetail)
router.get("/user-product", getUserProduct)
router.patch("/product/:id",auth,uploadFile('image'), updateProduct)
router.delete("/product/:id",auth, deleteProduct)

// Category
router.post("/category",auth, addCategory)
router.post("/category-product", addCategoryProduct)
router.get("/categories", getCategories)
router.get("/category/:id",auth, getCategory)
router.patch("/category/:id",auth, updateCategory)
router.delete("/category/:id",auth, deleteCategory)

// transaction
router.get("/transaction",auth, getAllTransaction)
router.get("/transaction/:id",auth, getTransactionDetail)
router.post("/transaction",auth, buyProduct)
router.post("/notification", notification)
router.get("/user-transaction/:id", getUserTransaction)
router.get("/product-transaction/:id", getProductTransaction)




// review
router.post("/review",auth, addReview)
router.get("/review", getReview)
router.get("/review/:id", getReviewDetail)
router.get("/product-review/:id", getProductReview)



//register & login
router.post("/register", register)
router.post("/login", login)
router.get("/check-auth",auth, checkAuth)



module.exports = router