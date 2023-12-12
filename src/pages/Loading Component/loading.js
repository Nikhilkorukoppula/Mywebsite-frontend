import { Box } from "@mui/material";
import React from "react";
import './loading.css';
import { Container, Modal } from "reactstrap";

function Loading (){
 
   
    return(
        <div style={{width:'100%', height:'100vh', backgroundColor:'white'}}>
<div class="wrapper" >
<div class="circle" style={{backgroundColor:'#fcb603'}}></div>
<div class="circle" style={{backgroundColor:'#9dfc03'}}></div>
<div class="circle" style={{backgroundColor:'#03fcdf'}}></div>
<div class="shadow"></div>
<div class="shadow"></div>
<div class="shadow"></div> 
<span style={{color:'#033dfc'}}>Loading....</span>
</div>
</div>
    )
} 

export default Loading
