import React, { useState,useEffect } from "react";
import {NavLink,useParams,useHistory,Redirect} from 'react-router-dom';
import "./Pendingdetails.css";
import ListGroup from 'react-bootstrap/ListGroup'

import Figure from 'react-bootstrap/Figure';
import  FigureCaption from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/Figure';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import fire from "../fire";
function PendingOrderDetails({ match }) {

    const [status, setStatus]=useState('Pending');

    let history= useHistory();
   
    var name;
    let orderidd = match.params.id;

    const [details, setDetails] = useState(
        {
          firstname: '',
          lastname: '',
          email: '',
          phone:'',
          address: '',
          city:"Lahore",
          country:"Pakistan",
          bill:'',
          date:'',
          buyerid:''


        },
       
    );
    const [products, setProducts]= useState([]);
    const [bill, setBill]= useState();
  
    const PenviewOrders= async ()=>{
      var db=fire.firestore();
      const citiesRef = db.collection('All Orders').doc(orderidd);

      const doc = await citiesRef.get()
      if (!doc.exists) {
        console.log('No matching documents.');
        return;
      }  
  
      else {
          
        setDetails(
            {
                firstname: doc.data().BuyerFirstName,
                lastname: doc.data().BuyerLastName,
                email: doc.data().BuyerEmail,
                phone:doc.data().BuyerCell,
                address: doc.data().BuyerAddress,
                city:"Lahore",
                country:"Pakistan",
                
                date:doc.data().Date,
                buyerid:doc.data().User,
     
            }
        )
        setProducts(doc.data().Item_list)
            console.log(details, products);
        }
      
  
    }
   
  useEffect(() => {
   
    PenviewOrders();
    // setBill(products[0].price)
  },[]);
    const [opensnack, setOpensnack] = React.useState(false);
    const handleClosesnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpensnack(false);
      history.push('/Pending Orders')
    };
    const saveChanges = (e) => {
      e.preventDefault();
      

      var db=fire.firestore();
			db.collection("All Orders").doc(orderidd).update({
				state:status
			}).then(function(){
       saveChanges1()
      }).catch(function(error){
        window.alert("error1",error.message)
        return;
      });
    }
    const saveChanges1 = () => {
      // e.preventDefault();
      var db1=fire.firestore();
      console.log(details.buyerid,"oo",orderidd);
      db1.collection("custacc").doc(details.buyerid).collection('Orders').doc(orderidd).update({
				state:status
			}).then(function(){
        
         setOpensnack(true);
      }).catch(function(error){
        window.alert("error",error.message)
        return;
      });
    }
    const cancel=(e)=>{
      history.push('/Pending Orders')
    }
    return (
        <>

        <div className="detail-container">
         <div className="cust-details" > 
         <div>  
        <ListGroup>
           <h5> Contact Information </h5>
            <div className="cust-item">
            <ListGroup.Item className="cust-item1" style={{backgroundColor:'rgb(248, 248, 248)'}}   action >
                {details.email}
            </ListGroup.Item>
            
            </div>
            <h5> Shipping Information</h5>
            <ListGroup horizontal > 
            <div className="cust-item">
             
            <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.firstname}
            </ListGroup.Item>
            </div>
            <div className="cust-item">
               
            <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.lastname}
            </ListGroup.Item>
            </div>
            </ListGroup>
            <div className="cust-item">
            <ListGroup.Item className="cust-item1" style={{backgroundColor:'rgb(248, 248, 248)'}}  action variant="secondary">
                {details.address}
            </ListGroup.Item>
            </div>
            <ListGroup horizontal > 
            <div className="cust-item">
             
            <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.city}
            </ListGroup.Item>
            </div>
            <div className="cust-item">
               
            <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.country}
            </ListGroup.Item>
            </div>
            </ListGroup>
            <ListGroup horizontal > 
            <div className="cust-item">
             
            <ListGroup.Item className="cust-item2" style={{marginRight:'60px',backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.phone}
            </ListGroup.Item>
            </div>
            <div className="cust-item">
               
            <ListGroup.Item className="cust-item2"  style={{backgroundColor:'rgb(248, 248, 248)'}} action variant="secondary">
                {details.date}
            </ListGroup.Item>
            </div>
            </ListGroup>

        </ListGroup>
        <DropdownButton id="dropdown-item-button" variant="light" title={status}>
            <Dropdown.ItemText>Set Status</Dropdown.ItemText>
            <Dropdown.Item as="button" onClick={() => setStatus('Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item as="button"onClick={() => setStatus('Dispatched')}>Dispatched</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setStatus('Cancelled')}>Cancelled</Dropdown.Item>
        </DropdownButton>
        </div>
        <ListGroup horizontal > 
        <button type="button" style={{backgroundColor: '#0277BD',marginTop:'10%', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}}onClick={(e)=> cancel(e)} class="btn back-color rounded-pill">Cancel</button>
        <button type="button" onClick={(e)=>{saveChanges(e)}} style={{backgroundColor: '#0277BD',marginTop:'10%', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}}  class="btn back-color rounded-pill">Confirm</button>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opensnack}
        autoHideDuration={6000}
        onClose={handleClosesnack}
        message="Order status updated"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClosesnack}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosesnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        
      
        </ListGroup>
        </div>
        <div className="cust-products">
        {products.map((product)=>(
            <div className='fig-image'>
            
            <Figure>
            <ListGroup horizontal > 
            <Figure.Image
              width={80}
              height={100}
              alt="100x120"
              src={product.img}
              margin='20px'
              
            />
            <div className='figure-name'>
            {product.name} {product.qty}x
            </div>
            <div className="figure-price" style={{marginBlockEnd:'0' }}>
                Rs{product.price}
               
                
            </div>
            </ListGroup > 

          </Figure>
          </div>
        ))}
        
        {/* <div className='figure-name'> Total </div> */}
         {/* <div className="figure-price" >
                {bill}
            </div> */}
      
        </div>
        </div>  

            

        </>
    );

}

export default PendingOrderDetails;