

import {NavLink} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";
import { MDBIcon } from "mdbreact";
import fire from "../fire";
const PendingOrders = () => {
  let orderid=[]
  const [orderdisplay, setOrderdisplay]=useState([]);
  var db=fire.firestore();
  const PenOrders= async ()=>{
    const citiesRef = db.collection('All Orders')
    const snapshot = await citiesRef.where('state','==','Pending').get()
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      orderid.push(
        {
        id:doc.id,
        state:doc.data().state,
        });
    });
    setOrderdisplay(orderid);

  }
 
useEffect(() => {
 
  PenOrders();
},[]);
    const [menu, setMenu]=useState(
        [
          {
            id:1,
          name:'Pending'
          },
          {
            id:2,
            name:'Pending'
          },
          {
            id:3,
            name:'Pending'
          },
          {
            id:4,
            name:'Pending'
          },
          {
            id:5,
            name:'Pending'
          },
          {
            id:6,
            name:'Pending'
          },
          {
            id:7,
            name:'Pending'
          },
        ]);
   
    return(
       <>
        <div className="list-style">
       
        <ListGroup  variant="flush">
        {orderdisplay.map((menu)=>(
          
           <ListGroup.Item  key={menu.id} action href={"/Pending Orders/"+ menu.id}>
           <div className="order-title"  >
             Order # {menu.id}
           
            </div> 
            <br/>
            <div className="order-status">
              {menu.state}
            </div>
            
          </ListGroup.Item>
       
            ))}
            {/* </div> */}
        </ListGroup>
         
        </div>
       </>
    )
   
}

export default PendingOrders;