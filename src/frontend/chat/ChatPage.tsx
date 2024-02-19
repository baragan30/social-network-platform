import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../common/NavBar';
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import UserService from '../../services/UserService';
import FriendComponent from './FriendComponnet';
import MessageService from '../../services/MessageService';
import { AppUser } from '../../model/AppUser';
import ChatComponent from './ChatComponent';

export default function ChatPage(){
    const [friendId, setFriendId] = useState(-1);
    const [curentUser, _1] = useState(UserService.getAuthentificatedUser());
    const [friends, _2] = useState(UserService.getCurentUserFriends());
    return(<NavBar>
        <Row>
            <Col xs={9} style={{height:"1vh", backgroundColor:"#E5E5E5"}}>
                {ChatComponent(curentUser,friendId)}
            </Col>
            <Col xs={3} style={{height:"1vh",backgroundColor:"#E5E5E5"}}>
                {friends.map(friend => FriendComponent(friend,setFriendId))}
            </Col>
        </Row>
    </NavBar>);
}


