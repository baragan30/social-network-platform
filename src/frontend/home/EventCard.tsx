import React from 'react';
import './HomePage.css';
import { Card, Col, Row } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { Event } from '../../model/Event';
import { useNavigate } from 'react-router';

export default function EventCard({event} : {event : Event}){
    let owner = UserService.getUser(event.ownerid);
    let navigate = useNavigate();
    return (
        <Col key={event.id}>
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
          <Card.Footer>
            <button id="more_about" onClick={()=>{navigate("../event_review/" + event.id)}}>Reviews</button>
            <button id="more_about" onClick={()=>{navigate("../attend_event/" + event.id)}}>More about</button>
          </Card.Footer>
        </Card>
      </Col>

    )
}