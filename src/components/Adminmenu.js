

import {NavLink} from 'react-router-dom';
import React, { useState } from "react";
import { Drawer as MUIDrawer, List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";
const Adminmenu = () => {

    const [menu, setMenu]=useState(
        [
          {
            id:1,
            name:'View Admin'
          },
          {
            id:2,
            name:'Categories'
          },
          {
            id:3,
            name:'Products'
          },
          {
            id:4,
            name:'View Orders'
          },
          {
            id:5,
            name:'Pending Orders'
          },
          {
            id:7,
            name:'View Finances'
          },
          
        ]);
   
    return(
       <>
       
        <div className="adminmenu">
       {menu.map((menu)=>(
           
       <ul key={menu.id} className="admin-item">
       <NavLink className="nav-link" to={"/"+ menu.name}>{menu.name}</NavLink>
     </ul>
        ))}
        </div>
       </>
    )
   
}

export default Adminmenu;