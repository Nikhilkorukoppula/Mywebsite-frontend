import { Grid, TextField,Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader} from 'react-spinners';

import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Loading Component/loading";
 
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [data2, setData2] = useState();
    const[isLoading,setIsloading]=useState(false)
    const enterButtonRef = useRef();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

      useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            enterButtonRef.current.click();
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    const handleClick =async (e)=>{
     e.preventDefault();
     setIsloading(true)
     try{
        await axios.post('http://localhost:8085/api/V1/myprofile/forgot-mail',{
            "email":email
        }).then((res)=>{
            setIsloading(false)
            console.log(res.data)
            
            if(res.data.status===200){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'mail sent succesfully',
                    showConfirmButton: false,
                    timer: 1500
                  })  
            }
            else if(res.data.status===404){
                setIsloading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'please provide your mail id',
                    showConfirmButton: false,
                    timer: 2000
                  })  
            }
            else{
                console.log(res.status)
                setIsloading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'please provide valid mail id',
                    showConfirmButton: false,
                    timer: 2000
                  })  
            }
      
        })
    }
        catch(error){
            console.log("error occured in the request")
            setIsloading(false)
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Please enter valid mail ID',
              showConfirmButton: false,
              timer: 1500
            })
            };

        setEmail('')   
    }

    return(
      isLoading? <Loading/>
          
           :<div style={{justifyItems:'center',
                        justifyContent:'center',
                        alignItems:'cenetr', 
                        alignContent:'center',
                        height:'100vh',display:'flex'}} xs item={12}>
                             
             <Grid style={{justifyContent:'center', justifyItems:'center',
                            alignItems:'center',marginTop:'100px',height:'300px',width:'500px',textAlign:'center'}}
                            sx={{boxShadow:'1',borderRadius:'10px'}}>
           <h2>Forgot-password</h2>
            <TextField label="Email" style={{width:'300px'}}  onChange={handleEmailChange} required="please enter your emailId"/><br></br><br></br>
            <Button variant="contained" onClick={handleClick} ref={enterButtonRef} >
                       Send
                </Button> 
            </Grid>
          
           </div>
    );

}
export default ForgotPassword;