import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { ArrowRight } from '@material-ui/icons';
import {  BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import logo from './LogoAdmin.png'
import fire from '../fire'

const useStyles = makeStyles((theme) => ({
    root: {
      height: '50vh',
      width : '120vh',
      // alignItems:'right',
      float : "right",
      paddingTop: '5rem',
      paddingRight: '5rem',
      paddingLeft: '5rem',
     
    }
  
    ,
    box: {
    
      paddingRight: 0.5,
      height: 30,
      width: 30,
      paddingTop: 0.1,
      className :"cross",
    },
    
    crossalign:{
       color: '#0277BD',
  
    },
    paper: {
      // width : '50vh',
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(2, 0, 1),
      backgroundColor : '#0277BD',
      color : '#ffffff'
    },
    forgot: {
        margin: theme.spacing(2, 0, 1),
        color: '#0277BD',
        backgroundColor  : '#ffffff'
      },
    image:{
        paddingTop: '5rem',
        width : "7cm",
        height : "7cm",
    },
  }));
  

export default function AdminLogin() {
  const classes = useStyles();
  const history = useHistory();
  const routeChange = (path) =>{ 
    // let path = `newPath`; 
    history.push(path);
  }

const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const [emailError, setEmailerror]= useState("")
const [passwordError, setPassworderror]= useState("")
const [user, setUser]= useState('')

  const clearInputs =() =>{

    setEmail('');
    setPassword('');
  }
  
  const authListener=()=> {

    fire.auth().onAuthStateChanged(user=>{
      if (user){
        
        clearInputs();
        setUser(user);
        var db=fire.firestore();
        const usersRef = db.collection('adminacc').doc(user.uid)
        usersRef.get()
        .then((docSnapshot) => {
        if (docSnapshot.exists) {
         usersRef.onSnapshot((doc) => {
          // routeChange('')
          });
        } else {
          setEmailerror("You are not an admin! Huh!")
          fire.auth().signOut().then(() => {
          
          }).catch((error) => {
  // An error happened.
          });
          
          return
        }
      });

        

        
        }
        else{
        setUser(false);
        
        }
      
    });
  };
  

  useEffect(()=> {
    authListener();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault()
    setEmailerror("")
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err=> {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailerror(err.message);
          break;
        case "auth/wrong-password":
          setPassworderror(err.message);
          break;
      }
    });

    



  };






  return (
  <div>
       <img src={logo} alt="" height = "200"  className = {classes.image}/>
    <Grid container component="main" className={classes.root}  >
       
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper} style={{float: 'right'}} >

        <Typography component="h1" variant="h5">
          Admin Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            
            id="formatted-text-mask-input"
           
            autoComplete="email"
            autoFocus
          />
          <p className="errorMsg"> {emailError}</p>
       
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}

          />
          <p className="errorMsg"> {passwordError}</p>
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#0277BD"
            onClick={handleLogin}
            className={classes.submit}
          
          >
            Sign In
          </Button>
          <Button
            type="cancel"
            fullWidth
            variant="contained"
            color="#fffff"
            
            className={classes.forgot}
            onClick={() =>routeChange(`ForgotPassword`)}
          >
           Forgot Password
          </Button>
         
        </form>
      </div>
    </Grid>
  </Grid>
  </div>
  );
}