
import {NavLink, useHistory, Redirect, Link} from 'react-router-dom';
import React, { useState, } from "react";
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
import BasicTextFields from './Textrenameadmin'

import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";


const ViewAdmin = () => {
  let history= useHistory();
  const [open, setOpen] = React.useState(false);
  const [stock, setStock] = React.useState();
  const [page, setPage] = React.useState(false);

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

  // const redirect = () => {
  //   setPage(true);
  // }

  // const renderRedirect = () => {
  //     if (page) {
  //         return <Redirect to='/Addadmin' />
  //     }
  // }
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
    const [menu, setMenu]=useState(
        [
          {
            id:1,
          name:'Admin1',
        //   cat:'xyx',
        //   subcat:'djks',
          },
          {
            id:2,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks',
          },
          {
            id:3,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks', 

          },
          {
            id:4,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks',
          },
          {
            id:5,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks',
          },
          {
            id:6,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks',
          },
          {
            id:7,
            name:'Admin1',
            // cat:'xyx',
            // subcat:'djks',
          },
        ]);
    const addProduct = (e) => {
          e.preventDefault();
          history.push("/Add Admin")
        };
   
    return(
       <>
        <div className="list-style">
        <ListGroup  variant="flush">
        {/* <div className="order" > */}
       
        {menu.map((menu)=>(
          
          
           <ListGroup.Item  key={menu.id} >
            <div className="horizontal">
           <div className="order-title" >
            {menu.name}
            </div> 
          <DropdownButton className="yuk" alignSelf='right' id="dropdown-item-button" variant="light">
            <Dropdown.Item  href={"/View Admin/"+menu.id} >View details</Dropdown.Item>
            <div>
            <Dropdown.Item as="button" onClick={handleClickOpen}>Block Admin</Dropdown.Item>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  Are you sure you want to block this admin?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button backgroundColor='#0277BD' onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button  onClick={handleCloseConfirm} color="primary" autoFocus>
                    Block
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div>
            <Dropdown.Item as="button" onClick={handleClickOpen1}>Rename</Dropdown.Item>
              <Dialog open={open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Rename</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                   Name
                  </DialogContentText>
                  {/* <TextField */}
                {/* //   make this text box responsive */}
                {/* <TextField id="outlined-basic" label="Admin" variant="outlined" /> */}
               < BasicTextFields/> 
                    {/* autoFocus
                    margin="dense"
                    id="name"
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={event=>setStock(event.target.value)}
                    fullWidth
                  /> */}
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
              {/* {menu.cat} {menu.subcat} */}
            </div>
            
          </ListGroup.Item>
       
            ))}
            {/* </div> */}
        </ListGroup>
        </div>
        <div className="addproduct">
        <Button variant="primary" onClick={(e)=>addProduct(e)} size="sm" style={{width:'10%',height:'40px', marginBottom:'10px', marginTop:'20px', align:'left', backgroundColor:'#0277BD', borderRadius: '30px 30px 30px 30px'}}> Add Admin </Button>
            </div>
       </>
    )
   
}

export default ViewAdmin;