import './App.css';  
import * as React from 'react';
import Profile from './pages/profile/profile'
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './pages/login/login';
import CreateProfile from './pages/login/createProfile';
import ForgotPassword from './pages/login/forgotPassword';
import Update from './pages/profile/Update';
import Homepage from './pages/homepage/homepage';

 function App() {
       return(
        
        <BrowserRouter>
        <Routes> 
        {/* <Route path='/' element={<Homepage/>}/> */}
        <Route path='/createProfile' element={<CreateProfile/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path="/forgot-password/" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />}> </Route>
          <Route path="update-profile" element={<Update />} />
           
        </Routes> 
        </BrowserRouter>

        );
 };
export default App;







