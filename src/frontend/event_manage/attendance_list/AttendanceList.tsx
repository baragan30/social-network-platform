import React from 'react';
import './AttendanceList.css';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import { FaWheelchair } from 'react-icons/fa';
import NavBar from '../../common/NavBar';
import { EventService } from '../../../services/EventService';
import { Event } from '../../../model/Event';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Attend } from '../../../model/Attend';


export default function AttendanceList() {
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [event,setEvent] = useState(EventService.getEvent(id));
    let navigate = useNavigate();

    function method(att: Attend) {
        att.isChecked = !att.isChecked;
        for(let objAtt of event.attendanceList){
            if(att.user.id == objAtt.user.id){
                objAtt.isChecked = att.isChecked;
            }
        }
        EventService.saveEvent(event);
    }

    function saveAttendanceList(){
        let attendanceList = [];
        for(let att of event.attendanceList){
            if(att.isChecked == true){
                attendanceList.push(att);
            }
        }
        event.attendanceList = attendanceList;
        EventService.saveEvent(event);
    }

  
    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={event.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
            <div>
                <form>
                    <div className='border-box'>
                        <div className='row'>
                            <div className='column1'>
                                {
                                    event.attendanceList.map(att => (<label id="user1">{att.user.username}</label> ))
                                }
                            </div>

                            <div className='column2'>
                                {
                                    event.attendanceList.map(att => ( <input onClick={() => method(att)} defaultChecked={att.isChecked} type="checkbox" className='checkbox_1' id='checkbox1'></input> ))
                                }                                                  
                            </div>
                        </div>
                    </div>
                    
                    <button id='save_btn' onClick={()=>{saveAttendanceList();navigate("../event_manage/" + event.id)}}>
                        Save attendance List
                    </button>
                </form>
            </div>
        </NavBar>
    );

}