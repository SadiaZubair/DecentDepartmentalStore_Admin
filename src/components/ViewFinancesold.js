

import {NavLink} from 'react-router-dom';
import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";
import { MDBIcon } from "mdbreact";
import {Carousel, Card, CardColumns, Row, Col, Container} from 'react-bootstrap';


const Viewfinances = () => {

    const [menu, setMenu]=useState(
        [
          {
            id:'January',
          name:'Rs100000'
          },
          {
            id:'February',
            name:'Rs100000'
          },
          {
            id:'March',
            name:'Rs100000'
          },
          {
            id:'April',
            name:'Rs100000'
          },
          {
            id:'May',
            name:'Rs100000'
          },
          {
            id:'June',
            name:'Rs100000'
          },
          {
            id:'July',
            name:'Rs100000'
          },
          {
            id:'August',
            name:'Rs100000'
          },
          {
            id:'September',
            name:'Rs100000'
          },
          {
            id:'October',
            name:'Rs100000'
          },
          {
            id:'November',
            name:'Rs100000'
          },
          {
            id:'December',
            name:'Rs100000'
          },
        ]);
   
    return(
       <>
        <div className="list-style">
        <ListGroup  variant="flush">
        {/* <div className="order" > */}
        {menu.map((menu)=>(
          
           <ListGroup.Item  horizontal key={menu.id}  >
           <div className="order-title"  >
             {/* Order #  */}
             <Row
>
             <Col sm={8}

             
>
             {menu.id}
             </Col>
             
             <Col sm={4}


>
             {menu.name}
             </Col>
             </Row>
           
            </div> 
            <br/>
            {/* <div className="order-status">
              // {menu.name}
            </div> */}
            
          </ListGroup.Item>
       
            ))}
            {/* </div> */}
        </ListGroup>
        </div>
       </>
    )
   
}

export default Viewfinances;