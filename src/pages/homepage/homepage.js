import React from "react";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/system";
import './homepage.css';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginLeft: 0,
    width: '25%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '25%',
    },
  }));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float:'right',
  }));
 
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '20ch',
        },
      },
      
    },
    
  }));

function Homepage () {

return (
<div className="main-div" sx={{ justifyContent:'center',
                                    justifyitems:'center',
                                    display:'flex' }}  item xs={12}>
                        <h1 className="div" sx={{ justifyContent:'center',
                                    justifyitems:'center',
                                    display:'flex' }}  item xs={12}>

                            A Greate Profile Perfectly Defines What You Are.!
                             
                        </h1>

</div>
);

};
export default Homepage;