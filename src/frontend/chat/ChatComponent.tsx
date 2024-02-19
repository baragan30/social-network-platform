import React, { useEffect } from 'react';
import { AppUser } from '../../model/AppUser';
import UserService from '../../services/UserService';
import MessageService from '../../services/MessageService';
import MessageComponent from './MessageComponent';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import AppMessage from '../../model/AppMessage';
import { useState } from 'react';
import "./Chat.css";

export default function ChatComponent(curentUser: AppUser, friendId: number) {
    const [index, setIndex] = useState(0);
    function update() {
        setIndex(index + 1);
    }

    //daca nu ai nici un prieten selectat
    if (friendId === -1)
        return (
            <div className="no_chat">
                No Chat selected
            </div>
        );


    let messages = MessageService.getMessagesList(curentUser.id, friendId);
    let friend = UserService.getUser(friendId);

    function handleSubmit(event: any) {
        event.preventDefault();
        let message = event.target[0].value;
        event.target[0].value = "";
        let appMessage = new AppMessage(curentUser.id, friend.id, message);
        MessageService.saveMessage(appMessage);
        update();
    }

    return (
        <div>
            <div className="chat_title">
                Chat {friend.username}
            </div>
            <div className="messages_div">
                {
                    messages.map(message => MessageComponent(curentUser, friend, message))
                }
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="message">
                    <Form.Control type="text" placeholder="message" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </div>
    );


}