import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import "./ShopDetails.css"
import { Event, EventCategory } from '../../model/Event';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
// import { MDBContainer, MDBRating } from 'mdbreact';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ShopService } from '../../services/ShopsService';
import { useParams } from 'react-router';

export default function ShopDetails(){
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [shop,setShop] = useState(ShopService.getShop(id));

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    
    return(
        <NavBar>
              {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={shop.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
                    {/* Event Details */}
                    <Container fluid className="event-container">

                            <h1>
                                {shop.title}
                            </h1>

                            <Card.Subtitle>
                            {shop.categories.map(category => {
                              return <span className="category-element" key={category}>{EventCategory[category]}</span>;
                            })}
                            </Card.Subtitle>

                            <Card.Body>
                                <h4>Location</h4>
                                <div>
                                    {shop.location}
                                </div>
                                <h4>Schedule</h4>
                                <div>
                                    {shop.schedule}
                                </div>
                                <h4>Description</h4>
                                <div>
                                    {shop.description}
                                </div>
                                <h4>Products</h4>
                                <div>
                                {shop.products.map(product => {
                                    return <div>{product.name} - {product.price}</div>
                                })}
                                </div>
                            </Card.Body>
                    </Container>

        </NavBar>

    )
    
}