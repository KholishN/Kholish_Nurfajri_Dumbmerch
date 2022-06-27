const {category,categoryProduct} = require("../../models");



exports.addCategory = async (req, res) => {
    try {
        const Category = await category.create(req.body)
        

        res.send({
            status: "Success",
            message: "Add Category Finished ",
            Category
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
};

exports.getCategories = async (req, res) => {
    try {

        const Category = await category.findAll({
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: "Here Categories",
            Category
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getCategory = async (req, res) => {
    try {

        const id = req.params.id

        const Category = await category.findOne({
            where:{
                id
            },

            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: `Here Category with id: ${id}`,
            Category
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const Category = req.body;

        const data = await category.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        if(!data){
            return res.send({
                message:`Category with id: ${id} Not Found`
            })
        }
        
        await category.update(Category,{
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: `Update Category with id: ${id} Success`,
            Category
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await category.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message:`Category with id: ${id} Not Found`
            })
        }
        
        
        await category.destroy({
            where : {
                id
            }
        })

        res.send({
            status: "Success",
            message: `Delete Category with id: ${id} Success`,
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.addCategoryProduct = async (req, res) => {
    try {
        const Category = await categoryProduct.create(req.body)
        

        res.send({
            status: "Success",
            message: "Add Category Product Finished ",
            categoryProduct
        })
    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
};