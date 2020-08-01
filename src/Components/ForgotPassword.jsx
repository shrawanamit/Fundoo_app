import React from 'react';
import "./forgotPassword.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ForgotPassword extends React.Component {
    render() {
        return (
            <div className="smainContainer ">
                <div className="sloginContainer">
                    <div className="registrationContainer">
                        <div className="fundoofont" >
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
                        <div className="textFieldBody">
                            <p className="p2">Recover your Fundoo Account</p> <br />
                        </div>
                        <div className="textField1">
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
                            />
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
                    </div>
                </div>
            </div>
        );
    }
}