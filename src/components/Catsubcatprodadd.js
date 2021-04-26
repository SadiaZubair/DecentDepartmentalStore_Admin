

import {useHistory} from 'react-router-dom';
import React, { useState, useEffect} from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import coffee from "./images/coffee.jpg";
import cocomo from "./images/cocomo.jpg";
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
import MenuItem from '@material-ui/core/MenuItem';
//import {UploadButtons, productImg} from './Uploadbutton';
import UploadButtons from './Uploadbutton';
//import productImg from './Uploadbutton';

import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import fire from '../fire'


const useStylesbutton = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  // input: {
  //   display: 'none',
  // },
}));


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

  const useStyles1 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    // input: {
    //   display: 'none',
    // },
  }));
  
const Catsubcatprodadd = ({match}) => {
    let category=match.params.category;
    let subcategory=match.params.subcategory;
    
  let history=useHistory();
  const classesbutton = useStylesbutton();

  const [error1, setError1] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const [productImg, setProductImg] = useState(null)
  var img;
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
           
            img=selectedFile
            console.log(productImg)
            setError1('')
        }
        else {
            setProductImg(null);
            setError1('Please select a valid image type (jpg or png)');
        }
    }
    const auth = fire.auth();
  
    const storage = fire.storage();
  
  //  let productImg = "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    const classes = useStyles();
    const classes1 = useStyles1();
    
    const [discount, setDiscount]=useState(0);
  const [cat, setCat] = React.useState('');
  const [subcat, setSubcat] = React.useState('');
  
  
    const [values, setValues] = React.useState({
      title: '',
      description: '',
      stock: '',
      price:'',
     
    });
    const handleChangediscount=(value)=>{
      if(value <=100)
      {
        // console.log(value);
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

    const [error, setError] = useState('');
    
    const saveChanges = (e) => {
      e.preventDefault();
      if(cat=='' ||subcat==''|| discount==''|| values.title==''|| values.description==''|| values.stock==''||values.price==''|| productImg=='')
      {
        window.alert('Required fields are missing')
      }
     
      
      else
      {
        const db = fire.firestore();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
          //console.log(uploadTask)
          uploadTask.on('state_changed', snapshot => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log(progress);
          }, err => setError(err.message)
              , () => {
                  storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                     
                      db.collection('Products').add({
                        title: values.title,
                        description: values.description,
                        category: cat,
                        subcategory: subcat,
                        stock: values.stock,
                        price:values.price,
                        prodimg: url,
                        discount: discount,
                      }).then((function(docRef){
                        //setDockid(docRef.id)
                        var db1=fire.firestore();
                        // console.log(docRef.id)
                        db1.collection("Products").doc(docRef.id).update({
                          prod_id:docRef.id
                    });
                        })).catch(err => setError(err.message))
                  })
              })
    

     
      setOpensnack(true);
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
  		});
      setMenu(array);



		}
  
  
   
    const [submenu, setSubmenu]=useState([]);
  var array1= new Array()
		var db=fire.firestore();
		const searchSubcat = async (cat) => {
		const citiesRef = db.collection('category').doc(cat).collection('subcategory');
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  	
  		return;
		}  

		snapshot.forEach(doc => {
  		array1.push(doc.id)
  		console.log(doc.id)		});
      
      setSubmenu(array1);

		}
    useEffect(() => {
   
      // Detailsprod();
      searchCat();
     
    },[]);

     
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //console.log(values)
    //console.log(values.title)
   
    const cancel=(e)=>{
      history.push('/Categories/'+category+'/'+ subcategory)
    }

    
    return(
       <>
      <div className="product-container">
      <div className="product-contain">

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
            onChange={handleChange('title')}
            multiline
           
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
            onChange={handleChange('description')}
            multiline
            
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
          label="Category"
          value={cat}
          onChange={(e)=>{setCat(e.target.value);searchSubcat(e.target.value)}}
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
          value={values.stock}
          onChange={handleChange('stock')}
          style={{marginRight:'22px', width:'39ch'}}
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
          value={values.price}
          onChange={handleChange('price')}
          style={{ marginRight:'22px', width:'39ch'}}
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
          onChange={(e)=>handleChangediscount(e.target.value)}
          style={{  width:'39ch'}}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="filled"
        />
        </ListGroup>
        
        <div className={classesbutton.root}>
          
          <label>
            <h5>Upload Image</h5> 
            <br/>
      <input style={{backgroundColor:'0277BD'}} accept="image/*" className={classesbutton.input} id="contained-button-file" type="file" onChange={productImgHandler} />
      </label>
      {/* <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Picture
        </Button>
      </label> */}
         
       
        {/* <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> */}
     
     
    </div>
    
   
    </div>
      <ListGroup horizontal > 
      <button type="button" style={{backgroundColor: '#0277BD',marginTop:'10%', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} onClick={(e)=> cancel(e)} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
      <button type="button" onClick={(e)=>saveChanges(e)}style={{backgroundColor: '#0277BD',marginTop:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Save Changes</button>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opensnack}
        autoHideDuration={6000}
        onClose={handleClosesnack}
        message="Product successfully Added"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClosesnack}>
              UNDO
            </Button>
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

export default Catsubcatprodadd;