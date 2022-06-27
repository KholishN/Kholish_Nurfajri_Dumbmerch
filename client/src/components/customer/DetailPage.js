import {Container, Card} from "react-bootstrap";
import { useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import NavigationBarCustomer from "../subComponent/NavigationBarCustomer"
import { useQuery, useMutation } from 'react-query';
import { API } from "../../config/api"
import Rupiah from "rupiah-format"
import { FaStar } from "react-icons/fa";


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};


function DetailPage() {

    let {id} = useParams();
    let history = useNavigate()

    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id,);
        return response.data.data;
      });
    //   console.log(product)

    useEffect(()=>{
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-_02Mwu3kTiqy1vjO";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
    },[])

    const handleBuy = useMutation(async () => {
        try {
          // Get data from product
          const data = {
            idProduct: product.id,
            idSeller: product.user.id,
            price: product.price,
          };    
        //   // Data body
        //   const body = JSON.stringify(data); 
    
          // Configuration
          const config = {
            method: "POST",
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },data
          };
        //   console.log(config)
          // Insert transaction data
            const response = await API.post("/transaction", config);
            console.log(response)

            const token = response.data.payment.token;

            window.snap.pay(token, {
            onSuccess: function (result) {

            console.log(result);
            history("/profile");
            },
            onPending: function (result) {
                console.log(result);
                history("/profile");
            },
            onError: function (result) {
                console.log(result);
            },
            onClose: function () {
                alert("you closed the popup without finishing the payment");
                },
            })
        } catch (error) {
            console.log(error);
        }
        });


        let { data: reviews } = useQuery('reviewsCache', async () => {
            const response = await API.get('/product-review');
            return response.data.reviews;
          });

        const stars = Array(5).fill(0)

    return (
        <Container >
            <NavigationBarCustomer/>
        <div className="descContainer d-flex ">
            <div className="detailImg">
                <img src={product?.image} alt="img" />
                </div>
            <div className="detailDesc">
                <div>
                    <h2 className="descTitle">{product?.title}</h2>
                    <span className="descText">Stock: {product?.qty}</span>
                    </div>
            
                <div>
                    <p className="descText">{product?.desc}</p>
                    </div>
                <div>
                    <h5 className="descPrice mt-5">{Rupiah.convert(product?.price)}</h5>
                </div>
                <div className="descBuy">
                    <button type="submit" onClick={() => handleBuy.mutate()}>Buy</button>
                </div>
            </div>
            </div>
            <div>
        <div className="ContRev review">
      <h2 className="revTitle"> Review Product </h2>
      <div className="stars">
        {reviews?.map((item, index) => (
      <Card key={index} className="mb-3">
        <Card.Header as="h5" className="card-head">{item.reviewer.name}</Card.Header>
        <Card.Body className="card-body">
          <Card.Title>
                {stars.map((_, index) => {
                return (
                    <FaStar
                    key={index}
                    size={24}
                    color={(item.rating) > index ? colors.orange : colors.grey}
                    style={{
                        marginRight: 10,
                        display: "inline"
                    }}
                    />
                    
                )
                })}
          </Card.Title>
          <Card.Text>
            {item.review}
          </Card.Text>
        </Card.Body>
      </Card>
      ))}
    </div>
    </div>
    </div>
        </Container>
        
  )
  
}

export default DetailPage