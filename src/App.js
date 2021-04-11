

// import {Route,Switch,Redirect} from 'react-router-dom';
// import PendingOrders from "./components/PendingOrders";
// import Products from "./components/Products";
// import Vieworders from "./components/Vieworders";
// import Pendingdetails from "./components/Pendingdetails";
// import Productdetails from "./components/Productdetails";
// import Viewdetails from "./components/Viewdetails";
// import Navbar from "./components/Navbar";
// import Adminmenu from "./components/Adminmenu";
// import Addadmin from "./components/Addadmin";
// import ViewAdmin from "./components/ViewAdmin";
// import Addproduct from "./components/Addproduct";
// import Breadcumbs from "./components/Breadcrumbs";
// import Categories from "./components/Categories";
// import Subcategories from "./components/Subcategories";
// import Simplesnackbar from "./components/Simplesnackbar";
// import Addcateg from "./components/Addcateg";
// import Addsubcateg from "./components/Addsubcateg";
// import Viewfinances from "./components/ViewFinancesold";
// import Admindetails from "./components/Admindetails";

// import React, { useState } from "react";
// function App() {
  
//   return (
//     <>
//     <div className="contain">
  
//      <div className="header">
//        <Navbar />
//         </div>
//       <div className="breadcrumbs">
//         <Breadcumbs/>
//       </div>
//      <div className="nav"> 
//      <Adminmenu/>
//     </div>
//      <div className="content"> 
     
  
//     <Switch>
//     <Route exact path ='/Pending Orders' component={PendingOrders}/>
//     <Route exact path ='/Pending Orders/:id' component={Pendingdetails}/>
//     <Route exact path ='/View Orders' component={Vieworders}/>
//     <Route exact path ='/View Orders/:id' component={Viewdetails}/>
//     <Route exact path ='/Products' component={Products}/>
//     <Route exact path ='/View Admin' component={ViewAdmin}/>
//     <Route exact path ='/Add Admin' component={Addadmin}/>
//     <Route exact path ='/Products/:id' component={Productdetails}/> 
//     <Route exact path ='/Add Product' component={Addproduct}/>
//     <Route exact path ='/Categories/:category' component={Subcategories}/>
//     <Route exact path = "/Categories/:category/:subcategory" component={Catsubcatprod}/>
//     <Route exact path ='/Categories' component={Categories}/>
//     <Route exact path ='/Categories/Go to subCategories/:category' component={Subcategories}/>
//     <Route exact path = "Categories/Go to subCategories/View Products/:id "component={Products}/>
//     <Route exact path ='/View Products/:id' component={Products}/>
//     <Route exact path ='/Add Category' component={Addcateg}/>
//     <Route exact path ='/Add Subcategory/:category' component={Addsubcateg}/>
//     <Route exact path ='/View Finances' component={Viewfinances}/>
//     <Route exact path ='/View Admin/:id' component={Admindetails}/>


    
//     </Switch>
//     </div>
   
//     </div>
//     </>
//   );
// }

// export default App;



import {Route,Switch,Redirect} from 'react-router-dom';
import PendingOrders from "./components/PendingOrders";
import Products from "./components/Products";
import Vieworders from "./components/Vieworders";
import Pendingdetails from "./components/Pendingdetails";
import Productdetails from "./components/Productdetails";
import Viewdetails from "./components/Viewdetails";
import Navbar from "./components/Navbar";
import Adminmenu from "./components/Adminmenu";
import Addadmin from "./components/Addadmin";
import ViewAdmin from "./components/ViewAdmin";
import Addproduct from "./components/Addproduct";
import Breadcumbs from "./components/Breadcrumbs";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import Simplesnackbar from "./components/Simplesnackbar";
import Addcateg from "./components/Addcateg";
import Addsubcateg from "./components/Addsubcateg";
import Viewfinances from "./components/ViewFinancesold";
import Admindetails from "./components/Admindetails";
import Catsubcatprod from "./components/Catsubcatprod";

import ResetPassword from "./components/ResetPasswordAdmin";
//import Signup from "./components/Signup"
import VerificationCode from "./components/VerficationCodeAdmin"
//import FullShoppingCart from "./components/OpenShoppingcart"
import AdminLogin from "./components/LoginAdmin"
import AdminForgotPassword from "./components/ForgotPasswordAdmin"
//import AdminVC   from "./components/VerficationCode"
//mport AdminRP from "./components/ResetPassword"
import Temp from   "./components/temp"
import fire from './fire'


import React, { useState } from "react";
function App() {
  const [user, setUser]= useState('')

  let loggedout = true
  fire.auth().onAuthStateChanged(user=>{
   if (user){
    setUser(user)
     //console.log("logout false")
   }
   else{
     setUser(false)
   }
  }
  
  )
  console.log(loggedout)
  // {user? (console.log("Logged")):( console.log("Not Logged in"))}
  return user ? (
    <>
    {/* {user==-1 ? <NavBar/> : <BuyerNav/>} */}
    {/* {loggedout ? <AdminLogin/> : */}
    {/* <Route exact path ='/' component={AdminLogin}/> */}
    <div className="contain">
    {/* {loggedout ? <AdminLogin/> : ""} */}

     <div className="header">
     {/* {loggedout ? <Navbar/> : <AdminLogin/>} */}
       <Navbar />
        </div>
      <div className="breadcrumbs">
      {/* {loggedin ? <Breadcumbs/> : ""} */}
        <Breadcumbs/>
      </div>

     <div className="nav"> 
    
     <Adminmenu/>
    
   

    </div>
    
     <div className="content"> 
     
     
   

    {/* <Route exact path ='/' component={AdminLogin}/> */}
   
    <Switch>
    {/* <Route exact path ='/ForgotPassword' component={AdminForgotPassword}/>
    <Route exact path ='/ResetPassword' component={ResetPassword}/>
    <Route exact path ='/Successful' component={Temp}/> */}
    <Route exact path ='/Pending Orders' component={PendingOrders}/>
    <Route exact path ='/Pending Orders/:id' component={Pendingdetails}/>
    <Route exact path ='/View Orders' component={Vieworders}/>
    <Route exact path ='/View Orders/:id' component={Viewdetails}/>
    <Route exact path ='/Products' component={Products}/>
    <Route exact path ='/View Admin' component={ViewAdmin}/>
    <Route exact path ='/Add Admin' component={Addadmin}/>
    <Route exact path ='/Products/:id' component={Productdetails}/> 
    <Route exact path ='/Add Product' component={Addproduct}/>
    <Route exact path ='/Categories' component={Categories}/>
    <Route exact path ='/Categories/:category' component={Subcategories}/>
    <Route exact path = "/Categories/:category/:subcategory" component={Catsubcatprod}/>
    <Route exact path ='/View Products/:id' component={Products}/>
    <Route exact path ='/Add Category' component={Addcateg}/>
    <Route exact path ='/Add Subcategory/:category' component={Addsubcateg}/>
    <Route exact path ='/View Finances' component={Viewfinances}/>
    <Route exact path ='/View Admin/:id' component={Admindetails}/>

    </Switch>
    
  
    </div>
   
    </div>
{/* } */}
    </>

  ) : (
    <Switch>
    {/* <AdminLogin/> */}
    <Route exact path ='/' component={AdminLogin}/>
    <Route exact path ='/ForgotPassword' component={AdminForgotPassword}/>
    <Route exact path ='/ResetPassword' component={ResetPassword}/>
    </Switch>
   

  )
  ;

}

export default App;

