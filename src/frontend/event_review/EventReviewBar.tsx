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
import { useParams } from 'react-router';
import { number } from 'prop-types';
import { Review } from '../../model/Review';

export default function EventReviewBar(review: Review){
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [event,setEvent] = useState(EventService.getEvent(id));

    const [rating, setRating] = useState(event.rating);
    const [hover, setHover] = useState(0);

    const ratingArr = [1,2,3,4,5]

    function submitReview(e: any){
       e.preventDefault();
       let str = e.target[0].value;
       console.log(str);
       console.log(rating);

    }
      
    const list1 = [];
    const list2 = [];

    for(let rat of ratingArr){
        if(rat < review.rating) {
            list1.push(<button type="button" className={"on"}>
                         <span className="star-comment">&#9733;</span>
                        </button>)
        }
        else{
            list2.push(<button type="button" className={"off"}>
                         <span className="star-comment">&#9733;</span>
                        </button>)

        }
    }
    list1.push(<button type="button" className={"on"}>
                         <span className="star-comment">&#9733;</span>
                        </button>)
    list2.pop();

    return(
        <div className="comment-section container">
            <div className="row">
                <div className="col-sm">
                    <Image className='user-image' src="https://avatars.dicebear.com/v2/avataaars/c012f3f2a0871c9bc6375330d4311612.svg">
                    </Image>
                </div>
                <div className="col-5">
                    <h5>{review.user.username}</h5>

                </div>
                <div className="col-5">
                    {list1}
                    {list2}
                </div>
                <div className="col-sm">
                    <p className={"old-message"}>1 day old</p>
                </div>
            </div>
            <div className="row comment">
               {review.review}
            </div>
        </div>

       

    )
    
}