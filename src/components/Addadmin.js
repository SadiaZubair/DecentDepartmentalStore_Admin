import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListGroup from 'react-bootstrap/ListGroup'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '25ch',
    },
  },
}));

export default function Addadmin() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" style={{width:'50ch'}} label="Filled" variant="filled" /> */}
       <Typography variant="h6" className={classes.title}>
            Add Admin
          </Typography>
       <ListGroup horizontal>  
      <div>
      <TextField id="filled-basic" style={{marginRight:'20px', width: '24ch'}} label="First Name" variant="filled" />
      </div>
      <div>
      <TextField id="filled-basic" style={{ width: '24ch'}} label="Last Name" variant="filled" />
      </div>
      </ListGroup> 
      <div>
      <TextField id="filled-basic" style={{width:'50ch'}} label="Phone Number" variant="filled" />
      </div>
      <div>
      <TextField id="filled-basic" style={{width:'50ch'}} label="Email Address" variant="filled" />
      </div>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Add</button>
      <button type="button" style={{backgroundColor: '#0277BD', color: '#FFFFFF', width: '150px'}} className={classes.thecolor} class="btn back-color rounded-pill">Cancel</button>
    </form>
  );
}
