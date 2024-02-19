import React from 'react';
import './YourEvents.css';
import NavBar from '../common/NavBar';
import Multiselect from 'multiselect-react-dropdown';
import { Card, Col, Row } from 'react-bootstrap';
import { BsFillPlusCircleFill } from "react-icons/bs";
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { EventService } from '../../services/EventService';
import YourEventCard from './YourEventCard';
import { Event } from '../../model/Event';

const YourEvents: React.VFC = () => {
    let currentUser = UserService.getAuthentificatedUser();
    let navigate = useNavigate();
    // let userEvents = [...EventService.getUserEvents(currentUser.id), ...EventService.getAttendedEvents(currentUser)];
    let createdEvents = EventService.getUserEvents(currentUser.id);
    let attendedEvents = EventService.getAttendedEvents(currentUser);
    console.log("attended events " + attendedEvents);
    console.log("created events" + createdEvents);

    return (
        <NavBar>
            <div className="header">
                <input className='search_bar' type="text" placeholder="Search..." />
                <Multiselect
                    id="multiselect_filter"
                    isObject={false}
                    placeholder="Filter by..."
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={function noRefCheck() { }}
                    options={[
                        'Tennis',
                        'Football',
                        'Running',
                        'Swimming',
                        'Basketball'
                    ]}
                />
                <img className="user_icon" src={currentUser.imageUrl} alt="user_icon" />
                <div className="username">{currentUser.username}</div>
            </div>
            <div className="sub_header">
                <div className='menu_div'>My Events</div>
                <BsFillPlusCircleFill className='plus_button' onClick={()=>{navigate("../event_create")}}/>
            </div>
            <div className="cards">
                <Row xs={1} md={3} className="g-4">
                   {
                    createdEvents.map(event => YourEventCard(event, true))
                   }
                   {
                    attendedEvents.map(event => YourEventCard(event, false))

                   }
                </Row>
            </div>

        </NavBar>
    )
}

export default YourEvents;