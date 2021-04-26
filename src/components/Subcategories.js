
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
//import "./Pendingdetails.css";
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import BasicTextFieldsrenamesubcat from './Textrenamesubcateg'
import fire from "../fire";
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";


const Subcategories = ({match}) => {
  let category=match.params.category;
  let history= useHistory();
  const [open, setOpen] = React.useState(false);
  const [stock, setStock] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStock();
  };
  const handleCloseConfirm = () => {
    setOpen(false);
    setStock();
  };
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
    setStock();
  };

  const handleClose1 = () => {
    setOpen1(false);
    setStock();
  };
  const handleCloseConfirm1 = () => {
    setOpen(false);
    setStock();
  };
  const [menu, setMenu]=useState([]);
  var array= new Array()
		var db=fire.firestore();
		const searchSubcat = async (cat) => {
		const citiesRef = db.collection('category').doc(cat).collection('subcategory');
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
   
    useEffect(() => {
      searchSubcat(category);
     
    },[]);
    
       
    const addProduct = (e) => {
          e.preventDefault();
          history.push("/Add Subcategory/"+category)
        };
   
    return(
       <>
        
        <div className="list-style">
        <ListGroup  variant="flush">
        {/* <div className="order" > */}
       
        {menu.map((menu,index)=>(
          
          
           <ListGroup.Item  key={index} >
            <div className="horizontal">
           <div className="order-title" >
            {menu}
            </div> 
          <DropdownButton className="yuk" alignSelf='right' id="dropdown-item-button" variant="light">
            <Dropdown.Item  href={"/Categories/"+category+"/"+menu} >View Products</Dropdown.Item>
            {/* <div>
            <Dropdown.Item as="button" onClick={handleClickOpen}>Delete Subcategory</Dropdown.Item>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this Subcategory?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button backgroundColor='#0277BD' onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button  onClick={handleCloseConfirm} color="primary" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div> */}
            <div>
            <Dropdown.Item as="button" onClick={handleClickOpen1}>Rename</Dropdown.Item>
              <Dialog open={open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Rename</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                   Name
                  </DialogContentText> 
                
                  <TextField id="outlined-basic" label="Subcategory" variant="outlined" /> 
                {/* <BasicTextFieldsrenamesubcat
                     autoFocus
                    margin="dense"
                    id="name"
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={event=>setStock(event.target.value)}
                    fullWidth
                  />  */}
                </DialogContent>
                <DialogActions>
                  <Button backgroundColor='#0277BD'onClick={handleClose1} color="primary">
                    Cancel
                  </Button>
                  <Button backgroundColor='#0277BD' onClick={handleCloseConfirm1} color="primary">
                    Rename
                  </Button>
                </DialogActions>
        </Dialog>
            </div>
          </DropdownButton>
           
           
            </div>
            <br/>
            <div className="order-status">
              {category}
              {/* {menu.subcat} */}
            </div>
            
          </ListGroup.Item>
       
            ))}
            {/* </div> */}
        </ListGroup>
        </div>
        <div className="addproduct">
        <Button variant="primary" onClick={(e)=>addProduct(e)} size="sm" style={{width:'10%',height:'40px', marginBottom:'10px', marginTop:'20px', align:'left', backgroundColor:'#0277BD', borderRadius: '30px 30px 30px 30px'}}> Add Subcategory </Button>
            </div>
       </>
    )
   
}

export default Subcategories;