

import {NavLink} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import fire from "../fire";
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";


const Vieworders = () => {
  let orderid=[]
  const [orderdisplay, setOrderdisplay]=useState([]);
  var db=fire.firestore();
  const Orders= async ()=>{
    const citiesRef = db.collection('All Orders')
    const snapshot = await citiesRef.where('state','!=','Pending').get()
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
 
  Orders();
},[]);
 
   
    return(
       <>
       <div className="list-style">
        <ListGroup  variant="flush">
        {orderdisplay.map((menu,index)=>(
         
           <ListGroup.Item  key={index} action href={"/View Orders/"+ menu.id}>
           <div className="order-title"  >
             Order # {menu.id}
            </div> 
            <br/>
            <div className="order-status">
              {menu.state}
            </div>
            
          </ListGroup.Item>
       
            ))}
        </ListGroup>
        </div>
    
       </>
    )
   
}

export default Vieworders;