import React, { useState } from 'react';
import './PollsVote.css';
import NavBar from '../common/NavBar';
import Image from 'react-bootstrap/Image';
import { PollService } from '../../services/PollService';
import UserService from '../../services/UserService';
import { Option } from '../../model/Poll';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';


export default function PollsVote() {
    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [poll, setPoll] = useState(PollService.getPoll(id));
    const [curentUser,setCurentUser] = useState(UserService.getAuthentificatedUser())
    let navigate = useNavigate();

    function submit(ev:any){
        ev.preventDefault();
        for(let i = 0 ;i< poll.options.length;i++){
            let vote = ev.target[i].checked;
            Option.vote(poll.options[i],curentUser.id,vote)
        }
        PollService.savePoll(poll);
        confirmAlert({
            title: 'Poll voted',
            message: 'Your vote can be changed',
            buttons: [
                {
                    label: 'Close',
                }
            ]
        });
        navigate("../polls");
    }

    return (
        <NavBar >
            {/* Main Screen application */}
            {/* Image header (cand be replaced with Card.Image component) */}
            <Image className='header-image' src={poll.imageUrl} style={{ height: "20%", width: "100%" }}>
            </Image>
            <div>
                <form onSubmit={submit}>
                    <label id="description">{poll.description}</label>
                    <div className='border-box'>
                        <div className='row'>
                            <div className='column1'>
                            {
                                poll.options.map(option => <label id={"event_idea1"}>{option.optionName}</label>)
                            }
                            </div>

                            <div className='column2'>
                            {
                                poll.options.map(option => 
                                    <input type="checkbox" className='checkbox1' id='checkbox1' 
                                         defaultChecked={Option.hasVoted(option,curentUser.id)}>

                                    </input>)
                            }
                            </div>
                        </div>
                    </div>

                    <button id='vote_btn'>
                        Vote
                    </button>
                </form>
            </div>
        </NavBar>
    );

}
