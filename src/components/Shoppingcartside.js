import React from 'react';
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
//import TheFigure from './components/Figure';
import ListGroup from 'react-bootstrap/ListGroup';
import "./Shoppingcartside.css";
import AlignItemsList from './Lists';
//import CounterInput from 'react-bootstrap-personalized-counter';
//ReactDOM.render(<CounterInput value={2} min={1} max={50} glyphPlus={{glyph:'fa fa-plus', position:'left'}} glyphMinus={{glyph:'fa fa-minus', position:'right'}} onChange={ (value) => { console.log(value) } } />, document.getElementById('page'));




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width : '120vh',
    // alignItems:'right',
    float: 'right'
   
  }

  ,
  box: {
    // height: 100,
    // display: "flex",
    // border: "1px solid black",
    paddingRight: 0.5,
    height: 30,
    width: 30,
    paddingTop: 0.1,
    
  },
  adjust:{
    color: '#ffffff',

 },

  crossalign:{
    backgroundColor: '#0277BD',
    color: '#fff',

 },
 adjustSubmit:{
   color: '#0277BD',
   backgroundColor: '#fff',

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
    margin: theme.spacing(3, 0, 1),
  },

  alignit: {
      align: "left"
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} style={{width:'100%', height:'100%'}}  >
    <CssBaseline />
    
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <div style={{float: 'right'}} >
         <ClearIcon className ={classes.box}/>
         </div>
      <div className={classes.paper} style={{float: 'right'}} >
        
         
        
        <Typography component="h1" variant="h6" align="left">
          Shopping Cart
        </Typography>
        
        <form className={classes.form} noValidate>
      
          
        <div style={{float: 'right'}} >
            <ClearIcon className ={classes.box}/>
         </div>
        
         <AlignItemsList className={classes.paper}> 
         </AlignItemsList> 
       
         
    <Typography component="h1" variant="subtitle1">
          Total: Rs.50
        </Typography>
      
        <h7 className={classes.adjust}>hello </h7>
        <h7 className={classes.adjust}>hello </h7>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="#0277BD"
                
                  className={classes.crossalign}
                
                >
                  View Shopping Cart
                </Button>
                <h7 className={classes.adjust}>hello </h7>
         
    </form>
    </div>
    </Grid>
    </Grid>

  );
}


