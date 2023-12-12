
import { Avatar, Box,Grid, Button, TextField,Fade,Typography,Modal, Container, ListItemText, ListItem, List} from '@mui/material'; 
import './profile.css';  
import * as React from 'react';
import { useState, useEffect , useRef} from 'react';
import {Create, Key } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import axios from 'axios';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DrawerAppBar from '../../navbar/navbar';
import {  useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { baseUrl } from '../../Server/MyAxios';
import { service } from '../../Services/Services';
import ReactApexChart from 'react-apexcharts';
import Update from './Update';

export  const ApexChart = () => {
  const chartData = {
    series: [{
      data: [92,90,75]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['SSC','Diploma', 'Btech',],
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={150} />
    </div>
  );
};


 function Profile() {

  // const token = sessionStorage.getItem("token")
  const names=['Name','Email','Contact No','Gender','DOB']
  const [data2, setData2] = useState([]);
  const [data1, setData1] = useState();
  const [description, setDescription] = useState();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const about = useRef(null);
  const home = useRef(null);
  const contact = useRef(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [showAvatar, setShowAvatar] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(false); 


  const email=sessionStorage.getItem("id")
  const token = sessionStorage.getItem("token");

  const handleMouseEnter = () => {
    setHoveredItem(true);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(false);
  }

  const handleClickProfile = async () => {
    try{
     await service.getAllDetails().then((response)=>{
 
      if (response.status === 200) {
        console.log(response.result);
        setData2(response.result);
        setVisible(!visible);
      } else if (response.status === 403) {
        console.error(response.data.message);
        setVisible(visible);
      }
  })
}
    catch(error){
  console.error(error);
    }
  };
  

  
    

     const handleClickDesc = async () => {
      
     
      await service.getDescription().then((res)=>{
        console.log(res.result)
        if(res.status===200){
          setDescription(res.result)
          setVisible1(!visible1);
        }
        else{
         console.error(res.message)
  
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })
    
     }
     const handleAboutSubmit =async(e)=>{
      e.preventDefault()
      try{
      await service.updateDescription(description).then((res)=>{
        console.log(res)
        if(res.status===200){
          Swal.fire({
            width: '400px',
            title: 'Updated Successfully',
            timer: '1000'
          });
        }
      })
      }
      catch(error){
        console.error(error)
      }
    }
    
     const fileInputRef = useRef(null);

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

  

    //  const scrollToAbout = () => {
    //    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    //  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =window.scrollY || document.documentElement.scrollTop;
      setScrollCount((scrollPosition) => scrollPosition + 1);
      if(scrollPosition === 0){
        setScrollCount(0)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollCount >= 10) {
      setShowAvatar(false);
      handleClickProfile()
      handleClickDesc()
      document.body.style.animation= 'smooth'
    }
  else {
   setShowAvatar(true)
   setVisible(false)
   setVisible1(false)
  }
  }, [scrollCount>=10]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
    document.body.style.overflow = 'scroll';
}
  const handleModalClose = () => {
    setOpenModal(false);
  }



useEffect(() => {
  checkTokenExpiration();
  return () => {
  };
}, []);

const navigate = useNavigate();
const checkTokenExpiration = () => {
  const token = sessionStorage.getItem('token');
if (token) {
  try {
    const decodedToken = jwt_decode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      Swal.fire({
        width: '400px',
        Icon:'error',
        title: 'Session exprired',
        text: 'Redirecting, please wait',
        timer: '1000'
      });
      navigate('/login');
    }
  } catch (error) {
    Swal.fire({
      width: '400px',
      Icon:'error',
      title: 'Something went wrong',
      text: 'Please wait',
      timer: '2000'
    });
  
    console.error('Failed to decode token:', error);
  }
} else {
   Swal.fire({
  width: '400px',
  Icon:'error',
  title: 'Something went wrong',
  text: 'Please wait',
  timer: '1000' 
});
 
  console.error('Token not found');
  navigate('/login');
}
};

useEffect(()=>{
  console.log()
},[])

  return (
    
      
    <div className="App" item={'true'} xs={12} 
    sx={{ justifyContent:'center',
           justifyitems:'center',
           
           }}  >
            
            <DrawerAppBar aboutRef={about} homeRef={home} contactRef={contact}  ></DrawerAppBar>   
      <header className="App-header" ref={home}>
      <div style={{position:'fixed'}}>
            <img 
            src={require('./computer.jpg')} alt='deleted'> 
           
        </img>   
        </div>    
      </header>
     
      <div className='div-cont'   sx={{ justifyContent:'center',
           justifyitems:'center',
           felxDirection:'column' }}  >
      <Box width={'100%'} height={'90px'}
         sx={{ justifyContent:'center',
         boxShadow:3, 
        backgroundColor:'white',
         justifyitems:'center',
         display:'flex' }} >
         
            
           
        <Box className='div-cont2'
           sx={{
            boxShadow: 0, justifyContent:'center',
           justifyitems:'center',
           display:'flex' ,transition:'0.3s ease'}} >
              
      
          {showAvatar ? (
          <Avatar xs={12}  className='Avatar'
          style={{backgroundImage: `url(${getPic})`||'profile', width: '100px', height: '100px', }}
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
        
        ):(
        
         <p className='avatar-name'>Nikhil <br></br>
          <br></br></p> 
             )}
          
        
             
        </Box>
        </Box>
       
      </div>
      

       <Box   ref={about}
      className="div-cont1"
      sx={{
        justifyContent: 'center',
        justifyItems: 'center',
        display: 'flex',
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} >
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid >
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClickDesc}
                >
                  <h3>Who Am I ?</h3>
                </Button>
              </Grid>

              <Grid >
                <Grid
                  textalign="justify"
                  item
                  xs={12}
                  padding="25px"
                  sx={{ mt: 2 }}
                >
                  {visible1 && description}
                  <Button>
                    <Create
                      color="primary"
                      sx={{
                        cursor: 'pointer'
                      }}
                      onClick={handleModalOpen}
                    ></Create>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
           </Grid>
        
        <Grid item xs={12} sm={4} >
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          
          >
            <Grid container direction="column" alignItems="center">
              <Grid>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClickProfile}
                >
                  <h3>Profile</h3>
                </Button>
              </Grid>

              <Grid>
                <Grid textalign="justify" display="flex">
                 
                  {visible &&
                    data2.map((item) => (
                      <Typography
                        style={{
                          fontFamily: 'initial',
                          fontStyle: 'oblique',
                          color: 'blueviolet',
                          fontSize: '20px'
                        }}
                      key={item}>
                        <div style={{justifyContent:'center'}}>
                    <p>  Name    : {item.name} <br/>
                     Email     : {item.email}  <br/>
                     Contact No:{item.contactNo} <br/>
                    Gender    :{item.gender} <br/>
                      DOB       :{item.dateOfBirth}</p>
                      </div>
                      </Typography>
                  
                    ))}
                   
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClickProfile}
                >
                  <h3>Experience</h3>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid> 
        </Grid>

    <Grid item xs={12} sx={{height:'50px',
    width:'100%',
         justifyContent:'flex-start',
        justifyitems:'', 
        display:'flex',marginLeft:'100px' }}>
<h3 style={{color:'#d13459'}}>My Resume</h3>
    </Grid>    
   
<Grid container spacing={4}>
   <p style={{paddingLeft:'60px'}}></p>
        <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid >
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Education</h3>
      </Button>
      <div>
      <ApexChart/>  
      </div>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>


     <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid >
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Skills</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>
    
    
    
    <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Languages</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>
     </Grid>

     <Box item xs={12} sm={3.5} ref={contact} style={{ 
      display:'flex',
      backgroundColor:'white',
      width:'100%',
      height:'500px'}}>
        <Grid sx={{marginLeft:'100px',color:'#d13459'}}>
          <span><h3 >Contact Details</h3></span>
        </Grid>
       <br/>
         <form >
           <Grid sx={{display:'flex',justifyContent:'center',justifyItems:'center',
           height:'250px',
           width:'100%',
           marginTop:'50px',
           backgroundColor:'white',
           }}>
          <Grid sx={{display:'flex',flexDirection:'column'}}>
          <TextField sx={{width:'500px',marginTop:'20px'}} label='Name'></TextField>
          <TextField sx={{width:'500px',marginTop:'20px'}} label='EmailID'></TextField>
          <TextField sx={{width:'500px',marginTop:'20px'}} label='Conatact No' type='number'></TextField>
          
          </Grid>
        <Grid>
        <TextField id="outlined-multiline-static"
          label="Comments"
          multiline
          rows={7.5} sx={{width:'500px',marginTop:'20px',marginLeft:'30px'}} ></TextField>
          
        </Grid>
        </Grid>
        <Button variant="contained" enableElevation>
                Submit
           </Button>
         </form>
         
     </Box>
     </Box>

    


    <Box className='footer'>
    <br></br><br />
     <footer >
     <br></br><br />  <br></br><br />
    <FacebookIcon/>&nbsp;
    <InstagramIcon/>&nbsp;
    <GoogleIcon/>&nbsp;
    <SubscriptionsIcon/>&nbsp;
    <ReportGmailerrorredIcon/>&nbsp;
    <TwitterIcon/>
    </footer> 
    </Box>      
            </div> 
           
  );
}

export default Profile;
