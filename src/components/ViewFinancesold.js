

import {NavLink} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import Monthlyrevenue from './Monthlyrevenue';
import Yearlyrevenue from './Yearlyrevenue';
import Weeklyrevenue from './Weeklyrevenue';
import Delvscancel from './DelvsCancel';
import ListGroup from 'react-bootstrap/ListGroup'
import { PermDataSettingSharp } from '@material-ui/icons';
import './ViewFinances.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import fire from "../fire";

const Viewfinances = () => {
  const [total, setTot]=useState(0);
  const [pending, setPen]=useState(0);
  const [mon, setMon]=useState(0);
  const [totrev, setTotrev]=useState(0);
  const [today, setToday]=useState(0)
  let tot=0
  let pen=0
  let tod=0
  let thismonth=0

  let all=0
  let newDate = new Date()
  let date = newDate.getDate();
  let year= (newDate.getFullYear());
  let month = (newDate.getMonth() + 1);
  const totalorders = async () => {
    var db=fire.firestore();
		const citiesRef = db.collection('All Orders').where('state','!=','Cancelled');
		const snapshot = await citiesRef.get();
		if (snapshot.empty) {
  		console.log('No matching documents.');
  		return;
		}  
		snapshot.forEach(doc => {
  	
      var status=doc.data().state
      console.log(doc.data().state)
      if(status=='Dispatched')
      {
        tot=tot+1;

      }
      else if(status=='Pending')
      {
        pen=pen+1;
      }
    });
      
    setTot(tot)
    setPen(pen)
    console.log(tot,pen)

		}
    
    
    const Month= async ()=>{
      var db=fire.firestore();
      const citiesRef = db.collection('All Orders')
      const snapshot = await citiesRef.where('state','==','Dispatched' ).get()
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
  
      snapshot.forEach(doc => {
     
         var pay= doc.data().BuyerPayment
         var m= doc.data().Month
         var y = doc.data().Year
         var d=doc.data().Day
         if(m==month && y==year)
         {
        thismonth=thismonth+pay
        if(d==date)
        {
          tod=tod+pay
        }
         }
         all=all+pay
        
      
      });
      setMon(thismonth)
      setTotrev(all)
      setToday(tod)
    }
    useEffect(() => {
   
      
      totalorders();
      Month();
      
      
    },[]);
    const data={
      
        labels:['Jan','Feb','March','April','May'],
        datasets:[
          {
            label:'Sales for 2021(Rs)',
            data: [20000,30000, 40000,23003,44040],
            
            
          }
        ]
      }
    
        return (
         <>
          <div className='charts'>
            <ListGroup>
            <div className='progressbar'>
              <ListGroup horizontal>
              
              <h4 align='right'>Today: {today} Rs</h4>
              </ListGroup>
            <ProgressBar animated now={13563}  max={100000}/>
            </div>
            <div className='tabs' >
              <ListGroup horizontal>
              <Card
              bg='info'
              
              text='white'
              style={{ width: '12rem', margin:'auto', height:'8rem' }}
              className="mb-2"
  >
   
                <Card.Body>
                  <Card.Title> Total Orders </Card.Title>
                  <Card.Text>
                    {total}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
              bg='info'
              
              text='white'
              style={{ width: '12rem', margin:'auto', height:'8rem' }}
              className="mb-2"
  >
   
                <Card.Body>
                  <Card.Title> Pending Orders </Card.Title>
                  <Card.Text>
                    {pending}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
              bg='info'
              
              text='white'
              style={{ width: '12rem', margin:'auto', height:'8rem' }}
              className="mb-2"
  >
   
                <Card.Body>
                  <Card.Title> Sales this Month </Card.Title>
                  <Card.Text>
                    {mon}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
              bg='info'
              
              text='white'
              style={{ width: '12rem', margin:'auto',height:'8rem' }}
              className="mb-2"
  >
   
                <Card.Body>
                  <Card.Title> Total Sales </Card.Title>
                  <Card.Text>
                    {totrev}
                  </Card.Text>
                </Card.Body>
              </Card>
              
              </ListGroup>
            </div>
            <ListGroup horizontal>
            <div className='monthlyrev'>
              {/* monthlu */}
               <Monthlyrevenue/>
               </div>
            <div className='weeklyrev'>
              
               <Weeklyrevenue />
               </div>
               </ListGroup>
               <ListGroup horizontal>
            <div className='yearlyrev'>
             
              <Yearlyrevenue />
              </div>
            <div className='dough'>
              <Delvscancel/>
            </div>

              </ListGroup>
              </ListGroup>
              </div>
          </>     
          );
   
//     return(
//        <>
//         <div className="list-style">
//         <ListGroup  variant="flush">
//         {/* <div className="order" > */}
//         {menu.map((menu)=>(
          
//            <ListGroup.Item  horizontal key={menu.id}  >
//            <div className="order-title"  >
//              {/* Order #  */}
//              <Row
// >
//              <Col sm={8}

             
// >
//              {menu.id}
//              </Col>
             
//              <Col sm={4}


// >
//              {menu.name}
//              </Col>
//              </Row>
           
//             </div> 
//             <br/>
//             {/* <div className="order-status">
//               // {menu.name}
//             </div> */}
            
//           </ListGroup.Item>
       
//             ))}
//             {/* </div> */}
//         </ListGroup>
//         </div>
//        </>
//     )
   
}

export default Viewfinances;