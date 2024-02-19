import logo from "../logo.svg";
import React from "react";
import './Authentication.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import UserService from "../../services/UserService";

export default function Register() {
    let navigate = useNavigate();
    function handleSubmit(event:any) {
        event.preventDefault();
        let username = event.target[0].value;
        let password = event.target[4].value;
        let repeatPassword = event.target[5].value;

        try{
            UserService.registerUser(username,password,repeatPassword);
            navigate('/login');
        }catch(e){
            console.log(e);
        }
        // event.target[0].value = "";
        // let appMessage = new AppMessage(curentUser.id,friend.id,message);
        // MessageService.saveMessage(appMessage);
        // update();
    }
    return (
        <div className="Body Register d-flex justify-content-center" >
            <header className="Register-header">
                <h1 className="d-flex justify-content-center">Register</h1>
                <br/>
                <p>Do you have an account? <a onClick={()=>{navigate("../login")}} className={"link"}>Login now</a></p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control type="text" placeholder="User name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Control type="text" placeholder="First name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Control type="text" placeholder="Last name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="repeatPassword">
                        <Form.Control type="password" placeholder="Repeat Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </header>
        </div>
    );
}
