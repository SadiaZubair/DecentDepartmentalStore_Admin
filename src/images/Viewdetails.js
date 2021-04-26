// import React, { useState,useEffect } from "react";
// import {NavLink,useParams,useHistory,Redirect} from 'react-router-dom';
// import "./Pendingdetails.css";
// import ListGroup from 'react-bootstrap/ListGroup'
// import Figure from 'react-bootstrap/Figure';
// import  FigureCaption from 'react-bootstrap/Figure';
// import FigureImage from 'react-bootstrap/Figure';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Button from 'react-bootstrap/Button';
// import fire from "../fire";
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

// function ViewDetails({ match }) {

//     const [status, setStatus]=useState('Pending');
//     const [products, setProducts]= useState([]);
    
//     let history= useHistory();
//     const [details, setDetails] = useState(

//        {firstname: '',
//         lastname: '',
//         email: '',
//         phone:'',
//         address: '',
//         city:'',
//         country:'',
//         bill:'',
//         date:'',
//     }
//     );
       
    
    
//     let orderidd = match.params.id;
//     let orderid=[]
//     const [orderdisplay, setOrderdisplay]=useState([]);
//     var db=fire.firestore();
//     const ViewOrders= async ()=>{
//       const citiesRef = db.collection('All Orders').doc(orderidd);

//       const doc = await citiesRef.get()
//       if (!doc.exists) {
//         console.log('No matching documents.');
//         return;
//       }  
  
//       else {
          
//         setDetails(
//             {
//                 firstname: doc.data().BuyerName,
//                 lastname: doc.data().BuyerName,
//                 email: doc.data().BuyerEmail,
//                 phone:doc.data().BuyerCell,
//                 address: doc.data().BuyerAddress,
//                 city:"Lahore",
//                 country:"Pakistan",
//                 bill: doc.data().BuyerPayment,
//                 date:doc.data().Date,
     
//             }
//         )
//         setProducts(doc.data().Item_list)
//             console.log(details, products);
//         }
      
  
//     }
   
//   useEffect(() => {
   
//     ViewOrders();
//   },[]);
   
//     // const [temp, setTemp]=useState(
//     //     {
//     //         firstname: "doc.data().BuyerName",
//     //             lastname: "doc.data().BuyerName",
//     //             email: "doc.data().BuyerEmail",
//     //             phone: 138000001,
//     //             address:" doc.data().BuyerAddress",
//     //             city:"Lahore",
//     //          country:"Pakistan"
//     //     }
//     // )
//     // const [temp1, setTemp1]=useState(
//     //     {
//     //        img: coffee,
//     //        quantity:2,
//     //        price:3,
//     //     }
//     // )

//     const cancel=(e)=>{
//         history.push('/TrackOrder')
//       }
//     return (
//         <>
//         <Grid container component="main" className="root" >
     
     
//         <div className="detail-container">
//          <div className="cust-details" >
//          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>   
//         <ListGroup>
//            <h5> Contact Information </h5>
//             <div className="cust-item">
//             <ListGroup.Item className="cust-item1" style={{backgroundColor:'rgb(248, 248, 248)'}}   action >
//                 {details.email}
//             </ListGroup.Item>
            
//             </div>
//             <h5> Shipping Information</h5>
//             <ListGroup horizontal > 
//             <div className="cust-item">
             
//             <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.firstname}
//             </ListGroup.Item>
//             </div>
//             <div className="cust-item">
               
//             <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.lastname}
//             </ListGroup.Item>
//             </div>
//             </ListGroup>
//             <div className="cust-item">
//             <ListGroup.Item className="cust-item1" style={{backgroundColor:'rgb(248, 248, 248)'}}  action variant="secondary">
//                 {details.address}
//             </ListGroup.Item>
//             </div>
//             <ListGroup horizontal > 
//             <div className="cust-item">
             
//             <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.city}
//             </ListGroup.Item>
//             </div>
//             <div className="cust-item">
               
//             <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.country}
//             </ListGroup.Item>
//             </div>
//             </ListGroup>
//             <ListGroup horizontal > 
//             <div className="cust-item">
             
//             <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.phone}
//             </ListGroup.Item>
//             </div>
//             <div className="cust-item">
               
//             <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
//                 {details.date}
//             </ListGroup.Item>
//             </div>
//             </ListGroup>

//         </ListGroup>

//         <button type="button" style={{backgroundColor: '#0277BD', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} onClick={(e)=> cancel(e)} class="btn back-color rounded-pill">Back</button>
       
//         </Grid>
//         </div>
       

//         <Grid item xs={false} sm={5} md={7}  >
//         <div className="cust-products">
//         {products.map((product)=>(
//             <div className='fig-image'>
            
//             <Figure>
//             <ListGroup horizontal > 
//             <Figure.Image
//               width={80}
//               height={100}
//               alt="100x120"
//               src={product.img}
//               margin='20px'
              
//             />
//             <div className='figure-name'>
//             {product.name} {product.qty}x
//             </div>
//             <div className="figure-price" style={{marginBlockEnd:'0' }}>
//                 Rs.{product.price}
//             </div>
//             </ListGroup > 

//           </Figure>
//           </div>
//         ))}
        
//         {/* <div className='figure-name'> Total </div> */}
//          {/* <div className="figure-price" >
//               Rs.{details.bill}
//             </div> */}
      
//         </div>
//         </Grid>

//         </div>  
       
