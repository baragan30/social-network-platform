import React, { useEffect, useState } from 'react';
import './Poll.css';
import NavBar from '../common/NavBar';
import Multiselect from 'multiselect-react-dropdown';
import { Card, Col, Row } from 'react-bootstrap';
import { BsFillPlusCircleFill } from "react-icons/bs";
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { EventService } from '../../services/EventService';
import { PollService } from '../../services/PollService';
import PollCard from './PollCard';

const Poll: React.VFC = () => {
    let currentUser = UserService.getAuthentificatedUser();
    let navigate = useNavigate();
    const [polls, setPolls] = useState(PollService.getAllPolls());

    useEffect(() => {
        setPolls(PollService.getAllPolls());
    }, [])

    function filter(ev: any) {
        ev.preventDefault();
        let search = ev.target[0].value;
        let polls = PollService.getFilteredPolls(search, []);

        setPolls(polls);
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
                    <input type="submit" hidden />
                </form>

                <img className="user_icon" src={currentUser.imageUrl} alt="user_icon" />
                <div className="username">{currentUser.username}</div>
            </div>
            <div className="sub_header">
                <div className='menu_div'>Polls</div>
                <BsFillPlusCircleFill className='plus_button_poll' onClick={() => { navigate("../polls_create") }} />
            </div>
            <div className="cards">
                <Row xs={1} md={3} className="g-4">
                    {
                        polls.map(poll => <PollCard poll={poll} />)
                    }
                </Row>
            </div>

        </NavBar>
    )
}

export default Poll;