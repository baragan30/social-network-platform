import React from "react";

import { Button, Card } from 'react-bootstrap';
import { AppUser } from '../../model/AppUser';
import AppMessage from '../../model/AppMessage';
import { right } from "@popperjs/core";


export default function MessageComponent(curentUser: AppUser, friend: AppUser, message: AppMessage) {
    if (curentUser.id == message.idTransceiver)
        return (
            <Card style={{ backgroundColor: "#abd9e9", textAlign: "end"}}>
                <Card.Title style={{fontSize:"12px", paddingRight:"5px"}}>
                    {curentUser.username}
                </Card.Title>
                <Card.Subtitle style={{fontSize:"22px", paddingRight:"10px"}}>
                    {message.message}
                </Card.Subtitle>
            </Card>
        )
    return (
        <Card style={{ backgroundColor: "#eff3f7" }}>
            <Card.Title style={{fontSize:"12px", paddingLeft:"5px"}}>
                {friend.username}
            </Card.Title>
            <Card.Subtitle style={{fontSize:"22px", paddingLeft:"10px"}}>
                {message.message}
            </Card.Subtitle>
        </Card>
    )
}
