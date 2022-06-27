const {user, profile} = require("../../models");

exports.addUsers = async (req, res) => {
    try {
        data = req.body
        const dataUsers = await user.create(data)

        res.send({
            status: "Success",
            message: "Add User Finished ",
            dataUsers
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const dataUsers = await user.findAll({
            include: {
                model:profile,
                as:"profile"
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: "Here Data Users",
            dataUsers
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const dataUser = await user.findOne({
            where: {
              id
            },
            include: {
                model:profile,
                as:"profile"
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
            attributes: {
                exclude: ["password","createdAt","updatedAt"]
            }
          })

          if(!dataUser){
            return res.send({
                message:`User with id: ${id} Not Found`
            })
        }

        res.send({
            status: "Success",
            message: `Here Data User id: ${id}`,
            dataUser
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.addProfile = async (req, res) => {
    try {
        data = req.body
        const dataProfile = await profile.create(data)

        res.send({
            status: "Success",
            message: "Add User Finished ",
            dataProfile
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const id = req.params.id

        const dataUser = await profile.findAll({
            include: {
                model:user,
                as: "user"
            }
        })

          if(!dataUser){
            return res.send({
                message:`User with id:  Not Found`
            })
        }

        res.send({
            status: "Success",
            message: `Here Data Profile User id: `,
            dataUser
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.updatetUser = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message:`User with id: ${id} Not Found`
            })
        }
        
        await user.update(newData,{
            where: {
                id
            }
        })

        res.send({
            status: "Success",
            message: `Update User with id: ${id} Success`,
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.deletetUser = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message:`User with id: ${id} Not Found`
            })
        }
        
        
        await user.destroy({
            where : {
                id
            }
        })

        res.send({
            status: "Success",
            message: `Delete User with id: ${id} Success`,
        })

    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}