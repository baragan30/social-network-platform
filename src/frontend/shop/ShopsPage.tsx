import React, { useState } from 'react';
import './Shop.css';
import NavBar from '../common/NavBar';
import Multiselect from 'multiselect-react-dropdown';
import { Card, Col, Row } from 'react-bootstrap';
import { BsFillPlusCircleFill } from "react-icons/bs";
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { ShopService } from '../../services/ShopsService';
import ShopCard from './ShopCard';
import { EventCategory } from '../../model/Event';

const ShopsPage: React.VFC = () => {
    let currentUser = UserService.getAuthentificatedUser();
    let navigate = useNavigate();
    const [shops, setShops] = useState(ShopService.getAllShops());
    const [categories, setCategories] = useState([]);

    function filter(ev: any) {
        ev.preventDefault();
        let search = ev.target[0].value;
        let shops = ShopService.getFilteredShops(search,categories)
        setShops(shops)
      }

    return (
        <NavBar>
            <div className="header">
                <form onSubmit={(e) => { filter(e); }} >
                    <input className='search_bar' type="text" placeholder="Search..." />
                    <Multiselect
                        id="multiselect_filter"
                        isObject={false}
                        placeholder="Filter by..."
                        onKeyPressFn={function noRefCheck() { }}
                        onRemove={(e) => {
                        setCategories(e);
                        }}
                        onSearch={function noRefCheck() { }}
                        onSelect={(e) => {
                        setCategories(e);
                        }}
                        options={
                        Object.keys(EventCategory).filter((item) => {
                            return isNaN(Number(item));
                        })
                        }
                    />
                    <input type="submit" hidden />
                </form>
                <img className="user_icon" src={currentUser.imageUrl} alt="user_icon" />
                <div className="username">{currentUser.username}</div>
            </div>
            <div className="sub_header">
                <div className='menu_div'>Shops</div>
                <BsFillPlusCircleFill className='plus_button_shop' onClick={()=>{navigate("../shop_create/")}} />
            </div>
            <div className="cards">
                <Row xs={1} md={3} className="g-4">
                    {
                        shops.map(shop => <ShopCard shop={shop}></ShopCard>)
                    }
                </Row>
            </div>

        </NavBar>
    )
}

export default ShopsPage;