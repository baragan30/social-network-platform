import React, { useState } from 'react';
import './EventManage.css';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import { FaWheelchair } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { Event, EventCategory } from '../../model/Event';


export default function EventManage() {
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const event = EventService.getEvent(id)
    const [title,setTitle] = useState(event.title)
    const [imageUrl,setImageUrl] = useState(event.imageUrl);
    const [date,setDate] = useState(event.date);
    const [location,setLocation] = useState(event.location);
    const [description,setDescription] = useState(event.description);
    const [categories,setCategories] = useState(event.categories.map(c=>EventCategory[c]))
    let navigate = useNavigate();

    function update(){
        event.title = title;
        event.description = description;
        event.imageUrl = imageUrl;
        event.categories =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });
        EventService.saveEvent(event);
        navigate('/your_events');
    }

    function deleteEvent() {
        EventService.removeEvent(event);
        navigate('/your_events');

    }
  
    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={event.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
            <div>
                <form onSubmit={(e)=>{e.preventDefault();update();}}>
                
                    <div className='border-box'> 
                        <div className='row'>
                            <div className='column'>
                                <input id="title" placeholder='Title' value={title} onChange={(ev)=>{
                                    setTitle(ev.target.value)
                                }} ></input>  
                                <input id="imageurl" placeholder='image url' value={imageUrl} onChange={(ev)=>{
                                    setImageUrl(ev.target.value)
                                }}></input>
                                <input id="date" placeholder='Date' value={date} onChange={(ev)=>{
                                    setDate(ev.target.value)
                                }}></input>
                                <input id="location" placeholder='Location' value={location} onChange={(ev)=>{
                                    setLocation(ev.target.value)
                                }}></input>
                            </div>

                            <div className='column'>
                                <Multiselect
                                    id="category_btn"
                                    isObject={false}
                                    placeholder="Edit category"
                                    selectedValues={categories}
                                    onKeyPressFn={function noRefCheck() { }}
                                    onRemove={(e)=>{
                                        setCategories(e);
                                    }}
                                    onSearch={function noRefCheck() { }}
                                    onSelect={(e)=>{
                                        setCategories(e);
                                    }}
                                    options={
                                        Object.keys(EventCategory).filter((item) => {
                                            return isNaN(Number(item));
                                        })
                                    }
                                />
                                 <button className='editAttendanceButton'  onClick={()=>{navigate("../event_manage_attendance_list/" + event.id)}} >Edit Attendance List</button>
                                <button className='signButton'>
                                    <FaAmericanSignLanguageInterpreting  className='iconClass'></FaAmericanSignLanguageInterpreting>
                                </button>
                                <button className='wheelchairButton'>
                                    <FaWheelchair className='iconClass'></FaWheelchair>
                                </button>
                            </div>
                        </div>   

                    </div>         
                   


                    <input id="description" placeholder='Description' value={description} onChange={(ev)=>{
                                    setDescription(ev.target.value)
                                }}></input>
                    <button id='edit_btn'>
                        Edit event
                    </button>
                    <button id='edit_btn' onClick={deleteEvent}>
                        Delete event
                    </button>

                </form>
            </div>
        </NavBar>
    );

}