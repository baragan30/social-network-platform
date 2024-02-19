import React from 'react';
import './Shop.css';
import { Card, Col, Row } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { Event } from '../../model/Event';
import { useNavigate } from 'react-router';
import Shop from '../../model/Shop';

export default function EventCard({shop} : {shop : Shop}){
    let curentUser = UserService.getAuthentificatedUser();
    let owner = UserService.getUser(shop.ownerid);
    let navigate = useNavigate();
    return(
        <Col>
            <Card>
                {/* <Card.Img variant="top" src="https://previews.123rf.com/images/volyk/volyk1808/volyk180800015/105675075-seamless-pattern-with-collection-of-sports-balls-line-style-sports-random-colorful-balls.jpg" style={{ height: "150px" }} /> */}
                <Card.Img variant="top" src={shop.imageUrl} style={{ height: "150px" }} />
                <Card.Body>
                    <Card.Title>{shop.title}</Card.Title>
                    <Card.Text>
                        <small className="text-muted">{owner.username}</small>
                    </Card.Text>
                    <Card.Text>
                       {
                        shop.description
                       }
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        curentUser.id == owner.id ?
                        <div><button id="more_about" onClick={()=>{navigate("../shop_manage/" + shop.id)}}>Manage</button>

                        <button id="aud_mon" onClick={()=>{navigate("../audience")}}>Audience monitoring</button></div>
                        
                        :
                        <button id="more_about" onClick={()=>{navigate("../shop_details/" + shop.id)}}>More about</button>

                    }
                </Card.Footer>
            </Card>
        </Col>
    )
}