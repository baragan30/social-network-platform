import React, { useState } from 'react';
import './EditProducts.css';
import NavBar from '../../common/NavBar';
import { EventService } from '../../../services/EventService';
import Image from 'react-bootstrap/Image';
import { ShopService } from '../../../services/ShopsService';
import { useNavigate, useParams } from 'react-router';

export default function EditProducts() {

    const {"*":idString} = useParams();
    const str:string = String(idString)
    let spl = str.split('/');
    let id = spl[0];
    let selectedProduct = spl[1];
    const shop_id:number = Number(id)
    const product_name:string = String(selectedProduct);
    const [shop,setShop] = useState(ShopService.getShop(shop_id));
    let product = ShopService.findProductInShop(shop_id, product_name);

    const [name,setName] = useState(product.name)
    const [price,setPrice] = useState(product.price);

    let navigate = useNavigate();

    function edit(){
        for(let prod of shop.products){
            if(prod.name == product_name) {
                prod.name = name;
                prod.price = price;
            }
       
        }
        ShopService.saveShop(shop)
        navigate('/shops');
     }

    function deleteProd(){
        let products = [];
        for(let prod of shop.products){
            if(prod.name != product_name) {
                products.push(prod)
            }
        }
        shop.products = products;
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
                <form>
                    <input id="name" placeholder='Name' value={name} onChange={(ev)=>{
                                    setName(ev.target.value)
                                }} ></input>  
                    <input id="price" placeholder='Price' value={price} onChange={(ev)=>{
                                    setPrice(ev.target.value)
                                }} ></input>
                </form>
                <button id='addbtn'  onClick={(e)=>{e.preventDefault();edit();}}>
                    Edit product
                </button>
                <button id='deletebtn'onClick={(e)=>{e.preventDefault();deleteProd();}}>
                    Delete product
                </button>
            </div>
        </NavBar>
    );
}