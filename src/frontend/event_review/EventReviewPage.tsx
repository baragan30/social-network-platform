import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../common/NavBar';
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import "./EventReview.css"
import { EventService } from '../../services/EventService';
import { Event, EventCategory } from '../../model/Event';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router';
import { number } from 'prop-types';
import EventReviewBar from './EventReviewBar';
import { Review } from '../../model/Review';
import UserService from '../../services/UserService';

export default function EventReviewPage(){
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [event,setEvent] = useState(EventService.getEvent(id));

    const [rating, setRating] = useState(event.rating);
    const [hover, setHover] = useState(0);
    let navigate = useNavigate();

    function submitReview(e: any){
       e.preventDefault();
       let review = e.target[0].value;
       console.log(review);
       console.log(rating);

       event.reviews.push(new Review(UserService.getAuthentificatedUser(),review,rating));
       EventService.saveEvent(event);
       navigate('/home');
    }
      
    
    return(
        <NavBar>
            <Row style={{height:"100%"}}>
              {/* Main Screen application */}
                <Col xs={9} style={{height:"100%",padding:0}}>
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={event.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
                    {/* Event Details */}
                    <Container fluid className="event-container">

                            <h1>
                                {event.title}
                            </h1>


                            <Card.Subtitle>
                            {event.categories.map(category => {
                              return <span className="category-element" key={category}>{EventCategory[category]}</span>;
                            })}
                            </Card.Subtitle>

                            <Card.Body>
                                <h4>Location</h4>
                                <div>
                                    {event.location}
                                </div>
                                <h4>Description</h4>
                                <div>
                                    {event.description}
                                </div>
                            </Card.Body>

                        <div className="review-container">
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || rating) ? "on" : "off"}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <span className="star">&#9733;</span>
                                        </button>
                                    );
                                })}
                            </div>
                            <Form onSubmit={submitReview}>
                                <Form.Group className="mb-3" controlId="Review" >
                                    <Form.Control as="textarea" rows={5} id="reviewArea" placeholder="Review" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Write a review
                                </Button>
                            </Form>
                        </div>
                    </Container>
                </Col>
                {/* char component */}
                <Col  xs={3} style={{backgroundColor:"white",height:"100%"}}>
                    {
                    event.reviews.map(review => EventReviewBar(review))
                   }
                </Col>
            </Row>

        </NavBar>

    )
    
}