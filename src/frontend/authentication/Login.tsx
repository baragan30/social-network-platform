import logo from "../logo.svg";
import React from "react";
import './Authentication.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from "../common/NavBar";
import { PopulationService } from '../../services/PopulationService';
import UserService from '../../services/UserService';
import { useNavigate } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Login() {
    const navigate = useNavigate();
    function handleSubmit(event: any) {
        event.preventDefault();
        let username = event.target[0].value;
        let password = event.target[1].value;
        try {
            UserService.authentificateUser(username, password);
            navigate('/home');
        } catch (e) {
            console.log(e);
            confirmAlert({
                title: 'Login failed',
                message: 'Username or password are incorrect',
                buttons: [
                    {
                        label: 'Close',
                    }
                ]
            });

        }
        // event.target[0].value = "";
        // let appMessage = new AppMessage(curentUser.id,friend.id,message);
        // MessageService.saveMessage(appMessage);
        // update();
    }
    return (
        <div className="Body Login d-flex justify-content-center" >
            <header className="Login-header">
                <h1 className="d-flex justify-content-center">Sign in</h1>
                <br/>
                <p>You do not have an account? <a onClick={()=>{navigate("../register")}} className={"link"}>Create one now</a></p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control type="text" placeholder="User name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                    <Button variant="primary" onClick={() => {
                        PopulationService.populate();
                        PopulationService.authentificateFirstUser();
                    }}>
                        Populate
                    </Button>

                </Form>
            </header>
        </div>
    );
}
