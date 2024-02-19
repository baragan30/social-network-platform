import React from 'react';
import './YourEvents.css';
import NavBar from '../common/NavBar';
import Multiselect from 'multiselect-react-dropdown';
import { Card, Col, Row } from 'react-bootstrap';
import { BsFillPlusCircleFill } from "react-icons/bs";
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { EventService } from '../../services/EventService';
import { Event } from '../../model/Event';

export default function YourEventCard(event:Event, isCreatedEvent: Boolean){
    let navigate = useNavigate();
    let owner = UserService.getAuthentificatedUser();
    return(
        <Col>
            <Card>
                <Card.Img variant="top" src={event.imageUrl} style={{ height: "150px" }} />
                <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                        <small className="text-muted">Posted by {owner.username}</small>
                    </Card.Text>
                    <Card.Text>
                        {event.description}
                    </Card.Text>
                </Card.Body>
                {(() => {
                    if (isCreatedEvent == true){
                        return (
                            <Card.Footer>
                                <button id="more_about" onClick={()=>{navigate("../event_manage/" + event.id)}}>Manage</button>
                            </Card.Footer>
                        )
                    }
                    else{
                        return (
                            <Card.Footer>
                                {/* <button id="more_about" onClick={()=>{navigate("../event_manage/" + event.id)}}>Manage</button> */}
                                <button id="more_about" onClick={()=>{navigate("../attend_event/" + event.id)}}>Unattend</button>
                                <button id="more_about" onClick={()=>{navigate("../event_review/" + event.id)}}>Review</button>
                            </Card.Footer>
                            
                        )
                    }
                })()}
            </Card>
        </Col>
    )
}