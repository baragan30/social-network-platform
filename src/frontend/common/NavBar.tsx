import "./NavBar.css";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHome } from 'react-icons/fa';
import { IoMdSettings, } from 'react-icons/io';
import {IoLogOutSharp} from 'react-icons/io5';
import {AiFillMessage} from 'react-icons/ai'

export default function NavBar(props: any){
    const proportion = 2;
    
    return (
            <Row style={{height:"100%"}}>
                <Col xs={proportion} style={{padding : 0,paddingRight:0}}>      
                        <Nav  defaultActiveKey="/home" className="sidebar text-center ">
                        <Container className="rounded-circle nav-logo my-auto">
                            <Container className="h-100 d-flex align-items-center justify-content-center">
                                Logo
                            </Container>
                        </Container>
                        <Container className="my-auto">
                            <Nav.Link href="http://localhost:3000/home">
                                <FaHome className="nav-bar-icon"></FaHome>
                            </Nav.Link>
                            <Nav.Link href="http://localhost:3000/chat" >
                                <AiFillMessage className="nav-bar-icon"></AiFillMessage>
                            </Nav.Link>
                            {/* <Nav.Link href="http://localhost:3000/settings">
                                <IoMdSettings className="nav-bar-icon"></IoMdSettings>
                            </Nav.Link>  */}
                        </Container>
                        <Container className="my-auto">
                        <Nav.Link href="http://localhost:3000/login">
                            <IoLogOutSharp className="nav-bar-icon"></IoLogOutSharp>
                        </Nav.Link>  
                        </Container>
                    </Nav>`
                </Col>
                <Col  xs={12 - proportion} style={{padding:0}}>
                    {props.children}
                </Col> 
            </Row>
        
      );
}

export function NavBarExemple(){
    return(
         <NavBar>
            {/* Put here the content  */}
            <div style={{width:100,height:200,backgroundColor:"red"}}>

            </div>
            Here's an example of how to use NavBar
         </NavBar>
    )
}
