import React, { useEffect, useState } from 'react';
import './HomePage.css';
import NavBar from '../common/NavBar';
import Multiselect from 'multiselect-react-dropdown';
import { Card, Col, Row } from 'react-bootstrap';
import UserService from '../../services/UserService';
import EventCard from './EventCard';
import { EventService } from '../../services/EventService';
import { useNavigate } from 'react-router';
import { EventCategory } from '../../model/Event';

const HomePage: React.VFC = () => {
  let curetUser = UserService.getAuthentificatedUser();
  let navigate = useNavigate();
  const [events, setEvents] = useState(EventService.getAllEvents());
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setEvents(EventService.getAllEvents());
  }, [])


  function filter(ev: any) {
    ev.preventDefault();
    let search = ev.target[0].value;
    let events = EventService.getFilteredEvents(search, categories);

    setEvents(events);
  }

  return (
    <NavBar>
      <div className="header">
        <form onSubmit={(e) => { filter(e); }} >
          <input className='search_bar' type="text" placeholder="Search..." />
          <Multiselect
            id="multiselect_filter"
            isObject={false}
            placeholder="Filter by..."
            onKeyPressFn={function noRefCheck() { }}
            onRemove={(e) => {
              setCategories(e);
            }}
            onSearch={function noRefCheck() { }}
            onSelect={(e) => {
              setCategories(e);
            }}
            options={
              Object.keys(EventCategory).filter((item) => {
                return isNaN(Number(item));
              })
            }
          />
          <input type="submit" hidden />
        </form>

        <img className="user_icon" src={curetUser.imageUrl} alt="user_icon" />
        <div className="username">{curetUser.username}</div>
      </div>
      <div className="sub_header">
        <div className='menu_div'>All events</div>
        <div className="sub_header_buttons_div">
          <button className="sub_header_buttons" onClick={() => { navigate("../polls") }}>Polls</button>
          <button className="sub_header_buttons" onClick={() => { navigate("../shops") }}>Shops</button>
          <button className="sub_header_buttons" onClick={() => { navigate("../your_events") }}>Your events</button>
        </div>
      </div>
      <div className="cards">
        <Row xs={1} md={3} className="g-4">
          {
            events.map(event => <EventCard event={event} />)
          }
        </Row>
      </div>

    </NavBar>
  )
}

export default HomePage;