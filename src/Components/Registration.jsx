import React from 'react';
import "./registration.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from "../assetes/logoRegister.svg";

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName:null,
            email: null,
            password: null,
            confirmPassword:null,
            errors: {
                firstName: '',
                lastName:'',
                email: '',
                password: '',
                confirmPassword:'',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.fullName =
                    value.length < 5
                        ? 'First name is not valid'
                        : '';
                break;
            case 'lasttName':
                errors.lastName =
                    value.length < 5
                        ? 'Last name is not valid'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password is not valid'
                        : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value.length < 8
                        ? 'Password is not valid'
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

    render() {
        const { errors } = this.state;
        return (
            <div className="mainContainer ">
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
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="textFieldBody">
                                <p className="p1">Create your Fundoo Account</p> <br />
                                <div className="text">
                                    <div className="text1">
                                        <div className="textRow1">
                                            <TextField
                                                name="First name"
                                                label="First name"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            {errors.firstName.length > 0 &&
                                                <span className='error'>{errors.firstName}</span>}
                                        </div>
                                        <div className="textRow2">
                                            <TextField
                                                name="Last name"
                                                label="Last name"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            {errors.lastName.length > 0 &&
                                                <span className='error'>{errors.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="textColumn2">
                                        <TextField
                                            fullWidth
                                            type="email"
                                            name="Username"
                                            label="Username"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                            helperText="Use EmailID or Mobile Number"
                                            required
                                            placeholder="@gmail.com"
                                            text-align="right"
                                            onChange={this.handleChange}
                                        />
                                        {errors.email.length > 0 &&
                                            <span className='error'>{errors.email}</span>}
                                    </div>
                                    <div className="text3">
                                        <div className="textRow1">
                                            <TextField
                                                label="Password"
                                                type="password"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            {errors.password.length > 0 &&
                                                <span className='error'>{errors.password}</span>}
                                        </div>
                                        <div className="textRow2">
                                            <TextField
                                                label="Confirm"
                                                type="password"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            {errors.confirmPassword.length > 0 &&
                                                <span className='error'>{errors.confirmPassword}</span>}
                                        </div>
                                    </div>
                                    <p className="passwordHint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                    <div className="button">


                                        <div className="button1">
                                            <Button color="primary">sign in Insted</Button>
                                        </div>

                                        <div className="button2">
                                            <Button variant="contained" color="primary">
                                                Register
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
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