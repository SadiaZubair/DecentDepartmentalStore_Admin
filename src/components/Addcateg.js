import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import {Row, Col} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import UploadButtons from './Uploadbutton';
import { useState } from "react";
import fire from "../fire";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '25ch',
    },
   
  },
}));

export default function Addcateg() {
  const [catname, setCatname]=useState();
  const classes = useStyles();
  const addcat=(category)=>{
    var db=fire.firestore();
    const usersRef = db.collection('category').doc(category)
    usersRef.get()
      .then((docSnapshot) => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot((doc) => {
          window.alert("Already Exists")
          return;
        });
       } else {
         window.alert("Adding")
      usersRef.set( {
        category: category,
         //noofsub: 0 
      }) // create the document
      }
    });

  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}
       <Typography variant="h6" className={classes.title}>
            Add Category
          </Typography>
          <div>
      <TextField value={catname} onChange={(e)=>{setCatname(e.target.value)}} style={{width:'50ch'}} id="filled-basic" label="Name" variant="filled" />
      </div>
      {/* <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
      <TextField id="outlined-basic" label="Email Address" variant="outlined" /> */}
      <div>
        {/* <Row>
          <Col> */}
          <UploadButtons/>
          {/* </Col> */}
          {/* <Col xs={2}>
        <Typography variant="h6" className={classes.title}>
            Upload Picture
          </Typography>
          </Col> */}
        {/* </Row> */}
          </div>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} onClick={(e)=>addcat(catname)} className={classes.thecolor} class="btn back-color rounded-pill">Add</button>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
    </form>
  );
}