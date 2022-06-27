const { user, transaction, product, profile  } = require("../../models");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");
const convertRupiah = require("rupiah-format");

exports.buyProduct = async (req, res) => {
    try {
        let data = req.body

        data = {
        id: parseInt(data.data.idProduct + Math.random().toString().slice(3, 8)),
        ...data.data,
        idBuyer: req.user.id,
        status: "pending",
        };
        
        const newData = await transaction.create(data);

        const buyerData = await user.findOne({
            include: {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
              },
            },
            where: {
              id: newData.idBuyer,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
            });

        let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        let parameter = {
            transaction_details: {
                order_id: data.id,
                gross_amount: newData.price,
            },
            callbacks: {
                finish: "https://dumbmerch.pagekite.me/profile"
              },
            credit_card: {
                secure: true,
            },
            customer_details: {
                full_name: buyerData?.name,
                email: buyerData?.email,
                phone: buyerData?.profile?.phone,
            },
            };

        const payment = await snap.createTransaction(parameter);
            console.log(payment)
        res.status(200).send({
            status: "pending",
            message:`Pending Your Transaction `,
            payment,
            data: {
                id: newData.idProduct,
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

exports.getAllTransaction = async (req, res) => {
    try {
        let data  = await transaction.findAll({
        include: [
            {
                model: product,
                as: "product",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser", "qty", "price",],
                },
            },

            {
                model: user,
                as: "buyer",
                attributes: {
                exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },

            {
                model: user,
                as: "seller",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },
        ],

        attributes: {
            exclude: ["createdAt", "updatedAt","idProduct","idBuyer","idSeller",]
        },
    });
    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
        return {
          ...item,
          product: {
            ...item.product,
            image: process.env.PATH_FILE + item.product.image,
          },
        };
      });

        return res.status(200).send({
        status: "succes",
        data,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        status: "failed",
        error: "server error",
        });

    }
    };

exports.getTransactionDetail = async (req, res) => {
    try {
        const id = req.params.id
        let data  = await transaction.findOne({
            where: {
                id
            },
        include: [
            {
                model: product,
                as: "product",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser", "qty", "price",],
                },
            },

            {
                model: user,
                as: "buyer",
                attributes: {
                exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },

            {
                model: user,
                as: "seller",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },
        ],

        attributes: {
            exclude: ["createdAt", "updatedAt","idProduct","idBuyer","idSeller",]
        },
    });
    data = JSON.parse(JSON.stringify(data));

    // data = data.map((item) => {
    //     return {
    //         ...item,
    //         product: {
    //         ...item.product,
    //         image: process.env.PATH_FILE + item.product.image,
    //         },
    //     };
    //     });

        return res.status(200).send({
        status: "succes",
        data,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        status: "failed",
        error: "server error",
        });

    }
    };

exports.getUserTransaction = async (req, res) => {
    try {
        const id = req.params.id
        let data  = await user.findOne({
            where: {
                id
            },
        include: [
            {
                model: transaction,
                as: "buyerTransaction",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser", "qty", "price",],
                },
            },

            // {
            //     model: user,
            //     as: "buyer",
            //     attributes: {
            //     exclude: ["createdAt", "updatedAt", "password", "status"],
            //     },
            // },

            // {
            //     model: user,
            //     as: "seller",
            //     attributes: {
            //         exclude: ["createdAt", "updatedAt", "password", "status"],
            //     },
            // },
        ],

        attributes: {
            exclude: ["createdAt", "updatedAt","idProduct","idBuyer","idSeller",]
        },
    });

        return res.status(200).send({
        status: "succes",
        data,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        status: "failed",
        error: "server error",
        });

    }
    };

exports.getProductTransaction = async (req, res) => {
    try {
        const id = req.params.id
        let data  = await product.findOne({
            where: {
                id
            },
        include: [
            {
                model: transaction,
                as: "transactions",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser", "qty", "price",],
                },
            },

            // {
            //     model: user,
            //     as: "buyer",
            //     attributes: {
            //     exclude: ["createdAt", "updatedAt", "password", "status"],
            //     },
            // },

            // {
            //     model: user,
            //     as: "seller",
            //     attributes: {
            //         exclude: ["createdAt", "updatedAt", "password", "status"],
            //     },
            // },
        ],

        attributes: {
            exclude: ["createdAt", "updatedAt","idProduct","idBuyer","idSeller",]
        },
    });

        return res.status(200).send({
        status: "succes",
        data,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        status: "failed",
        error: "server error",
        });

    }
    };

    const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
    const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY

    const core = new midtransClient.CoreApi();

    core.apiConfig.set({
        isProduction: false,
        serverKey: MIDTRANS_SERVER_KEY,
        clientKey: MIDTRANS_CLIENT_KEY
    })

exports.notification = async (req,res) => {
    try {
    
        const statusResponse = await core.transaction.notification(req.body)
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status
        const fraudStatus = statusResponse.fraud_status
    
        if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
            // TODO set transaction status on your database to 'challenge'
            // and response with 200 OK
            sendEmail("pending", orderId); //sendEmail with status pending and order id
            handleTransaction("pending", orderId);
            res.status(200);
        } else if (fraudStatus == "accept") {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            sendEmail("success", orderId); //sendEmail with status success and order id
            updateProduct(orderId);
            handleTransaction("success", orderId);
            res.status(200);
        }
        } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        sendEmail("success", orderId); //sendEmail with status success and order id
        updateProduct(orderId);
        handleTransaction("success", orderId);
        res.status(200);
        } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
        ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        sendEmail("failed", orderId); //sendEmail with status failed and order id
        handleTransaction("failed", orderId);
        res.status(200);
        } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        sendEmail("pending", orderId); //sendEmail with status pending and order id
        handleTransaction("pending", orderId);
        res.status(200);
        }

    } catch (error) {
        console.log(error)
        res.send({
        message: 'Server Error'
        })
    }
    }

    const handleTransaction = async (status, transactionId) => {
        await transaction.update(
            {
            status,
            },
            {
            where: {
                id: transactionId,
            },
            }
        );
        };

    const updateProduct = async (orderId) => {
    const transactionData = await transaction.findOne({
        where: {
        id: orderId,
        },
    });
    
    const productData = await product.findOne({
        where: {
        id: transactionData.idProduct,
        },
    });
    
    const qty = productData.qty - 1;
    await product.update({ qty }, { where: { id: productData.id } });
        };

    const sendEmail = async (status, transactionId) => {
        // Config service and email account
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: process.env.SYSTEM_EMAIL,
            pass: process.env.SYSTEM_PASSWORD,
            },
        });
        
        // Get transaction data
        let data = await transaction.findOne({
            where: {
            id: transactionId,
            },
            attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
            },
            include: [
            {
                model: user,
                as: "buyer",
                attributes: {
                exclude: ["createdAt", "updatedAt", "password", "status"],
                },
            },
            {
                model: product,
                as: "product",
                attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "idUser",
                    "qty",
                    "price",
                    "desc",
                ],
                },
            },
            ],
        });


        
        data = JSON.parse(JSON.stringify(data));
        // Email options content
        const mailOptions = {
            from: process.env.SYSTEM_EMAIL,
            to: data.buyer.email,
            subject: "Payment status",
            text: "Your payment is <br />" + status,
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Document</title>
                        <style>
                        h1 {
                            color: brown;
                        }
                        </style>
                    </head>
                    <body>
                        <h2>Product payment :</h2>
                        <ul style="list-style-type:none;">
                        <li>Name : ${data.product.title}</li>
                        <li>Total payment: ${convertRupiah.convert(data.price)}</li>
                        <li>Status : <b>${status}</b></li>
                        </ul>  
                    </body>
                    </html>`,
        };
        
        // Send an email if there is a change in the transaction status
        if (data.status !== status) {
            transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log("Email sent: " + info.response);
        
            return res.send({
                status: "Success",
                message: info.response,
            });
            });
        }
        };





