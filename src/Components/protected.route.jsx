import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from './Auth'

export const ProtectedRoute = ({component:Component, ...rest}) =>{
    return(
        <Route 
        
        {...rest} 
        render={props =>{
            console.log("login");
            if(auth.isAuthenticated()){
                console.log("login");
                return <Component  {...props}/>
            }
            else{
 
                return <Redirect to={
                    {
                        pathname:"/",
                        state:{
                            from:props.location
                        }
                    }
                } />

                
            }
        }

        }
        
        />
    )
}
