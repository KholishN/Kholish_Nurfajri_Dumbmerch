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

    useEffect(()=>{
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-_02Mwu3kTiqy1vjO";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
    },[])

    const handleBuy = useMutation(async () => {
        try {
          const data = {
            idProduct: product.id,
            idSeller: product.user.id,
            price: product.price,
          };

          const config = {
            method: "POST",
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },data
          };

          const response = await API.post("/transaction", config);
          

          const token = response.data.payment.token;

          window.snap.pay(token, {
          onSuccess: function (result) {

         
          history("/home");
          },
          onPending: function (result) {
            history("/home");
          },
          onError: function (result) {
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
            const response = await API.get('/product-review/' + id );
            return response.data.data.productReview
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
            <div className="ttr">
        <div className="ContRev review">
            <h2 className="revTitle"> Review Product </h2>
          <div className="stars mb-0">

          {reviews?.map((item, index) => (
            <Card key={index} className="mt-3">
              <Card.Header as="h5" className="card-head">{item.name}</Card.Header>
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