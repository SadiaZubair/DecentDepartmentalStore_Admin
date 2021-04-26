
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListGroup from 'react-bootstrap/ListGroup'
import InputLabel from '@material-ui/core/InputLabel';
import React, {useState, useEffect} from 'react';
import fire from "../fire";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));

export default function Addadmin() {
  const [details, setDetails]=useState(
    
    {
      first:'',
      last: '',
      phone:'',
      email: ''

    }
  );
  const fetchAdmin = async () => {
  
    var db=fire.firestore();
		const citiesRef = db.collection('adminacc');
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  		console.log('No matching documents.');
  		return;
		}  
		snapshot.forEach(doc => {
  		
  		setDetails({
      first: doc.data().fname,
      last: doc.data().lname,
      phone:doc.data().phone,
      email: doc.data().email,
        
      })	});
      



		}
 
    useEffect(() => {
   
      
      fetchAdmin();
      
      
    },[]);

  
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" style={{width:'50ch'}} label="Filled" variant="filled" /> */}
       <Typography variant="h6" className={classes.title}>
            Admin Details
          </Typography>
       <ListGroup horizontal>  
      <div>
      <TextField
      id="filled-basic"
      style={{marginRight:'20px',marginBottom:'20px',width: '30ch'}}
      label="First Name"
      value={details.first} 
     
      variant="filled" />
      </div>
      <div>
      <TextField 
      id="filled-basic" 
      style={{ width: '30ch',}} 
      label="Last Name" 
      value={details.last} 
      
      variant="filled" />
      </div>
      </ListGroup> 
      <div>
      <TextField 
      id="filled-basic" 
      style={{width:'62ch',marginBottom:'20px'}} 
      label="Phone Number" 
      value={details.phone} 
      
      variant="filled" />
      </div>
      <div>
      <TextField 
      id="filled-basic" 
      style={{width:'62ch'}} 
      label="Email Address" 
      value={details.email} 
      disabled
      variant="filled" />
      </div>
      {/* <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Add</button>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button> */}
    </form>
  );
}
