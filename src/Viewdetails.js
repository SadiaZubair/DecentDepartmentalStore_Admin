import React, { useState,useEffect } from "react";
import {NavLink,useParams,useHistory,Redirect} from 'react-router-dom';
import "./Pendingdetails.css";
import ListGroup from 'react-bootstrap/ListGroup'
import coffee from "./images/coffee.jpg";
import cocomo from "./images/cocomo.jpg";
import Figure from 'react-bootstrap/Figure';
import  FigureCaption from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/Figure';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import fire from "../fire";
function ViewDetails({ match }) {

    const [status, setStatus]=useState('Pending');
    const [products, setProducts]= useState([]);
    
    let history= useHistory();
    const [details, setDetails] = useState(

       {firstname: '',
        lastname: '',
        email: '',
        phone:'',
        address: '',
        city:'',
        country:'',
        bill:'',
        date:'',
    }
    );
       
    
    
    let orderidd = match.params.id;
    let orderid=[]
    const [orderdisplay, setOrderdisplay]=useState([]);
    var db=fire.firestore();
    const ViewOrders= async ()=>{
      const citiesRef = db.collection('All Orders').doc(orderidd);

      const doc = await citiesRef.get()
      if (!doc.exists) {
        console.log('No matching documents.');
        return;
      }  
  
      else {
          
        setDetails(
            {
                firstname: doc.data().BuyerName,
                lastname: doc.data().BuyerName,
                email: doc.data().BuyerEmail,
                phone:doc.data().BuyerCell,
                address: doc.data().BuyerAddress,
                city:"Lahore",
                country:"Pakistan",
                bill: doc.data().BuyerPayment,
                date:doc.data().Date,
     
            }
        )
        setProducts(doc.data().Item_list)
            console.log(details, products);
        }
      
  
    }
   
  useEffect(() => {
   
    ViewOrders();
  },[]);
   
    // const [temp, setTemp]=useState(
    //     {
    //         firstname: "doc.data().BuyerName",
    //             lastname: "doc.data().BuyerName",
    //             email: "doc.data().BuyerEmail",
    //             phone: 138000001,
    //             address:" doc.data().BuyerAddress",
    //             city:"Lahore",
    //          country:"Pakistan"
    //     }
    // )
    // const [temp1, setTemp1]=useState(
    //     {
    //        img: coffee,
    //        quantity:2,
    //        price:3,
    //     }
    // )

    const cancel=(e)=>{
        history.push('/View Orders')
      }
    return (
        <>

        <div className="detail-container">
         <div className="cust-details" >   
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
        {/* <DropdownButton id="dropdown-item-button" variant="light" title={status}>
            <Dropdown.ItemText>Set Status</Dropdown.ItemText>
            <Dropdown.Item as="button" onClick={() => setStatus('Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item as="button"onClick={() => setStatus('Dispatched')}>Dispatched</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setStatus('Cancelled')}>Cancelled</Dropdown.Item>
        </DropdownButton>
        <ListGroup horizontal >  */}
        <button type="button" style={{backgroundColor: '#0277BD', marginRight:'10%', height:'fit-content', color: '#FFFFFF', width: '150px'}} onClick={(e)=> cancel(e)} class="btn back-color rounded-pill">Back</button>
       
        {/* <Button variant="primary" size="sm" style={{width:'20%',height:'fit-content',  marginBottom:'10px',  marginTop:'20px',marginLeft:'520px',backgroundColor:'#0277BD'}}> Confirm </Button>
      
        </ListGroup> */}
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
                Rs.{product.price}
            </div>
            </ListGroup > 

          </Figure>
          </div>
        ))}
        
        {/* <div className='figure-name'> Total </div> */}
         {/* <div className="figure-price" >
              Rs.{details.bill}
            </div> */}
      
        </div>
        </div>  

            

        </>
    );

}

export default ViewDetails;