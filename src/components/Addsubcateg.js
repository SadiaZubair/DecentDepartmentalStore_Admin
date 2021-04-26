import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import {Row, Col} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import UploadButtons from './Uploadbutton';
import { useState } from "react";
import {useHistory} from 'react-router-dom';
import fire from "../fire";
import { LaptopWindows } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '25ch',
    },
  },
}));
const useStylesbutton = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  // input: {
  //   display: 'none',
  // },
}));

export default function Addsubcateg({match}) {
  let history=useHistory();
  let category=match.params.category;
  const [subcatname, setSubcatname]=useState();
  const classes = useStyles();
  const classesbutton = useStylesbutton();

  const [error1, setError1] = useState('');
  const [opensnack, setOpensnack] = React.useState(false);
  const handleClosesnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnack(false);
    history.push('/Categories/'+ category)
  };
    const types = ['image/png', 'image/jpeg']; // image types

    const [productImg, setProductImg] = useState(null)
  var img;
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
           
            img=selectedFile
            console.log(productImg)
            setError1('')
        }
        else {
            setProductImg(null);
            setError1('Please select a valid image type (jpg or png)');
            window.alert("Please select a valid image type (jpg or png)")
        }
    }
    const [error, setError] = useState('');
    const storage = fire.storage();


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
           if(productImg== null || subcategory =='')
           {
            window.alert("Required Fields are missing")
           }
           else
           {
   				console.log("This subcategory is not a category, hence good to go!")
           const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
          //console.log(uploadTask)
          uploadTask.on('state_changed', snapshot => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
          }, err => setError(err.message)
              , () => {
                  storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
   				db.collection("category").doc(category).collection("subcategory").doc(subcategory).set({
            [subcategory]: subcategory,
            imagelink: url,
            });
           
           setOpensnack(true);
          })
        })
      }
     
    		}
			});


			



		}
    const cancel=(e)=>{
      history.push('/Categories/'+ category)
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
           <div className={classesbutton.root}>
          
          <label>
            <h5>Upload Image</h5> 
            <br/>
      <input style={{backgroundColor:'0277BD'}} accept="image/*" className={classesbutton.input} id="contained-button-file" type="file" onChange={productImgHandler} />
      </label>
      </div>
          {/* </Col> */}
          {/* <Col xs={2}>
        <Typography variant="h6" className={classes.title}>
            Upload Picture
          </Typography>
          </Col> */}
        {/* </Row> */}
          </div>
      <button type="button" onClick={function(event){addsubcat(category, subcatname)}} style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Add</button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opensnack}
        autoHideDuration={6000}
        onClose={handleClosesnack}
        message="Subcategory Successfully Added"
        action={
          <React.Fragment>
           
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosesnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}}  onClick={(e)=> cancel(e)} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
    </form>
  );
}