import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import EventReviewPage from './frontend/event_review/EventReviewPage';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './frontend/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import {NavBarExemple} from './frontend/common/NavBar';
import { PopulationService } from './services/PopulationService';
import './index.css';

import Login from "./frontend/authentication/Login";
import Register from "./frontend/authentication/Register";
import Audience from "./audience/Audience";
import AttendEvent from "./attend-event/AttendEvent";
import ChatPage from './frontend/chat/ChatPage';
import YourEvents from './frontend/your_events/YourEvents';
import EventCreate from './frontend/event_create/EventCreate';
import ShopCreate from './frontend/shop_create/ShopCreate';
import Poll from './frontend/poll/Poll';
import ShopsPage from './frontend/shop/ShopsPage';
import EventManage from './frontend/event_manage/EventManage';
import AttendanceList from './frontend/event_manage/attendance_list/AttendanceList';
import ShopManage from './frontend/shop_manage/ShopManage';
import AddProducts from './frontend/shop_manage/add_products/AddProducts';
import EditProducts from './frontend/shop_manage/edit_products/EditProducts';
import PollsCreate from './frontend/polls_create/PollsCreate';
import PollsVote from './frontend/polls_vote/PollsVote';
import ShopDetails from './frontend/shop_details/ShopDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Login></Login>} />
        <Route path='/register/*' element={<Register></Register>} />
        <Route path='/home/*' element={<HomePage />} />
        <Route path='/your_events/*' element={<YourEvents />} />
        <Route path='/polls/*' element={<Poll />} />
        <Route path='shops/*' element={<ShopsPage />} />
          <Route path='/login/*' element={<Login />} />
          <Route path='/register/*' element={<Register />} />
        <Route path='/navbar/*' element={<NavBarExemple/>} />
          <Route path='/audience/*' element={<Audience/>} />
        <Route path='/event_review/*' element={<EventReviewPage/>} />
        <Route path='/chat/*' element={<ChatPage></ChatPage>} />

        <Route path='/attend_event/*' element={<AttendEvent/>} />
        <Route path='/event_create/*' element={<EventCreate></EventCreate>} />
        <Route path='/event_manage/*' element={<EventManage></EventManage>} />
        <Route path='/event_manage_attendance_list/*' element={<AttendanceList></AttendanceList>} />

        <Route path='/shop_create/*' element={<ShopCreate></ShopCreate>} />
        <Route path='/shop_details/*' element={<ShopDetails/>} />
        <Route path='/shop_manage/*' element={<ShopManage></ShopManage>} />
        <Route path='/shop_manage_add_products/*' element={<AddProducts></AddProducts>} />
        <Route path='/shop_manage_edit_products/*' element={<EditProducts></EditProducts>} />
        <Route path='/polls_create/*' element={<PollsCreate></PollsCreate>} />
        <Route path='/polls_vote/*' element={<PollsVote/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
