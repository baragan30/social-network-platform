import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { AppUser } from '../../model/AppUser';


export default function FriendComponent(friend:AppUser,setFriendId:Function){
    
    return (
        <Button onClick={()=>setFriendId(friend.id)}>
            <Card style={{height:"50px", backgroundColor:"#20df7f", border:"0px"}}>
                {/* <Card.Img variant='' src={friend.imageUrl}>

                </Card.Img> */}
                <Card.Title>
                    {friend.username}
                </Card.Title>
            </Card>
        </Button>
    )
}