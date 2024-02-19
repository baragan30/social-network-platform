import React from 'react';
import './Poll.css';
import { Card, Col, Row } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { Poll } from '../../model/Poll';

export default function PollCard({poll} : {poll : Poll}){
    let owner = UserService.getUser(poll.ownerid);
    let navigate = useNavigate();
    return (
        <Col key={poll.id}>
        <Card>
          <Card.Img variant="top" src={poll.imageUrl} style={{ height: "150px" }} />
          <Card.Body>
            <Card.Title>{poll.title}</Card.Title>
            <Card.Text>
              <small className="text-muted">Posted by {owner.username}</small>
            </Card.Text>
            <Card.Text>
              {poll.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <button id="more_about" onClick={()=>{navigate("../polls_vote/" + poll.id)}}>Vote</button>
          </Card.Footer>
        </Card>
      </Col>

    )
}