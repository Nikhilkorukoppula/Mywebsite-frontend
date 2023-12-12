
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Modal from '@mui/material/Modal'; 
import { Avatar, Grid, TextField } from '@mui/material';
import { baseUrl } from '../../Server/MyAxios';
import axios from 'axios';
import Profile from './profile';


export default function Profilemodal() {

    const[dropProfile,setDropProfile]=useState(false)
    const[dropDesc,setDropDesc]=useState(false)
    const[dropExperience,setDropExperience]=useState(false)
    const[dropEducation,setDropEducation]=useState(false)
    const[dropSkills,setDropSkill]=useState(false)
    const[dropLang,setDropLang]=useState(false)
    const [hoveredItem, setHoveredItem] = useState(false)
    const [openModal, setOpenModal ] = useState(false);

    const email=sessionStorage.getItem("id")
    const token=sessionStorage.getItem("token")
  const style = {
    position: 'absolute',
    top: '350px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'smooth',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 'lg',
    p: 4,
    maxHeight: '90vh',
    overflowY:'scroll',
    behavior:'smooth',
    }
  
  const  handleProfile=()=>{
setDropProfile(!dropProfile)
  }

  const handleExperience=()=>{
    setDropExperience(!dropExperience)
  }

  const handleEducation=()=>{
    setDropEducation(!dropEducation)
  }

  const handleSkills=()=>{
    setDropSkill(!dropSkills)
  }

  const handleDescription=()=>{
    setDropDesc(!dropDesc)
  }

  const handleLang=()=>{
    setDropLang(!dropLang)
  }

 const handleModalClose=()=>{
    setOpenModal(true)
    setDropProfile(false)
    setDropDesc(false)
    setDropExperience(false)
    setDropLang(false)
    setDropSkill(false)
    setDropEducation(false)
   
 }
 
useEffect(()=>{
    if(openModal){
    window.location.reload()
    }
},[openModal])

const handleMouseEnter = () => {
    setHoveredItem(true);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(false);
  }

  const fileInputRef = React.useRef(null);
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  
      const getPic=`${baseUrl}/getPic/${email}`
      
      const handleProfileChange = (file) => {
        let form =new FormData()  //for uploading mulitpart file 
        form.append("file",file.target.files[0]) 
     
  
      axios({ //it is used to call the service to conmplt the operation(upload)
        method: "put",
        url: `${baseUrl}/uploadPic/${email}`,
        data:form,
        headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
      
      })
        .then((response) => {
          console.log(response.data);
              
          if(response.status===200){
            window.location.reload()
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  return (
    <Modal>
   <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:'5px'
    }}>
        <Box sx={style} borderRadius={'10px'} >
            <form onSubmit={''} >
              <Grid sx={{display:'flex',justifyContent:'center'}}> 
               <Typography variant="h6">PROFILE SETTINGS</Typography>
              </Grid>
              <Grid style={{display:'flex',justifyContent:'center'}}>
              <Avatar xs={12}  style={{backgroundImage: `url(${getPic})`||'profile', width: '100px', height: '100px', }}
         >
          <form encType="multipart/form-data" >
         <input  type='file' className='my_file' onChange={handleProfileChange}  ref={fileInputRef}/>

           <CameraAltIcon style={{marginLeft:'45px', opacity: hoveredItem ? 1 : 0, transition:'1s'}}  
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave} 
           onClick={handleUploadButtonClick}
         >
           </CameraAltIcon>        
         </form>
        </Avatar> 
              </Grid>
              <hr></hr>
             <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px" color="red"onClick={handleProfile} style={{transition:'ease-in-out',behavior:'smooth'}}>PROFILE DETAILS</Typography>
                </Grid>
              {dropProfile&&( 
              <Box sx={{transition:'linear',behavior:'smooth'}}>
                <TextField required  id="outlined-required" label="Name"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                   <TextField required  id="outlined-required" label="Email"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 <TextField required  id="outlined-required" label="Address"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 <TextField required  id="outlined-required" label="Contact No"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                  <TextField required  id="outlined-required" label="Gender"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                  <TextField required  id="outlined-required" label="Date Of Birth"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                </Box>) }
               
                 <hr></hr>
                 <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px"onClick={handleDescription} style={{transition:'ease-in-out',behavior:'smooth'}}>DESCRIPTION</Typography>
                </Grid>
                 {dropDesc &&(<Grid>
                 <TextField required  id="outlined-required" label="Description"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 </Grid>)

                 }
                 <hr></hr>
                 <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px"onClick={handleExperience} style={{transition:'ease-in-out',behavior:'smooth'}}>EXPERIENCE</Typography>
                </Grid>
                 {dropExperience &&(<Box>
                  <TextField required  id="outlined-required" label="Experince"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 </Box>)

                 }
                   <hr></hr>
                   <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px"onClick={handleSkills} style={{transition:'ease-in-out',behavior:'smooth'}}>SKILLS</Typography>
                </Grid>
                 {dropSkills &&(<Box>
                  <TextField required  id="outlined-required" label="skills"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 </Box>)

                 }
                 <hr></hr>
                 <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px"onClick={handleEducation} style={{transition:'ease-in-out',behavior:'smooth'}}>EDUCATION</Typography>
                </Grid>
                 {dropEducation &&(<Box>
                  <TextField required  id="outlined-required" label="School"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 <TextField required  id="outlined-required" label="Inter/Diploma"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
              
                 <TextField required  id="outlined-required" label="Graduation"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 </Box>)

                 }
                  <hr></hr>
                  <Grid style={{display:'flex',height:'30px'}}>
                <Typography fontSize="15px"onClick={handleLang} style={{transition:'ease-in-out',behavior:'smooth'}}>LANGUAGES</Typography>
                </Grid>
                 {dropLang &&(<Box>
                  <TextField required  id="outlined-required" label="Language 1"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 <TextField required  id="outlined-required" label="Language 2"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
              
                 <TextField required  id="outlined-required" label="Language 3"
                    sx={{
                        width: '300px',
                        marginLeft:'60px',
                        marginTop:'5px'
                    }} 
                    defaultValue={''} 
                    onChange={''}
                />
                 </Box>)

                 }
                  <hr></hr>
               <Grid item xs={12} sx={{display:'flex',
    justifyContent:'center',
    alignItems:'center'
}}>
        <Button   sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" >UPDATE</Button>

        <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={handleModalClose} variant='contained' >Cancel</Button>
    </Grid>
            </form>
           
        </Box> 
  </Box>
  </Modal>
  )
}
