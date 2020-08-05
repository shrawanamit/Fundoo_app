import React from 'react';
import "./resetPassword.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            password: null,
            confirmPassword: null,
            errors: {

                password: '',
                confirmPassword: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'confirmPassword':
                errors.confirmPassword =
                    value.length < 8
                        ? 'must be 8 characters long!'
                        : '';
                break;

            case 'password':
                errors.password =
                    value.length < 8
                        ? 'must be 8 characters long!'
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
            <div className="rmainContainer">
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
                                    Reset Your Password
                            </Typography>
                            </p>
                        </div>
                        
                            <div className="textField1">
                                <div className="text1">
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
                                <div className="text2">
                                    <TextField
                                        fullWidth
                                        type="password"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                                        required
                                        onChange={this.handleChange} noValidate />
                                    {errors.confirmPassword.length > 0 &&
                                        <span className='error'>{errors.confirmPassword}</span>}
                                </div>

                            </div>
                        
                        <div className="rbuttonContainer" >
                            <div className="btn2" >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="btn">
                                    Reset Password
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