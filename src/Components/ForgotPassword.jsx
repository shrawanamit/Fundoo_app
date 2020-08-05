import React from 'react';
import "./forgotPassword.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}



export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          fullName: null,
          email: null,
          password: null,
          errors: {
            fullName: '',
            email: '',
            password: '',
          }
        };
      }
    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          
          default:
            break;
        }
    
        this.setState({errors, [name]: value});
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
      }
    

    render() {
        const {errors} = this.state;
        return (
            <div className="smainContainer ">
                <div className="sloginContainer">
                    <div className="registrationContainer">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="fundoofont1" align="center">
                            <span class="f">F</span>
                            <span class="u">u</span>
                            <span class="n">n</span>
                            <span class="d">d</span>
                            <span class="o">o</span>
                            <span class="oo">o</span>
                        </div>
                        <div>
                            <p class="title" align="center">
                                <Typography component="h1" variant="h5">
                                    Account recovery
                                </Typography>
                            </p>
                        </div>
                        <div className="heading" align="center">
                            <p className="p2">Recover your Fundoo Account</p> <br />
                        </div>
                        <div className="textField1">
                            <TextField
                                fullWidth
                                type="email"
                                name="email"
                                label="Username"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                helperText="Use EmailID or Mobile Number"
                                required
                                placeholder="@gmail.com"
                                text-align="right"onChange={this.handleChange} noValidate />
                                {errors.email.length > 0 && 
                                  <span className='error'>{errors.email}</span>}
                        </div>
                        <div className="buttonContainer">
                            <div className="btn1">
                                <Button color="primary">Forgot Email?</Button>
                            </div>
                            <div className="btn2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="btn">
                                    Sign in
                            </Button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}