import React from 'react';
import "../SCSS/forgotPassword.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FundooService from "../Services/userService";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
let service = new FundooService();

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
         
          email: null,
          SnackbarOpen: false,
          SnackbarMessage: '',
         
          errors: {
            
            email: '',
            
          }
        };
      }
    
      SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [event.target.name]: event.target.value,
          });
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

      submitUserSignInForm = () => {
        const user = {
            email: this.state.email,
          };
          service.ForgotPassword(user)
            .then((json) => {
              console.log("responce data==>", json);
              if (json.status === 200) {
                this.setState({ SnackbarOpen: true, SnackbarMessage: 'check your EMAIL !!' })
              }
            })
            .catch((err) => {
              console.log(err);
            });
    };
    

    render() {
        const {errors} = this.state;
        return (
            <div className="smainContainer ">
              <Snackbar
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                open={this.state.SnackbarOpen}
                autoHideDuration={3000}
                onClose={this.SnackbarClose}
                message={<span id="message-id">{this.state.SnackbarMessage}</span>}
                action={[
                    <IconButton key="close" aria-label="close"
                        color="inherit" onClick={this.SnackbarClose}>x</IconButton>
                ]}
            />
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
                                    onClick={this.submitUserSignInForm }
                                    className="btn">
                                    enter
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