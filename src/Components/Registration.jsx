import React from 'react';
import "./registration.scss";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from "../assetes/logoRegister.svg";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import FundooService from "../Services/userService";
let service = new FundooService();



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const  validateForm = (errors) => {
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
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            SnackbarOpen: false,
            SnackbarMessage: '',
            errors: {

                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        };
    }

    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({
            [event.target.name]: event.target.value,
        });
        let formIsValid = true;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 3
                        ? 'must be 5 characters long!'
                        : '';
                formIsValid = false;
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 3
                        ? 'must be 5 characters long!'
                        : '';
                formIsValid = false;
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                formIsValid = false;
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'must be 8 characters long!'
                        : '';
                formIsValid = false;
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value.length < 8
                        ? 'must be 8 characters long!'
                        : '';
                formIsValid = false;
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
        return formIsValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // if (validateForm(this.state.errors)) {
        if (this.handleChange()) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    
    submitUserSignInForm = () => {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            service: "advance"
        };
        if( this.state.password == this.state.confirmPassword)
        {
            service.Registration(user)
            .then((json) => {
                console.log("responce data==>", json);
                if (json.status === 200) {
                    this.setState({ SnackbarOpen: true, SnackbarMessage: 'Registration Sucessfull !!' })
                }
            })
            .catch((err) => {
                console.log(err);
            });
        
        }
        else{
            this.setState({ SnackbarOpen: true, SnackbarMessage: 'password not match !!' })
        }
        
    };



    render() {
        const { errors } = this.state;
        return (

           
            <div className="mainContainer ">
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
                <div className="bodyContainer">
                    <div className="registrationContainer">
                        <div className="fundoofont" >
                            <span class="f">F</span>
                            <span class="u">u</span>
                            <span class="n">n</span>
                            <span class="d">d</span>
                            <span class="o">o</span>
                            <span class="oo">o</span>
                        </div>

                        <div className="textFieldBody">
                            <p className="p1">Create your Fundoo Account</p> <br />
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="text">
                                    <div className="text1">
                                        <div className="textRow1">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                name="firstName"
                                                label="First name"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                defaultValue={this.state.firstName}
                                                onChange={this.handleChange} noValidate />
                                            {errors.firstName.length > 0 &&
                                                <span className='error'>{errors.firstName}</span>}
                                        </div>
                                        <div className="textRow2">
                                            <TextField
                                                fullWidth
                                                name="lastName"
                                                label="Last name"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                defaultValue={this.state.lastName}
                                                onChange={this.handleChange} noValidate />
                                            {errors.lastName.length > 0 &&
                                                <span className='error'>{errors.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="textColumn2">
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
                                            text-align="right"
                                            defaultValue={this.state.email}
                                            onChange={this.handleChange} noValidate />
                                        {errors.email.length > 0 &&
                                            <span className='error'>{errors.email}</span>}
                                    </div>
                                    <div className="text3">
                                        <div className="textRow1">
                                            <TextField
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                defaultValue={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                            {errors.password.length > 0 &&
                                                <span className='error'>{errors.password}</span>}
                                        </div>
                                        <div className="textRow2">
                                            <TextField
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm"
                                                type="password"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                defaultValue={this.state.confirmPassword}
                                                onChange={this.handleChange}
                                            />
                                            {errors.confirmPassword.length > 0 &&
                                                <span className='error'>{errors.confirmPassword}</span>}
                                        </div>
                                    </div>
                                    <p className="passwordHint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                    <div className="button">


                                        <div className="button1">
                                            <Link href="/signin" variant="body2">
                                                <Button color="primary">sign in Insted</Button>
                                            </Link>
                                        </div>

                                        <div className="button2">
                                            <Button variant="contained" color="primary" onClick={this.submitUserSignInForm}>
                                                Register
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="sideImageBox">
                        <div className="figureBox">
                            <div className="image"><img src={logo} class="tempimage" alt="Temperature" />
                                <figcaption className="figCaption"> One account. All of Fundoo working for you.</figcaption>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}