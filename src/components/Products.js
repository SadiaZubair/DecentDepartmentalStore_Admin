
import {NavLink, useHistory} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Pendingdetails.css";
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import fire from "../fire";
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText, Step} from "@material-ui/core";


const Products = () => {
  let history= useHistory();
  const [opendelete, setOpendelete] = React.useState(false);
  const [stock, setStock] = React.useState();
  const [discount, setDiscount] = React.useState();
  const [opensnack, setOpensnack] = React.useState(false);
  const [menu, setMenu]=useState(
    [
      {
        id:'',
      name:'',
      cat:'',
      subcat:'',
      },]);
  const handleClosesnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnack(false);
  };
  let list_prod=[]
  const searchProduct = async (cat) => {
    var db=fire.firestore();
		const citiesRef = db.collection('Products')
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  		console.log('No matching documents.');
  		return;
		}  

		snapshot.forEach(doc => {
      list_prod.push(
        {
          id: doc.id,
          cat: doc.data().category,
          subcat: doc.data().subcategory,
          name: doc.data().title,

        }
      )
    });

    setMenu(list_prod);

		}
    useEffect(() => {
 
      searchProduct();
    },[]);
  const setcheckDiscount=(value)=>{
    if(value <=100)
    {
      console.log(value);
      setDiscount(value);
    }
  }
  const handleClickOpendelete = () => {
    setOpendelete(true);
  };

  const handleClosedelete = () => {
    setOpendelete(false);
    setStock();
    setDiscount();
  };
  const handleCloseConfirmdelete = (e) => {
    e.preventDefault();
   
    setOpensnack(false);
    setOpendelete(false);
    setDiscount();
    setStock();
  };
  const [openstock, setOpenstock] = React.useState(false);

  const handleClickOpenstock = () => {
    setOpenstock(true);
    setDiscount();
    setStock();
  };

  const handleClosestock = () => {
    setOpenstock(false);
    setDiscount();
    setStock();
  };
  const handleCloseConfirmstock = (e,id) => {
    
    e.preventDefault();
    var db=fire.firestore();
    db.collection("Products").doc(id).update({
      
     
      stock: stock,
      
    }).then(function(){
    
    }).catch(function(error){
      window.alert("error1",error.message)
      return;
    });
    setOpenstock(false);
    window.alert('Stock Updated')
    setDiscount();
    setStock();
  };
  const [opendiscount, setOpendiscount] = React.useState(false);

  const handleClickOpendiscount = () => {
    setOpendiscount(true);
    setDiscount();
    setStock();
  };

  const handleClosediscount = () => {
    setOpendiscount(false);
    setDiscount();
    setStock();
  };
  const handleCloseConfirmdiscount = (e,id) => {
    e.preventDefault();
    e.preventDefault();
    var db=fire.firestore();
    db.collection("Products").doc(id).update({
      
     
      discount: discount,
      
    }).then(function(){
    
    }).catch(function(error){
      window.alert("error1",error.message)
      return;
    });
    setOpendiscount(false);
    window.alert('Discount Updated')
    setDiscount();
    setStock();
  
  };
  const [items, setItems]=useState([
    {
      text: 'New tab'
  },
  {
      text: 'New window'
  },
  {
      text: 'New incognito window'
  },
  ])
    
    const addProduct = (e) => {
          e.preventDefault();
          history.push("/Add Product")
        };
   
    return(
       <>
         
        <div className="list-style1">
        <ListGroup  variant="flush">
          
        {/* <div className="order" > */}
       
        {menu.map((menu)=>(
          
          
           <ListGroup.Item  key={menu.id} >
            <div className="horizontal">
           <div className="order-title" >
            {menu.name}
            </div> 
          <DropdownButton className="yuk" alignSelf='right' id="dropdown-item-button" variant="light">
            <Dropdown.Item  href={"/Products/"+menu.id} >View details</Dropdown.Item>
            
            <div>
            <Dropdown.Item as="button" onClick={handleClickOpenstock}>Update Stock</Dropdown.Item>
              <Dialog open={openstock} onClose={handleClosestock} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Stock</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                   Please enter the new amount of stock for this product.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={event=>setStock(event.target.value)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button backgroundColor='#0277BD'onClick={handleClosestock} color="primary">
                    Cancel
                  </Button>
                  <Button backgroundColor='#0277BD' onClick={(e)=>handleCloseConfirmstock(e,menu.id)} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
        </Dialog>
            </div>
            <div>
            <Dropdown.Item as="button" onClick={handleClickOpendiscount}>Add Discount</Dropdown.Item>
              <Dialog open={opendiscount} onClose={handleClosediscount} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Discount</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                   Please enter the new percentage of discount for this product.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Discount"
                    type="number"
                    value={discount}
                    onChange={event=>setcheckDiscount(event.target.value)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button backgroundColor='#0277BD'onClick={handleClosediscount} color="primary">
                    Cancel
                  </Button>
                  <Button backgroundColor='#0277BD' onClick={(e)=>handleCloseConfirmdiscount(e,menu.id)} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
        </Dialog>
            </div>
          </DropdownButton>
           
           
            </div>
            <br/>
            <div className="order-status">
              {menu.cat} {menu.subcat}
            </div>
            
          </ListGroup.Item>
       
            ))}
            {/* </div> */}
        </ListGroup>
        </div>
        <div className="addproduct">
        <Button margin='auto' variant="primary" onClick={(e)=>addProduct(e)} size="sm" style={{width:'10%',height:'40px', marginBottom:'10px', marginTop:'20px', align:'left', backgroundColor:'#0277BD', borderRadius: '30px 30px 30px 30px'}}> Add Product </Button>
            </div>
       </>
    )
   
}

export default Products;