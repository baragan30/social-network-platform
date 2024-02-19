import React, { useState } from 'react';
import './PollsCreate.css';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
import Image from 'react-bootstrap/Image';
import { Option, Poll } from "../../model/Poll";
import { PollService } from '../../services/PollService';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function PollsCreate() {
    const event = EventService.getEvent(1);
    // const sarray: string[] = [""];
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState('https://www.onlygfx.com/wp-content/uploads/2017/11/grunge-question-mark-cover.png');
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([""])
    let navigate = useNavigate();

    function updateOptions(option:string, index:any){
        options[index] = option;
        let length = options.length;
        while(length > 1 && options[length - 1] === "" && options[length - 2] === ""){
            options.pop();
            length--;
        }
        if(index == length -1 && options[index] !== ""){
            options.push("");
        }
        setOptions([...options]);
    }

    function update() {
        let opts =[];
        for(let optionName of options){
            if(optionName !== "")
                opts.push(new Option(optionName,[]));
        }
        if(opts.length < 2 || description === "" || title === ""){
            confirmAlert({
                title: 'Error',
                message: 'Input data insuficient',
                buttons: [
                    {
                        label: 'Close',
                    }
                ]
            });
            return;

        }
        let pollToInsert = new Poll(
            PollService.getNewID(),
            UserService.getAuthentificatedUser().id,
            title,
            imageUrl,
            opts,
            description
        )
        PollService.savePoll(pollToInsert);
        confirmAlert({
            title: 'Poll created',
            message: 'Created poll can be seen by everyone',
            buttons: [
                {
                    label: 'Close',
                }
            ]
        });
        navigate('/polls/');
    }

    return (
        <NavBar >
            {/* Main Screen application */}
            {/* Image header (cand be replaced with Card.Image component) */}
            <div>
                <Image className='header-image' src="https://www.onlygfx.com/wp-content/uploads/2017/11/grunge-question-mark-cover.png" style={{ height: "175px", width: "100%" }}>
                </Image>
                <form onSubmit={(e) => { e.preventDefault(); update(); }}>
                    <input id="title" placeholder='Poll Title' value={title} onChange={(ev) => { setTitle(ev.target.value) }}></input>
                    <input id="description" placeholder='Poll Description' value={description} onChange={(ev) => { setDescription(ev.target.value) }}></input>
                    {
                        options.map((option,index) => <input id="event_idea1" placeholder='Event idea' onChange={
                            (ev) => {updateOptions(ev.target.value,index) }}></input>)
                    }

                    <button id='create_btn'>
                        Create poll
                    </button>
                </form>
            </div>
        </NavBar>
    );

}