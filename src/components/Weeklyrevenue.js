

import {NavLink} from 'react-router-dom';
import React, { useState, useEffect, Suspense  } from "react";
import {Line} from 'react-chartjs-2';
import { PermDataSettingSharp, ViewDay } from '@material-ui/icons';
import fire from "../fire";



function Weeklyrevenue() {
    
    let newDate = new Date()
    let date = newDate.getDate();
    let year= newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let week= newDate.getDay();
    const weekdays=['Mon','Tue', 'Wed', 'Thurs','Fri', 'Sat', 'Sun']
    let start= week-7;
    if( week<0)
    {
        week=7+week

    }
   var labelss=[]
    var count=7;
    while (count != 0)
    {
        labelss.push(weekdays[week])
        week=week+1
        week=week%7
        count=count-1
    }

    console.log(labelss)

    console.log(month);
    let revenue={}
    var i=0
    let x= new Date(year, month, 0).getDate();
    for(i=date-6; i<=date; i++)
    {
        revenue[i]=0;
   
    }
    // console.log(revenue);
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
        const snapshot = await citiesRef.where('state','==','Dispatched' ).where('Month','==', month).where('Year','==', year).get()
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
    
        snapshot.forEach(doc => {
            var d= doc.data().Day
            if( date-7 < d <= date)
            {
            console.log("hello")
            console.log(doc.data())
            var day=doc.data().Day
            console.log(doc.data().BuyerPayment)
          revenue[day]=revenue[day]+doc.data().BuyerPayment;
            }
        
        });
        keys = Object.keys(revenue);
        values = Object.values(revenue);
        console.log(revenue)
        console.log(values)
        setData({
        
            labels: labelss,
            datasets:[
              {
                label:'Sales for 2021(Rs)',
                data: values,
                borderColor: ['rgb(179, 74, 74)'],
                backgroundColor:['rgb(190, 83, 83)',],
                tension: 0.3,
                borderJoinStyle:'round',
                fill: {
                    target: 'origin',
                    above: 'rgb(190, 83, 83)',   // Area will be red above the origin
                      
                  }
              },
              
            ],
           
          })
          setOptions( {
           plugins:{ 
               title:{
                    display:true,
                    text: 'Sales This Week',
            },},
            scales: {
               y:{
                   grid: {
                       display:false,
                   }
               },
               x:{
                grid: {
                    display:false,
                }
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
          
            <div className='Weekrev'>
            
              <Line  data={data}
               options={options}
               
            />
              {console.log(options)}
              
              </div> 
       
          </>    
          );
   
   
}

export default Weeklyrevenue;