import React from 'react';
import {getLoggedUser} from "../../services/authService";
import { Redirect,Route } from 'react-router-dom';

const ProtectedRoute = ({path,...rest,component:Component,render}) => {
    return ( 
        <Route
              {...rest}
              render={(props) =>{
                if(!getLoggedUser())return <Redirect to="/login"/>
                return Component? <Component {...props}></Component>: render(props);
              }}
            />
     );
}
 
export default ProtectedRoute;