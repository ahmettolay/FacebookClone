import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Label } from "@mui/icons-material";
import Post from '../../components/Post';
const theme = createTheme();

export default function Home() {
    const [profile, setProfile] = React.useState({
        name: '',
        username: '',
        avatar: '',
        about: '',
    });

    const [postList, setPostList] = React.useState([]);

    React.useEffect(()=>{
        fetch('http://localhost:9093/api/v1/userprofile/getmyprofile',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            }),
        }).then(data=> data.json())
        .then(data=>{
            setProfile(data);
        });
        fetch('http://localhost:9092/post/getposts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            }),
        }).then(data=> data.json())
        .then(data=>{
            setPostList(data);
        });
    },[]);

    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl" >
          <CssBaseline />          
            <Grid2 container sx={{
                marginTop: 8,
            }}>
                
                <Grid2 item xs={2} sx={{
                    backgroundColor: '#E8A0BF',
                    height: '80vh',
                    marginRight: '10px',
                    borderRadius: '10px',  
                    paddingTop: 3,                                           

                }} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Avatar
                        alt={profile.name}
                        src={profile.avatar}                    
                        sx={{ width: 100, height: 100}}
                        />
                        <label>{profile.name}</label> 
                        <label>{profile.username}</label>
                        <label>{profile.about}</label>
                    </Box>
                    
                </Grid2>
                <Grid2 item xs={4} sx={{
                    backgroundColor: '#C0DBEA',
                    height: '80vh',
                    marginRight: '10px',
                    borderRadius: '10px',
                    overflow: 'scroll',
                    
                }}>
                     <Box sx={{                    
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                  
                    }}>
                        {
                            postList.map((post,index)=>(
                                <Post item={post} key={index}/>
                            ))
                        }
                       
                       
                    </Box>
                </Grid2>
                <Grid2 item xs={2}  sx={{
                    backgroundColor: '#E8A0BF',
                    height: '80vh',
                    marginRight: '10px',
                    borderRadius: '10px',
                }}>
                </Grid2>
                
            </Grid2>
              
        </Container>
      </ThemeProvider>
    )
}