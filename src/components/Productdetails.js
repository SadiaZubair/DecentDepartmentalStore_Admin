

import {NavLink, useHistory} from 'react-router-dom';
import React, { useState,useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'

import Figure from 'react-bootstrap/Figure';
import  FigureCaption from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/Figure';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "./Productdetails.css";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import fire from "../fire";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
     
      
    },
    margin: {
    //   margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '60ch',
      
    },
    FormControl:{
        // width: '100ch !important',

    }
  }));


const Productdetails = ({match}) => {
  let history=useHistory()
  let id=match.params.id;
  const [discount, setDiscount]=useState(0);
  const [cat, setCat] = React.useState('');
  const [subcat, setSubcat] = React.useState('');
  const [img, setImg]=useState();
    const classes = useStyles();
    const [values, setValues] = React.useState({
      title: '',
      description: '',
      stock: '',
      price:'',
     
    });
    const Detailsprod= async ()=>{
      var db=fire.firestore();
      const citiesRef = db.collection('Products').doc(id);

      const doc = await citiesRef.get()
      if (!doc.exists) {
        console.log('No matching documents.');
        return;
      }  
  
      else {
          
        setValues(
                    {
                      title: doc.data().title,
                      description: doc.data().description,
                      stock: doc.data().stock,
                      price:doc.data().price,
                      
            
                    }
                )
                      setImg(doc.data().prodimg);
                      setDiscount(doc.data().discount);
                      setCat(doc.data().category);
                      setSubcat(doc.data().subcategory);
           }
      
  
    }
    const [menu, setMenu]=useState([]);
    var array= new Array()
		
		const searchCat = async () => {
    var db=fire.firestore();
		const citiesRef = db.collection('category');
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  		console.log('No matching documents.');
  		return;
		}  
		snapshot.forEach(doc => {
  		array.push(doc.id)
  		console.log(doc.id)		});
      setMenu(array);



		}
  
  
   
    const [submenu, setSubmenu]=useState([]);
  var array1= new Array()
		var db=fire.firestore();
		const searchSubcat = async (cat) => {
		const citiesRef = db.collection('category').doc(cat).collection('subcategory');
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  		console.log('No matching documents.');
  		return;
		}  

		snapshot.forEach(doc => {
  		array1.push(doc.id)
  		console.log(doc.id)		});
      
      setSubmenu(array1);

		}
    useEffect(() => {
   
      Detailsprod();
      searchCat();
     
    },[]);
  const saveChanges = (e) => {
    e.preventDefault();
    if(cat=='' ||subcat==''|| discount==''|| values.title==''|| values.description==''|| values.stock==''||values.price=='')
    {
      window.alert('Required fields are missing')
    }
    else
    {
    var db=fire.firestore();
    db.collection("Products").doc(id).update({
      title: values.title,
      description:values.description,
      category: cat,
      subcategory: subcat,
      stock: values.stock,
      price:values.price,
      prodimg: img,
      discount: discount,
    }).then(function(){
      setOpensnack(true);;
    }).catch(function(error){
      window.alert("error1",error.message)
      return;
    });
  }
  }
   
    const handleChangediscount=(value)=>{
      if(value <=100)
      {
        console.log(value);
        setDiscount(value);
      }
    }
    const [opensnack, setOpensnack] = React.useState(false);
    const handleClosesnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpensnack(false);
    };
   
   
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const cancel=(e)=>{
      history.push('/Products')
    }
    
    return(
       <>
      <div className="product-container">
      <div className="product-contain">
      
       <Figure className='product-img' >
        <Figure.Image
            width={220}
            height={250}
            alt="171x180"
            src={img}
        />
       
        </Figure>
        <div className={classes.root}>
     
     
      <div>
          <div className="product-titles">
          <h5>Title </h5>
          </div>
          <FormControl fullWidth className={classes.margin} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Title</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={values.title}
            required
            onChange={handleChange('title')}
            multiline
            // disabled='true'
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <div className="product-titles">
          <h5>Description</h5>
          </div>
        <div className="product-titles">
         
          </div>
          <FormControl fullWidth className={classes.margin} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Description</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={values.description}
            required
            onChange={handleChange('description')}
            multiline
            // disabled='true'
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <div className="product-titles">
          <h5> Categories </h5>
          </div>
          <ListGroup horizontal>
      
      <div>
      <TextField
        id="filled-select-currency"
        select
        required
        label="Category"
        value={cat}
        onChange={(e)=>{setCat(e.target.value); searchSubcat(e.target.value); }}
        style={{marginRight:'20px'}}
        className={clsx(classes.margin, classes.textField)}
        
        variant="filled"
      >
        {menu.map((option,index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      </div>
      
      <div>
      <TextField
        id="filled-select-currency"
        select
        required
        label="Subcategory"
        value={subcat}
        onChange={(e)=>setSubcat(e.target.value)}
        className={clsx(classes.margin, classes.textField)}
       
        variant="filled"
      >
        {submenu.map((option,index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      </div>
      </ListGroup>
        <div className="product-titles">
          <h5>Stock & Price </h5>
          </div>
        <ListGroup horizontal>
        <TextField
          label="Stock"
          id="filled-start-adornment"
          // disabled='true'
          type="number"
          required
          value={values.stock}
          onChange={handleChange('stock')}
          style={{marginRight:'20px', width:'39ch'}}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="filled"
        />
        
        
         <TextField
          label="Price"
          id="filled-start-adornment"
          // disabled='true'
          type="number"
          required
          value={values.price}
          onChange={handleChange('price')}
          style={{ marginRight:'20px', width:'39ch'}}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
          }}
          variant="filled"
        />
         <TextField
          label="% Discount"
          id="filled-start-adornment"
          // disabled='true'
          type="number"
          value={discount}
          required
          onChange={(e)=>handleChangediscount(e.target.value)}
          style={{  width:'39ch'}}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="filled"
        />
        </ListGroup>
        
      
      </div>
      <ListGroup horizontal > 
        
      <button type="button" style={{backgroundColor: '#0277BD',marginTop:'10%', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} onClick={(e)=> cancel(e)} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
      <button type="button"  onClick={(e)=>saveChanges(e)}style={{backgroundColor: '#0277BD',marginTop:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Save Changes</button>
        
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opensnack}
        autoHideDuration={6000}
        onClose={handleClosesnack}
        message="Product successfully updated"
        action={
          <React.Fragment>
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosesnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      
        </ListGroup>
    </div>
   
        </div>
        </div>
       </>
    )
   
}

export default Productdetails;