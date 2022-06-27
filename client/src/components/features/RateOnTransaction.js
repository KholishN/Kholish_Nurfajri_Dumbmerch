import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};




function Rate({item}) {
  const navigate = useNavigate()
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue] = useState(undefined);
  const stars = Array(5).fill(1)

  console.log(item)

  const handleClick = (id) => {

    navigate("/review/" + id)
  }


  return (
      <div className="ContRev">
      <div className="stars">
        {stars.map((_, index) => {
            return (
                <FaStar
                key={index}
              size={18}
              onClick={() => handleClick(item.id)}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                  marginRight: 10,
                  cursor: "pointer",
                  display: "inline"
                }}
                />
                
                )
        })}
      </div>
    </div>
  );
};



export default Rate;