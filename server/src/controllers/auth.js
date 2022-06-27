const {user} = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async (req,res) =>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
        name: joi.string().min(3).required(),
    });

    const {error} = schema.validate(req.body);

    if (error){
        return res.status(400).send({
           error : error.details[0].message
        })
    }

    try {
        const  salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            status: "customer"
        })

        const dataToken = {id: newUser.id}
        const token = jwt.sign(dataToken, process.env.TOKEN_KEY)

        res.status(200).send({
            message:"Registration Success",
            data: {
                name: newUser.name,
                email: newUser.email,
                token
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.login = async (req,res) =>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required(),
    });

    const {error} = schema.validate(req.body);

    if (error){
        return res.status(400).send({
           error : error.details[0].message
        })
    }

    try {
        const userData = await user.findOne({
            where: {
                email:req.body.email,
            },
        });

        if(!userData){
            return res.status(400).send({
                message:`Email ${req.body.email} Not Found`
            })
        }

        const hashPassword = await bcrypt.compare(req.body.password, userData.password)

        if(!hashPassword){
            return res.status(400).send({
                message:"Wrong Password"
            })
        }


        const dataToken = {id:userData.id}
        const token = jwt.sign(dataToken, process.env.TOKEN_KEY)


        res.status(200).send({
            message:"Login Success",
            data: {
                name: userData.name,
                email: userData.email,
                status: userData.status,
                token
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude : ["createdAt","updatedAt","password"]
            }
        });

    //    console.log(dataUser)

        if(!dataUser){
            res.status(404).send({
                status: "Failed"
            })
        }

        res.send({
            status:"Success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    status: dataUser.status
                }
            }
        })
        
    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}