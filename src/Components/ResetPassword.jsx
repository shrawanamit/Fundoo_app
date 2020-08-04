import React from 'react';
import "./resetPassword.scss";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ResetPassword extends React.Component {
    render() {
        return (
            <div className="rmainContainer">
                <div className="sloginContainer">
                    <div className="registrationContainer">
                        <div className="fundoofont1"  align="center">
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
                            />
                            </div>
                            <div className="text2">
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                label="Confirm Password"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                                required
                                
                            />
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
                    </div>
                </div>
            </div>
        );
    }
}