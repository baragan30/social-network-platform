import React, { useState } from 'react';
import './EventCreate.css';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
import Image from 'react-bootstrap/Image';
import Multiselect from 'multiselect-react-dropdown';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import { FaWheelchair } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Event, EventCategory } from '../../model/Event';
import UserService from '../../services/UserService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function EventCreate() {
    const [title,setTitle] = useState("")
    const [imageUrl,setImageUrl] = useState('https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000');
    const [date,setDate] = useState("");
    const [location,setLocation] = useState("");
    const [description,setDescription] = useState("");
    const [categories,setCategories] = useState([])
    let navigate = useNavigate();


    function update(){
       let cats =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });
        let event = new Event(
            EventService.getNewID(),
            UserService.getAuthentificatedUser().id,
            title,
            imageUrl,
            EventService.getNewRating(),
            cats,
            description,date,location,[], []
        )
        EventService.saveEvent(event);
        confirmAlert({
            title: 'Event created',
            message: 'Created event can be seen by everyone',
            buttons: [
                {
                    label: 'Close',
                }
            ]
        });
        navigate('/your_events');
    }

  
    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}

            <div>
                <Image className='header-image' src={imageUrl }style={{height:"175px",width:"100%"}}>
                </Image>
            <form onSubmit={(e)=>{e.preventDefault();update();}}>

                <div className='border-box'> 
                    <div className='row' >
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
                             {/* <button className='editAttendanceButton'  onClick={()=>{navigate("../event_manage_attendance_list")}} >Edit Attendance List</button> */}
                            <button className='signButton'>
                                <FaAmericanSignLanguageInterpreting  className='iconClass'></FaAmericanSignLanguageInterpreting>
                            </button>
                            <button className='wheelchairButton'>
                                <FaWheelchair className='iconClass'></FaWheelchair>
                            </button>
                        </div>
                    </div>   

                </div>         
               


                <input id="description" type="text" placeholder='Description' value={description} onChange={(ev)=>{
                                setDescription(ev.target.value)
                            }}></input>
                    <button id='add_event_btn'>
                        Add event
                    </button>

            </form>
            </div>
        </NavBar>
    );

}