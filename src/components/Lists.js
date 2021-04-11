import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import "./Shoppingcartside.css";
import ClearIcon from '@material-ui/icons/Clear';
import "./Lists.css"
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '120%',
    maxWidth: '50ch',
    backgroundColor: theme.palette.background.paper,
    //display: 'inline',
  },
  middle: {
    display: 'middle',
  },

  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    paddingRight: '1.5rem',
    paddingBottom : '2rem',
    display: 'span',
    align: 'left',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (

  
  
    <List className={classes.root}>
        
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        
          <img alt="Remy Sharp" className={classes.large}  height = "40" width ="40"  align = "left" src="final.png" />
          
        </ListItemAvatar>
        
      
    
        {/* <div style={{float: 'right'}} >
            <ClearIcon className ={classes.box}/>
         </div> */}
        <ListItemText


          primary="   Cocomo Party Pack"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.middle}
                color="textPrimary"
              >
                  Rs.50
              </Typography>
              {" — (1xRs.50)"}
            </React.Fragment>
          }
        />
      </ListItem>
      { <Divider variant="left" component="li"className = "MuiDivider-root"/>
     }
    </List>
  );
}
