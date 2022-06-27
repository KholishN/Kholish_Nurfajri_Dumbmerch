import {Container,CardGroup,Card} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import NavbarCustomer from "../subComponent/NavigationBarCustomer"
import {UserContext} from "../../context/userContext"
import { API } from "../../config/api"
import {useQuery} from "react-query"
import Rupiah from "rupiah-format"


function HomePage() {

    const title = 'Product';
    document.title = 'Dumbmerch | ' + title
    
    let {data: products, } = useQuery("productsChace", async () => {
        const response = await API.get("/products")
        console.log( response)
        return response.data.products
    })
    console.log(products)

  return (
      <Container >
        <NavbarCustomer />
        <div >
        <h3 className="product">Product</h3>
        </div>
        <CardGroup className="cardCatalogGroup">
           {products?.map((item, index) => (
            <Card className="cardCatalog" key={index}>
                <Card.Img className="cardImg"  variant="top"  src={item.image}/>
                <Card.Body className="py-2 px-3 ">
                <Link to={`/detail-page/`+ item.id} className="cardTitle"><Card.Title className="cardTitle"></Card.Title>{item.title}</Link>
                <Card.Text className="cardText">
                    <span>{Rupiah.convert(item?.price)}</span>
                    <span>Stock : {item.qty}</span>
                </Card.Text>
                </Card.Body>
                </Card>
             ))}
            </CardGroup>
        </Container>
)
}

export default HomePage