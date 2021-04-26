

import {NavLink} from 'react-router-dom';
import React, { useState, useEffect, Suspense  } from "react";
import {Doughnut} from 'react-chartjs-2';
import { PermDataSettingSharp, ViewDay } from '@material-ui/icons';
import fire from "../fire";



function Delvscancel() {
    
    let newDate = new Date()
    let date = newDate.getDate();
    let year= (newDate.getFullYear()).toString();
    let month = (newDate.getMonth() + 1).toString();

    console.log(month);
    let revenue={}
    var i=0
    let x= new Date(parseInt(year), parseInt(month), 0).getDate();
    for(i=1; i<=date; i++)
    {
        revenue[i]=0;
   
    }
    // console.log(revenue);
    let can=0;
    let del=0;
    let keys;
    let values;
    const [data, setData]=useState({
        labels:[],
        datasets:[],

    });
    const [options, setOptions]=useState({
        title:{},
        // scales:{},

    });
    let bool;
    
    const Month= async ()=>{
        var db=fire.firestore();
        const citiesRef = db.collection('All Orders')
        const snapshot = await citiesRef.where('state','!=','Pending' ).get()
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
    
        snapshot.forEach(doc => {
            console.log("hello")
            console.log(doc.data())
            var status= doc.data().state
            if(status=='Dispatched')
            {
                del=del+1
            }
            else if(status=='Cancelled')
            {
                can=can+1
            }
          
        
        });
        keys = Object.keys(revenue);
        values = Object.values(revenue);
        console.log(revenue)
        console.log(values)
        setData({
        
            
                labels: [
                  'Delivered',
                  'Canceled',
                  
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [del,can],
                  backgroundColor: [
                    
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    
                  ],
                  hoverOffset: 4
                }]
              
           
          })
          setOptions( {
           plugins:{ 
               title:{
                    display:true,
                    text: 'Delivered vs Canceled',
            },},
            scales: {
               y:{
                  display:false,
               },
               x:{
                
                    display:false,
                
            }

               
            }
        })
          console.log(data)
          bool=true;
      
    }
      
      
    useEffect(() => {
     
        Month();
       
      
    },[]);    
   

   
        return (
         <>
          
            <div className='Dough'>
            
              <Doughnut  data={data}
               options={options}
               
            />
              {console.log(options)}
              
              </div> 
       
          </>    
          );
   
   
}

export default Delvscancel;