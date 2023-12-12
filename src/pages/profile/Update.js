import { Box, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Fade, Modal } from 'reactstrap'
import Profile from './profile'
import { useOpen } from '../../navbar/OpenContext '

const Update = () => {
    const [open, setOpen] = useOpen();
    const [openModal, setOpenModal ] = useState(false);
   
  
   

    useEffect(() => {
        
        if (open) {
            setOpenModal(true);
            setOpen(false); 
            console.log(openModal)
        }
    }, [open]);
   const handleModalClose = () => {
        setOpenModal(false)
    } 

const handleClick =()=>{
    openModal=true;
}
    const style = {
    position: 'absolute',
    top: '300px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'smooth',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'scroll',
    alignItems:'center',
    }
  return (
    <div>
        {/* <Button onClick={handleClick}>Click me</Button> */}
         <Modal   
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                isOpen={openModal}
                onClose={handleModalClose}
                closeAfterTransition>
                <Fade in={openModal}> 
                    <Box sx={{ 
                        display: 'flex',
                        position:'sticky',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={style}>
                            <form onSubmit={''}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="About Me"
                                    sx={{
                                        width: '100%',
                                        margin: '10px 0px'
                                    }} 
                                    defaultValue={''} 
                                    onChange={''}
                                />
                               
                               
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
    </div>
  )
}

export default Update