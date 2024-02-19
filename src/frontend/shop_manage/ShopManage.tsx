import React, { useState } from 'react';
import './ShopManage.css';
import NavBar from '../common/NavBar';
import { EventService } from '../../services/EventService';
import Image from 'react-bootstrap/Image';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { ShopService } from '../../services/ShopsService';
import { EventCategory } from '../../model/Event';

export default function ShopManage() {
    const {"*":idString} = useParams();
    const shop = ShopService.getShop(Number(idString))
    const [title,setTitle] = useState(shop.title)
    const [imageUrl,setImageUrl] = useState(shop.imageUrl);
    const [schedule,setSchedule] = useState(shop.schedule);
    const [location,setLocation] = useState(shop.location);
    const [description,setDescription] = useState(shop.description);
    const [products,setProducts] = useState(shop.products);
    const [categories,setCategories] = useState(shop.categories.map(c=>EventCategory[c]))
    let navigate = useNavigate();


    function update(){
        shop.title = title;
        shop.description = description;
        shop.imageUrl = imageUrl;
        shop.schedule = schedule
        shop.categories =  categories.map(c =>{
            let category:EventCategory =  c as unknown as EventCategory;
            category = (EventCategory[category])as unknown as EventCategory;
            return category;
        });
        ShopService.saveShop(shop)
        navigate('/shops');
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    
    let selectedProduct = {};

    function getSelectedProduct (e: any) {
      selectedProduct = e.target.value
      return selectedProduct
    }
      

  
    return (
        <NavBar >
             {/* Main Screen application */}
                  {/* Image header (cand be replaced with Card.Image component) */}

                    <Image className='header-image' src={shop.imageUrl }style={{height:"20%",width:"100%"}}>
                    </Image>
            <div>
                <form onSubmit={(e)=>{e.preventDefault();update();}}>

                
                    <div className='border-box'> 
                        <div className='row'>
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
                                 <button className='productsButton' onClick={()=>{navigate("../shop_manage_add_products/" + shop.id)}}>Add Products</button>
                                 <select className='select-products' onChange={getSelectedProduct}>
                                     <option>Select products</option>
                                    {products && products.map((product, index) =>
                                        <option key={index} value={product.name}>{product.name} - {product.price}</option>
                                    )}
                                </select>
                                <button className='productsButton' onClick={()=>{navigate("../shop_manage_edit_products/" +shop.id + "/" + selectedProduct )}}>Edit Products</button>
                            </div>
                        </div>   
                    </div>             

                    <input id="description" placeholder='Description' value={description} onChange={(ev)=>{
                                    setDescription(ev.target.value)
                                }}></input>
                    <button id='edit_btn'>
                        Edit shop
                    </button>

                </form>
            </div>
        </NavBar>
    );

}