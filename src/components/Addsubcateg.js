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

export default function Addsubcateg({match}) {
  let category=match.params.category;
  const [subcatname, setSubcatname]=useState();
  const classes = useStyles();
  
 
  


		const addsubcat = (category,subcategory)=>{
      let check=false;
			var db=fire.firestore();
    

			const usersRef = db.collection('category').doc(subcategory)
			usersRef.get()
  			.then((docSnapshot) => {
    		if (docSnapshot.exists) {
     		 usersRef.onSnapshot(async (doc) => {
     		 	window.alert("This subcategory is already a category!")
     		 	check=false;
        	
      		});
   			} else {
   				console.log("This subcategory is not a category, hence good to go!")
   				db.collection("category").doc(category).collection("subcategory").doc(subcategory).set({
            [subcategory]: subcategory,
            });
            window.alert("Adding")
    		}
			});


			



		}

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}
       <Typography variant="h6" className={classes.title}>
            Add Subcategory
          </Typography>
          <div>
      <TextField  value={subcatname} onChange={(e)=>{setSubcatname(e.target.value)}}style={{width:'50ch'}} id="filled-basic" label="Name" variant="filled" />
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
      <button type="button" onClick={function(event){addsubcat(category, subcatname)}} style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Add</button>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
    </form>
  );
}