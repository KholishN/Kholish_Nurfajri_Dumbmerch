const {review,product,user} = require("../../models")

exports.addReview = async (req, res, err ) => {
    try {
        const idBuyer = req.user.id
        let reviews = await review.create({
            ...req.body,
            idBuyer: req.user.id
    })

    if(reviews.rating > 5 ){
        res.send({
            message:`Maximum Value Rating Is 5`
        })
    }

    res.send({
        status: "Success",
        message: `Thanks For Your Review on id: ${req.body.idProduct}`,
        data: {
            id: reviews.id,
            rating: reviews.rating,
            review: reviews.review
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

exports.getReview = async (req, res) => {
    try {
        const reviews = await review.findAll({
            include:[
                {
                    model: user,
                    as: "reviewer",
                    attributes: {
                        exclude: ["createdAt", "updatedAt","password",],
                    },
                },

                {
                    model: product,
                    as: "reviewProduct",
                    attributes: {
                        exclude: ["createdAt", "updatedAt","idUser"],
                    },
                },
            ],

            attributes: {
                exclude: ["createdAt", "updatedAt","idBuyer","idProduct","idTransaction"],
            },
        })

        res.send({
            status: "Success",
            reviews
        })
    } catch (error) {
        console.log(error)

        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.getReviewDetail = async (req, res) => {
    try {
        const id = req.params.id
        let ReviewDetail = await review.findOne({
            where: {
                    id,
                },
                include: [
                    {
                        model: user,
                        as: "reviewer",
                        attributes: {
                            exclude: ["createdAt", "updatedAt","password",],
                        },
                    },
    
                    {
                        model: product,
                        as: "reviewProduct",
                        attributes: {
                            exclude: ["createdAt", "updatedAt","idUser"],
                        },
                    },
                ],
    
                attributes: {
                    exclude: ["createdAt", "updatedAt","idBuyer","idProduct","idTransaction"],
                },
            });

            if(!ReviewDetail){
                return res.send({
                    message:`User with id: ${id} Not Found`
            })
        }
        ReviewDetail = JSON.parse(JSON.stringify(ReviewDetail));

        res.send({
            status: "Success",
            message: `Here Product with id: ${id}`,
            data : {
                ...ReviewDetail,
                image: process.env.PATH_FILE + ReviewDetail.image,
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

exports.getProductReview = async (req, res) => {
    try {
        const id = req.params.id
        let ReviewDetail = await product.findOne({
            where: {
                    id,
                },
                include: [
                    {
                        model: review,
                        as: "productReview",
                        attributes: {
                            exclude: ["createdAt", "updatedAt","idUser"],
                        },
                    },
                ],
    
                attributes: {
                    exclude: ["createdAt", "updatedAt","idBuyer","idProduct","idTransaction"],
                },
            });

            if(!ReviewDetail){
                return res.send({
                    message:`User with id: ${id} Not Found`
            })
        }
        ReviewDetail = JSON.parse(JSON.stringify(ReviewDetail));

        res.send({
            status: "Success",
            message: `Here Product with id: ${id}`,
            data : {
                ...ReviewDetail,
                image: process.env.PATH_FILE + ReviewDetail.image,
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