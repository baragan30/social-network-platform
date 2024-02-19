import React, { useState } from 'react';
import './AddProducts.css';
import NavBar from '../../common/NavBar';
import { EventService } from '../../../services/EventService';
import Image from 'react-bootstrap/Image';
import { useNavigate, useParams } from 'react-router';
import { ShopService } from '../../../services/ShopsService';
import { Product } from '../../../model/Product';

export default function AddProducts() {

    const {"*":idString} = useParams();
    const id:number = Number(idString)
    const [shop,setShop] = useState(ShopService.getShop(id));
    const [name,setName] = useState("")
    const [price,setPrice] = useState("");
    let navigate = useNavigate();

    function update(){
       shop.products.push(new Product(name,price));
       console.log(shop.products);
       ShopService.saveShop(shop)
       navigate('/shops');
    }

    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}
                    <Image className='header-image' src={shop.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
            <div>
                <form onSubmit={(e)=>{e.preventDefault();update();}}>
                    <input id="name" placeholder='Name' value={name} onChange={(ev)=>{
                                    setName(ev.target.value)
                                }}></input>  
                    <input id="price" placeholder='Price' value={price} onChange={(ev)=>{
                                    setPrice(ev.target.value)
                                }}></input>

                    <button id='add_btn'>
                        Add product
                    </button>
                </form>
                
            </div>
        </NavBar>
    );

}