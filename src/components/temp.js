import React from 'react'
import fire from '../fire'
import { useHistory } from "react-router-dom";

const Temp = () => {
	const history = useHistory();

  const routeChange = (path) =>{ 
    // let path = `newPath`; 
    history.push(path);
  }


	 const handleLogout= (event) =>{
	 	

    fire.auth().signOut().then(() => {
  	routeChange('/')
}).catch((error) => {
  // An error happened.
});


  };


    return (
        <div>
            <h2>Successful</h2>
            <button
           type="submit"
              fullWidth
              variant="contained"
              color="#0277BD"
        label="Logout"
        onClick={handleLogout}
        >
        </button>
        </div>

    )
}

export default Temp
