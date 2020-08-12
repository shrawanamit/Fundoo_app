import React from 'react';
import "./signIn.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import FundooService from "../Services/userService";
let service = new FundooService();


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export default class Registration extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
           
            email: null,
            password: null,
            SnackbarOpen: false,
            SnackbarMessage: '',
            errors: {
                
                email: '',
                password: '',
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
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }
    submitUserSignInForm = () => {
        const user = {
           
            email: this.state.email,
            password: this.state.password,
           
          };
          service. Login(user)
            .then((json) => {
              console.log("responce data==>", json.data.id);
              //taking token Id of user
              localStorage.setItem('token', json.data.id);
              if (json.status === 200) {
                this.setState({ SnackbarOpen: true, SnackbarMessage: 'Login Sucessfull !!' })
              }
            })
            .catch((err) => {
              console.log(err);
            });
    };






    render() {
        const { errors } = this.state;
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
                                Sign in
                                </Typography>
                        </p>
                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
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
                                onChange={this.handleChange} noValidate />

                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </div>
                        <div className="textField1">
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                label="password"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                                required
                                onChange={this.handleChange} noValidate />
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>

                        <div className="buttonContainer">
                            <div className="btn1">
                            <Link href="/"  variant="body2">
                                <Button color="primary">Create account</Button>
                                </Link>
                            </div>
                            <div className="btn2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submitUserSignInForm}
                                    className="btn">
                                    Sign in
                            </Button>
                            </div>
                        </div>

                    </form>


                </div>

                </div>
        );
    }
}

