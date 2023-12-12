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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import Modal from '@mui/material/Modal'; 
import { Avatar, Backdrop, Card, Container, Fade, Grid, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios';
import { baseUrl } from '../Server/MyAxios';
import Profilemodal from '../pages/profile/profilemodal';

 
 
const drawerWidth = 200;
const navItems = ['Home','Profile','About', 'Contact','Logout'];



function DrawerAppBar(props) {
  
  const[dropProfile,setDropProfile]=useState(false)
  const[dropDesc,setDropDesc]=useState(false)
  const[dropExperience,setDropExperience]=useState(false)
  const[dropEducation,setDropEducation]=useState(false)
  const[dropSkills,setDropSkill]=useState(false)
  const[dropLang,setDropLang]=useState(false)
  const [hoveredItem, setHoveredItem] = useState(false)
  const [openModal, setOpenModal ] = useState(false);
  const navigate = useNavigate()
  const email=sessionStorage.getItem("id")
  const token=sessionStorage.getItem("token")
  

    // const aboutRef= React.createRef()
    // const homeRef= React.createRef()

    const {aboutRef}= props
    const {homeRef}= props
    const {contactRef}= props
    const handleLinkClick = (section) => {
      if(section==='Logout'){
        Swal.fire({
          icon: "warning",
          iconColor:"#d50000",
          title: 'Do you want to Leave?',
          showCancelButton: true,
          confirmButtonColor: '#2196F3',
          confirmButtonText:'yes',
          cancelButtonColor: '#d50000'
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.clear()
           
            Swal.fire({ 
              position: 'center',
              icon: 'success',
              title: 'Logout successfully completed ! Redirecting to Login page...',
              showConfirmButton: false,
              timer: 1500
            })
           
          navigate('/login');
          } 
        })
       
      }
      
      else if(section==='Home'){
        scrollToHome();
        return;
      }

      else if(section==='About'){
        scrollToAbout();
        return;
      }

      else if(section==='Profile'){
        setOpenModal(!openModal)
      
        return 
    }
      else if(section==='Contact'){
        scrollToContact();
        return
      }
      handleDrawerToggle();
    };

    const scrollToHome = () => {
      if (homeRef.current) {
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const scrollToContact = () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const scrollToAbout = () => {
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor:'#4694fa' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding sx={{ justifyContent: 'center' }} >
            <Button  sx={{ color: 'black' }} onClick={() => handleLinkClick(item)}>
              <ListItemText primary={item} />
            </Button>
          </ListItem>  
           
        ))}
          
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


 const handleModalClose = () => {
      setOpenModal(false)
      setDropProfile(false)
      setDropDesc(false)
      setDropExperience(false)
      setDropLang(false)
      setDropSkill(false)
      setDropEducation(false)
  } 

  const style = {
    position: 'absolute',
    top: '10%',
    left: '30%',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 'lg',
    p: 4,
    maxHeight: '90vh',
    overflowY:'scroll',
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
        url: `${baseUrl}/uploadPic`,
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
    <Box sx={{display:'flex'}}>
       <CssBaseline />
      <AppBar component="nav"  >
        
        <Toolbar>
          <IconButton
           
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
       
          <Typography
            variant="h6" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Menu
          </Typography>
         
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
            {navItems.map((item) => (
             <Button key={item} sx={{ color: '#fff' }} onClick={() => handleLinkClick(item)}>
             {item}
           </Button>
            
           ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,overflowY: 'auto'},
          }}
        >
          {drawer} 
        </Drawer> 
      </Box>
    
       <Modal   aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}>
    
      <Fade in={openModal}>
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

  </Fade>      
            </Modal> 
     </Box>
  );
}

DrawerAppBar.propTypes = {

  window: PropTypes.func,
};

export default DrawerAppBar;