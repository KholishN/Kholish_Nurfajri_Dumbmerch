import { useState } from "react";
import { FaStar } from "react-icons/fa";
import NavbarCustomer from "../subComponent/NavigationBarCustomer"
import {Container} from "react-bootstrap"
import { useQuery, useMutation } from 'react-query';
import { API } from "../../config/api"
import { useParams, useNavigate  } from "react-router-dom";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};



function Rate() {
  const [currentValue, setCurrentValue] = useState({});
  const [review, setReview] = useState("");
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setReview(e.target.value);
  };

  let {id} = useParams()
  let { data: transaction } = useQuery('reviewCache', async () => {
    const response = await API.get('/transaction/' + id,);
    return response.data.data;
  });

  
  const handleSubmit = useMutation(async (e) => {
    try {
          e.preventDefault();
      const data = {
        rating: currentValue,
        review,
        currentValue,
        idProduct: transaction.product.id,
        idTransaction: transaction.id,
      };
    
      console.log(data)
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        }
      };

      
      const response = await API.post("/review",data, config);
      console.log(response)
      navigate("/home")
    } catch (error) {
        console.log(error);
    }
    });


  return (
    <Container className="ContRev">
      <NavbarCustomer />
      <h2 className="revTitle"> Review Product </h2>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
      <div className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              value={() => handleClick(index + 1)}
              onChange={handleChange}
              name="rating"
              color={(  currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer",
                display: "inline" }} />
              )
              })}
      </div>
      <textarea placeholder="What's your experience?" className="revText" name="review" onChange={handleChange}/>
      <button className="RevBtn" type="submit"> Submit </button>
      </form>
    </Container>
  );
};






export default Rate;