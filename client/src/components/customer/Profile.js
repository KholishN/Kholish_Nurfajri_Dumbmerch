import {Container,Card,Button} from "react-bootstrap";
import mouse from "../../images/mouse.png";
import NavbarCustomer from "../subComponent/NavigationBarCustomer"
import { useNavigate, useParams  } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import React, { useContext} from "react";
import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";
import { FaStar } from "react-icons/fa";



const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

function Profile() {
    const  navigate = useNavigate()

    const AddProfile = () => {
        navigate("/add-profile")
    }

    const title = "Profile";
    document.title = "DumbMerch | " + title;

    const [state] = useContext(UserContext);
    const { data: transaction } = useQuery("transactionCache", async () => {

            const config = {
                method: "GET",
                headers: {
                Authorization: "Basic " + localStorage.token,
                },
            };
            const response = await API.get("/transaction", config);
            return response.data.data;
            }
        );

        const stars = Array(5).fill(1)

        const handleClick = (id) => {

            navigate("/review/" + id)
        }

        let { data: reviews } = useQuery('reviewsCache', async () => {
            const response = await API.get('/user-transaction/' + id);
            console.log(response)
            return response.data;
        });
        
        let {id} = useParams(state.user.id);
          let { data: profile } = useQuery('profileCache', async () => {
            const response = await API.get('/user/' + id);
            return response.data;
        });
        console.log(reviews)
        
return (
    <Container >
        <NavbarCustomer />
        <div className="containerProfile">
        <div className="profileLeft">
            <div className="block">
            <h3 className="d-block myProfile">My Profile</h3>
            <img src={mouse} className="profileImage" alt="foto" />
            <Button className="profilebtn" onClick={AddProfile}>Add Profile</Button>
            </div>
            <ul className="biodata">
                <li className="biodataTitle">Name</li>
                <li className="biodataContent">{profile?.dataUser.name}</li>
                <li className="biodataTitle">Email</li>
                <li className="biodataContent">{profile?.dataUser.email}</li>
                <li className="biodataTitle">Phone</li>
                <li className="biodataContent">{profile?.dataUser.profile.phone}</li>
                <li className="biodataTitle">Gender</li>
                <li className="biodataContent">{profile?.dataUser.profile.gender}</li>
                <li className="biodataTitle">Address</li>
                <li className="biodataContent">{profile?.dataUser.profile.address}</li>
            </ul>
        </div>

        <div className="profileRight">
            <div className="d-block">
                <h3 className="profileTrans">My Transaction</h3>
            
            {transaction?.map((item,index) => (
                <div  key={index}>
            <Card className="profileCard d-flex px-4 py-2">
                <Card.Img className="profilePicture d-flex" variant="left" src={item.product.image} />
                <div className="profile-card-text">
                    <div className="profile-card-content">
                    <h3 className="profile-card-title">{item.product.name}</h3>
                    <p className="profile-card-date">{dateFormat(item.createdAt,"dddd, d mmmm yyyy, HH:MM")}</p>
                    <p className="profile-card-price">Price : {convertRupiah.convert(item.price)}</p>
                    <div className="ContRev">
                    <div className="stars">
                        {stars.map((_, index) => {
                            return (
                                <FaStar key={index} size={18} onClick={() => handleClick(item.id)}
                                    color={(reviews?.rating) > index ? colors.orange : colors.grey}
                                    style={{marginRight: 10,cursor: "pointer",display: "inline"}}/>) })}
                    </div>
                    </div>
                    <p className="profile-card-sub-price">Sub Total : {convertRupiah.convert(item.price)}</p>
                    </div>
                <div  className={`profileLogo-${item.status}`}>
                    <p>{item.status}</p>
                    </div>
                </div>
            </Card>
            </div>
             ))}
        </div>  
        
            </div>
            </div>
    </Container>
  )
}

export default Profile