//         </Grid>
//         </>
//     );

// }

// export default ViewDetails;
import React, { useState } from 'react';
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
import { ArrowRight, LaptopWindows } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import final from './decentlogo.png'
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useAlert } from 'react-alert'
import { Route, useHistory } from "react-router-dom";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import fire from '../fire'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import {NavLink,useParams,Redirect} from 'react-router-dom';
import "./Pendingdetails.css";
import ListGroup from 'react-bootstrap/ListGroup'
import Figure from 'react-bootstrap/Figure';
import  FigureCaption from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/Figure';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width : '260vh',
    float: 'left',
    alignItems : 'left',

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
  large :{
    paddingRight : '1cm',
    paddingLeft : '0.4cm',
    width : '5cm',
  },
  
  temp:{
    color: '#fff',
  },
  crossalign:{
    backgroundColor: '#0277BD',
    color: '#fff',
    width: 100,
    
  
  },
  adjustSubmit:{
   color: '#fff',
   backgroundColor: 'grey',
  
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
  margin: {
    margin: theme.spacing(1),
    width : '81ch',
  
  },
  margin1: {
    margin: theme.spacing(1),
    marginBlockStart : theme.spacing(5),
    width : '20cm',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
  },
}));





  
export default function  SignInSide({match}) {
    const classes = useStyles();

  let shoppingCart;
    const [status, setStatus]=useState('Pending');
    const [products, setProducts]= useState([]);
    const [totalPrice, setprice] = useState(0)
    let history= useHistory();
    const [details, setDetails] = useState(

       {firstname: '',
        lastname: '',
        email: '',
        phone:'',
        address: '',
        city:'',
        country:'',
        bill:'',
        date:'',
    }
    );
       
    const location = useLocation();

  useEffect(() => {
    setprice(location.price)
 }, [location]);
    
    let orderidd = match.params.id;
    let orderid=[]
    const [orderdisplay, setOrderdisplay]=useState([]);
    var db=fire.firestore();
    const ViewOrders= async ()=>{
      const citiesRef = db.collection('All Orders').doc(orderidd);

      const doc = await citiesRef.get()
      if (!doc.exists) {
        console.log('No matching documents.');
        return;
      }  
  
      else {
          
        setDetails(
            {
                firstname: doc.data().BuyerName,
                lastname: doc.data().BuyerName,
                email: doc.data().BuyerEmail,
                phone:doc.data().BuyerCell,
                address: doc.data().BuyerAddress,
                city:"Lahore",
                country:"Pakistan",
                bill: doc.data().BuyerPayment,
                date:doc.data().Date,
     
            }
        )
        setProducts(doc.data().Item_list)
            console.log(details, products);
        }
      
  
    }
   
  useEffect(() => {
   
    ViewOrders();
  },[]);

  let cart = products.map((content ,key) =>{
    return(
      
      <List >
      <ListItem alignItems="flex-start">
    <img src ={content.img} className={classes.large}  height = "100" width ="100"  align = "left"  />
    <ListItemText
          primary={content.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.middle}
                color="textPrimary"
              >
                  {`Rs ${content.qty *content.discountedprice}`}
              </Typography>
              {`   -- ( ${content.qty} x ${content.discountedprice} )`}
            </React.Fragment>
            
          }
        />
    </ListItem>
   
      </List> 
    )
  });
  const cancel=(e)=>{
            history.push('/TrackOrder')
          }
  
 
  
  return (
  <div>   
    <Grid container component="main" className={classes.root}  >
     
     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    
     <Typography component="h3" variant="h5" className = "MuiTypography-h3">
           Contact Information 
    </Typography>

         <FormControl   >
         
         <ListGroup.Item   className={classes.margin}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.email}
        </ListGroup.Item>
        </FormControl>
        <Typography component="h4" variant="h6" className = "MuiTypography-h4">
            Shipping Address

        </Typography>
        <FormControl >
         
        <ListGroup.Item  className={clsx(classes.margin, classes.textField)}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.firstname}
        </ListGroup.Item>
        </FormControl>

        <FormControl  >
 
            <ListGroup.Item  className={clsx(classes.margin, classes.textField)}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.lastname}
        </ListGroup.Item>
        </FormControl>
        <ListGroup.Item   className={classes.margin}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.address}
        </ListGroup.Item>

        <FormControl>
        <ListGroup.Item  className={clsx(classes.margin, classes.textField)}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.city}
        </ListGroup.Item>
        </FormControl>
        <FormControl >
        <ListGroup.Item  className={clsx(classes.margin, classes.textField)}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
        {details.country}
        </ListGroup.Item>
        </FormControl>
        <ListGroup.Item   className={classes.margin}  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                   {details.phone}
        </ListGroup.Item>


      

<h5 className = {classes.temp}>hello</h5>
            <Button
              type="submit"
              
              variant="contained"
              className ={clsx(classes.margin, classes.crossalign)}
              // onClick ={checkFields}
              
              onClick={(e)=> cancel(e)} 
            >
              Back
            </Button>
   
           
     </Grid>
     <Grid item xs={false} sm={48} md={7}  >
     <h1 className ="text"> Order </h1>
      {cart}
      <div className ="text1">
      <Divider  className = "MuiDivider-root"/>
      </div>
      {/* <div className ="final">
          <h6>Price  Rs.{totalPrice} </h6>
          
         
        </div> */}
      </Grid>
    
    </Grid>
    
       </div>
  );
}