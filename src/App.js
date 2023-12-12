import './App.css';  
import * as React from 'react';
import Profile from './pages/profile/profile'
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './pages/login/login';
import CreateProfile from './pages/login/createProfile';
import UserDetails from './pages/profile/Details';
import Details from './pages/profile/Details';
import ForgotPassword from './pages/login/forgotPassword';
import Update from './pages/profile/Update';

 function App() {
       return(
        
        <BrowserRouter>
        <Routes> 
        <Route path='/login/createProfile' element={<CreateProfile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/login/forgot-password/" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />}> </Route>
          <Route path="update-profile" element={<Update />} />
           
        </Routes> 
        </BrowserRouter>

        );
 };
export default App;







