import React, { useState } from 'react';
import './ShopCreate.css';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import { FaWheelchair } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import { EventCategory } from '../../model/Event';
import { ShopService } from '../../services/ShopsService';
import Shop from '../../model/Shop';


export default function ShopCreate () {

    const [title,setTitle] = useState("")
    const [imageUrl,setImageUrl] = useState("");
    const [schedule,setSchedule] = useState("");
    const [location,setLocation] = useState("");
    const [description,setDescription] = useState("");
    const [categories,setCategories] = useState([])
    let navigate = useNavigate();


    function update(){
        let cats =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });
        let shop = new Shop(
            EventService.getNewID(),
            UserService.getAuthentificatedUser().id,
            title,
            imageUrl,
            schedule,
            cats,
            description,
            location, []
        )
        ShopService.saveShop(shop)
        navigate('/shops');
    }

  
    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={imageUrl}>
                    </Image>
            <div>
            <form onSubmit={(e)=>{e.preventDefault();update();}}>

                
                    <div className='border-box'> 
                    <div className='row' style={{width:"100%"}}>
                        <div className='column'>
                        <input id="title" placeholder='Title' value={title} onChange={(ev)=>{
                                    setTitle(ev.target.value)
                                }} ></input>  
                                <input id="imageurl" placeholder='image url' value={imageUrl} onChange={(ev)=>{
                                    setImageUrl(ev.target.value)
                                }}></input>
                                <input id="schedule" placeholder='Schedule' value={schedule} onChange={(ev)=>{
                                    setSchedule(ev.target.value)
                                }}></input>
                                <input id="location" placeholder='Location' value={location} onChange={(ev)=>{
                                    setLocation(ev.target.value)
                                }}></input>
                        </div>

                        <div className='column'>
                            <Multiselect
                                id="category_btn"
                                isObject={false}
                                placeholder="Edit category"
                                selectedValues={categories}
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={(e)=>{
                                    setCategories(e);
                                }}
                                onSearch={function noRefCheck() { }}
                                onSelect={(e)=>{
                                    setCategories(e);
                                }}
                                options={
                                    Object.keys(EventCategory).filter((item) => {
                                        return isNaN(Number(item));
                                    })
                                }
                            />
                        </div>
                    </div>   

                    </div>         
                   


                    <input id="description" placeholder='Description' value={description} onChange={(ev)=>{
                                    setDescription(ev.target.value)
                                }}></input>

                    <button id='add_shop_btn'>
                        Add shop
                    </button>

                </form>
            </div>
        </NavBar>
    );

}