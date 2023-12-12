import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";





   
   
const Details = async () =>{
    const [data2, setData2] = useState();
    const [visible, setVisible] = useState(false);
    await axios.get('http://localhost:8085/api/V1/myprofile/getAll').then((res)=>{
        console.log(res.data.result)
        if(res.status===200){
          setData2(res.data.result)
          
          setVisible(!visible);
        }
        else{
         console.error(res.message)
         setVisible(visible);
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })



return (
    <Grid
      textAlign={'justify'} item xs={12} >
            {visible &&data2.map((item) => (
                 <h4 style={{fontFamily:'initial', fontStyle:'oblique',color:'darkcyan'}}>
                  Name: {item.name} <br />
                Email: {item.email} <br />
                 Contact No: {item.contactNo} <br />
                 Age: {item.age} <br />
                 DOB: {item.dateOfBirth}</h4>
               
            ))}
               </Grid>
)

}

export default Details;