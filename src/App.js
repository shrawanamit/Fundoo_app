import React from 'react';
import { BrowserRouter as Router,Link ,Route } from 'react-router-dom';
import Registration from './Components/Registration';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import SighIn from './Components/SighIn';
import DashBord from './Components/DashBoard';
import Notes from './Components/Notes';
import Demo from './Components/Demo';
import {protectedRoute} from './Components/protected.route';


function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Registration} />
        <Route exact path="/signin" component={SighIn} />
        <Route exact path="/forgotPassoword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <Route  path="/home" component={DashBord} />
        <Route  path="/demo" component={Demo} />
        
       
      </Router>
    </div>
  );
}

export default App;
