import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../frontend/common/NavBar';
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import "./AttendEvent.css"
import { EventService } from '../services/EventService';
import { Event, EventCategory } from '../model/Event';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import { useParams } from 'react-router-dom';
import { Attend } from '../model/Attend';

export default function AttendEvent(){
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [event,setEvent] = useState(EventService.getEvent(id));
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    let navigate = useNavigate();

    const [title,setTitle] = useState(event.title)
    const [imageUrl,setImageUrl] = useState(event.imageUrl);
    const [date,setDate] = useState(event.date);
    const [location,setLocation] = useState(event.location);
    const [description,setDescription] = useState(event.description);
    const [categories,setCategories] = useState(event.categories.map(c=>EventCategory[c]))



    function attendEvent() {
        event.title = title;
        event.description = description;
        event.imageUrl = imageUrl;
        event.categories =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });

        // console.log(event.attendanceList.includes(UserService.getAuthentificatedUser().id) + " includes");
        if(!alreadyAttends()){
            event.attendanceList.push(new Attend(UserService.getAuthentificatedUser(),true));
        }
        EventService.saveEvent(event);
        navigate('/your_events');
     }
    
    function alreadyAttends() {
        for(let att of event.attendanceList){
            if(att.user.id == UserService.getAuthentificatedUser().id){
                return true;
            }
        }
        return false;
    }

    function unattendEvent() {
        event.title = title;
        event.description = description;
        event.imageUrl = imageUrl;
        event.categories =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });

        let events = []
        let user = UserService.getAuthentificatedUser();
        for(let userAtt of event.attendanceList){
            if(userAtt.user.id != user.id){
                events.push(userAtt);
            }
        }
        event.attendanceList = events;
        EventService.saveEvent(event);
        navigate('/home');
     }
      
    
    return(
        <NavBar>
              {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={event.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
                    {/* Event Details */}
                    <Container fluid className="event-container">

                            <h1>
                                {event.title}
                            </h1>
                            <div>
                                <button type="button" className={1 <= event.rating ? "on" : "off"}>
                                    <span className="star">&#9733;</span>
                                </button>
                                <button type="button" className={2 <= event.rating ? "on" : "off"}>
                                    <span className="star">&#9733;</span>
                                </button>
                                <button type="button" className={3 <= event.rating ? "on" : "off"}>
                                    <span className="star">&#9733;</span>
                                </button>
                                <button type="button" className={4 <= event.rating ? "on" : "off"}>
                                    <span className="star">&#9733;</span>
                                </button>
                                <button type="button" className={5 <= event.rating ? "on" : "off"}>
                                    <span className="star">&#9733;</span>
                                </button>
                            </div>
                            <Card.Subtitle>
                            {event.categories.map(category => {
                              return <span className="category-element" key={category}>{EventCategory[category]}</span>;
                            })}
                            </Card.Subtitle>

                            <Card.Body>
                                <h4>Description</h4>
                                <div>
                                    {event.description}
                                </div>
                            </Card.Body>
                        {/* <form onSubmit={(e)=>{e.preventDefault();attendEvent();}}>
                            <div className={"button-class"}>
                                <Button variant="primary" type="submit" >
                                    Attend
                                </Button>
                            </div>
                        </form> */}

                    {(() => {
                    if (alreadyAttends() == false){
                        return (
                            <form onSubmit={(e)=>{e.preventDefault();attendEvent();}}>
                                <div className={"button-class"}>
                                    <Button variant="primary" type="submit" >
                                        Attend
                                    </Button>
                                </div>
                            </form>
                        )
                    }
                    else{
                        return (
                            <form onSubmit={(e)=>{e.preventDefault();unattendEvent();}}>
                                <div className={"button-class"}>
                                    <Button variant="primary" type="submit" >
                                        Unattend
                                    </Button>
                                </div>
                            </form>
                            
                        )
                    }
                })()}
                    </Container>

        </NavBar>

    )
    
}